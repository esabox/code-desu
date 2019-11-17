// ==UserScript==
// @name         mypo.user.js
// @namespace    miiya
// @updateURL    https://gist.github.com/esabox/8213a51ef2f1a6be4313ece316421762/raw/mypo.user.js
// @homepageURL  https://gist.github.com/esabox/8213a51ef2f1a6be4313ece316421762/edit
// @version 2019.11.09.111939
// @description  3aa山彦が鯉をやる気にさせなかったり夢の地下室の本当の予想。
// @author       山田一意太郎左衛門
// @include *
// @grant	GM_registerMenuCommand
// @grant 	GM_getValue
// @grant 	GM_setValue
// @grant 	GM_deleteValue
// @grant 	GM_listValues
// @grant   GM_xmlhttpRequest
// @noframes
// ==/UserScript==
//
// 外したオプション
// @run-at document-start
// オプションはローダー側に書く必要あり
// @require       https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.6/moment.js
// @exclude     https://*.visualstudio.com/*
// @grant        none
//
// lint ///////
/* eslint-disable no-multiple-empty-lines */
/* jshint -W104: true */ // ,es6:true */
/* eslint.parserOptions ecmaVersion: 2017 */
/* eslint max-len: ["error", 233]*/

/* global
alert, confirm, console, Debug, opera, prompt,GM_registerMenuCommand
*/
'use strict';

//windowにネームスペースを作る、コンソールから使えるように。
//GM_だとwindowとunsafe(本体）を入れ替えたりするから、それ対応。ifで書いてたけど、ブロックスコープなのでconst使えるよう変更。
// @grant none にするとunsafeWindowは作られない。GM関数も使えない
//constつけてたが外す、同じものリロードする為。GMだと失敗するはず。
this.temp = (window.unsafeWindow)
	? (window.unsafeWindow.winNS = {})
	: (window.winNS = {});
//self reload
temp.srl = function() {
	document.body.appendChild(Object.assign(document.createElement('script'), {
		src: 'http://localhost:8888/mypo.user.js'
	}));
};

!(function() {//const log = console["log"];
	let time = Date.now(); //時間測定

	async function loadself() {
		let domID = 'loadSelfScript';
		//log('スタート loadSelf');
		const el = document.querySelector('#' + domID);
		if (el === null) {
			let url = 'http://localhost:8888/mypo.user.js?' + Date.now();
			//let url = 'http://localhost:8888/mm.js?'+Date.now();
			log('読み込む→' + url);
			let aasd = document.createElement('script');
			const aaa = await new Promise((resolve, reject) => {
				aasd.onload = () => resolve(true);
				aasd.onerror = () => resolve(false);
				aasd.src = url;
				aasd.id = domID
				document.body.appendChild(aasd)
			})
			log('読み込み結果', aaa);
			if (aaa) {
				log('localhostの読み込み成功、ブラウザ内蔵のスクリプトは終了')
				return aaa;
			} else {
				log('ローカル読み込み失敗、インストールスクリプトを続ける')
			}
		} else {
			log('既にscriptあるので作らない');
		}
	}
	/*/
	function loadself() {
		let domID = 'loadSelfScript';
		//log('スタート loadSelf');
		const el = document.querySelector('#' + domID);
		if (el === null) {
			let url = 'http://localhost:8888/mypo.user.js';
			log('読み込む→'+url);
			document.body.appendChild(
				Object.assign(document.createElement('script'), {id: domID, src: url})
				//ファイルが存在しない場合はまだ未実装
			);
			return true;
		} else {
			log('既にscriptあるので作らない');
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
	//Utilityクラスを作ってみる？
	/**あればClick
	 * @param selector{string}
	 */
	function arebaCli(selector, anzen_sec = 3, is_href = false) {
		const el = document.querySelector(selector);
		// let aaa = GM_getValue('zenkai', Date.now() - 9999)
		// let jisa = (Date.now() - aaa) / 1000

		log(`arebaCli ${selector}`)
		if (el !== null) {
			// if (jisa < anzen_sec) {
			// 	log(`ループしてる可能性、抜ける. jisa=${jisa}`)
			// 	return false;
			// }

			// setTimeout(() => {
			// 	GM_setValue('zenkai', Date.now());
			// 	if (!href)
			// 		el.click();
			// 	else
			// 		location.href = el.href
			// 	return true
			// }, 2000);

			let title = document.title;
			let countD_ms = anzen_sec * 1000
			let loop_ms = 100
			!(function f() {
				if (countD_ms <= 0) {
					//clearTimeout(stoID)
					if (!is_href)
						el.click();
					else
						location.href = el.href
					return true
				} else {
					countD_ms -= loop_ms

					//log(countD_ms);
					document.title = countD_ms / 1000 + title
					let stoID = setTimeout(f, loop_ms);

				}


			}())


		} else {
			log('クリックする箇所無し @arebaCli ' + selector);
			return false;
		}
	}
	//スクリプトが動いてるか確認する目立たないもの、タイトルの一文字目を使う案も
	function ugoiteruka(str, sakujo) {
		let id = 'ugoiteruka'
		let el = document.getElementById(id)
		if (el === null) {
			el = document.createElement('div')
			el.id = id
			document.body.appendChild(el)
			el.style = `
				background-color: #333;
				color:#fff;
				position: fixed;
				right: 0px;
				bottom: 0px;
				font-size:18px;
			`
		}
		el.innerHTML += str
		if (sakujo) {


			(async () => {
				await sleep(3000)
				el.remove()
				// do something...
			})();
		}
	}
	const session_fn = function() {
		let key = Date.now().toString().slice(-7, -3)//location.hostname + 
		let val = `${location.href}`


		log('sessionStorage.his')
		sessionStorage.his = Number(sessionStorage.his)

		log(sessionStorage.his)
		// // sessionStorage.his = location.href
		// if (typeof sessionStorage.his!=="number") {
		// 	log(typeof Number(sessionStorage.his),Number(sessionStorage.his))
		// }
		sessionStorage.his = sessionStorage.his == 'NaN'
			? 1
			: Number(sessionStorage.his) + 1;
	}
	const video_top_play = function(video_elem, query = 'video') {
		//let playerDiv = document.querySelector('#player-embed')

		let elem = (video_elem)
			? video_elem
			: document.querySelector(query)

		if (elem) {
			//
			//log(1)

			document.body.insertAdjacentElement('afterbegin', elem)
			if (elem) {
				elem.style = `
						width: 100vw; 
						height: 100vh;
						background-color: black;
						/* overflow-x: hidden; */
						/*bodyにwideやmagineあったりすると余白出来る対策*/
						position: relative;
						transform: translateX(-50%);
						left: 50%;
						`
			}
			//自動再生
			if (elem.tagName === 'VIDEO') {
				elem.preload = true //これが無いと始まらないぽい
				elem.autoplay = true  //こっちも同じようなもの
				elem.controls = true
				//elm.play()
			}
			css_instant('saidcss', `
body {
    overflow-y: overlay;
    overflow-x: hidden;
}

body::-webkit-scrollbar {
    width: 12px;
}

body::-webkit-scrollbar-thumb {
    background-color: #0005;
}

body::-webkit-scrollbar-track {
    background: transparent;
}
		`)

		}
	}
	const cookie_view_del = function() {

		const cookie_view = () => {
			const logo = '&#x1f36a;' //"🍪"
			log(logo + document.cookie.replace(/; /g, '\n' + logo))
		}
		const count = function() {
			return document.cookie === ''
				? 0
				: document.cookie.split('; ').length
		}
		function deleteAll() {
			const cookies = document.cookie.split('; ');

			for (let cookie of cookies) {
				const index = cookie.indexOf('=');

				const name = ~index //~-1==0
					? cookie.substr(0, index)
					: cookie;

				document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
			}

		}
		const panel = () => {
			//Cookie削除ボタン
			let btn1 = button_tukuru('表示', () => {cookie_view()})
			//Cookie削除ボタン
			let btn = button_tukuru('全削除', () => {deleteAll(); panel()})
			log(`Cookie[${count()}] `, btn1, btn)
		}

		//main
		panel()
	}
	//css作って書き込む、あれば追記
	const css_instant = function(_css_id, css_text) {
		let css_id = _css_id;
		let css_el = document.getElementById(css_id);
		if (css_el === null) {
			css_el = document.createElement('style');
			css_el.id = css_id;
			document.head.appendChild(css_el);
		}
		css_el.insertAdjacentText('beforeend', css_text);
		return css_el
	}
	//ランダムなEmojiを返す
	function emoji_rand() {
		//大部分コピペ、数字の範囲は文字コードを整数化したやつ。
		let rand_mm = (min, max) => Math.floor(Math.random() * (max + 1 - min)) + min
		let emojiCode = Math.random(10) > 7.75 ? rand_mm(128512, 128592) : rand_mm(127744, 128318);
		return String.fromCodePoint(emojiCode);
	}

	//メッセージを表示するやつ、アラートの代わり
	function my_alert(...msg) {
		//デバッグ用のlogしても、ここが表示されて、箇所が分からない。

		//これをcos log に置き換えるから、中でlogすると無限ループ、それ回避用
		const log = window['console'].log//省略不可、置換しないよう変則
		//log(...msg)

		if (window.GM) {
			//設定を読み取る
			let flag_name = 'my_alert_f'
			let my_alert_f = GM_getValue(flag_name, false)
			//メニュー登録、一度だけ、そのためにプロパティ利用
			if (typeof my_alert.reg === 'undefined') {
				my_alert.reg = 1;
				GM_registerMenuCommand('my_alert_f=' + my_alert_f, function() {
					//alert('Put script\'s main function here');
					GM_setValue(flag_name, !my_alert_f);
				}, 'r');
				//log('my_alertのアイコン内メニュー作った')
			}
			//表示の可否
			if (!my_alert_f) {
				return
			}
		}


		let css_id = 'malert';
		let css_el = document.getElementById(css_id);
		if (css_el === null) {
			css_el = document.createElement('style');
			css_el.id = css_id;
			document.head.appendChild(css_el);
			css_el.insertAdjacentText('beforeend', ([`
			.hoge{
				background-color: rgba(255, 255, 255, 1);
				color:black;
				border: 1px solid silver;
				padding: 1px;
			}
			#waku{
				background-color: ivory;
				color:black;
				transition: all 300ms ease 0s;
				border: 2px solid silver;
				padding: 5px;
				position: fixed;
				right: 0px;
				//top: 0px;
				bottom: 0px;
				z-index: 2147483646;
				font-size:12px;
				overflow-x:auto;
				width:300px;
				max-height:90%;				
				word-break: break-all;/* 文字に関係なくきっちり折り返す */
				overflow-wrap: break-word;
				white-space: pre-wrap;/* 開業・空白そのまま、しかし折り返す */

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
			}`
			])[0]);
		}


		const waku_id = 'waku'
		let wakuElm = document.getElementById(waku_id)
		//枠がなけりゃ作る
		if (wakuElm === null) {
			wakuElm = document.createElement('div')
			wakuElm = Object.assign(wakuElm, {
				id: waku_id,
				onclick: function(e) {
					this.parentNode.removeChild(this);
				},
				onmouseenter: function(e) {
					wakuElm.style.opacity = 1;
				},
				onmouseleave: function() {
					wakuElm.style.opacity = 0;
				},
			});
			document.body.appendChild(wakuElm)

			//非表示ボタン
			const el_a0 = button_tukuru('ログ非表示', () => {GM_setValue(flag_name, false);})
			// const el_a0 = document.createElement('input')
			wakuElm.appendChild(el_a0)
			// el_a0.type = 'button'
			// el_a0.value = 'ログ非表示'
			// el_a0.onclick = function(e) {
			// 	e.preventDefault(); //もう移動しない、ハッシュも無理、voidも必要ない
			// 	log(this, '非表示')
			// 	GM_setValue(flag_name, false);
			// }

			//消さないボタン
			const el_a = button_tukuru('消さない', (e) => {
				log(e)
				e.target.parentElement.onmouseleave = null;
			})
			wakuElm.appendChild(el_a)
			// el_a.type = 'button'
			// el_a.value = '消さない'
			// el_a.onclick = function(e) {
			// 	e.preventDefault(); //もう移動しない、ハッシュも無理、voidも必要ない
			// 	e.stopPropagation()
			// 	this.parentElement.onmouseleave = null
			// }
		}
		const div_every = true;//毎回div作るか、1つに追加するか
		let log_id = '17:30'
		let log_el = document.getElementById(log_id)
		if (div_every || log_el === null) {
			log_el = wakuElm.appendChild(Object.assign(document.createElement('div'), {
				className: 'hoge',
				id: log_id,
			}));
		}
		log_el = wakuElm

		//例外、第一引数がelemなら表示させる

		for (let [key, val] of Object.entries([...msg])) {
			if (val instanceof HTMLElement) {
				//log('is elm? ' + (val instanceof HTMLElement))
				log_el.insertAdjacentElement('beforeend', val)
			} else {
				//log(key,typeof key)
				if (key != '0') val = ', ' + val //obj entr はstring
				log_el.insertAdjacentHTML('beforeend', val)
			}
		}
		//log_el.insertAdjacentHTML('beforeend', String.prototype.concat(...s) + '</br>')
		wakuElm.scrollTop = wakuElm.scrollHeight;
		//Promiseオブジェをstringにできずにエラー
		//log_el.insertAdjacentElement('beforeend', document.createElement('hr'))
		// base.innerHTML = String.prototype.concat(...s)
		//base.innerHTML = s.toString()
	}
	/**日付関数 yyyy-MM-dd hh:mm:ss	 */
	function mydate(format, zerofill = 1) {
		let date = new Date();
		let hi = {}
		//初期設定
		format = format || 'yyyy-MM-dd hh:mm:ss';
		hi.yyyy = date.getFullYear();
		hi.MM = date.getMonth() + 1;
		hi.dd = date.getDate();
		hi.hh = date.getHours();
		hi.mm = date.getMinutes();
		hi.ss = date.getSeconds();
		for (let key in hi) {
			if (key !== 'yyyy' && zerofill) {
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
		d && log('cssつくっちゃう');
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
				//log(e.target, e.relatedTarget, this, "mouse over");
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
			onclick: () => log('えむ'),
		});
		baseC.proMk2('button', {
			textContent: 'はっげ',
			onclick: () => log('えむ'),
		});
		mkEle(baseC, 'span', {
			textContent: 'v',
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
					//log(key)
					vals.push(GM_getValue(key))
					ob[key] = GM_getValue(key);
				}
				//log(vals);
				log(ob)
				//console.table(ob)
				//log(GM_listValues());
			},
		});
		mkEle(baseC, 'button', {
			textContent: '小さくなる',
			// style:'all: initial;',
			// style: 'height:30px',
			// onclick:e=>{log(this);this.style.height="11px";},
			onclick: function() {
				log(this); this.style.height = parseInt(this.style.height) - 1 + 'px';
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
				log(window.navigator.userAgent);
				log(document.referrer);
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
			// log("miiya log->"+s);
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
			//log(key)
			vals.push(GM_getValue(key))
			ob[key] = GM_getValue(key);
		}
		log(ob)
	}
	/**
	 * 毎日くじ
	 */
	function maiKuji(start) {
		let mai = '毎日くじ次へ'
		log('maiKuji実行');
		log(mai, GM_getValue(mai));
		//gmValuesAll();
		if (start) {
			log('変数セット', start);
			GM_setValue(mai, start); //スタート書き換え
			//log(mai, GM_getValue(mai));
		}
		let ima = GM_getValue(mai);
		if (!ima) {
			log('枚にくじima無し、抜ける', ima);
			return false;
		}
		switch (ima) {
			case 1:
				log('case', ima);
				GM_setValue(mai, ima + 1);
				location.href = 'http://www.rakuten.co.jp/';
				break;
			case 2:
				log('case', ima);
				if (location.href === 'http://www.rakuten.co.jp/') {
					GM_setValue(mai, ima + 1);
					list.楽天系の毎日くじ.rakuTop2kuji();
				}
				break;
			case 3:
				log('case', ima);
				if (location.href.match('https://kuji.rakuten.co.jp/.+/.+')) {
					GM_setValue(mai, ima + 1);
					location.href = 'https://www.infoseek.co.jp/Luckylot';
				}
				break;
			default: break;
			//location.href = 'https://www.infoseek.co.jp/Luckylot';
			//http://www.rakuten.co.jp/?l2-id=shop_header_logo
		}
		log('まいくじ終わり', mai, GM_getValue(mai));
	}
	/**毎日くじ作り直し 
	 * @param 
	*/
	function maiJump(flagEdit) {
		const name = '毎日ジャンプ';
		const debug = true;
		debug && log(name + 'start');
		//フラグを書き込む
		if (flagEdit === 1) {
			debug && log(name + 'フラグを作る');
			GM_setValue(name, 1);
		} else if (flagEdit === 0) {
			debug && log(name + 'フラグを削除');
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
		debug && log(name + 'end');
		//今いるURLから次にジャンプする、
		//ジャンプ実行フラグがついてなければ抜ける
	}
	/**
	 * 
	 */
	function button_tukuru(text, func) {
		const css_ClassName = 'button_tukuru'
		const css_id = 'button_tukuru_css';

		//css無ければ作る
		let css_el = document.getElementById(css_id);
		if (css_el === null) {
			css_el = document.createElement('style');
			css_el.id = css_id;
			document.head.appendChild(css_el);
			css_el.textContent = ([
				`
				.${css_ClassName}{
					margin: 2px;
					box-shadow: 1px 2px 3px grey;
					padding: 1px;
					/* font-size: initial; */
					border-width: thin;
				}
			`
			])[0]
		}
		//ボタン作る
		const el_a = document.createElement('button')
		//wakuElm.appendChild(el_a)
		el_a.textContent = emoji_rand() + text
		el_a.className = css_ClassName
		//el_a.type = 'button'
		el_a.addEventListener('click', function name(ev) {
			ev.stopPropagation()
			ev.preventDefault()
			//func(e) //thisが伝わらない,引数側を、アロー関数にすりゃいい？駄目だった。
			func.call(this, ev)
			//!(func.bind(this, e))() //無名関数で動かなかったのはセミコロンなかったからや。
			//!(func.bind(this))(e) //これは挙動おかしい
		}, {once: false, passive: false, capture: true})
		// el_a.onclick = function(ev) {
		// 	ev.stopPropagation()
		// 	ev.preventDefault()
		// 	//func(e) //thisが伝わらない,引数側を、アロー関数にすりゃいい？駄目だった。
		// 	func.call(this, ev)
		// 	//!(func.bind(this, e))() //無名関数で動かなかったのはセミコロンなかったからや。
		// 	//!(func.bind(this))(e) //これは挙動おかしい
		// }
		return el_a
	}
	//main/////////////////////////////////////
	const log = my_alert;
	log(`\n${(new Date).toLocaleString()}`);
	log(`${Date.now() - time}ms main ##########################`);
	log('@version 2019.11.09.111939');
	ugoiteruka('.')

	const arr = []
	/**
	 * 関数登録くん
	 * @param {string} name 
	 * @param {*} url 
	 * @param {function} func 
	 */
	function x(name, url, func) {
		if (name === 0) {
			//log("除外きた")
			return;
		}
		arr.push([name, url, func])
	}
	function xdo() {
		//log(arr)
		for (let val of arr) {
			//log(val)
			let [name, url, func] = val

			//urlは.エスケープしてワイルドカードが使えるように。そのかわりドットは使えない。
			let url_join = url.join('|').replace(/\./g, '\\.'); //.は正規表現のためにエスケープ
			url_join = url_join.replace(/\*/g, '.*?');//ワイルドカードを実装。
			let re = new RegExp(url_join, 'i');
			//log(name,url_join)
			//log(url_exp)
			if (re.test(location.href)) {
				let obj = {name: name, f: func};
				ugoiteruka('*')

				//log(` ${name} $$$$$$$$$$$$$$$$$$$`);
				log(`${name} $$$$$$$$$$$$$$$$$$$`);
				obj.f();
			}
		}
	}


	x('全部b', ['^http'], function() {
		//log(1, 2, 3)
		function fn_localStorage() {
			let count = `localStorage[${localStorage.length}]`
			let btn = button_tukuru('clera', () => {localStorage.clear()})
			//og(btn)
			let btn2 = button_tukuru('view all', () => {
				let str = ''
				for (let [key, value] of Object.entries(localStorage)) {
					str += (`${key}: ${value}\n`);
				}
				log(str)
			})
			log(count, btn, btn2)
		}
		fn_localStorage()
		function fn_sessionStorage() {
			let count = `sessionStorage[${sessionStorage.length}]`
			let btn = button_tukuru('clera', () => {sessionStorage.clear()})
			//og(btn)
			let btn2 = button_tukuru('view all', () => {
				let str = ''
				for (let [key, value] of Object.entries(sessionStorage)) {
					str += (`${key}: ${value}\n`);
				}
				log(str)
			})
			log(count, btn, btn2)
		}
		fn_sessionStorage()
		cookie_view_del()

	})
	x('確認くん', ['^http://www.ugtop.com/spill.shtml'], function() {log('ugtop')},
	)
	x('workflowy', ['^https://workflowy.com/'], function() {
		const base = nsMiiya.gamen();// 画面作っちゃう
		let dataSounyuF = function(s = '') {
			document.activeElement.textContent += mydate('yyyy/MM/dd') + ' ' + s;
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
			//log(e)
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
					// document.activeElement.textContent+=moment().format('yyyy/MM/dd')+" #タスク ";
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
	})
	x('ルーターログイン', ['^https?://192.168.\\d+.\\d+'], function() {
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
	})
	//楽天系/////////////////////////
	x('楽天スーパーヒーロー', ['^https://campaign.rakuten.jp/heroes/'], function() {
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
	})
	x('infoの報告', ['^https://pointmail.rakuten.co.jp/subcard/complete'], function() {
		document.querySelector('#completionReportBtn').click();
	})
	x('メールdeポイント', ['^https://member.pointmail.rakuten.co.jp/box/*'], function() {
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
	})
	x('楽天enaviでクリックポイント', ['^https://www.rakuten-card.co.jp/*'], function() {
		const base = nsMiiya.gamen();// 画面作っちゃう
		async function enaviClick() {
			let elemList = document.querySelectorAll('[id^="position"]');// cssセレクタでhasが使えないからloop検索
			log('クリック箇所=' + elemList.length);
			for (let i = 0; i < elemList.length; i++) {
				if (i < 0) {
					//前半スキップ
					//continue;
				}
				if (elemList[i].querySelector('img[src$="check.gif"]')) {
					let s = elemList[i].querySelector('a[href^=\'javascript\']');// .textConten;
					// log(s.textContent);
					s.style = 'box-shadow: 0 0 0px 3px rgba(222, 111, 222, 0.90);';
					log('クリック');
					s.click(); // クリック
					//早くしすぎると歯抜けになる
					await new Promise((r) => setTimeout(r, 891)); // sleep
				}
				//
				// log(eles[i].querySelectorAll(".clearfix .dateArrival>img").length);
			}
		};
		//PV時に実行
		enaviClick()
		// ボタンを作る
		mkEle(base, 'button', {
			textContent: 'クリックde',
			onclick: enaviClick,
		});
	})
	x('Infoseekのラッキーくじサッカー', ['^https://www.infoseek.co.jp/Luckylot*'], function() {
		if (location.href === 'https://www.infoseek.co.jp/Luckylot/result') {
			log('サッカーくじ終わり');
			location.href = 'https://www.infoseek.co.jp/';
		}
		//https://www.infoseek.co.jp/Luckylot/result
		// if (GM_getValue('毎日くじ次へ')) {
		// 	GM_setValue('毎日くじ次へ', null);
		// 	location.href = 'https://www.infoseek.co.jp/';
		// } else {
		// 	log('くじセット');
		// 	GM_setValue('毎日くじ次へ', 1);
		// }
		const base = nsMiiya.gamen();// 画面作っちゃう
		let fn = async function() {
			await new Promise((r) => setTimeout(r, 500)); // sleep
			document.querySelector('.isluckykuji_start').click();
			await new Promise((r) => setTimeout(r, 500)); // sleep
			document.querySelector('.isluckykuji_select:nth-of-type(1)').click();
			log('ow');
		};
		//new GM_registerMenuCommand(title, fn, 'C');
		fn();
	})
	x('infoミニくじ', ['^https://www.infoseek.co.jp/(\\?.+)?$'], function() {
		const el = document.querySelector('area.islot_lot');
		if (el !== null) {el.click();}
	})
	x('enavi自動ログイン', ['^https://www.rakuten-card.co.jp/e-navi/index.xhtml'], async function() {
		await new Promise((r) => setTimeout(r, 1500)); // sleep
		//chromeのオートコンプリートでパスワードはあるように見えるが空欄状態、画面Clickで値が入る
		if (document.querySelector('#u').value !== '' &&
			document.querySelector('#p').value !== ''
		) {
			log(1);
			//document.querySelector('#loginButton').click();
		}
	})
	x('楽天系の毎日くじ', ['^https://www.infoseek.co.jp/',
		'^https://kuji.rakuten.co.jp/',
		'^http://www.rakuten.co.jp',
		'^https://www.infoseek.co.jp/Luckylot*',
		'^https://isbingo.www.infoseek.co.jp/isbingo/getCard',
		'^https://pointmail.rakuten.co.jp/subcard/complete',], function() {
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
			// 	log('くじセット');
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
			// rakuTop2kuji: function() {
			// 	arebaCli('a[href^="https://rd.rakuten.co.jp/s/?R2=https%3A%2F%2Fkuji.rakuten.co.jp"]');
			// }
		})
	x('楽天系のくじの自動Click', ['^https?://kuji.rakuten.co.jp/'], async function() {
		// if (GM_getValue('毎日くじ次へ')) {
		// 	GM_setValue('毎日くじ次へ', null);
		// 	location.href = 'https://www.infoseek.co.jp/Luckylot';
		// } else {
		// 	log('くじセット');
		// 	GM_setValue('毎日くじ次へ', 1);
		// }
		await new Promise((r) => setTimeout(r, 1000)); // sleep
		arebaCli('#entry');
	})

	x('google', ['^https?://www.google.(?:com|co.jp)/'], function() {
		let d = !!0;
		d && log('google no redirect');
		//Array.prototypeは[]で置き換え可能
		Array.prototype.forEach.call(document.querySelectorAll('h3.r > a'), function(elem) {
			d && log(elem.textContent);
			elem.onmousedown = function() {};
		});
	})
	//kk動画サイト///////////////////////////////

	x('kkonload', ['^https://openloadpro.com/'], function() {
		let d = !true;
		d && log('zippys');
		//arebaCli('.openload-link > a:nth-child(1)');
		let url = document.querySelector('.openload-link > a').href
		location.href = url
	})
	//ビデオタグをハック。2019/11/03
	x('kkビデオタグあったら全画面にして上に', ['^https://xn--icktho51ho02a0dc.com/*/', 'https://asianclub.tv/'], function() {


		video_top_play()
		log(button_tukuru('video再生', () => video_top_play()))
		log(button_tukuru('video再生', video_top_play))
	})
	x('javmix大画面', ['^https://javmix.tv/video/*/'], function() {
		//let playerDiv = document.querySelector('#player-embed')
		let elm = document.querySelector('#player-embed > iframe');
		//let videotag = elm.contentWindow.document.querySelector('video')
		//
		elm.sandbox = 'allow-scripts allow-same-origin'; //iframe制限して許可条件、popup防げるけど、相手が書き換えることも可能
		video_top_play(elm)
		let link = document.createElement('a')
		link.href = elm.src
		link.textContent = elm.src
		log(elm.src)
		log(link)
		//document.body.insertAdjacentElement('afterbegin', elm)
		// if (elm) {
		// 	elm.style = `
		// 			/* position: relative;  */
		// 			width: 100%; 
		// 			height: 100vh; 
		// 			/* z-index: 1111; 
		// 			right: 50%;
		// 			left: 50%;
		// 			margin-left: -50vw; 
		// 			margin-right: -50vw; */
		// 			`
		// }
		log(button_tukuru('moichi', kore))

		function sc_del() {
			let sc_elm = document.getElementsByTagName('script')
			let i = 0
			// for (let val of sc_elm) { //これだと半分しか削除できない、自動で詰まるから。
			// 	log(i++,val)
			// 	val.remove();
			// }
			for (let i = sc_elm.length - 1; 0 <= i; i--) { //逆から削除する。
				sc_elm[i].remove()
			}
		}
		sc_del()
		log(button_tukuru('script削除', () => sc_del()))

		//css_instant('saidcss', '::-webkit-scrollbar {width: 0px;}')
	})
	x('ファン座で自動再生', ['^https://www.dmm.co.jp/digital', '^https://www.dmm.com/*/'], function() {
		const hoge = function() {
			log('hogege')
			let elm = document.querySelector('iframe#DMMSample_player_now')
			if (elm) {
				let videotag = elm.contentWindow.document.querySelector('video')
				video_top_play(videotag)
			}
			//
			//document.querySelector("#dmmplayer")
		}

		let obj = document.querySelector('#sample-video')
		//log(obj)
		document.onreadystatechange = function(event) {
			log(this.readyState);
		}
		arebaCli('#detail-sample-movie div a', 0);
		//log(document.readyState)
		//document.addEventListener("DOMContentLoaded", hoge)
		//DOMContentLoaded = () => log("load1")
		//await sleep(2000)

		//hoge()
		log(button_tukuru('iframe', hoge))


		//let url = document.querySelector('.openload-link > a').href
		//location.href = url
	})
	x(0, 'KK_dropbooks', ['^https://dropbooks.tv/', '^http://dlbooks.to/', '^http://xbooks.to/'], function() {
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
		d && log('cssセレクタで', els.length);
		for (let i = 0; i < els.length; i++) {
			//const newel=document.createElement('a');
			let el = els[i];
			const cnode = el.cloneNode(true);
			//.appendChild(cnode);
			cnode.textContent = '■'
			el.parentElement.insertBefore(cnode, el);
			el.href = el.href.replace('/detail/', '/detail/download_zip/');
			el.textContent = '◆' + el.textContent;
			//d && log(el.href);
		}
		//プレビュー作っちゃう
		//作ろうと思ったけどサムネのURLがxhrしないとわかんないから保留
		//let globalInFn = (function() {return this})(); // ここじゃグローバル取れないぽ

		els = document.querySelectorAll('a[onclick^="bookStand"]');
		for (let i = 0; i < els.length; i++) {
			let el = els[i];
			//el.onclick=()=>log(1111);//動作するがhtmlはそのまま,オートページャーで消える
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
	})
	x('KKsmvto', ['^http://smv.to/*'], function() {
		//Clickされたノードを判定する
		function hantei(ev) {
			//log(e);	
			log(ev.target.tagName, ev.target.className);
			//log(e.target);
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
			// log(eles[i].id);
			log(window.location.href);
			eles[i].style.boxShadow = "0 0 0 4px #" + color;
			eles[i].onclick = makeThumbScreen;
			//log(eles[i].onclick);
		}
		*/
		function makeThumbScreen(ev) {
			//log('hoge' + ev);
			//log(e);
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
					//log(e);
					//return false;
				},
				onclick: function(e) {
					// log(this);
					// log(e.target);
					this.parentNode.removeChild(this);
				},
			}));
			let num = parseInt(ev.target.getAttribute('count'));
			log(num, ev.target.src);
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
	})
	//kkダウンロード系/////////////////////////////////
	x('zippyshare', ['^https://www*.zippyshare.com/v/'], function() {
		let d = !true;
		d && log('zippys');
		arebaCli('#dlbutton', 3, true);
		// let url = document.querySelector('#dlbutton').href
		// location.href = url
	})
	x('mx-sh', ['^https://mx-sh.net/'], function() {
		let d = !true;
		d && log('zippys');
		arebaCli('#Downloadfre');
	})
	x('wupfile', ['^https://wupfile.com/'], function() {
		let d = !true;
		d && log('zippys');
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
			log(time);
			log(el.disabled);
			if (!el.disabled) {
				el.click();
				return;
			}
			setTimeout(tryDownload, 5000);
		}());
	})
	x('jolinfile', ['^https?://jolinfile.com'], function() {
		let d = !true;
		d && log('http://jolinfile.com');
		arebaCli('[value="Free Download"]');
		arebaCli('#dd_link');
		(function tryDownload() {
			let time = new Date();
			let el = document.querySelector('#downloadbtn')
			log(time);
			log(el.disabled);
			if (!el.disabled) {
				el.click();
				return
			}
			setTimeout(tryDownload, 5000);
		}());
	})
	x('rapidgator', ['^https://rapidgator.net/'], function() {
		let d = !!true;
		d && log('mexa');
		arebaCli('.link.act-link.btn-free');
		arebaCli('.btn-download');
	})
	x('mexa_sh', ['^https://mexa.sh/'], function() {
		let d = !!true;
		d && log('mexa');
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
		// 	log(time);
		// 	log(el.disabled);
		// 	if(!el.disabled){
		// 		el.click();
		// 		return
		// 	}
		// 	setTimeout(tryDownload,5000);
		// }());
	})
	x('dousyoko', ['^https?://.+.dousyoko.net/'], function() {
		let d = !!true;
		const $ = (...s) => document.querySelectorAll(...s)
		d && log($('#download_pass').value);
		$('#download_pass')[0].type = 'text'
		$('#download_pass')[0].value = 'dddd'
		d && log('dddd');
		arebaCli('.submit');
	})
	x('z2icom', ['^https://z2i.com/', '^https://im1.io/', '^https://shrinx.net'], async function() {
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
	})

	////////////////////////////////////////////
	x('表示禁止サイト', ['^https://playingcards.jp', '^ahttps://smcb.jp/'], function() {
		//画面真っ白に、飛ばされてる感覚がなくなる、<html から削除
		document.body.parentNode.remove() //window.document.firstChild.remove()
		//戻るボタン押せるa
		//window.location.href = 'https://news.google.co.jp';
		//戻るボタン押せない、firefoxでデフォで無効
		// let meta = document.createElement('meta')
		// meta.setAttribute('http-equiv', 'refresh')
		// meta.setAttribute('content', '0;url=https://news.google.co.jp')
		// document.head.appendChild(meta)
	})
	x('localhostとfile:///', ['^https://www.ugtop.com/', 'news.google', 'localhost', 'file:///'], async function() {
		'use strict';
		//log('document.cookie > '+document.cookie)
		//log()

		// let js_url = "http://localhost:8888/utils.js";
		// await sleep(1000);
		// await import(js_url).then((module) => {module.default("非同期");});

		// //importがfile://からは動かなかった。localhostで動いた。非同期なので、一番遅い
		// let module = await import(js_url);
		// console.log(module)//promisは独自logで表示できない
		// module.default("同期");

		// let mymod = await import('https://codepen.io/esabox/pen/oNNeNOv.js');
		// console.log(mymod)
		// let m = mymod.m
		// m.test();

		// import * as Sub from js;
		// Sub.default.say(3444)
		// imports the functions foo() and bar()

		// import {foo, bar} from 'https://codepen.io/pwdr/pen/VXxMoy.js';
		// // imports the default export (function baz()) as bazzinga
		// import bazzinga from 'https://codepen.io/pwdr/pen/VXxMoy.js';
		// foo();
		// bar();
		// bazzinga();

		//document.tiltel=ver
		let hash = 'hoge'
		if (!location.hash)
			log('はじめまして！')
		else
			log('戻ってきたなっ')
		log('history.length', history.length, location.hash)
		//history.replaceState('', '', '#' + hash)
		let url = location.href.replace(/#.*/, '') + '#' + hash
		//log("url=",url)
		//location.href = url
		//location.replace(url)

	})
	//画像ダウンロード////////////////////
	x('manga314', ['^https://manga314.com/'], async function() {
		//クリアボタン欲しい
		const log_clear = function() {
			let button = button_tukuru('ログクリア', function(e) {
				log(e, this)
				this.parentElement.textContent = ''
				log_clear()
			})
			log(button)
		}
		log_clear()
		//log(document.body.parentElement)
		//クリックして、通信してページ開かずURLゲットが目標
		// document.addEventListener('click', function(e){
		// 	e.preventDefault();
		// }, false);

		//altクリック、中クリックにイベント仕込もうと思ったけど、ホイールスクロール表示されて困って止めた。
		document.addEventListener('click', function(ev) {
			do {
				if (!ev.altKey) break
				//log(e.buttons, e.button, e.target.tagName, e.target.rel)
				//Aが大文字な謎
				if (ev.target.tagName == 'A' && ev.target.rel == 'bookmark') {
					ev.preventDefault();
					log('これじゃ' + ev.target.innerHTML)
					_GM_xhr(ev.target.href, ev.target.innerHTML)
				}
			} while (false)
		}, false);

		// 右クリックも作ってみる
		document.addEventListener('contextmenu', function(ev) {
			log(ev.shiftKey)
			if (ev.target.tagName == 'A' &&
				ev.target.rel == 'bookmark' &&
				ev.shiftKey === false) {
				ev.preventDefault();
				log('◆これじゃ◆' + ev.target.innerHTML)
				ev.altKey
					? _GM_xhr(ev.target.href, ev.target.innerHTML)
					: _js_xhr(ev.target.href, ev.target.innerHTML)
			}
		}, false);

		const _GM_xhr = function(url, title) {
			log('_GM_xhr')
			GM_xmlhttpRequest({
				method: 'GET',
				url: url,//'http://localhost:8888',
				onload: function(resp) {
					console.log(resp);

					let text = resp.responseText
					// zipにレスポンスデータを追加
					//console.log(xhr.response);
					_kai_view(text, title)
				},
				onerror: function(response) {
					console.log(response.responseText);
				},
			});
		}
		//素のxhrも書いてみてる、途中
		const _js_xhr = function(url, title) {
			log('js_xhr')
			// オリジナル画像を読み込む
			let xhr = new XMLHttpRequest();
			xhr.open('GET', url, true);
			//xhr.responseType = 'text';
			console.log(555)
			// xhr.addEventListener('load', function() {});
			xhr.onload = function() {
				let text = xhr.response
				// zipにレスポンスデータを追加
				//console.log(xhr.response);
				_kai_view(text, title)
			};
			xhr.send()
			console.log(1212)
		}
		const make_links = function(arr, title) {
			//let els = arr
			title = title.replace(/\//g, '@スラ').replace(/.zip|.rar|\//, '');
			title = mydate('@yyyyMMddhhmmss-') + title
			let rel = 'rel="noreferrer" '
			let hrefs = '';
			for (let val of arr) {
				hrefs += `<a href="${val}" ${rel}title="${title}">a</a> `;
			}
			return hrefs
		}
		function text_kaiseki(text, title) {
			let _text = text
			let arr_url = _text.match(/"https:\/\/r18\.dawn.+?"/g)
			if (!arr_url) {
				log('みっかんない')
				return
			}
			arr_url = arr_url.map((ite) => ite.slice(1, -1)) //resu.mapなんてプロパティ無いとエラー、matchがNULLだった。
			//console.log(resu)
			//let resu = resp.responseText.match(/(?<=")https:\/\/r18\.dawn.+?(?=")/g)
			//↑の正規表現がfirefox tamper でSyntaxエラー

			return arr_url
		}
		/**
		 * 解析＋表示
		 * @param {*} text 
		 * @param {*} title 
		 */
		const _kai_view = function(text, title) {
			let url_arr = text_kaiseki(text)
			let html = make_links(url_arr, title)
			console.log(html)
			log(html)
		}
		//test用
		//_js_xhr('https://manga314.com/c79-galaxist-blade-%e9%9b%b7%e7%b1%a0-%e3%83%84%e3%83%81%e3%83%8e%e3%82%ab%e3%82%b4-%e9%ad%94%e6%b3%95%e5%b0%91%e5%a5%b3%e3%83%aa%e3%83%aa%e3%82%ab%e3%83%ab%e3%81%aa%e3%81%ae%e3%81%af', 'asdf')


		function saku() {//画像のリンクを作る
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
			log(hrefs)

			//専用の枠に表示
			let waku_id = 'wakuwaku'
			// console.log(document.getElementById(waku_id))
			if (document.getElementById(waku_id) === null) {
				let waku = document.body.appendChild(Object.assign(document.createElement('div'), {
					id: waku_id,
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
						//log(this, e)
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
						//log(this, e)
						e.target.select()
						document.execCommand('copy')
					},
				}));
				let base = waku.appendChild(Object.assign(document.createElement('div'), {
					id: 'hoge23',
					title: 'tttttt',
					onclick: function(e) {
						log(this, e)
						e.target.select(0, e.target.length)
					},
					style: `
				border: 2px solid gray;						
			`,
				}));
				//base.textContent = urls
				base.innerHTML = hrefs;
			}
		}

	})
	//過去の残骸////////////////////////
	x(0, 'サークルKクーポン', ['^https://www.circleksunkus.jp/mypage/coupon/index.html'], async function() {
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
		//log('t1', this);
		mkEle(base, 'button', {
			textContent: 'josn書き出し',
			onclick: () => { //アロー関数定義でthis固定
				log(this, this.tA);
				tA.textContent = kuponKaiseki()
			},
		});
		mkEle(base, 'button', {
			textContent: 'josn読み込み',
			onclick: (event) => {
				const obj = JSON.parse(tA.textContent);
				log(obj);
				for (let key in obj) if (obj.hasOwnProperty(key)) {
					log(key + ':' + obj[key]);
					mkEle(base, 'button', {
						textContent: key,
						onclick: () => {
							log(obj[key]);
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
	})
	x(0, 'サークルKスロット', ['^https?://app.circleksunkus.jp/slot_top.php'], () => {document.querySelector('a[href*="slot"').click();},
	)
	xdo() //メイン
	ugoiteruka('#', 'sakujo')
	log(`${Date.now() - time}ms エラー無し##########################`);
})();

/*
2019/11/12 function をconst リテラルで書くと、変なとこから呼び出されて未定義エラー
実行が不規則なのが悪いんだけど。

2019/10/30 hoge=(obj.prop={}) //は作ったオブジェの参照がhogeとpropに入る。

条件付きconstはifに入れるとスコープ無理だから、三項演算子など式で代入する必要ある。
それでも無理なら即時関数＋returnで。

user.jsでドメイン超えて、セッションID的なものが欲しい、クリックループを防ぐことができるし。
historyは無理、リファラーでURLにハッシュでTIMEくっつければできそうだけど、URL汚すのは嫌や。
Cookieかローカルストレージを調べてる。GM_*valueもできるけど、セッションIDは無理そう。

jsでCookie追加すると後ろに追加されていく。

2019/10/29 window.unsafeWindow Wがキャメルコートで途中からのは大文字なので注意。
// @grant none を指定してない場合。
log(window)をすると、window.unsafeWindow が見える。
コンソールからwindowすると｛parent Window〜 alertでunsafeWindowが無い、これが本当のwindow
偽物→window.unsafWindow←本物を一時避難
//gmが終わったから？本物→偽物と上書きされ、unsafwindowが消える。

スクリプトでwindow.)unsafeWindow.hoge←などプロパティに書くと、
戻されたあとは、window.)hogeになる。

user.jsが最後まで達すると？window = window.unsafeWindow となる。unが元々のwin。
GM_関数はコンソールからは使えないが、定義済み関数からは使える。

2019/10/29 セミコロン省略すると変なとこで詰まる。次の行が()スタートだと関数実行とみなされる。

2019/10/29 importをすると、exp以外もすべて一回実行する。

2019/10/24 ブロックでスコープが見つからない。
if (1) {
	const a = 0
}
else {
	const a = 1
}
log(a)


2019/10/24 #js onclick=functionが正解,onclick=()=>は駄目ぽ。
element.onclick()と呼ばれるので、アロー関数だとthisがwindowになってしまう。

2019/10/24 #js insertAdjacentText("beforbegin","外側")、textContent+=より速いらしい。記憶。


2019/10/24 #js user.jsで戻った時に実行したくない、自動ジャンプだと戻れなくなるから。
	history.replaceで#hogeとつけることで、実行回避できた。
	location+=#hogeでもできる、ただ失敗するとこっちはループする危険もある。


2019/01/07
firefox greasemonkey で@require したらcacheが出来て更新できない。
拡張フォルダに作られるタイプで、cacheクリアとかほぼ無理
もう嫌だと、ローカル鯖にしよう
mac なら 公開したいフォルダに移動して python -m SimpleHTTPServer 8888
終了はC-c
http://localhost:8888/mypo.user.js
*/
