// ==UserScript==
// @name         mypo.user.js
// @namespace    miiya
// @downloadURL  https://gist.github.com/esabox/8213a51ef2f1a6be4313ece316421762/raw/mypo.user.js
// @updateURL      https://gist.github.com/esabox/8213a51ef2f1a6be4313ece316421762/raw/mypo.user.js
// @homepageURL  https://gist.github.com/esabox/8213a51ef2f1a6be4313ece316421762/edit
// @homepageURL  https://gist.github.com/esabox/8213a51ef2f1a6be4313ece316421762/raw/mypo.user.js
// @homepageURL  https://gist.jsbin.com/esabox/8213a51ef2f1a6be4313ece316421762/
// @version 2017/05/14.2
// @description  1山彦が鯉をやる気にさせなかったり夢の地下室の本当の予想。
// @author       山田一意太郎左衛門
// @include *
// @match        https://www.rakuten-card.co.jp/*
// @match        http://192.168.0.1/
// @match        https://workflowy.com/*
// @match        http://www.rakuten.co.jp/*
// @match        http://app.circleksunkus.jp/slot_top.php*
// @match        chrome-extension://*
// @match        https://workflowy.com/*
// @require       https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.6/moment.js
// @grant        GM_registerMenuCommand
// @noframes
// ==/UserScript==

//外したオプション
// @grant        none

// console.log(window.hoge==hoge);

const ver="2017/05/14.1";

GM_registerMenuCommand(ver,openAll,'R'); //Rはショートカットキー、タンパークリックしてからしか効かないけど
function openAll(){
	alert(ver);
}

(function() {
	"use strict";

	//ネームスペース
	window.nsMiiya={};

	//操作画面を作る
	nsMiiya.hoge=function(){
		//console.log(hoge);
		const base = document.body.appendChild(Object.assign(document.createElement('div'), {
			id: 'copy-buttons',
			style: `
				transition: all 300ms 0s ease;
				width:500px;
				background-color: rgba(255,244,255,0.8);
				border: 1px solid silver;
				padding: 1em; 
				position: fixed;
				bottom: 0;
				left: 0;
				z-index: 2147483646;
			`,
			onmousedown:(event)=>{
				nsMiiya.log("[d]",0);
				//event.preventDefault();
				return(false);//フォーカスを得ないため
			},
		}));

		nsMiiya.base1=base;

		var btn_enc = document.createElement('button');
		btn_enc.textContent = '上下';
		//btn_enc.style.cssText="all:initial";
		//btn_enc.style={cssText:'all: initial; color: blue; border-style: ridge;'};
		//btn_enc.style.cssText='color: blue; border-style: ridge;';
		btn_enc.onclick = function () {
			this.f=this.f ? 0:1;

			if (!this.f) {
				//this.textContent = '下';
				this.parentNode.style.bottom=0;
				this.parentNode.style.top='';
			} else {
				//this.textContent = '上';
				this.parentNode.style.bottom='';
				this.parentNode.style.top='0';
			}

		};
		base.appendChild(btn_enc);

		base.appendChild(Object.assign(document.createElement('button'), {
			textContent:'←→',
			//style:{cssText:'all: initial;'},
			onclick:function(){
				this.f=this.f ? 0:1;
				if (!this.f) {
					this.textContent = '←→';
					this.parentNode.style.left=0;
					this.parentNode.style.right='';
				} else {
					this.textContent = '←→';
					this.parentNode.style.left='';
					this.parentNode.style.right='0';
				}
			},
		}));
		var b2=base.appendChild(Object.assign(document.createElement('div'), {
		}));
		b2.appendChild(Object.assign(document.createElement('button'), {
			textContent:'b2消す',
			onclick:function(){
				this.parentNode.style.display='none';
				nsMiiya.log("b2kesu");
			},
		}));
		b2.appendChild(Object.assign(document.createElement('button'), {
			textContent:'b2消す2',
			//style:{cssText:'all: initial;'},
			onclick:function(){
				this.parentNode.style.display='none';
				nsMiiya.log("b2kesu");
			},
		}));
		base.appendChild(Object.assign(document.createElement('button'), {
			textContent:'senfunc',
			//style:{cssText:'all: initial;'},
			onclick:senfunc,
		}));

		base.appendChild(Object.assign(document.createElement('button'), {
			textContent:'e-navi',
			//style:{cssText:'all: initial;'},
			onclick:window.nsMiiya.test,
		}));
		base.appendChild(Object.assign(document.createElement('button'), {
			textContent:'いーなびボタン',
			//style:{cssText:'all: initial;'},
			onclick:nsMiiya.fnc2,
		}));
		base.appendChild(Object.assign(document.createElement('button'), {
			textContent:'最小化2',
			//style:{cssText:'all: initial;'},
			onclick:function(){
				this.parentNode.style.with='300px';
				this.parentNode.style.display='none';
				nsMiiya.log("saisho");
			},
		}));
		base.appendChild(Object.assign(document.createElement('button'), {
			textContent:'workflowy+e',
			//style:'all: initial;',
			onclick:e=>{document.activeElement.textContent+=moment().format('YYYY/MM/DD')+" #タスク ";},
			// 			onmousedown:function(event){
			// 				nsMiiya.log("work+e"+this);
			// 				event.stopPropagation();
			// 				return(false);

			// 			},
		}));

		base.appendChild(Object.assign(document.createElement('button'), {
			textContent:'ルーターログイン',
			type:'button',
			onclick:function(event){
				document.getElementById("userName").value="admin";
				document.getElementById("pcPassword").value="ttoomm99";
				document.getElementById("loginBtn").click();
			},
		}));		
		base.appendChild(Object.assign(document.createElement('button'), {
			textContent:'更新',
			type:'button',
			onclick:function(event){
				location.reload();
			},
		}));
		base.appendChild(Object.assign(document.createElement('button'), {
			textContent:'小さくなる',
			//style:'all: initial;',
			style:'height:40px',
			// onclick:e=>{console.log(this);this.style.height="11px";},
			onclick:function(){console.log(this);this.style.height=parseInt(this.style.height)-1+"px";},
			//e=>{},
		}));
		base.appendChild(Object.assign(document.createElement('button'), {
			textContent:'miiyaLog',
			//style:'all: initial;',
			//style:'height:50px',
			//onclick:(function(){nsMiiya.log("aa");}),
			onclick:e=>nsMiiya.log(e),
		}));
		//logを表示する場所
		nsMiiya.logDisp=base.appendChild(Object.assign(document.createElement('div'), {
			id: 'miiyalog',
			textContent:'',
			style:'height:200px;overflow-y:  scroll;     height: 100px;  /*background-color: #CCF; */ border-style: ridge;',
		}));
		nsMiiya.log=function(s,kai=1,num=1) {
			//console.log("miiya log->"+s);
			//nsMiiya.logDisp.textContent+="\n"+s;
			//s=""+nsMiiya.log.count+s;
			nsMiiya.log.count=nsMiiya.log.count?nsMiiya.log.count+1:1;

			s="["+nsMiiya.log.count+"] "+s;
			if(kai){
				s+="<br />";
			}
			nsMiiya.logDisp.innerHTML+=s;
			nsMiiya.logDisp.scrollTop = nsMiiya.logDisp.scrollHeight;
			nsMiiya.logDisp.scrollLeft = nsMiiya.logDisp.scrollWidth;
		};

	};//画面作る関数終わり



	nsMiiya.ruutaa=function(event){
		document.getElementById("userName").value="admin";
		document.getElementById("pcPassword").value="ttoomm99";
		document.getElementById("loginBtn").click();
	};

	//自動実行
	nsMiiya.startup=function(event){

		//workflowy.com
		if(new RegExp("^https://workflowy.com/").test(location.href)){
			console.log("workflowy.com");

			nsMiiya.hoge();//画面作っちゃう

			/*  */
			var dataSounyuF=function(s=""){

				document.activeElement.textContent+=moment().format('YYYY/MM/DD')+" "+s;

				/* フォーカス位置調整 */
				var el = document.activeElement;
				var range = document.createRange();

				range.setStart(el, 1); //オプション2はオブジェのオフセット、0で先頭、el.chilednodesで文字単位
				//range.selectNodeContents(el);
				range.collapse(true);//選択を解除、これはエンドしてしてないから、無くても動く

				var sel = window.getSelection();
				sel.removeAllRanges();
				sel.addRange(range);
				el.focus();
			};
			var focusSaigoFunc=function(){

			};

			//ショートカットキー追加
			document.addEventListener("keyup",e=> {
				//nsMiiya.log(e.ctrlKey+" " ,0);
				//nsMiiya.log(e.key+"");
				//KeyboardEvent.ctrlKey 読取専用
				if(e.ctrlKey && e.getModifierState("Shift")){
					switch(e.key){
						case "D":
							e.preventDefault(); //避ける初期値を
							dataSounyuF();
							//document.activeElement.textContent+=moment().format('YYYY/MM/DD')+" #タスク ";
					}
				}
			});

			//ボタンを作る
			const bs=document.getElementById("copy-buttons");
			bs.appendChild(Object.assign(document.createElement('button'), {
				textContent:'タスク',
				//style:'all: initial;',
				onclick:e=>{
					dataSounyuF("#タスク ");
					//document.activeElement.textContent+=" #タスク ";
				},


			}));
			bs.appendChild(Object.assign(document.createElement('button'), {
				textContent:'日付',
				//style:'all: initial;',
				onclick:e=>{
					dataSounyuF();
					/**/
				},
			}));
		}

		//楽天系の毎日くじ
		var rakuKujiUrls =[
			'https://www.infoseek.co.jp/',
			'https://kuji.rakuten.co.jp/',
			'http://www.rakuten.co.jp',
			'https://www.infoseek.co.jp/Luckylot*',
			'https://pointmail.rakuten.co.jp/subcard/complete',
			'https://www.circleksunkus.jp/mypage/*',
		];
		if(new RegExp(rakuKujiUrls.join("|"),"i").test(location.href)){
			const title="楽天くじ";
			console.log(title);
			nsMiiya.hoge();//画面作っちゃう

			const bs=document.getElementById("copy-buttons");
			bs.appendChild(Object.assign(document.createElement('button'), {
				textContent:'楽天くじ',
				onclick:function(event){
					nsMiiya.log("くじ"+event);
					var xx = document.querySelectorAll('a[href^="https://rd.rakuten.co.jp/s/?R2=https%3A%2F%2Fkuji.rakuten.co.jp"]');
					nsMiiya.log(xx.length);
					xx[0].click();

					console.log(title + " end");
				},
			}));
			for(let i = 0; i < rakuKujiUrls.length; i++) { 
				const s=rakuKujiUrls[i].replace(/[*?]/g,""); //g繰り返し
				bs.appendChild(Object.assign(document.createElement('a'), {
					textContent:s,
					href:s,
				}));
				bs.appendChild(Object.assign(document.createElement('br'), {}));
			}
		}

		/* サークルK */
		if(new RegExp("^https?://app.circleksunkus.jp/slot_top.php").test(location.href)){
			const title="サークルKのスロット";
			console.log(title);
			const bs=document.getElementById("copy-buttons");
			document.querySelector('a[href*="slot"').click();
			console.log(title+ " end");
		}/*サークルK終わり*/

		if(new RegExp("^https://member.pointmail.rakuten.co.jp/box/*").test(location.href)){
			const title="メールdeポイント";
			console.log(title);
			nsMiiya.hoge();//画面作っちゃう
			//document.querySelector('.point_url').click()
			var suteFunc=function(){document.querySelector('.point_url').click();};
			GM_registerMenuCommand(title,function(){document.querySelector('.point_url').click();},'C');
			GM_registerMenuCommand(title+"2",suteFunc,'C');

			console.log(title+ " end");
		}
		/*楽天e-navi*/
		if(new RegExp("https://www.rakuten-card.co.jp/*").test(location.href)){
			const title="メールdeポイント";
			console.log(title);
			nsMiiya.hoge();//画面作っちゃう

			console.log(title+ " end");
		}

		//hogehoge
		if(new RegExp("^https?://192.168.\\d+.\\d+").test(location.href)){
			console.log("ローカルホスト");
			nsMiiya.hoge();//画面作っちゃう

		}

		/* 		インフォのラッキーくじ
		document.querySelector(".isluckykuji_start").click()
		document.querySelector(".isluckykuji_select:nth-of-type(1)").click() 
		*/

		//hogehoge
		if(new RegExp("^https://hogehoge/").test(location.href)){}

	};

	nsMiiya.sleep=function(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	};//スリープ呼び出し用

	function senfunc(){
		console.log("senfunc");
		nsMiiya.log("senfucn");
	}
	nsMiiya.test=function(){
		console.log("test");
		nsMiiya.log("test");
	};
	//楽天いーなびで自動クリック
	nsMiiya.fnc2=async function(){
		console.log("fnc2-e-navi");
		//await nsMiiya.sleep(1000);
		console.log('111');
		await nsMiiya.sleep(1000);
		console.log('222');
		await nsMiiya.sleep(1000);
		console.log('3333 later');

		var xx = document.querySelectorAll("div.bnrBoxInner>a:nth-of-type(1), p.middleImage>a:nth-of-type(1)");
		//  var xx = document.querySelectorAll("p.middleImage>a:nth-of-type(1)");
		for (var i = 0; i < xx.length; i++) {

			//xx[i].style.color="red";
			if (i<3) {continue;}
			//  if (i>3) {break;}


			//if (i == 0) {i = 2;}
			xx[i].style.boxShadow = "0 0 0 10px rgba(0,0,255,0.2)";
			xx[i].innerHTML += " " + i + "hoge-";
			await nsMiiya.sleep(1100);
			xx[i].click();
			console.log(i);
			nsMiiya.log(i);
			//alert(i);//

		}
		console.log(i + " end");
	}

	console.log("mypo底辺");
	//nsMiiya.hoge();//画面作っちゃう

	nsMiiya.startup();

})();