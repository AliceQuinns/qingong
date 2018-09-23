// 转盘模块
var GAME;
(function (GAME) {
    var turntable = /** @class */ (function () {
        function turntable() {
        }
        turntable.prototype.open = function () {
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
            // 请求结果 ——ajax
            var self = this;
            var Result = 0;
            var title = "御花园偶遇皇上获得恩宠，奖赏3000金元宝";
            var size = 100;
            this.btn.once(Laya.Event.CLICK, this, function (e) {
                _this.admin(_this.turntable, (8 - Result) * 45, Laya.Handler.create(_this, function () {
                    _this.PropUI(Result, title, size, function () {
                        self.turntable.rotation = 0;
                    }); // 奖励特效
                }));
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
        turntable.prototype.PropUI = function (type, title, size, callback) {
            if (callback === void 0) { callback = null; }
            var self = this;
            var targetUI = init_alert(ui.rewardUI, null, function () {
                window.clearInterval(time);
                self.event();
                if (!!callback)
                    callback();
                // 通知服务器该玩家已经领取奖励
            });
            // 旋转光效
            var Light = targetUI.getChildByName("content").getChildByName("Light");
            var time = window.setInterval(function () {
                Light.rotation += 10;
            }, 100);
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
                    reward.text = "\u606D\u559C\u60A8\u83B7\u5F97\u91D1\u5143\u5B9D" + size + "\u4E2A";
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
                    reward.text = "\u606D\u559C\u60A8\u83B7\u5F97\u91D1\u5E01" + size + "\u4E2A";
                    break;
                case 2:
                    // 太监
                    var target = targetUI.getChildByName("content").getChildByName("taijian");
                    var img = targetUI.getChildByName("content").getChildByName("coin");
                    target.visible = true;
                    img.visible = true;
                    scaleAdmin(target);
                    reward.text = "\u60A8\u8D4F\u8D50\u592A\u76D1\u603B\u7BA1" + size + "\u4E2A\u91D1\u5E01";
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
                    reward.text = "\u606D\u559C\u60A8\u83B7\u5F97\u91D1\u5E01" + size + "\u4E2A";
                    break;
                case 4:
                    // 皇后
                    var target = targetUI.getChildByName("content").getChildByName("huangho");
                    var img = targetUI.getChildByName("content").getChildByName("jingyuanbao");
                    target.visible = true;
                    img.visible = true;
                    scaleAdmin(target);
                    reward.text = "\u606D\u559C\u60A8\u83B7\u5F97" + size + "\u4E2A\u91D1\u5143\u5B9D";
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
                    break;
                case 6:
                    // 太后
                    var target = targetUI.getChildByName("content").getChildByName("taiho");
                    var img = targetUI.getChildByName("content").getChildByName("jingyuanbao");
                    target.visible = true;
                    img.visible = true;
                    scaleAdmin(target);
                    reward.text = "\u606D\u559C\u60A8\u83B7\u5F97" + size + "\u4E2A\u91D1\u5143\u5B9D";
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
                    reward.text = "\u606D\u559C\u60A8\u83B7\u5F97\u91D1\u5E01" + size + "\u4E2A";
                    break;
                default:
                    console.log("道具界面 类型错误");
                    break;
            }
        };
        return turntable;
    }());
    GAME.turntable = turntable;
})(GAME || (GAME = {}));
//# sourceMappingURL=turntable.js.map