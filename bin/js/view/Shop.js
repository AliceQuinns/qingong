// 商店
var GAME;
(function (GAME) {
    var shop = /** @class */ (function () {
        function shop(data) {
            this.list = data;
            console.log(data);
            console.log("商店");
        }
        shop.prototype.open = function () {
            var data = this.list; // 人物数据
            var lockListUI = init_alert(ui.lockListUI);
            var target = lockListUI._list; // 列表节点
            target.vScrollBarSkin = '';
            target.array = data;
            target.scrollBar.elasticBackTime = 500;
            target.scrollBar.elasticDistance = 100;
            target.renderHandler = new Laya.Handler(this, function (cell, index) {
                if (index > data.length)
                    return;
                var userData = data[index]; // 单项数据
                if (userData.type === 1) {
                    // 已解锁
                    var grade = cell.getChildByName("grade"); // 等级
                    grade.text = userData.grade;
                    var lead_1 = cell.getChildByName("lead"); // 主角
                    lead_1.skin = "Lead/" + userData.grade + ".png";
                    var price = cell.getChildByName('btn_coin').getChildByName("btn_coin_text"); // 价格
                    price.text = userData.price;
                    var LeadName = cell.getChildByName("LeadName"); // 姓名
                    LeadName.text = userData.name;
                    // 是否可以使用元宝购买
                    if (Number(userData.diamond) > 0) {
                        var btn_yuanbao = cell.getChildByName("btn_yuanbao"); // 元宝
                        btn_yuanbao.visible = true;
                        var text = btn_yuanbao.getChildByName("btn_yuanbao_text"); // 价格
                        text.text = userData.diamond;
                    }
                }
                else if (userData.type === 2) {
                    // 未解锁
                    var Invisible = cell.getChildByName("Invisible"); // 未解锁图标
                    Invisible.visible = true;
                    var lead_2 = cell.getChildByName("lead"); // 主角
                    lead_2.visible = false;
                    var grade = cell.getChildByName("grade"); // 等级
                    grade.visible = false;
                    var grade_bg = cell.getChildByName("grade_bg"); // 等级背景
                    grade_bg.visible = false;
                }
                else {
                    return;
                }
            });
        };
        return shop;
    }());
    GAME.shop = shop;
})(GAME || (GAME = {}));
//# sourceMappingURL=Shop.js.map