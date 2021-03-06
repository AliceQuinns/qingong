// 主角
var GAME;
(function (GAME) {
    var lead = /** @class */ (function () {
        function lead(data, stage) {
            // 运动速度
            this.speed = {
                x: 2,
                y: 0.1
            };
            this.id = (data.id) ? data.id : console.log("未传入ID");
            this.grade = (data.grade) ? data.grade : console.log("未传入等级");
            this.state = data.is_work;
            this.stage = stage;
            this.wages = (data.wages) ? data.wages : console.log("未传入生产金币速度");
            this.position = data.position; // 位置
            this.start_tim = (data.start_tim) ? data.start_tim : 0; // 记录上次开始工作时间
            this.range = adminPool.Range; // 动画边界
            this.init();
        }
        lead.prototype.init = function () {
            var _this = this;
            var parent = createLead(this.grade, { width: LeadInfo.width, hieght: LeadInfo.height }); // 主节点
            var child = createLead(this.grade, { width: LeadInfo.width, hieght: LeadInfo.height }); // 次节点
            this.icon = { parent: parent, child: child };
            this.icon.parent.id = this.id;
            this.icon.child.alpha = 0.5;
            this.icon.parent.touchState = true; // 开启拖动
            this.icon.parent.zOrder = this.icon.child.zOrder = 100;
            this.stage.addChild(this.icon.child);
            this.stage.addChild(this.icon.parent);
            var pos = this.stage.getChildByName("pool" + this.position);
            if (!!pos) {
                this.icon.child.pos(pos.x + (pos.width / 2 - this.icon.child.width / 2), pos.y);
                this.icon.parent.pos(pos.x + (pos.width / 2 - this.icon.child.width / 2), pos.y);
                this.position = { x: pos.x + (pos.width / 2 - this.icon.child.width / 2), y: pos.y };
            }
            else {
                console.log("无法获取到主角的位置");
            }
            pos["leadClass"] = this;
            this.seat = pos;
            // 拖动事件
            drag(this.icon.parent, function (self, target) {
                if (target.name === "AnimationPool") {
                    if (adminPool.child.length >= adminPool.maxLength) {
                        console.log("已经满员了!");
                        Laya.Tween.to(_this.icon.parent, { x: _this.position.x, y: _this.position.y }, 350);
                    }
                    else {
                        _this.work(); // 开始工作
                        adminPool.child.push(_this.icon.parent);
                    }
                }
                else {
                    if (target.name === "recovery") {
                        console.log("回收");
                    }
                    else if (!target.leadClass) {
                        console.log("空槽位");
                        _this.changePos(target);
                    }
                    else if (target.leadClass.id == _this.id) {
                        console.log("原槽位");
                        Laya.Tween.to(_this.icon.parent, { x: _this.position.x, y: _this.position.y }, 350);
                    }
                    else if (target.leadClass.grade === _this.grade) {
                        console.log("升级合体");
                        // 网络请求接口
                        _this.delete(); // 删除当前节点
                        target.leadClass.upgrade(); // 调用对方节点进行升级
                    }
                    else {
                        console.log("调换位置");
                        _this.changePos(target); // 更新位置
                    }
                }
            });
        };
        // 升级
        lead.prototype.upgrade = function () {
            console.log("开始升级");
        };
        // 更换位置
        lead.prototype.changePos = function (target) {
            var a = target; // 新槽位
            var b = this.seat; // 当前槽位
            // 更新当前对象坐标
            if (!this.AdminTimer)
                Laya.Tween.to(this.icon.parent, { x: a.x + (this.seat.width / 2 - this.icon.child.width / 2), y: a.y }, 350); // 非工作状态则更新坐标
            this.icon.child.pos(a.x + (this.seat.width / 2 - this.icon.child.width / 2), a.y);
            // position变量更新
            this.position = { x: a.x + (this.seat.width / 2 - this.icon.child.width / 2), y: a.y };
            // 如果新槽位中已存在对象则更新该对象
            if (!!a["leadClass"]) {
                if (!a["leadClass"].AdminTimer)
                    Laya.Tween.to(a.leadClass.icon.parent, { x: b.x + (this.seat.width / 2 - this.icon.child.width / 2), y: b.y }, 350); // 非工作状态则更新坐标
                a.leadClass.icon.child.pos(b.x + (this.seat.width / 2 - this.icon.child.width / 2), b.y);
                a.leadClass.position = { x: b.x + (this.seat.width / 2 - this.icon.child.width / 2), y: b.y };
            }
            var _data = this.seat; // 暂时缓存原槽位
            // 交换槽位中对象的引用
            a["leadClass"] = [b["leadClass"], b["leadClass"] = a["leadClass"]][0];
            // 交换对象中槽位的引用
            a["leadClass"].seat = a;
            if (!!b["leadClass"])
                b["leadClass"].seat = _data;
        };
        // 开始工作
        lead.prototype.work = function () {
            this.icon.parent.touchState = false; // 暂停拖动
            if (!!this.Timer)
                window.clearInterval(this.Timer); // 结束计时器
            this.AdminTimer = true;
            this.adminUpdate(); // 运动动画
            this.endWork(); // 结束工作控制
        };
        // 工作动画
        lead.prototype.adminUpdate = function () {
            if (!this.AdminTimer)
                return;
            window.requestAnimationFrame(this.adminUpdate.bind(this));
            this.icon.parent.x += this.speed.x;
            this.icon.parent.y += this.speed.y;
            if (this.icon.parent.x <= this.range.startX) {
                this.icon.parent.x = this.range.startX;
                this.speed.x = -this.speed.x;
            }
            if (this.icon.parent.x >= this.range.endX) {
                this.icon.parent.x = this.range.endX;
                this.speed.x = -this.speed.x;
            }
            if (this.icon.parent.y >= this.range.endY) {
                this.icon.parent.y = this.range.endY;
                this.speed.y = -this.speed.y;
            }
            if (this.icon.parent.y <= this.range.startY) {
                this.icon.parent.y = this.range.startY;
                this.speed.y = -this.speed.y;
            }
        };
        // 结束工作按钮的事件
        lead.prototype.endWork = function () {
            var _this = this;
            this.icon.child.once(Laya.Event.CLICK, this, function (e) {
                _this.AdminTimer = false; // 停止动画
                Laya.Tween.to(_this.icon.parent, { x: _this.position.x, y: _this.position.y }, 300);
                window.setTimeout(function () {
                    _this.icon.parent.touchState = true; // 开启拖动
                    adminPool.child.forEach(function (element, index) {
                        if (element.id = _this.id) {
                            adminPool.child.splice(index, 1);
                        }
                    });
                }, 500);
            });
        };
        // 清空
        lead.prototype.delete = function () {
            this.icon.parent.destroy();
            this.icon.child.destroy();
            this.AdminTimer = false; // 停止动画
            if (!!this.Timer)
                window.clearInterval(this.Timer); // 结束金币计时器
            this.seat.leadClass = null;
        };
        return lead;
    }());
    GAME.lead = lead;
})(GAME || (GAME = {}));
//# sourceMappingURL=lead.js.map