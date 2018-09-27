module GAME {
    export class aduio {
        private _url;
        private audiopool;
        private status;
        constructor() {
            this._url = {
                bgm: "https://shop.yunfanshidai.com/xcxht/qinggong/res/audio/bgm.mp3",
                money: "https://shop.yunfanshidai.com/xcxht/qinggong/res/audio/coin.mp3",// 金币
                slap: "https://shop.yunfanshidai.com/xcxht/qinggong/res/audio/slap.mp3",// 巴掌
                buy: "https://shop.yunfanshidai.com/xcxht/qinggong/res/audio/buy.mp3",// 转盘
                appear: "https://shop.yunfanshidai.com/xcxht/qinggong/res/audio/appear.mp3",
            }
            this.audiopool = {};// 音频池
            this.status = true;// 全局音频控制
        }
        // 创建音频
        _createAudio = (src) => {
            let target;
            if (!!window["wx"] && !!window["wx"]["createInnerAudioContext"]) {
                target = window["wx"].createInnerAudioContext();
            } else {
                return {};
            }

            target.src = src;
            return target;
        }

        // 背景音乐
        onBGM = (prop: any = "") => {
            if (!window["wx"]) return;
            let target = this.audiopool["bgm"];
            if (!this.status) return;
            if (prop === "close") {
                if (!!target) {
                    target.stop();
                    target.destroy();
                }
                return;
            };
            if (!target) {
                target = this._createAudio(this._url.bgm);
                this.audiopool["bgm"] = target;
                target.loop = true;
            }
            target.play();
        }

        // 音效
        _Sound = (type) => {
            if (!window["wx"]) return;
            if (!this._url[type]) return;

            if (!this.status) return;
            let target = this.audiopool[type];
            if (!target) {
                console.log('create is ', type);
                target = this._createAudio(this._url[type]);
                this.audiopool[type] = target
            }
            if (!target.paused) {
                target.seek(0);
                target.play();
            }
            target.play();
        }

        // 音效控制
        control = (type) => {
            let self = this;
            if (type === "close") {
                this.status = false;
                if (!!self.audiopool["bgm"]) {
                    console.log("停止背景音乐");
                    self.audiopool["bgm"].stop();
                    if (!!self.audiopool["travel"]) self.audiopool["travel"].stop();
                }
            } else if (type === "open") {
                this.status = true;
            }
        }
    }
}
