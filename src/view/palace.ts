// 冷宫模块  对象
module GAME {
    export class palace {
        private enemy;// 敌人弹框
        constructor() {

        }
        // 开启冷宫模块
        public open() {
            let targetUI = init_alert(ui.palaceUI);
            let target = targetUI._list
            Ajax("get", "https://shop.yunfanshidai.com/xcxht/qinggong/api/getEnemy.php", {
                openid: LeadInfo.openID
            }, data => {
                console.log(data);
                if (data.enemylist.length <= 0) {
                    tips("暂时没有敌人");
                } else {
                    let k = data.enemylist.length;
                    for (let i = 0; i < 39 - k; i++) {
                        data.enemylist.push({ visible: true });
                    }

                    target.vScrollBarSkin = '';
                    target.array = data.enemylist;
                    target.scrollBar.elasticBackTime = 500;
                    target.scrollBar.elasticDistance = 100;

                    target.renderHandler = new Laya.Handler(this, (cell: Laya.Box, index: number) => {
                        if (index > data.enemylist.length) return;
                        let userData = data.enemylist[index]; // 单项数据

                        let Unlocked = cell.getChildByName("Unlocked") as Laya.Image;// 未解锁
                        let Unlock = cell.getChildByName("Unlock") as Laya.Image;// 已解锁

                        if (userData["visible"]) {
                            Unlocked.visible = true;
                            Unlock.visible = false;
                            cell.offAll(Laya.Event.CLICK);
                        } else {
                            // 已解锁
                            Unlocked.visible = false;
                            Unlock.visible = true;
                            let lead = Unlock.getChildByName("Lead") as Laya.Image;
                            lead.skin = `Enemy/${userData.level}.png`;

                            let Leadname = Unlock.getChildByName("Leadname") as Laya.Text;
                            Leadname.text = userData.name;

                            addClick(cell, () => {
                                console.log(userData.name);
                                this.Enemy({ Leadname: userData.name, level: userData.level, coin: userData.coin });
                            }, this, true);
                        }
                    })
                }
            }, err => {
                tips("暂时无法获取敌人数据");
            })
        }

        // 敌人信息弹框 
        private Enemy(data) {
            this.enemy = init_alert(ui.BattleUI);

            let Leadname = this.enemy.getChildByName("content").getChildByName("Leadname") as Laya.Text;// 人物姓名
            Leadname.text = data.Leadname;

            let Lead = this.enemy.getChildByName("content").getChildByName("Lead") as Laya.Image;// 人物
            Lead.skin = `Enemy/${data.level}.png`;

            let textcont = this.enemy.getChildByName("content").getChildByName("textcont") as Laya.Text;
            textcont.text = `赏赐${data.Leadname}5个巴掌 即可获得${Format(data.coin)}个金币`;

            addClick(Lead, () => {
                console.log(data.coin);
                this.BattleAnimation(Lead, data.coin);
            }, this);
        }

        // 战斗动画
        private BattleAnimation(pos, money) {
            var skeleton: Laya.Skeleton = new Laya.Skeleton();

            pos.addChild(skeleton);
            skeleton.pos(pos.x, pos.y + 50);

            skeleton.load("https://shop.yunfanshidai.com/xcxht/qinggong/res/animation/hand.sk");

            // 战斗抖动
            var x = 10;
            var y = 10;
            let time = window.setInterval(() => {
                Laya.stage.x += x;
                Laya.stage.y += y;
                x = -x;
                y = -y;
            }, 10);

            var times;

            window.setTimeout(() => {
                Laya.stage.pos(0, 0);
                skeleton.destroy();
                window.clearInterval(time);
                let _targetUI = init_alert(ui.reward2UI, () => {
                    // 旋转光效
                    let Light = _targetUI.getChildByName("content").getChildByName("Light") as Laya.Image;
                    times = window.setInterval(() => {
                        Light.rotation += 10;
                    }, 50);
                }, () => {
                    Laya.stage.event("MoneyAdd", money);
                    tips(`已获得${Format(money)} 金币`);
                    window.clearInterval(times);
                });
            }, 3000);

        }

    }
}