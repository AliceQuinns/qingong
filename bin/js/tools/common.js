var _this = this;
// 碰撞矩阵池
var collision = [];
// 主角信息
var LeadInfo = {
    width: 90,
    height: 125,
    openID: 0,
    locklist: [],
    palaceList: [],
    Leadlist: 0,
};
// 动画数据
var adminPool = {
    Range: null,
    child: 0,
    maxLength: 5,
};
var Ajax = function (type, url, data, success, failed) {
    if (success === void 0) { success = null; }
    if (failed === void 0) { failed = null; }
    // 创建ajax对象
    var xhr = null;
    if (window['XMLHttpRequest']) {
        xhr = new XMLHttpRequest();
    }
    else {
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }
    var type = type.toUpperCase();
    if (type == 'GET') {
        if (!!data && typeof data == 'object') {
            var str = '';
            for (var key in data) {
                str += key + '=' + data[key] + '&';
            }
            data = str.replace(/&$/, '');
            xhr.open('GET', url + '?' + data, true);
        }
        else {
            xhr.open('GET', url, true);
        }
        xhr.send();
    }
    else if (type == 'POST') {
        xhr.open('POST', url, true);
        // 如果需要像 html 表单那样 POST 数据，请使用 setRequestHeader() 来添加 http 头。
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send(data);
    }
    // 处理返回数据
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                if (!!xhr.responseText)
                    success(JSON.parse(xhr.responseText));
            }
            else {
                if (!!failed) {
                    failed(xhr.status);
                }
            }
        }
    };
};
// 拖动检测
var drag = function (element, callback) {
    if (callback === void 0) { callback = null; }
    var position = {
        x: element.x,
        y: element.y,
        offsetX: 0,
        offsetY: 0,
        zOrder: element.zOrder,
        element: element
    };
    // 拖动前
    element.on(Laya.Event.MOUSE_DOWN, _this, function (e) {
        // 更新位置
        position.x = element.x;
        position.y = element.y;
        if (!element.touchState) {
            console.log("节点touchstate变量为false 暂时禁用拖动");
            return;
        }
        ; // 拖动控制
        e.stopPropagation();
        element.zOrder = 999;
        position.offsetX = e.stageX - e.target.x;
        position.offsetY = e.stageY - e.target.y;
        Laya.stage.off(Laya.Event.MOUSE_MOVE, _this, _touch);
        Laya.stage.off(Laya.Event.MOUSE_OUT, _this, _touch_close);
        Laya.stage.on(Laya.Event.MOUSE_MOVE, _this, _touch);
        Laya.stage.on(Laya.Event.MOUSE_OUT, _this, _touch_close);
    });
    // 拖动时
    function _touch(e) {
        element.x = e.stageX - position.offsetX;
        element.y = e.stageY - position.offsetY;
    }
    // 拖动后
    function _touch_close(e) {
        Laya.stage.off(Laya.Event.MOUSE_MOVE, this, _touch);
        Laya.stage.off(Laya.Event.MOUSE_OUT, this, _touch_close);
        element.zOrder = position.zOrder;
        // 矩阵范围检测
        if (!!collision && collision.length > 0 && !!callback) {
            var isCollision = false;
            // 只检测第一个发生碰撞的节点
            for (var i = 0; i < collision.length; i++) {
                if (e.stageX >= collision[i].startX
                    && e.stageX <= collision[i].endX
                    && e.stageY >= collision[i].startY
                    && e.stageY <= collision[i].endY) {
                    // 传入当前对象数据, 被碰撞对象数据
                    callback(position, collision[i].target);
                    isCollision = true;
                    break;
                }
            }
            if (!isCollision) {
                console.log("未发生任何碰撞 自动返回初始位置");
                Laya.Tween.to(element, { x: position.x, y: position.y }, 500);
            }
        }
        else {
            console.log("请初始化碰撞矩阵或传入回调函数");
        }
    }
};
// 创建主角
var createLead = function (type, size) {
    if (size === void 0) { size = null; }
    var target = new Laya.Image("Lead/" + type + ".png");
    if (!!size) {
        target.width = size.width;
        target.height = size.height;
    }
    return target;
};
// 矩阵获取
var getMatrix = function (target) {
    var Range = {
        startX: target.x,
        startY: target.y,
        endX: target.x + target.width,
        endY: target.y + target.height,
        target: target
    };
    return Range;
};
// UI窗口生成
var init_alert = function (type, create_handler, clear_handler, close) {
    if (create_handler === void 0) { create_handler = null; }
    if (clear_handler === void 0) { clear_handler = null; }
    if (close === void 0) { close = false; }
    var type_obj = new type;
    if (!type_obj.content || !type_obj.close_Btn) {
        console.log("ui界面结构不正确");
        return;
    }
    toggles(0, type_obj.content);
    toggles(0, type_obj.close_Btn);
    Laya.stage.addChild(type_obj);
    toggles(1, type_obj.content, Laya.Handler.create(_this, function () {
        if (!!create_handler)
            create_handler();
    }));
    toggles(1, type_obj.close_Btn);
    type_obj._close = function () {
        toggles(2, type_obj.content, null, Laya.Handler.create(_this, function () {
            type_obj.removeSelf();
            type_obj.destroy();
        }));
        toggles(2, type_obj.close_Btn);
    };
    addClick(type_obj.close_Btn, function (e) {
        if (!!clear_handler && clear_handler instanceof Function)
            clear_handler(); //关闭窗口时执行
        type_obj._close();
    });
    type_obj.zOrder = 100;
    return type_obj;
};
// 窗口弹出动画 status: 0初始化,1显示,2隐藏 target:目标 create_handler:窗口显示后的回调 clear_handler:窗口隐藏后的回调
var toggles = function (status, target, create_handler, clear_handler) {
    if (create_handler === void 0) { create_handler = null; }
    if (clear_handler === void 0) { clear_handler = null; }
    switch (status) {
        case 0:
            target.scale(0.2, 0.2);
            target.alpha = 0;
            break;
        case 1:
            Laya.Tween.to(target, { alpha: 1, scaleX: 1, scaleY: 1 }, 500, Laya.Ease.backInOut, create_handler, null);
            break;
        case 2:
            Laya.Tween.to(target, { scaleX: 0.2, scaleY: 0.2, alpha: 0 }, 500, Laya.Ease.backInOut, clear_handler, null);
            break;
    }
};
// 缩放动画
var scaleAdmin = function (target) {
    target.scale(0.2, 0.2);
    target.alpha = 0;
    setTimeout(function () {
        Laya.Tween.to(target, { alpha: 1, scaleX: 1, scaleY: 1 }, 500, Laya.Ease.backInOut, null, null);
    }, 500);
};
// 点击事件
var addClick = function (btn, func, caller, removeAll, args) {
    if (caller === void 0) { caller = null; }
    if (removeAll === void 0) { removeAll = false; }
    if (args === void 0) { args = null; }
    if (removeAll) {
        btn.offAll(Laya.Event.CLICK);
    }
    btn.on(Laya.Event.CLICK, caller, func, args);
};
// 字体缓动动画 direction横竖版 
var fontAdmin = function (text, direction, x, y, office, target, delay) {
    if (delay === void 0) { delay = 50; }
    var demoString = text;
    if (demoString.length <= 0) {
        console.log("空字符串");
        return;
    }
    ;
    for (var i = 0, len = demoString.length; i < len; ++i) {
        var letterText = createLetter(demoString.charAt(i)); // 单个字体节点
        target.addChild(letterText);
        letterText.pos(x, y);
        letterText.alpha = 0;
        // 横
        if (direction === 1) {
            letterText.y = y;
            var endX = x + i * office;
            Laya.Tween.to(letterText, { x: endX, alpha: 1 }, 300, Laya.Ease.strongInOut, null, i * delay);
        }
        else if (direction === 0) {
            letterText.x = x;
            var endY = y + i * office;
            Laya.Tween.to(letterText, { y: endY, alpha: 1 }, 300, Laya.Ease.strongInOut, null, i * delay);
        }
        else if (direction === 0) {
        }
    }
};
// 创建字体对象
var createLetter = function (char, font, color, size) {
    if (font === void 0) { font = "Arial"; }
    if (color === void 0) { color = "#FFFFFF"; }
    if (size === void 0) { size = 30; }
    var letter = new Laya.Text();
    letter.text = char;
    letter.color = color;
    letter.font = font;
    letter.fontSize = size;
    return letter;
};
// 计数法
var count = { 3: "K", 6: "M", 9: "B", 12: "T", 15: "AA", 18: "AB", 21: "AC", 24: "AD" };
// 超大数值加法运算
var addition = function (a, b) {
    var res = '', temp = 0;
    a = a.split('');
    b = b.split('');
    while (a.length || b.length || temp) {
        temp += ~~a.pop() + ~~b.pop();
        res = (temp % 10) + res;
        temp = temp > 9;
    }
    return res.replace(/^0+/, '');
};
// 超大数值减法运算
var subtraction = function (a, b) {
    a = a.split('');
    b = b.split('');
    var aMaxb = a.length > b.length;
    if (a.length == b.length) {
        for (var i = 0, len = a.length; i < len; i++) {
            if (a[i] == b[i])
                continue;
            aMaxb = a[i] > b[i];
            break;
        }
    }
    if (!aMaxb)
        a = [b, b = a][0];
    var result = '';
    while (a.length) {
        var temp = parseInt(a.pop()) - parseInt(b.pop() || 0);
        if (temp >= 0)
            result = temp + result;
        else {
            result = temp + 10 + result;
            a[a.length - 1]--;
        }
    }
    return (aMaxb ? '' : '-') + result.replace(/^0*/g, '');
};
// 超大数值高位对比
var ContrastNumber = function (a, b) {
    a = a.split('');
    b = b.split('');
    var aMaxb = a.length > b.length;
    if (a.length == b.length) {
        for (var i = 0, len = a.length; i < len; i++) {
            if (a[i] == b[i])
                continue;
            aMaxb = a[i] > b[i];
            break;
        }
    }
    if (!aMaxb)
        a = [b, b = a][0];
    var result = '';
    while (a.length) {
        var temp = parseInt(a.pop()) - parseInt(b.pop() || 0);
        if (temp >= 0)
            result = temp + result;
        else {
            result = temp + 10 + result;
            a[a.length - 1]--;
        }
    }
    if (a === b)
        return true;
    return Boolean(aMaxb);
};
// 数值格式化
var Format = function (value) {
    var text = value;
    for (var i in count) {
        if (value.length > Number(i)) {
            text = value.slice(0, 1) + "." + value.slice(1, 5) + count[i];
        }
    }
    return text;
};
// 提示弹框
var tips = function (msg, type, x, y) {
    if (type === void 0) { type = null; }
    if (x === void 0) { x = null; }
    if (y === void 0) { y = null; }
    if (!!type && type === "coin") {
        var bg = new Laya.Image("index/copper2.png");
        bg.x = 300;
        bg.y = 170;
        bg.width = 50;
        bg.height = 50;
        bg.anchorX = 0.5;
        bg.anchorY = 0.5;
        bg.alpha = 1;
        var text = new Laya.Label("+ " + msg);
        text.fontSize = 30;
        text.color = "#653e21";
        text.x = 60;
        text.y = 10;
        text.bold = true;
        bg.addChild(text);
        bg.zOrder = 99;
        Laya.stage.addChild(bg);
        Laya.Tween.to(bg, { y: 90, alpha: 0 }, 1500, Laya.Ease.strongInOut, Laya.Handler.create(_this, function (obj) {
            Laya.timer.once(1000, this, function (arg) {
                Laya.stage.removeChild(arg);
            }, [obj]);
        }, [bg]), 0);
    }
    else {
        var bg = new Laya.Image("index/yuanbao_bg.png");
        bg.x = Laya.stage.width / 2;
        bg.y = Laya.stage.height / 2 + 100;
        bg.anchorX = 0.5;
        bg.anchorY = 0.5;
        bg.alpha = 0;
        var text = new Laya.Label(msg + "");
        text.anchorX = 0.5;
        text.anchorY = 0.5;
        text.fontSize = 25;
        text.color = "#653e21";
        text.x = bg.width / 2;
        text.y = bg.height / 2;
        bg.addChild(text);
        bg.zOrder = 200;
        Laya.stage.addChild(bg);
        Laya.Tween.to(bg, { y: Laya.stage.height / 2, alpha: 1 }, 500, Laya.Ease.strongInOut, Laya.Handler.create(_this, function (obj) {
            Laya.timer.once(1000, this, function (arg) {
                Laya.stage.removeChild(arg);
            }, [obj]);
        }, [bg]), 0);
    }
};
// 获取人物价格
var getLeadPrice = function (grade) {
    var target;
    LeadInfo.locklist.forEach(function (item) {
        if (item.grade === grade) {
            target = item.price;
            return;
        }
    });
    return target;
};
// 爱心动画
var loveadmin = function (target, time, pos) {
    var skeleton = new Laya.Skeleton();
    target.addChild(skeleton);
    skeleton.pos(pos.x, pos.y);
    skeleton.load("https://shop.yunfanshidai.com/xcxht/qinggong/res/animation/love.sk");
    window.setTimeout(function () {
        skeleton.destroy();
    }, time);
};
//# sourceMappingURL=common.js.map