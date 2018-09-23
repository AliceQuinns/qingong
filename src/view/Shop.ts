// 商店
module GAME {
    export class shop {
        private list;// 人物列表
        constructor(data) {
            this.list = data;
            console.log(data);
            console.log("商店");
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
                let userData = data[index];// 单项数据

                if (userData.type === 1) {
                    // 已解锁

                    let grade = cell.getChildByName("grade") as Laya.Text; // 等级
                    grade.text = userData.grade;

                    let lead = cell.getChildByName("lead") as Laya.Image; // 主角
                    lead.skin = `Lead/${userData.grade}.png`;

                    let price = cell.getChildByName('btn_coin').getChildByName("btn_coin_text") as Laya.Text;// 价格
                    price.text = userData.price;

                    let LeadName = cell.getChildByName("LeadName") as Laya.Text;// 姓名
                    LeadName.text = userData.name;
                    

                    // 是否可以使用元宝购买
                    if (Number(userData.diamond) > 0) {
                        let btn_yuanbao = cell.getChildByName("btn_yuanbao") as Laya.Button;// 元宝
                        btn_yuanbao.visible = true;
                        let text = btn_yuanbao.getChildByName("btn_yuanbao_text") as Laya.Text;// 价格
                        text.text = userData.diamond;
                    }
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
                }else{
                    return;
                }
            })
        }
    }
}