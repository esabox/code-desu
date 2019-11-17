// ==UserScript==
// @name         mypo.user.js
// @namespace    miiya
// @updateURL    https://gist.github.com/esabox/8213a51ef2f1a6be4313ece316421762/raw/mypo.user.js
// @homepageURL  https://gist.github.com/esabox/8213a51ef2f1a6be4313ece316421762/edit
// @version 2019.11.14.181252
// @description  3aa�R�F��������C�ɂ����Ȃ������薲�̒n�����̖{���̗\�z�B
// @author       �R�c��ӑ��Y���q��
// @include *
// @grant	GM_registerMenuCommand
// @grant 	GM_getValue
// @grant 	GM_setValue
// @grant 	GM_deleteValue
// @grant 	GM_listValues
// @grant   GM_xmlhttpRequest
// @noframes
// @require       http://localhost:8888/lib/FileSaver.js
// @require       http://localhost:8888/lib/jszip.js
// ==/UserScript==
//
// �O�����I�v�V����
// @run-at document-start
// �I�v�V�����̓��[�_�[���ɏ����K�v����
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



'use strict';

//window�Ƀl�[���X�y�[�X�����A�R���\�[������g����悤�ɁB
//GM_����window��unsafe(�{�́j�����ւ����肷�邩��A����Ή��Bif�ŏ����Ă����ǁA�u���b�N�X�R�[�v�Ȃ̂�const�g����悤�ύX�B
// @grant none �ɂ����unsafeWindow�͍���Ȃ��BGM�֐����g���Ȃ�
//const���Ă����O���A�������̃����[�h����ׁBGM���Ǝ��s����͂��B
this.temp = (window.unsafeWindow)
    ? (window.unsafeWindow.winNS = {})
    : (window.winNS = {});
//self reload
temp.srl = function() {
    document.body.appendChild(Object.assign(document.createElement('script'), {
        src: 'http://localhost:8888/mypo.user.js'
    }));
};

!(function() { //const log = console["log"];
    let time = Date.now(); //���ԑ���

    async function loadself() {
        let domID = 'loadSelfScript';
        //log('�X�^�[�g loadSelf');
        const el = document.querySelector('#' + domID);
        if (el === null) {
            let url = 'http://localhost:8888/mypo.user.js?' + Date.now();
            //let url = 'http://localhost:8888/mm.js?'+Date.now();
            log('�ǂݍ��ށ�' + url);
            let aasd = document.createElement('script');
            const aaa = await new Promise((resolve, reject) => {
                aasd.onload = () => resolve(true);
                aasd.onerror = () => resolve(false);
                aasd.src = url;
                aasd.id = domID
                document.body.appendChild(aasd)
            })
            log('�ǂݍ��݌���', aaa);
            if (aaa) {
                log('localhost�̓ǂݍ��ݐ����A�u���E�U�����̃X�N���v�g�͏I��')
                return aaa;
            } else {
                log('���[�J���ǂݍ��ݎ��s�A�C���X�g�[���X�N���v�g�𑱂���')
            }
        } else {
            log('����script����̂ō��Ȃ�');
        }
    }
	/*/
	function loadself() {
		let domID = 'loadSelfScript';
		//log('�X�^�[�g loadSelf');
		const el = document.querySelector('#' + domID);
		if (el === null) {
			let url = 'http://localhost:8888/mypo.user.js';
			log('�ǂݍ��ށ�'+url);
			document.body.appendChild(
				Object.assign(document.createElement('script'), {id: domID, src: url})
				//�t�@�C�������݂��Ȃ��ꍇ�͂܂�������
			);
			return true;
		} else {
			log('����script����̂ō��Ȃ�');
		}
	}
	/**/
    let nsMiiya = {gamen() {} }; //�I�u�W�F�N�̃v���p�e�B�͐錾���Ƃ��Ȃ��ƃ��t�@�N�^�����O�ł��Ȃ�
    // �l�[���X�y�[�X
    // window.nsMiiya = {};
    /** �{�^�������*/
    function mkEle(pElem, tag, obj, loca = 'beforeend') {
        let elem = document.createElement(tag);
        pElem.insertAdjacentElement(loca, elem); //appendChile
        elem = Object.assign(elem, obj);
        return elem;
    }
    //prototype����
    Node.prototype.proMk2 = function(tag, obj) {
        let elem = document.createElement(tag);
        this.appendChild(elem);
        elem = Object.assign(elem, obj);
        return elem;
    }
    //Utility�N���X������Ă݂�H
	/**�����Click
	 * @param selector{string}
	 */
    function arebaCli(selector, anzen_sec = 3, is_href = false) {
        const el = document.querySelector(selector);
        // let aaa = GM_getValue('zenkai', Date.now() - 9999)
        // let jisa = (Date.now() - aaa) / 1000

        log(`arebaCli ${selector}`)
        if (el !== null) {
            // if (jisa < anzen_sec) {
            // 	log(`���[�v���Ă�\���A������. jisa=${jisa}`)
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
            log('�N���b�N����ӏ����� @arebaCli ' + selector);
            return false;
        }
    }
    //�X�N���v�g�������Ă邩�m�F����ڗ����Ȃ����́A�^�C�g���̈ꕶ���ڂ��g���Ă�
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
						/*body��wide��magine�������肷��Ɨ]���o����΍�*/
						position: relative;
						transform: translateX(-50%);
						left: 50%;
						`
            }
            //�����Đ�
            if (elem.tagName === 'VIDEO') {
                elem.preload = true //���ꂪ�����Ǝn�܂�Ȃ��ۂ�
                elem.autoplay = true  //�������������悤�Ȃ���
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
            const logo = '&#x1f36a;' //"?"
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
            //Cookie�폜�{�^��
            let btn1 = button_tukuru('�\��', () => {cookie_view()})
            //Cookie�폜�{�^��
            let btn = button_tukuru('�S�폜', () => {deleteAll(); panel()})
            log(`Cookie[${count()}] `, btn1, btn)
        }

        //main
        panel()
    }
    //css����ď������ށA����ΒǋL
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
    //�����_����Emoji��Ԃ�
    function emoji_rand() {
        //�啔���R�s�y�A�����͈͕̔͂����R�[�h�𐮐���������B
        let rand_mm = (min, max) => Math.floor(Math.random() * (max + 1 - min)) + min
        let emojiCode = Math.random(10) > 7.75 ? rand_mm(128512, 128592) : rand_mm(127744, 128318);
        return String.fromCodePoint(emojiCode);
    }

    //���b�Z�[�W��\�������A�A���[�g�̑���
    function my_alert(...msg) {
        //�f�o�b�O�p��log���Ă��A�������\������āA�ӏ���������Ȃ��B

        //�����cos log �ɒu�������邩��A����log����Ɩ������[�v�A������p
        const log = window['console'].log//�ȗ��s�A�u�����Ȃ��悤�ϑ�
        //log(...msg)

        if (window.GM) {
            //�ݒ��ǂݎ��
            let flag_name = 'my_alert_f'
            let my_alert_f = GM_getValue(flag_name, false)
            //���j���[�o�^�A��x�����A���̂��߂Ƀv���p�e�B���p
            if (typeof my_alert.reg === 'undefined') {
                my_alert.reg = 1;
                GM_registerMenuCommand('my_alert_f=' + my_alert_f, function() {
                    //alert('Put script\'s main function here');
                    GM_setValue(flag_name, !my_alert_f);
                }, 'r');
                //log('my_alert�̃A�C�R�������j���[�����')
            }
            //�\���̉�
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
				word-break: break-all;/* �����Ɋ֌W�Ȃ���������܂�Ԃ� */
				overflow-wrap: break-word;
				white-space: pre-wrap;/* �J�ƁE�󔒂��̂܂܁A�������܂�Ԃ� */

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
        //�g���Ȃ������
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

            //��\���{�^��
            const el_a0 = button_tukuru('���O��\��', () => {GM_setValue(flag_name, false);})
            // const el_a0 = document.createElement('input')
            wakuElm.appendChild(el_a0)
            // el_a0.type = 'button'
            // el_a0.value = '���O��\��'
            // el_a0.onclick = function(e) {
            // 	e.preventDefault(); //�����ړ����Ȃ��A�n�b�V���������Avoid���K�v�Ȃ�
            // 	log(this, '��\��')
            // 	GM_setValue(flag_name, false);
            // }

            //�����Ȃ��{�^��
            const el_a = button_tukuru('�����Ȃ�', (e) => {
                log(e)
                e.target.parentElement.onmouseleave = null;
            })
            wakuElm.appendChild(el_a)
            // el_a.type = 'button'
            // el_a.value = '�����Ȃ�'
            // el_a.onclick = function(e) {
            // 	e.preventDefault(); //�����ړ����Ȃ��A�n�b�V���������Avoid���K�v�Ȃ�
            // 	e.stopPropagation()
            // 	this.parentElement.onmouseleave = null
            // }
        }
        const div_every = true;//����div��邩�A1�ɒǉ����邩
        let log_id = '17:30'
        let log_el = document.getElementById(log_id)
        if (div_every || log_el === null) {
            log_el = wakuElm.appendChild(Object.assign(document.createElement('div'), {
                className: 'hoge',
                id: log_id,
            }));
        }
        log_el = wakuElm

        //��O�A��������elem�Ȃ�\��������

        for (let [key, val] of Object.entries([...msg])) {
            if (val instanceof HTMLElement) {
                //log('is elm? ' + (val instanceof HTMLElement))
                log_el.insertAdjacentElement('beforeend', val)
            } else {
                //log(key,typeof key)
                if (key != '0') val = ', ' + val //obj entr ��string
                log_el.insertAdjacentHTML('beforeend', val)
            }
        }
        //log_el.insertAdjacentHTML('beforeend', String.prototype.concat(...s) + '</br>')
        wakuElm.scrollTop = wakuElm.scrollHeight;
        //Promise�I�u�W�F��string�ɂł����ɃG���[
        //log_el.insertAdjacentElement('beforeend', document.createElement('hr'))
        // base.innerHTML = String.prototype.concat(...s)
        //base.innerHTML = s.toString()
    }
    /**���t�֐� yyyy-MM-dd hh:mm:ss	 */
    function mydate(format, zerofill = 1) {
        let date = new Date();
        let hi = {}
        //�����ݒ�
        format = format || 'yyyy-MM-dd hh:mm:ss';
        hi.yyyy = date.getFullYear();
        hi.MM = date.getMonth() + 1;
        hi.dd = date.getDate();
        hi.hh = date.getHours();
        hi.mm = date.getMinutes();
        hi.ss = date.getSeconds();
        for (let key in hi) {
            if (key !== 'yyyy' && zerofill) {
                hi[key] = ('0' + hi[key]).slice(-2); //�[������
            }
            format = format.replace(key, hi[key]); //�t�H�[�}�b�g������u��
        }
        return format;
    }

	/**
	 * css������ĕԂ�
	 */
    function returnMyCss(cssId = 'miiyacss', cssText) {
        const d = false;
        d && log('css�������Ⴄ');
        let el = document.getElementById(cssId)
        //������΍��
        if (!el) {
            el = document.createElement('style');
            el.id = cssId;
            document.head.appendChild(el);
        }
        //styElem.sheet.insertRule(', 0); //�I�v�V����2�͑}���C���f�b�N�Xadd����邩��0�ŗǂ��ۂ�
        //insertr����1�Â����o���Ȃ��ۂ��A�������Ȃ�textContent���ǂ��A�����邵
        if (cssText)
            el.insertAdjacentText('beforeEnd', cssText);
        return el;
    }
    // �����ʂ����
    nsMiiya.gamen = function() {
        let elementId = 'miiyabase';
        // ���ɂ���΃��^�[��
        let el = document.getElementById(elementId);
        if (el) {
            return el;
        };
        //css �ϐ�����dom�ƈႤ���璍��
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
				font-size:10px; /* em���ƈ��肵�Ȃ� */
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
                //baseC.style = "display:block;"; //�����������
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
            textContent: '�͂���',
            onclick: () => log('����'),
        });
        baseC.proMk2('button', {
            textContent: '�͂���',
            onclick: () => log('����'),
        });
        mkEle(baseC, 'span', {
            textContent: 'v' + ver,
            tyle: {fontSize: '8px'},
        });
        mkEle(baseC, 'button', {
            textContent: '�㉺',
            // style:{cssText:'all: initial;'},
            onclick: function() {
                this.f = this.f ? 0 : 1;
                if (!this.f) {
                    // this.textContent = '��';
                    this.parentNode.style.bottom = 0;
                    this.parentNode.style.top = '';
                } else {
                    // this.textContent = '��';
                    this.parentNode.style.bottom = '';
                    this.parentNode.style.top = '0';
                }
            },
        });
        mkEle(baseC, 'button', {
            textContent: '����',
            // style:{cssText:'all: initial;'},
            onclick: function() {
                this.f = this.f ? 0 : 1;
                if (!this.f) {
                    this.textContent = '����';
                    this.parentNode.style.left = 0;
                    this.parentNode.style.right = '';
                } else {
                    this.textContent = '����';
                    this.parentNode.style.left = '';
                    this.parentNode.style.right = '0';
                }
            },
        });
        mkEle(baseC, 'button', {
            textContent: '���[�Ȃу{�^��',
            // style:{cssText:'all: initial;'},
            onclick: nsMiiya.fnc2,
        });
        mkEle(baseC, 'button', {
            textContent: '�ŏ���2',
            // style:{cssText:'all: initial;'},
            onclick: function() {
                this.parentNode.style.with = '300px';
                this.parentNode.style.display = 'none';
                nsMiiya.aloging('saisho');
            },
        });
        mkEle(base, 'button', {
            textContent: '�X�V',
            type: 'button',
            onclick: function(event) {
                location.reload();
            },
        });
        mkEle(baseC, 'button', {
            textContent: '�y�V��������',
            type: 'button',
            onclick: (event) => {
                //alert(GM_getValue("raku"));
                maiKuji(1);
                // GM_setValue("������������", 1);
                // location.href = "http://www.rakuten.co.jp/";
                // //http://www.rakuten.co.jp/?l-id=header_global_logo
                // //http://www.rakuten.co.jp/?l2-id=shop_header_logo
            },
        });
        mkEle(baseC, 'button', {
            textContent: 'GM_�ϐ��ǉ�',
            type: 'button',
            onclick: (event) => {
                let rand = Math.floor(Math.random() * 10);
                GM_setValue('���{��' + rand, '����' + rand);
            },
        });
        mkEle(baseC, 'button', {
            textContent: 'GM_�ϐ��\��',
            type: 'button',
            onclick: (event) => {
                let vals = [];
                let ob = {};
                for (let key of GM_listValues()) { //for of �͎��̂�Ԃ�
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
            textContent: '�������Ȃ�',
            // style:'all: initial;',
            // style: 'height:30px',
            // onclick:e=>{log(this);this.style.height="11px";},
            onclick: function() {
                log(this); this.style.height = parseInt(this.style.height) - 1 + 'px';
            },
            //e=>{},
        });
        mkEle(baseC, 'button', {
            textContent: 'UA�EReferer',
            onclick: function() {
				/**
				 * userAgent���n�b�N����
				 */
                const changeUserAgent = (ua) => {
                    // Chrome, fx, IE11
                    window.navigator.__defineGetter__('userAgent', () => ua);
                    // Safari
                    try {
                        // fx��setter���Ȃ��ƃG���[�ɂȂ�̂�
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
        // log��\������ꏊ
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
    };// ��ʍ��֐��I���
    /**�����Ƀ{�^�� */
    function okiniButton(elem) {
        //���C�ɓ���̃{�^���������Ⴄ��
        const okinis = [
            ['https://www.infoseek.co.jp/', 'Infoseek�g�b�v'],
            ['http://www.rakuten.co.jp', '�y�V�g�b�v'],
            ['https://www.infoseek.co.jp/Luckylot'],
            ['https://isbingo.www.infoseek.co.jp/isbingo/getCard'],
            ['https://pointmail.rakuten.co.jp/subcard/complete', ''],
            ['http://192.168.0.1/userRpm/StatusRpm.htm?Connect=Connect&wan=1', 'IP���Z�b�g'],
            ['https://192.168.0.1/userRpm/StatusRpm.htm?Connect=Connect&wan=1', 'IP���Z�b�gs'],
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
	/**GM value��S��
	 * �l�[���X�y�[�X�P�ʂ���Ȃ��C���X�g�[���X�N���v�g�ŕ������Ă�ۂ�
	 */
    function gmValuesAll() {
        let vals = [];
        let ob = {};
        for (let key of GM_listValues()) { //for of �͎��̂�Ԃ�
            //log(key)
            vals.push(GM_getValue(key))
            ob[key] = GM_getValue(key);
        }
        log(ob)
    }
	/**
	 * ��������
	 */
    function maiKuji(start) {
        let mai = '������������'
        log('maiKuji���s');
        log(mai, GM_getValue(mai));
        //gmValuesAll();
        if (start) {
            log('�ϐ��Z�b�g', start);
            GM_setValue(mai, start); //�X�^�[�g��������
            //log(mai, GM_getValue(mai));
        }
        let ima = GM_getValue(mai);
        if (!ima) {
            log('���ɂ���ima�����A������', ima);
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
                    list.�y�V�n�̖�������.rakuTop2kuji();
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
        log('�܂������I���', mai, GM_getValue(mai));
    }
	/**����������蒼�� 
	 * @param 
	*/
    function maiJump(flagEdit) {
        const name = '�����W�����v';
        const debug = true;
        debug && log(name + 'start');
        //�t���O����������
        if (flagEdit === 1) {
            debug && log(name + '�t���O�����');
            GM_setValue(name, 1);
        } else if (flagEdit === 0) {
            debug && log(name + '�t���O���폜');
            GM_deleteValue(name);
        }
        //�t���O��������Δ�����
        if (!GM_getValue(name)) {
            return false;
        }
        const arr = [
            'https://kuji.rakuten.co.jp/.+/.+',
            'https://www.infoseek.co.jp/Luckylot'
        ]
        debug && log(name + 'end');
        //������URL���玟�ɃW�����v����A
        //�W�����v���s�t���O�����ĂȂ���Δ�����
    }
	/**
	 * 
	 */
    function button_tukuru(text, func) {
        const css_ClassName = 'button_tukuru'
        const css_id = 'button_tukuru_css';

        //css������΍��
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
        //�{�^�����
        const el_a = document.createElement('button')
        //wakuElm.appendChild(el_a)
        el_a.textContent = emoji_rand() + text
        el_a.className = css_ClassName
        //el_a.type = 'button'
        el_a.addEventListener('click', function name(ev) {
            ev.stopPropagation()
            ev.preventDefault()
            //func(e) //this���`���Ȃ�,���������A�A���[�֐��ɂ���Ⴂ���H�ʖڂ������B
            func.call(this, ev)
            //!(func.bind(this, e))() //�����֐��œ����Ȃ������̂̓Z�~�R�����Ȃ����������B
            //!(func.bind(this))(e) //����͋�����������
        }, {once: false, passive: false, capture: true})
        // el_a.onclick = function(ev) {
        // 	ev.stopPropagation()
        // 	ev.preventDefault()
        // 	//func(e) //this���`���Ȃ�,���������A�A���[�֐��ɂ���Ⴂ���H�ʖڂ������B
        // 	func.call(this, ev)
        // 	//!(func.bind(this, e))() //�����֐��œ����Ȃ������̂̓Z�~�R�����Ȃ����������B
        // 	//!(func.bind(this))(e) //����͋�����������
        // }
        return el_a
    }
    //main/////////////////////////////////////
    const log = my_alert;
    log(`\n${(new Date).toLocaleString()}`);
    log(`${Date.now() - time}ms main ##########################`);
    log('@version 2019.11.14.181251');
    ugoiteruka('.')

    const arr = []
	/**
	 * �֐��o�^����
	 * @param {string} name 
	 * @param {*} url 
	 * @param {function} func 
	 */
    function x(name, url, func) {
        if (name === 0) {
            //log("���O����")
            return;
        }
        arr.push([name, url, func])
    }
    function xdo() {
        //log(arr)
        for (let val of arr) {
            //log(val)
            let [name, url, func] = val

            //url��.�G�X�P�[�v���ă��C���h�J�[�h���g����悤�ɁB���̂����h�b�g�͎g���Ȃ��B
            let url_join = url.join('|').replace(/\./g, '\\.'); //.�͐��K�\���̂��߂ɃG�X�P�[�v
            url_join = url_join.replace(/\*/g, '.*?');//���C���h�J�[�h�������B
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

    function sleep(msec) {
        return new Promise(r => setTimeout(r, msec)); // return�������Ă��܂������Ȃ������B
    }
    const sleep2 = msec => new Promise(resolve => setTimeout(resolve, msec));


    x('�S��b', ['^http'], function() {
        //log(1, 2, 3)
        (async () => {
            log('neru')
            await sleep(2000)
            //await sleep2(2000)
            log('okita')
        })()

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
    x('�m�F����', ['^http://www.ugtop.com/spill.shtml'], function() {log('ugtop')},
    )
    x('workflowy', ['^https://workflowy.com/'], function() {
        //const base = nsMiiya.gamen();// ��ʍ�����Ⴄ
        let dataSounyuF = function(s = '') {
            document.activeElement.textContent += mydate('yyyy/MM/dd') + ' ' + s;
            /* �t�H�[�J�X�ʒu���� */
            let el = document.activeElement;
            let range = document.createRange();
            range.setStart(el, 1); // �I�v�V����2�̓I�u�W�F�̃I�t�Z�b�g�A0�Ő擪�Ael.chilednodes�ŕ����P��
            // range.selectNodeContents(el);
            range.collapse(true);// �I���������A����̓G���h���Ă��ĂȂ�����A�����Ă�����
            let sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
            el.focus();
        };
        // �V���[�g�J�b�g�L�[�ǉ�
        document.addEventListener('keydown', (e) => {
            // nsMiiya.aloging(e.ctrlKey+" " ,0);
            // nsMiiya.aloging(e.key+"");
            // KeyboardEvent.ctrlKey �ǎ��p
            //keydown �����ՁAkeypress�F�V���[�v�Ƃ��������啶���Ashift�Ȃǂɔ������Ȃ�
            //ctrl��Mac����control�Ŗ��Q�����Awin���ƃ^�u�����荢��
            //opt��mac���ƕςȕ������͂����� 	
            //e.getModifierState('Shift')
            //console.debug(e.shiftKey,e.altKey,e.keyCode,e.key,String.fromCharCode(e.keyCode))
            //log(e)
            if (e.altKey) { //�ω��L�[�����Ă邩�H
                switch (String.fromCharCode(e.keyCode)) {
                    case 'A': //A
                        e.preventDefault(); // �����鏉�������
                        dataSounyuF();
                        break;
                    case 'T':
                        e.preventDefault(); // �����鏉��
                        dataSounyuF('#�^�X�N ');
                        break;
                    case '3':
                        e.preventDefault(); // �����鏉��
                        dataSounyuF('#');
                        break;
                    // document.activeElement.textContent+=moment().format('yyyy/MM/dd')+" #�^�X�N ";
                }
            }
        });
        // // �{�^�������
        // mkEle(base, 'button', {
        //     textContent: '�^�X�N',
        //     onclick: (e) => {
        //         dataSounyuF('#�^�X�N ');
        //     },
        //     onmousedown: () => {return false} //�A�N�e�B�u������
        // });
        // mkEle(base, 'button', {
        //     textContent: '���t',
        //     // style:'all: initial;',
        //     onclick: (e) => {
        //         dataSounyuF();
        //         /**/
        //     },
        //     onmousedown: () => {return false}
        // });
    })
    x('���[�^�[���O�C��', ['^https?://192.168.\\d+.\\d+'], function() {
        const base = nsMiiya.gamen();// ��ʍ�����Ⴄ
        function fff(params) {
            document.getElementById('userName').value = 'admin';
            document.getElementById('pcPassword').value = 'ttoomm99';
            document.getElementById('loginBtn').click();
        }
        fff();
        mkEle(base, 'button', {
            textContent: '���[�^�[',
            onclick: fff,
        });
    })
    //�y�V�n/////////////////////////
    x('�y�V�X�[�p�[�q�[���[', ['^https://campaign.rakuten.jp/heroes/'], function() {
        const base = nsMiiya.gamen();// ��ʍ�����Ⴄ	
        mkEle(base, 'button', {
            textContent: 'callbtn',
            onclick: (ev) => {
                document.querySelector('.callbtn').click()
            }
        });
        mkEle(base, 'button', {
            textContent: '�󂯎�炸',
            onclick: (ev) => {
                document.querySelector('img[alt="�󂯎�炸�Ɏ��ւɐi��"]').click()
            }
        });
        let flag = true;
        mkEle(base, 'button', {
            textContent: '�󂯎�炸',
            onclick: (ev) => {
                if (flag) {
                    document.querySelector('.callbtn').click()
                    ev.target.textContent = '�󂯎�炸'
                } else {
                    document.querySelector('img[alt="�󂯎�炸�Ɏ��ւɐi��"]').click()
                    ev.target.textContent = '�X���b�g'
                }
                flag = !flag
            }
        });
        //200�~�N�[�|����3500�~�ȏ�Ƃ���ڂ�
        //https://campaign.rakuten.jp/heroes/?heroes_call=coupon&scid=wi_ich_gmx_coupongetcoupon
        //����N�[�|�����Ńq�[���[��������Ă�
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
    x('info�̕�', ['^https://pointmail.rakuten.co.jp/subcard/complete'], function() {
        document.querySelector('#completionReportBtn').click();
    })
    x('���[��de�|�C���g', ['^https://member.pointmail.rakuten.co.jp/box/*'], function() {
        const title = '���[���|�C���g';
        const base = nsMiiya.gamen();// ��ʍ�����Ⴄ
        // document.querySelector('.point_url').click()
        let suteFunc = async function() {
            arebaCli('.point_url>a'); //spanClick���Ă��������������ǋL�^���ꂸ
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
            arebaCli('.point_url>a'); //spanClick���Ă��������������ǋL�^���ꂸ
        }
    })
    x('�y�Venavi�ŃN���b�N�|�C���g', ['^https://www.rakuten-card.co.jp/*'], function() {
        const base = nsMiiya.gamen();// ��ʍ�����Ⴄ
        async function enaviClick() {
            let elemList = document.querySelectorAll('[id^="position"]');// css�Z���N�^��has���g���Ȃ�����loop����
            log('�N���b�N�ӏ�=' + elemList.length);
            for (let i = 0; i < elemList.length; i++) {
                if (i < 0) {
                    //�O���X�L�b�v
                    //continue;
                }
                if (elemList[i].querySelector('img[src$="check.gif"]')) {
                    let s = elemList[i].querySelector('a[href^=\'javascript\']');// .textConten;
                    // log(s.textContent);
                    s.style = 'box-shadow: 0 0 0px 3px rgba(222, 111, 222, 0.90);';
                    log('�N���b�N');
                    s.click(); // �N���b�N
                    //������������Ǝ������ɂȂ�
                    await new Promise((r) => setTimeout(r, 891)); // sleep
                }
                //
                // log(eles[i].querySelectorAll(".clearfix .dateArrival>img").length);
            }
        };
        //PV���Ɏ��s
        enaviClick()
        // �{�^�������
        mkEle(base, 'button', {
            textContent: '�N���b�Nde',
            onclick: enaviClick,
        });
    })
    x('Infoseek�̃��b�L�[�����T�b�J�[', ['^https://www.infoseek.co.jp/Luckylot*'], function() {
        if (location.href === 'https://www.infoseek.co.jp/Luckylot/result') {
            log('�T�b�J�[�����I���');
            location.href = 'https://www.infoseek.co.jp/';
        }
        //https://www.infoseek.co.jp/Luckylot/result
        // if (GM_getValue('������������')) {
        // 	GM_setValue('������������', null);
        // 	location.href = 'https://www.infoseek.co.jp/';
        // } else {
        // 	log('�����Z�b�g');
        // 	GM_setValue('������������', 1);
        // }
        const base = nsMiiya.gamen();// ��ʍ�����Ⴄ
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
    x('info�~�j����', ['^https://www.infoseek.co.jp/(\\?.+)?$'], function() {
        const el = document.querySelector('area.islot_lot');
        if (el !== null) {el.click();}
    })
    x('enavi�������O�C��', ['^https://www.rakuten-card.co.jp/e-navi/index.xhtml'], async function() {
        await new Promise((r) => setTimeout(r, 1500)); // sleep
        //chrome�̃I�[�g�R���v���[�g�Ńp�X���[�h�͂���悤�Ɍ����邪�󗓏�ԁA���Click�Œl������
        if (document.querySelector('#u').value !== '' &&
            document.querySelector('#p').value !== ''
        ) {
            log(1);
            //document.querySelector('#loginButton').click();
        }
    })
    x('�y�V�n�̖�������', ['^https://www.infoseek.co.jp/',
        '^https://kuji.rakuten.co.jp/',
        '^http://www.rakuten.co.jp',
        '^https://www.infoseek.co.jp/Luckylot*',
        '^https://isbingo.www.infoseek.co.jp/isbingo/getCard',
        '^https://pointmail.rakuten.co.jp/subcard/complete',], function() {
            const base = nsMiiya.gamen();// ��ʍ�����Ⴄ	
            mkEle(base, 'button', {
                textContent: '�y�V����',
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
            // if (GM_getValue('������������')) {
            // 	GM_setValue('������������', null);
            // 	rakutenTop2Kuji();
            // } else {
            // 	log('�����Z�b�g');
            // 	GM_setValue('������������', 1);
            // }
            //var this.host;
            for (let i = 0; i < this.host.length; i++) {
                const s = this.host[i].replace(/[*?]/g, ''); // g�J��Ԃ�
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
    x('�y�V�n�̂����̎���Click', ['^https?://kuji.rakuten.co.jp/'], async function() {
        // if (GM_getValue('������������')) {
        // 	GM_setValue('������������', null);
        // 	location.href = 'https://www.infoseek.co.jp/Luckylot';
        // } else {
        // 	log('�����Z�b�g');
        // 	GM_setValue('������������', 1);
        // }
        await new Promise((r) => setTimeout(r, 1000)); // sleep
        arebaCli('#entry');
    })

    x('google', ['^https?://www.google.(?:com|co.jp)/'], function() {
        let d = !!0;
        d && log('google no redirect');
        //Array.prototype��[]�Œu�������\
        Array.prototype.forEach.call(document.querySelectorAll('h3.r > a'), function(elem) {
            d && log(elem.textContent);
            elem.onmousedown = function() {};
        });
    })
    //kk����T�C�g///////////////////////////////

    x('kkonload', ['^https://openloadpro.com/'], function() {
        let d = !true;
        d && log('zippys');
        //arebaCli('.openload-link > a:nth-child(1)');
        let url = document.querySelector('.openload-link > a').href
        location.href = url
    })
    //�r�f�I�^�O���n�b�N�B2019/11/03
    x('kk�r�f�I�^�O��������S��ʂɂ��ď��', ['^https://xn--icktho51ho02a0dc.com/*/', 'https://asianclub.tv/'], function() {


        video_top_play()
        log(button_tukuru('video�Đ�', () => video_top_play()))
        log(button_tukuru('video�Đ�', video_top_play))
    })
    x('javmix����', ['^https://javmix.tv/video/*/'], function() {
        //let playerDiv = document.querySelector('#player-embed')
        let elm = document.querySelector('#player-embed > iframe');
        //let videotag = elm.contentWindow.document.querySelector('video')
        //
        elm.sandbox = 'allow-scripts allow-same-origin'; //iframe�������ċ������Apopup�h���邯�ǁA���肪���������邱�Ƃ��\
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
            // for (let val of sc_elm) { //���ꂾ�Ɣ��������폜�ł��Ȃ��A�����ŋl�܂邩��B
            // 	log(i++,val)
            // 	val.remove();
            // }
            for (let i = sc_elm.length - 1; 0 <= i; i--) { //�t����폜����B
                sc_elm[i].remove()
            }
        }
        sc_del()
        log(button_tukuru('script�폜', () => sc_del()))

        //css_instant('saidcss', '::-webkit-scrollbar {width: 0px;}')
    })
    x('�t�@�����Ŏ����Đ�', ['^https://www.dmm.co.jp/digital', '^https://www.dmm.com/*/'], function() {
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
        //cssEl.sheet.insertRu�C���T�[�g���悤�Ƃ������ǃX�y���킩��񂭂Ď��߂�
        cssEl.insertAdjacentText('beforeEnd', '\
            a,a * { color: #77e !important;font-weight: bold; } \
            a:visited,a:visited * {color: #c66 !important;} \
            ')
        //�����N���_�E�����[�h�ɏ�������V2
        //�������ʂ�http����̃t���A�h���X�������B
        //css�Z���N�^�ł�baseURL�̓A���ł������ł��q�b�g���遨�R�A�q�b�g���Ȃ�
        //dom�ŏ�����������̓q�b�g����A
        let els = document.querySelectorAll('h3>a[href*="/detail/"]');
        d && log('css�Z���N�^��', els.length);
        for (let i = 0; i < els.length; i++) {
            //const newel=document.createElement('a');
            let el = els[i];
            const cnode = el.cloneNode(true);
            //.appendChild(cnode);
            cnode.textContent = '��'
            el.parentElement.insertBefore(cnode, el);
            el.href = el.href.replace('/detail/', '/detail/download_zip/');
            el.textContent = '��' + el.textContent;
            //d && log(el.href);
        }
        //�v���r���[������Ⴄ
        //��낤�Ǝv�������ǃT���l��URL��xhr���Ȃ��Ƃ킩��Ȃ�����ۗ�
        //let globalInFn = (function() {return this})(); // ��������O���[�o�����Ȃ���

        els = document.querySelectorAll('a[onclick^="bookStand"]');
        for (let i = 0; i < els.length; i++) {
            let el = els[i];
            //el.onclick=()=>log(1111);//���삷�邪html�͂��̂܂�,�I�[�g�y�[�W���[�ŏ�����
            el.setAttribute('onclick', 'aa()'); //���������
            //el.textContent = '����' + el.textContent;
        }
        // �^�C�g��������Ղ�
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
        //Click���ꂽ�m�[�h�𔻒肷��
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
		/*���肹���A�^�[�Q�b�g�S�ĂɃ��X�i�[��o�^����^�C�v
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
    //kk�_�E�����[�h�n/////////////////////////////////
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
        //disabled�����ăN���b�N���Ă������߂邾���B
        //2019/09/02 �����_�E�����[�h���ȈՓI��
        //setintarval��clearin�ł��ł��邯�ǁAsettimeout�̂ق������₷���H
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
        //disabled�����ăN���b�N���Ă������߂邾���B
        //2019/09/02 �����_�E�����[�h���ȈՓI��
        //setintarval��clearin�ł��ł��邯�ǁAsettimeout�̂ق������₷���H
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
        //����join�͔����_�~�[�AStringg�~��������A�R�s�y�����񂾂Ǝv���AtoString���������B
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
    x('�\���֎~�T�C�g', ['^https://playingcards.jp', '^ahttps://smcb.jp/'], function() {
        //��ʐ^�����ɁA��΂���Ă銴�o���Ȃ��Ȃ�A<html ����폜
        document.body.parentNode.remove() //window.document.firstChild.remove()
        //�߂�{�^��������a
        //window.location.href = 'https://news.google.co.jp';
        //�߂�{�^�������Ȃ��Afirefox�Ńf�t�H�Ŗ���
        // let meta = document.createElement('meta')
        // meta.setAttribute('http-equiv', 'refresh')
        // meta.setAttribute('content', '0;url=https://news.google.co.jp')
        // document.head.appendChild(meta)
    })
    x('localhost��file:///', ['^https://www.ugtop.com/', 'news.google', 'localhost', 'file:///'], async function() {
        'use strict';
        //log('document.cookie > '+document.cookie)
        //log()

        // let js_url = "http://localhost:8888/utils.js";
        // await sleep(1000);
        // await import(js_url).then((module) => {module.default("�񓯊�");});

        // //import��file://����͓����Ȃ������Blocalhost�œ������B�񓯊��Ȃ̂ŁA��Ԓx��
        // let module = await import(js_url);
        // console.log(module)//promis�͓Ǝ�log�ŕ\���ł��Ȃ�
        // module.default("����");

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
            log('�͂��߂܂��āI')
        else
            log('�߂��Ă����Ȃ�')
        log('history.length', history.length, location.hash)
        //history.replaceState('', '', '#' + hash)
        let url = location.href.replace(/#.*/, '') + '#' + hash
        //log("url=",url)
        //location.href = url
        //location.replace(url)

    })
    //�摜�_�E�����[�h////////////////////
    x('dawnfun.com/', ['^https://r18.dawnfun.com/'], async function() {
        let images = [];  // ���̔z���base64�̃f�[�^������

        function downloadImages(images) {
            let zip = new JsZip();
            for (let i = 0; i < this.images.length; i++) {
                zip.file('img' + [i] + '.png', images[i].split(',')[1], {base64: true});
            }
            zip.generateAsync({type: 'blob'})
                .then(function(content) {
                    FileSaver.saveAs(content, 'images.zip');
                });
        }
        //let JSZip = require('jszip');

        let js_url = 'http://localhost:8888/lib/jszip.js';
        console.log(123)
        await sleep(1000);
        // import fm from 'http://localhost:8888/lib/FileSaver.js'
        // import zm from 'http://localhost:8888/lib/jszip.js'
        // const FS = await import('http://localhost:8888/lib/FileSaver.js')
        // const JsZip = await import('http://localhost:8888/lib/jszip.js')
        console.log(JsZip)
        let zip = new JsZip();
        console.log(123)
    })
    x('manga314', ['^https://manga314.com/'], async function() {
        //�N���A�{�^���~����
        const log_clear = function() {
            let button = button_tukuru('���O�N���A', function(e) {
                log(e, this)
                this.parentElement.textContent = ''
                log_clear()
            })
            log(button)
        }
        log_clear()
        //log(document.body.parentElement)
        //�N���b�N���āA�ʐM���ăy�[�W�J����URL�Q�b�g���ڕW
        // document.addEventListener('click', function(e){
        // 	e.preventDefault();
        // }, false);

        //alt�N���b�N�A���N���b�N�ɃC�x���g�d�������Ǝv�������ǁA�z�C�[���X�N���[���\������č����Ď~�߂��B
        document.addEventListener('click', function(ev) {
            do {
                if (!ev.altKey) break
                //log(e.buttons, e.button, e.target.tagName, e.target.rel)
                //A���啶���ȓ�
                if (ev.target.tagName == 'A' && ev.target.rel == 'bookmark') {
                    ev.preventDefault();
                    log('���ꂶ��' + ev.target.innerHTML)
                    _GM_xhr(ev.target.href, ev.target.innerHTML)
                }
            } while (false)
        }, false);

        // �E�N���b�N������Ă݂�
        document.addEventListener('contextmenu', function(ev) {
            log(ev.shiftKey)
            if (ev.target.tagName == 'A' &&
                ev.target.rel == 'bookmark' &&
                ev.shiftKey === false) {
                ev.preventDefault();
                log('�����ꂶ�ၟ' + ev.target.innerHTML)
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
                    // zip�Ƀ��X�|���X�f�[�^��ǉ�
                    //console.log(xhr.response);
                    _kai_view(text, title)
                },
                onerror: function(response) {
                    console.log(response.responseText);
                },
            });
        }
        //�f��xhr�������Ă݂Ă�A�r��
        const _js_xhr = function(url, title) {
            log('js_xhr')
            // �I���W�i���摜��ǂݍ���
            let xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            //xhr.responseType = 'text';
            console.log(555)
            // xhr.addEventListener('load', function() {});
            xhr.onload = function() {
                let text = xhr.response
                // zip�Ƀ��X�|���X�f�[�^��ǉ�
                //console.log(xhr.response);
                _kai_view(text, title)
            };
            xhr.send()
            console.log(1212)
        }
        const make_links = function(arr, title) {
            //let els = arr
            title = title.replace(/\//g, '@�X��').replace(/.zip|.rar|\//, '');
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
                log('�݂�����Ȃ�')
                return
            }
            arr_url = arr_url.map((ite) => ite.slice(1, -1)) //resu.map�Ȃ�ăv���p�e�B�����ƃG���[�Amatch��NULL�������B
            //console.log(resu)
            //let resu = resp.responseText.match(/(?<=")https:\/\/r18\.dawn.+?(?=")/g)
            //���̐��K�\����firefox tamper ��Syntax�G���[

            return arr_url
        }
		/**
		 * ��́{�\��
		 * @param {*} text 
		 * @param {*} title 
		 */
        const _kai_view = function(text, title) {
            let url_arr = text_kaiseki(text)
            let html = make_links(url_arr, title)
            console.log(html)
            log(html)
        }
        //test�p
        //_js_xhr('https://manga314.com/c79-galaxist-blade-%e9%9b%b7%e7%b1%a0-%e3%83%84%e3%83%81%e3%83%8e%e3%82%ab%e3%82%b4-%e9%ad%94%e6%b3%95%e5%b0%91%e5%a5%b3%e3%83%aa%e3%83%aa%e3%82%ab%e3%83%ab%e3%81%aa%e3%81%ae%e3%81%af', 'asdf')


        function saku() {//�摜�̃����N�����
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

            //��p�̘g�ɕ\��
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
    //�ߋ��̎c�[////////////////////////
    x(0, '�T�[�N��K�N�[�|��', ['^https://www.circleksunkus.jp/mypage/coupon/index.html'], async function() {
        const d = !false;
        if (document.title.match('�N�[�|��')) {
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
        const base = nsMiiya.gamen();// ��ʍ�����Ⴄ	
        const tA = mkEle(base, 'textarea', {
            textContent: '{"1":{"cCode":"01098","cjc":"9830869000009"},"2":{"cCode":"01093","cjc":"9830867000001"}}',
            style: 'height: 7em;',
        });
        mkEle(base, 'br', {});
        //log('t1', this);
        mkEle(base, 'button', {
            textContent: 'josn�����o��',
            onclick: () => { //�A���[�֐���`��this�Œ�
                log(this, this.tA);
                tA.textContent = kuponKaiseki()
            },
        });
        mkEle(base, 'button', {
            textContent: 'josn�ǂݍ���',
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
            textContent: 'K�N�[�|��',
            onclick: function(event) {
                mkEle(document.body, 'div', {
                    id: 'loadtest',
                    style: 'height:44px;background:#EEE',
                }, 'afterbegin');
				/*	nsMiiya.aloging('����' + event);
					let xx = document.querySelectorAll('a[href^="https://rd.rakuten.co.jp/s/?R2=https%3A%2F%2Fkuji.rakuten.co.jp"]');
					nsMiiya.aloging(xx.length);
					xx[0].click();*/
            },
        });
    })
    x(0, '�T�[�N��K�X���b�g', ['^https?://app.circleksunkus.jp/slot_top.php'], () => {document.querySelector('a[href*="slot"').click();},
    )
    xdo() //���C��
    ugoiteruka('#', 'sakujo')
    log(`${Date.now() - time}ms �G���[����##########################`);
})();

/*
2019/11/12 function ��const ���e�����ŏ����ƁA�ςȂƂ�����Ăяo����Ė���`�G���[
���s���s�K���Ȃ̂������񂾂��ǁB

2019/10/30 hoge=(obj.prop={}) //�͍�����I�u�W�F�̎Q�Ƃ�hoge��prop�ɓ���B

�����t��const��if�ɓ����ƃX�R�[�v����������A�O�����Z�q�Ȃǎ��ő������K�v����B
����ł������Ȃ瑦���֐��{return�ŁB

user.js�Ńh���C�������āA�Z�b�V����ID�I�Ȃ��̂��~�����A�N���b�N���[�v��h�����Ƃ��ł��邵�B
history�͖����A���t�@���[��URL�Ƀn�b�V����TIME��������΂ł����������ǁAURL�����̂͌���B
Cookie�����[�J���X�g���[�W�𒲂ׂĂ�BGM_*value���ł��邯�ǁA�Z�b�V����ID�͖��������B

js��Cookie�ǉ�����ƌ��ɒǉ�����Ă����B

2019/10/29 window.unsafeWindow W���L�������R�[�g�œr������̂͑啶���Ȃ̂Œ��ӁB
// @grant none ���w�肵�ĂȂ��ꍇ�B
log(window)������ƁAwindow.unsafeWindow ��������B
�R���\�[������window����Ɓoparent Window? alert��unsafeWindow�������A���ꂪ�{����window
�U����window.unsafWindow���{�����ꎞ���
//gm���I���������H�{�����U���Ə㏑������Aunsafwindow��������B

�X�N���v�g��window.)unsafeWindow.hoge���Ȃǃv���p�e�B�ɏ����ƁA
�߂��ꂽ���Ƃ́Awindow.)hoge�ɂȂ�B

user.js���Ō�܂ŒB����ƁHwindow = window.unsafeWindow �ƂȂ�Bun�����X��win�B
GM_�֐��̓R���\�[������͎g���Ȃ����A��`�ς݊֐�����͎g����B

2019/10/29 �Z�~�R�����ȗ�����ƕςȂƂ��ŋl�܂�B���̍s��()�X�^�[�g���Ɗ֐����s�Ƃ݂Ȃ����B

2019/10/29 import������ƁAexp�ȊO�����ׂĈ����s����B

2019/10/24 �u���b�N�ŃX�R�[�v��������Ȃ��B
if (1) {
	const a = 0
}
else {
	const a = 1
}
log(a)


2019/10/24 #js onclick=function������,onclick=()=>�͑ʖڂہB
element.onclick()�ƌĂ΂��̂ŁA�A���[�֐�����this��window�ɂȂ��Ă��܂��B

2019/10/24 #js insertAdjacentText("beforbegin","�O��")�AtextContent+=��葬���炵���B�L���B


2019/10/24 #js user.js�Ŗ߂������Ɏ��s�������Ȃ��A�����W�����v���Ɩ߂�Ȃ��Ȃ邩��B
	history.replace��#hoge�Ƃ��邱�ƂŁA���s����ł����B
	location+=#hoge�ł��ł���A�������s����Ƃ������̓��[�v����댯������B


2019/01/07
firefox greasemonkey ��@require ������cache���o���čX�V�ł��Ȃ��B
�g���t�H���_�ɍ����^�C�v�ŁAcache�N���A�Ƃ��قږ���
���������ƁA���[�J���I�ɂ��悤
mac �Ȃ� ���J�������t�H���_�Ɉړ����� python -m SimpleHTTPServer 8888
�I����C-c
http://localhost:8888/mypo.user.js
*/
