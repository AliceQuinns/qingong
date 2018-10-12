// 冷宫模块  对象
module GAME {
    export class palace {
        private enemy;// 敌人弹框
        private bazdir = true;// 巴掌方向
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
                if (data.status === "fail") { tips("冷宫还未解锁"); return; }
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
            textcont.text = `每赏赐${data.Leadname}1个巴掌 即可获得${Format(data.coin)}个金币`;

            addClick(Lead, () => {

                this.BattleAnimation(Lead, data.coin);

            }, this);
        }

        // 战斗动画
        private BattleAnimation(pos, money) {
            // 短震动
            shock(1);

            // 攻击动画
            attackadmin(pos, 100, { x: pos.x - pos.width / 2, y: pos.y }, 0.01, this.bazdir);
            this.bazdir = !this.bazdir;

            // 窗口抖动
            windowshack(2, 1, 300);

            // 收益提示
            tips(`${Format(money)}金币`, "coin", pos.x + pos.width * Math.random(), pos.y + pos.height * Math.random(), 200);

            // 金币增加
            Laya.stage.event("MoneyAdd", money);

            // 主角缩放
            scaleelastic(pos);

            // 巴掌音效
            window["_audio"]._Sound("slap");
            
            window["_audio"]._Sound("jiao");
        }

    }
}