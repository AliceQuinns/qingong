// 新手指引
var GAME;
(function (GAME) {
    var Course = /** @class */ (function () {
        function Course(traget) {
            this._zOrder = 103;
            this.targetUI = traget;
        }
        Course.prototype.open = function () {
            // return;
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
            this.mask.on(Laya.Event.CLICK, this, function (e) {
                e.stopPropagation();
            });
            this.purchase();
        };
        // 购买教程
        Course.prototype.purchase = function () {
            var _this = this;
            var a = this._zOrder;
            var target = this.targetUI.getChildByName("purchase");
            a = [target.zOrder, target.zOrder = a][0];
            console.log(target.zOrder);
            this.tips.pos(target.x, target.y - target.height * 1.2);
            this.hand.pos(target.x + target.width / 2 - this.hand.width / 2, target.y + target.height / 2);
            target.once(Laya.Event.CLICK, this, function (e) {
                _this.Synthesis();
                a = [target.zOrder, target.zOrder = a][0];
                console.log("购买");
            });
        };
        // 合成教程
        Course.prototype.Synthesis = function () {
            var _this = this;
            this.tipstext.text = "拖动升级";
            // if(!this.targetUI.getChildByName("pool1")["leadClass"])return;
            var pool1 = this.targetUI.getChildByName("pool1").leadClass.icon.parent;
            var pool2 = this.targetUI.getChildByName("pool2").leadClass.icon.parent;
            var a = pool1._zOrder;
            pool1.zOrder = 120;
            pool2.zOrder = pool1.zOrder;
            this.tips.pos(pool1.x - pool1.width / 2, pool1.y - pool1.height * 1.2);
            this.hand.pos(pool1.x, pool1.y + pool1.height);
            pool1.once(Laya.Event.CLICK, this, function (e) {
                _this.work();
                pool1.zOrder = a;
                pool2.zOrder = pool1.zOrder;
                console.log("合成");
            });
        };
        // 工作教程
        Course.prototype.work = function () {
            var _this = this;
            Laya.stage.once("Synthesis", this, function (e) {
                console.log("合成", e);
                e.icon.parent.zOrder = _this._zOrder;
                // 动画池
                var AnimationPool = _this.targetUI.getChildByName("AnimationPool");
                AnimationPool.zOrder = _this._zOrder;
                _this.tipstext.text = "请拖动到此";
                _this.tips.pos(_this.tips.x, _this.tips.y - 200);
                _this.hand.pos(e.icon.parent.x, e.icon.parent.y + e.icon.parent.height);
                Laya.stage.once("workstart", _this, function (e) {
                    AnimationPool.zOrder = 0;
                    _this.palace();
                });
            });
        };
        // 冷宫教程
        Course.prototype.palace = function () {
            var target = this.targetUI.palace;
            target.zOrder = this._zOrder;
            this.tips.pos(target.x + target.width / 2, target.y - target.height * 1.2);
            this.hand.pos(target.x, target.y + target.height * 1.2);
            target.once(Laya.Event.CLICK, this, function (e) {
                target.zOrder = 0;
            });
        };
        return Course;
    }());
    GAME.Course = Course;
})(GAME || (GAME = {}));
//# sourceMappingURL=Course.js.map