
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui {
    export class BattleUI extends Dialog {
		public content:Laya.Image;
		public Leadname:laya.display.Text;
		public Lead:Laya.Image;
		public textcont:laya.display.Text;
		public close_Btn:Laya.Image;

        public static  uiView:any ={"type":"Dialog","props":{"width":750,"height":1280},"child":[{"type":"Image","props":{"y":-102,"x":-159,"width":1107,"skin":"index/mask.png","height":1570,"alpha":0.7}},{"type":"Image","props":{"y":667,"x":347,"width":451,"var":"content","name":"content","height":737,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":1,"x":45,"skin":"index/name_bg.png"}},{"type":"Text","props":{"y":14,"x":46,"width":361,"var":"Leadname","text":"容嚒嚒","overflow":"hidden","name":"Leadname","height":50,"fontSize":50,"font":"Arial","color":"#653e21","bold":true,"align":"center"}},{"type":"Image","props":{"y":300,"x":225,"var":"Lead","skin":"Enemy/10.png","name":"Lead","anchorY":0.5,"anchorX":0.5}},{"type":"Text","props":{"y":577,"x":141,"wordWrap":true,"width":255,"var":"textcont","valign":"middle","text":"赏赐对方5个巴掌可获得500金币","overflow":"hidden","name":"textcont","height":159,"fontSize":30,"font":"Arial","color":"#ffffff","bold":true,"align":"center"}},{"type":"Image","props":{"y":622,"x":79,"skin":"index/hand.png"}},{"type":"Image","props":{"y":162,"x":325,"width":50,"skin":"index/LeadName.png","height":282}},{"type":"Text","props":{"y":153,"x":330,"wordWrap":true,"width":40,"valign":"middle","text":"点击人物开始攻击","overflow":"visible","height":300,"fontSize":25,"font":"Arial","color":"#4f2823","bold":true,"align":"center"}},{"type":"Image","props":{"y":576,"x":53,"skin":"index/biankuang.png"}}]},{"type":"Image","props":{"y":305,"x":586,"var":"close_Btn","skin":"index/close.png","name":"close_Btn","anchorY":0.5,"anchorX":0.5}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.createView(ui.BattleUI.uiView);

        }

    }
}

module ui {
    export class InvitingfriendsUI extends Dialog {
		public content:Laya.Image;
		public _list:Laya.List;
		public LeadName:laya.display.Text;
		public btn_coin:Laya.Button;
		public coin:laya.display.Text;
		public shareBTN:Laya.Image;
		public close_Btn:Laya.Image;

        public static  uiView:any ={"type":"Dialog","props":{"width":750,"height":1280},"child":[{"type":"Image","props":{"y":-100,"x":-161,"width":1107,"skin":"index/mask.png","height":1570,"alpha":0.7}},{"type":"Image","props":{"y":632,"x":371,"width":569,"var":"content","skin":"index/store_bg2.png","name":"content","height":973,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":94,"x":46,"width":472,"skin":"index/yuanbao_bg.png","height":93}},{"type":"Image","props":{"y":122,"x":81,"width":64,"skin":"index/yuanbao.png","height":39}},{"type":"Text","props":{"y":111,"x":77,"width":409,"valign":"middle","text":"一大波金元宝在等着你","overflow":"visible","height":60,"fontSize":25,"font":"Arial","color":"#653e21","bold":true,"align":"center"}},{"type":"List","props":{"y":309,"x":51,"width":474,"var":"_list","spaceY":15,"spaceX":20,"repeatY":4,"repeatX":1,"name":"_list","height":647},"child":[{"type":"Box","props":{"renderType":"render"},"child":[{"type":"Image","props":{"skin":"index/line_bg.png"}},{"type":"Image","props":{"y":15,"x":12,"width":94,"skin":"index/Leadbg.png","height":94}},{"type":"Text","props":{"y":44,"x":115,"wordWrap":true,"width":119,"var":"LeadName","valign":"middle","text":"邀请1位好友","overflow":"hidden","name":"LeadName","height":31,"fontSize":18,"font":"Arial","color":"#653e21","bold":true,"align":"left"}},{"type":"Button","props":{"y":34,"x":293,"var":"btn_coin","stateNum":1,"skin":"index/receive.png","name":"btn_coin"}},{"type":"Image","props":{"y":8,"x":20,"skin":"index/unknownman.png","name":"Invisible"}},{"type":"Image","props":{"y":81,"x":110,"width":110,"skin":"index/mask.png","height":28,"alpha":0.1}},{"type":"Image","props":{"y":84,"x":116,"width":36,"skin":"index/yuanbao.png","height":22}},{"type":"Text","props":{"y":78,"x":162,"wordWrap":true,"width":87,"var":"coin","valign":"middle","text":"1000B","overflow":"hidden","name":"coin","height":31,"fontSize":15,"font":"Arial","color":"#653e21","bold":true,"align":"left"}}]}]},{"type":"Text","props":{"y":9,"x":150,"width":271,"valign":"middle","text":"邀请好友","overflow":"visible","height":60,"fontSize":40,"font":"Arial","color":"#653e21","bold":true,"align":"center"}},{"type":"Image","props":{"y":194,"x":228,"var":"shareBTN","skin":"index/share.png","name":"shareBTN"}}]},{"type":"Image","props":{"y":203,"x":641,"var":"close_Btn","skin":"index/close.png","name":"close_Btn","anchorY":0.5,"anchorX":0.5}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.createView(ui.InvitingfriendsUI.uiView);

        }

    }
}

module ui {
    export class LuckdrawUI extends Dialog {
		public content:Laya.Image;
		public _btn:Laya.Button;
		public _turntable:Laya.Image;
		public hua1:Laya.Image;
		public hua2:Laya.Image;
		public Lottery:laya.display.Text;
		public close_Btn:Laya.Image;

        public static  uiView:any ={"type":"Dialog","props":{"width":750,"height":1280},"child":[{"type":"Image","props":{"y":-112,"x":-171,"width":1107,"skin":"index/mask.png","height":1570,"alpha":0.7}},{"type":"Image","props":{"y":620,"x":383,"var":"content","name":"content","anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":-494,"x":-354,"skin":"index/bg2.png"}},{"type":"Button","props":{"y":360,"x":-181,"var":"_btn","stateNum":2,"skin":"index/btn3.png","name":"_btn"}},{"type":"Image","props":{"y":-91,"x":-25,"var":"_turntable","skin":"index/zhuanpan.png","name":"_turntable","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":-110,"x":-33,"width":225,"skin":"index/choujiang.png","rotation":0,"height":277,"anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":191,"x":-184,"var":"hua1","skin":"index/hua.png","rotation":9,"name":"hua1","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":191,"x":110,"var":"hua2","skin":"index/hua.png","rotation":-9,"name":"hua2","anchorY":0.5,"anchorX":0.5}},{"type":"Text","props":{"y":241,"x":-41,"var":"Lottery","text":"50","name":"Lottery","fontSize":30,"font":"Arial","color":"#ff3200","bold":true}},{"type":"Image","props":{"y":245,"x":18,"width":21,"skin":"index/add2.png","height":21}}]},{"type":"Image","props":{"y":184,"x":658,"var":"close_Btn","skin":"index/close.png","name":"close_Btn","anchorY":0.5,"anchorX":0.5}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.createView(ui.LuckdrawUI.uiView);

        }

    }
}

module ui {
    export class SignUI extends Dialog {
		public content:Laya.Image;
		public _list:Laya.List;
		public btn_coin:Laya.Button;
		public title:laya.display.Text;
		public titlebg:Laya.Image;
		public days:laya.display.Text;
		public close_Btn:Laya.Image;

        public static  uiView:any ={"type":"Dialog","props":{"width":750,"height":1280},"child":[{"type":"Image","props":{"y":-90,"x":-151,"width":1107,"skin":"index/mask.png","height":1570,"alpha":0.7}},{"type":"Image","props":{"y":642,"x":381,"width":569,"var":"content","skin":"index/store_bg2.png","name":"content","height":973,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"List","props":{"y":89,"x":49,"width":474,"var":"_list","spaceY":60,"spaceX":0,"repeatY":3,"repeatX":1,"name":"_list","height":859},"child":[{"type":"Box","props":{"y":24,"x":-1,"width":474,"renderType":"render","height":235},"child":[{"type":"Image","props":{"y":65,"x":0,"skin":"index/line_bg.png"}},{"type":"Button","props":{"y":96,"x":337,"var":"btn_coin","stateNum":2,"skin":"index/receive2.png","name":"btn_coin"}},{"type":"Image","props":{"y":101,"x":25,"skin":"index/yuanbao3.png"}},{"type":"Text","props":{"y":114,"x":147,"wordWrap":true,"width":150,"var":"title","valign":"middle","text":"恭喜小主","overflow":"hidden","name":"title","height":42,"fontSize":30,"font":"Arial","color":"#653e21","bold":true,"align":"center"}},{"type":"Image","props":{"y":12,"x":27,"var":"titlebg","skin":"index/line2.png","name":"titlebg"}},{"type":"Text","props":{"y":13,"x":156,"wordWrap":true,"width":150,"var":"days","valign":"middle","text":"第1天","overflow":"hidden","name":"days","height":42,"fontSize":30,"font":"Arial","color":"#633d26","bold":true,"align":"center"}}]}]},{"type":"Text","props":{"y":9,"x":150,"width":271,"valign":"middle","text":"签到","overflow":"visible","height":60,"fontSize":40,"font":"Arial","color":"#653e21","bold":true,"align":"center"}}]},{"type":"Image","props":{"y":213,"x":651,"var":"close_Btn","skin":"index/close.png","name":"close_Btn","anchorY":0.5,"anchorX":0.5}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.createView(ui.SignUI.uiView);

        }

    }
}

module ui {
    export class alertUI extends Dialog {
		public content:Laya.Image;
		public title:laya.display.Text;
		public icon:Laya.Image;
		public contentText:laya.display.Text;
		public tipsText:laya.display.Text;
		public close_Btn:Laya.Image;

        public static  uiView:any ={"type":"Dialog","props":{"width":750,"height":1280},"child":[{"type":"Image","props":{"y":-110,"x":-171,"width":1107,"skin":"index/mask.png","height":1570,"alpha":0.7}},{"type":"Image","props":{"y":622,"x":361,"var":"content","skin":"index/tips_bg.png","name":"content","anchorY":0.5,"anchorX":0.5},"child":[{"type":"Text","props":{"y":8,"x":131,"width":300,"var":"title","valign":"middle","text":"离线收益","name":"title","height":60,"fontSize":30,"font":"Arial","color":"#653e21","bold":true,"align":"center"}},{"type":"Image","props":{"y":201,"x":229,"width":105,"var":"icon","skin":"index/copper2.png","name":"icon","height":105}},{"type":"Text","props":{"y":330,"x":16,"width":537,"var":"contentText","valign":"middle","name":"contentText","height":78,"fontSize":50,"font":"Arial","color":"#653e21","bold":true,"align":"center"}},{"type":"Text","props":{"y":101,"x":68,"wordWrap":true,"width":444,"var":"tipsText","valign":"middle","text":"在您离线时获得","overflow":"hidden","name":"tipsText","height":78,"fontSize":30,"font":"Arial","color":"#653e21","bold":true,"align":"center"}}]},{"type":"Image","props":{"y":410,"x":621,"var":"close_Btn","skin":"index/close.png","name":"close_Btn","anchorY":0.5,"anchorX":0.5}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.createView(ui.alertUI.uiView);

        }

    }
}

module ui {
    export class helpUI extends Dialog {
		public content:Laya.Image;
		public close_Btn:Laya.Image;

        public static  uiView:any ={"type":"Dialog","props":{"width":750,"height":1280},"child":[{"type":"Image","props":{"y":-90,"x":-157,"width":1107,"skin":"index/mask.png","height":1570,"alpha":0.7}},{"type":"Image","props":{"y":642,"x":362,"width":569,"var":"content","skin":"index/tipsbg1.png","name":"content","height":973,"anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":213,"x":645,"var":"close_Btn","skin":"index/close.png","name":"close_Btn","anchorY":0.5,"anchorX":0.5}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.helpUI.uiView);

        }

    }
}

module ui {
    export class indexUI extends View {
		public pool1:Laya.Image;
		public pool2:Laya.Image;
		public pool3:Laya.Image;
		public pool4:Laya.Image;
		public pool5:Laya.Image;
		public pool6:Laya.Image;
		public pool7:Laya.Image;
		public pool8:Laya.Image;
		public pool9:Laya.Image;
		public pool10:Laya.Image;
		public pool11:Laya.Image;
		public pool12:Laya.Image;
		public AnimationPool:Laya.Image;
		public palace:Laya.Image;
		public recovery:Laya.Image;
		public purchase:Laya.Button;
		public Luckdraw:Laya.Image;
		public shop:Laya.Button;
		public addcoin:Laya.Image;
		public addmoney:Laya.Image;
		public coinspeed:laya.display.Text;
		public _Diamonds:laya.display.Text;
		public coin:laya.display.Text;
		public purchase_text:laya.display.Text;
		public turntable:Laya.Image;
		public adminrange:Laya.Image;
		public adminList:Laya.Box;
		public adminList1:Laya.Image;
		public adminList2:Laya.Image;
		public adminList3:Laya.Image;
		public adminList4:Laya.Image;
		public adminList5:Laya.Image;
		public help:Laya.Image;
		public audioCtr:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"width":720,"height":1280},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"index/bg.png","name":"bg"}},{"type":"Image","props":{"y":547,"x":203,"skin":"index/select.png"}},{"type":"Image","props":{"y":575,"x":244,"width":120,"var":"pool1","skin":"index/Leadbg.png","name":"pool1","height":120}},{"type":"Image","props":{"y":575,"x":402,"width":120,"var":"pool2","skin":"index/Leadbg.png","name":"pool2","height":120}},{"type":"Image","props":{"y":575,"x":559,"width":120,"var":"pool3","skin":"index/Leadbg.png","name":"pool3","height":120}},{"type":"Image","props":{"y":710,"x":244,"width":120,"var":"pool4","skin":"index/Leadbg.png","name":"pool4","height":120}},{"type":"Image","props":{"y":710,"x":402,"width":120,"var":"pool5","skin":"index/Leadbg.png","name":"pool5","height":120}},{"type":"Image","props":{"y":710,"x":559,"width":120,"var":"pool6","skin":"index/Leadbg.png","name":"pool6","height":120}},{"type":"Image","props":{"y":844,"x":244,"width":120,"var":"pool7","skin":"index/Leadbg.png","name":"pool7","height":120}},{"type":"Image","props":{"y":844,"x":402,"width":120,"var":"pool8","skin":"index/Leadbg.png","name":"pool8","height":120}},{"type":"Image","props":{"y":844,"x":559,"width":120,"var":"pool9","skin":"index/Leadbg.png","name":"pool9","height":120}},{"type":"Image","props":{"y":979,"x":244,"width":120,"var":"pool10","skin":"index/Leadbg.png","name":"pool10","height":120}},{"type":"Image","props":{"y":979,"x":402,"width":120,"var":"pool11","skin":"index/Leadbg.png","name":"pool11","height":120}},{"type":"Image","props":{"y":979,"x":559,"width":120,"var":"pool12","skin":"index/Leadbg.png","name":"pool12","height":120}},{"type":"Image","props":{"y":0,"x":0,"width":720,"var":"AnimationPool","name":"AnimationPool","height":550}},{"type":"Image","props":{"y":552,"x":9,"var":"palace","skin":"index/lenggong.png","name":"palace"}},{"type":"Image","props":{"y":1147,"x":47,"width":92,"var":"recovery","skin":"index/delect.png","name":"recovery","height":111}},{"type":"Button","props":{"y":1150,"x":343,"width":248,"var":"purchase","stateNum":2,"skin":"index/btn1.png","name":"purchase","height":117}},{"type":"Image","props":{"y":1159,"x":203,"skin":"index/recovery.png"}},{"type":"Image","props":{"y":1018,"x":34,"width":118,"var":"Luckdraw","skin":"index/invite.png","name":"Luckdraw","height":118}},{"type":"Image","props":{"y":719,"x":43,"width":100,"skin":"index/rank.png","height":143}},{"type":"Button","props":{"y":1150,"x":601,"width":115,"var":"shop","stateNum":2,"skin":"index/btn2.png","name":"shop","height":115}},{"type":"Image","props":{"y":21,"x":16,"skin":"index/yuanbao_bg.png"}},{"type":"Image","props":{"y":33,"x":32,"skin":"index/yuanbao.png"}},{"type":"Image","props":{"y":27,"x":195,"width":43,"var":"addcoin","skin":"index/add2.png","name":"addcoin","height":43}},{"type":"Image","props":{"y":20,"x":265,"skin":"index/yuanbao_bg.png"}},{"type":"Image","props":{"y":29,"x":284,"width":38,"skin":"index/copper2.png","height":38}},{"type":"Image","props":{"y":26,"x":443,"width":43,"var":"addmoney","skin":"index/add2.png","name":"addmoney","height":43}},{"type":"Text","props":{"y":110,"x":325,"var":"coinspeed","text":"0/秒","name":"coinspeed","fontSize":35,"font":"Arial","color":"#653e21","bold":true}},{"type":"Image","props":{"y":107,"x":265,"width":46,"skin":"index/copper2.png","height":46}},{"type":"Text","props":{"y":31,"x":85,"width":107,"var":"_Diamonds","text":"8.888B","name":"_Diamonds","height":30,"fontSize":30,"font":"Arial","color":"#653e21","bold":true,"align":"center"}},{"type":"Text","props":{"y":31,"x":326,"width":113,"var":"coin","text":"8.888B","name":"coin","height":30,"fontSize":30,"font":"Arial","color":"#653e21","bold":true,"align":"center"}},{"type":"Text","props":{"y":1226,"x":418,"width":155,"var":"purchase_text","text":"1.8888B","name":"purchase_text","height":25,"fontSize":30,"font":"Arial","color":"#653e21","bold":true}},{"type":"Image","props":{"y":878,"x":33,"width":120,"var":"turntable","skin":"index/luck.png","name":"turntable","height":129}},{"type":"Image","props":{"y":201,"x":146,"width":421,"var":"adminrange","name":"adminrange","height":169}},{"type":"Image","props":{"y":91,"x":27,"skin":"index/yuhuayuan.png"}},{"type":"Box","props":{"y":495,"x":189,"var":"adminList","name":"adminList"},"child":[{"type":"Image","props":{"y":0,"x":0,"var":"adminList1","skin":"index/weizhi2.png","name":"adminList1"}},{"type":"Image","props":{"y":0,"x":72,"var":"adminList2","skin":"index/weizhi2.png","name":"adminList2"}},{"type":"Image","props":{"y":0,"x":144,"var":"adminList3","skin":"index/weizhi2.png","name":"adminList3"}},{"type":"Image","props":{"y":0,"x":216,"var":"adminList4","skin":"index/weizhi2.png","name":"adminList4"}},{"type":"Image","props":{"y":0,"x":288,"var":"adminList5","skin":"index/weizhi2.png","name":"adminList5"}}]},{"type":"Image","props":{"y":97,"x":636,"var":"help","skin":"index/help.png","name":"help"}},{"type":"Image","props":{"y":179,"x":638,"var":"audioCtr","skin":"index/voice1.png","name":"audioCtr"}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.createView(ui.indexUI.uiView);

        }

    }
}

module ui {
    export class lockListUI extends Dialog {
		public content:Laya.Image;
		public _list:Laya.List;
		public lead:Laya.Image;
		public grade_bg:Laya.Image;
		public grade:laya.display.Text;
		public LeadName:laya.display.Text;
		public btn_coin:Laya.Button;
		public btn_coin_text:laya.display.Text;
		public btn_yuanbao:Laya.Button;
		public btn_yuanbao_text:laya.display.Text;
		public btn_un:Laya.Image;
		public btn_un_text:laya.display.Text;
		public Invisible:Laya.Image;
		public coin:laya.display.Text;
		public yuanbao:laya.display.Text;
		public close_Btn:Laya.Image;

        public static  uiView:any ={"type":"Dialog","props":{"width":750,"height":1280},"child":[{"type":"Image","props":{"y":-110,"x":-171,"width":1107,"skin":"index/mask.png","height":1570,"alpha":0.7}},{"type":"Image","props":{"y":622,"x":361,"width":569,"var":"content","skin":"index/store_bg2.png","name":"content","height":973,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"List","props":{"y":91,"x":46,"width":474,"var":"_list","spaceY":25,"spaceX":20,"repeatY":5,"repeatX":1,"name":"_list","height":859},"child":[{"type":"Box","props":{"renderType":"render"},"child":[{"type":"Image","props":{"skin":"index/line_bg.png"}},{"type":"Image","props":{"y":15,"x":12,"width":94,"skin":"index/Leadbg.png","height":94}},{"type":"Image","props":{"y":4,"x":16,"var":"lead","skin":"Lead/1.png","name":"lead"}},{"type":"Image","props":{"y":99,"x":30,"var":"grade_bg","skin":"index/shuzi.png","name":"grade_bg"}},{"type":"Text","props":{"y":102,"x":32,"width":19,"var":"grade","valign":"middle","text":"30","name":"grade","height":15,"fontSize":12,"font":"Arial","color":"#ffffff","bold":true,"align":"center"}},{"type":"Text","props":{"y":39,"x":103,"wordWrap":true,"width":100,"var":"LeadName","valign":"middle","text":"容嚒嚒","overflow":"hidden","name":"LeadName","height":61,"fontSize":18,"font":"Arial","color":"#653e21","bold":true,"align":"center"}},{"type":"Button","props":{"y":37,"x":340,"width":125,"var":"btn_coin","stateNum":2,"skin":"index/locklistbtn.png","name":"btn_coin","height":65},"child":[{"type":"Image","props":{"y":19,"x":6,"width":30,"skin":"index/copper2.png","height":30}},{"type":"Text","props":{"y":19,"x":38,"width":81,"var":"btn_coin_text","valign":"middle","text":"1.8888B","overflow":"hidden","name":"btn_coin_text","height":29,"fontSize":18,"font":"Arial","color":"#653e21","bold":true,"align":"center"}}]},{"type":"Button","props":{"y":37,"x":209,"width":125,"visible":false,"var":"btn_yuanbao","stateNum":2,"skin":"index/locklistbtn.png","name":"btn_yuanbao","height":65},"child":[{"type":"Image","props":{"y":24,"x":8,"width":37,"skin":"index/yuanbao.png","height":23}},{"type":"Text","props":{"y":20,"x":44,"width":77,"var":"btn_yuanbao_text","valign":"middle","text":"1.888B","overflow":"hidden","name":"btn_yuanbao_text","height":29,"fontSize":18,"font":"Arial","color":"#653e21","bold":true,"align":"center"}}]},{"type":"Image","props":{"y":37,"x":341,"width":125,"visible":false,"var":"btn_un","skin":"index/btnend.png","name":"btn_un","height":65},"child":[{"type":"Text","props":{"y":19,"x":2,"width":122,"var":"btn_un_text","valign":"middle","text":"2级解锁","overflow":"hidden","name":"btn_un_text","height":29,"fontSize":18,"font":"Arial","color":"#653e21","bold":true,"align":"center"}}]},{"type":"Image","props":{"y":8,"x":20,"visible":false,"var":"Invisible","skin":"index/unknownman.png","name":"Invisible"}}]}]},{"type":"Image","props":{"y":106,"x":82,"width":45,"visible":false,"skin":"index/copper2.png","height":45}},{"type":"Text","props":{"y":112,"x":132,"visible":false,"var":"coin","text":"1000B","name":"coin","fontSize":30,"font":"Arial","color":"#653e21","bold":true}},{"type":"Image","props":{"y":113,"x":325,"visible":false,"skin":"index/yuanbao.png"}},{"type":"Text","props":{"y":111,"x":384,"width":88.4033203125,"visible":false,"var":"yuanbao","text":"1000B","name":"yuanbao","height":30,"fontSize":30,"font":"Arial","color":"#653e21","bold":true}},{"type":"Text","props":{"y":9,"x":150,"width":271,"valign":"middle","text":"商城","overflow":"visible","height":60,"fontSize":50,"font":"Arial","color":"#653e21","bold":true,"align":"center"}}]},{"type":"Image","props":{"y":193,"x":631,"var":"close_Btn","skin":"index/close.png","name":"close_Btn","anchorY":0.5,"anchorX":0.5}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.createView(ui.lockListUI.uiView);

        }

    }
}

module ui {
    export class palaceUI extends Dialog {
		public content:Laya.Image;
		public _list:Laya.List;
		public Unlocked:Laya.Image;
		public Unlock:Laya.Image;
		public Lead:Laya.Image;
		public Leadname:laya.display.Text;
		public close_Btn:Laya.Image;

        public static  uiView:any ={"type":"Dialog","props":{"y":0,"x":0,"width":750,"height":1280},"child":[{"type":"Image","props":{"y":-120,"x":-181,"width":1107,"skin":"index/mask.png","height":1570,"alpha":0.7}},{"type":"Image","props":{"y":612,"x":351,"var":"content","skin":"index/store_bg.png","name":"content","anchorY":0.5,"anchorX":0.5},"child":[{"type":"List","props":{"y":86,"x":44,"var":"_list","spaceY":20,"spaceX":20,"repeatY":4,"repeatX":2,"name":"_list"},"child":[{"type":"Box","props":{"renderType":"render"},"child":[{"type":"Image","props":{"var":"Unlocked","skin":"index/lock_bg.png","name":"Unlocked"}},{"type":"Image","props":{"y":0,"x":1,"visible":false,"var":"Unlock","skin":"index/unlock_bg.png","name":"Unlock"},"child":[{"type":"Image","props":{"y":75,"x":92,"width":71,"var":"Lead","skin":"Enemy/1.png","name":"Lead","height":94}},{"type":"Text","props":{"y":56,"x":59,"wordWrap":true,"width":31,"var":"Leadname","valign":"middle","text":"容嬷嬷","strokeColor":"#dbbea9","stroke":2,"overflow":"visible","name":"Leadname","height":132,"fontSize":25,"font":"Arial","color":"#653e21","bold":true,"align":"center"}}]}]}]}]},{"type":"Image","props":{"y":176,"x":648,"var":"close_Btn","skin":"index/close.png","name":"close_Btn","anchorY":0.5,"anchorX":0.5}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.createView(ui.palaceUI.uiView);

        }

    }
}

module ui {
    export class rewardUI extends Dialog {
		public content:Laya.Image;
		public Light:Laya.Image;
		public Textarea:Laya.Image;
		public huangho:Laya.Image;
		public taiho:Laya.Image;
		public taijian:Laya.Image;
		public hangshang:Laya.Image;
		public jingyuanbao:Laya.Image;
		public Lottery:Laya.Image;
		public coin:Laya.Image;
		public reward:laya.display.Text;
		public close_Btn:Laya.Image;

        public static  uiView:any ={"type":"Dialog","props":{"width":750,"height":1280},"child":[{"type":"Image","props":{"y":-110,"x":-171,"width":1107,"skin":"index/mask.png","height":1570,"alpha":0.7}},{"type":"Image","props":{"y":622,"x":361,"var":"content","name":"content","anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":37,"x":-145,"width":413,"var":"Light","skin":"index/yuanb_bg.png","rotation":0,"name":"Light","height":406,"anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":-440,"x":108,"width":201,"var":"Textarea","skin":"index/textbg.png","name":"Textarea","height":702}},{"type":"Image","props":{"y":-346,"x":-167,"width":281,"visible":false,"var":"huangho","skin":"index/huangho.png","name":"huangho","height":457,"anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":-353,"x":-163,"width":275,"visible":false,"var":"taiho","skin":"index/taiho.png","name":"taiho","height":446,"anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":-322,"x":-144,"width":249,"visible":false,"var":"taijian","skin":"index/taijian.png","name":"taijian","height":404,"anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":-338,"x":-150,"width":199,"visible":false,"var":"hangshang","skin":"index/huandi.png","name":"hangshang","height":459,"anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":-57,"x":-264,"width":220,"visible":false,"var":"jingyuanbao","skin":"index/yuanb.png","name":"jingyuanbao","height":179}},{"type":"Image","props":{"y":-26,"x":-221,"width":143,"visible":false,"var":"Lottery","skin":"index/jiangquan.png","name":"Lottery","height":113}},{"type":"Image","props":{"y":-43,"x":-225,"width":145,"visible":false,"var":"coin","skin":"index/copper2.png","name":"coin","height":145}},{"type":"Text","props":{"y":301,"x":-360,"width":750,"var":"reward","valign":"middle","text":"获得12340个元宝","strokeColor":"#101010","stroke":8,"pivotY":0.5,"pivotX":0.5,"name":"reward","height":70,"fontSize":30,"font":"Arial","color":"#fffde3","bold":true,"align":"center"}}]},{"type":"Image","props":{"y":1077,"x":376,"var":"close_Btn","skin":"index/btnsure.png","name":"close_Btn","anchorY":0.5,"anchorX":0.5}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.createView(ui.rewardUI.uiView);

        }

    }
}

module ui {
    export class reward2UI extends Dialog {
		public content:Laya.Image;
		public Light:Laya.Image;
		public reward:laya.display.Text;
		public proptype:Laya.Image;
		public close_Btn:Laya.Image;

        public static  uiView:any ={"type":"Dialog","props":{"width":750,"height":1280},"child":[{"type":"Image","props":{"y":-100,"x":-156,"width":1107,"skin":"index/mask.png","height":1570,"alpha":0.7}},{"type":"Image","props":{"y":635,"x":371,"var":"content","name":"content","anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":-206,"x":5,"width":413,"var":"Light","skin":"index/yuanb_bg.png","rotation":0,"pivotY":196,"pivotX":204,"name":"Light","height":406}},{"type":"Text","props":{"y":42,"x":-370,"width":750,"var":"reward","valign":"middle","strokeColor":"#101010","stroke":8,"pivotY":0.5,"pivotX":0.5,"name":"reward","height":70,"fontSize":30,"font":"Arial","color":"#fffde3","bold":true,"align":"center"}},{"type":"Image","props":{"y":-232,"x":-32,"var":"proptype","skin":"index/jiangquan.png","name":"proptype"}}]},{"type":"Image","props":{"y":840,"x":386,"var":"close_Btn","skin":"index/btnsure.png","name":"close_Btn","anchorY":0.5,"anchorX":0.5}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.createView(ui.reward2UI.uiView);

        }

    }
}

module ui {
    export class shareUI extends Dialog {
		public content:Laya.Image;
		public close_Btn:Laya.Image;

        public static  uiView:any ={"type":"Dialog","props":{"width":750,"height":1280},"child":[{"type":"Image","props":{"y":-80,"x":-141,"width":1107,"skin":"index/mask.png","height":1570,"alpha":0.7}},{"type":"Image","props":{"y":652,"x":391,"width":569,"var":"content","skin":"index/tipsbg2.png","name":"content","height":973,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":265,"x":373,"skin":"index/receive3.png"}}]},{"type":"Image","props":{"y":171,"x":671,"var":"close_Btn","skin":"index/close.png","name":"close_Btn","anchorY":0.5,"anchorX":0.5}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.shareUI.uiView);

        }

    }
}

module ui {
    export class upgradeUI extends Dialog {
		public content:Laya.Image;
		public Lead:Laya.Image;
		public LeadName:laya.display.Text;
		public Flower:Laya.Image;
		public shared:Laya.Button;
		public close_Btn:Laya.Image;

        public static  uiView:any ={"type":"Dialog","props":{"width":750,"height":1280},"child":[{"type":"Image","props":{"y":-100,"x":-161,"width":1107,"skin":"index/mask.png","height":1570,"alpha":0.7}},{"type":"Image","props":{"y":632,"x":371,"var":"content","skin":"index/tips_bg.png","name":"content","anchorY":0.5,"anchorX":0.5},"child":[{"type":"Text","props":{"y":8,"x":131,"width":300,"valign":"middle","text":"解锁人物","name":"title","height":60,"fontSize":30,"font":"Arial","color":"#653e21","bold":true,"align":"center"}},{"type":"Image","props":{"y":144,"x":207,"width":144,"var":"Lead","skin":"Lead/1.png","name":"Lead","height":202}},{"type":"Image","props":{"y":180,"x":386,"skin":"index/LeadName.png"}},{"type":"Text","props":{"y":189,"x":393,"wordWrap":true,"width":36,"var":"LeadName","valign":"middle","text":"容嚒嚒","strokeColor":"#ec452f","stroke":1,"name":"LeadName","height":124,"fontSize":25,"font":"Arial","color":"#4f2823","bold":true,"align":"center"}},{"type":"Image","props":{"y":452,"x":-51,"var":"Flower","skin":"index/hua.png","name":"Flower"}},{"type":"Button","props":{"y":406,"x":228,"var":"shared","stateNum":2,"skin":"index/xuanyao.png","name":"shared"}}]},{"type":"Image","props":{"y":420,"x":631,"var":"close_Btn","skin":"index/close.png","name":"close_Btn","anchorY":0.5,"anchorX":0.5}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.createView(ui.upgradeUI.uiView);

        }

    }
}
