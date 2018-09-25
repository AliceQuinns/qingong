var GAME;
(function (GAME) {
    var index = /** @class */ (function () {
        function index() {
            //  玩家数据
            this.GameInfo = {
                userid: "0",
                coin: "0",
                diamonds: "0",
                volum: "0",
                speed: 0,
                grade: 1,
                role_level: 1,
            };
            Laya.loader.load([
                "res/atlas/index.atlas",
                "https://shop.yunfanshidai.com/xcxht/qinggong/res/Lead.atlas",
                "https://shop.yunfanshidai.com/xcxht/qinggong/res/Enemy.atlas",
            ], Laya.Handler.create(this, this.init));
            window["___index"] = this;
        }
        index.prototype.init = function () {
            var _this = this;
            // 场景添加
            this.indexUI = new ui.indexUI;
            Laya.stage.addChild(this.indexUI);
            // 加载用户数据
            Ajax("GET", "https://shop.yunfanshidai.com/xcxht/qinggong/api/login.php", null, function (data) {
                if (data['status'] === "fail") {
                    console.log("登陆失败");
                }
                else if (data['status'] === "success") {
                    _this.customEvent(); // 自定义事件
                    _this.staticObj(); // 静态化常用变量
                    console.log(data);
                    // 收益弹框
                    var alertUI_1 = init_alert(ui.alertUI, function () {
                        var text = alertUI_1.getChildByName("content").getChildByName("contentText");
                        text.text = (!!data.offline) ? data.offline : "0个金元宝";
                    });
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
                    // 冷宫列表
                    (!!data.lglist) ? LeadInfo.palaceList = data.lglist : console.log("无法获取冷宫列表");
                    // 商店列表
                    (!!data.lockinfo) ? LeadInfo.locklist = data.lockinfo : console.log("无法获取商店列表");
                    _this.turntable = new GAME.turntable(); // 转盘模块
                    _this.shop = new GAME.shop(LeadInfo.locklist); // 商店模块
                    _this.palace = new GAME.palace(LeadInfo.palaceList); // 冷宫模块
                    _this.event(); // 事件监听
                    // 定时更新服务器金币
                    window.setInterval(function () {
                        Laya.stage.event("updateCoin");
                    }, 30000);
                }
            }, function (err) {
                console.log(err, "无法请求数据");
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
                _this.turntable.open();
            }, this);
            // 商店
            addClick(this.indexUI.shop, function () {
                _this.shop.open();
            });
            // 购买人物
            addClick(this.indexUI.purchase, function () {
                _this.leadshop();
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
            });
            // 减少抽奖券
            Laya.stage.on("volumReduce", this, function (e) {
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
            });
            // 更新玩家解锁等级
            Laya.stage.on("rolelevelSet", this, function (e) {
                if (!!e)
                    _this.GameInfo.role_level = e;
                console.log("更新人物解锁等级为", e);
            });
            // 更新服务器金币
            Laya.stage.on("updateCoin", this, function (e) {
                Ajax("get", "https://shop.yunfanshidai.com/xcxht/qinggong/api/updateOutLine.php", {
                    openid: LeadInfo.openID,
                    coin: _this.GameInfo.coin,
                    timestamp: Date.parse(new Date().toString())
                }, function (data) {
                    console.log("已经更新服务器金币数据");
                }, function (err) {
                });
            });
            // 金币速度更改
            Laya.stage.on("speedSet", this, function (e) {
                _this.GameInfo.speed += e;
                if (_this.GameInfo.speed <= 0)
                    _this.GameInfo.speed = 0;
                _this._coinspeed.text = Format(Math.floor(_this.GameInfo.speed).toString()) + "/\u79D2";
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
        // 主角购买
        index.prototype.leadshop = function () {
            var _this = this;
            if (LeadInfo.Leadlist >= 12) {
                tips("后宫已满");
                return;
            }
            if (this.GameInfo.coin === "0") {
                tips("金币不足");
                return;
            }
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
                // 用户剩余金币
                var coin = data.coin;
                Laya.stage.event("MoneySet", coin);
                tips("购买成功");
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
            var AnimationPool = this.indexUI.getChildByName("AnimationPool");
            adminPool.Range = {
                startX: AnimationPool.x,
                startY: AnimationPool.y + AnimationPool.height / 2,
                endX: AnimationPool.x + AnimationPool.width - LeadInfo.width / 2,
                endY: AnimationPool.y + AnimationPool.height - LeadInfo.height,
                target: AnimationPool
            };
        };
        return index;
    }());
    GAME.index = index;
})(GAME || (GAME = {}));
//# sourceMappingURL=index.js.map