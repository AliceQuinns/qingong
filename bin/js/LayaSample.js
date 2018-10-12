var WebGL = Laya.WebGL;
var Browser = Laya.Browser;
// 程序入口
var GameMain = /** @class */ (function () {
    function GameMain() {
        Laya.MiniAdpter.init();
        // // 异形屏适配
        // let onIPhoneX;
        // if (Browser.onIPhone && Math.abs(Browser.pixelRatio - 3) < 0.01) {
        //     onIPhoneX = (Browser.clientWidth == 375 && Browser.clientHeight == 812) || (Browser.clientWidth == 812 && Browser.clientHeight == 375);
        // }
        // if (onIPhoneX) {
        //     console.log("iphonex");
        //     //初始化引擎
        //     Laya.init(Browser.clientWidth * Browser.pixelRatio, Browser.clientHeight * Browser.pixelRatio, WebGL);
        // } else {
        // }
        Laya.init(720, 1280, WebGL);
        Laya.stage.alignV = "middle";
        Laya.stage.alignH = "center";
        Laya.stage.scaleMode = "fixedwidth";
        Laya.stage.screenMode = "none";
        //开启统计信息
        // Laya.Stat.show();
        // 加载进度
        var loginUI = new Laya.Sprite();
        loginUI.loadImage("https://shop.yunfanshidai.com/xcxht/qinggong/res/login/jiazai.png", 0, 0);
        Laya.stage.addChild(loginUI);
        loginUI.zOrder = 9999;
        var bar1 = new Laya.Sprite();
        bar1.loadImage("https://shop.yunfanshidai.com/xcxht/qinggong/res/login/bar1.png", 0, 0);
        bar1.width = loginUI.width * 0.8;
        bar1.y = Laya.stage.height * 0.9;
        bar1.x = Laya.stage.width * 0.1;
        loginUI.addChild(bar1);
        var bar2 = new Laya.Sprite();
        bar2.loadImage("https://shop.yunfanshidai.com/xcxht/qinggong/res/login/bar2.png", 0, 0);
        bar2.scale(0.1, 1);
        bar2.y = Laya.stage.height * 0.9;
        bar2.x = Laya.stage.width * 0.1;
        loginUI.addChild(bar2);
        bar2.name = "bar2";
        window["loginUI"] = loginUI;
        new GAME.index();
        window["_audio"] = new GAME.aduio();
    }
    return GameMain;
}());
new GameMain();
//# sourceMappingURL=LayaSample.js.map