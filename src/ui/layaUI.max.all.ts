
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui {
    export class LuckdrawUI extends Dialog {
		public content:Laya.Image;
		public _btn:Laya.Button;
		public _turntable:Laya.Image;
		public hua1:Laya.Image;
		public hua2:Laya.Image;
		public close_Btn:Laya.Image;

        public static  uiView:any ={"type":"Dialog","props":{"width":750,"height":1280},"child":[{"type":"Image","props":{"y":-112,"x":-171,"width":1107,"skin":"index/mask.png","height":1570,"alpha":0.7}},{"type":"Image","props":{"y":620,"x":383,"var":"content","name":"content","anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":-494,"x":-354,"skin":"index/bg2.png"}},{"type":"Button","props":{"y":360,"x":-181,"var":"_btn","stateNum":2,"skin":"index/btn3.png","name":"_btn"}},{"type":"Image","props":{"y":-91,"x":-25,"var":"_turntable","skin":"index/zhuanpan.png","name":"_turntable","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":-110,"x":-33,"width":225,"skin":"index/choujiang.png","rotation":0,"height":277,"anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":191,"x":-184,"var":"hua1","skin":"index/hua.png","rotation":9,"name":"hua1","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":191,"x":110,"var":"hua2","skin":"index/hua.png","rotation":-9,"name":"hua2","anchorY":0.5,"anchorX":0.5}},{"type":"Text","props":{"y":241,"x":-41,"text":"50","fontSize":30,"font":"Arial","color":"#ff3200","bold":true}},{"type":"Image","props":{"y":245,"x":18,"width":21,"skin":"index/add2.png","height":21}}]},{"type":"Image","props":{"y":184,"x":658,"var":"close_Btn","skin":"index/close.png","name":"close_Btn","anchorY":0.5,"anchorX":0.5}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.createView(ui.LuckdrawUI.uiView);

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

        public static  uiView:any ={"type":"Dialog","props":{"width":750,"height":1280},"child":[{"type":"Image","props":{"y":-110,"x":-171,"width":1107,"skin":"index/mask.png","height":1570,"alpha":0.7}},{"type":"Image","props":{"y":622,"x":361,"var":"content","skin":"index/tips_bg.png","name":"content","anchorY":0.5,"anchorX":0.5},"child":[{"type":"Text","props":{"y":8,"x":131,"width":300,"var":"title","valign":"middle","text":"离线收益","name":"title","height":60,"fontSize":30,"font":"Arial","color":"#653e21","bold":true,"align":"center"}},{"type":"Image","props":{"y":201,"x":229,"width":105,"var":"icon","skin":"index/copper2.png","name":"icon","height":105}},{"type":"Text","props":{"y":330,"x":16,"width":537,"var":"contentText","valign":"middle","text":"1000D","name":"contentText","height":78,"fontSize":50,"font":"Arial","color":"#653e21","bold":true,"align":"center"}},{"type":"Text","props":{"y":101,"x":68,"wordWrap":true,"width":444,"var":"tipsText","valign":"middle","text":"在您离线时获得","overflow":"hidden","name":"tipsText","height":78,"fontSize":30,"font":"Arial","color":"#653e21","bold":true,"align":"center"}}]},{"type":"Image","props":{"y":410,"x":621,"var":"close_Btn","skin":"index/close.png","name":"close_Btn","anchorY":0.5,"anchorX":0.5}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.createView(ui.alertUI.uiView);

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
		public coinspeed:laya.display.Text;
		public _Diamonds:laya.display.Text;
		public coin:laya.display.Text;
		public purchase_text:laya.display.Text;
		public turntable:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"width":720,"height":1280},"child":[{"type":"Image","props":{"y":0,"x":2,"skin":"index/bg.png","name":"bg"}},{"type":"Image","props":{"y":554,"x":351,"width":361,"skin":"index/select.png","height":518}},{"type":"Image","props":{"y":587,"x":378,"width":100,"var":"pool1","skin":"index/Leadbg.png","name":"pool1","height":100}},{"type":"Image","props":{"y":587,"x":487,"width":100,"var":"pool2","skin":"index/Leadbg.png","name":"pool2","height":100}},{"type":"Image","props":{"y":587,"x":595,"width":100,"var":"pool3","skin":"index/Leadbg.png","name":"pool3","height":100}},{"type":"Image","props":{"y":698,"x":378,"width":100,"var":"pool4","skin":"index/Leadbg.png","name":"pool4","height":100}},{"type":"Image","props":{"y":698,"x":487,"width":100,"var":"pool5","skin":"index/Leadbg.png","name":"pool5","height":100}},{"type":"Image","props":{"y":698,"x":595,"width":100,"var":"pool6","skin":"index/Leadbg.png","name":"pool6","height":100}},{"type":"Image","props":{"y":813,"x":378,"width":100,"var":"pool7","skin":"index/Leadbg.png","name":"pool7","height":100}},{"type":"Image","props":{"y":813,"x":487,"width":100,"var":"pool8","skin":"index/Leadbg.png","name":"pool8","height":100}},{"type":"Image","props":{"y":813,"x":595,"width":100,"var":"pool9","skin":"index/Leadbg.png","name":"pool9","height":100}},{"type":"Image","props":{"y":929,"x":378,"width":100,"var":"pool10","skin":"index/Leadbg.png","name":"pool10","height":100}},{"type":"Image","props":{"y":929,"x":487,"width":100,"var":"pool11","skin":"index/Leadbg.png","name":"pool11","height":100}},{"type":"Image","props":{"y":929,"x":595,"width":100,"var":"pool12","skin":"index/Leadbg.png","name":"pool12","height":100}},{"type":"Image","props":{"y":0,"x":2,"width":720,"var":"AnimationPool","name":"AnimationPool","height":550}},{"type":"Image","props":{"y":584,"x":5,"var":"palace","skin":"index/lenggong.png"}},{"type":"Image","props":{"y":1189,"x":9,"var":"recovery","skin":"index/delect.png","name":"recovery"}},{"type":"Button","props":{"y":1117,"x":345,"width":248,"var":"purchase","stateNum":2,"skin":"index/btn1.png","name":"purchase","height":117}},{"type":"Image","props":{"y":1182,"x":116,"skin":"index/recovery.png"}},{"type":"Image","props":{"y":1057,"x":213,"width":111,"var":"Luckdraw","skin":"index/invite.png","name":"Luckdraw","height":111}},{"type":"Image","props":{"y":967,"x":126,"skin":"index/rank.png"}},{"type":"Button","props":{"y":1117,"x":601,"width":115,"var":"shop","stateNum":2,"skin":"index/btn2.png","name":"shop","height":115}},{"type":"Image","props":{"y":21,"x":16,"skin":"index/yuanbao_bg.png"}},{"type":"Image","props":{"y":33,"x":37,"skin":"index/yuanbao.png"}},{"type":"Image","props":{"y":27,"x":194,"width":43,"skin":"index/add2.png","height":43}},{"type":"Image","props":{"y":21,"x":462,"skin":"index/yuanbao_bg.png"}},{"type":"Image","props":{"y":30,"x":482,"width":38,"skin":"index/copper2.png","height":38}},{"type":"Image","props":{"y":28,"x":640,"width":43,"skin":"index/add2.png","height":43}},{"type":"Text","props":{"y":110,"x":325,"var":"coinspeed","text":"0/秒","name":"coinspeed","fontSize":35,"font":"Arial","color":"#fff5e2","bold":true}},{"type":"Image","props":{"y":93,"x":235,"skin":"index/copper2.png"}},{"type":"Text","props":{"y":31,"x":97,"var":"_Diamonds","text":"100","name":"_Diamonds","fontSize":30,"font":"Arial","color":"#fff5e2","bold":true}},{"type":"Text","props":{"y":32,"x":530,"var":"coin","text":"100","name":"coin","fontSize":30,"font":"Arial","color":"#fff5e2","bold":true}},{"type":"Text","props":{"y":1194,"x":432,"var":"purchase_text","text":"1000","name":"purchase_text","fontSize":25,"font":"Arial","color":"#ffff00","bold":true}},{"type":"Image","props":{"y":1053,"x":26,"width":106,"var":"turntable","skin":"index/luck.png","name":"turntable","height":114}}]};
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

        public static  uiView:any ={"type":"Dialog","props":{"width":750,"height":1280},"child":[{"type":"Image","props":{"y":-110,"x":-171,"width":1107,"skin":"index/mask.png","height":1570,"alpha":0.7}},{"type":"Image","props":{"y":622,"x":361,"width":569,"var":"content","skin":"index/store_bg2.png","name":"content","height":973,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"List","props":{"y":174,"x":47,"var":"_list","spaceY":50,"spaceX":20,"repeatY":4,"repeatX":1,"name":"_list"},"child":[{"type":"Box","props":{"renderType":"render"},"child":[{"type":"Image","props":{"skin":"index/line_bg.png"}},{"type":"Image","props":{"y":15,"x":12,"width":94,"skin":"index/Leadbg.png","height":94}},{"type":"Image","props":{"y":4,"x":16,"var":"lead","skin":"Lead/1.png","name":"lead"}},{"type":"Image","props":{"y":99,"x":30,"var":"grade_bg","skin":"index/shuzi.png","name":"grade_bg"}},{"type":"Text","props":{"y":102,"x":32,"width":19,"var":"grade","valign":"middle","text":"30","name":"grade","height":15,"fontSize":12,"font":"Arial","color":"#ffffff","bold":true,"align":"center"}},{"type":"Text","props":{"y":39,"x":103,"wordWrap":true,"width":100,"var":"LeadName","valign":"middle","text":"容嚒嚒","overflow":"hidden","name":"LeadName","height":61,"fontSize":18,"font":"Arial","color":"#653e21","bold":true,"align":"center"}},{"type":"Button","props":{"y":37,"x":340,"width":125,"var":"btn_coin","stateNum":2,"skin":"index/locklistbtn.png","name":"btn_coin","height":65},"child":[{"type":"Image","props":{"y":19,"x":6,"width":30,"skin":"index/copper2.png","height":30}},{"type":"Text","props":{"y":19,"x":49,"width":67,"var":"btn_coin_text","valign":"middle","text":"1000B","overflow":"hidden","name":"btn_coin_text","height":29,"fontSize":18,"font":"Arial","color":"#653e21","bold":true,"align":"center"}}]},{"type":"Button","props":{"y":37,"x":209,"width":125,"visible":false,"var":"btn_yuanbao","stateNum":2,"skin":"index/locklistbtn.png","name":"btn_yuanbao","height":65},"child":[{"type":"Image","props":{"y":24,"x":8,"width":37,"skin":"index/yuanbao.png","height":23}},{"type":"Text","props":{"y":20,"x":51,"width":67,"var":"btn_yuanbao_text","valign":"middle","text":"1000B","overflow":"hidden","name":"btn_yuanbao_text","height":29,"fontSize":18,"font":"Arial","color":"#653e21","bold":true,"align":"center"}}]},{"type":"Image","props":{"y":37,"x":341,"width":125,"visible":false,"var":"btn_un","skin":"index/btnend.png","name":"btn_un","height":65},"child":[{"type":"Text","props":{"y":19,"x":2,"width":122,"var":"btn_un_text","valign":"middle","text":"2级解锁","overflow":"hidden","name":"btn_un_text","height":29,"fontSize":18,"font":"Arial","color":"#653e21","bold":true,"align":"center"}}]},{"type":"Image","props":{"y":8,"x":20,"visible":false,"var":"Invisible","skin":"index/unknownman.png","name":"Invisible"}}]}]},{"type":"Image","props":{"y":106,"x":82,"width":45,"skin":"index/copper2.png","height":45}},{"type":"Text","props":{"y":112,"x":132,"var":"coin","text":"1000B","name":"coin","fontSize":30,"font":"Arial","color":"#653e21","bold":true}},{"type":"Image","props":{"y":113,"x":325,"skin":"index/yuanbao.png"}},{"type":"Text","props":{"y":111,"x":384,"width":88.4033203125,"var":"yuanbao","text":"1000B","name":"yuanbao","height":30,"fontSize":30,"font":"Arial","color":"#653e21","bold":true}},{"type":"Text","props":{"y":9,"x":150,"width":271,"valign":"middle","text":"商城","overflow":"visible","height":60,"fontSize":50,"font":"Arial","color":"#653e21","bold":true,"align":"center"}}]},{"type":"Image","props":{"y":193,"x":631,"var":"close_Btn","skin":"index/close.png","name":"close_Btn","anchorY":0.5,"anchorX":0.5}}]};
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
		public close_Btn:Laya.Image;

        public static  uiView:any ={"type":"Dialog","props":{"y":0,"x":0,"width":750,"height":1280},"child":[{"type":"Image","props":{"y":-120,"x":-181,"width":1107,"skin":"index/mask.png","height":1570,"alpha":0.7}},{"type":"Image","props":{"y":612,"x":351,"var":"content","skin":"index/store_bg.png","name":"content","anchorY":0.5,"anchorX":0.5},"child":[{"type":"List","props":{"y":86,"x":44,"var":"_list","spaceY":20,"spaceX":20,"repeatY":4,"repeatX":2,"name":"_list"},"child":[{"type":"Box","props":{"renderType":"render"},"child":[{"type":"Image","props":{"var":"Unlocked","skin":"index/lock_bg.png","name":"Unlocked"}},{"type":"Image","props":{"y":0,"x":1,"visible":false,"var":"Unlock","skin":"index/unlock_bg.png","name":"Unlock"}}]}]}]},{"type":"Image","props":{"y":176,"x":648,"var":"close_Btn","skin":"index/close.png","name":"close_Btn","anchorY":0.5,"anchorX":0.5}}]};
        constructor(){ super()}
        createChildren():void {
        
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

        public static  uiView:any ={"type":"Dialog","props":{"width":750,"height":1280},"child":[{"type":"Image","props":{"y":-110,"x":-171,"width":1107,"skin":"index/mask.png","height":1570,"alpha":0.7}},{"type":"Image","props":{"y":622,"x":361,"var":"content","name":"content","anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":37,"x":-145,"width":413,"var":"Light","skin":"index/yuanb_bg.png","rotation":0,"name":"Light","height":406,"anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":-440,"x":108,"width":201,"var":"Textarea","skin":"index/textbg.png","name":"Textarea","height":702}},{"type":"Image","props":{"y":-346,"x":-167,"width":281,"visible":false,"var":"huangho","skin":"index/huangho.png","name":"huangho","height":457,"anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":-353,"x":-163,"width":275,"visible":false,"var":"taiho","skin":"index/taiho.png","name":"taiho","height":446,"anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":-322,"x":-144,"width":249,"visible":false,"var":"taijian","skin":"index/taijian.png","name":"taijian","height":404,"anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":-338,"x":-150,"width":199,"visible":false,"var":"hangshang","skin":"index/huandi.png","name":"hangshang","height":459,"anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":-57,"x":-264,"width":220,"visible":false,"var":"jingyuanbao","skin":"index/yuanb.png","name":"jingyuanbao","height":179}},{"type":"Image","props":{"y":-26,"x":-221,"width":143,"visible":false,"var":"Lottery","skin":"index/jiangquan.png","name":"Lottery","height":113}},{"type":"Image","props":{"y":-43,"x":-225,"width":145,"visible":false,"var":"coin","skin":"index/copper2.png","name":"coin","height":145}},{"type":"Text","props":{"y":301,"x":-360,"width":750,"var":"reward","valign":"middle","text":"获得12340个元宝","strokeColor":"#101010","stroke":8,"pivotY":0.5,"pivotX":0.5,"name":"reward","height":70,"fontSize":50,"font":"Arial","color":"#fff505","bold":true,"align":"center"}}]},{"type":"Image","props":{"y":1077,"x":376,"var":"close_Btn","skin":"index/btnsure.png","name":"close_Btn","anchorY":0.5,"anchorX":0.5}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.createView(ui.rewardUI.uiView);

        }

    }
}
