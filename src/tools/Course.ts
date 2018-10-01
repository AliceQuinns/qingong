// 新手指引
module GAME {
    export class Course {
        private targetUI;// 目标界面
        private mask;// 遮罩层
        private hand;// 手
        private Arrow;// 箭头
        private tips;
        private tipstext;
        private _zOrder = 103;

        constructor(traget) {
            this.targetUI = traget;
        }

        public open() {
            // return;
            // 遮罩层
            this.mask = new Laya.Image("index/mask.png") as Laya.Image;
            this.mask.pos(-180, -180);
            this.mask.width = 1500;
            this.mask.height = 1500;
            this.targetUI.addChild(this.mask);
            this.mask.zOrder = 102;
            this.mask.alpha = 0.5;

            // 手
            this.hand = new Laya.Image("index/hand2.png") as Laya.Image;
            this.hand.pos(442, 1191);
            this.hand.zOrder = 103;
            this.targetUI.addChild(this.hand);


            // tips
            this.tips = new Laya.Image("index/upgrade.png") as Laya.Image;
            this.tips.pos(314, 1014);
            this.tips.zOrder = 103;
            this.targetUI.addChild(this.tips);

            // arrow
            this.Arrow = new Laya.Image("index/arrow.png") as Laya.Image;
            this.tips.addChild(this.Arrow);
            this.Arrow.pos(48, 65);

            // tipstext
            this.tipstext = new Laya.Text() as Laya.Text;
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

            this.mask.on(Laya.Event.CLICK, this, e => {
                e.stopPropagation();
            })

            this.purchase();
        }

        // 购买教程
        public purchase() {
            let a = this._zOrder;

            let target = this.targetUI.getChildByName("purchase") as Laya.Button;
            a = [target.zOrder, target.zOrder = a][0];

            console.log(target.zOrder);

            this.tips.pos(target.x, target.y - target.height * 1.2);

            this.hand.pos(target.x + target.width / 2 - this.hand.width / 2, target.y + target.height / 2);

            target.once(Laya.Event.CLICK, this, e => {
                this.Synthesis();
                a = [target.zOrder, target.zOrder = a][0];
                console.log("购买");
            })
        }

        // 合成教程
        public Synthesis() {
            this.tipstext.text = "拖动升级";

            // if(!this.targetUI.getChildByName("pool1")["leadClass"])return;
            let pool1 = this.targetUI.getChildByName("pool1").leadClass.icon.parent;
            let pool2 = this.targetUI.getChildByName("pool2").leadClass.icon.parent;
            let a = pool1._zOrder;
            pool1.zOrder = 120;
            pool2.zOrder = pool1.zOrder;

            this.tips.pos(pool1.x - pool1.width / 2, pool1.y - pool1.height * 1.2);

            this.hand.pos(pool1.x, pool1.y + pool1.height);

            pool1.once(Laya.Event.CLICK, this, e => {
                this.work();
                pool1.zOrder = a;
                pool2.zOrder = pool1.zOrder;
                console.log("合成");
            });
        }

        // 工作教程
        public work() {
            Laya.stage.once("Synthesis", this, e => {
                console.log("合成", e);
                e.icon.parent.zOrder = this._zOrder;

                // 动画池
                let AnimationPool = this.targetUI.getChildByName("AnimationPool") as Laya.Image;
                AnimationPool.zOrder = this._zOrder;

                this.tipstext.text = "请拖动到此";

                this.tips.pos(this.tips.x, this.tips.y - 200);
                this.hand.pos(e.icon.parent.x, e.icon.parent.y + e.icon.parent.height);

                Laya.stage.once("workstart", this, e => {
                    AnimationPool.zOrder = 0;
                    this.palace();
                })
            })
        }

        // 冷宫教程
        public palace() {
            let target = this.targetUI.palace as Laya.Image;
            target.zOrder = this._zOrder;

            this.tips.pos(target.x + target.width /2, target.y - target.height * 1.2);
            this.hand.pos(target.x, target.y + target.height * 1.2);

            target.once(Laya.Event.CLICK, this, e => {
                target.zOrder = 0;
            });
        }

    }
}