var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var View = laya.ui.View;
var Dialog = laya.ui.Dialog;
var ui;
(function (ui) {
    var BattleUI = /** @class */ (function (_super) {
        __extends(BattleUI, _super);
        function BattleUI() {
            return _super.call(this) || this;
        }
        BattleUI.prototype.createChildren = function () {
            View.regComponent("Text", laya.display.Text);
            _super.prototype.createChildren.call(this);
            this.createView(ui.BattleUI.uiView);
        };
        BattleUI.uiView = { "type": "Dialog", "props": { "width": 750, "height": 1280 }, "child": [{ "type": "Image", "props": { "y": -102, "x": -159, "width": 1107, "skin": "index/mask.png", "height": 1570, "alpha": 0.7 } }, { "type": "Image", "props": { "y": 667, "x": 347, "var": "content", "skin": "index/duizhan_bg.png", "name": "content", "anchorY": 0.5, "anchorX": 0.5 }, "child": [{ "type": "Text", "props": { "y": 70, "x": 13, "width": 416, "var": "Leadname", "text": "容嬷嬷", "name": "Leadname", "height": 50, "fontSize": 50, "font": "Arial", "color": "#653e21", "bold": true, "align": "center" } }, { "type": "Image", "props": { "y": 175, "x": 131, "var": "Lead", "skin": "Enemy/10.png", "name": "Lead" } }, { "type": "Text", "props": { "y": 496, "x": 141, "wordWrap": true, "width": 255, "var": "textcont", "valign": "middle", "text": "赏赐对方5个巴掌可获得500金币", "overflow": "hidden", "name": "textcont", "height": 159, "fontSize": 30, "font": "Arial", "color": "#653e21", "bold": true, "align": "center" } }, { "type": "Image", "props": { "y": 543, "x": 79, "skin": "index/hand.png" } }, { "type": "Image", "props": { "y": 162, "x": 325, "width": 50, "skin": "index/LeadName.png", "height": 282 } }, { "type": "Text", "props": { "y": 153, "x": 330, "wordWrap": true, "width": 40, "valign": "middle", "text": "点击人物开始攻击", "overflow": "visible", "height": 300, "fontSize": 25, "font": "Arial", "color": "#4f2823", "bold": true, "align": "center" } }] }, { "type": "Image", "props": { "y": 305, "x": 586, "var": "close_Btn", "skin": "index/close.png", "name": "close_Btn", "anchorY": 0.5, "anchorX": 0.5 } }] };
        return BattleUI;
    }(Dialog));
    ui.BattleUI = BattleUI;
})(ui || (ui = {}));
(function (ui) {
    var LuckdrawUI = /** @class */ (function (_super) {
        __extends(LuckdrawUI, _super);
        function LuckdrawUI() {
            return _super.call(this) || this;
        }
        LuckdrawUI.prototype.createChildren = function () {
            View.regComponent("Text", laya.display.Text);
            _super.prototype.createChildren.call(this);
            this.createView(ui.LuckdrawUI.uiView);
        };
        LuckdrawUI.uiView = { "type": "Dialog", "props": { "width": 750, "height": 1280 }, "child": [{ "type": "Image", "props": { "y": -112, "x": -171, "width": 1107, "skin": "index/mask.png", "height": 1570, "alpha": 0.7 } }, { "type": "Image", "props": { "y": 620, "x": 383, "var": "content", "name": "content", "anchorY": 0.5, "anchorX": 0.5 }, "child": [{ "type": "Image", "props": { "y": -494, "x": -354, "skin": "index/bg2.png" } }, { "type": "Button", "props": { "y": 360, "x": -181, "var": "_btn", "stateNum": 2, "skin": "index/btn3.png", "name": "_btn" } }, { "type": "Image", "props": { "y": -91, "x": -25, "var": "_turntable", "skin": "index/zhuanpan.png", "name": "_turntable", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": -110, "x": -33, "width": 225, "skin": "index/choujiang.png", "rotation": 0, "height": 277, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 191, "x": -184, "var": "hua1", "skin": "index/hua.png", "rotation": 9, "name": "hua1", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 191, "x": 110, "var": "hua2", "skin": "index/hua.png", "rotation": -9, "name": "hua2", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Text", "props": { "y": 241, "x": -41, "var": "Lottery", "text": "50", "name": "Lottery", "fontSize": 30, "font": "Arial", "color": "#ff3200", "bold": true } }, { "type": "Image", "props": { "y": 245, "x": 18, "width": 21, "skin": "index/add2.png", "height": 21 } }] }, { "type": "Image", "props": { "y": 184, "x": 658, "var": "close_Btn", "skin": "index/close.png", "name": "close_Btn", "anchorY": 0.5, "anchorX": 0.5 } }] };
        return LuckdrawUI;
    }(Dialog));
    ui.LuckdrawUI = LuckdrawUI;
})(ui || (ui = {}));
(function (ui) {
    var alertUI = /** @class */ (function (_super) {
        __extends(alertUI, _super);
        function alertUI() {
            return _super.call(this) || this;
        }
        alertUI.prototype.createChildren = function () {
            View.regComponent("Text", laya.display.Text);
            _super.prototype.createChildren.call(this);
            this.createView(ui.alertUI.uiView);
        };
        alertUI.uiView = { "type": "Dialog", "props": { "width": 750, "height": 1280 }, "child": [{ "type": "Image", "props": { "y": -110, "x": -171, "width": 1107, "skin": "index/mask.png", "height": 1570, "alpha": 0.7 } }, { "type": "Image", "props": { "y": 622, "x": 361, "var": "content", "skin": "index/tips_bg.png", "name": "content", "anchorY": 0.5, "anchorX": 0.5 }, "child": [{ "type": "Text", "props": { "y": 8, "x": 131, "width": 300, "var": "title", "valign": "middle", "text": "离线收益", "name": "title", "height": 60, "fontSize": 30, "font": "Arial", "color": "#653e21", "bold": true, "align": "center" } }, { "type": "Image", "props": { "y": 201, "x": 229, "width": 105, "var": "icon", "skin": "index/copper2.png", "name": "icon", "height": 105 } }, { "type": "Text", "props": { "y": 330, "x": 16, "width": 537, "var": "contentText", "valign": "middle", "text": "1000D", "name": "contentText", "height": 78, "fontSize": 50, "font": "Arial", "color": "#653e21", "bold": true, "align": "center" } }, { "type": "Text", "props": { "y": 101, "x": 68, "wordWrap": true, "width": 444, "var": "tipsText", "valign": "middle", "text": "在您离线时获得", "overflow": "hidden", "name": "tipsText", "height": 78, "fontSize": 30, "font": "Arial", "color": "#653e21", "bold": true, "align": "center" } }] }, { "type": "Image", "props": { "y": 410, "x": 621, "var": "close_Btn", "skin": "index/close.png", "name": "close_Btn", "anchorY": 0.5, "anchorX": 0.5 } }] };
        return alertUI;
    }(Dialog));
    ui.alertUI = alertUI;
})(ui || (ui = {}));
(function (ui) {
    var indexUI = /** @class */ (function (_super) {
        __extends(indexUI, _super);
        function indexUI() {
            return _super.call(this) || this;
        }
        indexUI.prototype.createChildren = function () {
            View.regComponent("Text", laya.display.Text);
            _super.prototype.createChildren.call(this);
            this.createView(ui.indexUI.uiView);
        };
        indexUI.uiView = { "type": "View", "props": { "width": 720, "height": 1280 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 2, "skin": "index/bg.png", "name": "bg" } }, { "type": "Image", "props": { "y": 554, "x": 351, "width": 361, "skin": "index/select.png", "height": 518 } }, { "type": "Image", "props": { "y": 587, "x": 378, "width": 100, "var": "pool1", "skin": "index/Leadbg.png", "name": "pool1", "height": 100 } }, { "type": "Image", "props": { "y": 587, "x": 487, "width": 100, "var": "pool2", "skin": "index/Leadbg.png", "name": "pool2", "height": 100 } }, { "type": "Image", "props": { "y": 587, "x": 595, "width": 100, "var": "pool3", "skin": "index/Leadbg.png", "name": "pool3", "height": 100 } }, { "type": "Image", "props": { "y": 698, "x": 378, "width": 100, "var": "pool4", "skin": "index/Leadbg.png", "name": "pool4", "height": 100 } }, { "type": "Image", "props": { "y": 698, "x": 487, "width": 100, "var": "pool5", "skin": "index/Leadbg.png", "name": "pool5", "height": 100 } }, { "type": "Image", "props": { "y": 698, "x": 595, "width": 100, "var": "pool6", "skin": "index/Leadbg.png", "name": "pool6", "height": 100 } }, { "type": "Image", "props": { "y": 813, "x": 378, "width": 100, "var": "pool7", "skin": "index/Leadbg.png", "name": "pool7", "height": 100 } }, { "type": "Image", "props": { "y": 813, "x": 487, "width": 100, "var": "pool8", "skin": "index/Leadbg.png", "name": "pool8", "height": 100 } }, { "type": "Image", "props": { "y": 813, "x": 595, "width": 100, "var": "pool9", "skin": "index/Leadbg.png", "name": "pool9", "height": 100 } }, { "type": "Image", "props": { "y": 929, "x": 378, "width": 100, "var": "pool10", "skin": "index/Leadbg.png", "name": "pool10", "height": 100 } }, { "type": "Image", "props": { "y": 929, "x": 487, "width": 100, "var": "pool11", "skin": "index/Leadbg.png", "name": "pool11", "height": 100 } }, { "type": "Image", "props": { "y": 929, "x": 595, "width": 100, "var": "pool12", "skin": "index/Leadbg.png", "name": "pool12", "height": 100 } }, { "type": "Image", "props": { "y": 0, "x": 2, "width": 720, "var": "AnimationPool", "name": "AnimationPool", "height": 550 } }, { "type": "Image", "props": { "y": 584, "x": 5, "var": "palace", "skin": "index/lenggong.png" } }, { "type": "Image", "props": { "y": 1189, "x": 9, "var": "recovery", "skin": "index/delect.png", "name": "recovery" } }, { "type": "Button", "props": { "y": 1117, "x": 345, "width": 248, "var": "purchase", "stateNum": 2, "skin": "index/btn1.png", "name": "purchase", "height": 117 } }, { "type": "Image", "props": { "y": 1182, "x": 116, "skin": "index/recovery.png" } }, { "type": "Image", "props": { "y": 1057, "x": 213, "width": 111, "var": "Luckdraw", "skin": "index/invite.png", "name": "Luckdraw", "height": 111 } }, { "type": "Image", "props": { "y": 967, "x": 126, "skin": "index/rank.png" } }, { "type": "Button", "props": { "y": 1117, "x": 601, "width": 115, "var": "shop", "stateNum": 2, "skin": "index/btn2.png", "name": "shop", "height": 115 } }, { "type": "Image", "props": { "y": 21, "x": 16, "skin": "index/yuanbao_bg.png" } }, { "type": "Image", "props": { "y": 33, "x": 37, "skin": "index/yuanbao.png" } }, { "type": "Image", "props": { "y": 27, "x": 194, "width": 43, "skin": "index/add2.png", "height": 43 } }, { "type": "Image", "props": { "y": 21, "x": 462, "skin": "index/yuanbao_bg.png" } }, { "type": "Image", "props": { "y": 30, "x": 482, "width": 38, "skin": "index/copper2.png", "height": 38 } }, { "type": "Image", "props": { "y": 28, "x": 640, "width": 43, "skin": "index/add2.png", "height": 43 } }, { "type": "Text", "props": { "y": 110, "x": 325, "var": "coinspeed", "text": "0/秒", "name": "coinspeed", "fontSize": 35, "font": "Arial", "color": "#fff5e2", "bold": true } }, { "type": "Image", "props": { "y": 93, "x": 235, "skin": "index/copper2.png" } }, { "type": "Text", "props": { "y": 31, "x": 97, "var": "_Diamonds", "text": "100", "name": "_Diamonds", "fontSize": 30, "font": "Arial", "color": "#fff5e2", "bold": true } }, { "type": "Text", "props": { "y": 32, "x": 530, "var": "coin", "text": "100", "name": "coin", "fontSize": 30, "font": "Arial", "color": "#fff5e2", "bold": true } }, { "type": "Text", "props": { "y": 1189, "x": 415, "width": 155, "var": "purchase_text", "text": "1.8888B", "name": "purchase_text", "height": 25, "fontSize": 30, "font": "Arial", "color": "#653e21", "bold": true } }, { "type": "Image", "props": { "y": 1053, "x": 26, "width": 106, "var": "turntable", "skin": "index/luck.png", "name": "turntable", "height": 114 } }] };
        return indexUI;
    }(View));
    ui.indexUI = indexUI;
})(ui || (ui = {}));
(function (ui) {
    var lockListUI = /** @class */ (function (_super) {
        __extends(lockListUI, _super);
        function lockListUI() {
            return _super.call(this) || this;
        }
        lockListUI.prototype.createChildren = function () {
            View.regComponent("Text", laya.display.Text);
            _super.prototype.createChildren.call(this);
            this.createView(ui.lockListUI.uiView);
        };
        lockListUI.uiView = { "type": "Dialog", "props": { "width": 750, "height": 1280 }, "child": [{ "type": "Image", "props": { "y": -110, "x": -171, "width": 1107, "skin": "index/mask.png", "height": 1570, "alpha": 0.7 } }, { "type": "Image", "props": { "y": 622, "x": 361, "width": 569, "var": "content", "skin": "index/store_bg2.png", "name": "content", "height": 973, "anchorY": 0.5, "anchorX": 0.5 }, "child": [{ "type": "List", "props": { "y": 91, "x": 46, "width": 474, "var": "_list", "spaceY": 25, "spaceX": 20, "repeatY": 5, "repeatX": 1, "name": "_list", "height": 859 }, "child": [{ "type": "Box", "props": { "renderType": "render" }, "child": [{ "type": "Image", "props": { "skin": "index/line_bg.png" } }, { "type": "Image", "props": { "y": 15, "x": 12, "width": 94, "skin": "index/Leadbg.png", "height": 94 } }, { "type": "Image", "props": { "y": 4, "x": 16, "var": "lead", "skin": "Lead/1.png", "name": "lead" } }, { "type": "Image", "props": { "y": 99, "x": 30, "var": "grade_bg", "skin": "index/shuzi.png", "name": "grade_bg" } }, { "type": "Text", "props": { "y": 102, "x": 32, "width": 19, "var": "grade", "valign": "middle", "text": "30", "name": "grade", "height": 15, "fontSize": 12, "font": "Arial", "color": "#ffffff", "bold": true, "align": "center" } }, { "type": "Text", "props": { "y": 39, "x": 103, "wordWrap": true, "width": 100, "var": "LeadName", "valign": "middle", "text": "容嚒嚒", "overflow": "hidden", "name": "LeadName", "height": 61, "fontSize": 18, "font": "Arial", "color": "#653e21", "bold": true, "align": "center" } }, { "type": "Button", "props": { "y": 37, "x": 340, "width": 125, "var": "btn_coin", "stateNum": 2, "skin": "index/locklistbtn.png", "name": "btn_coin", "height": 65 }, "child": [{ "type": "Image", "props": { "y": 19, "x": 6, "width": 30, "skin": "index/copper2.png", "height": 30 } }, { "type": "Text", "props": { "y": 19, "x": 38, "width": 81, "var": "btn_coin_text", "valign": "middle", "text": "1.8888B", "overflow": "hidden", "name": "btn_coin_text", "height": 29, "fontSize": 18, "font": "Arial", "color": "#653e21", "bold": true, "align": "center" } }] }, { "type": "Button", "props": { "y": 37, "x": 209, "width": 125, "visible": false, "var": "btn_yuanbao", "stateNum": 2, "skin": "index/locklistbtn.png", "name": "btn_yuanbao", "height": 65 }, "child": [{ "type": "Image", "props": { "y": 24, "x": 8, "width": 37, "skin": "index/yuanbao.png", "height": 23 } }, { "type": "Text", "props": { "y": 20, "x": 44, "width": 77, "var": "btn_yuanbao_text", "valign": "middle", "text": "1.888B", "overflow": "hidden", "name": "btn_yuanbao_text", "height": 29, "fontSize": 18, "font": "Arial", "color": "#653e21", "bold": true, "align": "center" } }] }, { "type": "Image", "props": { "y": 37, "x": 341, "width": 125, "visible": false, "var": "btn_un", "skin": "index/btnend.png", "name": "btn_un", "height": 65 }, "child": [{ "type": "Text", "props": { "y": 19, "x": 2, "width": 122, "var": "btn_un_text", "valign": "middle", "text": "2级解锁", "overflow": "hidden", "name": "btn_un_text", "height": 29, "fontSize": 18, "font": "Arial", "color": "#653e21", "bold": true, "align": "center" } }] }, { "type": "Image", "props": { "y": 8, "x": 20, "visible": false, "var": "Invisible", "skin": "index/unknownman.png", "name": "Invisible" } }] }] }, { "type": "Image", "props": { "y": 106, "x": 82, "width": 45, "visible": false, "skin": "index/copper2.png", "height": 45 } }, { "type": "Text", "props": { "y": 112, "x": 132, "visible": false, "var": "coin", "text": "1000B", "name": "coin", "fontSize": 30, "font": "Arial", "color": "#653e21", "bold": true } }, { "type": "Image", "props": { "y": 113, "x": 325, "visible": false, "skin": "index/yuanbao.png" } }, { "type": "Text", "props": { "y": 111, "x": 384, "width": 88.4033203125, "visible": false, "var": "yuanbao", "text": "1000B", "name": "yuanbao", "height": 30, "fontSize": 30, "font": "Arial", "color": "#653e21", "bold": true } }, { "type": "Text", "props": { "y": 9, "x": 150, "width": 271, "valign": "middle", "text": "商城", "overflow": "visible", "height": 60, "fontSize": 50, "font": "Arial", "color": "#653e21", "bold": true, "align": "center" } }] }, { "type": "Image", "props": { "y": 193, "x": 631, "var": "close_Btn", "skin": "index/close.png", "name": "close_Btn", "anchorY": 0.5, "anchorX": 0.5 } }] };
        return lockListUI;
    }(Dialog));
    ui.lockListUI = lockListUI;
})(ui || (ui = {}));
(function (ui) {
    var palaceUI = /** @class */ (function (_super) {
        __extends(palaceUI, _super);
        function palaceUI() {
            return _super.call(this) || this;
        }
        palaceUI.prototype.createChildren = function () {
            View.regComponent("Text", laya.display.Text);
            _super.prototype.createChildren.call(this);
            this.createView(ui.palaceUI.uiView);
        };
        palaceUI.uiView = { "type": "Dialog", "props": { "y": 0, "x": 0, "width": 750, "height": 1280 }, "child": [{ "type": "Image", "props": { "y": -120, "x": -181, "width": 1107, "skin": "index/mask.png", "height": 1570, "alpha": 0.7 } }, { "type": "Image", "props": { "y": 612, "x": 351, "var": "content", "skin": "index/store_bg.png", "name": "content", "anchorY": 0.5, "anchorX": 0.5 }, "child": [{ "type": "List", "props": { "y": 86, "x": 44, "var": "_list", "spaceY": 20, "spaceX": 20, "repeatY": 4, "repeatX": 2, "name": "_list" }, "child": [{ "type": "Box", "props": { "renderType": "render" }, "child": [{ "type": "Image", "props": { "var": "Unlocked", "skin": "index/lock_bg.png", "name": "Unlocked" } }, { "type": "Image", "props": { "y": 0, "x": 1, "visible": false, "var": "Unlock", "skin": "index/unlock_bg.png", "name": "Unlock" }, "child": [{ "type": "Image", "props": { "y": 75, "x": 92, "width": 71, "var": "Lead", "skin": "Enemy/1.png", "name": "Lead", "height": 94 } }, { "type": "Text", "props": { "y": 56, "x": 59, "wordWrap": true, "width": 31, "var": "Leadname", "valign": "middle", "text": "容嬷嬷", "strokeColor": "#dbbea9", "stroke": 2, "overflow": "visible", "name": "Leadname", "height": 132, "fontSize": 25, "font": "Arial", "color": "#653e21", "bold": true, "align": "center" } }] }] }] }] }, { "type": "Image", "props": { "y": 176, "x": 648, "var": "close_Btn", "skin": "index/close.png", "name": "close_Btn", "anchorY": 0.5, "anchorX": 0.5 } }] };
        return palaceUI;
    }(Dialog));
    ui.palaceUI = palaceUI;
})(ui || (ui = {}));
(function (ui) {
    var rewardUI = /** @class */ (function (_super) {
        __extends(rewardUI, _super);
        function rewardUI() {
            return _super.call(this) || this;
        }
        rewardUI.prototype.createChildren = function () {
            View.regComponent("Text", laya.display.Text);
            _super.prototype.createChildren.call(this);
            this.createView(ui.rewardUI.uiView);
        };
        rewardUI.uiView = { "type": "Dialog", "props": { "width": 750, "height": 1280 }, "child": [{ "type": "Image", "props": { "y": -110, "x": -171, "width": 1107, "skin": "index/mask.png", "height": 1570, "alpha": 0.7 } }, { "type": "Image", "props": { "y": 622, "x": 361, "var": "content", "name": "content", "anchorY": 0.5, "anchorX": 0.5 }, "child": [{ "type": "Image", "props": { "y": 37, "x": -145, "width": 413, "var": "Light", "skin": "index/yuanb_bg.png", "rotation": 0, "name": "Light", "height": 406, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": -440, "x": 108, "width": 201, "var": "Textarea", "skin": "index/textbg.png", "name": "Textarea", "height": 702 } }, { "type": "Image", "props": { "y": -346, "x": -167, "width": 281, "visible": false, "var": "huangho", "skin": "index/huangho.png", "name": "huangho", "height": 457, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": -353, "x": -163, "width": 275, "visible": false, "var": "taiho", "skin": "index/taiho.png", "name": "taiho", "height": 446, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": -322, "x": -144, "width": 249, "visible": false, "var": "taijian", "skin": "index/taijian.png", "name": "taijian", "height": 404, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": -338, "x": -150, "width": 199, "visible": false, "var": "hangshang", "skin": "index/huandi.png", "name": "hangshang", "height": 459, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": -57, "x": -264, "width": 220, "visible": false, "var": "jingyuanbao", "skin": "index/yuanb.png", "name": "jingyuanbao", "height": 179 } }, { "type": "Image", "props": { "y": -26, "x": -221, "width": 143, "visible": false, "var": "Lottery", "skin": "index/jiangquan.png", "name": "Lottery", "height": 113 } }, { "type": "Image", "props": { "y": -43, "x": -225, "width": 145, "visible": false, "var": "coin", "skin": "index/copper2.png", "name": "coin", "height": 145 } }, { "type": "Text", "props": { "y": 301, "x": -360, "width": 750, "var": "reward", "valign": "middle", "text": "获得12340个元宝", "strokeColor": "#101010", "stroke": 8, "pivotY": 0.5, "pivotX": 0.5, "name": "reward", "height": 70, "fontSize": 30, "font": "Arial", "color": "#fffde3", "bold": true, "align": "center" } }] }, { "type": "Image", "props": { "y": 1077, "x": 376, "var": "close_Btn", "skin": "index/btnsure.png", "name": "close_Btn", "anchorY": 0.5, "anchorX": 0.5 } }] };
        return rewardUI;
    }(Dialog));
    ui.rewardUI = rewardUI;
})(ui || (ui = {}));
(function (ui) {
    var reward2UI = /** @class */ (function (_super) {
        __extends(reward2UI, _super);
        function reward2UI() {
            return _super.call(this) || this;
        }
        reward2UI.prototype.createChildren = function () {
            View.regComponent("Text", laya.display.Text);
            _super.prototype.createChildren.call(this);
            this.createView(ui.reward2UI.uiView);
        };
        reward2UI.uiView = { "type": "Dialog", "props": { "width": 750, "height": 1280 }, "child": [{ "type": "Image", "props": { "y": -100, "x": -161, "width": 1107, "skin": "index/mask.png", "height": 1570, "alpha": 0.7 } }, { "type": "Image", "props": { "y": 632, "x": 371, "var": "content", "name": "content", "anchorY": 0.5, "anchorX": 0.5 }, "child": [{ "type": "Image", "props": { "y": -206, "x": 5, "width": 413, "var": "Light", "skin": "index/yuanb_bg.png", "rotation": 0, "pivotY": 196, "pivotX": 204, "name": "Light", "height": 406 } }, { "type": "Text", "props": { "y": 42, "x": -370, "width": 750, "var": "reward", "valign": "middle", "text": "获得1000个金币", "strokeColor": "#101010", "stroke": 8, "pivotY": 0.5, "pivotX": 0.5, "name": "reward", "height": 70, "fontSize": 30, "font": "Arial", "color": "#fffde3", "bold": true, "align": "center" } }, { "type": "Image", "props": { "y": -250, "x": -95, "skin": "index/money.png" } }] }, { "type": "Image", "props": { "y": 840, "x": 386, "var": "close_Btn", "skin": "index/btnsure.png", "name": "close_Btn", "anchorY": 0.5, "anchorX": 0.5 } }] };
        return reward2UI;
    }(Dialog));
    ui.reward2UI = reward2UI;
})(ui || (ui = {}));
(function (ui) {
    var upgradeUI = /** @class */ (function (_super) {
        __extends(upgradeUI, _super);
        function upgradeUI() {
            return _super.call(this) || this;
        }
        upgradeUI.prototype.createChildren = function () {
            View.regComponent("Text", laya.display.Text);
            _super.prototype.createChildren.call(this);
            this.createView(ui.upgradeUI.uiView);
        };
        upgradeUI.uiView = { "type": "Dialog", "props": { "width": 750, "height": 1280 }, "child": [{ "type": "Image", "props": { "y": -100, "x": -161, "width": 1107, "skin": "index/mask.png", "height": 1570, "alpha": 0.7 } }, { "type": "Image", "props": { "y": 632, "x": 371, "var": "content", "skin": "index/tips_bg.png", "name": "content", "anchorY": 0.5, "anchorX": 0.5 }, "child": [{ "type": "Text", "props": { "y": 8, "x": 131, "width": 300, "valign": "middle", "text": "解锁人物", "name": "title", "height": 60, "fontSize": 30, "font": "Arial", "color": "#653e21", "bold": true, "align": "center" } }, { "type": "Image", "props": { "y": 144, "x": 207, "width": 144, "var": "Lead", "skin": "Lead/1.png", "name": "Lead", "height": 202 } }, { "type": "Image", "props": { "y": 180, "x": 386, "skin": "index/LeadName.png" } }, { "type": "Text", "props": { "y": 189, "x": 393, "wordWrap": true, "width": 36, "var": "LeadName", "valign": "middle", "text": "容嚒嚒", "strokeColor": "#ec452f", "stroke": 1, "name": "LeadName", "height": 124, "fontSize": 25, "font": "Arial", "color": "#4f2823", "bold": true, "align": "center" } }, { "type": "Image", "props": { "y": 452, "x": -51, "var": "Flower", "skin": "index/hua.png", "name": "Flower" } }, { "type": "Button", "props": { "y": 406, "x": 228, "var": "shared", "stateNum": 2, "skin": "index/xuanyao.png", "name": "shared" } }] }, { "type": "Image", "props": { "y": 420, "x": 631, "var": "close_Btn", "skin": "index/close.png", "name": "close_Btn", "anchorY": 0.5, "anchorX": 0.5 } }] };
        return upgradeUI;
    }(Dialog));
    ui.upgradeUI = upgradeUI;
})(ui || (ui = {}));
//# sourceMappingURL=layaUI.max.all.js.map