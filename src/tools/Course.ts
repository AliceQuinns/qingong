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
        private parentself;// 父环境

        constructor(traget, self) {
            this.targetUI = traget;
            this.parentself = self;
        }

        // 初始化引导界面
        public open() {
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

            window["aa"] = this.hand;


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

            // 停止事件冒泡
            this.mask.on(Laya.Event.CLICK, this, e => {
                e.stopPropagation();
            })

            // 购买
            this.purchase();
        }

        // 购买教程
        public purchase() {
            let a = this._zOrder;

            let target = this.targetUI.getChildByName("purchase") as Laya.Button;
            let texta = this.targetUI.getChildByName("purchase_text") as Laya.Text;
            a = [target.zOrder, target.zOrder = a][0];
            texta.zOrder = target.zOrder;

            this.tips.pos(target.x, target.y - target.height * 1.2);

            this.hand.pos(target.x, target.y + target.height / 2);

            movePos(this.hand, { x: this.hand.x, y: this.hand.y }, { x: this.hand.x + target.width - this.hand.width, y: this.hand.y }, 15);

            target.once(Laya.Event.CLICK, this, e => {
                this.Synthesis();
                a = [target.zOrder, target.zOrder = a][0];
            })
        }

        // 合成教程
        public Synthesis() {
            this.tipstext.text = "拖动升级";
            let pool1, pool2;

            if (!this.targetUI.getChildByName("pool1")["leadClass"] || !this.targetUI.getChildByName("pool2")["leadClass"]) {
                pool1 = this.targetUI.getChildByName("pool1");
                pool2 = this.targetUI.getChildByName("pool2");
            } else {
                pool1 = this.targetUI.getChildByName("pool1").leadClass.icon.parent;
                pool2 = this.targetUI.getChildByName("pool2").leadClass.icon.parent;
            }

            let a = pool1._zOrder;
            pool1.zOrder = 120;
            pool2.zOrder = pool1.zOrder;

            this.tips.pos(pool1.x - pool1.width / 2, pool1.y - pool1.height * 1.2);

            this.hand.pos(pool1.x, pool1.y + pool1.height);

            movePos(this.hand, { x: this.hand.x, y: this.hand.y }, { x: this.hand.x + 200, y: this.hand.y }, 15);

            pool1.once(Laya.Event.CLICK, this, e => {
                this.work();
                pool1.zOrder = a;
                pool2.zOrder = pool1.zOrder;
            });

            pool2.once(Laya.Event.CLICK, this, e => {
                this.work();
                pool1.zOrder = a;
                pool2.zOrder = pool1.zOrder;
            })
        }

        // 工作教程
        public work() {
            this.mask.zOrder = -1;

            this.tips.pos(179, 200);

            movePos(this.hand, { x: 200, y: 310 }, { x: this.hand.x, y: this.hand.y }, 15);

            this.tipstext.text = "拖动玩家到此";

            Laya.stage.once("adminpool", this, e => {
                this.palace();
            })
        }

        // 冷宫教程
        public palace() {
            this.mask.zOrder = 102;
            this.tipstext.text = "进入攻击敌人";

            let target = this.targetUI.palace as Laya.Image;
            target.zOrder = this._zOrder;

            this.tips.pos(target.x, target.y - target.height * 1.2);
            this.hand.pos(target.x, target.y + target.height * 1.2);

            movePos(this.hand, { x: this.hand.x, y: this.hand.y }, { x: this.hand.x + target.width, y: this.hand.y }, 15);

            target.once(Laya.Event.CLICK, this, e => {
                target.zOrder = 0;

                window.setTimeout(() => {

                    Laya.Tween.clearAll(this.hand);

                    this.tips.pos(Laya.stage.width * 0.2, Laya.stage.height * 0.1);
                    this.hand.pos(Laya.stage.width * 0.3, Laya.stage.height * 0.3);
                    

                    Laya.stage.removeChild(this.hand);
                    Laya.stage.removeChild(this.tips);

                    Laya.stage.addChild(this.tips);
                    Laya.stage.addChild(this.hand);

                    this.tipstext.text = "开始攻击敌人";

                    window.setTimeout(() => {
                        Laya.stage.once(Laya.Event.CLICK, this, e => {
                            this.tips.destroy();
                            this.hand.destroy();
                            this.mask.destroy();

                            tips("您已经完成新手教学");
                        });
                    }, 0);

                }, 500);
            });
        }

    }
}