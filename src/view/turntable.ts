// 转盘模块
module GAME {
    export class turntable {
        private targetUI;
        private btn;
        private turntable;
        constructor() {

        }

        public open() {
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
            // 请求结果 ——ajax
            let self = this;
            let Result = 0;
            let title = "御花园偶遇皇上获得恩宠，奖赏3000金元宝";
            let size = 100;

            this.btn.once(Laya.Event.CLICK, this, e => {
                this.admin(this.turntable, (8 - Result) * 45,
                    Laya.Handler.create(this, () => {
                        this.PropUI(Result, title, size, () => {
                            self.turntable.rotation = 0;
                        });// 奖励特效
                    })
                );
            })
        }

        // 转盘动画
        private admin(target, angle, callback: Laya.Handler) {
            // 转动速度为2秒一圈 不论角度多少都要转2圈
            let angles = angle + 720 + target.rotation;
            let time = 4000 + angle / 360 * 2000;
            Laya.Tween.to(target, { rotation: angles }, time, Laya.Ease.expoOut, callback, null);
        }

        // 道具界面特效
        private PropUI(type: number, title: string, size: number, callback: any = null) {
            let self = this;

            let targetUI = init_alert(ui.rewardUI, null, () => {
                window.clearInterval(time);
                self.event();
                if (!!callback) callback();
                // 通知服务器该玩家已经领取奖励
            });

            // 旋转光效
            let Light = targetUI.getChildByName("content").getChildByName("Light") as Laya.Image;
            var time = window.setInterval(() => {
                Light.rotation += 10;
            }, 100);

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
                    reward.text = `恭喜您获得金元宝${size}个`;
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
                    reward.text = `恭喜您获得金币${size}个`;
                    break;
                case 2:
                    // 太监
                    var target = targetUI.getChildByName("content").getChildByName("taijian") as Laya.Image;
                    var img = targetUI.getChildByName("content").getChildByName("coin") as Laya.Image;
                    target.visible = true;
                    img.visible = true;
                    scaleAdmin(target);
                    reward.text = `您赏赐太监总管${size}个金币`;
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
                    reward.text = `恭喜您获得金币${size}个`;
                    break;
                case 4:
                    // 皇后
                    var target = targetUI.getChildByName("content").getChildByName("huangho") as Laya.Image;
                    var img = targetUI.getChildByName("content").getChildByName("jingyuanbao") as Laya.Image;
                    target.visible = true;
                    img.visible = true;
                    scaleAdmin(target);
                    reward.text = `恭喜您获得${size}个金元宝`;
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
                    break;
                case 6:
                    // 太后
                    var target = targetUI.getChildByName("content").getChildByName("taiho") as Laya.Image;
                    var img = targetUI.getChildByName("content").getChildByName("jingyuanbao") as Laya.Image;
                    target.visible = true;
                    img.visible = true;
                    scaleAdmin(target);
                    reward.text = `恭喜您获得${size}个金元宝`;
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
                    reward.text = `恭喜您获得金币${size}个`;

                    break;
                default:
                    console.log("道具界面 类型错误");
                    break;
            }
        }
    }
}