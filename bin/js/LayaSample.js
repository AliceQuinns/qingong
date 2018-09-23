var WebGL = Laya.WebGL;
// 程序入口
var GameMain = /** @class */ (function () {
    function GameMain() {
        Laya.init(720, 1280, WebGL);
        Laya.stage.alignV = "middle";
        Laya.stage.alignH = "center";
        Laya.stage.scaleMode = "exactfit";
        Laya.stage.screenMode = "none";
        //开启统计信息
        // Laya.Stat.show();
        new GAME.index();
    }
    return GameMain;
}());
new GameMain();
//# sourceMappingURL=LayaSample.js.map