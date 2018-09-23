import WebGL = Laya.WebGL;
// 程序入口
class GameMain {
    constructor() {
        Laya.init(720, 1280, WebGL);
        Laya.stage.alignV = "middle";
        Laya.stage.alignH = "center";

        Laya.stage.scaleMode = "exactfit";
        Laya.stage.screenMode = "none";

        //开启统计信息
        // Laya.Stat.show();

        new GAME.index();
    }
}
new GameMain();