// 转盘模块
var GAME;
(function (GAME) {
    var turntable = /** @class */ (function () {
        function turntable() {
            this.GameInfo = 0; // 抽奖券
            this.radices = 0; // 当前金币产生速度
        }
        turntable.prototype.open = function (data) {
            this.GameInfo = data.volum;
            this.radices = data.speed;
            this.targetUI = init_alert(ui.LuckdrawUI);
            this.btn = this.targetUI.getChildByName("content").getChildByName("_btn"); // 按钮
            this.turntable = this.targetUI.getChildByName("content").getChildByName("_turntable"); // 转盘
            // 花朵动画
            var hua1 = this.targetUI.getChildByName("content").getChildByName("hua1");
            var hua2 = this.targetUI.getChildByName("content").getChildByName("hua2");
            scaleAdmin(hua1);
            scaleAdmin(hua2);
            this.event();
        };
        // 转盘开启
        turntable.prototype.event = function () {
            var _this = this;
            this.updatevoluce();
            if (this.GameInfo <= 0) {
                tips("抽奖券不足够");
                return;
            }
            Ajax("get", "https://shop.yunfanshidai.com/xcxht/qinggong/api/choujiang.php", {
                openid: LeadInfo.openID,
                radices: this.radices
            }, function (data) {
                console.log(data);
                var self = _this;
                var Result = Number(data.award) - 1; // 类型
                var title = data["content"]; // 剧情文本
                // let size = 100;
                // 按钮事件
                _this.btn.once(Laya.Event.CLICK, _this, function (e) {
                    _this.admin(_this.turntable, (8 - Result) * 45, Laya.Handler.create(_this, function () {
                        // 奖励特效界面
                        _this.PropUI(Result, title, function () {
                            self.turntable.rotation = 0; // 转盘还原
                            Laya.stage.event("volumAdd", -1);
                            self.updatevoluce();
                            Ajax("get", "https://shop.yunfanshidai.com/xcxht/qinggong/api/getaward.php", {
                                openid: LeadInfo.openID,
                                rid: data.rid
                            });
                            _this.propui = null;
                        });
                    }));
                });
            }, function (err) {
                tips("暂时无法抽奖");
            });
        };
        // 转盘动画
        turntable.prototype.admin = function (target, angle, callback) {
            // 转动速度为2秒一圈 不论角度多少都要转2圈
            var angles = angle + 720 + target.rotation;
            var time = 4000 + angle / 360 * 2000;
            Laya.Tween.to(target, { rotation: angles }, time, Laya.Ease.expoOut, callback, null);
        };
        // 道具界面特效
        turntable.prototype.PropUI = function (type, title, callback) {
            if (callback === void 0) { callback = null; }
            var self = this;
            if (!!this.propui)
                return;
            var targetUI = init_alert(ui.rewardUI, null, function () {
                window.clearInterval(time);
                self.event();
                if (!!callback)
                    callback();
                // 通知服务器该玩家已经领取奖励
            });
            this.propui = targetUI;
            // 旋转光效
            var Light = targetUI.getChildByName("content").getChildByName("Light");
            var time = window.setInterval(function () {
                Light.rotation += 10;
            }, 50);
            var Textarea = targetUI.getChildByName("content").getChildByName("Textarea"); // 文本区
            var reward = targetUI.getChildByName("content").getChildByName("reward"); // 数量文本
            switch (type) {
                case 0:
                    // 皇上
                    var target = targetUI.getChildByName("content").getChildByName("hangshang");
                    var img = targetUI.getChildByName("content").getChildByName("jingyuanbao");
                    target.visible = true;
                    img.visible = true;
                    scaleAdmin(target);
                    reward.text = "\u606D\u559C\u60A8\u83B7\u5F97\u91D1\u5143\u5B9D" + 3 + "\u4E2A";
                    Laya.stage.event("diamondsAdd", 3);
                    // 处理字体
                    fontAdmin(title.slice(0, 15), 0, Textarea.width * 0.65, 50, 40, Textarea); // 右边文字
                    fontAdmin(title.slice(15, title.length), 0, Textarea.width * 0.15, 50, 40, Textarea); // 左边文字
                    break;
                case 1:
                    // x2金币
                    Light.pos(0, -205);
                    var coin = targetUI.getChildByName("content").getChildByName("coin");
                    coin.visible = true;
                    coin.pos(-76, -245);
                    Textarea.visible = false;
                    reward.text = "\u606D\u559C\u60A8\u83B7\u5F97\u91D1\u5E01" + Format((self.radices * 2).toString()) + "\u4E2A";
                    Laya.stage.event("MoneyAdd", self.radices * 2);
                    break;
                case 2:
                    // 太监
                    var target = targetUI.getChildByName("content").getChildByName("taijian");
                    var img = targetUI.getChildByName("content").getChildByName("coin");
                    target.visible = true;
                    img.visible = true;
                    scaleAdmin(target);
                    reward.text = "\u60A8\u8D4F\u8D50\u592A\u76D1\u603B\u7BA1" + Format((self.radices).toString()) + "\u4E2A\u91D1\u5E01";
                    // 处理字体
                    fontAdmin(title.slice(0, 15), 0, Textarea.width * 0.65, 50, 40, Textarea); // 右边文字
                    fontAdmin(title.slice(15, title.length), 0, Textarea.width * 0.15, 50, 40, Textarea); // 左边文字
                    break;
                case 3:
                    // x3金币
                    Light.pos(0, -205);
                    var coin = targetUI.getChildByName("content").getChildByName("coin");
                    coin.visible = true;
                    coin.pos(-76, -245);
                    Textarea.visible = false;
                    reward.text = "\u606D\u559C\u60A8\u83B7\u5F97\u91D1\u5E01" + Format((self.radices * 3).toString()) + "\u4E2A";
                    Laya.stage.event("MoneyAdd", self.radices * 3);
                    break;
                case 4:
                    // 皇后
                    var target = targetUI.getChildByName("content").getChildByName("huangho");
                    var img = targetUI.getChildByName("content").getChildByName("jingyuanbao");
                    target.visible = true;
                    img.visible = true;
                    scaleAdmin(target);
                    reward.text = "\u606D\u559C\u60A8\u83B7\u5F97" + 2 + "\u4E2A\u91D1\u5143\u5B9D";
                    Laya.stage.event("diamondsAdd", 2);
                    // 处理字体
                    fontAdmin(title.slice(0, 15), 0, Textarea.width * 0.65, 50, 40, Textarea); // 右边文字
                    fontAdmin(title.slice(15, title.length), 0, Textarea.width * 0.15, 50, 40, Textarea); // 左边文字
                    break;
                case 5:
                    // x3抽奖券
                    Light.pos(0, -205);
                    var coin = targetUI.getChildByName("content").getChildByName("Lottery");
                    coin.visible = true;
                    coin.pos(-76, -245);
                    Textarea.visible = false;
                    reward.text = "\u606D\u559C\u60A8\u83B7\u5F97\u62BD\u5956\u5238" + 3 + "\u5F20";
                    Laya.stage.event("volumAdd", 3);
                    break;
                case 6:
                    // 太后
                    var target = targetUI.getChildByName("content").getChildByName("taiho");
                    var img = targetUI.getChildByName("content").getChildByName("jingyuanbao");
                    target.visible = true;
                    img.visible = true;
                    scaleAdmin(target);
                    reward.text = "\u606D\u559C\u60A8\u83B7\u5F97" + 1 + "\u4E2A\u91D1\u5143\u5B9D";
                    Laya.stage.event("diamondsAdd", 1);
                    // 处理字体
                    fontAdmin(title.slice(0, 15), 0, Textarea.width * 0.65, 50, 40, Textarea); // 右边文字
                    fontAdmin(title.slice(15, title.length), 0, Textarea.width * 0.15, 50, 40, Textarea); // 左边文字
                    break;
                case 7:
                    // x1 金币
                    Light.pos(0, -205);
                    var coin = targetUI.getChildByName("content").getChildByName("coin");
                    coin.visible = true;
                    coin.pos(-76, -245);
                    Textarea.visible = false;
                    reward.text = "\u606D\u559C\u60A8\u83B7\u5F97\u91D1\u5E01" + Format((self.radices).toString()) + "\u4E2A";
                    Laya.stage.event("MoneyAdd", self.radices);
                    break;
                default:
                    console.log("道具界面 类型错误");
                    break;
            }
        };
        // 刷新抽奖券的显示
        turntable.prototype.updatevoluce = function () {
            var text = this.targetUI.getChildByName("content").getChildByName("Lottery");
            text.text = window["GameInfo"].volum;
        };
        return turntable;
    }());
    GAME.turntable = turntable;
})(GAME || (GAME = {}));
//# sourceMappingURL=turntable.js.map