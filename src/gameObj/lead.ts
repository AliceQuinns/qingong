// 主角
module GAME {
    export class lead {

        public id;// id
        public grade;// 等级
        public state;// 工作状态 （ 1工作 2非工作） 
        public icon;// 贴图
        public wages;// 金币单位时间生产数量
        public cycle;// 金币生产周期
        public position; // 槽位坐标
        public pos;// 坐标index

        private stage;// 场景
        private Timer;// 金币生产计时器
        private AdminTimer;// 动画计时器
        private start_tim;// 开始工作时间
        private range;// 运动边界
        private seat;// 当前槽位对象
        private Multiple = 1;// 收益倍数

        // 运动速度
        private speed = {
            x: 2,
            y: 0.1
        }

        constructor(data, stage) {
            LeadInfo.Leadlist += 1;

            this.id = data.roleid;// 主角id
            this.grade = (!!data.grade) ? String(data.grade) : console.log("未获取到等级");
            this.state = (!!data.iswork) ? data.iswork : console.log("未获取到工作状态");
            this.stage = stage;// 场景
            this.wages = (!!data.wages) ? Number(data.wages) : console.log("未获到金币生产速度");
            this.position = (!!data.position) ? Number(data.position) : console.log("未获取到位置");
            this.pos = this.position;
            this.cycle = (!!data.cycle) ? Number(data.cycle) : console.log("未获取到周期");

            this.range = adminPool.Range;// 动画边界

            this.speed = {
                x: this.cycle/1000,
                y: this.cycle/10000
            }

            this.init();
        }

        private init() {
            let parent = createLead(this.grade, { width: LeadInfo.width, hieght: LeadInfo.height }) as Laya.Image;// 主节点
            let child = createLead(this.grade, { width: LeadInfo.width, hieght: LeadInfo.height }) as Laya.Image;// 次节点

            this.icon = { parent, child };

            this.icon.parent.id = this.id;
            this.icon.child.alpha = 0.5;
            this.icon.parent.touchState = true;// 开启拖动
            this.icon.parent.zOrder = this.icon.child.zOrder = 100;

            this.stage.addChild(this.icon.child);
            this.stage.addChild(this.icon.parent);

            let pos = this.stage.getChildByName(`pool${this.position}`) as Laya.Image;
            if (!!pos) {
                this.icon.child.pos(pos.x + (pos.width / 2 - this.icon.child.width / 2), pos.y);
                this.icon.parent.pos(pos.x + (pos.width / 2 - this.icon.child.width / 2), pos.y);
                this.position = { x: pos.x + (pos.width / 2 - this.icon.child.width / 2), y: pos.y };
            } else {
                console.log("无法获取到主角的位置");
                this.icon.child.pos(-100, -100);
                this.icon.parent.pos(-100, -100);
                return;
            }

            pos["leadClass"] = this;
            this.seat = pos;

            // 拖动事件
            drag(this.icon.parent, (self, target) => {
                if (target.name === "AnimationPool") {
                    if (adminPool.child >= adminPool.maxLength) {
                        console.log("已经满员了!");
                        Laya.Tween.to(this.icon.parent, { x: this.position.x, y: this.position.y }, 350);
                    } else {
                        this.work();// 开始工作
                    }
                } else {
                    if (target.name === "recovery") {

                        this.recovery();
                        console.log("回收");

                    } else if (!target.leadClass) {

                        console.log(" 空槽位 ");
                        this.replacePos(target, { id: this.id, pos: target.name.slice(4) });

                    } else if (target.leadClass.id == this.id) {

                        console.log("原槽位");
                        Laya.Tween.to(this.icon.parent, { x: this.position.x, y: this.position.y }, 350);

                    } else if (target.leadClass.grade === this.grade) {

                        console.log("升级合体");
                        this.upgrade(target.leadClass);

                    } else {
                        console.log("调换位置");
                        this.replacePos(target, { id: this.id, pos: target.name.slice(4) }, { id: target.leadClass.id, pos: this.pos });
                    }
                }
            });

            // 工作状态
            if (this.state === "1") {
                this.icon.parent.touchState = false;// 暂停拖动

                this.cointimer("open");// 金币计时器

                this.AdminTimer = true;
                this.adminUpdate();// 运动动画

                this.endWork();// 结束工作控制

                adminPool.child += 1;
            }
        }

        // 升级
        private upgrade(datas) {
            console.log("开始升级");
            Ajax("get", "https://shop.yunfanshidai.com/xcxht/qinggong/api/composerole.php", {
                openid: LeadInfo.openID,
                role1: this.id,
                role2: datas.id,
                position: datas.pos,
            }, data => {
                this.delete();
                datas.delete();

                tips("升级成功");
                let user = {
                    roleid: data.roleid,
                    grade: data.grade,
                    iswork: data.iswork,
                    position: data.position,
                    wages: data.wages,
                    cycle: data.cycle,
                };
                new GAME.lead(user, this.stage);

                Laya.stage.event("rolelevelSet", data.role_level);// 更新人物解锁等级

                if (!!data.islock && data.islock === "2") {
                    console.log("人物解锁列表更新");
                }
            }, err => {
                tips("升级失败");
                Laya.Tween.to(this.icon.parent, { x: this.position.x, y: this.position.y }, 350);
            })
        }

        // 更换位置
        private changePos(target) {
            let a = target;// 新槽位
            let b = this.seat;// 当前槽位

            // 更新当前对象坐标
            if (!this.AdminTimer) Laya.Tween.to(this.icon.parent, { x: a.x + (this.seat.width / 2 - this.icon.child.width / 2), y: a.y }, 350);// 非工作状态则更新坐标
            this.icon.child.pos(a.x + (this.seat.width / 2 - this.icon.child.width / 2), a.y)

            // position变量更新
            this.position = { x: a.x + (this.seat.width / 2 - this.icon.child.width / 2), y: a.y };

            // 如果新槽位中已存在对象则更新该对象
            if (!!a["leadClass"]) {
                if (!a["leadClass"].AdminTimer) Laya.Tween.to(a.leadClass.icon.parent, { x: b.x + (this.seat.width / 2 - this.icon.child.width / 2), y: b.y }, 350);// 非工作状态则更新坐标
                a.leadClass.icon.child.pos(b.x + (this.seat.width / 2 - this.icon.child.width / 2), b.y);
                a.leadClass.position = { x: b.x + (this.seat.width / 2 - this.icon.child.width / 2), y: b.y };
            }

            let _data = this.seat;// 暂时缓存原槽位

            // 交换槽位中对象的引用
            a["leadClass"] = [b["leadClass"], b["leadClass"] = a["leadClass"]][0];

            // 交换对象中槽位的引用
            a["leadClass"].seat = a;
            if (!!b["leadClass"]) b["leadClass"].seat = _data;
        }

        // 更换位置请求
        private replacePos(target, obj, obj2: any = null) {
            let self = this;
            Ajax("get", "https://shop.yunfanshidai.com/xcxht/qinggong/api/changepos.php", {
                openid: LeadInfo.openID,
                roleid: obj.id,
                position: obj.pos
            }, data => {
                if (!!obj2) {
                    Ajax("get", "https://shop.yunfanshidai.com/xcxht/qinggong/api/changepos.php", {
                        openid: LeadInfo.openID,
                        roleid: obj2.id,
                        position: obj2.pos
                    }, data => {
                        this.changePos(target);// 更换位置
                    }, err => {
                        console.log("第二个主角未成功调换位置");
                    })
                } else {
                    this.changePos(target);// 更换位置
                }
                console.log("位置调换成功");
            }, err => {
                tips("无法调换位置");
                Laya.Tween.to(this.icon.parent, { x: this.position.x, y: this.position.y }, 350);
            })
        }

        // 开始工作
        private work() {
            Ajax("get", "https://shop.yunfanshidai.com/xcxht/qinggong/api/runrole.php", {
                openid: LeadInfo.openID,
                roleid: this.id
            }, data => {
                console.log("开始工作");
                adminPool.child += 1;
            }, err => {
                console.log("工作请求失败");
            })

            this.icon.parent.touchState = false;// 暂停拖动

            this.cointimer("open");

            this.AdminTimer = true;
            this.adminUpdate();// 运动动画

            this.endWork();// 结束工作控制
        }

        // 金币定时器
        private cointimer(type: string) {
            if (!!this.Timer) window.clearInterval(this.Timer);// 清理计时器
            if (type === "open") {
                this.Timer = window.setInterval(() => {
                    Laya.stage.event("MoneyAdd", this.wages * this.Multiple);
                    tips(Format((this.wages * this.Multiple).toString()), "coin");
                }, this.cycle);

                // 更改总速度
                Laya.stage.event("speedSet",this.wages/(this.cycle/1000));
            } else if (type === "stop") {
                window.clearInterval(this.Timer);
                 Laya.stage.event("speedSet",-this.wages/(this.cycle/1000));
            } else if (type === "replace") {
                window.clearInterval(this.Timer);
            }
        }

        // 回收
        private recovery() {
            Ajax("get", "https://shop.yunfanshidai.com/xcxht/qinggong/api/callbackrole.php", {
                openid: LeadInfo.openID,
                roleid: this.id,
                coin: addition(window["___index"].GameInfo.coin, getLeadPrice(this.grade))
            }, data => {
                tips("回收成功");
                Laya.stage.event("MoneySet", addition(window["___index"].GameInfo.coin, getLeadPrice(this.grade)));
                this.delete();

                LeadInfo.Leadlist -= 1;
            }, err => {
                tips("回收失败");
                Laya.Tween.to(this.icon.parent, { x: this.position.x, y: this.position.y }, 350);
            })
        }

        // 工作动画
        private adminUpdate() {
            if (!this.AdminTimer) return;
            window.requestAnimationFrame(this.adminUpdate.bind(this));
            this.icon.parent.x += this.speed.x;
            this.icon.parent.y += this.speed.y;
            if (this.icon.parent.x <= this.range.startX) {
                this.icon.parent.x = this.range.startX;
                this.speed.x = -this.speed.x;
            }
            if (this.icon.parent.x >= this.range.endX) {
                this.icon.parent.x = this.range.endX
                this.speed.x = -this.speed.x;
            }
            if (this.icon.parent.y >= this.range.endY) {
                this.icon.parent.y = this.range.endY
                this.speed.y = -this.speed.y;
            }
            if (this.icon.parent.y <= this.range.startY) {
                this.icon.parent.y = this.range.startY
                this.speed.y = -this.speed.y;
            }
        }

        // 结束工作按钮的事件
        private endWork() {
            this.icon.child.once(Laya.Event.CLICK, this, e => {
                Ajax("get", "https://shop.yunfanshidai.com/xcxht/qinggong/api/stoprole.php", {
                    openid: LeadInfo.openID,
                    roleid: this.id,
                    position: this.seat.name.slice(4)
                }, data => {
                    this.AdminTimer = false;// 停止动画
                    this.cointimer("stop");// 停止工作

                    Laya.Tween.to(this.icon.parent, { x: this.position.x, y: this.position.y }, 300);
                    window.setTimeout(() => {
                        this.icon.parent.touchState = true;// 开启拖动
                        adminPool.child -= 1;
                    }, 500);

                }, err => {
                    console.log("无法停止工作");
                    Laya.Tween.to(this.icon.parent, { x: this.position.x, y: this.position.y }, 350);
                })
            })
        }

        // 清空
        private delete() {
            this.icon.parent.destroy();
            this.icon.child.destroy();
            this.AdminTimer = false;// 停止动画
            this.cointimer("stop");
            this.seat.leadClass = null;
        }

    }
}