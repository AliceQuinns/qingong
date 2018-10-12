// 商店
var GAME;
(function (GAME) {
    var shop = /** @class */ (function () {
        function shop(data) {
            this.list = data;
        }
        shop.prototype.open = function () {
            var _this = this;
            var data = this.list; // 人物数据
            // console.log(data);
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
                var LeadName = cell.getChildByName("LeadName"); // 姓名
                LeadName.text = userData.name;
                LeadName.visible = true;
                if (userData.type === 1) {
                    // 已解锁
                    var price_1 = cell.getChildByName('btn_coin').getChildByName("btn_coin_text"); // 价格
                    price_1.text = Format(userData.price);
                    var Invisible = cell.getChildByName("Invisible"); // 关闭未解锁图标
                    Invisible.visible = false;
                    var grade = cell.getChildByName("grade"); // 等级
                    grade.visible = true;
                    grade.text = userData.grade;
                    var grade_bg = cell.getChildByName("grade_bg"); // 等级背景
                    grade_bg.visible = true;
                    var lead_1 = cell.getChildByName("lead"); // 主角
                    lead_1.skin = "Lead/" + userData.grade + ".png";
                    lead_1.visible = true;
                    // 是否可以使用元宝购买
                    if (Number(userData.diamond) > 0) {
                        var btn_yuanbao = cell.getChildByName("btn_yuanbao"); // 元宝
                        btn_yuanbao.visible = true;
                        var text = btn_yuanbao.getChildByName("btn_yuanbao_text"); // 价格
                        text.text = userData.diamond;
                    }
                    // 购买按钮
                    var priceBtn = cell.getChildByName('btn_coin');
                    priceBtn.disabled = false;
                    addClick(priceBtn, function () {
                        _this.purchase(userData.grade, userData.price, function (data) {
                            price_1.text = Format(data.price); // 更新购买后的价格
                        });
                        console.log(userData.grade);
                    }, _this, true);
                }
                else if (userData.type === 2 && Number(userData.grade) > Number(window["GameInfo"].grade)) {
                    // 未解锁
                    var price = cell.getChildByName('btn_coin').getChildByName("btn_coin_text"); // 价格
                    price.text = "未解锁";
                    var Invisible = cell.getChildByName("Invisible"); // 未解锁图标
                    Invisible.visible = true;
                    var lead_2 = cell.getChildByName("lead"); // 主角
                    lead_2.visible = false;
                    var grade = cell.getChildByName("grade"); // 等级
                    grade.visible = false;
                    var grade_bg = cell.getChildByName("grade_bg"); // 等级背景
                    grade_bg.visible = false;
                    var priceBtn = cell.getChildByName('btn_coin'); // 购买按钮
                    priceBtn.disabled = true;
                    LeadName.visible = false;
                }
                else {
                    var price = cell.getChildByName('btn_coin').getChildByName("btn_coin_text"); // 价格
                    price.text = "未解锁";
                    var Invisible = cell.getChildByName("Invisible"); // 开启未解锁图标
                    Invisible.visible = false;
                    var grade = cell.getChildByName("grade"); // 等级
                    grade.visible = true;
                    grade.text = userData.grade;
                    var grade_bg = cell.getChildByName("grade_bg"); // 等级背景
                    grade_bg.visible = true;
                    var lead_3 = cell.getChildByName("lead"); // 主角
                    lead_3.skin = "Lead/" + userData.grade + ".png";
                    lead_3.visible = true;
                    var priceBtn = cell.getChildByName('btn_coin'); // 购买按钮
                    priceBtn.disabled = true;
                }
                return;
            });
        };
        // 购买
        shop.prototype.purchase = function (grade, price, callback) {
            if (callback === void 0) { callback = null; }
            // 购买
            if (LeadInfo.Leadlist >= 12) {
                tips("后宫已满");
                return;
            }
            if (window['GameInfo'].coin === "0" || !ContrastNumber(window['GameInfo'].coin, price)) {
                tips("金币不足");
                return;
            }
            window["_audio"]._Sound("buy"); // 购买音效
            Ajax("get", "https://shop.yunfanshidai.com/xcxht/qinggong/api/buyrole.php", {
                openid: LeadInfo.openID,
                grade: grade,
            }, function (data) {
                console.log(data);
                if (data.status === "success") {
                    var user = {
                        roleid: data.roleid,
                        grade: data.grade,
                        iswork: data.iswork,
                        position: data.position,
                        wages: data.wages,
                        cycle: data.cycle,
                    };
                    Laya.stage.event("LeadCreate", user); // 创建主角
                    if (!!callback)
                        callback(data);
                    var coin = data.coin;
                    Laya.stage.event("MoneySet", coin); // 修改剩余金币
                    Laya.stage.event("locklistSet", { grade: data.grade, value: data.price }); // 更新商店价格
                }
                else {
                    tips("购买失败");
                }
            }, function (err) {
                tips("购买失败");
            });
        };
        return shop;
    }());
    GAME.shop = shop;
})(GAME || (GAME = {}));
//# sourceMappingURL=Shop.js.map