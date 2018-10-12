// 冷宫模块  对象
var GAME;
(function (GAME) {
    var palace = /** @class */ (function () {
        function palace() {
            this.bazdir = true; // 巴掌方向
        }
        // 开启冷宫模块
        palace.prototype.open = function () {
            var _this = this;
            var targetUI = init_alert(ui.palaceUI);
            var target = targetUI._list;
            Ajax("get", "https://shop.yunfanshidai.com/xcxht/qinggong/api/getEnemy.php", {
                openid: LeadInfo.openID
            }, function (data) {
                console.log(data);
                if (data.status === "fail") {
                    tips("冷宫还未解锁");
                    return;
                }
                if (data.enemylist.length <= 0) {
                    tips("暂时没有敌人");
                }
                else {
                    var k = data.enemylist.length;
                    for (var i = 0; i < 39 - k; i++) {
                        data.enemylist.push({ visible: true });
                    }
                    target.vScrollBarSkin = '';
                    target.array = data.enemylist;
                    target.scrollBar.elasticBackTime = 500;
                    target.scrollBar.elasticDistance = 100;
                    target.renderHandler = new Laya.Handler(_this, function (cell, index) {
                        if (index > data.enemylist.length)
                            return;
                        var userData = data.enemylist[index]; // 单项数据
                        var Unlocked = cell.getChildByName("Unlocked"); // 未解锁
                        var Unlock = cell.getChildByName("Unlock"); // 已解锁
                        if (userData["visible"]) {
                            Unlocked.visible = true;
                            Unlock.visible = false;
                            cell.offAll(Laya.Event.CLICK);
                        }
                        else {
                            // 已解锁
                            Unlocked.visible = false;
                            Unlock.visible = true;
                            var lead_1 = Unlock.getChildByName("Lead");
                            lead_1.skin = "Enemy/" + userData.level + ".png";
                            var Leadname = Unlock.getChildByName("Leadname");
                            Leadname.text = userData.name;
                            addClick(cell, function () {
                                console.log(userData.name);
                                _this.Enemy({ Leadname: userData.name, level: userData.level, coin: userData.coin });
                            }, _this, true);
                        }
                    });
                }
            }, function (err) {
                tips("暂时无法获取敌人数据");
            });
        };
        // 敌人信息弹框 
        palace.prototype.Enemy = function (data) {
            var _this = this;
            this.enemy = init_alert(ui.BattleUI);
            var Leadname = this.enemy.getChildByName("content").getChildByName("Leadname"); // 人物姓名
            Leadname.text = data.Leadname;
            var Lead = this.enemy.getChildByName("content").getChildByName("Lead"); // 人物
            Lead.skin = "Enemy/" + data.level + ".png";
            var textcont = this.enemy.getChildByName("content").getChildByName("textcont");
            textcont.text = "\u6BCF\u8D4F\u8D50" + data.Leadname + "1\u4E2A\u5DF4\u638C \u5373\u53EF\u83B7\u5F97" + Format(data.coin) + "\u4E2A\u91D1\u5E01";
            addClick(Lead, function () {
                _this.BattleAnimation(Lead, data.coin);
            }, this);
        };
        // 战斗动画
        palace.prototype.BattleAnimation = function (pos, money) {
            // 短震动
            shock(1);
            // 攻击动画
            attackadmin(pos, 100, { x: pos.x - pos.width / 2, y: pos.y }, 0.01, this.bazdir);
            this.bazdir = !this.bazdir;
            // 窗口抖动
            windowshack(2, 1, 300);
            // 收益提示
            tips(Format(money) + "\u91D1\u5E01", "coin", pos.x + pos.width * Math.random(), pos.y + pos.height * Math.random(), 200);
            // 金币增加
            Laya.stage.event("MoneyAdd", money);
            // 主角缩放
            scaleelastic(pos);
            // 巴掌音效
            window["_audio"]._Sound("slap");
            window["_audio"]._Sound("jiao");
        };
        return palace;
    }());
    GAME.palace = palace;
})(GAME || (GAME = {}));
//# sourceMappingURL=palace.js.map