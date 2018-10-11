module GAME {
    export class index {
        private indexUI: ui.indexUI;

        private palace;// 冷宫模块
        private turntable;// 转盘模块
        private shop;// 商店模块
        private course;// 新手引导
        private Audioctr = true;// 默认音效

        //  玩家数据
        private GameInfo = {
            userid: "0",// 玩家id
            coin: "0",// 金币
            diamonds: "0",// 元宝
            volum: 0,// 奖券
            speed: "0",// 当前总速度
            grade: 1,// 用户等级
            role_level: 1,// 人物的解锁等级
        };

        private _Money; // 金币对象
        private _Lottery;// 抽奖券对象
        private _Diamonds;// 金元宝对象
        private _coinspeed;// 金币速度对象

        // https://shop.yunfanshidai.com/xcxht/qinggong/
        constructor() {
            let self = this;
            Laya.loader.load([
                "https://shop.yunfanshidai.com/xcxht/qinggong/res/atlas/index.atlas",
                "https://shop.yunfanshidai.com/xcxht/qinggong/res/atlas/Lead.atlas",
                "https://shop.yunfanshidai.com/xcxht/qinggong/res/atlas/Enemy.atlas",
            ], Laya.Handler.create(this, () => {
                if (!window["wx"]) {

                    self.init("", "https://shop.yunfanshidai.com/xcxht/qinggong/api/login_test.php");

                } else {

                    window["wx"].login({

                        success: data => {
                            console.log(data);
                            self.init(data.code, "https://shop.yunfanshidai.com/xcxht/qinggong/api/login.php");
                        },

                        fail: err => {
                            tips("请授权");
                        }

                    })
                }

            }), Laya.Handler.create(this, this.onProgress, null, false));


            window["___index"] = this;
            window["GameInfo"] = this.GameInfo;
        }

        private onProgress(pro: number): void {

            let bar2 = window["loginUI"].getChildByName("bar2");
            bar2.scale(pro, 1);

        }

        private init(code, url): void {

            window.setTimeout(() => {
                window["loginUI"].destroy();
            }, 500);

            // 场景添加
            this.indexUI = new ui.indexUI;
            Laya.stage.addChild(this.indexUI);

            // 加载用户数据
            Ajax("GET", url, {
                code: code,
                scene: 0
            }, data => {
                if (data['status'] === "fail") {

                    console.log("登陆失败");

                } else if (data['status'] === "success") {

                    this.customEvent();// 自定义事件
                    this.staticObj();// 静态化常用变量

                    console.log(data);

                    // 非新用户显示离线收益与签到
                    if (data.isnew.toString() === "2") {
                        // 收益弹框
                        let alertUI = init_alert(ui.alertUI, () => {
                            let text = alertUI.getChildByName("content").getChildByName("contentText") as Laya.Text;
                            text.text = (!!data.offline) ? `${Format(data.offline)}个金币` : "0个金币";
                        }, () => {
                            // 签到
                            (!!data["issign"] && data["issign"] === "1") ? this.Signin(data["signdays"]) : console.log("已签到");
                        });
                    }

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

                    // 商店列表
                    (!!data.lockinfo) ? LeadInfo.locklist = data.lockinfo : console.log("无法获取商店列表");

                    this.turntable = new GAME.turntable();// 转盘模块
                    this.shop = new GAME.shop(LeadInfo.locklist);// 商店模块
                    this.palace = new GAME.palace();// 冷宫模块
                    this.course = new GAME.Course(this.indexUI,this);// 新手引导

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
                    }, 1800000);

                    // 随机背景音效
                    window.setInterval(()=>{
                        window["_audio"].random();
                    },50000);

                    // 新手指引
                    (!!data.isnew && data.isnew.toString() === '1') ? this.course.open() : console.log("非新用户");
                }
            }, err => {
                console.log(err, "无法请求数据");
                tips("获取不到您的信息");
            })

        }

        // 签到
        private Signin(day): void {
            for (let i = 0; i < day; i++) {
                signdays[i].type = true;
            }

            if (!!signdays[Number(day)]) signdays[Number(day)]["open"] = true;

            let data = signdays;
            let targetUI = init_alert(ui.SignUI);
            let target = targetUI._list;
            target.vScrollBarSkin = '';
            target.array = data;
            target.scrollBar.elasticBackTime = 500;
            target.scrollBar.elasticDistance = 100;

            target.renderHandler = new Laya.Handler(this, (cell: Laya.Box, index: number) => {
                if (index > data.length) return;
                let userdata = data[index];

                let days = cell.getChildByName("days") as Laya.Text;
                (userdata["open"]) ? days.color = "#33c0dc" : days.color = "#633d26";
                days.text = `第${userdata.day}天`;

                let title = cell.getChildByName("title") as Laya.Text;
                (userdata.type) ? title.text = `已领取奖励` : title.text = `吉时未到`;

                let titlebg = cell.getChildByName("titlebg") as Laya.Image;
                (userdata["open"]) ? titlebg.skin = "index/today_line.png" : titlebg.skin = "index/line2.png";

                let btn_coin = cell.getChildByName("btn_coin") as Laya.Button;
                if (userdata["open"]) {
                    btn_coin.disabled = false;
                    addClick(btn_coin, () => {
                        Ajax("get", "https://shop.yunfanshidai.com/xcxht/qinggong/api/usersign.php", {
                            openid: LeadInfo.openID,
                        }, data => {
                            Propalert(userdata.Prop.type, userdata.Prop.title);// 道具弹窗
                            // data[index]["open"] = false;
                            targetUI._close();
                        }, err => {
                            tips("签到失败");
                        })
                    }, this, true);
                } else {
                    btn_coin.offAll(Laya.Event.CLICK);
                    btn_coin.disabled = true;
                }
            })
        }

        // 邀请好友
        private shared(): void {
            let data = shareddata;
            let targetUI = init_alert(ui.InvitingfriendsUI);
            let target = targetUI._list;

            let BTN = targetUI.getChildByName("content").getChildByName("shareBTN");
            addClick(BTN, () => {
                window["shareBTN"];
                console.log("分享");
            }, this, true);

            target.vScrollBarSkin = '';
            target.array = data;
            target.scrollBar.elasticBackTime = 500;
            target.scrollBar.elasticDistance = 100;

            target.renderHandler = new Laya.Handler(this, (cell: Laya.Box, index: number) => {
                if (index > data.length) return;
                let userdata = data[index];
                let LeadName = cell.getChildByName("LeadName") as Laya.Text;
                LeadName.text = `邀请${userdata.size}位好友`;
                let coin = cell.getChildByName("coin") as Laya.Text;
                coin.text = `${userdata.jinyunbao}`;
                addClick(cell.getChildByName("btn_coin"), () => {
                    tips("未成功邀请好友");
                }, this, true);
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

            // 帮助
            addClick(this.indexUI.help,()=>{
                init_alert(ui.helpUI);
            })

            // 音效
            addClick(this.indexUI.audioCtr,()=>{
                this.Audioctr = !this.Audioctr;
                if(this.Audioctr){
                    // 开启
                    window["_audio"].control("open");
                    this.indexUI.audioCtr.skin = "index/voice1.png";
                }else{
                    // 关闭
                    window["_audio"].control("close");
                    this.indexUI.audioCtr.skin = "index/voice2.png";
                }
            })

            // 回收按钮
            addClick(this.indexUI.recovery, () => {
                tips("请拖动人物到此处");
            }, this, true)

            // 邀请好友
            addClick(this.indexUI.Luckdraw, () => {
                this.shared();
            })

            // 获取金元宝
            addClick(this.indexUI.addmoney, () => {
                this.shared();
            })

            // 获取金币
            addClick(this.indexUI.addcoin, () => {
                this.shared();
            })
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

            // 金币速度更改 1 加 2 减
            Laya.stage.on("speedSet", this, e => {
                console.log(e);
                var a;
                if (e.type === 1) {
                    a = addition(this.GameInfo.speed, e.value);
                } else if (e.type === 2) {
                    a = subtraction(this.GameInfo.speed, e.value);
                }
                if (a.slice(0, 1) === "-") {
                    this.GameInfo.speed = "0";
                    this._coinspeed.text = `${0}/秒`
                } else {
                    this.GameInfo.speed = a;
                    this._coinspeed.text = `${Format(a)}/秒`
                }
            })

            // 创建新主角
            Laya.stage.on("LeadCreate", this, e => {
                new GAME.lead(e, this.indexUI);
            })

            // 动画池管理
            Laya.stage.on("adminpool", this, e => {
                adminPool.child += e;
                if (adminPool.child >= adminPool.maxLength) adminPool.child = adminPool.maxLength;
                if (adminPool.child <= 0) adminPool.child = 0;
                for (let i = adminPool.maxLength; i--; i) {
                    let target = this.indexUI.getChildByName("adminList").getChildByName(`adminList${i + 1}`) as Laya.Image;
                    if (i < adminPool.child) {
                        target.skin = "index/weizhi1.png";
                    } else {
                        target.skin = "index/weizhi2.png";
                    }
                }
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

        // 快速购买按钮 显示
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

            if (LeadInfo.Leadlist >= 12) {
                tips("后宫已满");
                return;
            }

            // 自动购买当前解锁最高的主角
            let Leadprice = 0;// 当前主角价格
            LeadInfo.locklist.forEach((item, index) => {
                if (item.grade === String(this.GameInfo.role_level)) {
                    Leadprice = item.price;
                }
            });

            if (this.GameInfo.coin === "0" || !ContrastNumber(this.GameInfo.coin, Leadprice)) {
                tips("金币不足");
                return;
            }

            window["_audio"]._Sound("buy");// 购买音效

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

                var coin = data.coin;
                Laya.stage.event("MoneySet", coin); // 用户剩余金币

                Laya.stage.event("locklistSet", { grade: data.grade, value: data.price });// 更新商店价格

                // this.updateshopBtn();// 更新价格

                // tips("购买成功");
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
            let AnimationPool = this.indexUI.getChildByName("adminrange") as Laya.Image;
            adminPool.Range = {
                startX: AnimationPool.x,
                startY: AnimationPool.y,
                endX: AnimationPool.x + AnimationPool.width,
                endY: AnimationPool.y + AnimationPool.height,
                target: AnimationPool
            };
        }
    }
}