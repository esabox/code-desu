// ==UserScript==
// @name        smvto
// @namespace    http://tampermonkey.net/
// @downloadURL  https://gist.github.com/esabox/e39a2eca4da94ba34115ce95bf2d1007/raw/smvto.user.js
// @updateURL    https://gist.github.com/esabox/e39a2eca4da94ba34115ce95bf2d1007/
// @homepageURL  https://gist.github.com/esabox/e39a2eca4da94ba34115ce95bf2d1007/edit
// @version      0.18
// @description  try to take over the world!
// @author       You
// @include      http*
// @grant        none
// ==/UserScript==
(function() {
    'use strict';
    let scriptName = '// smvto //'
    console.log(scriptName, '>', window.location.href);
    let list = {
        'dropbooks': {
            host: 'http://dropbooks.tv/',
            func: function() {
                // 一覧にshortcutリンク追加
                let r = document.evaluate(
                    '//div[@id="main2col"]/div[@class="content_list"]/div/a',
                    document, null, 7, null);
                for (let i = 0; i < r.snapshotLength; i++) {
                    //console.log(r.snapshotItem(i).href);
                    let e1 = r.snapshotItem(i);
                    // e2 = e1.parentNode.parentNode.children[1];
                    let elem = document.createElement('a');
                    let link = e1.href.replace('/detail/', '/detail/download_zip/');
                    elem.href = e1.href;
                    elem.appendChild(document.createTextNode('■■'));
                    // e1.parentNode.getElementsByTagName("h3")[0].appendChild(elem);
                    // //parentNode.
                    let ep = e1.parentNode.getElementsByTagName('h3')[0];
                    //◆だけじゃなく全部変えちゃう
                    ep.childNodes.item(0).href = link;
                    ep.insertBefore(elem, ep.childNodes.item(0));
                }
                // タイトル分かり易く
                if (location.href.match('word')) {
                    s = (location.href.match(/(?:word:)([^/]+)/) || [])[1];
                    if (!s) {
                        //alert(s);
                        s = (location.href.match(/(?:sort:)(.+)/) || [])[1];
                    }
                    document.title = decodeURIComponent(s)
                        + ' _' + document.domain;
                }
                return;
            }
        },
        smvto: {
            host: 'http://smv.to/*',
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
                            background-color: rgba(0,0,0,0.8);
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
                    console.log(num,ev.target.src);
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
		/*
		:{
			host:'',
			func:function(){},
		},
		*/
    };
    +function autoRunList() {
        let H;
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
                console.log(key);
                list[key].func();
                console.log('end' + key);
                //fn = list[i].fn; //thisが変わる
                // window.addEventListener("DOMContentLoaded", fn, false); //画像読み込み前に実行
                //return; //1つヒットしたら終わり
            }
        }
    }();
    console.log(scriptName + '>底辺');
})();