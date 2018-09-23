// 冷宫模块  对象
var GAME;
(function (GAME) {
    var palace = /** @class */ (function () {
        function palace(data) {
        }
        // 开启冷宫模块
        palace.prototype.open = function () {
            init_alert(ui.palaceUI);
        };
        return palace;
    }());
    GAME.palace = palace;
})(GAME || (GAME = {}));
//# sourceMappingURL=palace.js.map