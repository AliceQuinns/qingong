var GAME;
(function (GAME) {
    var aduio = /** @class */ (function () {
        function aduio() {
            var _this = this;
            // 创建音频
            this._createAudio = function (src) {
                var target;
                if (!!window["wx"] && !!window["wx"]["createInnerAudioContext"]) {
                    target = window["wx"].createInnerAudioContext();
                }
                else {
                    return {};
                }
                target.src = src;
                return target;
            };
            // 背景音乐
            this.onBGM = function (prop) {
                if (prop === void 0) { prop = ""; }
                if (!window["wx"])
                    return;
                var target = _this.audiopool["bgm"];
                if (!_this.status)
                    return;
                if (prop === "close") {
                    if (!!target) {
                        target.stop();
                        target.destroy();
                    }
                    return;
                }
                ;
                if (!target) {
                    target = _this._createAudio(_this._url.bgm);
                    _this.audiopool["bgm"] = target;
                    target.loop = true;
                }
                target.play();
            };
            // 音效
            this._Sound = function (type) {
                if (!window["wx"])
                    return;
                if (!_this._url[type])
                    return;
                if (!_this.status)
                    return;
                var target = _this.audiopool[type];
                if (!target) {
                    console.log('create is ', type);
                    target = _this._createAudio(_this._url[type]);
                    _this.audiopool[type] = target;
                }
                if (!target.paused) {
                    target.seek(0);
                    target.play();
                }
                target.play();
            };
            // 音效控制
            this.control = function (type) {
                var self = _this;
                if (type === "close") {
                    _this.status = false;
                    if (!!self.audiopool["bgm"]) {
                        console.log("停止背景音乐");
                        self.audiopool["bgm"].stop();
                        if (!!self.audiopool["travel"])
                            self.audiopool["travel"].stop();
                    }
                }
                else if (type === "open") {
                    _this.status = true;
                }
            };
            // 随机音效
            this.random = function () {
                _this._Sound("audios" + getRandomInt(1, 5));
            };
            this._url = {
                bgm: "https://shop.yunfanshidai.com/xcxht/qinggong/res/audio/bgm.mp3",
                money: "https://shop.yunfanshidai.com/xcxht/qinggong/res/audio/coin.mp3",
                slap: "https://shop.yunfanshidai.com/xcxht/qinggong/res/audio/slap.mp3",
                buy: "https://shop.yunfanshidai.com/xcxht/qinggong/res/audio/buy.mp3",
                appear: "https://shop.yunfanshidai.com/xcxht/qinggong/res/audio/appear.mp3",
                audios1: "https://shop.yunfanshidai.com/xcxht/qinggong/res/audio/audios1.mp3",
                audios2: "https://shop.yunfanshidai.com/xcxht/qinggong/res/audio/audios2.mp3",
                audios3: "https://shop.yunfanshidai.com/xcxht/qinggong/res/audio/audios3.mp3",
                audios4: "https://shop.yunfanshidai.com/xcxht/qinggong/res/audio/audios4.mp3",
            };
            this.audiopool = {}; // 音频池
            this.status = true; // 全局音频控制
        }
        return aduio;
    }());
    GAME.aduio = aduio;
})(GAME || (GAME = {}));
//# sourceMappingURL=audio.js.map