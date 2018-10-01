var _this = this;
// 碰撞矩阵池
var collision = [];
// 主角信息
var LeadInfo = {
    width: 96,
    height: 135,
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
// 邀请好友奖励列表
var shareddata = [
    { size: 1, jinyunbao: 10 },
    { size: 2, jinyunbao: 15 },
    { size: 3, jinyunbao: 20 },
    { size: 4, jinyunbao: 25 },
    { size: 5, jinyunbao: 30 },
];
// 签到奖励 1: 抽奖券 2: 金元宝
var signdays = [
    { day: 1, type: false, Prop: { type: 1, size: 4, title: "恭喜你获得4个抽奖券" } },
    { day: 2, type: false, Prop: { type: 2, size: 2, title: "恭喜你获得2个金元宝" } },
    { day: 3, type: false, Prop: { type: 1, size: 6, title: "恭喜你获得6个抽奖券" } },
    { day: 4, type: false, Prop: { type: 2, size: 4, title: "恭喜你获得4个金元宝" } },
    { day: 5, type: false, Prop: { type: 1, size: 10, title: "恭喜你获得10个抽奖券" } },
    { day: 6, type: false, Prop: { type: 2, size: 6, title: "恭喜你获得6个金元宝" } },
    { day: 7, type: false, Prop: { type: 1, size: 8, title: "恭喜你获得4个抽奖券" } },
];
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
                if (!!xhr.responseText && !!success)
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
                Laya.Tween.to(element, { x: position.x, y: position.y }, 100);
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
        type_obj.close_Btn.offAll(Laya.Event.CLICK);
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
// 获得道具弹窗 1: 抽奖券 2: 金元宝 3: 金币
var Propalert = function (type, text) {
    if (text === void 0) { text = ""; }
    var time;
    var targetUI = init_alert(ui.reward2UI, null, function () {
        window.clearInterval(time);
    });
    var proptype = targetUI.getChildByName("content").getChildByName("proptype");
    var Light = targetUI.getChildByName("content").getChildByName("Light");
    var reward = targetUI.getChildByName("content").getChildByName("reward");
    reward.text = text;
    if (type === 1) {
        proptype.skin = "index/jiangquan.png";
        proptype.pos(-32, -232);
    }
    else if (type === 2) {
        proptype.skin = "index/yuanb.png";
    }
    else if (type === 3) {
        proptype.skin = "index/money.png";
    }
    time = window.setInterval(function () {
        Light.rotation += 10;
    }, 50);
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
var count = { 3: "K", 6: "M", 9: "B", 12: "T", 15: "aa", 18: "ab", 21: "ac", 24: "ad", 27: "ae", 30: "af" };
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
// 超大数值乘法
var accMul = function (arg1, arg2) {
    var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
    try {
        m += s1.split(".")[1].length;
    }
    catch (e) { }
    try {
        m += s2.split(".")[1].length;
    }
    catch (e) { }
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
};
// 数值格式化
var Format = function (value) {
    var a = value;
    var b;
    for (var i in count) {
        var ii = Number(i);
        if (a.length - 1 >= ii) {
            b = a.slice(0, a.length - ii) + "." + a.slice(a.length - ii, a.length - ii + 2) + count[ii];
        }
    }
    ;
    if (!b)
        return a;
    return b;
};
// 提示弹框
var tips = function (msg, type, x, y, zOrder) {
    if (type === void 0) { type = null; }
    if (x === void 0) { x = 300; }
    if (y === void 0) { y = 170; }
    if (zOrder === void 0) { zOrder = 99; }
    if (!!type && type === "coin") {
        var bg = new Laya.Image("index/copper2.png");
        bg.x = x;
        bg.y = y;
        bg.width = 30;
        bg.height = 30;
        bg.anchorX = 0.5;
        bg.anchorY = 0.5;
        bg.alpha = 1;
        var text = new Laya.Label("+ " + msg);
        text.fontSize = 20;
        text.color = "#ffffff";
        text.x = 40;
        text.y = 2;
        text.bold = true;
        bg.addChild(text);
        bg.zOrder = zOrder;
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
// 震动 1 短 2 长
var shock = function (type) {
    if (!window["wx"])
        return;
    if (type === 1) {
        window["wx"].vibrateShort();
    }
    else if (type === 2) {
        window["wx"].vibrateLong();
    }
};
// 爱心动画
var loveadmin = function (target, time, pos, playback) {
    if (playback === void 0) { playback = 1; }
    var skeleton = new Laya.Skeleton();
    skeleton.playbackRate(playback);
    target.addChild(skeleton);
    skeleton.pos(pos.x, pos.y);
    skeleton.load("https://shop.yunfanshidai.com/xcxht/qinggong/res/animation/aixng/love.sk");
    window.setTimeout(function () {
        skeleton.destroy();
    }, time);
};
// 攻击动画
var attackadmin = function (target, time, pos, playback, direction) {
    if (playback === void 0) { playback = 1; }
    if (direction === void 0) { direction = true; }
    var skeleton = new Laya.Skeleton();
    skeleton.playbackRate(playback);
    target.addChild(skeleton);
    skeleton.pos(pos.x, pos.y);
    if (!direction)
        skeleton.scaleX = -1;
    skeleton.load("https://shop.yunfanshidai.com/xcxht/qinggong/res/adminion/bazhang.sk");
    window.setTimeout(function () {
        skeleton.destroy();
    }, time);
};
// 金币动画
var coinanimation = function (target, time, pos, playback) {
    if (playback === void 0) { playback = 1; }
    var skeleton = new Laya.Skeleton();
    skeleton.playbackRate(playback);
    target.addChild(skeleton);
    skeleton.pos(pos.x, pos.y);
    skeleton.load("https://shop.yunfanshidai.com/xcxht/qinggong/res/adminion/love.sk");
    window.setTimeout(function () {
        skeleton.destroy();
    }, time);
};
// 窗口抖动
var windowshack = function (shackx, shacky, time) {
    if (shackx === void 0) { shackx = 5; }
    if (shacky === void 0) { shacky = 5; }
    if (time === void 0) { time = 500; }
    var x = shackx, y = shacky;
    var times = window.setInterval(function () {
        Laya.stage.x += x;
        Laya.stage.y += y;
        x = -x;
        y = -y;
    }, 6);
    window.setTimeout(function () {
        window.clearInterval(times);
        Laya.stage.x = 0;
        Laya.stage.y = 0;
    }, time);
};
// 弹性缩放
var scaleelastic = function (target, x, y, time) {
    if (x === void 0) { x = 1.2; }
    if (y === void 0) { y = 1.2; }
    if (time === void 0) { time = 150; }
    Laya.Tween.to(target, { scaleX: x, scaleY: y }, time, Laya.Ease.bounceInOut, Laya.Handler.create(_this, function () {
        target.scale(1, 1);
    }));
};
// 移动重复动画
var repeatadimation = function (target, office, time) {
    Laya.Tween.to(target, { x: office.x, y: office.y }, time, Laya.Ease.bounceInOut, Laya.Handler.create(_this, function () {
        target.scale(1, 1);
    }));
};
//# sourceMappingURL=common.js.map