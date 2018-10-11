// 新手指引
var GAME;
(function (GAME) {
    var Course = /** @class */ (function () {
        function Course(traget, self) {
            this._zOrder = 103;
            this.targetUI = traget;
            this.parentself = self;
        }
        // 初始化引导界面
        Course.prototype.open = function () {
            // 遮罩层
            this.mask = new Laya.Image("index/mask.png");
            this.mask.pos(-180, -180);
            this.mask.width = 1500;
            this.mask.height = 1500;
            this.targetUI.addChild(this.mask);
            this.mask.zOrder = 102;
            this.mask.alpha = 0.5;
            // 手
            this.hand = new Laya.Image("index/hand2.png");
            this.hand.pos(442, 1191);
            this.hand.zOrder = 103;
            this.targetUI.addChild(this.hand);
            window["aa"] = this.hand;
            // tips
            this.tips = new Laya.Image("index/upgrade.png");
            this.tips.pos(314, 1014);
            this.tips.zOrder = 103;
            this.targetUI.addChild(this.tips);
            // arrow
            this.Arrow = new Laya.Image("index/arrow.png");
            this.tips.addChild(this.Arrow);
            this.Arrow.pos(48, 65);
            // tipstext
            this.tipstext = new Laya.Text();
            this.tips.addChild(this.tipstext);
            this.tipstext.pos(2, 10);
            this.tipstext.width = 145;
            this.tipstext.height = 43;
            this.tipstext.font = "Arial";
            this.tipstext.text = "点击购买";
            this.tipstext.fontSize = "20";
            this.tipstext.bold = true;
            this.tipstext.color = "#653e21";
            this.tipstext.align = "center";
            this.tipstext.overflow = "hidden";
            this.tipstext.valign = "middle";
            // 停止事件冒泡
            this.mask.on(Laya.Event.CLICK, this, function (e) {
                e.stopPropagation();
            });
            // 购买
            this.purchase();
        };
        // 购买教程
        Course.prototype.purchase = function () {
            var _this = this;
            var a = this._zOrder;
            var target = this.targetUI.getChildByName("purchase");
            var texta = this.targetUI.getChildByName("purchase_text");
            a = [target.zOrder, target.zOrder = a][0];
            texta.zOrder = target.zOrder;
            this.tips.pos(target.x, target.y - target.height * 1.2);
            this.hand.pos(target.x, target.y + target.height / 2);
            movePos(this.hand, { x: this.hand.x, y: this.hand.y }, { x: this.hand.x + target.width - this.hand.width, y: this.hand.y }, 15);
            target.once(Laya.Event.CLICK, this, function (e) {
                _this.Synthesis();
                a = [target.zOrder, target.zOrder = a][0];
            });
        };
        // 合成教程
        Course.prototype.Synthesis = function () {
            var _this = this;
            this.tipstext.text = "拖动升级";
            var pool1, pool2;
            if (!this.targetUI.getChildByName("pool1")["leadClass"] || !this.targetUI.getChildByName("pool2")["leadClass"]) {
                pool1 = this.targetUI.getChildByName("pool1");
                pool2 = this.targetUI.getChildByName("pool2");
            }
            else {
                pool1 = this.targetUI.getChildByName("pool1").leadClass.icon.parent;
                pool2 = this.targetUI.getChildByName("pool2").leadClass.icon.parent;
            }
            var a = pool1._zOrder;
            pool1.zOrder = 120;
            pool2.zOrder = pool1.zOrder;
            this.tips.pos(pool1.x - pool1.width / 2, pool1.y - pool1.height * 1.2);
            this.hand.pos(pool1.x, pool1.y + pool1.height);
            movePos(this.hand, { x: this.hand.x, y: this.hand.y }, { x: this.hand.x + 200, y: this.hand.y }, 15);
            pool1.once(Laya.Event.CLICK, this, function (e) {
                _this.work();
                pool1.zOrder = a;
                pool2.zOrder = pool1.zOrder;
            });
            pool2.once(Laya.Event.CLICK, this, function (e) {
                _this.work();
                pool1.zOrder = a;
                pool2.zOrder = pool1.zOrder;
            });
        };
        // 工作教程
        Course.prototype.work = function () {
            var _this = this;
            this.mask.zOrder = -1;
            this.tips.pos(179, 200);
            movePos(this.hand, { x: 200, y: 310 }, { x: this.hand.x, y: this.hand.y }, 15);
            this.tipstext.text = "拖动玩家到此";
            Laya.stage.once("adminpool", this, function (e) {
                _this.palace();
            });
        };
        // 冷宫教程
        Course.prototype.palace = function () {
            var _this = this;
            this.mask.zOrder = 102;
            this.tipstext.text = "进入攻击敌人";
            var target = this.targetUI.palace;
            target.zOrder = this._zOrder;
            this.tips.pos(target.x, target.y - target.height * 1.2);
            this.hand.pos(target.x, target.y + target.height * 1.2);
            movePos(this.hand, { x: this.hand.x, y: this.hand.y }, { x: this.hand.x + target.width, y: this.hand.y }, 15);
            target.once(Laya.Event.CLICK, this, function (e) {
                target.zOrder = 0;
                window.setTimeout(function () {
                    Laya.Tween.clearAll(_this.hand);
                    _this.tips.pos(Laya.stage.width * 0.2, Laya.stage.height * 0.1);
                    _this.hand.pos(Laya.stage.width * 0.3, Laya.stage.height * 0.3);
                    Laya.stage.removeChild(_this.hand);
                    Laya.stage.removeChild(_this.tips);
                    Laya.stage.addChild(_this.tips);
                    Laya.stage.addChild(_this.hand);
                    _this.tipstext.text = "开始攻击敌人";
                    window.setTimeout(function () {
                        Laya.stage.once(Laya.Event.CLICK, _this, function (e) {
                            _this.tips.destroy();
                            _this.hand.destroy();
                            _this.mask.destroy();
                            tips("您已经完成新手教学");
                        });
                    }, 0);
                }, 500);
            });
        };
        return Course;
    }());
    GAME.Course = Course;
})(GAME || (GAME = {}));
//# sourceMappingURL=Course.js.map