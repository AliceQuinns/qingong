// 商店
module GAME {
    export class shop {
        private list;// 人物列表
        constructor(data) {
            this.list = data;
        }
        private open() {
            let data = this.list;// 人物数据
            let lockListUI = init_alert(ui.lockListUI);
            let target = lockListUI._list;// 列表节点

            target.vScrollBarSkin = '';
            target.array = data;
            target.scrollBar.elasticBackTime = 500;
            target.scrollBar.elasticDistance = 100;

            target.renderHandler = new Laya.Handler(this, (cell: Laya.Box, index: number) => {
                if (index > data.length) return;
                let userData = data[index]; // 单项数据

                let price = cell.getChildByName('btn_coin').getChildByName("btn_coin_text") as Laya.Text;// 价格
                price.text = Format(userData.price);

                let LeadName = cell.getChildByName("LeadName") as Laya.Text;// 姓名
                LeadName.text = userData.name;

                if (userData.type === 1) {
                    // 已解锁

                    let Invisible = cell.getChildByName("Invisible") as Laya.Image;// 关闭未解锁图标
                    Invisible.visible = false;

                    let grade = cell.getChildByName("grade") as Laya.Text; // 等级
                    grade.visible = true;
                    grade.text = userData.grade;

                    let grade_bg = cell.getChildByName("grade_bg") as Laya.Image; // 等级背景
                    grade_bg.visible = true;

                    let lead = cell.getChildByName("lead") as Laya.Image; // 主角
                    lead.skin = `Lead/${userData.grade}.png`;
                    lead.visible = true;

                    // 是否可以使用元宝购买
                    if (Number(userData.diamond) > 0) {
                        let btn_yuanbao = cell.getChildByName("btn_yuanbao") as Laya.Button;// 元宝
                        btn_yuanbao.visible = true;
                        let text = btn_yuanbao.getChildByName("btn_yuanbao_text") as Laya.Text;// 价格
                        text.text = userData.diamond;
                    }

                    // 购买按钮
                    let priceBtn = cell.getChildByName('btn_coin') as Laya.Button;
                    priceBtn.disabled = false;
                    addClick(priceBtn, () => {
                        this.purchase(userData.grade, userData.price, data => {
                            price.text = Format(data.price);// 更新购买后的价格
                        });
                        console.log(userData.grade);
                    }, this, true);

                } else if (userData.type === 2) {
                    // 未解锁

                    let Invisible = cell.getChildByName("Invisible") as Laya.Image;// 未解锁图标
                    Invisible.visible = true;

                    let lead = cell.getChildByName("lead") as Laya.Image; // 主角
                    lead.visible = false;

                    let grade = cell.getChildByName("grade") as Laya.Text; // 等级
                    grade.visible = false;

                    let grade_bg = cell.getChildByName("grade_bg") as Laya.Image; // 等级背景
                    grade_bg.visible = false;

                    let priceBtn = cell.getChildByName('btn_coin') as Laya.Button;// 购买按钮
                    priceBtn.disabled = true;
                }

                return;
            })
        }

        // 购买
        private purchase(grade, price, callback: any = null) {
            // 购买
            if (LeadInfo.Leadlist >= 12) {
                tips("后宫已满");
                return;
            }
            
            if (window['GameInfo'].coin === "0" || !ContrastNumber(window['GameInfo'].coin,price)) {
                tips("金币不足");
                return;
            }
            
            Ajax("get", "https://shop.yunfanshidai.com/xcxht/qinggong/api/buyrole.php", {
                openid: LeadInfo.openID,
                grade: grade, // 购买等级
            }, data => {
                console.log(data);

                if (data.status === "success") {
                    let user = {
                        roleid: data.roleid,
                        grade: data.grade,
                        iswork: data.iswork,
                        position: data.position,
                        wages: data.wages,
                        cycle: data.cycle,
                    };
                    Laya.stage.event("LeadCreate", user);// 创建主角

                    if (!!callback) callback(data);

                    var coin = data.coin;
                    Laya.stage.event("MoneySet", coin);// 修改剩余金币

                    Laya.stage.event("locklistSet", { grade: data.grade, value: data.price });// 更新商店价格

                    tips("购买成功");

                } else {

                    tips("购买失败");

                }

            }, err => {
                tips("购买失败");
            });

        }
    }
}