const arr = [
   [
      '全部b',
      ['^http',],
      function() {


         function fn_localStorage() {
            let count = `localStorage[${localStorage.length}]`
            let btn = button_tukuru('clera', () => {localStorage.clear()})
            //og(btn)
            let btn2 = button_tukuru('view all', () => {
               let str = ''
               for (let [key, value] of Object.entries(localStorage)) {
                  str += (`${key}: ${value}\n`)
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
                  str += (`${key}: ${value}\n`)
               }
               log(str)
            })
            log(count, btn, btn2)
         }
         fn_sessionStorage()
         cookie_view_del()

      },
   ],
   [
      '確認くん',
      ['^http://www.ugtop.com/spill.shtml',],
      function() {log('ugtop')},
   ],
   [
      'workflowy',
      ['^https://workflowy.com/',],
      function() {
         //const base = nsMiiya.gamen();// 画面作っちゃう
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
            //log(e)
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
         // // ボタンを作る
         // mkEle(base, 'button', {
         //     textContent: 'タスク',
         //     onclick: (e) => {
         //         dataSounyuF('#タスク ');
         //     },
         //     onmousedown: () => {return false} //アクティブ無効化
         // });
         // mkEle(base, 'button', {
         //     textContent: '日付',
         //     // style:'all: initial;',
         //     onclick: (e) => {
         //         dataSounyuF();
         //         /**/
         //     },
         //     onmousedown: () => {return false}
         // });
      },
   ],
   [
      'ルーターログイン',
      ['^https?://192.168.\d+.\d+',],
      function() {
         const base = nsMiiya.gamen()// 画面作っちゃう
         function fff(params) {
            document.getElementById('userName').value = 'admin'
            document.getElementById('pcPassword').value = 'ttoomm99'
            document.getElementById('loginBtn').click()
         }
         fff()
         mkEle(base, 'button', {
            textContent: 'ルーター',
            onclick: fff,
         })
      },
   ],
   [
      '楽天スーパーヒーロー',
      ['^https://campaign.rakuten.jp/heroes/',],
      function() {
         const base = nsMiiya.gamen()// 画面作っちゃう	
         mkEle(base, 'button', {
            textContent: 'callbtn',
            onclick: (ev) => {
               document.querySelector('.callbtn').click()
            }
         })
         mkEle(base, 'button', {
            textContent: '受け取らず',
            onclick: (ev) => {
               document.querySelector('img[alt="受け取らずに次へに進む"]').click()
            }
         })
         let flag = true
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
         })
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
   ],
   [
      'infoの報告',
      [
         '^https://pointmail.rakuten.co.jp/subcard/complete',
      ],
      function() {
         document.querySelector('#completionReportBtn').click()
      },
   ],
   [
      'メールdeポイント',
      [
         '^https://member.pointmail.rakuten.co.jp/box/*',
      ],
      function() {
         const title = 'メールポイント'
         const base = nsMiiya.gamen()// 画面作っちゃう
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
         mkEle(base, 'button', {
            onclick: suteFunc,
            textContent: 'mail de p',
         })
         new GM_registerMenuCommand(title + '2', suteFunc, 'C')
         if (location.href.match('https://member.pointmail.rakuten.co.jp/box/ItemDetail/.+')) {
            arebaCli('.point_url>a') //spanClickしても数字減ったけど記録されず
         }
      },
   ],
   [
      '楽天enaviでクリックポイント',
      ['^https://www.rakuten-card.co.jp/*',],
      function() {
         const base = nsMiiya.gamen()// 画面作っちゃう
         async function enaviClick() {
            let elemList = document.querySelectorAll('[id^="position"]')// cssセレクタでhasが使えないからloop検索
            log('クリック箇所=' + elemList.length)
            for (let i = 0; i < elemList.length; i++) {
               if (i < 0) {
                  //前半スキップ
                  //continue;
               }
               if (elemList[i].querySelector('img[src$="check.gif"]')) {
                  let s = elemList[i].querySelector('a[href^=\'javascript\']')// .textConten;
                  // log(s.textContent);
                  s.style = 'box-shadow: 0 0 0px 3px rgba(222, 111, 222, 0.90);'
                  log('クリック')
                  s.click() // クリック
                  //早くしすぎると歯抜けになる
                  await new Promise((r) => setTimeout(r, 891)) // sleep
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
         })
      },
   ],
   [
      'Infoseekのラッキーくじサッカー',
      ['^https://www.infoseek.co.jp/Luckylot*',],
      function() {
         if (location.href === 'https://www.infoseek.co.jp/Luckylot/result') {
            log('サッカーくじ終わり')
            location.href = 'https://www.infoseek.co.jp/'
         }
         //https://www.infoseek.co.jp/Luckylot/result
         // if (GM_getValue('毎日くじ次へ')) {
         // 	GM_setValue('毎日くじ次へ', null);
         // 	location.href = 'https://www.infoseek.co.jp/';
         // } else {
         // 	log('くじセット');
         // 	GM_setValue('毎日くじ次へ', 1);
         // }
         const base = nsMiiya.gamen()// 画面作っちゃう
         let fn = async function() {
            await new Promise((r) => setTimeout(r, 500)) // sleep
            document.querySelector('.isluckykuji_start').click()
            await new Promise((r) => setTimeout(r, 500)) // sleep
            document.querySelector('.isluckykuji_select:nth-of-type(1)').click()
            log('ow')
         }
         //new GM_registerMenuCommand(title, fn, 'C');
         fn()
      },
   ],
   [
      'infoミニくじ',
      ['^https://www.infoseek.co.jp/(\?.+)?$',],
      function() {
         const el = document.querySelector('area.islot_lot')
         if (el !== null) {el.click()}
      },
   ],
   [
      'enavi自動ログイン',
      [
         '^https://www.rakuten-card.co.jp/e-navi/index.xhtml',
      ],
      async function() {
         await new Promise((r) => setTimeout(r, 1500)) // sleep
         //chromeのオートコンプリートでパスワードはあるように見えるが空欄状態、画面Clickで値が入る
         if (document.querySelector('#u').value !== '' &&
            document.querySelector('#p').value !== ''
         ) {
            log(1)
            //document.querySelector('#loginButton').click();
         }
      },
   ],
   [
      '楽天系の毎日くじ',
      [
         '^https://www.infoseek.co.jp/',
         '^https://kuji.rakuten.co.jp/',
         '^http://www.rakuten.co.jp',
         '^https://www.infoseek.co.jp/Luckylot*',
         '^https://isbingo.www.infoseek.co.jp/isbingo/getCard',
         '^https://pointmail.rakuten.co.jp/subcard/complete',
      ],
      function() {
         const base = nsMiiya.gamen()// 画面作っちゃう	
         mkEle(base, 'button', {
            textContent: '楽天くじ',
            onclick: this.rakuTop2kuji,
         })
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
            const s = this.host[i].replace(/[*?]/g, '') // g繰り返し
            mkEle(base, 'a', {
               textContent: s,
               href: s,
            })
            mkEle(base, 'br', {})
         }
         // rakuTop2kuji: function() {
         // 	arebaCli('a[href^="https://rd.rakuten.co.jp/s/?R2=https%3A%2F%2Fkuji.rakuten.co.jp"]');
         // }
      },
   ],
   [
      '楽天系のくじの自動Click',
      ['^https?://kuji.rakuten.co.jp/',],
      async function() {
         // if (GM_getValue('毎日くじ次へ')) {
         // 	GM_setValue('毎日くじ次へ', null);
         // 	location.href = 'https://www.infoseek.co.jp/Luckylot';
         // } else {
         // 	log('くじセット');
         // 	GM_setValue('毎日くじ次へ', 1);
         // }
         await new Promise((r) => setTimeout(r, 1000)) // sleep
         arebaCli('#entry')
      },
   ],
   [
      'google',
      ['^https?://www.google.(?:com|co.jp)/',],
      function() {
         let d = !!0
         d && log('google no redirect')
         //Array.prototypeは[]で置き換え可能
         Array.prototype.forEach.call(document.querySelectorAll('h3.r > a'), function(elem) {
            d && log(elem.textContent)
            elem.onmousedown = function() {}
         })
      },
   ],
   [
      'kkonload',
      ['^https://openloadpro.com/',],
      function() {
         let d = !true
         d && log('zippys')
         //arebaCli('.openload-link > a:nth-child(1)');
         let url = document.querySelector('.openload-link > a').href
         location.href = url
      },
   ],
   [
      'kkビデオタグあったら全画面にして上に',
      [
         '^https://xn--icktho51ho02a0dc.com/*/',
         'https://asianclub.tv/',
         'https://embed.media/',
      ],
      function() {


         video_top_play()
         log(button_tukuru('video再生', video_top_play))//動かない？
         log(button_tukuru('video再生arr', () => video_top_play()))
         log(button_tukuru('head saku', () => {
            document.head.remove() //狂って酷いことに
         }))
         log(button_tukuru('videoのみ', () => {
            let video = document.querySelector('video')
            document.body.parentNode.remove()
            document.appendChild(video)
         }))
      },
   ],
   [
      'javmix大画面',
      ['^https://javmix.tv/video/*/',],
      function() {
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



         //log(elm.src)
         log(create_href(elm.src))
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
         //log(button_tukuru('moichi', kore))

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
      },
   ],
   [
      'ファン座で自動再生',
      [
         '^https://www.dmm.co.jp/digital',
         '^https://www.dmm.com/*/',
      ],
      function() {
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
            log(this.readyState)
         }
         arebaCli('#detail-sample-movie div a', 0)
         //log(document.readyState)
         //document.addEventListener("DOMContentLoaded", hoge)
         //DOMContentLoaded = () => log("load1")
         //await sleep(2000)

         //hoge()
         log(button_tukuru('iframe', hoge))


         //let url = document.querySelector('.openload-link > a').href
         //location.href = url
      },
   ],
   [
      'KK_dropbooks',
      [
         '^https://dropbooks.tv/',
         '^http://dlbooks.to/',
         '^http://xbooks.to/',
      ],
      function() {
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
         d && log('cssセレクタで', els.length)
         for (let i = 0; i < els.length; i++) {
            //const newel=document.createElement('a');
            let el = els[i]
            const cnode = el.cloneNode(true)
            //.appendChild(cnode);
            cnode.textContent = '■'
            el.parentElement.insertBefore(cnode, el)
            el.href = el.href.replace('/detail/', '/detail/download_zip/')
            el.textContent = '◆' + el.textContent
            //d && log(el.href);
         }
         //プレビュー作っちゃう
         //作ろうと思ったけどサムネのURLがxhrしないとわかんないから保留
         //let globalInFn = (function() {return this})(); // ここじゃグローバル取れないぽ

         els = document.querySelectorAll('a[onclick^="bookStand"]')
         for (let i = 0; i < els.length; i++) {
            let el = els[i]
            //el.onclick=()=>log(1111);//動作するがhtmlはそのまま,オートページャーで消える
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
      0,
   ],
   [
      'KKsmvto',
      ['^http://smv.to/*',],
      function() {
         //Clickされたノードを判定する
         function hantei(ev) {
            //log(e);	
            log(ev.target.tagName, ev.target.className)
            //log(e.target);
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
                  e.stopPropagation()
                  //e.preventDefault();
                  //log(e);
                  //return false;
               },
               onclick: function(e) {
                  // log(this);
                  // log(e.target);
                  this.parentNode.removeChild(this)
               },
            }))
            let num = parseInt(ev.target.getAttribute('count'))
            log(num, ev.target.src)
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
   ],
   [
      'zippyshare',
      ['^https://www*.zippyshare.com/v/',],
      function() {
         let d = !true
         d && log('zippys')
         arebaCli('#dlbutton', 3, true)
         // let url = document.querySelector('#dlbutton').href
         // location.href = url
      },
   ],
   [
      'mx-sh',
      ['^https://mx-sh.net/',],
      function() {
         let d = !true
         d && log('zippys')
         arebaCli('#Downloadfre')
      },
   ],
   [
      'wupfile',
      ['^https://wupfile.com/',],
      function() {
         let d = !true
         d && log('zippys')
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
            log(time)
            log(el.disabled)
            if (!el.disabled) {
               el.click()
               return
            }
            setTimeout(tryDownload, 5000)
         }())
      },
   ],
   [
      'jolinfile',
      ['^https?://jolinfile.com',],
      function() {
         let d = !true
         d && log('http://jolinfile.com')
         arebaCli('[value="Free Download"]')
         arebaCli('#dd_link');
         (function tryDownload() {
            let time = new Date()
            let el = document.querySelector('#downloadbtn')
            log(time)
            log(el.disabled)
            if (!el.disabled) {
               el.click()
               return
            }
            setTimeout(tryDownload, 5000)
         }())
      },
   ],
   [
      'rapidgator',
      ['^https://rapidgator.net/',],
      function() {
         let d = !!true
         d && log('mexa')
         arebaCli('.link.act-link.btn-free')
         arebaCli('.btn-download')
      },
   ],
   [
      'mexa_sh',
      ['^https://mexa.sh/',],
      function() {
         let d = !!true
         d && log('mexa')
         arebaCli('#Downloadfre')
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
      },
   ],
   [
      'dousyoko',
      ['^https?://.+.dousyoko.net/',],
      function() {
         let d = !!true
         const $ = (...s) => document.querySelectorAll(...s)
         d && log($('#download_pass').value)
         $('#download_pass')[0].type = 'text'
         $('#download_pass')[0].value = 'dddd'
         d && log('dddd')
         arebaCli('.submit')
      },
   ],
   [
      'z2icom',
      [
         '^https://z2i.com/',
         '^https://im1.io/',
         '^https://shrinx.net',
      ],
      async function() {
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
         await new Promise((r) => setTimeout(r, 4500)) // sleep
         arebaCli('#invisibleCaptchaShortlink')
         //await sleep(3000)
         //await new Promise((r) => setTimeout(r, 3500)); // sleep
         //<a href="https://www116.zippyshare.com/v/pu2Jljh0/file.html" class="btn btn-success btn-lg get-link">Get Link</a>
         arebaCli('a[href*="zippyshare.com"]', null, true)
         //location.href = document.querySelector().href
      },
   ],
   [
      '表示禁止サイト',
      [
         '^https://playingcards.jp',
         '^ahttps://smcb.jp/',
      ],
      function() {
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
   ],
   [
      'localhostとfile:///',
      [
         '^https://www.ugtop.com/',
         'news.google',
         'localhost',
         'file:///',
      ],
      async function() {
         'use strict'
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

      },
   ],
   [
      'dawnfun.com/',
      ['^https://r18.dawnfun.com/',],
      async function() {
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
   ],
   [
      'manga314',
      ['^https://manga314.com/',],
      async function() {
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
                  ev.preventDefault()
                  log('これじゃ' + ev.target.innerHTML)
                  _GM_xhr(ev.target.href, ev.target.innerHTML)
               }
            } while (false)
         }, false)

         // 右クリックも作ってみる
         document.addEventListener('contextmenu', function(ev) {
            log(ev.shiftKey)
            if (ev.target.tagName == 'A' &&
               ev.target.rel == 'bookmark' &&
               ev.ctrlKey === false) {
               ev.preventDefault()
               log('◆これ◆' + ev.target.innerHTML)
               if (ev.shiftKey) {
                  _js_xhr(ev.target.href, ev.target.textContent)
                  //_js_xhr(ev.target.href, ev.target.textContent, 'zip')
                  return
               }
               ev.altKey
                  ? _GM_xhr(ev.target.href, ev.target.textContent)
                  : _dawnfun_only(ev.target.href, ev.target.textContent)
            }
         }, false)

         const _GM_xhr = function(url, title) {
            log('_GM_xhr')
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
            log('js_xhr')
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
               //log('js_xhr')
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
         const make_links = function(arr, title) {
            //let els = arr
            title = title
               .replace(/\//g, '@スラ')
               .replace(/~/g, '〜')
               .replace(/.zip|.rar|\//, '')

            title = mydate('@yyyyMMddhhmmss-') + title
            let rel = 'rel="noreferrer" '
            let hrefs = ''
            for (let val of arr) {
               hrefs += `<a href="${val}" ${rel}title="${title}">a</a> `
            }
            return hrefs
         }
         function text_kaiseki(fullhtml, title) {
            let _text = fullhtml
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
         const _kai_n_view = function(text, title, zip = false) {
            let url_arr = text_kaiseki(text)
            let html = make_links(url_arr, title)
            console.log(html)
            log(html)
            // ブラウザで圧縮ダウンロード完結、遅い・・・
            if (zip) _url_arr_down(url_arr, title)
         }
         //1つの関数にまとめたい
         /**
          * クリック後の処理を一つの関数に、コールバック無し
          * @param {*} url 
          * @param {*} title 
          * @param {*} zip 
          */
         const _dawnfun_only = async function(url, title, zip = false) {
            let htmltext = await _xhr_promise(url)
            let url_arr = text_kaiseki(htmltext)
            let html = make_links(url_arr, title)
            console.log(html)
            log(html)
            // ブラウザで圧縮ダウンロード完結、遅い・・・
            if (zip) _url_arr_down(url_arr, title)
         }
         //promise gm_xmlで画像を一個ずつダウンロード
         function _GM_xhr_promise(url) {
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
               log(val)
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
         function zipka(imgData) {
            console.log(zip)

            zip.file('blob_f.jpg', imgData, {blob: false})

         }
         //test用
         //_js_xhr('https://manga314.com/c79-galaxist-blade-%e9%9b%b7%e7%b1%a0-%e3%83%84%e3%83%81%e3%83%8e%e3%82%ab%e3%82%b4-%e9%ad%94%e6%b3%95%e5%b0%91%e5%a5%b3%e3%83%aa%e3%83%aa%e3%82%ab%e3%83%ab%e3%81%aa%e3%81%ae%e3%81%af', 'asdf')

         function atode_sakujo() {//画像のリンクを作る
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
               }))
               let zipname = waku.appendChild(Object.assign(document.createElement('input'), {
                  type: 'text',
                  value: document.title,
                  //document.title = decodeURIComponent(s)
                  onclick: function(e) {
                     //log(this, e)
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
                     //log(this, e)
                     e.target.select()
                     document.execCommand('copy')
                  },
               }))
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
               }))
               //base.textContent = urls
               base.innerHTML = hrefs
            }
         }

      },
   ],
   [
      'サークルKクーポン',
      [
         '^https://www.circleksunkus.jp/mypage/coupon/index.html',
      ],
      async function() {
         const d = !false
         if (document.title.match('クーポン')) {
            d && alert(document.title)
         } else {
            await new Promise((r) => setTimeout(r, 1000)) // sleep
            location.reload()
         }
         function kuponKaiseki() {
            let o = {}
            let cCode, cjc
            let el = document.querySelectorAll('.modal-open')
            let i = 1
            for (let key of el) {
               cCode = key.getAttribute('data-scs') + ''
               cjc = key.getAttribute('data-cjc') + ''
               o[i] = {'cCode': cCode, 'cjc': cjc}
               i++
            }
            return JSON.stringify(o)
         }
         const base = nsMiiya.gamen()// 画面作っちゃう	
         const tA = mkEle(base, 'textarea', {
            textContent: '{"1":{"cCode":"01098","cjc":"9830869000009"},"2":{"cCode":"01093","cjc":"9830867000001"}}',
            style: 'height: 7em;',
         })
         mkEle(base, 'br', {})
         //log('t1', this);
         mkEle(base, 'button', {
            textContent: 'josn書き出し',
            onclick: () => { //アロー関数定義でthis固定
               log(this, this.tA)
               tA.textContent = kuponKaiseki()
            },
         })
         mkEle(base, 'button', {
            textContent: 'josn読み込み',
            onclick: (event) => {
               const obj = JSON.parse(tA.textContent)
               log(obj)
               for (let key in obj) if (obj.hasOwnProperty(key)) {
                  log(key + ':' + obj[key])
                  mkEle(base, 'button', {
                     textContent: key,
                     onclick: () => {
                        log(obj[key])
                     }
                  })
               }
            }
            ,
         })
         mkEle(base, 'button', {
            textContent: 'Kクーポン',
            onclick: function(event) {
               mkEle(document.body, 'div', {
                  id: 'loadtest',
                  style: 'height:44px;background:#EEE',
               }, 'afterbegin')
               /*	nsMiiya.aloging('くじ' + event);
                   let xx = document.querySelectorAll('a[href^="https://rd.rakuten.co.jp/s/?R2=https%3A%2F%2Fkuji.rakuten.co.jp"]');
                   nsMiiya.aloging(xx.length);
                   xx[0].click();*/
            },
         })
      },
      0,
   ],
   [
      'サークルKスロット',
      [
         '^https?://app.circleksunkus.jp/slot_top.php',
      ],
      () => {document.querySelector('a[href*="slot"').click()},
      0,
   ],
]