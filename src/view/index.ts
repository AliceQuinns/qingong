module GAME {
    export class index {
        private indexUI: ui.indexUI;

        private palace;// 冷宫模块
        private turntable;// 转盘模块
        private shop;// 商店模块

        //  玩家数据
        private GameInfo = {
            userid: "0",// 玩家id
            coin: "0",// 金币
            diamonds: "0",// 元宝
            volum: 0,// 奖券
            speed: 0,// 当前总速度
            grade: 1,// 用户等级
            role_level: 1,// 人物的解锁等级
        };

        private _Money; // 金币对象
        private _Lottery;// 抽奖券对象
        private _Diamonds;// 金元宝对象
        private _coinspeed;// 金币速度对象

        constructor() {
            Laya.loader.load([
                "https://shop.yunfanshidai.com/xcxht/qinggong/res/atlas/index.atlas",
                "https://shop.yunfanshidai.com/xcxht/qinggong/res/atlas/Lead.atlas",
                "https://shop.yunfanshidai.com/xcxht/qinggong/res/atlas/Enemy.atlas",
            ], Laya.Handler.create(this, this.init), Laya.Handler.create(this, this.onProgress, null, false));

            window["___index"] = this;
            window["GameInfo"] = this.GameInfo;
        }

        private onProgress(pro: number): void {
            let bar2 = window["loginUI"].getChildByName("bar2");
            bar2.scale(pro, 1);
        }

        private init(): void {
            window.setTimeout(() => {
                window["loginUI"].destroy();
            }, 500);

            // 场景添加
            this.indexUI = new ui.indexUI;
            Laya.stage.addChild(this.indexUI);

            // 加载用户数据
            Ajax("GET", "https://shop.yunfanshidai.com/xcxht/qinggong/api/login.php", null, data => {
                if (data['status'] === "fail") {

                    console.log("登陆失败");

                } else if (data['status'] === "success") {

                    this.customEvent();// 自定义事件
                    this.staticObj();// 静态化常用变量

                    console.log(data);

                    // 收益弹框
                    let alertUI = init_alert(ui.alertUI, () => {
                        let text = alertUI.getChildByName("content").getChildByName("contentText") as Laya.Text;
                        text.text = (!!data.offline) ? data.offline : "0个金元宝";
                    });

                    // 玩家ID
                    (!!data.openid) ? this.GameInfo.userid = data.openid : console.log("无玩家id数据");
                    LeadInfo.openID = data.openid;

                    // 用户等级
                    (!!data.grade) ? this.GameInfo.grade = Number(data.grade) : console.log("无法获取用户等级");

                    // 解锁等级
                    (!!data.role_level) ? this.GameInfo.role_level = Number(data.role_level) : console.log("无法获取用户解锁的等级");

                    // 用户金币
                    (!!data.coin) ? Laya.stage.event("MoneySet", data.coin) : console.log("无金币或无该数据");

                    // 抽奖券
                    (!!data.volum) ? Laya.stage.event("volumAdd", data.volum) : console.log("无奖券或无该数据");

                    // 金元宝
                    (!!data.diamonds) ? Laya.stage.event("diamondsSet", data.diamonds) : console.log("无金元宝或无该数据");

                    // 创建游戏主角 
                    (!!data.rolelist) ? this.Lead(data.rolelist) : console.log("无法获取主角信息");

                    // 冷宫列表
                    // (!!data.lglist) ? LeadInfo.palaceList = data.lglist : console.log("无法获取冷宫列表");

                    // 商店列表
                    (!!data.lockinfo) ? LeadInfo.locklist = data.lockinfo : console.log("无法获取商店列表");

                    this.turntable = new GAME.turntable();// 转盘模块
                    this.shop = new GAME.shop(LeadInfo.locklist);// 商店模块

                    this.palace = new GAME.palace();// 冷宫模块

                    this.event();// 事件监听

                    this.updateshopBtn();// 更新购买按钮价格

                    window["_audio"].onBGM();

                    // 定时更新服务器金币
                    window.setInterval(() => {
                        Laya.stage.event("updateCoin");
                    }, 30000);

                    // 抽奖券
                    window.setInterval(() => {
                        Laya.stage.event("volumAdd", 1);
                    }, 30000);
                }
            }, err => {
                console.log(err, "无法请求数据");
            })

        }

        // 常用对象静态化
        private staticObj() {
            this._Money = this.indexUI.coin as Laya.Text;
            this._Diamonds = this.indexUI._Diamonds as Laya.Text;
            this._coinspeed = this.indexUI.coinspeed as Laya.Text;
        }

        // 事件
        private event() {
            let self = this;
            // 冷宫
            addClick(this.indexUI.palace, () => {
                this.palace.open();
            }, this);
            // 抽奖
            addClick(this.indexUI.turntable, () => {
                this.turntable.open(this.GameInfo);
            }, this);
            // 商店
            addClick(this.indexUI.shop, () => {
                this.shop.open();
            })
            // 购买人物
            addClick(this.indexUI.purchase, () => {
                this.leadshop();
            })
            // 回收按钮
            addClick(this.indexUI.recovery, () => {
                tips("请拖动人物到此处");
            }, this, true)
        }

        // 自定事件
        private customEvent() {
            // 修改金币
            Laya.stage.on("MoneySet", this, e => {
                if (e <= 0) {
                    this.GameInfo.coin = "0";
                    this._Money.text = "0";
                    console.log("无金币");
                } else {
                    this.GameInfo.coin = String(e);
                    this._Money.text = Format(this.GameInfo.coin);
                }
            })
            // 添加金币
            Laya.stage.on("MoneyAdd", this, e => {
                this.GameInfo.coin = addition(this.GameInfo.coin, String(e));
                this._Money.text = Format(this.GameInfo.coin);
                window["_audio"]._Sound("money");
            })
            // 减少金币
            Laya.stage.on("MoneyReduce", this, e => {
                this.GameInfo.coin = subtraction(this.GameInfo.coin, String(e));
                this._Money.text = Format(this.GameInfo.coin);
            })

            // 修改金元宝
            Laya.stage.on("diamondsSet", this, e => {
                this.GameInfo.diamonds = String(e);
                this._Diamonds.text = Format(String(e));
            })
            // 添加金元宝
            Laya.stage.on("diamondsAdd", this, e => {
                this.GameInfo.diamonds = addition(this.GameInfo.diamonds, String(e));
                this._Diamonds.text = Format(this.GameInfo.diamonds);
            })
            // 减少金元宝
            Laya.stage.on("diamondsReduce", this, e => {
                this.GameInfo.diamonds = subtraction(this.GameInfo.diamonds, String(e));
                this._Diamonds.text = Format(this.GameInfo.diamonds);
            })

            // 添加抽奖券
            Laya.stage.on("volumAdd", this, e => {
                this.GameInfo.volum += Number(e);
                if (this.GameInfo.volum >= 50) this.GameInfo.volum = 50;
            })

            // 更新商店价格
            Laya.stage.on("locklistSet", this, e => {
                if (!e.grade || !e.value) { console.error("更新商店价格出错"); return; }
                LeadInfo.locklist.forEach((item, index) => {
                    if (item.grade === String(e.grade)) {
                        item.price = e.value;
                    }
                })
                this.updateshopBtn();//更改快速购买显示价格
            });

            // 更新商店解锁信息
            Laya.stage.on("locklistUnlock", this, e => {
                if (!e.grade || !e.price) { console.error("更新解锁等级时出错"); return; }
                LeadInfo.locklist.forEach((item, index) => {
                    if (item.grade === String(e.grade)) {

                        item.price = e.price;
                        item.type = 1;
                        if (!!e.diamond) item.diamond = e.diamond;

                    }
                })
            })

            // 更新玩家解锁等级
            Laya.stage.on("rolelevelSet", this, e => {
                if (!!e) this.GameInfo.role_level = e;
                console.log("更新人物解锁等级为", e);
            })

            // 更新服务器数据信息
            Laya.stage.on("updateCoin", this, e => {
                Ajax("get", "https://shop.yunfanshidai.com/xcxht/qinggong/api/updateOutLine.php", {
                    openid: LeadInfo.openID,
                    coin: this.GameInfo.coin,
                    timestamp: Date.parse(new Date().toString()),
                    volum: this.GameInfo.volum
                }, data => {
                    console.log("已经更新服务器金币数据");
                }, err => {

                })
            })

            // 金币速度更改
            Laya.stage.on("speedSet", this, e => {
                this.GameInfo.speed += e;
                if (this.GameInfo.speed <= 0) this.GameInfo.speed = 0;
                this._coinspeed.text = `${Format(Math.floor(this.GameInfo.speed).toString())}/秒`;
            })

            // 创建新主角
            Laya.stage.on("LeadCreate", this, e => {
                new GAME.lead(e, this.indexUI);
            })
        }

        // 批量创建主角对象
        private Lead(data) {
            this.matrix();
            if (!!data && data.length > 0) {
                for (let i = 0; i < data.length; i++) {
                    new GAME.lead(data[i], this.indexUI);
                }
            }
        }

        // 更新快速购买按钮价格
        private updateshopBtn() {
            let Leadprice = 0;// 当前主角价格
            LeadInfo.locklist.forEach((item, index) => {
                if (item.grade === String(this.GameInfo.role_level)) {
                    Leadprice = item.price;
                }
            });
            this.indexUI.purchase_text.text = Format(String(Leadprice));
        }

        // 主角购买
        private leadshop() {
            let Leadprice = 0;// 当前主角价格
            LeadInfo.locklist.forEach((item, index) => {
                if (item.grade === String(this.GameInfo.role_level)) {
                    Leadprice = item.price;
                }
            })

            if (LeadInfo.Leadlist >= 12) {
                tips("后宫已满");
                return;
            }
            if (this.GameInfo.coin === "0" || !ContrastNumber(this.GameInfo.coin, Leadprice)) {
                tips("金币不足");
                return;
            }
            Ajax("get", "https://shop.yunfanshidai.com/xcxht/qinggong/api/buyrole.php", {
                openid: this.GameInfo.userid,
                grade: this.GameInfo.role_level // 购买等级
            }, data => {
                console.log(data);
                if (data.status === "success") {
                    let user = {
                        roleid: data.roleid,
                        grade: data.grade,
                        iswork: data.iswork,
                        position: data.position,
                        wages: data.wages,
                        cycle: data.cycle,
                    };
                    new GAME.lead(user, this.indexUI);
                }
                // 用户剩余金币
                var coin = data.coin;
                Laya.stage.event("MoneySet", coin);

                this.updateshopBtn();// 更新价格

                tips("购买成功");
            }, err => {
                tips("购买失败");
            });
        }

        // 碰撞矩阵
        private matrix(): void {
            // 对象槽矩阵
            for (let i = 12; i--;) {
                let target = this.indexUI.getChildByName(`pool${i + 1}`) as Laya.Image;
                collision.push(getMatrix(target));
            };

            // 动画池矩阵
            collision.push(getMatrix(this.indexUI.getChildByName("AnimationPool") as Laya.Image));

            // 回收矩阵
            collision.push(getMatrix(this.indexUI.getChildByName("recovery") as Laya.Image));

            // 动画运动范围
            let AnimationPool = this.indexUI.getChildByName("AnimationPool") as Laya.Image;
            adminPool.Range = {
                startX: AnimationPool.x,
                startY: AnimationPool.y + AnimationPool.height / 2,
                endX: AnimationPool.x + AnimationPool.width - LeadInfo.width / 2,
                endY: AnimationPool.y + AnimationPool.height - LeadInfo.height,
                target: AnimationPool
            };
        }
    }
}