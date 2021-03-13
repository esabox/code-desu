/* eslint-disable max-len */
// ==UserScript==
// @name         mypo.user.js
// @namespace    miiya
// @updateURL    https://github.com/esabox/code-desu/raw/master/mypo.user.js
// @homepageURL  https://gist.github.com/esabox/8213a51ef2f1a6be4313ece316421762/edit
// @version 1.1.30200731
// @description  3aa山彦が鯉をやる気にさせなかったり夢の地下室の本当の予想。
// @author       山田一意太郎左衛門
// @include *
// @exclude     https://docs.google.com/*
// @exclude     https://mail.google.com/*
// @exclude     https://script.google.com/
// @grant	GM_registerMenuCommand
// @grant 	GM_getValue
// @grant 	GM_setValue
// @grant 	GM_deleteValue
// @grant 	GM_listValues
// @grant   GM_xmlhttpRequest
// @noframes
// ==/UserScript==
// @require       http://localhost:8888/lib/FileSaver.js
// @require       http://localhost:8888/lib/jszip.js
//
// 外したオプション
// @run-at document-start
// @updateURL    https://gist.github.com/esabox/8213a51ef2f1a6be4313ece316421762/raw/mypo.user.js
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
// import fm from 'http://localhost:8888/lib/FileSaver.js'
// import zm from 'http://localhost:8888/lib/jszip.js'



'use strict'
// $ = document.querySelector.bind(document)


//windowにネームスペースを作る、コンソールから使えるように。
//GM_だとwindowとunsafe(本体）を入れ替えたりするから、それ対応。ifで書いてたけど、ブロックスコープなのでconst使えるよう変更。
// @grant none にするとunsafeWindowは作られない。GM関数も使えない
//constつけてたが外す、同じものリロードする為。GMだと失敗するはず。
this.temp = (window.unsafeWindow)
	? (window.unsafeWindow.winNS = {})
	: (window.winNS = {})
//self reload userjsでサイトリロードしてデバッグは時間かかるから、scriptだけ追加で書き込み実行
//しかしgm関数やgm@reuireしたものは使えない、無名関数で囲まないと変数かぶって使えない。タイプモジュールならいける？
temp.srl = function() {
	document.body.appendChild(Object.assign(document.createElement('script'), {
		type: 'module',
		src: 'http://localhost:8888/mypo.user.js'
	}))
}
//const log = console["log"];


//便利関数
const qsaa = (s, o = document) => [...o.querySelectorAll(s)]
const qs = (s, o = document) => o.querySelector(s)
const log = console.log

let time = Date.now() //時間測定
// let nsMiiya = {} //オブジェクのプロパティは宣言しとかないとリファクタリングできない

/** el作成 parent無ければappendしない*/
function createEl(parentEl, tagName, prop = {}, style = {}) {
	let el = document.createElement(tagName)
	Object.assign(el, prop || {})
	Object.assign(el.style, style || {})
	if (parentEl)
		parentEl.appendChild(el)
	// const position = insert.position || 'beforeend'
	// insert.parentEl.insertAdjacentElement(position, el)
	return el
}

/** ボタンを作る*/
function make_button_elem(pElem, tag, obj, loca = 'beforeend') {
	let elem = document.createElement(tag)
	pElem.insertAdjacentElement(loca, elem) //appendChile
	elem = Object.assign(elem, obj)
	return elem
}

/** リンクhtmlElementを返す */
const create_href = function(url, text) {
	let a_elem = document.createElement('a')
	a_elem.href = url
	a_elem.textContent = text || url
	return a_elem
}

/** あればClick 
 * @param {String} selector -cssセレクタ 
 * */
function arebaCli(selector, anzen_sec = 3, is_href = false) {
	const el = document.querySelector(selector)

	if (el) {
		conDoW(`@arebaCli 有り ${selector}`)
		let title = document.title
		let countD_ms = anzen_sec * 1000
		let loop_ms = 1000
		!(function f() {
			if (countD_ms <= 0) {
				//clearTimeout(stoID)
				if (!is_href)
					el.click()
				else
					location.href = el.href
				return true
			} else {
				countD_ms -= loop_ms

				//conDoW(countD_ms);
				document.title = countD_ms / 1000 + title
				let stoID = setTimeout(f, loop_ms)
			}
		}())
		return true

	} else {
		conDoW('@arebaCli 無し ' + selector)
		return false
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
	// el.innerHTML += str
	if (sakujo) {


		(async () => {
			await sleep(3000)
			el.remove()
			// do something...
		})()
	}
}
const video_top_play = function(video_elem = null, query = 'video') {
	//let playerDiv = document.querySelector('#player-embed')

	let elem = (video_elem)
		? video_elem
		: document.querySelector(query)

	if (!elem) return //ネスト深くしないための脱出


	//
	//conDoW(1)
	conDoW(getButtonWithFunc('0deg', () => {
		Object.assign(elem.style, {
			transform: 'rotate(0deg)',
			width: '100vw',
			height: '100vh',
			top: '0',
			left: '0%',
			transformOrigin: '0 0',
		})
	}))
	conDoW.add(getButtonWithFunc('90deg', () => {
		Object.assign(elem.style, {
			transform: 'rotate(90deg)',
			width: '100vh',
			height: '100vw',
			left: '100%',
			top: '0',
			transformOrigin: '0% 0%',
		})
	}))
	conDoW.add(getButtonWithFunc('180deg', () => {
		Object.assign(elem.style, {
			transform: 'rotate(180deg)',
			width: '100vw',
			height: '100vh',
			top: '100vh',
			left: '100%',
			transformOrigin: '0 0',
		})
	}))
	conDoW.add(getButtonWithFunc('270deg', () => {
		Object.assign(elem.style, {
			transform: 'rotate(270deg)',
			width: '100vh',
			height: '100vw',
			left: '0%',
			top: '100vh',
			transformOrigin: '0% 0%',
		})
	}))





	// ページ内の位置、appendしない場合、窓サイズ変更したら崩れる。
	//出来そうだけど、イベント発火して、ゴリゴリ相対的に足していく必要ある。
	// const left = window.pageXOffset + elem.getBoundingClientRect().left
	// const top = window.pageYOffset + elem.getBoundingClientRect().top
	// conDoW([left, top])
	document.body.insertAdjacentElement('afterbegin', elem)
	Object.assign(elem.style, {
		width: '100vw',
		height: 'calc(100vh)',
		backgroundColor: 'black',
		overflow: 'hidden',
		transitionDuration: '0.5s',
		position: 'absolute',
		top: 0,
		left: 0,
	})
	Object.assign(document.body.style, {
		overflowY: 'overlay',//スクロールバー別レイヤー、画面幅に含まれなくなる
		overflowX: 'hidden',//必要か不明、x方向の飛び出しを無視
		marginTop: '100vh',//一画面分body上を開ける
	})
	//自動再生
	if (elem.tagName === 'VIDEO') {
		elem.preload = true //これが無いと始まらないぽい
		elem.autoplay = true  //こっちも同じようなもの
		elem.controls = true
		// const src = elem.src || elem.getElementsByTagName('source')[0].src //プロパティじゃない時もある
		const src = elem.src || qs('[src]', elem).src //プロパティじゃない時もある
		conDoW(create_href(src))
		//console.log(elem.children('source'))
		//elm.play()
	}
	window.scroll(0, 0)
	createEl(document.body, 'style', {
		innerHTML: `
						body::-webkit-scrollbar { width: 6px; }
						body::-webkit-scrollbar-thumb { background-color: #0005; }
						body::-webkit-scrollbar-track { background: transparent; }
						`})
	return
}
const cookie_view_del = function() {
	const cookie_view = () => {
		const logo = '🍪' //"🍪"
		conDoW(logo + document.cookie.replace(/; /g, '\n' + logo))
	}
	const count = function() {
		return document.cookie === ''
			? 0
			: document.cookie.split('; ').length
	}
	function deleteAll() {
		const cookies = document.cookie.split('; ')

		for (let cookie of cookies) {
			const index = cookie.indexOf('=')

			const name = ~index //~-1==0
				? cookie.substr(0, index)
				: cookie

			document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/'
		}

	}
	const panel = () => {
		//Cookie削除ボタン
		let btn1 = getButtonWithFunc('表示', () => {cookie_view()})
		//Cookie削除ボタン
		let btn = getButtonWithFunc('全削除', () => {deleteAll(); panel()})
		conDoW([`Cookie[${count()}] `, btn1, btn])
	}

	//main
	panel()
}

/**
 * @param {Array.<{selector: String, deco: Object}>} cssRules
 */
const create_css_without_css = function(...cssRules) {
	// log(aa, bb)
	// const css_id = 'adf'
	// let css_el = document.getElementById(css_id)
	// if (css_el === null) { }
	const css_el = document.createElement('style')
	// css_el.id = css_id
	document.body.appendChild(css_el)//appendしないとsheetにならない
	const sheet = css_el.sheet

	for (const v of cssRules) {
		sheet.insertRule(`${v.selector}{}`)
		Object.assign(sheet.cssRules[0].style, v.deco)
	}
	return css_el
}
// create_css_without_css(['a',12],{id:'as'})
//css作って書き込む、あれば追記
const create_css_without_css_old = function(css_id, css_text) {
	let css_el = document.getElementById(css_id)
	if (css_el === null) {
		css_el = document.createElement('style')
		css_el.id = css_id
		document.body.appendChild(css_el)
	}
	//textContent注入
	css_el.insertAdjacentText('beforeend', css_text)
	return css_el
}
/** Console display on website ウェブ上にConsole.logする、複数なら配列で 
 * @param {String} msg
 * @param {Array} msg
 * @param {Node} msg
*/
function conDoW(msg, opt = {addition: false}) {
	if (conDoW.main) return conDoW.main(msg, opt)
	const log = console.log
	let debug = true

	//GMあれば、設定を読み取る、無ければ終了
	if (window.GM) {
		let getConDowF = () => GM_getValue(getConDowF.name, false)
		let s = `${getConDowF.name}=${getConDowF()}`

		log('メニュー登録')
		GM_registerMenuCommand(s, function() {
			GM_setValue(getConDowF.name, !getConDowF())
		}, 'a')

		//表示の可否
		if (!getConDowF()) {return log('conDow非表示', msg)}
	}

	/** 追加用 */
	conDoW.add = function(msg) {
		write(msg, {addition: true})//なんでこれ動く？
	}
	/** 表示 */
	conDoW.disp = function(msg) {
		waku.style.display = 'block'
	}
	//書き込む
	/** 
	 * @param {array} msg - 書き込み内容
	 */
	const write = function(msg, opt = {addition: false}) {
		//同じ要素に書き込むかどうか
		let el = get_kakikomi_div(opt.addition)

		//引数が配列じゃないなら、配列にする。
		msg = Array.isArray(msg) ? msg : [msg]

		//例外、elemなら表示させる
		for (let [key, val] of Object.entries(msg)) {
			if (val instanceof HTMLElement) {
				//conDoW('is elm? ' + (val instanceof HTMLElement))
				// log_el.insertAdjacentElement('beforeend', val)
				el.appendChild(val)
			} else {
				if (key !== '0') val = ', ' + val //obj entr はstring
				const tn = document.createTextNode(val)
				el.appendChild(tn)
				// elem.insertAdjacentHTML('beforeend', val)
			}
		}
		//スクロール位置調整
		waku.scrollTop = waku.scrollHeight
	}
	/** ログクリア、 */
	const log_clear = function log_clear() {
		//console.log(wakuElm, this)
		let copyEl = waku.firstElementChild.cloneNode(true)
		waku.textContent = '' //shwdow挟んでると消えない
		waku.appendChild(copyEl)
	}
	/**初期化して基礎エレメントを作る 
		 * @return {Node} shadow Node
		*/
	function get_baseElem() {
		debug && log('get_baseElem')

		//style="all: initial;"
		const outerhtml = `<div id="div1desu" style="all:initial">
		<style>.kaki{color: black;
word-break: break-all;
overflow-wrap: break-word;
border-bottom: 1px solid rgb(153, 153, 153);
transform: none;}</style><div id="waku" style="box-shadow: rgba(0, 0, 0, 0.61) 0px 0px 5px 1px;background: linear-gradient(rgb(255, 255, 255) 0%, rgb(190, 204, 255) 100%);color: black;padding: 5px;position: fixed;right: 0px;bottom: 12px;font-size: small;overflow-x: auto;width: 300px;max-height: 90%;word-break: break-all;overflow-wrap: break-word;display: block;transition: all 1000ms ease-out 0s;"><div class="kaki"><button class="BWF">👏ログ非表示</button><button class="BWF">🍌消さない</button><button class="BWF">🎓ログクリア</button></div><div class="kaki">
2021/3/10 16:50:11</div><div class="kaki">6ms main ##########################</div><div class="kaki">@version 2019.11.16.113733</div><div class="kaki">全部b $$$$$$$$$$$$$$$$$$$</div><div class="kaki"><div style="background-color: red; font-size: 1em;">移動</div></div><div class="kaki"><button class="BWF">🍪Utility</button></div><div class="kaki"><button class="BWF">👛stopJump</button><button class="BWF">👹copyTitleLfUrl</button><button class="BWF">🎪copyLinkAsMarkdown</button></div><div class="kaki">localhostとfile:/// $$$$$$$$$$$$$$$$$$$</div><div class="kaki">はじめまして！</div><div class="kaki">history.length</div><div class="kaki">9ms エラー無し##########################</div></div><div style="background-color: #F005;position: fixed;right: 0;bottom: 0;width: 1em;height: 1em;z-index: 1000;" id="mouse"></div>
	</div>`
		const tmp = document.createElement('div')
		tmp.innerHTML = outerhtml
		let baseEl = tmp.children[0]
		// parentEl.style.all = 'initial' //二重にして外側ブロックで初期化すると、全部リセット。車道ひつようないぽ。
		debug && log(baseEl)
		document.body.appendChild(baseEl)
		// log(baseEl)
		//shadowroot挟む
		// const shadowroot = parentEl.attachShadow({mode: 'open'})
		// parentEl = shadowroot
		return baseEl
	}

	function get_kakikomi_div(add) {
		if (add) return waku.lastElementChild
		let el = kakidiv.cloneNode()
		waku.appendChild(el)
		return el
	}


	const baseEl = get_baseElem()
	const waku = baseEl.querySelector('#waku')
	const kakidiv = baseEl.querySelector('.kaki').cloneNode()

	//style

	// waku.style.visibility = 'hidden' //初期透過
	waku.style.display = 'none'
	//イベント
	{
		//フォーカス受けない
		baseEl.onmousedown = function(ev) {
			ev.preventDefault()
			// return false
		}
		baseEl.querySelector('#mouse').onmouseenter = function(e) {
			// waku.style = {...waku.style,visibility: 'visible'}
			// Object.assign(waku.style, {visibility: 'visible'})
			// waku.style.visibility = 'visible'
			waku.style.display = 'block' //初期透過
		}
		waku.onmouseleave = function() {
			// waku.style.visibility = 'hidden' //初期透過
			waku.style.display = 'none' //初期透過

		}
	}

	//テンプレの中身を更地にする
	{waku.textContent = null}

	//追加の初期化、ボタンを追加
	{
		//非表示ボタン
		const button1 = getButtonWithFunc('ログ非表示', () => {GM_setValue(flag_name, false)})

		//消さないボタン
		const button2 = getButtonWithFunc('消さない', (e) => {
			waku.onmouseleave = null
			waku.onclick = null
		})

		const button = getButtonWithFunc('ログクリア', function(e) {
			log_clear()
		})
		write([button1, button2, button])
		// write(1)
	}


	conDoW.main = write
	// conDoW.main = (msg) => write(msg)
	return conDoW.main(msg, opt)
}

/**日付関数 yyyy-MM-dd hh:mm:ss	 */
function mydate(format, zerofill = 1) {
	let date = new Date()
	let hi = {}
	//初期設定
	format = format || 'yyyy-MM-dd hh:mm:ss'
	hi.yyyy = date.getFullYear()
	hi.MM = date.getMonth() + 1
	hi.dd = date.getDate()
	hi.hh = date.getHours()
	hi.mm = date.getMinutes()
	hi.ss = date.getSeconds()
	for (let key in hi) {
		if (key !== 'yyyy' && zerofill) {
			hi[key] = ('0' + hi[key]).slice(-2) //ゼロうめ
		}
		format = format.replace(key, hi[key]) //フォーマット文字を置換
	}
	return format
}
// 操作画面を作る・2016年ごろ作った？古い左下の青っぽいGUI
const hogehogehoge = function() {
	let elementId = 'miiyabase'
	// 既にあればリターン
	let baseC = document.getElementById(elementId)
	if (baseC) {return baseC};

	//css 変数名がdomと違うから注意
	//cssを作る、汚いから後で直す
	let styElem = returnMyCss()
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
		`)

	const base = make_button_elem(document.body, 'div', {
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
			//conDoW(e.target, e.relatedTarget, this, "mouse over");
			//baseC.style = "display:block;"; //初期化される
			baseC.style.display = 'block'
		},
		onmouseleave: (event) => {
			baseC.style.display = 'none'
		},
	})

	//メインの要素、これを返す
	baseC = make_button_elem(base, 'div', {
		style: 'width:300px;display:none',
		//style:'width:300px',
	})
	make_button_elem(baseC, 'button', {
		textContent: 'はっげ',
		onclick: () => conDoW('えむ'),
	})
	make_button_elem(baseC, 'span', {
		textContent: 'v' + ver,
		tyle: {fontSize: '8px'},
	})
	make_button_elem(baseC, 'button', {
		textContent: '上下',
		// style:{cssText:'all: initial;'},
		onclick: function() {
			this.f = this.f ? 0 : 1
			if (!this.f) {
				// this.textContent = '下';
				this.parentNode.style.bottom = 0
				this.parentNode.style.top = ''
			} else {
				// this.textContent = '上';
				this.parentNode.style.bottom = ''
				this.parentNode.style.top = '0'
			}
		},
	})
	make_button_elem(baseC, 'button', {
		textContent: '←→',
		// style:{cssText:'all: initial;'},
		onclick: function() {
			this.f = this.f ? 0 : 1
			if (!this.f) {
				this.textContent = '←→'
				this.parentNode.style.left = 0
				this.parentNode.style.right = ''
			} else {
				this.textContent = '←→'
				this.parentNode.style.left = ''
				this.parentNode.style.right = '0'
			}
		},
	})
	make_button_elem(baseC, 'button', {
		textContent: 'いーなびボタン',
		// style:{cssText:'all: initial;'},
		onclick: nsMiiya.fnc2,
	})
	make_button_elem(baseC, 'button', {
		textContent: '最小化2',
		// style:{cssText:'all: initial;'},
		onclick: function() {
			this.parentNode.style.with = '300px'
			this.parentNode.style.display = 'none'
			nsMiiya.aloging('saisho')
		},
	})
	make_button_elem(base, 'button', {
		textContent: '更新',
		type: 'button',
		onclick: function(event) {
			location.reload()
		},
	})
	make_button_elem(baseC, 'button', {
		textContent: '楽天毎日くじ',
		type: 'button',
		onclick: (event) => {
			//alert(GM_getValue("raku"));
			maiKuji(1)
			// GM_setValue("毎日くじ次へ", 1);
			// location.href = "http://www.rakuten.co.jp/";
			// //http://www.rakuten.co.jp/?l-id=header_global_logo
			// //http://www.rakuten.co.jp/?l2-id=shop_header_logo
		},
	})
	make_button_elem(baseC, 'button', {
		textContent: 'GM_変数追加',
		type: 'button',
		onclick: (event) => {
			let rand = Math.floor(Math.random() * 10)
			GM_setValue('日本語' + rand, '阿吽' + rand)
		},
	})
	make_button_elem(baseC, 'button', {
		textContent: 'GM_変数表示',
		type: 'button',
		onclick: (event) => {
			let vals = []
			let ob = {}
			for (let key of GM_listValues()) { //for of は実体を返す
				//conDoW(key)
				vals.push(GM_getValue(key))
				ob[key] = GM_getValue(key)
			}
			//conDoW(vals);
			conDoW(ob)
			//console.table(ob)
			//conDoW(GM_listValues());
		},
	})
	make_button_elem(baseC, 'button', {
		textContent: '小さくなる',
		// style:'all: initial;',
		// style: 'height:30px',
		// onclick:e=>{conDoW(this);this.style.height="11px";},
		onclick: function() {
			conDoW(this); this.style.height = parseInt(this.style.height) - 1 + 'px'
		},
		//e=>{},
	})
	make_button_elem(baseC, 'button', {
		textContent: 'UA・Referer',
		onclick: function() {
			/**
			 * userAgentをハックする
			 */
			const changeUserAgent = (ua) => {
				// Chrome, fx, IE11
				window.navigator.__defineGetter__('userAgent', () => ua)
				// Safari
				try {
					// fxでsetterがないとエラーになるので
					window.navigator = {
						get userAgent() {
							return ua
						}
					}
				} catch (e) { }
			}
			//changeUserAgent('Mozilla/5.0 (Macintosh; ...');
			conDoW(window.navigator.userAgent)
			conDoW(document.referrer)
		},
		//e=>{},
	})
	// logを表示する場所
	const logDisp = make_button_elem(baseC, 'div', {
		id: 'miiyalog',
		textContent: '',
		style: 'height:200px;overflow-y:  scroll;     height: 100px;  /*background-color: #CCF; */ border-style: ridge;',
	})
	nsMiiya.aloging = function(s, kai = 1, num = 1) {
		// conDoW("miiya log->"+s);
		// nsMiiya.alogingDisp.textContent+="\n"+s;
		// s=""+nsMiiya.aloging.count+s;
		nsMiiya.aloging.count = nsMiiya.aloging.count ? nsMiiya.aloging.count + 1 : 1
		s = '[' + nsMiiya.aloging.count + '] ' + s
		if (kai) {
			s += '<br />'
		}
		logDisp.innerHTML += s
		logDisp.scrollTop = logDisp.scrollHeight
		logDisp.scrollLeft = logDisp.scrollWidth
	}
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
			let el = okinis[key]
			if (el[1] === undefined || el[1] === '') {
				// let a = (new URL(location.href)).hostname.split('.')[0]
				// a.hostname.split('.')[0]
				el[1] = (new URL(el[0])).hostname.split('.')[0]
			}
			make_button_elem(elem, 'a', {href: okinis[key][0], target: '_blank', textContent: okinis[key][1] || 'hoge'})
		}
	}
	okiniButton(baseC)
	return baseC
}
/**GM valueを全部
 * ネームスペース単位じゃなくインストールスクリプトで分けられてるぽい
 */
function gmValuesAll() {
	let vals = []
	let ob = {}
	for (let key of GM_listValues()) { //for of は実体を返す
		//conDoW(key)
		vals.push(GM_getValue(key))
		ob[key] = GM_getValue(key)
	}
	return ob
}
/** * 毎日くじ */
function maiKuji(start) {
	let mai = '毎日くじ次へ'
	conDoW('maiKuji実行')
	conDoW(mai, GM_getValue(mai))
	//gmValuesAll();
	if (start) {
		conDoW('変数セット', start)
		GM_setValue(mai, start) //スタート書き換え
		//conDoW(mai, GM_getValue(mai));
	}
	let ima = GM_getValue(mai)
	if (!ima) {
		conDoW('枚にくじima無し、抜ける', ima)
		return false
	}
	switch (ima) {
		case 1:
			conDoW('case', ima)
			GM_setValue(mai, ima + 1)
			location.href = 'http://www.rakuten.co.jp/'
			break
		case 2:
			conDoW('case', ima)
			if (location.href === 'http://www.rakuten.co.jp/') {
				GM_setValue(mai, ima + 1)
				list.楽天系の毎日くじ.rakuTop2kuji()
			}
			break
		case 3:
			conDoW('case', ima)
			if (location.href.match('https://kuji.rakuten.co.jp/.+/.+')) {
				GM_setValue(mai, ima + 1)
				location.href = 'https://www.infoseek.co.jp/Luckylot'
			}
			break
		default: break
		//location.href = 'https://www.infoseek.co.jp/Luckylot';
		//http://www.rakuten.co.jp/?l2-id=shop_header_logo
	}
	conDoW('まいくじ終わり', mai, GM_getValue(mai))
}
/**毎日くじ作り直し * @param */
function maiJump(flagEdit) {
	const name = '毎日ジャンプ'
	const debug = true
	debug && conDoW(name + 'start')
	//フラグを書き込む
	if (flagEdit === 1) {
		debug && conDoW(name + 'フラグを作る')
		GM_setValue(name, 1)
	} else if (flagEdit === 0) {
		debug && conDoW(name + 'フラグを削除')
		GM_deleteValue(name)
	}
	//フラグが無ければ抜ける
	if (!GM_getValue(name)) {
		return false
	}
	const arr = [
		'https://kuji.rakuten.co.jp/.+/.+',
		'https://www.infoseek.co.jp/Luckylot'
	]
	debug && conDoW(name + 'end')
	//今いるURLから次にジャンプする、
	//ジャンプ実行フラグがついてなければ抜ける
}
const getButtonWithFunc_old = function(text, func) {
	// const css_ClassName = 'button_tukuru'
	// const css_id = 'button_tukuru_css'

	// //css無ければ作る
	// let css_el = document.getElementById(css_id)
	// if (css_el === null) {
	//     css_el = document.createElement('style')
	//     css_el.id = css_id
	//     document.head.appendChild(css_el)
	//     css_el.textContent = ([
	//         `
	// 			.${css_ClassName}{
	// 				margin: 2px;
	// 				box-shadow: 1px 2px 3px grey;
	// 				padding: 1px;
	// 				/* font-size: initial; */
	// 				border-width: thin;
	// 			}
	// 		`
	//     ])[0]
	// }
	//ボタン作る,cssクラスで見た目を変えたが、インラインに変更、shadowにも対応出来る
	const el = document.createElement('button')
	Object.assign(el.style, {
		margin: '2px',
		boxShadow: '1px 2px 3px grey',
		padding: '1px',
		/* fontSize: 'initial',*/
		borderWidth: 'thin',
	})
	el.textContent = uo.emoji_rand() + text
	// el.className = css_ClassName
	//el_a.type = 'button'
	el.addEventListener('click', function name(ev) {
		ev.stopPropagation()
		ev.preventDefault()
		//func(e) //thisが伝わらない,引数側を、アロー関数にすりゃいい？駄目だった。
		func.call(this, ev)
		//!(func.bind(this, e))() //無名関数で動かなかったのはセミコロンなかったからや。
		//!(func.bind(this))(e) //これは挙動おかしい
	}, false)
	return el
}
/** ボタン作る */
const getButtonWithFunc = function(param1, param2) {
	// const callback, text
	const [callback, text] = (typeof param1 === 'function')
		? [param1, param1.name]
		: [param2, param1]

	const className = 'BWF'
	const css_id = 'BWFcss'
	if (getButtonWithFunc.init === undefined) {
		getButtonWithFunc.init = true
		log('BWF初期化')
		create_css_without_css(
			{
				selector: `.${className}`,
				deco: {
					height: '2em',
					borderRadius: '5px',
					background: 'linear-gradient(#ffffff 50%, #beccff 100%)',
					textShadow: '1px 1px 1px rgb(255 255 255 / 66%)',
					boxShadow: '1px 1px 2px rgb(0 0 0 / 63%)',
					borderWidth: 'thin',
					margin: '2px',
				}
			},
			{
				selector: `.${className}:active`,
				deco: {transform: 'translateY(2px)', }
			}
		)
	}
	// console.log(text, Boolean(text), callback.name)
	// if (!text) text = callback.name

	// //css無ければ作る
	// let css_el = document.getElementById(css_id)
	// if (css_el === null) {
	// 	css_el = document.createElement('style')
	// 	css_el.id = css_id
	// 	document.body.appendChild(css_el)
	// 	// css_el.textContent = `
	// 	// 	.${className}{
	// 	// 		/*margin: 2px;
	// 	// 		box-shadow: 1px 2px 3px grey;
	// 	// 		padding: 1px;
	// 	// 		border-width: thin;*/

	// 	// 		height: 2em;
	// 	// 		border-radius: 5px;
	// 	// 		background: linear-gradient(#ffffff 50%, #beccff 100%);
	// 	// 		text-shadow: 1px 1px 1px rgb(255 255 255 / 66%);
	// 	// 		box-shadow: 1px 1px 2px rgb(0 0 0 / 63%);
	// 	// 		border-width: thin;
	// 	// 		margin: 2px;
	// 	// 	}
	// 	// 	.${className}:active { transform: translateY(2px); }`
	// 	const sheet = css_el.sheet
	// 	sheet.insertRule(`.${className}{}`)
	// 	// const deco=sheet.cssRules[0].style
	// 	Object.assign(sheet.cssRules[0].style, {
	// 		height: '2em',
	// 		borderRadius: '5px',
	// 		background: 'linear-gradient(#ffffff 50%, #beccff 100%)',
	// 		textShadow: '1px 1px 1px rgb(255 255 255 / 66%)',
	// 		boxShadow: '1px 1px 2px rgb(0 0 0 / 63%)',
	// 		borderWidth: 'thin',
	// 		margin: '2px',
	// 	})
	// 	sheet.insertRule(`.${className}:active{}`)
	// 	Object.assign(sheet.cssRules[0].style, {
	// 		transform: 'translateY(2px)',
	// 	})
	// 	// const stylesheet = document.styleSheets[1];
	// 	// let boxParaRule;

	// 	// for (let i = 0; i < stylesheet.cssRules.length; i++) {
	// 	// 	if (stylesheet.cssRules[i].selectorText === '.box p') {
	// 	// 		boxParaRule = stylesheet.cssRules[i];
	// 	// 	}
	// 	// }
	// }
	//ボタン作る,cssクラスで見た目を変えたが、インラインに変更、shadowにも対応出来る
	const el = document.createElement('button')
	// Object.assign(el.style, {
	// 	margin: '2px',
	// 	boxShadow: '1px 2px 3px grey',
	// 	padding: '1px',
	// 	/* fontSize: 'initial',*/
	// 	borderWidth: 'thin',
	// })
	el.textContent = uo.emoji_rand() + text
	el.className = className
	el.addEventListener('click', function name(ev) {
		ev.preventDefault()
		// ev.stopPropagation()
		//func(e) //thisが伝わらない,引数側を、アロー関数にすりゃいい？駄目だった。
		let result = callback()//別にevもthisもいらんなあ
		if (result !== undefined) conDoW(result)
		// callback.call(this, ev)
		//!(func.bind(this, e))() //無名関数で動かなかったのはセミコロンなかったからや。
		//!(func.bind(this))(e) //これは挙動おかしい
		return false
	}, false)
	return el
}

/** utility obj 関数つまってる感じ */
const uo = {
	選択テキスト検索ボタン(fmt = '/?s=%word%') {
		const elID = 'aaa'
		document.addEventListener('click', function(ev) {
			const sel0 = window.getSelection()
			const str = sel0.toString()

			//前に作ったやつ、あれば削除
			const el = qs('#' + elID)
			if (el) el.remove()

			//選択なければ終了
			if (str === '') {return }

			// sel0.removeAllRanges() //選択できないとうぜー
			const origin = new URL(location.href).origin

			// try {
			//     qs('#aaa').remove()
			// } catch (error) {}

			//作る
			createEl(document.body, 'a',
				{
					textContent: str,
					// href: origin + '/?s=' + str,
					href: origin + fmt.replace('%word%', str),
					//target: '_blank',
					id: elID,
					onmouseup: function(ev) {ev.stopPropagation()}
				},
				{
					position: 'absolute', zIndex: '99', top: ev.pageY + 20 + 'px', left: ev.pageX + 'px',
					backgroundColor: '#FFF',
					border: 'ridge 0.5em #FAA',
					borderRadius: '5em',
					padding: '0.5em',
				}
			)
			conDoW([str, ev.buttons, ev.button])
		}, false)
	},
	/** ドラッグ移動 */
	移動パネル2() {
		let ball = createEl(undefined, 'div', {
			textContent: '移動',
			onclick: function(ev) {
				ev.stopPropagation()
			},

		}, {
			backgroundColor: 'red',
			fontSize: '1em',
		})
		ball.onmousedown = function(event) { // (1) 処理を開始
			event.preventDefault() //focus移動しないように

			// const waku=document.querySelector('#waku') //Shadowなので無理
			const waku = ball.parentElement.parentElement
			// (2) 移動のための準備: absolute にし、z-index でトップにする

			let shiftX = event.clientX - waku.getBoundingClientRect().left
			let shiftY = event.clientY - waku.getBoundingClientRect().top

			waku.style.position = 'absolute'
			waku.style.zIndex = 1000
			// 現在の親から body へ直接移動させ、body に対して相対配置をする
			//document.body.append(ball)
			// ...そしてその絶対配置されたボールをカーソルの下に置く

			moveAt(event.pageX, event.pageY)

			// ボールを（pageX、pageY）座標の中心に置く
			function moveAt(pageX, pageY) {
				waku.style.left = pageX - shiftX + 'px'
				waku.style.top = pageY - shiftY + 'px'
			}

			function onMouseMove(event) {
				moveAt(event.pageX, event.pageY)
			}

			// (3) mousemove でボールを移動する
			document.addEventListener('mousemove', onMouseMove)

			// (4) ボールをドロップする。不要なハンドラを削除する
			ball.onmouseup = function(ev) {
				ev.stopPropagation()
				document.removeEventListener('mousemove', onMouseMove)
				ball.onmouseup = null
			}

		}
		return ball
	},
	/** タッチパネルを作る */
	入力パネル() {
		let div = document.createElement('div')
		div.style.fontSize = '5em'
		div.style.fontFamily = 'monospace'
		// let mojiban = [1, 2, 3, null, 4, 5, 6, null, 7, 8, 9, null, 0]
		let mojiban = [1, 2, 3, 4, 5, null, 6, 7, 8, 9, 0]
		//mojiban.forEach(v => {})
		//for (let i = 0, l = mojiban.length; i < l; i++) {
		for (let [key, val] of mojiban.entries()) {
			if (val === null) {
				div.appendChild(document.createElement('br'))
				continue
			}
			const elem = document.createElement('button')
			elem.textContent = val
			//elem.href = i //これがあるとリンク下線つく
			elem.style.fontSize = 'inherit'

			elem.onclick = function(ev) {
				ev.stopPropagation()
				ev.preventDefault()
				//conDoW.add(this.textContent)
				const elem = document.activeElement
				elem.value += this.textContent
			}
			elem.onmousedown = ev => ev.preventDefault() //focus移動しないように
			div.appendChild(elem)
		}
		return div
	},
	タブを開く(str = 'aaa') {
		const popwin = window.open()
		popwin.document.body.innerHTML = str
	},
	タブを開くインライン(str = 'だふぉ') {
		createEl(document.body, 'script', {
			textContent: `window.open().document.body.innerHTML = "${str}"`
		})
	},
	通知2() {
		setTimeout(function() {
			Notification
				.requestPermission()
				.then(function() {
					var notification = new Notification('Hello, world!')
				})
		}, 3000)
	},
	通知(msg = '通知です') {
		Notification.requestPermission().then(() => new Notification(msg))
	},
	copyTitleLfUrl() {
		let url = decodeURI(location.href).replaceAll(' ', '+')
		return uo.copy(`${document.title}\n${url}`)
	},
	copyLinkAsMarkdown() {
		let url = decodeURI(location.href).replaceAll(' ', '+')

		return uo.copy(`[${document.title}](${url})`)
	},
	copy_string_for_cookie_settings() {
		const domain = location.host.split('.').reverse().reduce((acc, v) => acc.length < 6 ? v + '.' + acc : acc)
		return uo.copy(`[*.]${domain}`)
	},
	copy(str) {
		function copyText(text) {
			var ta = document.createElement('textarea')
			ta.value = text
			document.body.appendChild(ta)
			ta.select()
			document.execCommand('copy')
			ta.remove()
			// ta.parentElement.removeChild(ta)
		}

		if (navigator.clipboard)
			//httpsのみ
			navigator.clipboard.writeText(str).then(
				function() {console.log('copy')},
				function() {alert('failed to copy')}
			)
		else {copyText(str)}
		return str
	},
	stopJump() {
		window.onbeforeunload = function(event) {event.returnValue = '？'}
	},
	sound(type='sine', sec=0.5) {
		const ctx = new AudioContext()
		const osc = ctx.createOscillator()
		osc.type = type
		osc.connect(ctx.destination)
		osc.start()
		osc.stop(sec)
		// sound("sine", 0.3)
	},
	/** xpath表示、ネットコピペ改変 */
	xpath_finder() {
		var doc = document
		function create(target, tagName, attr = {}, style = {}) {
			const el = document.createElement(tagName)
			for (const [key, val] of Object.entries(attr)) {
				el.setAttribute(key, val)
				// el[key]=val
			}
			for (const [key, val] of Object.entries(style)) {
				el.style[key] = val
			}
			target.appendChild(el)
			return el
		}
		function create(parentEl, tagName, prop = {}, style = {}) {
			let el = document.createElement(tagName)
			Object.assign(el, prop || {})
			Object.assign(el.style, style || {})
			parentEl.appendChild(el)
			return el
		}
		/**/
		var searchForm, text, numberMatched, overlayContainer
		var overlays = []
		// function getElmPosition(elm) {
		//     var left = 0
		//     var top = 0
		//     while (elm.offsetParent) {
		//         left += elm.offsetLeft
		//         top += elm.offsetTop
		//         elm = elm.offsetParent
		//     }
		//     return {
		//         'left': left, 'top': top
		//     }
		// }
		function getElmPosition(elm) {
			var left = 0
			var top = 0
			var clientRect = elm.getBoundingClientRect()
			// ページ内の位置
			var left = window.pageXOffset + clientRect.left
			var top = window.pageYOffset + clientRect.top
			return {'left': left, 'top': top}
		}

		function selectByXPath(xpath) {
			try {
				return doc.evaluate(xpath, doc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null)
			}
			catch (e) {return null}
		}
		function removeOld() {
			if (overlays.length > 0) {
				for (var a = 0; a < overlays.length; a++) {
					var elem2 = overlays[a]
					if (elem2.parentNode) {
						elem2.parentNode.removeChild(elem2)
					}
				}
			}
		}
		function highlightElements(result) {
			if (result === null) {
				numberMatched.innerHTML = 'invalid'
				return
			}
			else
				if (result.snapshotLength <= 0) {
					numberMatched.innerHTML = 'not matched'
					return
				}
			numberMatched.innerHTML = result.snapshotLength
			for (var a = 0, l = result.snapshotLength; a < l; a++) {
				var elem = result.snapshotItem(a)
				var pos = getElmPosition(elem)
				var borderWidth = 2
				var overlay = create(overlayContainer, 'div', undefined, {position: 'absolute', border: 'solid red', borderWidth: borderWidth + 'px', left: (pos.left - borderWidth) + 'px', top: (pos.top - borderWidth) + 'px', width: elem.offsetWidth + 'px', height: elem.offsetHeight + 'px', opacity: '0.5'})
				create(overlay, 'div', undefined, {border: 'solid 1px', borderColor: '#fff #000 #000 #fff', width: (elem.offsetWidth - 2) + 'px', height: (elem.offsetHeight - 2) + 'px'})
				overlays.push(overlay)
			}
		}
		function refresh() {
			removeOld()
			highlightElements(selectByXPath(text.value))
		}
		/**/
		searchForm = create(doc.body, 'div', undefined, {position: 'fixed', left: '0', top: '0', zIndex: '1000'})
		text = create(searchForm, 'input', {value: '//'}, {width: '300px'})
		// text = create(searchForm, 'input', {value: '//'}, {width: '300px'})
		text.focus()
		numberMatched = create(searchForm, 'span', {'innerHTML': 100}, {background: '#fff', color: '#000', border: 'solid 1px #888'})
		overlayContainer = create(doc.body, 'div', undefined, {zIndex: '1000', position: 'absolute', left: '0', top: '0'})      /**/
		var refreshTimer = null
		text.addEventListener('keydown', function() {
			if (refreshTimer) {
				clearTimeout(refreshTimer)
			}
			refreshTimer = setTimeout(refresh, 500)
		}, false)

	},
	uo全部ボタン化() {
		conDoW(Object.values(uo).map(v => getButtonWithFunc(v)))
	},
	google_url_simple() {
		const obj = [...new URLSearchParams(location.search).entries()]
			.reduce((obj, e) => ({...obj, [e[0]]: e[1]}), {})
		let url = location.origin + location.pathname + '?q=' + obj.q
		url = decodeURI(url).replaceAll(' ', '+')
		location.href = url
		return url
	},
	//ランダムなEmojiを返す
	emoji_rand() {
		//大部分コピペ、数字の範囲は文字コードを整数化したやつ。
		const rand_mm = (min, max) => Math.floor(Math.random() * (max + 1 - min)) + min
		const emojiCode = Math.random(10) > 7.75 ? rand_mm(128512, 128592) : rand_mm(127744, 128318)
		return String.fromCodePoint(emojiCode)
	},
	a() { },
}

function utility() {
	function fn_localStorage() {
		let count = `localStorage[${localStorage.length}]`
		let btn = getButtonWithFunc('clera', () => {localStorage.clear()})
		//og(btn)
		let btn2 = getButtonWithFunc('view all', () => {
			let str = ''
			for (let [key, value] of Object.entries(localStorage)) {
				str += (`${key}: ${value}\n`)
			}
			conDoW(str)
		})
		conDoW([count, btn, btn2])
	}
	fn_localStorage()
	function fn_sessionStorage() {
		let count = `sessionStorage[${sessionStorage.length}]`
		let btn = getButtonWithFunc('clera', () => {sessionStorage.clear()})
		//og(btn)
		let btn2 = getButtonWithFunc('view all', () => {
			let str = ''
			for (let [key, value] of Object.entries(sessionStorage)) {
				str += (`${key}: ${value}\n`)
			}
			conDoW(str)
		})
		conDoW([count, btn, btn2])
	}
	fn_sessionStorage()
	cookie_view_del()
	conDoW(uo.入力パネル())
	conDoW(
		[getButtonWithFunc('loop2', () =>
			!(function hoge(i = 0) {
				conDoW(i, {push: false})
				if (50 < i) return
				setTimeout(() => hoge(i + 1), 1000)
			})()
		),
		getButtonWithFunc('loop', () =>
			!(function hoge(i = 0) {
				conDoW(i, {addition: true})
				if (50 < i) return
				setTimeout(() => hoge(i + 1), 1000)
			})()
		),
		])
	conDoW.add(getButtonWithFunc('タブを開くインライン', () => uo.タブを開くインライン()))
}
function sleep(msec) {
	return new Promise(r => setTimeout(r, msec)) // returnが無くてうまく動かなかった。
}
const sleep2 = msec => new Promise(resolve => setTimeout(resolve, msec))



/** サイト別の関数リスト */
const arr = [
	{/* 全部b */
		name: '全部b',
		url: ['^',],
		date: '',
		func: function hoge() {
			const nf = (fn) => [fn.name, fn]
			conDoW(uo.移動パネル2())
			conDoW(getButtonWithFunc('Utility', utility))
			conDoW([
				getButtonWithFunc(uo.uo全部ボタン化),
				getButtonWithFunc(uo.stopJump),
				getButtonWithFunc(uo.copy_string_for_cookie_settings),
				getButtonWithFunc(uo.copyTitleLfUrl),
				getButtonWithFunc(uo.copyLinkAsMarkdown),
			])
		},
	},
	{/* テスト */
		name: 'テスト',
		url: ['#tttt',],
		date: '',
		func: function() {
			utility()
		},
	},
	{/* 確認くん */
		name: '確認くん',
		url: ['^https://www.ugtop.com/spill.shtml',],
		date: '',
		func: function() {
			uo.通知('ほげほげ')
			setTimeout(function() {
				alert(111)
			}, 3000)

		},
	},
	{/* workflowy */
		name: 'workflowy',
		url: ['^https://workflowy.com/',],
		date: '',
		func: function() {
			//const base = hogehogehoge();// 画面作っちゃう
			let dataSounyuF = function(s = '') {
				document.activeElement.textContent += mydate('yyyy/MM/dd') + ' ' + s
				/* フォーカス位置調整 */
				let el = document.activeElement
				let range = document.createRange()
				range.setStart(el, 1) // オプション2はオブジェのオフセット、0で先頭、el.chilednodesで文字単位
				// range.selectNodeContents(el);
				range.collapse(true)// 選択を解除、これはエンドしてしてないから、無くても動く
				let sel = window.getSelection()
				sel.removeAllRanges()
				sel.addRange(range)
				el.focus()
			}
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
				//conDoW(e)
				if (e.altKey) { //変化キーおしてるか？
					switch (String.fromCharCode(e.keyCode)) {
						case 'A': //A
							e.preventDefault() // 避ける初期動作を
							dataSounyuF()
							break
						case 'T':
							e.preventDefault() // 避ける初期
							dataSounyuF('#タスク ')
							break
						case '3':
							e.preventDefault() // 避ける初期
							dataSounyuF('#')
							break
						// document.activeElement.textContent+=moment().format('yyyy/MM/dd')+" #タスク ";
					}
				}
			})
		},
	},
	{/* ルーターログイン */
		name: 'ルーターログイン',
		url: ['^https?://192.168.\\d+.\\d+',],
		date: '',
		func: function() {
			function fff(params) {
				document.getElementById('userName').value = 'admin'
				document.getElementById('pcPassword').value = 'ttoomm99'
				document.getElementById('loginBtn').click()
			}
			fff()
			make_button_elem(base, 'button', {
				textContent: 'ルーター',
				onclick: fff,
			})
		},
	},
	{/* 楽天スーパーヒーロー */
		name: '楽天スーパーヒーロー',
		url: ['^https://campaign.rakuten.jp/heroes/',],
		date: '',
		func: function() { },
	},
	{/* infoの報告 */
		name: 'infoの報告',
		url: ['^https://pointmail.rakuten.co.jp/subcard/complete',],
		date: '',
		func: function() {
			document.querySelector('#completionReportBtn').click()
		},
	},
	{/* メールdeポイント */
		name: 'メールdeポイント',
		url: [
			'^https://member.pointmail.rakuten.co.jp/box/*',
		],
		date: '',
		func: function() {
			const title = 'メールポイント'
			// document.querySelector('.point_url').click()
			let suteFunc = async function() {
				arebaCli('.point_url>a') //spanClickしても数字減ったけど記録されず
				await sleep(1000)
				arebaCli('li.next>a')
				// let el;
				// el = document.querySelector('.point_url');
				// if (el !== null) click();
				// document.querySelector('li.next>a').click()
			}

			new GM_registerMenuCommand(title + '2', suteFunc, 'C')
			if (location.href.match('https://member.pointmail.rakuten.co.jp/box/ItemDetail/.+')) {
				arebaCli('.point_url>a') //spanClickしても数字減ったけど記録されず
			}
		},
	},
	{/* 楽天enaviでクリックポイント */
		name: '楽天enaviでクリックポイント',
		url: ['^https://www.rakuten-card.co.jp/*',],
		date: '',
		func: function() {
			async function enaviClick() {
				let elemList = document.querySelectorAll('[id^="position"]')// cssセレクタでhasが使えないからloop検索
				conDoW('クリック箇所=' + elemList.length)
				for (let i = 0; i < elemList.length; i++) {
					if (i < 0) {
						//前半スキップ
						//continue;
					}
					if (elemList[i].querySelector('img[src$="check.gif"]')) {
						let s = elemList[i].querySelector('a[href^=\'javascript\']')// .textConten;
						// conDoW(s.textContent);
						s.style = 'box-shadow: 0 0 0px 3px rgba(222, 111, 222, 0.90);'
						conDoW('クリック')
						s.click() // クリック
						//早くしすぎると歯抜けになる
						await sleep(900) // sleep
					}
					//
					// conDoW(eles[i].querySelectorAll(".clearfix .dateArrival>img").length);
				}
			};
			//PV時に実行
			enaviClick()
		},
	},
	{/* Infoseekのラッキーくじサッカー */
		name: 'Infoseekのラッキーくじサッカー',
		url: ['^https://www.infoseek.co.jp/Luckylot*',],
		date: '',
		func: function() {
			if (location.href === 'https://www.infoseek.co.jp/Luckylot/result') {
				conDoW('サッカーくじ終わり')
				location.href = 'https://www.infoseek.co.jp/'
			}
			//https://www.infoseek.co.jp/Luckylot/result
			// if (GM_getValue('毎日くじ次へ')) {
			// 	GM_setValue('毎日くじ次へ', null);
			// 	location.href = 'https://www.infoseek.co.jp/';
			// } else {
			// 	conDoW('くじセット');
			// 	GM_setValue('毎日くじ次へ', 1);
			// }
			let fn = async function() {
				await sleep(500) // sleep
				document.querySelector('.isluckykuji_start').click()
				await sleep(500) // sleep
				document.querySelector('.isluckykuji_select:nth-of-type(1)').click()
				conDoW('ow')
			}
			//new GM_registerMenuCommand(title, fn, 'C');
			fn()
		},
	},
	{/* infoミニくじ */
		name: 'infoミニくじ',
		url: ['^https://www.infoseek.co.jp/(\\?.+)?$',],
		date: '',
		func: function() {
			const el = document.querySelector('area.islot_lot')
			if (el !== null) {el.click()}
		},
	},
	{/* enavi自動ログイン */
		name: 'enavi自動ログイン',
		url: [
			'^https://www.rakuten-card.co.jp/e-navi/index.xhtml',
		],
		date: '',
		func: async function() {
			await sleep(1500) // sleep
			//chromeのオートコンプリートでパスワードはあるように見えるが空欄状態、画面Clickで値が入る
			if (document.querySelector('#u').value !== '' &&
				document.querySelector('#p').value !== ''
			) {
				conDoW(1)
				//document.querySelector('#loginButton').click();
			}
		},
	},
	{/* 楽天系の毎日くじ */
		name: '楽天系の毎日くじ',
		url: [
			'^https://www.infoseek.co.jp/',
			'^https://kuji.rakuten.co.jp/',
			'^http://www.rakuten.co.jp',
			'^https://www.infoseek.co.jp/Luckylot*',
			'^https://isbingo.www.infoseek.co.jp/isbingo/getCard',
			'^https://pointmail.rakuten.co.jp/subcard/complete',
		],
		date: '',
		func: function() {

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
			// 	conDoW('くじセット');
			// 	GM_setValue('毎日くじ次へ', 1);
			// }
			//var this.host;
			for (let i = 0; i < this.host.length; i++) {
				const s = this.host[i].replace(/[*?]/g, '') // g繰り返し
				make_button_elem(base, 'a', {
					textContent: s,
					href: s,
				})
				make_button_elem(base, 'br', {})
			}
			// rakuTop2kuji: function() {
			// 	arebaCli('a[href^="https://rd.rakuten.co.jp/s/?R2=https%3A%2F%2Fkuji.rakuten.co.jp"]');
			// }
		},
	},
	{/* 楽天系のくじの自動Click */
		name: '楽天系のくじの自動Click',
		url: ['^https?://kuji.rakuten.co.jp/',],
		date: '',
		func: async function() {
			// if (GM_getValue('毎日くじ次へ')) {
			// 	GM_setValue('毎日くじ次へ', null);
			// 	location.href = 'https://www.infoseek.co.jp/Luckylot';
			// } else {
			// 	conDoW('くじセット');
			// 	GM_setValue('毎日くじ次へ', 1);
			// }
			await sleep(1500) // sleep
			arebaCli('#entry')
		},
	},
	{/* google */
		name: 'google',
		url: ['^https?://www.google.(?:com|co.jp)/',],
		date: '',
		func: function() {
			let d = !!0
			d && conDoW('google no redirect')
			//Array.prototypeは[]で置き換え可能
			Array.prototype.forEach.call(document.querySelectorAll('h3.r > a'), function(elem) {
				d && conDoW(elem.textContent)
				elem.onmousedown = function() { }
			})
		},
	},
	{/* kkonload */
		name: 'kk onload',
		url: ['^https://openloadpro.com/',],
		date: '',
		func: function() {
			let d = !true
			d && conDoW('zippys')
			//arebaCli('.openload-link > a:nth-child(1)');
			let url = document.querySelector('.openload-link > a').href
			location.href = url
		},
	},
	{/* kkビデオタグあったら全画面にして上に */
		name: 'kkビデオタグあったら全画面にして上に',
		url: [
			'^https://xn--icktho51ho02a0dc.com/*/',
			'https://asianclub.tv/',
			'https://embed.media/',
		],
		date: '',
		func: function() {
			video_top_play()
			conDoW(getButtonWithFunc('video再生', video_top_play))//動かない？
			conDoW(getButtonWithFunc('video再生arr', () => video_top_play()))
			conDoW(getButtonWithFunc('head saku', () => {
				document.head.remove() //狂って酷いことに
			}))
			conDoW(getButtonWithFunc('videoのみ', () => {
				let video = document.querySelector('video')
				document.body.parentNode.remove()
				document.appendChild(video)
			}))
		},
	},
	{/* kk video tokyomotion */
		name: 'kk video tokyomotion',
		url: [
			'^https://www.tokyomotion.net/video/',
			'^https://www.tokyomotion.net/',
		],
		date: '2019/12/05',
		func: function() {
			document.title = document.title.replace('VIDEOS - Search Results For ', '')
			uo.選択テキスト検索ボタン('/search?search_query=%word%&search_type=videos')

			// const videoEl = qs('div[id="flash"]')
			const videoEl = qs('div[preload="none"]')
			if (videoEl) {
				qs('div.vjs-poster').remove()

				video_top_play(videoEl)
				conDoW(getButtonWithFunc('video再生', video_top_play))//動かない？
				conDoW(getButtonWithFunc('video再生arr', () => video_top_play()))
				document.body.style.padding = 0
			}

			//videoにmousedownイベント使われて止まらない、
			// document.addEventListener('mousedown', function(e) {e.stopPropagation()}, true)
			//ついでにクリックも、html5プレーヤーの操作できんくなった。
			// document.addEventListener('click', function(e) {e.stopPropagation()}, true)

			//fix追従バーを動かさない、追記、要素だとautoPageであかん。
			// document.querySelectorAll('.top-nav,.navbar')
			// 	.forEach((el) => el.style.position = 'relative')
			//staticだと検索窓がクリックで消える、absoだと上に最上位にきてビデオの邪魔
			let style = document.createElement('style')
			style.textContent = ' .navbar,.top-nav{position: initial} '
			document.body.appendChild(style)

			//サムネイル画像を表示したい
			//https://cdn.tokyo-motion.net/media/videos/tmb34/1090246/1.jpg
			//10584 10584/108=98
			//横192、縦108、動画の長さによってトータル高さは変わる。
			document.addEventListener('contextmenu', function(ev) {
				conDoW([ev.target.className, ev.target.tagName])

				if (ev.target.tagName == 'IMG' &&
					// ev.target.className == 'duration' &&
					ev.target.classList.contains('img-responsive')) {
					ev.preventDefault()
					conDoW('ヒット')
					//ev.stopPropagation()

					//動画ナンバーを取得
					const pEl = ev.target.parentElement.parentElement
					console.log(pEl.href)
					const videoNum = pEl.href.match(/(?<=video\/)\d+/)[0]
					//サムネURL作る
					//https://cdn.tokyo-motion.net/media/videos/vjsslides/1079/1079130_progressthumb.jpg
					//https://www.tokyomotion.net/video/1079130/
					const vn4 = videoNum.slice(0, -3)
					const thumb_url = `https://cdn.tokyo-motion.net/media/videos/vjsslides/${vn4}/${videoNum}_progressthumb.jpg`
					// conDoW(videoNum)
					// conDoW(thumb_url)

					//ラッパー作って中に画像表示
					const divIni = createEl(document.body, 'div', 0, {all: 'initial'})
					//右クリック閉じイベント
					divIni.oncontextmenu = function() {
						ev.preventDefault()
						divIni.remove()

						return false
					}

					const div = createEl(divIni, 'div', undefined, {
						// all:'initial',
						position: 'fixed',
						top: 0,
						zIndex: 888,
						backgroundColor: '#00F5',
						padding: '0.6em',
						// margin: '0.5em',
						overflow: 'hidden',
						height: '100vh',
						//textAlign: 'center',
						/* text-align: center; */
						display: 'flex',
						flexWrap: 'wrap',
						alignItems: 'center',
						alignContent: 'center',
						justifyContent: 'center',
					})
					const style = createEl(divIni, 'style', {
						textContent: `
														img.unoThumb{
														outline: #0005 1px solid;
														/* outline: auto #f00 3px; */
														outline-offset: -0px;
														/* margin: 2px; */
														/* transform: scale(1.3); */
														}
												`,
					})

					let nHeight
					画像のサイズ()
					function 画像のサイズ(params) {
						var image = new Image()

						// コールバックを設定
						image.onload = function() {
							console.log('load complete', image.naturalHeight)
							nHeight = image.naturalHeight
							さむね画像いっぱい表示()

						}

						// srcに画像パスを設定することで読み込み処理が実行されます。
						image.src = thumb_url
					}

					/** 巨大画像からサムネをクロッピング */
					function createThumb(num, div) {
						const img = createEl(div, 'img', {
							src: thumb_url,
							className: 'unoThumb',
						}, {
							objectFit: 'none',
							objectPosition: '0 ' + -108 * (num - 1) + 'px',
							height: '108px',
							width: '192px',
							//transform: 'scale(1.2)',
							//verticalAlign: 'top',
							// border: '10px solid gray',
							//     boxSizing: 'border-box',
							// outline: '4px ridge #f00a',
							// outlineOffset: '-4px',
						})
					}
					function さむね画像いっぱい表示(params) {
						let thumMax = nHeight / 108
						console.log(thumMax)
						conDoW([thumMax])
						let thumb_disp_max = 36
						let av = thumMax / thumb_disp_max
						for (let i = 1; i <= thumb_disp_max; i++) {
							let num = Math.round(av * i - av / 2)
							createThumb(num, div)
							console.log(num)
						}
						// loop()
					}
					function loop() {
						// let nodes = dive
						//初期値を記憶
						div.childNodes.forEach(node => {
							node._sop = pxpx2arr(node.style.objectPosition)
							// node._sop_ini=node._sop
						})
						loop2()
						function loop2(i = 0) {
							if (i > 3) i = 0
							if (!divIni.parentNode) return
							div.childNodes.forEach(node => {
								let x = '0px '
								let y = node._sop[1] - 108 * i + 'px'
								node.style.objectPosition = x + y
								// log(x+y)
								// return
							})
							// log(divIni.parentNode)
							conDoW(i + ',', {addition: true})
							setTimeout(loop2.bind(null, i + 1), 1100)
						}
					}
					//10px 20px みたいな文字列を配列にする。
					function pxpx2arr(params, i) {
						// log(params)
						return params.split(' ').map(v => parseInt(v))
					}
				}
			}, false)
		},
	},
	{/* javmix大画面 */
		name: 'kk javmix大画面',
		url: ['^https://javmix.tv/video/*/',],
		date: '',
		func: function() {
			//let playerDiv = document.querySelector('#player-embed')
			let elm = document.querySelector('#player-embed > iframe')
			//let videotag = elm.contentWindow.document.querySelector('video')
			//
			elm.sandbox = 'allow-scripts allow-same-origin' //iframe制限して許可条件、popup防げるけど、相手が書き換えることも可能
			video_top_play(elm)
			/**
			 * urlでa elemを作る
			 * @param {*} url 
			 * @param {*} text 
			 */

			//ポップ系クリック削除
			conDoW(1111)
			document.querySelectorAll('div[class^="__isboost"]').forEach(v => v.remove())
			document.onload = () => {

			}



			//conDoW(elm.src)
			conDoW(create_href(elm.src))
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
			//conDoW(button_tukuru('moichi', kore))

			function sc_del() {
				let sc_elm = document.getElementsByTagName('script')
				let i = 0
				// for (let val of sc_elm) { //これだと半分しか削除できない、自動で詰まるから。
				// 	conDoW(i++,val)
				// 	val.remove();
				// }
				for (let i = sc_elm.length - 1; 0 <= i; i--) { //逆から削除する。
					sc_elm[i].remove()
				}
			}
			sc_del()
			conDoW(getButtonWithFunc('script削除', () => sc_del()))

			//css_instant('saidcss', '::-webkit-scrollbar {width: 0px;}')
		},
	},
	{/* ファン座で自動再生 */
		name: 'kk ファン座で自動再生',
		url: [
			'^https://www.dmm.com/*/',
			'^https://www.dmm.co.jp/',
		],
		date: '',
		func: function() {
			const hoge = function() {
				conDoW('hogege')
				let elm = document.querySelector('iframe#DMMSample_player_now')
				if (elm) {
					const video_el = elm.contentWindow.document.querySelector('video')
					video_top_play(video_el)
				}
				//
				//document.querySelector("#dmmplayer")
			}

			let obj = document.querySelector('#sample-video')
			//conDoW(obj)
			//無理
			document.onreadystatechange = function(event) {
				conDoW(this.readyState)
			}
			// arebaCli('#detail-sample-movie div a', 0)
			let el = qs('#detail-sample-movie div a')
			// conDoW(el)
			if (el) {
				el.click()
				// _lp()

				!function _lp() {
					conDoW('探し', {addition: true})
					let el = qs('iframe#DMMSample_player_now')
					if (el && qs('video', el.contentWindow.document))
						hoge()
					else
						setTimeout(_lp, 1000)
				}()
			}


			//conDoW(document.readyState)
			//document.addEventListener("DOMContentLoaded", hoge)
			//DOMContentLoaded = () => conDoW("load1")
			//await sleep(2000)

			//hoge()
			conDoW(getButtonWithFunc('iframe', hoge))


			//let url = document.querySelector('.openload-link > a').href
			//location.href = url
		},
	},
	{/* kk pornhub生 */
		name: 'kk pornhub生',
		url: ['^https://jp.pornhub.com/',],
		date: '2019/12/19',
		func: function() {
			video_top_play(qs('#player'))
		},
	},
	{/* KK_dropbooks */
		name: 'KK_dropbooks',
		url: [
			'^https://dropbooks.tv/',
			'^http://dlbooks.to/',
			'^http://xbooks.to/',
		],
		date: '',
		func: function() {
			const d = !true
			//css
			const cssEl = returnMyCss()
			//cssEl.sheet.insertRuインサートしようとしたけどスペルわからんくて辞めた
			cssEl.insertAdjacentText('beforeEnd', '\
						a,a * { color: #77e !important;font-weight: bold; } \
						a:visited,a:visited * {color: #c66 !important;} \
						')
			//リンクをダウンロードに書き換えV2
			//検索結果はhttpからのフルアドレスだった。
			//cssセレクタではbaseURLはアリでも無しでもヒットする→嘘、ヒットしない
			//domで書き換えた後はヒットする、
			let els = document.querySelectorAll('h3>a[href*="/detail/"]')
			d && conDoW('cssセレクタで', els.length)
			for (let i = 0; i < els.length; i++) {
				//const newel=document.createElement('a');
				let el = els[i]
				const cnode = el.cloneNode(true)
				//.appendChild(cnode);
				cnode.textContent = '■'
				el.parentElement.insertBefore(cnode, el)
				el.href = el.href.replace('/detail/', '/detail/download_zip/')
				el.textContent = '◆' + el.textContent
				//d && conDoW(el.href);
			}
			//プレビュー作っちゃう
			//作ろうと思ったけどサムネのURLがxhrしないとわかんないから保留
			//let globalInFn = (function() {return this})(); // ここじゃグローバル取れないぽ

			els = document.querySelectorAll('a[onclick^="bookStand"]')
			for (let i = 0; i < els.length; i++) {
				let el = els[i]
				//el.onclick=()=>conDoW(1111);//動作するがhtmlはそのまま,オートページャーで消える
				el.setAttribute('onclick', 'aa()') //書き換わる
				//el.textContent = '◆ぷ' + el.textContent;
			}
			// タイトル分かり易く
			let s
			do {
				s = (location.href.match(/(?:word:)([^/]+)/) || [])[1]
				if (s) {
					document.title = decodeURIComponent(s)
						+ ' _' + document.domain
					break
				}
				s = (location.href.match(/(?:sort:)(.+)/) || [])[1]
				if (s) {
					document.title = s.replace(/\/.+:/, ':')
						+ ' _' + document.domain
					break
				}
			} while (false)
		},
	},
	{/* KKsmvto */
		name: 'KKsmvto',
		url: ['^http://smv.to/*',],
		date: '',
		func: function() {
			//Clickされたノードを判定する
			function hantei(ev) {
				//conDoW(e);	
				conDoW(ev.target.tagName, ev.target.className)
				//conDoW(e.target);
				if (ev.target.tagName == 'IMG' && ev.target.className == 'thumb') {
					ev.preventDefault()
					ev.stopPropagation()
					makeThumbScreen(ev)
				}
			}
			document.body.addEventListener('click', hantei, true)
			/*判定せず、ターゲット全てにリスナーを登録するタイプ
			var eles = document.querySelectorAll("a>.thumb");
			var color = Math.random().toString(16).slice(2, 5);
			for (var i = 0; i < eles.length; i++) {
					// conDoW(eles[i].id);
					conDoW(window.location.href);
					eles[i].style.boxShadow = "0 0 0 4px #" + color;
					eles[i].onclick = makeThumbScreen;
					//conDoW(eles[i].onclick);
			}
			*/
			function makeThumbScreen(ev) {
				//conDoW('hoge' + ev);
				//conDoW(e);
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
						e.stopPropagation()
						//e.preventDefault();
						//conDoW(e);
						//return false;
					},
					onclick: function(e) {
						// conDoW(this);
						// conDoW(e.target);
						this.parentNode.removeChild(this)
					},
				}))
				let num = parseInt(ev.target.getAttribute('count'))
				conDoW(num, ev.target.src)
				let n
				for (let i = 1; i <= 35 && i <= num; i++) {
					if (!ev.target.src) {break}
					n = parseInt(num / 35 * i) || 1
					if (n < i) n = i
					base.appendChild(Object.assign(document.createElement('img'), {
						src: ev.target.src.match('^.+/') + 'animation_' + ('0000' + n).slice(-5) + '.jpg',
						style: '	vertical-align: bottom;',
						//http://img1.smv.to/plpiAK5qSk/animation_00005.jpg',
					}))
				}
			}
		},
	},
	{/* zippyshare */
		name: 'zippyshare',
		url: ['^https://www*.zippyshare.com/v/',],
		date: '',
		func: function() {
			let d = !true
			d && conDoW('zippys')
			arebaCli('#dlbutton', 3, true)
			// let url = document.querySelector('#dlbutton').href
			// location.href = url
		},
	},
	{/* mx-sh */
		name: 'mx-sh',
		url: ['^https://mx-sh.net/',],
		date: '',
		func: function() {
			let d = !true
			d && conDoW('zippys')
			arebaCli('#Downloadfre')
		},
	},
	{/* shorten.sh */
		name: 'shorten.sh',
		url: ['^http://shorten.sh/',],
		date: '2019/12/24',
		func: function() {

			arebaCli('#invisibleCaptchaShortlink')
			arebaCli('#get-link-ad')
		},
	},
	{/* wupfile */
		name: 'wupfile',
		url: ['^https://wupfile.com/',],
		date: '',
		func: function() {
			let d = !true
			d && conDoW('zippys')
			arebaCli('#method_free');
			//downloadbtn
			//document.querySelector("#downloadbtn").click()
			//document.querySelector('#downloadbtn').removeAttribute('disabled')
			//disabled消してクリックしても巻き戻るだけ。
			//2019/09/02 自動ダウンロードを簡易的に
			//setintarval→clearinでもできるけど、settimeoutのほうが見やすい？
			(function tryDownload() {
				let time = new Date()
				let el = document.querySelector('#downloadbtn')
				// conDoW(time)
				conDoW(el.disabled, {addition: true})
				if (!el.disabled) {
					el.click()
					return
				}
				setTimeout(tryDownload, 5000)
			}())
		},
	},
	{/* jolinfile */
		name: 'jolinfile',
		url: [
			'^https?://jolinfile.com',
			'^https?://jolinfile.net',
		],
		date: '',
		func: function() {
			conDoW.disp()
			//時間待ちの場合
			let err = document.querySelector('div.err')
			if (err) {
				//数秒後にリロード
				setTimeout(() => location.reload(), 60 * 1000)
			}

			//入力画面・入力欄を予めアクティブ化
			let inputEl = document.querySelector('input.captcha_code')
			if (inputEl) {
				// if (document.hasFocus() !== false)
				if (document.visibilityState === 'hidden')
					uo.通知('認証コード待機')
				conDoW(uo.入力パネル())
				inputEl.focus()
				//ループしてダウンロード
				tryDownload()
			}
			//初期画面からのジャンプ
			arebaCli('[type="submit"][value="Free Download"]')

			//入力後にダウンロードURLが出た後
			arebaCli('#dd_link')


			// if(!el)return alert('#downloadbtnボタンなし')
			//待機時間回して待機
			function tryDownload() {
				tryDownload.el = tryDownload.el || document.querySelector('#downloadbtn')
				let el = tryDownload.el
				// uo.通知('認証コード待機')
				// log('通知テスト')
				let time = new Date()

				// conDoW(time)
				conDoW.add(el.disabled)
				if (!el.disabled) {
					el.click()
					return
				}
				setTimeout(tryDownload, 5000)
			}
		},
	},
	{/* rapidgator */
		name: 'rapidgator',
		url: ['^https://rapidgator.net/',],
		date: '',
		func: function() {
			// https://rapidgator.net/download/captcha
			// arebaCli('.link.act-link.btn-free')
			// arebaCli('.btn-download')
			// <span class="seconds">9</span>
		},
	},
	{/* Download mexa_sh */
		name: 'Download mexa_sh',
		url: ['^https://mexa.sh/',],
		date: '',
		func: function() {
			arebaCli('#Downloadfre')
			let el = qs('#countdown > div > span')
			loop()
			function loop(i = 0) {
				const sec = el.textContent - 0
				document.title = document.title.replace(/^\[.+?\]/, '')
				document.title = `[${sec}]` + document.title

				conDoW(sec + ',', {addition: true})
				if (sec < 2) {
					uo.タブを開くインライン()
					return
				}
				setTimeout(loop, 5000)
			}
		},
	},
	{/* dousyoko */
		name: 'dousyoko',
		url: ['^https?://.+.dousyoko.net/',],
		date: '',
		func: function() {
			let d = !!true
			const $ = (...s) => document.querySelectorAll(...s)
			d && conDoW($('#download_pass').value)
			$('#download_pass')[0].type = 'text'
			$('#download_pass')[0].value = 'dddd'
			d && conDoW('dddd')
			arebaCli('.submit')

		},
	},
	{/* z2icom */
		name: '--off--z2icomダウンロード経由サイト',
		url: [
			'^https://z2i.com/',
			'^https://im1.io/',
			'^https://shrinx.net',
		],
		date: '',
		func: async function() {
			let d = !true
			let current_url = window.location.href
			let api = current_url.split('?api=').slice(1).join('?api=').split('&url=')[0]
			let url = current_url.split('&url=').slice(1).join('&url=')
			//後ろのjoinは半分ダミー、Stringg欲しいから、コピペしたんだと思う、toStringが正しい。
			d && alert(url)
			if (url) {
				window.location.href = url
			}
			//await sleep(1000)
			await sleep(4500) // sleep
			arebaCli('#invisibleCaptchaShortlink')
			//await sleep(3000)
			//await new Promise((r) => setTimeout(r, 3500)); // sleep
			//<a href="https://www116.zippyshare.com/v/pu2Jljh0/file.html" class="btn btn-success btn-lg get-link">Get Link</a>
			arebaCli('a[href*="zippyshare.com"]', null, true)
			//location.href = document.querySelector().href
		},
	},
	{/* 表示禁止サイト */
		name: '表示禁止サイト',
		url: [
			'^https://playingcards.jp',
			'^ahttps://smcb.jp/',
		],
		date: '',
		func: function() {
			window.stop()
			//alert(111)
			//画面真っ白に、飛ばされてる感覚がなくなる、<html から削除
			//document.body.parentNode.remove() //window.document.firstChild.remove()
			//戻るボタン押せるa
			//window.location.href = 'https://news.google.co.jp';
			//戻るボタン押せない、firefoxでデフォで無効
			// let meta = document.createElement('meta')
			// meta.setAttribute('http-equiv', 'refresh')
			// meta.setAttribute('content', '0;url=https://news.google.co.jp')
			// document.head.appendChild(meta)
		},
	},
	{/* localhostとfile:/// */
		name: 'localhostとfile:///',
		url: [
			'^https://www.ugtop.com/',
			'news.google',
			'localhost',
			'file:///',
		],
		date: '',
		func: async function() {
			'use strict'
			//conDoW('document.cookie > '+document.cookie)
			//conDoW()

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
				conDoW('はじめまして！')
			else
				conDoW('戻ってきたなっ')
			conDoW('history.length', history.length, location.hash)
			//history.replaceState('', '', '#' + hash)
			let url = location.href.replace(/#.*/, '') + '#' + hash
			//conDoW("url=",url)
			//location.href = url
			//location.replace(url)

		},
	},
	{/* dawnfun.com/ */
		name: '--off--dawnfun.com/',
		url: ['^あhttps://r18.dawnfun.com/',],
		date: '',
		func: async function() {
			let images = []  // この配列にbase64のデータを入れる

			function downloadImages(images) {
				let zip = new JsZip()
				for (let i = 0; i < this.images.length; i++) {
					zip.file('img' + [i] + '.png', images[i].split(',')[1], {base64: true})
				}
				zip.generateAsync({type: 'blob'})
					.then(function(content) {
						FileSaver.saveAs(content, 'images.zip')
					})
			}
			//let JSZip = require('jszip');

			let js_url = 'http://localhost:8888/lib/jszip.js'
			console.log(123)
			await sleep(1000)
			// import fm from 'http://localhost:8888/lib/FileSaver.js'
			// import zm from 'http://localhost:8888/lib/jszip.js'
			// const FS = await import('http://localhost:8888/lib/FileSaver.js')
			//const JSZip = await import('http://localhost:8888/lib/jszip.js')
			// console.log(JSZip)

			// let zip = new JSZip();
			// let imgData = 'R0lGODdhBQAFAIACAAAAAP/eACwAAAAABQAFAAACCIwPkWerClIBADs=';
			// console.log(zip)
			// //var zip = new JSZip();
			// zip.file('Hello.txt', 'Hello World\n');
			// let img = zip.folder('images');
			// img.file('smile.gif', imgData, {base64: true});
			// zip.generateAsync({type: 'blob'})
			//     .then(function(content) {
			//         // see FileSaver.js
			//         saveAs(content, 'example.zip');
			//     });
			function zipka(imgData) {
				let zip = new JSZip()
				console.log(zip)
				zip.file('blob_t.jpg', imgData, {blob: true})
				zip.file('blob_f.jpg', imgData, {blob: false})
				zip.generateAsync({type: 'blob', compression: 'STORE', })
					.then(function(content) {
						// see FileSaver.js
						saveAs(content, 'example.zip')
					})
			}
			let url = 'https://r18.dawnfun.com/20191114doujin/Doujin-20191114113/000.jpg'
			GM_xmlhttpRequest({
				method: 'GET',
				url: url,
				headers: {referer: url, origin: url},
				responseType: 'blob',
				onload: function(resp) {
					let img = document.createElement('img')
					img.src = window.URL.createObjectURL(resp.response)
					document.body.appendChild(img)
					// zipka(resp.response)
				}
			})
		},
	},
	{/* kk manga314で右クリックリストアップ */
		name: 'kk manga314で右クリックリストアップ',
		url: ['^https://manga314.com/',],
		date: '',
		func: async function() {
			uo.選択テキスト検索ボタン()
			//クリアボタン欲しい
			//conDoW(document.body.parentElement)
			//クリックして、通信してページ開かずURLゲットが目標
			// document.addEventListener('click', function(e){
			// 	e.preventDefault();
			// }, false);

			/** スタイルシートをオーバーライド */
			!function _sss() {
				if (!location.href.match('category|tag')) return

				createEl(document.body, 'style', {
					//tagA+tagB 直後の兄弟B
					textContent:
						`h2+div.navigation{display: none}
					#content {
					background-color: wheat;
					width: 98vw;
					margin-left: calc((50% - 49vw) );
					} 
					.post {
					display: inline-block;
					width: 19vw;
					vertical-align: top;
					}`
				})
			}()

			//altクリック、中クリックにイベント仕込もうと思ったけど、ホイールスクロール表示されて困って止めた。
			document.addEventListener('click', function(ev) {
				do {
					if (!ev.altKey) break
					//conDoW(e.buttons, e.button, e.target.tagName, e.target.rel)
					//Aが大文字な謎
					if (ev.target.tagName == 'A' && ev.target.rel == 'bookmark') {
						ev.preventDefault()
						conDoW('これじゃ' + ev.target.innerHTML)
						_GM_xhr(ev.target.href, ev.target.innerHTML)
					}
				} while (false)
			}, false)

			// 右クリックも作ってみる
			document.addEventListener('contextmenu', function(ev) {
				let el = ev.target
				while (el) {
					// conDoW([el.tagName, el.className])
					//条件に合えばbreak、while式内でも出来たが、否定にしたり読みにくいのでif break
					if (el.tagName == 'DIV' &&
						el.className == 'post' &&
						ev.ctrlKey === false) break

					el = el.parentElement //上の要素へ
					if (el.tagName === 'HTML')
						return false //走査終了
				}
				//ev.preventDefault()
				if (ev.ctrlKey === false) {
					// ev.stopPropagation()
					// conDoW('◆' + el.innerHTML)
					if (ev.shiftKey) {
						_js_xhr(el.href, el.textContent)
						//_js_xhr(el.href, el.textContent, 'zip')
						return
					}
					ev.altKey
						? _GM_xhr(el.href, el.textContent)
						: _dawnfun_only(el)
				}
			}, !false)

			const _GM_xhr = function(url, title) {
				conDoW('_GM_xhr')
				GM_xmlhttpRequest({
					method: 'GET',
					url: url,//'http://localhost:8888',
					onload: function(resp) {
						console.log(resp)

						let text = resp.responseText
						// zipにレスポンスデータを追加
						//console.log(xhr.response);
						_kai_n_view(text, title)
					},
					onerror: function(response) {
						console.log(response.responseText)
					},
				})
			}
			//素のxhrも書いてみてる、途中
			const _js_xhr = function(url, title, zip = false) {
				conDoW('js_xhr')
				// オリジナル画像を読み込む
				let xhr = new XMLHttpRequest()
				xhr.open('GET', url, true)
				//xhr.responseType = 'text';
				console.log(555)
				// xhr.addEventListener('load', function() {});
				xhr.onload = function() {
					let text = xhr.response
					// zipにレスポンスデータを追加
					//console.log(xhr.response);
					_kai_n_view(text, title, zip)
				}
				xhr.send()
				console.log(1212)
			}
			//ダウンロードのみPromise＋
			const _xhr_promise = function(url) {
				const p = new Promise((resolve, reject) => {
					//conDoW('js_xhr')
					let xhr = new XMLHttpRequest()
					xhr.open('GET', url, true)
					//xhr.responseType = 'text';
					xhr.onload = function() {
						resolve(xhr.response)
					}
					xhr.send()
				})
				return p
			}
			/** リンク群のエレメントを作る */
			const _make_links = function(arr, title) {
				//let els = arr
				title = title
					.replace(/\//g, '@スラ')
					.replace(/~/g, '〜')
					.replace(/.zip|.rar|\//, '')

				title = mydate('@yyyyMMddhhmmss-') + title
				let rel = 'rel="noreferrer" '
				let hrefs = ''
				for (let [key, val] of arr.entries()) {
					//hrefs += `<a href="${val}" ${rel}title="${title}" >i</a>`
					const url = val
					const ext = url.substring(url.lastIndexOf('.'))
					const fileName = '0'.repeat(3 - (key + '').length) + key + ext
					console.log(fileName)

					hrefs += `<a href="${val}" title="${title}/${fileName}" >i</a>`
				}
				const span = document.createElement('span')
				span.innerHTML = hrefs
				return span
			}
			const _text_kaiseki = function(fullhtml, title) {
				let _text = fullhtml
				let arr_url = _text.match(/"https:\/\/r18\.manga314.+?"/g)
				if (!arr_url) {
					// conDoW('みっかんない')
					return false
				}
				arr_url = arr_url.map((ite) => ite.slice(1, -1)) //resu.mapなんてプロパティ無いとエラー、matchがNULLだった。
				//console.log(resu)https://r18.manga314.com/20181026doujin/20180322169/01.jpg
				//let resu = resp.responseText.match(/(?<=")https:\/\/r18\.dawn.+?(?=")/g)
				//↑の正規表現がfirefox tamper でSyntaxエラー

				return arr_url
			}
			/** * 解析＋表示 * @param {*} text * @param {*} title */
			const _kai_n_view = function(text, title, zip = false) {
				let url_arr = _text_kaiseki(text)
				let html = _make_links(url_arr, title)
				console.log(html)
				conDoW(html)
				// ブラウザで圧縮ダウンロード完結、遅い・・・
				if (zip) _url_arr_down(url_arr, title)
			}

			/**
			 * クリック後の処理を一つの関数に、asyncでコールバック無し
			 * @param {*} url 
			 * @param {*} title 
			 * @param {*} zip 
			 */
			const _dawnfun_only = async function(targetEl, zip = false) {
				const a = qs('h3 > a', targetEl)
				const url = a.href
				const title = a.textContent
				const pEl = targetEl
				const fullhtml = await _xhr_promise(url)
				const url_arr = _text_kaiseki(fullhtml)

				const el = (url_arr)
					? _make_links(url_arr, title)
					: Object.assign(document.createElement('span'), {textContent: '◎みっかんない'})
				const hakkenn = (url_arr)
					? true
					: false
				console.log(el)
				conDoW(el)
				_Export_on_the_raw_web(el, pEl, hakkenn)
				// ブラウザで圧縮ダウンロード完結、遅い・・・
				if (zip) _url_arr_down(url_arr, title)
			}

			/** 生のウェブ上に書き出す、shadow使うとダウンロードツールが見れないから */
			const _Export_on_the_raw_web = function(elem, pelm, flag) {
				const clone = elem.cloneNode(true)
				const color = flag
					? '#f00'
					: '#0f0'
				pelm.insertAdjacentElement('afterbegin', clone)
				pelm.style.boxShadow = color + ' 0px 0px 0px 16px inset'
			}

			/** promise gm_xmlで画像を一個ずつダウンロード */
			const _GM_xhr_promise = function(url) {
				const p = new Promise((resolve, reject) => {
					GM_xmlhttpRequest({
						method: 'GET',
						url: url,
						headers: {referer: url, origin: url},
						responseType: 'blob',
						onload: function(resp) {
							// let img = document.createElement('img');
							// img.src = window.URL.createObjectURL(resp.response);
							// document.body.appendChild(img);
							resolve(resp.response)
						},
						onerror: function(response) {
							console.log(response.responseText)
						},
					})
				})
				return p
			}

			const _url_arr_down = async function(url_arr, title) {
				let zip = new JSZip()
				for (let val of url_arr) {
					conDoW(val)
					let blobimg = await _GM_xhr_promise(val)
					console.log(blobimg)
					let filename = new URL(val).pathname.split('/').pop()
					zip.file(filename, blobimg, {blob: true})
					// let img = document.createElement('img');
					// img.src = window.URL.createObjectURL(blobimg);
					// document.body.appendChild(img);
				}
				zip.generateAsync({type: 'blob', compression: 'STORE', })
					.then(function(content) {
						// see FileSaver.js
						saveAs(content, title + '.zip')
					})
			}
			const zipka = function(imgData) {
				console.log(zip)

				zip.file('blob_f.jpg', imgData, {blob: false})

			}
			//test用
			//_js_xhr('https://manga314.com/c79-galaxist-blade-%e9%9b%b7%e7%b1%a0-%e3%83%84%e3%83%81%e3%83%8e%e3%82%ab%e3%82%b4-%e9%ad%94%e6%b3%95%e5%b0%91%e5%a5%b3%e3%83%aa%e3%83%aa%e3%82%ab%e3%83%ab%e3%81%aa%e3%81%ae%e3%81%af', 'asdf')

			const atode_sakujo = function() {//画像のリンクを作る
				//document.querySelectorAll('img[original*="r18.dawnfun.com"]')
				let els = document.querySelectorAll('img[original*="r18.dawnfun.com"]')
				document.title = document.title.replace(' | manga314.com', '').replace(/.zip|.rar|\//, '')
				let urls = '', hrefs = ''
				for (let i = 0, l = els.length; i < l; i++) {
					//const newel=document.createElement('a');
					let val = els[i]
					let url = val.getAttribute('original')
					urls += url + '\n'
					hrefs += `<a href="${url}" title="${document.title}">link</a> `
				}
				conDoW(hrefs)

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
					}))
					let zipname = waku.appendChild(Object.assign(document.createElement('input'), {
						type: 'text',
						value: document.title,
						//document.title = decodeURIComponent(s)
						onclick: function(e) {
							//conDoW(this, e)
							e.target.select()
							document.execCommand('cut')
							let selection = getSelection()
							let element = document.getElementById('hoge23')
							selection.selectAllChildren(element)
						},
					}))
					let button1 = waku.appendChild(Object.assign(document.createElement('input'), {
						type: 'button',
						value: 'slect urls',
						onclick: function(e) {
							let selection = getSelection()
							let element = document.getElementById('hoge23')
							selection.selectAllChildren(element)
						},
					}))
					let button2 = waku.appendChild(Object.assign(document.createElement('input'), {
						type: 'button',
						value: 'view mode',
						onclick: function(e) {
							//conDoW(this, e)
							e.target.select()
							document.execCommand('copy')
						},
					}))
					let base = waku.appendChild(Object.assign(document.createElement('div'), {
						id: 'hoge23',
						title: 'tttttt',
						onclick: function(e) {
							conDoW(this, e)
							e.target.select(0, e.target.length)
						},
						style: `
				border: 2px solid gray;						
			`,
					}))
					//base.textContent = urls
					base.innerHTML = hrefs
				}
			}
			const _css_visited_highlight = function() {
				let css_id = 'hoge1111'
				let css_el = document.getElementById(css_id)
				if (css_el === null) {
					css_el = document.createElement('style')
					css_el.id = css_id
					document.head.appendChild(css_el)
				}
				css_el.insertAdjacentText('beforeend', `
						a:before {
							content: "◆";
					}
					a:visited {
							color: tomato;
					}
				`)
			}
			//main
			_css_visited_highlight()

		},
	},
	{/* --end-- サークルKクーポン */
		name: '--end-- サークルKクーポン',
		url: [
			'^https://www.circleksunkus.jp/mypage/coupon/index.html',
		],
		date: '',
		func: async function() { },
	},
	{/* --end-- サークルKスロット */
		name: '--end-- サークルKスロット',
		url: ['^https?://app.circleksunkus.jp/slot_top.php',],
		date: '',
		func: () => {document.querySelector('a[href*="slot"').click()},
	},
	{/* keepaAmazonトラッカーが見づらすぎCSS */
		name: 'keepaAmazonトラッカーが見づらすぎCSS',
		url: ['https://keepa.com/#!manage*',],
		date: '2019/10/23',
		func: () => {
			document.title += '@'
			//   document.querySelector('#topPanel').style.position=null
			//   document.querySelector('#grid-wrapper-manage').style.height="25000px"
			//#topPanel

			var style = document.createElement('style')
			document.head.appendChild(style)
			style.textContent = `
						#grid-wrapper-manage {height: 15000px !important;}
						#subPanel,#topPanel {position: static !important;}
						`
		},
	},
	{/* しみを時間でジャンプ */
		name: 'しみを時間でジャンプ',
		url: ['https://smcb.jp/',],
		date: '2019/10/29',
		func: async () => {
			await new Promise(r => setTimeout(r, 10 * 60 * 1000))
			location.replace('https://www.ameba.jp/home') //replace
		},
	},
	{/* abemaの寝落ちスリープしない対策 */
		name: 'abemaの寝落ちスリープしない対策',
		url: ['https://abema.tv/',],
		date: '2019/12/29',
		func: () => {
			// alert(111)
			const min_close = 60
			const new_url = 'https://abema.tv/account'
			let min = min_close
			function hoge() {
				if (min === 0) {
					// uo.タブを開く('あべま閉じだよ')
					location.href = new_url
				}
				document.title = `"${min}"` + document.title.replace(/^".*?"/, '')
				min = min - 1
				setTimeout(() => hoge(), 60 * 1000)
			}
			hoge()

		},
	},
	{/* abemaのコメ欄を自動で開く */
		name: 'abemaのコメ欄を自動で開く',
		url: ['https://abema.tv/now-on-air/', 'cdpn.io',],
		date: '2019/11/25',
		func: () => {
			//console.log(11)
			const sleep = msec => new Promise(resolve => setTimeout(resolve, msec))
			// let i = 0
			!(function loop(i = 0) {
				//プロパティ使う方法以外は、無名関数tryも使ってみたけど無理だった。
				//スコープ外にletが1番綺麗に書けるかな。
				let elem = document.querySelector('.com-tv-LinearFooterCommentButton > button:nth-child(1)')
				// conDoW.add(i, elem && elem.disabled)
				console.log(i, elem && elem.disabled)
				// i++

				if (elem && !elem.disabled) {
					// conDoW(elem.disabled)
					sleep(3000)

					console.log('click', elem.disabled, !elem.disabled)
					setTimeout(() => {
						console.log('aa', elem.disabled, !elem.disabled)
						// console.log('c')
						elem.click()
					}, 3500)

				} else {
					setTimeout(() => loop(i + 1), 500)
				}
			})()
		},
	},
	{/* abemaビデオの自動読み込みを禁止する */
		name: '--off--abemaビデオの自動読み込みを禁止する',
		url: ['https://abema.tv/',],
		date: '',
		func: () => {
			const observer = new MutationObserver((mutations) => {
				mutations.forEach((mutation) => {
					console.log(mutation)
					// alert(mutation.target)

				})
			})
			const config = {attributes: false, childList: true, characterData: false, subtree: false}
			// const config = {attributes: true, childList: true, characterData: true, subtree: true }
			observer.observe(document.head, config)
			// window.addEventListener('popstate', function(e) {
			// 	alert(999)
			// })
			//仮想DOMだから、移動警告効かない。
			// window.onbeforeunload = function(e) {
			//     e.preventDefault();
			//     e.returnValue = 'ページ移動？'
			// }
		},
	},
	{/* 当日の毛や木ヒルズを自動で開く、0時すぎると無理 */
		name: '--off--当日の毛や木ヒルズを自動で開く、0時すぎると無理',
		url: ['^https://abema.tv/timetable#keyaki',],
		date: '2019/10/10',
		func: async () => {
			conDoW('タイムテーブルから3')
			//alert("stop")
			//document.title="■"
			//body.onloadは使えない、その後に番組欄は作られる。
			let t = document.title
			document.body.onload = function() {
				document.title = 'load:' + document.title
				conDoW('load')
			}

			document.title = '①' + document.title

			let elem
			do {
				elem = document.querySelectorAll('article span')
				await new Promise(r => setTimeout(r, 1000))
				// document.title = '_' + document.title
				conDoW('mati')
			} while (!elem.length || await sleep(1000))

			conDoW('DOM作成済み')

			for (let val of elem) {
				//タイトルに文字が入ってない時がある、そうなるともう無理。
				if (val.textContent.match(/^けやきヒルズ/)) {
					document.title = '③' + t

					conDoW('クリック')
					val.click()
					let url = document
						.querySelectorAll('.com-m-SlotCard__container--with-hover>a')[0]
						.href
					conDoW(url)
					location.href = url
				}
			}
		},
	},
	{/* --off-- 5chのリンク */
		name: '--off-- 5chのリンク',
		url: ['^https://*.5ch.net/test/read.cgi/',],
		date: '2020/02/10',
		func: function() {
			//http://jump.5ch.net/?https://i.imgur.com/7B0BPhC.jpg
			const links = qsaa('a[href^="http://jump.5ch.net"]')
			links.forEach((val, key) => {
				links[key].href = links[key].href.replace('http://jump.5ch.net/?', '')
			})
		},
	},
	{/* kk 漫画 nyahentai */
		name: 'kk 漫画 nyahentai',
		url: [
			'^https://ja.nyahentai.com/',
			'^https://ja.nyahentai.org/',
		],
		date: '2020/02/26',
		func: function() {
			//pngの場合もある、その場合でも最初と最後はjpgだったり。
			//pngにしてダウンロードすると拡張子がjpegに自動書き換えされてた。謎。

			//ダウンロードのみPromise＋
			const _xhr_promise = function(url) {
				const p = new Promise((resolve, reject) => {
					//conDoW('js_xhr')
					let xhr = new XMLHttpRequest()
					xhr.open('GET', url, true)
					//xhr.responseType = 'text';
					xhr.onload = function() {
						resolve(xhr.response)
					}
					xhr.send()
				})
				return p
			}
			const _xhr_promise2dom = function(url) {
				const p = new Promise((resolve, reject) => {
					//conDoW('js_xhr')
					let xhr = new XMLHttpRequest()
					xhr.open('GET', url, true)
					xhr.responseType = 'document'
					xhr.onload = function() {
						resolve(xhr.response)
					}
					xhr.send()
				})
				return p
			}
			const _text_kaiseki = function(fullhtml, png) {
				let _text = fullhtml
				//上コンマある方が誤爆が減る。
				// let arr_url = _text.match(/"https:..search.pstatic.net.+?(\d+t).(png|jpg)"/g)
				let arr_url = _text.match(/"https:..t0.nyacdn.com.+?(\d+t).(png|jpg)"/g)
				if (!arr_url) {
					// conDoW('みっかんない')https://search.pstatic.net/common?src=https://t.nyahentai.net/galleries/1543265/8t.jpg
					return false
				}
				//重複削除
				arr_url = Array.from(new Set(arr_url))
				//コンマトリミング
				arr_url = arr_url.map((ite) => ite.slice(1, -1)) //resu.mapなんてプロパティ無いとエラー、matchがNULLだった。
				//変換
				arr_url = arr_url.map((val) => val
					.replace('t.nyahentai', 'i.nyahentai')
					.replace('t0.nyacdn.com', 'i0.nyacdn.com')
					.replace('mt.404cdn.com', 'mi.404cdn.com')
					.replace('t.jpg', '.jpg')
					.replace('t.png', '.png')
				)
				//例外的にpngに変換、やっぱjpgにpng追加する方式
				if (png) {
					const tmp = arr_url.map((val) => val
						.replace('.jpg', '.png')
					)
					arr_url = arr_url.concat(tmp)

				}

				console.log(arr_url)
				//let resu = resp.responseText.match(/(?<=")https:\/\/r18\.dawn.+?(?=")/g)
				//↑の正規表現がfirefox tamper でSyntaxエラー

				return arr_url
			}
			/** 生のウェブ上に書き出す、shadow使うとダウンロードツールが見れないから */
			const _色つけ = function(elem, flag = 1) {
				createEl(elem, 'div', null, {
					position: 'absolute',
					height: '100%',
					width: '100%',
					border: '20px solid #f009',
				})
				// const id = 'mycss'
				// const class1 = '_iro'
				// const class2 = '_iro2'
				// if (!document.getElementById(id)) {
				// 	createEl(document.body, 'style', {
				// 		id: id,
				// 		textContent:
				// 			`
				// 		.${class1}:after {
				// 		border: 20px solid #f008;
				// 		content: "";
				// 		position: absolute;
				// 		/* top: 0; */
				// 		left: 0;
				// 		width: 100%;
				// 		height: 100%;
				// 		/* display: block; */
				// 		}
				// 		.${class2}:after {
				// 			border: 20px solid #0f08;
				// 			content: "";
				// 			position: absolute;
				// 			/* top: 0; */
				// 			left: 0;
				// 			width: 100%;
				// 			height: 100%;
				// 			/* display: block; */
				// 			}
				// 	`,
				// 	})
				// }
				// if (flag == 1) {
				// 	elem.classList.add('_iro')
				// }
				// if (flag == 2) {
				// 	elem.classList.add('_iro2')
				// 	elem.classList.remove('_iro')
				// }
			}
			/** リンク群のエレメントを作る */
			const _make_links = function(arr, title) {
				//let els = arr
				title = title
					.replace(/\//g, '／')
					.replace(/~/g, '〜')
					.replace(/.zip|.rar|\//, '')

				title = mydate('@yyyyMMddhhmmss-') + title
				//let rel = 'rel="noreferrer" '
				let htmlText = ''
				htmlText += arr.length
				//変数追加用、変数無しだとdownthemがポンコツでDL出来ないことある
				let ms = '?' + new Date().getTime()
				for (let [key, val] of arr.entries()) {
					// const numStr=('00'+(key+1)).slice(-3)
					const url = val
					let s
					s = url.substring(url.lastIndexOf('/') + 1)
					//後ろに？引数オプションが付いてたら消す
					s = s.replace(/\?.+/, '')
					const filename = s

					const numStr = ('000' + filename).slice(-7)
					htmlText += `<a href="${val}" title="${title}/${numStr}" >i</a>`
				}
				const span = document.createElement('span')
				span.className = '_uj_'
				span.innerHTML = htmlText
				return span
			}
			/**以前はサムネからDLのURLを作ってたから変換してた、今は要らない？ */
			const _henkan = (arr_url) => {
				//変換
				return arr_url.map((val) => val
					.replace('t.nyahentai', 'i.nyahentai')
					.replace('t1.nyacdn.com', 'i0.nyacdn.com')
					// .replace('t1.nyacdn.com', 'i1.nyacdn.com')
					.replace('mt.404cdn.com', 'mi.404cdn.com')
					.replace('t.jpg', '.jpg')
					.replace('t.png', '.png')
				)
			}
			/** ダウンロード履歴 
			 * @returns {LSclass}
			*/
			const LSclass = class {
				constructor(storageKey) {
					this.storageKey = storageKey
				}
				overwrite(csv) {
					localStorage.setItem(this.storageKey, csv)
				}
				down履歴保存(str) {
					let csv = localStorage.getItem(this.storageKey)
					if (csv === null)
						csv = ''
					else
						str = ',' + str
					localStorage.setItem(this.storageKey, csv + str)
				}
				down履歴取り出しarr() {
					let csv = localStorage.getItem(this.storageKey)
					if (csv === null) csv = ''
					let arr = csv.split(',')
					console.log(arr)
					return arr
				}
			}
			const getPageId = (url) => url.match(/(?<=g\/)\d+/)
			async function dl_from_view(el, png = 0) {
				window.onbeforeunload = function(event) {
					event = event || window.event
					event.returnValue = 'ページから移動しますか？'
				}
				console.log('dofo')
				_色つけ(el, 1)
				const rootEL = el//.parentElement
				const url = rootEL.href + '/list2/'
				const caption = rootEL.querySelector('div').textContent
				console.log(url, caption)
				const fullhtml = await _xhr_promise(url)
				const newDoc = await _xhr_promise2dom(url)
				let urlArrFromDom = [...newDoc.querySelectorAll('section>img.list-img')].map(v => v.dataset.src)
				// console.log(newDoc, elArr)

				//ダウンロード履歴
				let hoo = downzumi
				//https://ja.nyahentai.com/g/338113/list2/
				hoo.down履歴取り出しarr()
				hoo.down履歴保存(getPageId(url))

				//追記、それ以外にもブラウザ表示出来るのにDownthemallでダウンロード失敗するファイルが存在する
				//https://i0.nyacdn.com/galleries/1778723/75.jpg
				//後ろに?randを付けるとダウンロードできる、めちゃおそ。新しい環境作っても同じ。
				if (0) {
					let ms = new Date().getTime()
					urlArrFromDom.forEach((val, i, arr) =>
						arr[i] += '?' + ms
					)
				}
				//オプションpngの拡張子に変える,追記、DL失敗するのはPNGだからかと思ったらURL自体死んでた。
				if (png) {
					// alert('png')
					let copyArr = [...urlArrFromDom]
					copyArr = copyArr.map((val) => val
						.replace('.jpg', '.png'))
					urlArrFromDom.push(...copyArr)
				}
				console.log(urlArrFromDom)
				// urlArrFromDom = _henkan(urlArrFromDom) //サムネからURL推測してた遺産
				const url_arr = urlArrFromDom//_text_kaiseki(fullhtml, png)
				const span = _make_links(url_arr, caption)
				Object.assign(span.style, {
					position: 'absolute',
					display: 'flex',
					//flexWrap: 'wrap',
					color: 'white',
					//width: '40px',
					overflow: 'hidden',
					width: '100%',
					fontSize: 'large',
					backgroundColor: '#0f04',
				})
				rootEL.appendChild(span)
			}
			//elをリストアップして、ダウソ済みに色
			const down済みに色 = function(el, downedIdArr) {
				el.querySelectorAll('.gallery').forEach(v => {
					//console.log(v.firstElementChild.href)
					let el = v.firstElementChild
					let id = v.firstElementChild.href.match(/\d+/)[0]
					let result = downedIdArr.includes(id)
					if (result) {
						console.log(id)

						// _色つけ(v.firstElementChild)
						createEl(el, 'div', null, {
							position: 'absolute',
							height: '100%',
							width: '100%',
							border: '20px solid #0f09',
						})

					}
				})
			}
			//日本語以外をフィルター
			const japaneseFillter = (el, callbak) => {
				callbak = callbak || ((v) => v.style.opacity = 0.4)
				const selector = '.gallery:not([data-tags*="6346"]),.gallery[data-tags*="29963"],.gallery[data-tags*="12227"]'
				el.querySelectorAll(selector).forEach(callbak)
				// 12227
			}
			//main
			create_css_without_css(
				{selector: 'a:before', deco: {content: '"■"'}, },
				{selector: 'a', deco: {color: 'blueviolet'}},
				// {selector: 'a:visited', deco: {coler: 'red !important'}},
				// ['a:visited', {coler: 'red !important'}],
				// ['a:befor', {content:'■'}]
			)
			const downzumi = new LSclass('downzumi')
			let downIdList = downzumi.down履歴取り出しarr()
			down済みに色(document, downIdList)
			japaneseFillter(document)
			uo.選択テキスト検索ボタン('/search/q_%word%')

			// 右クリックにイベントつける
			document.addEventListener('contextmenu', function(ev) {
				//alt抜け
				if (ev.altKey) return
				//pngに変換してDL
				const conv_png = (ev.ctrlKey)
				console.log(conv_png)

				let el = ev.target
				//判定
				while (el) {
					// conDoW([el.tagName, el.className])
					//条件に合えばbreak、while式内でも出来たが、否定にしたり読みにくいのでif break
					if (el.tagName == 'A' &&
						el.className == 'cover target-by-blank' &&
						1) break
					//上の要素へ
					el = el.parentElement
					//HTMLまで来たら終了
					if (el.tagName === 'HTML') return false //走査終了	
				}
				ev.preventDefault()
				dl_from_view(el, conv_png)
			}, !false)

			//専用ボタン
			{
				const buttonsEl = [
					getButtonWithFunc(function スパン削除() {document.querySelectorAll('._uj_').forEach(v => v.remove())}),
					getButtonWithFunc(japaneseFillter.bind(null, document)),
					getButtonWithFunc(japaneseFillter.bind(null, document, v => v.style.display = 'none')),
					getButtonWithFunc('ダウソ履歴', () => {
						document.querySelectorAll('.gallery').forEach(v => console.log(v.firstElementChild.href))
					}),
					getButtonWithFunc('履歴表示を重複削除して上書き', () => {
						const oldlist = downzumi.down履歴取り出しarr()
						conDoW(oldlist.length)
						let tyoufukunashi = [...new Set(oldlist)]
						conDoW(tyoufukunashi.length)
						downzumi.overwrite(tyoufukunashi.join(','))
					}),
					getButtonWithFunc('list2を一覧ぽく', () => {
						const el = qsaa('#image-container')[0]
						Object.assign(el.style, {
							display: 'flex',
							flexWrap: 'wrap',
						})
						let style = document.createElement('style')
						style.textContent = '.list-img{width: 40px !important}' //優先順位負けるからimp必須
						document.body.appendChild(style)
					}),
					getButtonWithFunc('直接list2からリンク作成', () => {
						//サムネイルからリストもやろうと思ったけど、サーバーに番号入ってて無理
						//リスト作る
						let el_list = qsaa('#image-container img')
						let url_arr = el_list.map(v => v.src)

						//caption
						const caption = el_list[0].alt.replace(/ - Picture \d+$/, '')
						conDoW(caption)

						//ブラウザで表示されるとjpg png になる。svgはまだ。
						let svg = url_arr.reduce((acc, v, i) =>
							(v.indexOf('svg') > -1) ? acc += i + ',' : acc
							, '')
						//抜け svgがあるなら
						if (svg.length) return conDoW(svg)

						const span = _make_links(url_arr, caption)

						downzumi.down履歴保存(getPageId(location.href))
						conDoW(span)
						return
					}),

				]
				conDoW(buttonsEl, {addition: true})
			}

			//オートページャーで再発火
			document.body.addEventListener('AutoPagerize_DOMNodeInserted', function(evt) {
				let node = evt.target
				//var requestURL = evt.newValue;
				//var parentNode = evt.relatedNode;
				japaneseFillter(node)
				down済みに色(node, downIdList)
			}, false)
		},
	},
	{/* ヤフコメ */
		name: 'ヤフコメ',
		url: ['^https://headlines.yahoo.co.jp/cm/',],
		date: '2019/12/12',
		func: async () => {
			await sleep(2000)
			//contentWindow
			const start_page = 1
			const page_times = 10
			const comment_num = 50
			const frame_height = '500px'//'12000px'
			const sleep_time = 3000
			const insertFrame = (times, page, baseNode) => {
				if (times <= 0) return
				const frameURL = `https://news.yahoo.co.jp/comment/plugin/v1/full/?origin=https://headlines.yahoo.co.jp&sort=${baseNode.getAttribute('data-sort')}&order=${baseNode.getAttribute('data-order')}&page=${page}&type=t&keys=${baseNode.getAttribute('data-keys')}&full_page_url=${baseNode.getAttribute('data-full-page-url')}&comment_num=${baseNode.getAttribute('data-comment-num')}`
				// const el = document.createElement('iframe')
				// el.src = frameURL
				// el.outerHTML = `<iframe class="news-comment-plguin-iframe" scrolling="yes" frameborder="0" src="${frameURL}" style="width: 100%; height: ${frame_height}; border: none;"></iframe>`
				// baseNode.insertAdjacentElement('beforeend', el)
				const frameNew = `<iframe class="news-comment-plguin-iframe" scrolling="yes" frameborder="0" src="${frameURL}" style="width: 100%; height: ${frame_height}; border: none;"></iframe>`
				baseNode.insertAdjacentHTML('beforeend', frameNew)
				conDoW(getButtonWithFunc(times, () => insertFrame(times - 1, page + 1, baseNode)))
				// setTimeout(() => {insertFrame(times - 1, page + 1, baseNode)}, sleep_time)
			}
			const replaceFrame = () => {
				const iframes = document.querySelectorAll('iframe.news-comment-plguin-iframe')
				const baseNode = iframes[0].parentNode
				if (baseNode.getAttribute('data-page-type') !== 'full') return
				iframes.forEach(iframe => baseNode.removeChild(iframe))
				baseNode.setAttribute('data-comment-num', comment_num)
				insertFrame(page_times, start_page, baseNode)
			}
			conDoW(getButtonWithFunc('time', () => replaceFrame()))
			// replaceFrame()

		},
	},
	{/* kk chakue */
		name: 'kk chakue',
		url: ['^https://xn--icktho51ho02a0dc.com/',],
		date: '2020/01/24',
		func: async () => {
			//https://着エロ動画.comじゃ無理だった。元の関数書き換えれば対応出来るだろうけど。
			createEl(document.body, 'style', {
				textContent: '.eyecatch__cat{opacity: 0.0; }'
			})
		},
	},
	{/* seesaawiki.jp/spacebattleshipstory */
		name: '--off--seesaawiki.jp/spacebattleshipstory',
		url: ['^https://seesaawiki.jp/spacebattleshipstory/',],
		date: '2020/07/10',
		func: () => {
			uo.選択テキスト検索ボタン('/spacebattleshipstory/search?search_type=2&search_target=all&keywords=%word%&x=38&y=23')
			//https://seesaawiki.jp/spacebattleshipstory/search?search_type=2&search_target=all&keywords=%word%&x=38&y=23
		},
	},
	{/* google photo */
		name: 'google photo',
		url: ['^https://photos.google.com/',],
		date: '2020/07/07',
		func: async () => {

			const _sakujo = function() {


				if (Array.from(document.querySelectorAll('span'))
					.find(el => el.textContent === '選択中')) {
					alert('選択中は簡単削除はできない仕様')
					return
				}
				document.querySelector('button[title="削除"]').click()
				!(function loop(loopCount = 0) {
					log(loopCount)
					//ディレイ
					if (loopCount > 3) {

						let elem = Array.from(document.querySelectorAll('span'))
							.find(el => el.textContent === 'ゴミ箱に移動')

						if (elem) {
							elem.click()
							return
						}
					}

					if (loopCount > 30) return //強制抜け
					setTimeout(() => loop(loopCount + 1), 100)
				})()
				//qsでcontain()
				// Array.from(document.querySelectorAll('span')).find(el => el.textContent === 'ゴミ箱に移動').click()
				//選択＋一枚表示の時は#削除効かない、スクリプトで削除すると選択関係なく削除される。
				//ので選択中は削除イベント無効にしたい。
			}

			const _evFunc = function(ev) {
				// console.log(ev)
				//mouseEv.button 1がホイール
				if (ev.button !== 1) return
				//alert(ev.which)
				ev.preventDefault()
				_sakujo()
			}

			//main
			document.addEventListener('mousedown', _evFunc, !false)

		},
	},
	{/* タイピングゲームに枠を付ける */
		name: 'タイピングゲームに枠を付ける',
		url: [
			'^https://vignette.wikia.nocookie.net/',
			'^http://typingx0.net/easy/',
		],
		date: '2020/07/29',
		func: () => {
			console.log('タイピング')
			console.log('https://vignette.wikia.nocookie.net/soul-knight/images/f/fe/Stub.png/revision/latest/smart/width/53/height/53?cb=20190306044310')



			// スクロール位置記憶
			let keyscroll = 'スクロール位置'
			let scrollPx = localStorage.getItem(keyscroll)
			console.log(scrollPx)
			document.documentElement.scrollTop = scrollPx

			var timer = null

			function func() {
				clearTimeout(timer)
				timer = setTimeout(function() {
					scrollPx = document.documentElement.scrollTop
					console.log(scrollPx)
					localStorage.setItem(keyscroll, scrollPx)

				}, 1 * 1000)
			}

			document.addEventListener('scroll', func, {passive: true})

			//ブラウザで作ったぼかしDIV

			let outerHtml = localStorage.getItem('bodydiv_inner')
			//ブラウザからコピーしてくる
			if (!outerHtml) outerHtml = `
			<div id="bodydiv">
			<div style="position: absolute; z-index: 102; top: 511px; background-color: rgba(255, 255, 255, 0); width: 126px; height: 28px; cursor: move; resize: both; overflow: hidden; border: 3px solid rgba(255, 255, 68, 0.667); border-radius: 5px; left: 487px;"></div><div id="boka1" style="position: absolute; z-index: 97; top: 438px; width: 501px; height: 132px; cursor: move; resize: both; border: 3px solid rgba(255, 235, 59, 0.31); border-radius: 5px; left: 232px; backdrop-filter: blur(2.4px); overflow: auto;"></div><div style="position: absolute; z-index: 99; top: 511px; background-color: rgba(255, 255, 255, 0); width: 124px; height: 28px; cursor: move; resize: both; overflow: hidden; border: 3px solid rgba(255, 255, 68, 0.667); border-radius: 5px; left: 299px;"></div></div>
			`

			//el.outerHTMLは親要素無いと使えない。じゃあinnerと変わらん。
			let tempEl = document.createElement('div')
			tempEl.innerHTML = outerHtml
			let bodydiv = tempEl.children[0] //nodesにすると改行やテキストも出てくる。

			document.body.appendChild(bodydiv)

			//便利関数
			const log = console.log
			const qsaa = (s, o = document) => [...o.querySelectorAll(s)]
			const qs = (s, o = document) => o.querySelector(s)

			//bodydivの下にDnDイベントを付ける
			![...bodydiv.children].forEach(v => addEventDnD(v))

			function addEventDnD(el) {
				let _posX, _posY, _el = el, _deb = true
				//グローバル変数、リスナーには基本、引数渡せないから・・・
				let _g = {
					posX: null,
					posY: null,
					el: el,
				}
				// let handle = { handleEvent: mouseMoveListener, }

				function mouseMoveListener(ev) {
					const {el, posX, posY} = _g
					el.style.left = ev.pageX - posX + 'px'
					el.style.top = ev.pageY - posY + 'px'
					localStorage.setItem('bodydiv_inner', bodydiv.outerHTML)
				}
				function moDownLis(ev) {
					//抜ける条件
					{
						//シフトコンビ
						if (0 && !ev.shiftKey) {
							ev.preventDefault() //focus移動しないように
							return
						}
						//右下10px以外なら抜ける、リサイズへ
						if (el.clientHeight - ev.offsetY < 15
							&& el.clientWidth - ev.offsetX < 15) return
					}

					ev.preventDefault()
					_posX = ev.offsetX
					_posY = ev.offsetY
					_g.posX = ev.offsetX
					_g.posY = ev.offsetY

					_deb && log([ev.target.id, ev.currentTarget.id])

					//ドラッグイベント
					document.addEventListener('mousemove', mouseMoveListener)

					// //ドラッグイベント消すイベント
					document.addEventListener('mouseup', (ev) => {
						_deb && log(['UP', el.id, ev.target.id, ev.currentTarget.id])
						document.removeEventListener('mousemove', mouseMoveListener)// this)//handle)
					}, {once: true})

				}
				//マウス押した
				el.addEventListener('mousedown', moDownLis, {passive: false})

			}
		},
	},
	{/* YouTubeのラジオダウンロード、YouTube Video and Audio Downloader */
		name: 'YouTubeのラジオダウンロード、YouTube Video and Audio Downloader',
		url: [
			'^https://www.youtube.com/',
			'https://cdn.profile-image.st-hatena.com/',
		],
		date: '2020/07/31',
		func: () => {
			console.log('222')

			const _文字列の日付ぽいものに7日足す = function(str) {
				// let url = decodeURI(window.location.href)
				console.log(str)
				str = str.replace(/(\d{4})(.)(\d+)(.)(\d+)/, (all, year, s1, month, s2, day) => {
					// console.log(all, year, s1, month, s2, day)
					let date = new Date(`${year}-${month}-${day}`)
					date.setDate(date.getDate() + 7)
					// console.log(date, date.getMonth(), date.getDate());
					const m = ('0' + (date.getMonth() + 1)).slice(-2)
					const d = ('0' + (date.getDate() + 0)).slice(-2)
					return date.getFullYear() + s1 + m + s2 + d
				})
				return str
			}

			conDoW.add(getButtonWithFunc('日付＋7', () => {
				let url = decodeURI(window.location.href)
				console.log(url)
				url = _文字列の日付ぽいものに7日足す(url)
				window.location.href = url
			}))
			conDoW.add(getButtonWithFunc('ボックス日付＋7', () => {
				let url = decodeURI(window.location.href)
				let el = document.querySelector('input.ytd-searchbox')
				el.value = _文字列の日付ぽいものに7日足す(el.value)
				document.querySelector('#search-icon-legacy').click()
				// console.log(url)
				// url = _文字列の日付ぽいものに7日足す(url)
				// window.location.href = url
			}))




			//await new Promise(r => setTimeout(r, 3000))
			if (location.href.match('https://www.youtube.com/watch')) {

				!(function loop(i = 0) {
					console.log(i)
					let elem = document.querySelector('div.iaextractor-new-button')
					if (elem) {elem.click(); return }
					setTimeout(() => loop(i + 1), 300)
				})()
			}

			// function loop2(i = 0) {
			// 	//拡張のiframeは操作できないぽい
			// 	console.log('ifra' + i)
			// 	let elem = document.querySelectorAll('iframe').forEach(item => {
			// 		let doc = item.contentWindow.document
			// 		let el = Array.from(doc.querySelectorAll('span'))
			// 			.find(el => el.textContent === 'WEBM audio-only - OPUS 48K')
			// 		if (el) return (el)
			// 	})
			// 	if (elem) {elem.parentElement.parentElement.click(); return }
			// 	setTimeout(() => loop2(i + 1), 300)
			// 	// document.querySelector('iframe[src^="moz-extension"]')
			// }


		},
	},
	{/* youtube */
		name: 'youtube',
		url: ['^https://www.youtube.com/',],
		date: '2020/08/04',
		func: () => {


		},
	},
]
/*
	{// 
		name: '',
		url: ['^',],
		date: '',
		func:  () => {
		},
	},
*/


/** url専用関数の配列を、走査して実行 */
function sousa_do(obj) {
	//配列からpatternを作り、targetでRegExp.test
	//ほぼ正規表現だが、ドットが使えず、*はワイルドカードのあつかい。配列はパイプjoin
	function arr2ReStr(url_arr, url2) {
		let urlpai = url_arr.join('|').replace(/\./g, '\\.') //.は正規表現のためにエスケープ
		urlpai = urlpai.replace(/\*/g, '.*?') //ワイルドカードを実装。
		//conDoW(urlpai)
		let patt = new RegExp(urlpai, 'i')
		return patt.test(url2)
	}

	//main
	for (let [key, val] of Object.entries(obj)) {
		//conDoW(key,val)
		let {name, url, func, exc, date} = val
		if (!date) {
			date = new Date().toLocaleString()
		}

		if (!arr2ReStr(url, location.href)) continue
		//例外処理
		if (exc && arr2ReStr(exc, location.href)) {
			conDoW('exc->', exc)
			continue
		}
		conDoW(`${name} $$$$$$$$$$$$$$$$$$$`)
		//val.func() //objから実行でスコープ固定、のつもりがthisつかわないし。
		func()
	}
}
//xdo() //メイン

//整備用
const 整備用 = function() {
	if (location.href.match('http://localhost:8888/favicon.ico')) {

		function arr_seibi() {
			for (let i = 0, l = arr.length; i < l; i++) {
				let v = arr[i]
				//objの並び替えと初期値
				arr[i] = {
					// name: v[0],
					// urls: v[1],
					// ends: v[3] || 0,
					// func: v[2],
					// play: v.play,
					// uniq: v.uniq,
					// func: v.func
					name: v.name,
					url: v.url,
					//end: v.end || 0,
					date: v.date || '',
					func: v.func,
				}
			}
		}
		arr_seibi()

		import('http://localhost:8888/js/mod.js')
			.then((mod) => {
				console.log(mod)
				// インポートしたモジュールが、module にセットされています

				let str = mod.obj_to_txt(arr)
				mod.dom_copy('const arr=' + str)
				// module を使った処理を記述します
			})
		// import * as lib from 'http://localhost:8888/js/mod.js'
	}
}
const main = function() {
	//main/////////////////////////////////////
	// const log = conDoW
	conDoW(`\n${(new Date).toLocaleString()}`)
	conDoW(`${Date.now() - time}ms main ##########################`)
	conDoW('@version 2019.11.16.113733')

	//ここで走査しつつ実行
	sousa_do(arr)

	整備用()
	conDoW(`${Date.now() - time}ms エラー無し##########################`)
}
main()
