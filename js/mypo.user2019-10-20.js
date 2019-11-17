/* eslint-disable no-multiple-empty-lines */
// ==UserScript==
// @name         mypo.user.js
// @namespace    miiya
// @downloadURL  https://gist.github.com/esabox/8213a51ef2f1a6be4313ece316421762/raw/mypo.user.js
// @updateURL    https://gist.github.com/esabox/8213a51ef2f1a6be4313ece316421762/raw/mypo.user.js
// @homepageURL  https://gist.github.com/esabox/8213a51ef2f1a6be4313ece316421762/edit
// @homepageURL  https://gist.github.com/esabox/8213a51ef2f1a6be4313ece316421762/raw/mypo.user.js
// @homepageURL  https://gist.jsbin.com/esabox/8213a51ef2f1a6be4313ece316421762/
// @version 2019-10-20-173940
// @description  3aa山彦が鯉をやる気にさせなかったり夢の地下室の本当の予想。
// @author       山田一意太郎左衛門
// @include *
// @match	https://workflowy.com/*
// @grant	GM_registerMenuCommand
// @grant 	GM_getValue
// @grant 	GM_setValue
// @grant 	GM_deleteValue
// @grant 	GM_listValues
// @noframes
// ==/UserScript==
// 外したオプション
// @run-at document-start
// オプションはローダー側に書く必要あり
// @require       https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.6/moment.js
// @exclude     https://*.visualstudio.com/*
// @grant        none
//
// lint ///////
/* jshint -W104: true */ // ,es6:true */
/* eslint.parserOptions ecmaVersion: 2017 */
/* eslint max-len: ["error", 233]*/
// console.log(window.hoge==hoge);
/* global
alert, confirm, console, Debug, opera, prompt,GM_registerMenuCommand
*/
//alert('あa');
// Rはショートカットキー、タンパークリックしてからしか効かないけど 
//グローバル所得、ここじゃないと取れないぽい、グローバルが良くわかってない。windowの大文字とか
const global = (function() {return this})(); // その1
const log = console.log;
//console.log(this, global);
//メイン処理
(async function() {
	console.time('mypo');
	'use strict';
	/**
	 * 自身ファイルをローカル鯖から読み込む、作ったらT
	 */
	/**/
	async function loadself() {
		let domID = 'loadSelfScript';
		//console.log('スタート loadSelf');
		const el = document.querySelector('#' + domID);
		if (el === null) {
			let url = 'http://localhost:8888/mypo.user.js?' + Date.now();
			//let url = 'http://localhost:8888/mm.js?'+Date.now();
			console.log('読み込む→' + url);
			let aasd = document.createElement('script');
			const aaa = await new Promise((resolve, reject) => {
				aasd.onload = () => resolve(true);
				aasd.onerror = () => resolve(false);
				aasd.src = url;
				aasd.id = domID
				document.body.appendChild(aasd)
			})
			console.log('読み込み結果', aaa);
			if (aaa) {
				console.log('localhostの読み込み成功、ブラウザ内蔵のスクリプトは終了')
				return aaa
			} else {
				console.log('ローカル読み込み失敗、インストールスクリプトを続ける')
			}
		} else {
			console.log('既にscriptあるので作らない');
		}
	}
	/*/
	function loadself() {
		let domID = 'loadSelfScript';
		//console.log('スタート loadSelf');
		const el = document.querySelector('#' + domID);
		if (el === null) {
			let url = 'http://localhost:8888/mypo.user.js';
			console.log('読み込む→'+url);
			document.body.appendChild(
				Object.assign(document.createElement('script'), {id: domID, src: url})
				//ファイルが存在しない場合はまだ未実装
			);
			return true;
		} else {
			console.log('既にscriptあるので作らない');
		}
	}
	/**/
	let nsMiiya = {gamen() {} }; //オブジェクのプロパティは宣言しとかないとリファクタリングできない
	// ネームスペース
	// window.nsMiiya = {};
	/** ボタンを作る*/
	function mkEle(pElem, tag, obj, loca = 'beforeend') {
		let elem = document.createElement(tag);
		pElem.insertAdjacentElement(loca, elem); //appendChile
		elem = Object.assign(elem, obj);
		return elem;
	}
	//prototype汚染
	Node.prototype.proMk2 = function(tag, obj) {
		let elem = document.createElement(tag);
		this.appendChild(elem);
		elem = Object.assign(elem, obj);
		return elem;
	}
	/**あればClick
	 * @param s{string}
	 */
	function arebaCli(s, anzen_sec = 2, href = false) {
		const el = document.querySelector(s);
		let aaa = GM_getValue('zenkai', Date.now() - 9999)
		let jisa = (Date.now() - aaa) / 1000
		//console.log(jisa)
		//alert(jisa)
		my_alert(`arebaCli ${s}`)
		if (el !== null) {
			if (jisa < anzen_sec) {
				my_alert(`ループしてる可能性、抜ける. jisa=${jisa}`)
				return false
			}
			GM_setValue('zenkai', Date.now());
			if (!href)
				el.click();
			else
				location.href = el.href
			return
			true
		} else {
			my_alert('クリックする箇所無し @arebaCli');
			return false
		}
	}
	//メッセージを表示するやつ、アラートの代わり
	function my_alert(...s) {
		//画面追従fix div を並べようと思ったけど無理そう、外枠をつくるしかなさそ
		//let el = document.getElementById('waku');
		//
		console.log(...s)
		//設定を読み取る
		let my_alert_f = GM_getValue('my_alert_f', false)
		//メニュー登録、一度だけ、そのためにプロパティ利用
		if (typeof my_alert.reg === 'undefined') {
			my_alert.reg = 1;
			GM_registerMenuCommand('my_alert_f=' + my_alert_f, function() {
				//alert('Put script\'s main function here');
				GM_setValue('my_alert_f', !my_alert_f);
			}, 'r');
			console.log('メニュー作った')
		}
		//表示の可否
		if (!my_alert_f) {
			return
		}
		const cssEl = document.getElementById('malert') || returnMyCss('malert',
			`
			.hoge{
				transition: all 300ms ease 0s;
				background-color: rgba(255, 255, 255, 0.5);
				color:black;
				border: 1px solid silver;
				padding: 1px;
				top: 0px;

			}
			#waku{
				transition: all 300ms ease 0s;
				background-color: rgba(0, 0, 0, 0.1);
				border: 2px solid silver;
				padding: 5px;
				position: fixed;
				right: 0px;
				//top: 0px;
				bottom: 0px;
				z-index: 2147483646;
				font-size:12px;
				overflow-x:scroll;
				width:300px;
				white-space: nowrap;
			}
			#wakuxxxx {
				-moz-animation: cssAnimation 0s ease-in 5s forwards;
				/* Firefox */
				-webkit-animation: cssAnimation 0s ease-in 5s forwards;
				/* Safari and Chrome */
				-o-animation: cssAnimation 0s ease-in 5s forwards;
				/* Opera */
				animation: cssAnimation 0s ease-in 5s forwards;
				-webkit-animation-fill-mode: forwards;
				animation-fill-mode: forwards;
			}
			@keyframes cssAnimation {
				to {
					width:0;
					height:0;
					overflow:hidden;
				}
			}
			@-webkit-keyframes cssAnimation {
				to {
					width:0;
					height:0;
					visibility:hidden;
				}
			}
		`)
		const bbb = document.getElementById('waku') || document.body.appendChild(Object.assign(document.createElement('div'), {
			id: 'waku',
			style: `
			opacity : 0`,
			//style:{opacity:0},
			onmousewheel: function(e) {
				e.stopPropagation();
			},
			onclick: function(e) {
				this.parentNode.removeChild(this);
			},
			onmouseenter: (e) => {
				//console.log(e.target, e.relatedTarget, this, "mouse over");
				//baseC.style = "display:block;"; //初期化される
				bbb.style.opacity = 0.9;
			},
			onmouseleave: (event) => {
				bbb.style.opacity = 0;
			},
		}));
		const base = bbb.appendChild(Object.assign(document.createElement('div'), {
			className: 'hoge',
			style: `
				
			`,
			onmousewheel: function(e) {
				e.stopPropagation();
			},
			onclick: function(e) {
				// e.stopPropagation();
				// //e.preventDefault();
				// //console.log(e);
				// //return false;
				// this.parentNode.removeChild(this);
			},
		}));
		base.innerHTML = String.prototype.concat(...s)
	}
	/**日付関数 YYYY-MM-DD hh:mm:ss	 */
	function mydate(format, zerofill = 1) {
		let date = new Date();
		let hi = {}
		//初期設定
		format = format || 'YYYY-MM-DD hh:mm:ss';
		hi.YYYY = date.getFullYear();
		hi.MM = date.getMonth() + 1;
		hi.DD = date.getDate();
		hi.hh = date.getHours();
		hi.mm = date.getMinutes();
		hi.ss = date.getSeconds();
		for (let key in hi) {
			if (key !== 'YYYY' && zerofill) {
				hi[key] = ('0' + hi[key]).slice(-2); //ゼロうめ
			}
			format = format.replace(key, hi[key]); //フォーマット文字を置換
		}
		return format;
	}
	/**sleep
	 * @param sec{number}
	 */
	async function sleep(msec) {
		await new Promise((r) => setTimeout(r, msec)); // sleep
	}
	/**
	 * cssを作って返す
	 */
	function returnMyCss(cssId = 'miiyacss', cssText) {
		const d = false;
		d && console.log('cssつくっちゃう');
		let el = document.getElementById(cssId)
		//無ければ作る
		if (!el) {
			el = document.createElement('style');
			el.id = cssId;
			document.head.appendChild(el);
		}
		//styElem.sheet.insertRule(', 0); //オプション2は挿入インデックスaddされるから0で良いぽい
		//insertrだと1つづつしか出来ないぽい、初期化ならtextContentが良い、見えるし
		if (cssText)
			el.insertAdjacentText('beforeEnd', cssText);
		return el;
	}
	// 操作画面を作る
	nsMiiya.gamen = function() {
		let elementId = 'miiyabase';
		// 既にあればリターン
		let el = document.getElementById(elementId);
		if (el) {
			return el;
		};
		//css 変数名がdomと違うから注意
		let styElem = returnMyCss();
		styElem.insertAdjacentText('afterbegin', `
			#${elementId} {text-align:left;}
			#${elementId} button {
				margin: 2px;
				padding: .4em;
				border: none;
				//border: 2px solid black;
				display: inline-block;
				background-color: #5A7AB3;
				box-shadow: 0 2px #4063A4;
				//font-size: 80%;
				line-height: 1;
				color: #fff;
				position: relative;
				cursor: pointer;
				border-radius: .2em;
				box-shadow: 0 1px 1px rgba(0,0,0,.5);
				top: 0;
				transition: .2s all;
			}
			#${elementId} button:hover {
				top: -2px;
				box-shadow: 0 2px 10px rgba(0,0,0,.5);
			}
			#${elementId} ,#${elementId}  * {
				font-size:10px; /* emだと安定しない */
				border: 3px solid silver;
			}
		`);
		const base = mkEle(document.body, 'div', {
			id: elementId,
			style: `
				transition: all 300ms 0s ease;
				background-color: rgba(255,244,255,0.8);
				border: 1px solid silver;
				padding: 1em; 
				position: fixed;
				bottom: 0;
				left: 0;
				z-index: 2147483646;
			`,
			onmouseenter: (e) => {
				//console.log(e.target, e.relatedTarget, this, "mouse over");
				//baseC.style = "display:block;"; //初期化される
				baseC.style.display = 'block';
			},
			onmouseleave: (event) => {
				baseC.style.display = 'none';
			},
		});
		const baseC = mkEle(base, 'div', {
			style: 'width:300px;display:none',
			//style:'width:300px',
		});
		mkEle(baseC, 'button', {
			textContent: 'はっげ',
			onclick: () => console.log('えむ'),
		});
		baseC.proMk2('button', {
			textContent: 'はっげ',
			onclick: () => console.log('えむ'),
		});
		mkEle(baseC, 'span', {
			textContent: 'v' + ver,
			tyle: {fontSize: '8px'},
		});
		mkEle(baseC, 'button', {
			textContent: '上下',
			// style:{cssText:'all: initial;'},
			onclick: function() {
				this.f = this.f ? 0 : 1;
				if (!this.f) {
					// this.textContent = '下';
					this.parentNode.style.bottom = 0;
					this.parentNode.style.top = '';
				} else {
					// this.textContent = '上';
					this.parentNode.style.bottom = '';
					this.parentNode.style.top = '0';
				}
			},
		});
		mkEle(baseC, 'button', {
			textContent: '←→',
			// style:{cssText:'all: initial;'},
			onclick: function() {
				this.f = this.f ? 0 : 1;
				if (!this.f) {
					this.textContent = '←→';
					this.parentNode.style.left = 0;
					this.parentNode.style.right = '';
				} else {
					this.textContent = '←→';
					this.parentNode.style.left = '';
					this.parentNode.style.right = '0';
				}
			},
		});
		mkEle(baseC, 'button', {
			textContent: 'いーなびボタン',
			// style:{cssText:'all: initial;'},
			onclick: nsMiiya.fnc2,
		});
		mkEle(baseC, 'button', {
			textContent: '最小化2',
			// style:{cssText:'all: initial;'},
			onclick: function() {
				this.parentNode.style.with = '300px';
				this.parentNode.style.display = 'none';
				nsMiiya.aloging('saisho');
			},
		});
		mkEle(base, 'button', {
			textContent: '更新',
			type: 'button',
			onclick: function(event) {
				location.reload();
			},
		});
		mkEle(baseC, 'button', {
			textContent: '楽天毎日くじ',
			type: 'button',
			onclick: (event) => {
				//alert(GM_getValue("raku"));
				maiKuji(1);
				// GM_setValue("毎日くじ次へ", 1);
				// location.href = "http://www.rakuten.co.jp/";
				// //http://www.rakuten.co.jp/?l-id=header_global_logo
				// //http://www.rakuten.co.jp/?l2-id=shop_header_logo
			},
		});
		mkEle(baseC, 'button', {
			textContent: 'GM_変数追加',
			type: 'button',
			onclick: (event) => {
				let rand = Math.floor(Math.random() * 10);
				GM_setValue('日本語' + rand, '阿吽' + rand);
			},
		});
		mkEle(baseC, 'button', {
			textContent: 'GM_変数表示',
			type: 'button',
			onclick: (event) => {
				let vals = [];
				let ob = {};
				for (let key of GM_listValues()) { //for of は実体を返す
					//console.log(key)
					vals.push(GM_getValue(key))
					ob[key] = GM_getValue(key);
				}
				//console.log(vals);
				console.log(ob)
				//console.table(ob)
				//console.log(GM_listValues());
			},
		});
		mkEle(baseC, 'button', {
			textContent: '小さくなる',
			// style:'all: initial;',
			// style: 'height:30px',
			// onclick:e=>{console.log(this);this.style.height="11px";},
			onclick: function() {
				console.log(this); this.style.height = parseInt(this.style.height) - 1 + 'px';
			},
			//e=>{},
		});
		mkEle(baseC, 'button', {
			textContent: 'UA・Referer',
			onclick: function() {
				/**
				 * userAgentをハックする
				 */
				const changeUserAgent = (ua) => {
					// Chrome, fx, IE11
					window.navigator.__defineGetter__('userAgent', () => ua);
					// Safari
					try {
						// fxでsetterがないとエラーになるので
						window.navigator = {
							get userAgent() {
								return ua;
							}
						};
					} catch (e) {}
				};
				//changeUserAgent('Mozilla/5.0 (Macintosh; ...');
				console.log(window.navigator.userAgent);
				console.log(document.referrer);
			},
			//e=>{},
		});
		// logを表示する場所
		const logDisp = mkEle(baseC, 'div', {
			id: 'miiyalog',
			textContent: '',
			style: 'height:200px;overflow-y:  scroll;     height: 100px;  /*background-color: #CCF; */ border-style: ridge;',
		});
		nsMiiya.aloging = function(s, kai = 1, num = 1) {
			// console.log("miiya log->"+s);
			// nsMiiya.alogingDisp.textContent+="\n"+s;
			// s=""+nsMiiya.aloging.count+s;
			nsMiiya.aloging.count = nsMiiya.aloging.count ? nsMiiya.aloging.count + 1 : 1;
			s = '[' + nsMiiya.aloging.count + '] ' + s;
			if (kai) {
				s += '<br />';
			}
			logDisp.innerHTML += s;
			logDisp.scrollTop = logDisp.scrollHeight;
			logDisp.scrollLeft = logDisp.scrollWidth;
		};
		okiniButton(baseC);
		return baseC;
	};// 画面作る関数終わり
	/**おきにボタン */
	function okiniButton(elem) {
		//お気に入りのボタンつくっちゃうも
		const okinis = [
			['https://www.infoseek.co.jp/', 'Infoseekトップ'],
			['http://www.rakuten.co.jp', '楽天トップ'],
			['https://www.infoseek.co.jp/Luckylot'],
			['https://isbingo.www.infoseek.co.jp/isbingo/getCard'],
			['https://pointmail.rakuten.co.jp/subcard/complete', ''],
			['http://192.168.0.1/userRpm/StatusRpm.htm?Connect=Connect&wan=1', 'IPリセット'],
			['https://192.168.0.1/userRpm/StatusRpm.htm?Connect=Connect&wan=1', 'IPリセットs'],
			//['',''],
		]
		for (let key in okinis) if (okinis.hasOwnProperty(key)) {
			let el = okinis[key];
			if (el[1] === undefined || el[1] === '') {
				// let a = (new URL(location.href)).hostname.split('.')[0]
				// a.hostname.split('.')[0]
				el[1] = (new URL(el[0])).hostname.split('.')[0]
			}
			mkEle(elem, 'a', {href: okinis[key][0], target: '_blank', textContent: okinis[key][1] || 'hoge'})
		}
	}
	/**GM valueを全部
	 * ネームスペース単位じゃなくインストールスクリプトで分けられてるぽい
	 */
	function gmValuesAll() {
		let vals = [];
		let ob = {};
		for (let key of GM_listValues()) { //for of は実体を返す
			//console.log(key)
			vals.push(GM_getValue(key))
			ob[key] = GM_getValue(key);
		}
		console.log(ob)
	}
	/**
	 * 毎日くじ
	 */
	function maiKuji(start) {
		let mai = '毎日くじ次へ'
		console.log('maiKuji実行');
		console.log(mai, GM_getValue(mai));
		//gmValuesAll();
		if (start) {
			console.log('変数セット', start);
			GM_setValue(mai, start); //スタート書き換え
			//console.log(mai, GM_getValue(mai));
		}
		let ima = GM_getValue(mai);
		if (!ima) {
			console.log('枚にくじima無し、抜ける', ima);
			return false;
		}
		switch (ima) {
			case 1:
				console.log('case', ima);
				GM_setValue(mai, ima + 1);
				location.href = 'http://www.rakuten.co.jp/';
				break;
			case 2:
				console.log('case', ima);
				if (location.href === 'http://www.rakuten.co.jp/') {
					GM_setValue(mai, ima + 1);
					list.楽天系の毎日くじ.rakuTop2kuji();
				}
				break;
			case 3:
				console.log('case', ima);
				if (location.href.match('https://kuji.rakuten.co.jp/.+/.+')) {
					GM_setValue(mai, ima + 1);
					location.href = 'https://www.infoseek.co.jp/Luckylot';
				}
				break;
			default: break;
			//location.href = 'https://www.infoseek.co.jp/Luckylot';
			//http://www.rakuten.co.jp/?l2-id=shop_header_logo
		}
		console.log('まいくじ終わり', mai, GM_getValue(mai));
	}
	/**毎日くじ作り直し 
	 * @param 
	*/
	function maiJump(flagEdit) {
		const name = '毎日ジャンプ';
		const debug = true;
		debug && console.log(name + 'start');
		//フラグを書き込む
		if (flagEdit === 1) {
			debug && console.log(name + 'フラグを作る');
			GM_setValue(name, 1);
		} else if (flagEdit === 0) {
			debug && console.log(name + 'フラグを削除');
			GM_deleteValue(name);
		}
		//フラグが無ければ抜ける
		if (!GM_getValue(name)) {
			return false;
		}
		const arr = [
			'https://kuji.rakuten.co.jp/.+/.+',
			'https://www.infoseek.co.jp/Luckylot'
		]
		debug && console.log(name + 'end');
		//今いるURLから次にジャンプする、
		//ジャンプ実行フラグがついてなければ抜ける
	}
	//各ウェブに対するアクションを定義したオブジェクト
	const list = {
		全部b: {
			host: '^http',
			func: function() {
				//const base = nsMiiya.gamen();// 画面作っちゃう
				//maiKuji();ss
			},
		},
		KK_dropbooks: {
			host: ['^https?://dropbooks.tv/', '^http://dlbooks.to/', '^http://xbooks.to/'],
			func: function() {
				const d = !true;
				//css
				const cssEl = returnMyCss();
				//cssEl.sheet.insertRuインサートしようとしたけどスペルわからんくて辞めた
				cssEl.insertAdjacentText('beforeEnd', '\
					a,a * { color: #77e !important;font-weight: bold; } \
					a:visited,a:visited * {color: #c66 !important;} \
				')
				//リンクをダウンロードに書き換えV2
				//検索結果はhttpからのフルアドレスだった。
				//cssセレクタではbaseURLはアリでも無しでもヒットする→嘘、ヒットしない
				//domで書き換えた後はヒットする、
				let els = document.querySelectorAll('h3>a[href*="/detail/"]');
				d && console.log('cssセレクタで', els.length);
				for (let i = 0; i < els.length; i++) {
					//const newel=document.createElement('a');
					let el = els[i];
					const cnode = el.cloneNode(true);
					//.appendChild(cnode);
					cnode.textContent = '■'
					el.parentElement.insertBefore(cnode, el);
					el.href = el.href.replace('/detail/', '/detail/download_zip/');
					el.textContent = '◆' + el.textContent;
					//d && console.log(el.href);
				}
				//プレビュー作っちゃう
				//作ろうと思ったけどサムネのURLがxhrしないとわかんないから保留
				//let globalInFn = (function() {return this})(); // ここじゃグローバル取れないぽ
				global.aa = function() {
					console.log(7e7);
					mkEle(document.body, 'div', {
						style: `
                            background-color: rgba(0,0,0,0.4);
                            padding: 5px; 
                            position: fixed;
                            top: 0px;
                            margin: auto;
                            overflow:auto;
                            width: 100%;
                            height: 100%;
                            z-index: 2147483646;
                        `,
						onclick: function(e) {
							this.parentNode.removeChild(this);
						},
					})
				}
				els = document.querySelectorAll('a[onclick^="bookStand"]');
				for (let i = 0; i < els.length; i++) {
					let el = els[i];
					//el.onclick=()=>console.log(1111);//動作するがhtmlはそのまま,オートページャーで消える
					el.setAttribute('onclick', 'aa()'); //書き換わる
					//el.textContent = '◆ぷ' + el.textContent;
				}
				// タイトル分かり易く
				let s;
				do {
					s = (location.href.match(/(?:word:)([^/]+)/) || [])[1];
					if (s) {
						document.title = decodeURIComponent(s)
							+ ' _' + document.domain;
						break;
					}
					s = (location.href.match(/(?:sort:)(.+)/) || [])[1];
					if (s) {
						document.title = s.replace(/\/.+:/, ':')
							+ ' _' + document.domain;
						break;
					}
				} while (false);
			}
		},
		KKsmvto: {
			host: '^http://smv.to/*',
			func: function() {
				//Clickされたノードを判定する
				function hantei(ev) {
					//console.log(e);	
					console.log(ev.target.tagName, ev.target.className);
					//console.log(e.target);
					if (ev.target.tagName == 'IMG' && ev.target.className == 'thumb') {
						ev.preventDefault();
						ev.stopPropagation();
						makeThumbScreen(ev);
					}
				}
				document.body.addEventListener('click', hantei, true);
				/*判定せず、ターゲット全てにリスナーを登録するタイプ
				var eles = document.querySelectorAll("a>.thumb");
				var color = Math.random().toString(16).slice(2, 5);
				for (var i = 0; i < eles.length; i++) {
					// console.log(eles[i].id);
					console.log(window.location.href);
					eles[i].style.boxShadow = "0 0 0 4px #" + color;
					eles[i].onclick = makeThumbScreen;
					//console.log(eles[i].onclick);
				}
				*/
				function makeThumbScreen(ev) {
					//console.log('hoge' + ev);
					//console.log(e);
					const base = document.body.appendChild(Object.assign(document.createElement('div'), {
						style: `
                            transition: all 300ms 0s ease;
                            //width:500px;
                            background-color: rgba(0,0,0,0.4);
                            border: 1px solid silver;
                            padding: 5px; 
                            position: fixed;
                            left: 0px;
                            right: 0px;
                            top: 0px;
                            //bottom: 0px;
                            margin: auto;
                            overflow:auto;
                            width: 100%;
                            height: 100%;
                            z-index: 2147483646;
                        `,
						onmousewheel: function(e) {
							e.stopPropagation();
							//e.preventDefault();
							//console.log(e);
							//return false;
						},
						onclick: function(e) {
							// console.log(this);
							// console.log(e.target);
							this.parentNode.removeChild(this);
						},
					}));
					let num = parseInt(ev.target.getAttribute('count'));
					console.log(num, ev.target.src);
					let n;
					for (let i = 1; i <= 35 && i <= num; i++) {
						if (!ev.target.src) {break;}
						n = parseInt(num / 35 * i) || 1;
						if (n < i) n = i;
						base.appendChild(Object.assign(document.createElement('img'), {
							src: ev.target.src.match('^.+/') + 'animation_' + ('0000' + n).slice(-5) + '.jpg',
							style: '	vertical-align: bottom;',
							//http://img1.smv.to/plpiAK5qSk/animation_00005.jpg',
						}));
					}
				}
			},
		},
		確認くん: {
			host: '^http://www.ugtop.com/spill.shtml',
			func: function() {console.log('ugtop')},
		},
		サークルKスロット: {
			host: '^https?://app.circleksunkus.jp/slot_top.php',
			func: () => {document.querySelector('a[href*="slot"').click();},
		},
		workflowy: {
			host: '^https://workflowy.com/',
			func: function() {
				const base = nsMiiya.gamen();// 画面作っちゃう
				let dataSounyuF = function(s = '') {
					document.activeElement.textContent += mydate('YYYY/MM/DD') + ' ' + s;
					/* フォーカス位置調整 */
					let el = document.activeElement;
					let range = document.createRange();
					range.setStart(el, 1); // オプション2はオブジェのオフセット、0で先頭、el.chilednodesで文字単位
					// range.selectNodeContents(el);
					range.collapse(true);// 選択を解除、これはエンドしてしてないから、無くても動く
					let sel = window.getSelection();
					sel.removeAllRanges();
					sel.addRange(range);
					el.focus();
				};
				// ショートカットキー追加
				document.addEventListener('keydown', (e) => {
					// nsMiiya.aloging(e.ctrlKey+" " ,0);
					// nsMiiya.aloging(e.key+"");
					// KeyboardEvent.ctrlKey 読取専用
					//keydown 文字盤、keypress：シャープとか小文字大文字、shiftなどに反応しない
					//ctrlはMacだとcontrolで無害だが、winだとタブ閉じたり困る
					//optはmacだと変な文字入力しだす 	
					//e.getModifierState('Shift')
					//console.debug(e.shiftKey,e.altKey,e.keyCode,e.key,String.fromCharCode(e.keyCode))
					//console.log(e)
					if (e.altKey) { //変化キーおしてるか？
						switch (String.fromCharCode(e.keyCode)) {
							case 'A': //A
								e.preventDefault(); // 避ける初期動作を
								dataSounyuF();
								break;
							case 'T':
								e.preventDefault(); // 避ける初期
								dataSounyuF('#タスク ');
								break;
							case '3':
								e.preventDefault(); // 避ける初期
								dataSounyuF('#');
								break;
							// document.activeElement.textContent+=moment().format('YYYY/MM/DD')+" #タスク ";
						}
					}
				});
				// ボタンを作る
				mkEle(base, 'button', {
					textContent: 'タスク',
					onclick: (e) => {
						dataSounyuF('#タスク ');
					},
					onmousedown: () => {return false} //アクティブ無効化
				});
				mkEle(base, 'button', {
					textContent: '日付',
					// style:'all: initial;',
					onclick: (e) => {
						dataSounyuF();
						/**/
					},
					onmousedown: () => {return false}
				});
			},
		},
		ルーターログイン: {
			host: '^https?://192.168.\\d+.\\d+',
			func: function() {
				const base = nsMiiya.gamen();// 画面作っちゃう
				function fff(params) {
					document.getElementById('userName').value = 'admin';
					document.getElementById('pcPassword').value = 'ttoomm99';
					document.getElementById('loginBtn').click();
				}
				fff();
				mkEle(base, 'button', {
					textContent: 'ルーター',
					onclick: fff,
				});
			},
		},
		infoの報告: {
			host: '^https://pointmail.rakuten.co.jp/subcard/complete',
			func: function() {
				document.querySelector('#completionReportBtn').click();
			},
		},
		メールdeポイント: {
			host: '^https://member.pointmail.rakuten.co.jp/box/*',
			func: function() {
				const title = 'メールポイント';
				const base = nsMiiya.gamen();// 画面作っちゃう
				// document.querySelector('.point_url').click()
				let suteFunc = async function() {
					arebaCli('.point_url>a'); //spanClickしても数字減ったけど記録されず
					await sleep(1000);
					arebaCli('li.next>a');
					// let el;
					// el = document.querySelector('.point_url');
					// if (el !== null) click();
					// document.querySelector('li.next>a').click()
				};
				mkEle(base, 'button', {
					onclick: suteFunc,
					textContent: 'mail de p',
				})
				new GM_registerMenuCommand(title + '2', suteFunc, 'C');
				if (location.href.match('https://member.pointmail.rakuten.co.jp/box/ItemDetail/.+')) {
					arebaCli('.point_url>a'); //spanClickしても数字減ったけど記録されず
				}
			},
		},
		楽天enaviでクリックポイント: {
			host: '^https://www.rakuten-card.co.jp/*',
			func: function() {
				const base = nsMiiya.gamen();// 画面作っちゃう
				async function enaviClick() {
					let elemList = document.querySelectorAll('[id^="position"]');// cssセレクタでhasが使えないからloop検索
					console.log('クリック箇所=' + elemList.length);
					for (let i = 0; i < elemList.length; i++) {
						if (i < 0) {
							//前半スキップ
							//continue;
						}
						if (elemList[i].querySelector('img[src$="check.gif"]')) {
							let s = elemList[i].querySelector('a[href^=\'javascript\']');// .textConten;
							// console.log(s.textContent);
							s.style = 'box-shadow: 0 0 0px 3px rgba(222, 111, 222, 0.90);';
							console.log('クリック');
							s.click(); // クリック
							//早くしすぎると歯抜けになる
							await new Promise((r) => setTimeout(r, 891)); // sleep
						}
						//
						// console.log(eles[i].querySelectorAll(".clearfix .dateArrival>img").length);
					}
				};
				//PV時に実行
				enaviClick()
				// ボタンを作る
				mkEle(base, 'button', {
					textContent: 'クリックde',
					onclick: enaviClick,
				});
			},
		},
		Infoseekのラッキーくじサッカー: {
			host: '^https://www.infoseek.co.jp/Luckylot*',
			func: function() {
				if (location.href === 'https://www.infoseek.co.jp/Luckylot/result') {
					console.log('サッカーくじ終わり');
					location.href = 'https://www.infoseek.co.jp/';
				}
				//https://www.infoseek.co.jp/Luckylot/result
				// if (GM_getValue('毎日くじ次へ')) {
				// 	GM_setValue('毎日くじ次へ', null);
				// 	location.href = 'https://www.infoseek.co.jp/';
				// } else {
				// 	console.log('くじセット');
				// 	GM_setValue('毎日くじ次へ', 1);
				// }
				const base = nsMiiya.gamen();// 画面作っちゃう
				let fn = async function() {
					await new Promise((r) => setTimeout(r, 500)); // sleep
					document.querySelector('.isluckykuji_start').click();
					await new Promise((r) => setTimeout(r, 500)); // sleep
					document.querySelector('.isluckykuji_select:nth-of-type(1)').click();
					console.log('ow');
				};
				//new GM_registerMenuCommand(title, fn, 'C');
				fn();
			},
		},
		infoミニくじ: {
			host: '^https://www.infoseek.co.jp/(\\?.+)?$',
			func: function() {
				const el = document.querySelector('area.islot_lot');
				if (el !== null) {el.click();}
			},
		},
		enavi自動ログイン: {
			host: '^https://www.rakuten-card.co.jp/e-navi/index.xhtml',
			func: async function() {
				await new Promise((r) => setTimeout(r, 1500)); // sleep
				//chromeのオートコンプリートでパスワードはあるように見えるが空欄状態、画面Clickで値が入る
				if (document.querySelector('#u').value !== '' &&
					document.querySelector('#p').value !== ''
				) {
					console.log(1);
					//document.querySelector('#loginButton').click();
				}
			},
		},
		楽天系の毎日くじ: {
			host: [
				'^https://www.infoseek.co.jp/',
				'^https://kuji.rakuten.co.jp/',
				'^http://www.rakuten.co.jp',
				'^https://www.infoseek.co.jp/Luckylot*',
				'^https://isbingo.www.infoseek.co.jp/isbingo/getCard',
				'^https://pointmail.rakuten.co.jp/subcard/complete',
			],
			func: function() {
				const base = nsMiiya.gamen();// 画面作っちゃう	
				mkEle(base, 'button', {
					textContent: '楽天くじ',
					onclick: this.rakuTop2kuji,
				});
				// if (GM_getValue('raku')) {
				// 	GM_setValue('raku', 0);
				// 	rakutenTop2Kuji();
				// }
				// if (maiKuji()) {
				// 	arebaCli('a[href^="https://rd.rakuten.co.jp\
				// 	/s/?R2=https%3A%2F%2Fkuji.rakuten.co.jp"]');
				// }
				// if (GM_getValue('毎日くじ次へ')) {
				// 	GM_setValue('毎日くじ次へ', null);
				// 	rakutenTop2Kuji();
				// } else {
				// 	console.log('くじセット');
				// 	GM_setValue('毎日くじ次へ', 1);
				// }
				//var this.host;
				for (let i = 0; i < this.host.length; i++) {
					const s = this.host[i].replace(/[*?]/g, ''); // g繰り返し
					mkEle(base, 'a', {
						textContent: s,
						href: s,
					});
					mkEle(base, 'br', {});
				}
			},
			rakuTop2kuji: function() {
				arebaCli('a[href^="https://rd.rakuten.co.jp/s/?R2=https%3A%2F%2Fkuji.rakuten.co.jp"]');
			}
		},
		楽天系のくじの自動Click: {
			host: '^https?://kuji.rakuten.co.jp/',
			func: async function() {
				// if (GM_getValue('毎日くじ次へ')) {
				// 	GM_setValue('毎日くじ次へ', null);
				// 	location.href = 'https://www.infoseek.co.jp/Luckylot';
				// } else {
				// 	console.log('くじセット');
				// 	GM_setValue('毎日くじ次へ', 1);
				// }
				await new Promise((r) => setTimeout(r, 1000)); // sleep
				arebaCli('#entry');
			},
		},
		サークルKクーポン: {
			host: '^https://www.circleksunkus.jp/mypage/coupon/index.html',
			func: async function() {
				const d = !false;
				if (document.title.match('クーポン')) {
					d && alert(document.title);
				} else {
					await new Promise((r) => setTimeout(r, 1000)); // sleep
					location.reload();
				}
				function kuponKaiseki() {
					let o = {};
					let cCode, cjc;
					let el = document.querySelectorAll('.modal-open')
					let i = 1;
					for (let key of el) {
						cCode = key.getAttribute('data-scs') + '';
						cjc = key.getAttribute('data-cjc') + '';
						o[i] = {'cCode': cCode, 'cjc': cjc}
						i++;
					}
					return JSON.stringify(o);
				}
				const base = nsMiiya.gamen();// 画面作っちゃう	
				const tA = mkEle(base, 'textarea', {
					textContent: '{"1":{"cCode":"01098","cjc":"9830869000009"},"2":{"cCode":"01093","cjc":"9830867000001"}}',
					style: 'height: 7em;',
				});
				mkEle(base, 'br', {});
				//console.log('t1', this);
				mkEle(base, 'button', {
					textContent: 'josn書き出し',
					onclick: () => { //アロー関数定義でthis固定
						console.log(this, this.tA);
						tA.textContent = kuponKaiseki()
					},
				});
				mkEle(base, 'button', {
					textContent: 'josn読み込み',
					onclick: (event) => {
						const obj = JSON.parse(tA.textContent);
						console.log(obj);
						for (let key in obj) if (obj.hasOwnProperty(key)) {
							console.log(key + ':' + obj[key]);
							mkEle(base, 'button', {
								textContent: key,
								onclick: () => {
									console.log(obj[key]);
								}
							});
						}
					}
					,
				});
				mkEle(base, 'button', {
					textContent: 'Kクーポン',
					onclick: function(event) {
						mkEle(document.body, 'div', {
							id: 'loadtest',
							style: 'height:44px;background:#EEE',
						}, 'afterbegin');
						/*	nsMiiya.aloging('くじ' + event);
							let xx = document.querySelectorAll('a[href^="https://rd.rakuten.co.jp/s/?R2=https%3A%2F%2Fkuji.rakuten.co.jp"]');
							nsMiiya.aloging(xx.length);
							xx[0].click();*/
					},
				});
			},
		},
		google: {
			host: '^https?://www.google.(?:com|co.jp)/',
			func: function() {
				let d = !!0;
				d && console.log('google no redirect');
				//Array.prototypeは[]で置き換え可能
				Array.prototype.forEach.call(document.querySelectorAll('h3.r > a'), function(elem) {
					d && console.log(elem.textContent);
					elem.onmousedown = function() {};
				});
			},
		},
		//kk動画サイト///////////////////////////////
		kkonload: {
			host: '^https://openloadpro.com/',
			func: function() {
				let d = !true;
				d && console.log('zippys');
				//arebaCli('.openload-link > a:nth-child(1)');
				let url = document.querySelector('.openload-link > a').href
				location.href = url
			},
		},
		kkfanza: {
			host: '^https://www.dmm.co.jp/digital',
			func: function() {
				let d = !true;
				d && console.log('zippys');
				arebaCli('#detail-sample-movie div a', 0);
				//let url = document.querySelector('.openload-link > a').href
				//location.href = url
			},
		},
		//kkダウンロード系/////////////////////////////////
		zippyshare: {
			host: '^https://www.*.zippyshare.com/v/',
			func: function() {
				let d = !true;
				d && console.log('zippys');
				//arebaCli('#dlbutton');
				let url = document.querySelector('#dlbutton').href
				location.href = url
			},
		},
		mxshnet: {
			host: '^https://mx-sh.net/',
			func: function() {
				let d = !true;
				d && console.log('zippys');
				arebaCli('#Downloadfre');
			},
		},
		wupfile_com: {
			host: '^https://wupfile.com/',
			func: function() {
				let d = !true;
				d && console.log('zippys');
				arebaCli('#method_free');
				//downloadbtn
				//document.querySelector("#downloadbtn").click()
				//document.querySelector('#downloadbtn').removeAttribute('disabled')
				//disabled消してクリックしても巻き戻るだけ。
				//2019/09/02 自動ダウンロードを簡易的に
				//setintarval→clearinでもできるけど、settimeoutのほうが見やすい？
				(function tryDownload() {
					let time = new Date();
					let el = document.querySelector('#downloadbtn')
					console.log(time);
					console.log(el.disabled);
					if (!el.disabled) {
						el.click();
						return
					}
					setTimeout(tryDownload, 5000);
				}());
			},
		},
		joilinfile: {
			host: '^https?://jolinfile.com',
			func: function() {
				let d = !true;
				d && console.log('http://jolinfile.com');
				arebaCli('[value="Free Download"]');
				arebaCli('#dd_link');
				(function tryDownload() {
					let time = new Date();
					let el = document.querySelector('#downloadbtn')
					console.log(time);
					console.log(el.disabled);
					if (!el.disabled) {
						el.click();
						return
					}
					setTimeout(tryDownload, 5000);
				}());
			},
		},
		rapidgator: {
			host: '^https://rapidgator.net/',
			func: function() {
				let d = !!true;
				d && console.log('mexa');
				arebaCli('.link.act-link.btn-free');
				arebaCli('.btn-download');
			},
		},
		mexa_sh: {
			host: '^https://mexa.sh/',
			func: function() {
				let d = !!true;
				d && console.log('mexa');
				arebaCli('#Downloadfre');
				//downloadbtn
				//document.querySelector("#downloadbtn").click()
				//document.querySelector('#downloadbtn').removeAttribute('disabled')
				//disabled消してクリックしても巻き戻るだけ。
				//2019/09/02 自動ダウンロードを簡易的に
				//setintarval→clearinでもできるけど、settimeoutのほうが見やすい？
				// (function tryDownload(){
				// 	let time = new Date();
				// 	let el=document.querySelector('#downloadbtn')
				// 	console.log(time);
				// 	console.log(el.disabled);
				// 	if(!el.disabled){
				// 		el.click();
				// 		return
				// 	}
				// 	setTimeout(tryDownload,5000);
				// }());
			},
		},
		dousyoko: {
			host: '^https?://.+.dousyoko.net/',
			func: function() {
				let d = !!true;
				const $ = (...s) => document.querySelectorAll(...s)
				d && console.log($('#download_pass').value);
				$('#download_pass')[0].type = 'text'
				$('#download_pass')[0].value = 'dddd'
				d && console.log('dddd');
				arebaCli('.submit');
			},
		},
		z2icom: {
			host: ['^https://z2i.com/', '^https?://im1.io/', '^https://shrinx.net'],
			func: async function() {
				let d = !true;
				let current_url = window.location.href
				let api = current_url.split('?api=').slice(1).join('?api=').split('&url=')[0]
				let url = current_url.split('&url=').slice(1).join('&url=')
				//後ろのjoinは半分ダミー、Stringg欲しいから、コピペしたんだと思う、toStringが正しい。
				d && alert(url);
				if (url) {
					window.location.href = url
				}
				//await sleep(1000)
				await new Promise((r) => setTimeout(r, 4500)); // sleep
				arebaCli('#invisibleCaptchaShortlink');
				//await sleep(3000)
				//await new Promise((r) => setTimeout(r, 3500)); // sleep
				//<a href="https://www116.zippyshare.com/v/pu2Jljh0/file.html" class="btn btn-success btn-lg get-link">Get Link</a>
				arebaCli('a[href*="zippyshare.com"]', null, true);
				//location.href = document.querySelector().href
			},
		},

		////////////////////////////////////////////
		表示禁止サイト: {
			host: ['^https://playingcards.jp', '^ahttps://smcb.jp/'],
			func: function() {
				//画面真っ白に、飛ばされてる感覚がなくなる、<html から削除
				document.body.parentNode.remove() //window.document.firstChild.remove()
				//戻るボタン押せるa
				//window.location.href = 'https://news.google.co.jp';
				//戻るボタン押せない、firefoxでデフォで無効
				// let meta = document.createElement('meta')
				// meta.setAttribute('http-equiv', 'refresh')
				// meta.setAttribute('content', '0;url=https://news.google.co.jp')
				// document.head.appendChild(meta)
			},
		},
		楽天スーパーヒーロー: {
			host: '^https://campaign.rakuten.jp/heroes/',
			func: function() {
				const base = nsMiiya.gamen();// 画面作っちゃう	
				mkEle(base, 'button', {
					textContent: 'callbtn',
					onclick: (ev) => {
						document.querySelector('.callbtn').click()
					}
				});
				mkEle(base, 'button', {
					textContent: '受け取らず',
					onclick: (ev) => {
						document.querySelector('img[alt="受け取らずに次へに進む"]').click()
					}
				});
				let flag = true;
				mkEle(base, 'button', {
					textContent: '受け取らず',
					onclick: (ev) => {
						if (flag) {
							document.querySelector('.callbtn').click()
							ev.target.textContent = '受け取らず'
						} else {
							document.querySelector('img[alt="受け取らずに次へに進む"]').click()
							ev.target.textContent = 'スロット'
						}
						flag = !flag
					}
				});
				//200円クーポンは3500円以上としょぼい
				//https://campaign.rakuten.jp/heroes/?heroes_call=coupon&scid=wi_ich_gmx_coupongetcoupon
				//限定クーポン↑でヒーローたくさん呼ぶ
				//modal call-tappuri-hero active
				/*
				  value: function() {
                    this.hitNumArr = [],
                    this.hitNumAccuracy = 1;
                    for (var e = 0; e < this.percent.length; e++)
                        for (var t = 0; t < this.percent[e] * this.hitNumAccuracy; t++)
                            this.hitNumArr.push(e);
                    this.hitNumArr = this.shuffle(this.hitNumArr)
				 */
			},
		},
		/*
		:{
			host:'',
			func:function(){},
		},
		*/
	};
	//main/////////////////////////////////////
	const ver ='2019-10-20-173940'
	my_alert('ver => ' + ver);
	my_alert(window.location.href);
	//2019/05/22 ローダーを止める、複雑だし、ssh無しだと拒否される。
	// if (await loadself()) {
	// 	console.log('return')
	// 	return; //script終了
	// }
	// my_alert(GM_getValue('url'))
	// GM_setValue('url', window.location.href)
	+function autoRunList() {
		let H;
		const kazari = ' ###### ';
		for (let key in list) {
			//console.log("1 "+list[i].host);
			H = list[key].host;
			switch (typeof H) {
				case 'string':
					H = new RegExp(H, 'i');
					break;
				case 'object':
					H = new RegExp(H.join('|'), 'i');
					break;
			}
			if (H.test(location.href)) {
				//debugger;
				console.log(` ###### ${key} start ###### `);
				list[key].func();
				//console.log(` ###### ${key} end `);
				//fn = list[i].fn;
				// addEvent(window, "DOMContentLoaded", fn);
				// window.addEventListener("DOMContentLoaded", fn, false);
				//return; //1つヒットしたら終わり
			}
		}
	}();
	console.log('mypo底辺###########これが表示されない場合、エラーで止まってる可能性');
	my_alert('#')
	console.timeEnd('mypo');
})();

function x( name, url, func) {
	//log(location.href)
	// log(url.join('|'))
	let urlpai = url.join('|').replace(/\./g, '.'); //.は正規表現のためにエスケープ
	let patt = new RegExp(urlpai, 'i');
	//log(patt)
	if (patt.test(location.href)) {
		let obj = {name: name, f: func};
		log(` ${name} $$$$$$$$$$$$$$$$$$$`);
		obj.f();
	}
}
x('テスト、グーグルでアラーム', ['^https://news.google.com/', 'cdpn.io'], function() {
	'use strict';
	//alert(123)
	log(123)
})
//画像ダウンロード////////////////////
x( 'manga314', ['^https://manga314.com/'], async function() {
	//document.querySelectorAll('img[original*="r18.dawnfun.com"]')
	let els = document.querySelectorAll('img[original*="r18.dawnfun.com"]');
	document.title = document.title.replace(' | manga314.com', '').replace(/.zip|.rar|\//, '');
	let urls = '', hrefs = '';
	for (let i = 0, l = els.length; i < l; i++) {
		//const newel=document.createElement('a');
		let val = els[i];
		let url = val.getAttribute('original')
		urls += url + '\n';
		hrefs += `<a href="${url}" title="${document.title}">link</a> `;
	}
	//my_alert(urls)
	let waku = document.body.appendChild(Object.assign(document.createElement('div'), {
		style: `
				position: fixed;
				left: 0px;
				//top: 0px;
				bottom: 0px;
				z-index: 2147483646;
				width:400px;
				height:80px;
				//white-space: pre;

				overflow: scroll;
				background-color: ivory;
				color: black;
				opacity: 1;
				border: 2px solid gray;
			`,
	}));
	let zipname = waku.appendChild(Object.assign(document.createElement('input'), {
		type: 'text',
		value: document.title,
		//document.title = decodeURIComponent(s)
		onclick: function(e) {
			//my_alert(this, e)
			e.target.select()
			document.execCommand('cut')
			let selection = getSelection();
			let element = document.getElementById('hoge23');
			selection.selectAllChildren(element);
		},
	}));
	let button1 = waku.appendChild(Object.assign(document.createElement('input'), {
		type: 'button',
		value: 'slect urls',
		onclick: function(e) {
			let selection = getSelection();
			let element = document.getElementById('hoge23');
			selection.selectAllChildren(element);
		},
	}));
	let button2 = waku.appendChild(Object.assign(document.createElement('input'), {
		type: 'button',
		value: 'view mode',
		onclick: function(e) {
			//my_alert(this, e)
			e.target.select()
			document.execCommand('copy')
		},
	}));
	let base = waku.appendChild(Object.assign(document.createElement('div'), {
		id: 'hoge23',
		title: 'tttttt',
		onclick: function(e) {
			my_alert(this, e)
			e.target.select(0, e.target.length)
		},
		style: `
				border: 2px solid gray;						
			`,
	}));
	//base.textContent = urls
	base.innerHTML = hrefs;
})
log('最下層')
/*
2019/01/07
firefox greasemonkey で@require したらcacheが出来て更新できない。
拡張フォルダに作られるタイプで、cacheクリアとかほぼ無理
もう嫌だと、ローカル鯖にしよう
mac なら 公開したいフォルダに移動して python -m SimpleHTTPServer 8888
終了はC-c
http://localhost:8888/mypo.user.js
*/
