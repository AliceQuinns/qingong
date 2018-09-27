// 转盘模块
module GAME {
    export class turntable {
        private targetUI;
        private btn;
        private turntable;
        private propui;// 奖励弹窗

        private GameInfo = 0;// 抽奖券
        private radices = 0;// 当前金币产生速度
        constructor() {

        }

        public open(data) {
            this.GameInfo = data.volum;
            this.radices = data.speed;

            this.targetUI = init_alert(ui.LuckdrawUI);
            this.btn = this.targetUI.getChildByName("content").getChildByName("_btn") as Laya.Button;// 按钮
            this.turntable = this.targetUI.getChildByName("content").getChildByName("_turntable") as Laya.Image;// 转盘

            // 花朵动画
            let hua1 = this.targetUI.getChildByName("content").getChildByName("hua1") as Laya.Image;
            let hua2 = this.targetUI.getChildByName("content").getChildByName("hua2") as Laya.Image;
            scaleAdmin(hua1);
            scaleAdmin(hua2);

            this.event();
        }

        // 转盘开启
        private event() {
            this.updatevoluce();

            if (this.GameInfo <= 0) {
                tips("抽奖券不足够");
                return;
            }

            Ajax("get", "https://shop.yunfanshidai.com/xcxht/qinggong/api/choujiang.php", {
                openid: LeadInfo.openID,
                radices: this.radices
            }, data => {
                console.log(data);
                let self = this;

                let Result = Number(data.award) - 1;// 类型
                let title = data["content"];// 剧情文本

                // let size = 100;

                // 按钮事件
                this.btn.once(Laya.Event.CLICK, this, e => {
                    this.admin(this.turntable, (8 - Result) * 45,
                        Laya.Handler.create(this, () => {
                            // 奖励特效界面
                            this.PropUI(Result, title, () => {
                                self.turntable.rotation = 0;// 转盘还原
                                Laya.stage.event("volumAdd", -1);
                                self.updatevoluce();

                                Ajax("get", "https://shop.yunfanshidai.com/xcxht/qinggong/api/getaward.php", {
                                    openid: LeadInfo.openID,
                                    rid: data.rid
                                });

                                this.propui = null;
                            });
                        })
                    );
                })

            }, err => {
                tips("暂时无法抽奖");
            });
        }

        // 转盘动画
        private admin(target, angle, callback: Laya.Handler) {
            // 转动速度为2秒一圈 不论角度多少都要转2圈
            let angles = angle + 720 + target.rotation;
            let time = 4000 + angle / 360 * 2000;
            Laya.Tween.to(target, { rotation: angles }, time, Laya.Ease.expoOut, callback, null);
        }

        // 道具界面特效
        private PropUI(type: number, title: string, callback: any = null) {
            let self = this;

            if(!!this.propui)return;

            let targetUI = init_alert(ui.rewardUI, null, () => {
                window.clearInterval(time);
                self.event();
                if (!!callback) callback();
                // 通知服务器该玩家已经领取奖励
            });

            this.propui = targetUI;

            // 旋转光效
            let Light = targetUI.getChildByName("content").getChildByName("Light") as Laya.Image;
            var time = window.setInterval(() => {
                Light.rotation += 10;
            }, 50);

            let Textarea = targetUI.getChildByName("content").getChildByName("Textarea") as Laya.Image;// 文本区

            let reward = targetUI.getChildByName("content").getChildByName("reward") as Laya.Text;// 数量文本

            switch (type) {
                case 0:
                    // 皇上
                    var target = targetUI.getChildByName("content").getChildByName("hangshang") as Laya.Image;
                    var img = targetUI.getChildByName("content").getChildByName("jingyuanbao") as Laya.Image;
                    target.visible = true;
                    img.visible = true;
                    scaleAdmin(target);
                    reward.text = `恭喜您获得金元宝${3}个`;

                    Laya.stage.event("diamondsAdd", 3);
                    // 处理字体
                    fontAdmin(title.slice(0, 15), 0, Textarea.width * 0.65, 50, 40, Textarea);// 右边文字
                    fontAdmin(title.slice(15, title.length), 0, Textarea.width * 0.15, 50, 40, Textarea);// 左边文字
                    break;
                case 1:
                    // x2金币
                    Light.pos(0, -205);
                    var coin = targetUI.getChildByName("content").getChildByName("coin") as Laya.Image;
                    coin.visible = true;
                    coin.pos(-76, -245);
                    Textarea.visible = false;
                    reward.text = `恭喜您获得金币${Format((self.radices * 2).toString())}个`;
                    Laya.stage.event("MoneyAdd", self.radices * 2);
                    break;
                case 2:
                    // 太监
                    var target = targetUI.getChildByName("content").getChildByName("taijian") as Laya.Image;
                    var img = targetUI.getChildByName("content").getChildByName("coin") as Laya.Image;
                    target.visible = true;
                    img.visible = true;
                    scaleAdmin(target);
                    reward.text = `您赏赐太监总管${Format((self.radices).toString())}个金币`;
                    // 处理字体
                    fontAdmin(title.slice(0, 15), 0, Textarea.width * 0.65, 50, 40, Textarea);// 右边文字
                    fontAdmin(title.slice(15, title.length), 0, Textarea.width * 0.15, 50, 40, Textarea);// 左边文字
                    break;
                case 3:
                    // x3金币
                    Light.pos(0, -205);
                    var coin = targetUI.getChildByName("content").getChildByName("coin") as Laya.Image;
                    coin.visible = true;
                    coin.pos(-76, -245);
                    Textarea.visible = false;
                    reward.text = `恭喜您获得金币${Format((self.radices * 3).toString())}个`;
                    Laya.stage.event("MoneyAdd", self.radices * 3);
                    break;
                case 4:
                    // 皇后
                    var target = targetUI.getChildByName("content").getChildByName("huangho") as Laya.Image;
                    var img = targetUI.getChildByName("content").getChildByName("jingyuanbao") as Laya.Image;
                    target.visible = true;
                    img.visible = true;
                    scaleAdmin(target);
                    reward.text = `恭喜您获得${2}个金元宝`;
                    Laya.stage.event("diamondsAdd", 2);
                    // 处理字体
                    fontAdmin(title.slice(0, 15), 0, Textarea.width * 0.65, 50, 40, Textarea);// 右边文字
                    fontAdmin(title.slice(15, title.length), 0, Textarea.width * 0.15, 50, 40, Textarea);// 左边文字
                    break;
                case 5:
                    // x3抽奖券
                    Light.pos(0, -205);
                    var coin = targetUI.getChildByName("content").getChildByName("Lottery") as Laya.Image;
                    coin.visible = true;
                    coin.pos(-76, -245);
                    Textarea.visible = false;
                    reward.text = `恭喜您获得抽奖券${3}张`;
                    Laya.stage.event("volumAdd", 3);
                    break;
                case 6:
                    // 太后
                    var target = targetUI.getChildByName("content").getChildByName("taiho") as Laya.Image;
                    var img = targetUI.getChildByName("content").getChildByName("jingyuanbao") as Laya.Image;
                    target.visible = true;
                    img.visible = true;
                    scaleAdmin(target);
                    reward.text = `恭喜您获得${1}个金元宝`;
                    Laya.stage.event("diamondsAdd", 1);
                    // 处理字体
                    fontAdmin(title.slice(0, 15), 0, Textarea.width * 0.65, 50, 40, Textarea);// 右边文字
                    fontAdmin(title.slice(15, title.length), 0, Textarea.width * 0.15, 50, 40, Textarea);// 左边文字

                    break;
                case 7:
                    // x1 金币
                    Light.pos(0, -205);
                    var coin = targetUI.getChildByName("content").getChildByName("coin") as Laya.Image;
                    coin.visible = true;
                    coin.pos(-76, -245);
                    Textarea.visible = false;
                    reward.text = `恭喜您获得金币${Format((self.radices).toString())}个`;
                    Laya.stage.event("MoneyAdd", self.radices);
                    break;
                default:
                    console.log("道具界面 类型错误");
                    break;
            }
        }

        // 刷新抽奖券的显示
        private updatevoluce() {
            let text = this.targetUI.getChildByName("content").getChildByName("Lottery") as Laya.Text;
            text.text = window["GameInfo"].volum;
        }
    }
}