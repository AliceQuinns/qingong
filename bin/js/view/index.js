var GAME;
(function (GAME) {
    var index = /** @class */ (function () {
        // https://shop.yunfanshidai.com/xcxht/qinggong/
        function index() {
            this.Audioctr = true; // 默认音效
            //  玩家数据
            this.GameInfo = {
                userid: "0",
                coin: "0",
                diamonds: "0",
                volum: 0,
                speed: "0",
                grade: 1,
                role_level: 1,
            };
            var self = this;
            Laya.loader.load([
                "https://shop.yunfanshidai.com/xcxht/qinggong/res/atlas/index.atlas",
                "https://shop.yunfanshidai.com/xcxht/qinggong/res/atlas/Lead.atlas",
                "https://shop.yunfanshidai.com/xcxht/qinggong/res/atlas/Enemy.atlas",
            ], Laya.Handler.create(this, function () {
                if (!window["wx"]) {
                    self.init("", "https://shop.yunfanshidai.com/xcxht/qinggong/api/login_test.php");
                }
                else {
                    window["wx"].login({
                        success: function (data) {
                            console.log(data);
                            self.init(data.code, "https://shop.yunfanshidai.com/xcxht/qinggong/api/login.php");
                        },
                        fail: function (err) {
                            tips("请授权");
                        }
                    });
                }
            }), Laya.Handler.create(this, this.onProgress, null, false));
            window["___index"] = this;
            window["GameInfo"] = this.GameInfo;
        }
        index.prototype.onProgress = function (pro) {
            var bar2 = window["loginUI"].getChildByName("bar2");
            bar2.scale(pro, 1);
        };
        index.prototype.init = function (code, url) {
            var _this = this;
            window.setTimeout(function () {
                window["loginUI"].destroy();
            }, 500);
            // 场景添加
            this.indexUI = new ui.indexUI;
            Laya.stage.addChild(this.indexUI);
            // 加载用户数据
            Ajax("GET", url, {
                code: code,
                scene: 0
            }, function (data) {
                if (data['status'] === "fail") {
                    console.log("登陆失败");
                }
                else if (data['status'] === "success") {
                    _this.customEvent(); // 自定义事件
                    _this.staticObj(); // 静态化常用变量
                    _this.Floaticon(); // 引导收藏图标
                    console.log(data);
                    // data.isnew = "1"; 
                    // 非新用户显示离线收益与签到
                    if (data.isnew.toString() === "2") {
                        // 收益弹框
                        var alertUI_1 = init_alert(ui.alertUI, function () {
                            var text = alertUI_1.getChildByName("content").getChildByName("contentText");
                            text.text = (!!data.offline) ? Format(data.offline) + "\u4E2A\u91D1\u5E01" : "0个金币";
                        }, function () {
                            // 签到
                            (!!data["issign"] && data["issign"] === "1") ? _this.Signin(data["signdays"]) : console.log("已签到");
                        });
                    }
                    // 玩家ID
                    (!!data.openid) ? _this.GameInfo.userid = data.openid : console.log("无玩家id数据");
                    LeadInfo.openID = data.openid;
                    // 用户等级
                    (!!data.grade) ? _this.GameInfo.grade = Number(data.grade) : console.log("无法获取用户等级");
                    // 解锁等级
                    (!!data.role_level) ? _this.GameInfo.role_level = Number(data.role_level) : console.log("无法获取用户解锁的等级");
                    // 用户金币
                    (!!data.coin) ? Laya.stage.event("MoneySet", data.coin) : console.log("无金币或无该数据");
                    // 抽奖券
                    (!!data.volum) ? Laya.stage.event("volumAdd", data.volum) : console.log("无奖券或无该数据");
                    // 金元宝
                    (!!data.diamonds) ? Laya.stage.event("diamondsSet", data.diamonds) : console.log("无金元宝或无该数据");
                    // 创建游戏主角 
                    (!!data.rolelist) ? _this.Lead(data.rolelist) : console.log("无法获取主角信息");
                    // 商店列表
                    (!!data.lockinfo) ? LeadInfo.locklist = data.lockinfo : console.log("无法获取商店列表");
                    _this.turntable = new GAME.turntable(); // 转盘模块
                    _this.shop = new GAME.shop(LeadInfo.locklist); // 商店模块
                    _this.palace = new GAME.palace(); // 冷宫模块
                    _this.course = new GAME.Course(_this.indexUI, _this); // 新手引导
                    _this.event(); // 事件监听
                    _this.updateshopBtn(); // 更新购买按钮价格
                    window["_audio"].onBGM();
                    // 定时更新服务器金币
                    window.setInterval(function () {
                        Laya.stage.event("updateCoin");
                    }, 30000);
                    // 抽奖券
                    window.setInterval(function () {
                        Laya.stage.event("volumAdd", 1);
                    }, 1800000);
                    // 随机背景音效
                    window.setInterval(function () {
                        window["_audio"].random();
                    }, 50000);
                    // 新手指引
                    (!!data.isnew && data.isnew.toString() === '1') ? _this.course.open() : console.log("非新用户");
                }
            }, function (err) {
                console.log(err, "无法请求数据");
                tips("获取不到您的信息");
            });
        };
        // 浮动收藏图标
        index.prototype.Floaticon = function () {
            var _this = this;
            var icon = new Laya.Image("index/bag.png");
            this.indexUI.addChild(icon);
            icon.pos(this.indexUI.help.x - 50, this.indexUI.help.y + 20);
            icon.anchorX = 0.5;
            icon.anchorY = 0.5;
            rotationPos(icon, 20, -20, 100, function () {
                icon.destroy();
                window.setTimeout(function () {
                    _this.Floaticon();
                }, 100000);
            });
            icon.on(Laya.Event.CLICK, this, function () {
                init_alert(ui.shareUI, null, function () {
                    window.setTimeout(function () {
                        _this.Floaticon();
                    }, 100000);
                });
                Laya.Tween.clearAll(icon);
                icon.destroy();
            });
            // window["asdv"] = icon;
        };
        // 签到
        index.prototype.Signin = function (day) {
            var _this = this;
            for (var i = 0; i < day; i++) {
                signdays[i].type = true;
            }
            if (!!signdays[Number(day)])
                signdays[Number(day)]["open"] = true;
            var data = signdays;
            var targetUI = init_alert(ui.SignUI);
            var target = targetUI._list;
            target.vScrollBarSkin = '';
            target.array = data;
            target.scrollBar.elasticBackTime = 500;
            target.scrollBar.elasticDistance = 100;
            target.renderHandler = new Laya.Handler(this, function (cell, index) {
                if (index > data.length)
                    return;
                var userdata = data[index];
                var days = cell.getChildByName("days");
                (userdata["open"]) ? days.color = "#33c0dc" : days.color = "#633d26";
                days.text = "\u7B2C" + userdata.day + "\u5929";
                var title = cell.getChildByName("title");
                (userdata.type) ? title.text = "\u5DF2\u9886\u53D6\u5956\u52B1" : title.text = "\u5409\u65F6\u672A\u5230";
                var titlebg = cell.getChildByName("titlebg");
                (userdata["open"]) ? titlebg.skin = "index/today_line.png" : titlebg.skin = "index/line2.png";
                var btn_coin = cell.getChildByName("btn_coin");
                if (userdata["open"]) {
                    btn_coin.disabled = false;
                    addClick(btn_coin, function () {
                        Ajax("get", "https://shop.yunfanshidai.com/xcxht/qinggong/api/usersign.php", {
                            openid: LeadInfo.openID,
                        }, function (data) {
                            Propalert(userdata.Prop.type, userdata.Prop.title); // 道具弹窗
                            // data[index]["open"] = false;
                            targetUI._close();
                        }, function (err) {
                            tips("签到失败");
                        });
                    }, _this, true);
                }
                else {
                    btn_coin.offAll(Laya.Event.CLICK);
                    btn_coin.disabled = true;
                }
            });
        };
        // 邀请好友
        index.prototype.shared = function () {
            var _this = this;
            var data = shareddata;
            var targetUI = init_alert(ui.InvitingfriendsUI);
            var target = targetUI._list;
            var BTN = targetUI.getChildByName("content").getChildByName("shareBTN");
            addClick(BTN, function () {
                window["shareBTN"];
                console.log("分享");
            }, this, true);
            target.vScrollBarSkin = '';
            target.array = data;
            target.scrollBar.elasticBackTime = 500;
            target.scrollBar.elasticDistance = 100;
            target.renderHandler = new Laya.Handler(this, function (cell, index) {
                if (index > data.length)
                    return;
                var userdata = data[index];
                var LeadName = cell.getChildByName("LeadName");
                LeadName.text = "\u9080\u8BF7" + userdata.size + "\u4F4D\u597D\u53CB";
                var coin = cell.getChildByName("coin");
                coin.text = "" + userdata.jinyunbao;
                addClick(cell.getChildByName("btn_coin"), function () {
                    tips("未成功邀请好友");
                }, _this, true);
            });
        };
        // 常用对象静态化
        index.prototype.staticObj = function () {
            this._Money = this.indexUI.coin;
            this._Diamonds = this.indexUI._Diamonds;
            this._coinspeed = this.indexUI.coinspeed;
        };
        // 事件
        index.prototype.event = function () {
            var _this = this;
            var self = this;
            // 冷宫
            addClick(this.indexUI.palace, function () {
                _this.palace.open();
            }, this);
            // 抽奖
            addClick(this.indexUI.turntable, function () {
                _this.turntable.open(_this.GameInfo);
            }, this);
            // 商店
            addClick(this.indexUI.shop, function () {
                _this.shop.open();
            });
            // 购买人物
            addClick(this.indexUI.purchase, function () {
                _this.leadshop();
            });
            // 帮助
            addClick(this.indexUI.help, function () {
                init_alert(ui.helpUI);
            });
            // 音效
            addClick(this.indexUI.audioCtr, function () {
                _this.Audioctr = !_this.Audioctr;
                if (_this.Audioctr) {
                    // 开启
                    window["_audio"].control("open");
                    window["_audio"].onBGM();
                    _this.indexUI.audioCtr.skin = "index/voice1.png";
                }
                else {
                    // 关闭
                    window["_audio"].control("close");
                    _this.indexUI.audioCtr.skin = "index/voice2.png";
                }
            });
            // 回收按钮
            addClick(this.indexUI.recovery, function () {
                tips("请拖动人物到此处");
            }, this, true);
            // 邀请好友
            addClick(this.indexUI.Luckdraw, function () {
                _this.shared();
            });
            // 获取金元宝
            addClick(this.indexUI.addmoney, function () {
                _this.shared();
            });
            // 获取金币
            addClick(this.indexUI.addcoin, function () {
                _this.shared();
            });
        };
        // 自定事件
        index.prototype.customEvent = function () {
            var _this = this;
            // 修改金币
            Laya.stage.on("MoneySet", this, function (e) {
                if (e <= 0) {
                    _this.GameInfo.coin = "0";
                    _this._Money.text = "0";
                    console.log("无金币");
                }
                else {
                    _this.GameInfo.coin = String(e);
                    _this._Money.text = Format(_this.GameInfo.coin);
                }
            });
            // 添加金币
            Laya.stage.on("MoneyAdd", this, function (e) {
                _this.GameInfo.coin = addition(_this.GameInfo.coin, String(e));
                _this._Money.text = Format(_this.GameInfo.coin);
                window["_audio"]._Sound("money");
            });
            // 减少金币
            Laya.stage.on("MoneyReduce", this, function (e) {
                _this.GameInfo.coin = subtraction(_this.GameInfo.coin, String(e));
                _this._Money.text = Format(_this.GameInfo.coin);
            });
            // 修改金元宝
            Laya.stage.on("diamondsSet", this, function (e) {
                _this.GameInfo.diamonds = String(e);
                _this._Diamonds.text = Format(String(e));
            });
            // 添加金元宝
            Laya.stage.on("diamondsAdd", this, function (e) {
                _this.GameInfo.diamonds = addition(_this.GameInfo.diamonds, String(e));
                _this._Diamonds.text = Format(_this.GameInfo.diamonds);
            });
            // 减少金元宝
            Laya.stage.on("diamondsReduce", this, function (e) {
                _this.GameInfo.diamonds = subtraction(_this.GameInfo.diamonds, String(e));
                _this._Diamonds.text = Format(_this.GameInfo.diamonds);
            });
            // 添加抽奖券
            Laya.stage.on("volumAdd", this, function (e) {
                _this.GameInfo.volum += Number(e);
                if (_this.GameInfo.volum <= 0)
                    _this.GameInfo.volum = 0;
                if (_this.GameInfo.volum >= 50)
                    _this.GameInfo.volum = 50;
            });
            // 更新商店价格
            Laya.stage.on("locklistSet", this, function (e) {
                if (!e.grade || !e.value) {
                    console.error("更新商店价格出错");
                    return;
                }
                LeadInfo.locklist.forEach(function (item, index) {
                    if (item.grade === String(e.grade)) {
                        item.price = e.value;
                    }
                });
                _this.updateshopBtn(); //更改快速购买显示价格
            });
            // 更新商店解锁信息
            Laya.stage.on("locklistUnlock", this, function (e) {
                if (!e.grade || !e.price) {
                    console.error("更新解锁等级时出错");
                    return;
                }
                LeadInfo.locklist.forEach(function (item, index) {
                    if (item.grade === String(e.grade)) {
                        item.price = e.price;
                        item.type = 1;
                        if (!!e.diamond)
                            item.diamond = e.diamond;
                    }
                });
            });
            // 更新玩家解锁等级
            Laya.stage.on("rolelevelSet", this, function (e) {
                if (!!e) {
                    _this.GameInfo.role_level = Number(e);
                    _this.GameInfo.grade = Number(e) + 4;
                }
                ;
                console.log("更新人物解锁等级为", e);
            });
            // 更新服务器数据信息
            Laya.stage.on("updateCoin", this, function (e) {
                Ajax("get", "https://shop.yunfanshidai.com/xcxht/qinggong/api/updateOutLine.php", {
                    openid: LeadInfo.openID,
                    coin: _this.GameInfo.coin,
                    timestamp: Date.parse(new Date().toString()),
                    volum: _this.GameInfo.volum
                }, function (data) {
                    console.log("已经更新服务器金币数据");
                }, function (err) {
                });
            });
            // 金币速度更改 1 加 2 减
            Laya.stage.on("speedSet", this, function (e) {
                console.log(e);
                var a;
                if (e.type === 1) {
                    a = addition(_this.GameInfo.speed, e.value);
                }
                else if (e.type === 2) {
                    a = subtraction(_this.GameInfo.speed, e.value);
                }
                if (a.slice(0, 1) === "-") {
                    _this.GameInfo.speed = "0";
                    _this._coinspeed.text = 0 + "/\u79D2";
                }
                else {
                    _this.GameInfo.speed = a;
                    _this._coinspeed.text = Format(a) + "/\u79D2";
                }
            });
            // 创建新主角
            Laya.stage.on("LeadCreate", this, function (e) {
                new GAME.lead(e, _this.indexUI);
            });
            // 动画池管理
            Laya.stage.on("adminpool", this, function (e) {
                adminPool.child += e;
                if (adminPool.child >= adminPool.maxLength)
                    adminPool.child = adminPool.maxLength;
                if (adminPool.child <= 0)
                    adminPool.child = 0;
                for (var i = adminPool.maxLength; i--; i) {
                    var target = _this.indexUI.getChildByName("adminList").getChildByName("adminList" + (i + 1));
                    if (i < adminPool.child) {
                        target.skin = "index/weizhi1.png";
                    }
                    else {
                        target.skin = "index/weizhi2.png";
                    }
                }
            });
        };
        // 批量创建主角对象
        index.prototype.Lead = function (data) {
            this.matrix();
            if (!!data && data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                    new GAME.lead(data[i], this.indexUI);
                }
            }
        };
        // 快速购买按钮 显示
        index.prototype.updateshopBtn = function () {
            var _this = this;
            var Leadprice = 0; // 当前主角价格
            LeadInfo.locklist.forEach(function (item, index) {
                if (item.grade === String(_this.GameInfo.role_level)) {
                    Leadprice = item.price;
                }
            });
            this.indexUI.purchase_text.text = Format(String(Leadprice));
        };
        // 主角购买
        index.prototype.leadshop = function () {
            var _this = this;
            if (LeadInfo.Leadlist >= 12) {
                tips("后宫已满");
                return;
            }
            // 自动购买当前解锁最高的主角
            var Leadprice = 0; // 当前主角价格
            LeadInfo.locklist.forEach(function (item, index) {
                if (item.grade === String(_this.GameInfo.role_level)) {
                    Leadprice = item.price;
                }
            });
            if (this.GameInfo.coin === "0" || !ContrastNumber(this.GameInfo.coin, Leadprice)) {
                tips("金币不足");
                return;
            }
            window["_audio"]._Sound("buy"); // 购买音效
            Ajax("get", "https://shop.yunfanshidai.com/xcxht/qinggong/api/buyrole.php", {
                openid: this.GameInfo.userid,
                grade: this.GameInfo.role_level // 购买等级
            }, function (data) {
                console.log(data);
                if (data.status === "success") {
                    var user = {
                        roleid: data.roleid,
                        grade: data.grade,
                        iswork: data.iswork,
                        position: data.position,
                        wages: data.wages,
                        cycle: data.cycle,
                    };
                    new GAME.lead(user, _this.indexUI);
                }
                var coin = data.coin;
                Laya.stage.event("MoneySet", coin); // 用户剩余金币
                Laya.stage.event("locklistSet", { grade: data.grade, value: data.price }); // 更新商店价格
                // this.updateshopBtn();// 更新价格
                // tips("购买成功");
            }, function (err) {
                tips("购买失败");
            });
        };
        // 碰撞矩阵
        index.prototype.matrix = function () {
            // 对象槽矩阵
            for (var i = 12; i--;) {
                var target = this.indexUI.getChildByName("pool" + (i + 1));
                collision.push(getMatrix(target));
            }
            ;
            // 动画池矩阵
            collision.push(getMatrix(this.indexUI.getChildByName("AnimationPool")));
            // 回收矩阵
            collision.push(getMatrix(this.indexUI.getChildByName("recovery")));
            // 动画运动范围
            var AnimationPool = this.indexUI.getChildByName("adminrange");
            adminPool.Range = {
                startX: AnimationPool.x,
                startY: AnimationPool.y,
                endX: AnimationPool.x + AnimationPool.width,
                endY: AnimationPool.y + AnimationPool.height,
                target: AnimationPool
            };
        };
        return index;
    }());
    GAME.index = index;
})(GAME || (GAME = {}));
//# sourceMappingURL=index.js.map