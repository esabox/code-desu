/* eslint-enable no-unused-vars */

// import * as lib from './mod.js'

const log = console['log'] //log短縮、改変だがソースが見やすくなるメリット。
log(`\n\n\n${new Date().toLocaleString()}`)
let time = Date.now() //時間測定

const arr = [
	{
		name: 'テンプレート\\原本',
		date: '',
		play: 0,
		uniq: 1,
		func: function() {
			'use strict'
			log('テンプレああああ')
		},
	},//テンプレート原本,
	{
		name: 'objとthis、深いとややこやし',
		date: '',
		play: 0,
		uniq: 2,
		func: function() {
			let obj = {
				kore: {
					ssss: 1,
					fn: function() {
						//console.log(Date.now());
						console.log(this) //"kore"a
						//console.log(this);
						for (let key in this) {
							console.log(key)
						}
					}
				}
			}
			obj.kore.fn()
		},
	},//objとthis、深いとややこやし,
	{
		name: 'proto実験、記憶にない',
		date: '',
		play: 0,
		uniq: 3,
		func: function() {
			let obj = {x: 20, y: 30, z: 43}
			obj.__proto__ = {a: 100}
			obj.__proto__.__proto__ = {x: 200}
			console.log(obj.x, obj.a) //20 100
			console.log(obj)
			obj.a = 500
			console.log(obj.a, obj.__proto__.a) //500 100 表面上上書きされる
			console.log(obj)
		},
	},//proto実験、記憶にない,
	{
		name: 'proto実験、記憶にない',
		date: '',
		play: 0,
		uniq: 4,
		func: function() {
			let obj1, obj2, obj3
			obj1 = {x: 50}
			obj2 = {a: 100}
			obj3 = {x: 20, y: 30, z: 40}
			obj3.__proto__ = obj2
			obj2.__proto__ = obj1

			console.log(obj3)

			obj2.a = 111
			console.log(obj3.a) //111 参照している
			console.log(obj3)

			//ループさせるとエラー
			//obj1.__proto__ = obj3;
		},
	},//proto実験、記憶にない,
	{
		name: 'proto実験、記憶にない',
		date: '',
		play: 0,
		uniq: 5,
		func: function() {
			function Test() {}
			//debugger;

			Test.prototype.abc = 100
			let x = new Test()
			console.log(x.__proto__)
			// {abc: 100}

			// getPrototypeOfは__proto__にアクセスするのと一緒
			console.log(Object.getPrototypeOf(x))
			//  {abc: 100}
			console.log(x.__proto__ === Object.getPrototypeOf(x)) //t

			// setPrototypeOfで__proto__に代入と一緒
			Object.setPrototypeOf(x, {xyz: 1})
			console.log(x.__proto__) // Object {xyz: 1}
			console.log(x.abc, x.xyz) //undefined 1
			console.log(x)
		},
	},//proto実験、記憶にない,
	{
		name: 'プロトタイプを切ると',
		date: '',
		play: 0,
		uniq: 6,
		func: function() {
			log('プロトタイプを切ると')

			let a
			function A() {}
			// __proto__ を Object.prototype から null にする
			A.prototype.__proto__ = null
			a = new A()
			console.log(a)

			// Objectのインスタンスじゃなくなる！
			console.log(a instanceof Object)
			//false

			// toStringがない！
			console.log(a.toString)
			//undefined

			// toStringが必要な計算をすると
			//console.log(1 + a);
			//Uncaught TypeError: Cannot convert object to primitive value

			// 普通のオブジェクトだと
			console.log(1 + {})
			//"1[object Object]"

			console.log(Object.prototype.__proto__)
			//null

			console.log(A.prototype.__proto__)
			//undefined
		},
	},//プロトタイプを切ると,
	{
		name: 'newを忘れるとグローバルに変数を定義',
		date: '',
		play: 0,
		uniq: 7,
		func: function() {
			/* newを付け忘れたパターン */
			let Constructor = function() {
				this.message = 'こんにちは！'
			}

			let obj = Constructor()
			console.log(obj) //un
			//console.log(obj.message); //エラー
			// console.log(message) // こんにちは！
			console.log(window.message) // こんにちは！
		},
	},//newを忘れるとグローバルに変数を定義,
	{
		name: 'newについて',
		date: '',
		play: 0,
		uniq: 8,
		func: function() {
			log('newについて')

			function Blog() {
				log(123)

				this.vvv = 222
				let zz = 444
				this.hoge = function() {
					log(this.vvv)
				}
				this.nage = () => {
					log(this.vvv, ++zz)
				}
			}
			let blog = new Blog()
			//blog.a=1113
			//blog.hoge()
			blog.nage()
			blog.nage()

			Blog = function() {
				console.log(this) //Window{...}
			}
			blog = Blog()
		},
	},//newについて,
	{
		name: 'proto上書き、上手く動かない。',
		date: '',
		play: 0,
		uniq: 9,
		func: function() {
			// try{
			//   document.querySelector('adiv').click();
			// }catch(e){
			//   //console.log(e);
			// }
			Node.prototype.click = () => log(111)
			let tag = 'body'
			//document.querySelector(tag) && document.querySelector(tag).click();
			document.querySelector(tag).click()
			log(document.querySelector(tag).tagName)
			log(333)
		},
	},//proto上書き、上手く動かない。,
	{
		name: 'thisチェック、長すぎる',
		date: '',
		play: 0,
		uniq: 10,
		func: function() {
			log('this check')
			console.log('---1---')

			let myObject = {
				value: 10,
				show: function() {
					console.log(this.value) //10
				}
			}
			function show() {
				value = 22 //グローバル汚染
				console.log(this.value) //10
				//console.log('this',this); //window
			}
			myObject.show() // 10
			log(window.value)
			show()
			log(window.value)
			//myObject.show(); // メソッド呼び出し メソッドは自身への操作
			//show(); // 関数呼び出し
			console.log('---2---')
			myObject = {
				value: 1,
				show: function() {
					console.log('@1', this.value) // 1

					function show() {
						console.log('@2', this) //
					}
					show()
				}
			}
			myObject.show()

			console.log('---3---')
			myObject = {
				value: 1,
				show: function() {
					let self = this
					console.log('A', self.value) // 1

					function show() {
						console.log('B', self.value) // 1
					}
					show()
				}
			}
			myObject.show()

			console.log('---4---')
			function MyObject(value) {
				this.value = value
				this.increment = function() {
					this.value++
				}
			}
			myObject = new MyObject(0)
			console.log(myObject.value) // 0

			myObject.increment()
			console.log(myObject.value) // 1

			console.log('---5---')

			myObject = {
				add: function(value1, value2) {
					console.log(this.value + value1 + value2)
				}
			}
			let yourObject = {
				value: 3
			}

			myObject.add.apply(yourObject, [2, 10]) // 15
			myObject.add.call(yourObject, 2, 10) // 15
			console.log('this', this) //window
		},
	},//thisチェック、長すぎる,
	{
		name: 'objをforループ、objは順序が不定。',
		date: '',
		play: 0,
		uniq: 11,
		func: function() {
			let obj = {
				zz: 0,
				aa: '',
				23: 'keyが数字だと並びが変わる',
				課長: '日本語キー'
			}
			console.log(obj)
			/**/
			function forin() {
				for (let key in obj) {
					console.log(key, obj[key])
				}
			}
			console.log(forin)
			forin()

			function fore() {
				//Arraryに変換してから
				Object.keys(obj).forEach(function(key, i) {
					console.log(i, key, this[key]) //this=obj
				}, obj)
			}
			console.log(fore)
			fore()

			//無理だった
			// [].forEach.call(obj, function(item) {
			//	console.log(item);
			//  });
		},
	},//objをforループ、objは順序が不定。,
	{
		name: 'アロー関数とthis、上手く書けない、配列で表現すべきか。',
		date: '',
		play: 0,
		uniq: 12,
		func: function() {
			'use strict'
			let obj = {
				des: '1',
				n1: function() {
					return this.des
				},
				n2: () => this.des,
				obj: {
					des: '2',
					n1: function() {
						return this.des
					},
					n2: () => this.des,
					n3: (() => this.des)(),
					n4: (function() {
						log(this) //window、strictだとunでプロパティ参照するとエラー。
						//return this.des
					})()
				}
			}
			obj.n3 = () => this.des //Window
			obj.n4 = function() {
				return this.des
			}
			log(obj.n1()) //"1"
			log(obj.n2()) //"arrow func"
			log(obj.n3()) //"arrow func"
			log(obj.n4()) //"1"
			log(obj.obj.n1()) //"2"
			log(obj.obj.n2()) //"arrow func"
			log(obj.obj.n3) //"arrow func"

			log(111)
			//codepenでconsole.dirが使えない
		},
	},//アロー関数とthis、上手く書けない、配列で表現すべきか。,
	{
		name: 'グローバル汚染、まだ書きかけ',
		date: '',
		play: 0,
		uniq: 13,
		func: function() {
			log('guro osen')
			let a = 222
			//var a = 111;

			function hoge() {
				//"use strict"  関数の最初の実行行でやらないと無効ぽ。
				//let a = 333;
				log(a) //222
				log(this.a)
				//log(this.a, a, this); //111,333,window{} //strictにするとthisがunでエラー
			}
			hoge()
		},
	},//グローバル汚染、まだ書きかけ,
	{
		name: 'use strict のテスト',
		date: '',
		play: 0,
		uniq: 14,
		func: function() {
			log('use strict のテスト')
			let strictTest = () => {
				+(function() {
					log('@1', this) //Window
				})();
				+(function() {
					'use strict'
					log('@2', this) //und
				})();
				+(function() {
					log('@3', this); //Window
					('use strict') //先頭に書かないと効果なし
					log('@4', this) //Window
				})()
				let obj = {}
				obj.f = function() {
					console.dir(this) //Object,111
				}
				obj.f()
			}
			strictTest()
		},
	},//use strict のテスト,
	{
		name: 'オブジェクトと配列を混ぜる、連想配列',
		date: '',
		play: 0,
		uniq: 15,
		func: function() {
			'use strict'
			let obj = {a: 111, '3': [11, 22, 33]}
			log(obj['a'], obj[3][2]) //111 33
		},
	},//オブジェクトと配列を混ぜる、連想配列,
	{
		name: '呼び出し元でthisが変わる',
		date: '',
		play: 0,
		uniq: 16,
		func: function() {
			'use strict'
			let obj = {
				fn: function() {
					log('@1', this && this.v)
				},
				v: 111
			}
			let obj2 = {v: 222}
			let f
			obj.fn() //@1,111
			f = obj.fn
			f() //@1,undefined
			obj2.f = obj.fn
			obj2.f() //222
		},
	},//呼び出し元でthisが変わる,
	{
		name: 'インスタンス作成',
		date: '',
		play: 0,
		uniq: 17,
		func: function() {
			'use strict'
			function Teki() {}
			let teki1 = new Teki()
			log(teki1) //Teki{}
			let ins = new Object('hoge')
			log(teki1) //Teki{}
		},
	},//インスタンス作成,
	{
		name: 'thisの挙動',
		date: '',
		play: 0,
		uniq: 18,
		func: function() {
			'use strict'
			log(88888888888888)
			log('this@0 ', this)
			const tsubasa = {
				log: log('@1', this),
				me: this,
				me2: +(function() {
					log('@2 ', this)
					return this
				})(),
				hello: function() {
					log('me ', this.me)
					log('me2 ', this.me2)
					log('this ', this)
				}
			} //Object
			tsubasa.hello() // tsubasa
		},
	},//thisの挙動,
	{
		name: 'アロー関数のthisは定義した時のthisに固定される',
		date: '',
		play: 0,
		uniq: 19,
		func: function() {
			'use strict'
			log('this@0 ', this) //ここのthisがhello2のthisに固定される
			const tsubasa = {
				name: 'yamada',
				f1: function() {
					//function定義時には固定されない
					log('f1', this && this.name)
					setTimeout(() => {
						//ここで固定
						log('f1 Time', this && this.name)
					})
				},
				f2: () => {
					//アロー関数定義時にthis固定
					log('f2 this ', this && this.name)
					setTimeout(() => {
						//ここでも固定
						log('f2 Time', this && this.name)
					})
				},
				f3: function() {
					//function定義時には固定されない
					log('f3', this && this.name)
					setTimeout(function() {
						//ここでも固定されない
						log('f3 Time', this && this.name) //win
					})
				}
			} //Object
			tsubasa.f1() // tsubasa //メソッド呼び出しなのでインスタンスがthisになる
			tsubasa.f2() // undefined
			tsubasa.f3() // undefined
		},
	},//アロー関数のthisは定義した時のthisに固定される,
	{
		name: 'thisとスコープとアローとオブジェクト',
		date: '',
		play: 0,
		uniq: 20,
		func: function() {
			'use strict'
			let o = {
				v: 111,
				f: function() {
					let v = 222
					setTimeout(() => {
						log('@1', v, this.v) //222,111
					})
				},
				o: {
					v: 333,
					f: function() {
						let v = 444
						log('@3', v, this.v) //444,333
						setTimeout(() => {
							log('@2', v, this.v) //444,333
						})
					}
				}
			}
			o.f()
			o.o.f()
		},
	},//thisとスコープとアローとオブジェクト,
	{
		name: '変数にアクセスするとエラー、そのテスト',
		date: '',
		play: 0,
		uniq: 21,
		func: function() {
			'use strict'
			let obj = {}
			for (let i = 0; i < 10; i++) {
				try {
					switch (i) {
						case 0:
							log('@0', i); break //err -> not defined
						case 1:
							log('@1', obj.hoge); break //undefine
						case 2:
							log('@2', obj.hoge.bbb); break  //err undefinedのbbbプロパティがよめねー
						case 3:
							log('@3', this); break  // undefined
						default:
							break
					}
				} catch (e) {
					log(e)
				}
			}
		},
	},//変数にアクセスするとエラー、そのテスト,
	{
		name: '隣のメソッドの変数を読みたい、無理ぽい',
		date: '',
		play: 0,
		uniq: 22,
		func: function() {
			'use strict'
			let obj = {
				v: 123,
				f1: function() {
					let v1 = 111
					log(this.f2)
				},
				f2: function() {
					let v2 = 222
				}
			}
			obj.f1()
		},
	},//隣のメソッドの変数を読みたい、無理ぽい,
	{
		name: '日付の関数を車輪してみた、曜日が無い',
		date: '',
		play: 0,
		uniq: 23,
		func: function() {
			'use strict'
			function mydate(format, zerofill = 1) {
				let date = new Date()
				let hi = {}
				format = format || 'YYYY-MM-DD hh:mm:ss'
				hi.YYYY = date.getFullYear()
				hi.MM = date.getMonth() + 1
				hi.DD = date.getDate()
				hi.hh = date.getHours()
				hi.mm = date.getMinutes()
				hi.ss = date.getSeconds()
				for (let key in hi) {
					if (key !== 'YYYY' && zerofill) {
						hi[key] = ('0' + hi[key]).slice(-2) //ゼロうめ
					}
					format = format.replace(key, hi[key]) //フォーマット文字を置換
				}
				return format
			}
			log(mydate('YYYY-MM-DD'))
		},
	},//日付の関数を車輪してみた、曜日が無い,
	{
		name: 'menberFunctionはいつ定義されるか',
		date: '',
		play: 0,
		uniq: 24,
		func: function() {
			'use strict'
			let o = {
				fn: function(hoge) {
					this.fn2 = function() {
						log(1)
					}
				}
			}
			o.fn() //ここでfn2が定義
			o.fn2()
		},
	},//menberFunctionはいつ定義されるか,
	{
		name: 'switch、よく忘れる、breakしないと続く',
		date: '',
		play: 0,
		uniq: 25,
		func: function() {
			/*、一度breakすると終わり*/
			'use strict'
			switch ('a') {
				case 1:
					log(1)
				case 'a':
					log(2)
				case 3:
					log(3)
					break
				case 4:
					log(4)
				case 'a':
					log(5)
			}
			//2 3
		},
	},//switch、よく忘れる、breakしないと続く,
	{
		name: '変数の巻き上げ',
		date: '',
		play: 0,
		uniq: 26,
		func: function() {
			'use strict'
			/*
		変数の巻き上げとは、スコープ内で宣言された変数は、
		実際に宣言された場所に関係なく、スコープの先頭で宣言されたことになる、というものである。
		*/
			log(x) // undefined エラーにならない不思議！
			let x = 0
			//var宣言は位置に関係なく先頭で宣言されるから、以下と等しい
			// var x;
			// log(x); // undefined
			// var x = 0;
			//
			//letは巻きあげない、ので以下はエラー
			// log(x);	// ReferenceError: x is not defined
			// let x = 0;
		},
	},//変数の巻き上げ,
	{
		name: 'let var のブロックスコープ',
		date: '',
		play: 0,
		uniq: 27,
		func: function() {
			'use strict'
			/* 
			ブロックスコープ
			これまでのJavaScriptでは、スコープをつくるのは、
			グローバルスコープ
			ローカルスコープ
			evalスコープ
			の3つのみであった。
			スコープについては以下を参照。
			スコープとクロージャ
			{}で囲まれている領域をブロックと呼ぶが、これはスコープは作らなかった。そのため、ifやforはスコープを持たなかった。
			*/
			let x = 0
			log(x) // 0
			if (true) {
				x = 1
				log(x) // 1
			}
			log(x) // 1
			// ブロックスコープを持たないため、if文の内側のxも、外側のxも、同じものを指す
			//しかしletは、ブロックスコープを作る。
			x = 0
			log(x) // 0
			if (true) {
				let x = 1
				log(x) // 1
			}
			log(x) // 0
			// letはブロックスコープを持つため、if文の内側のxと外側のxは、区別される
		},
	},//let var のブロックスコープ,
	{
		name: 'オブジェクト宣言のキーを変数では、作れません',
		date: '',
		play: 0,
		uniq: 28,
		func: function() {
			'use strict'
			let hoge = 'aaa'
			let o = {
				hoge: 222
			}
			log(o.hoge) //222
		},
	},//オブジェクト宣言のキーを変数では、作れません,
	{
		name: '複数OR条件のifをArray.prototype.include',
		date: '',
		play: 0,
		uniq: 29,
		func: function() {
			'use strict'
			log(`//複数OR条件のifをArray.prototype.includesで、
//関数定義の時に引数は変数でないといけない、デフォルトで数値入力ぽいことはできる`)
			let a
			//if(b===2 || b===3 || b===5)を
			//Array.includes 一番見やすい
			log((a = 3), [2, 3, 5].includes(a))
			//Array.some
			log((a = 3), [2, 3, 5].some(v => v === a))
			//if(b===2 && b===3 && b===5) 使う機会がない
			//every
			log((a = 3), [2, 3, 5].every(v => v === a))
			//someをアロー関数で2重にすると
			let f0 = (c, ar) => ar.some(v => v === c)
			log((a = 3), f0(a, [2, 3, 5]))
		},
	},//複数OR条件のifをArray.prototype.include,
	{
		name: 'コンストラクタ？中途半端',
		date: '',
		play: 0,
		uniq: 30,
		func: function() {
			'use strict'
			let Hoge = function HOGE() {
				this.v = 1
			}
			Hoge.prototype.v = 2
			let hoge = new Hoge()
			log(hoge.v, hoge.constructor.name, hoge.__proto__.constructor.name)
			log(hoge.__proto__.hasOwnProperty('constructor'))
			log(Hoge.v, Hoge.constructor.name) //コンストラクタにはアクセスできない
		},
	},//コンストラクタ？中途半端,
	{
		name: 'Codepenでconsole.time()が使えない',
		date: '',
		play: 0,
		uniq: 31,
		func: function() {
			'use strict'
			let time = new Date()
			alert()
			log(new Date() - time + 'ms')
		},
	},//Codepenでconsole.time()が使えない,
	{
		name: 'new のあとは()を付けなくても良い',
		date: '',
		play: 0,
		uniq: 32,
		func: function() {
			'use strict'
			log(new Date().toString())
			log(JSON.stringify(new Date()))
		},
	},//new のあとは()を付けなくても良い,
	{
		name: 'JSON.stringifyで覚えてない',
		date: '',
		play: 0,
		uniq: 33,
		func: function() {
			//
			'use strict'
			let d = new Date()
			log(Date.now())
			log(d.toString())
			log(JSON.stringify(d))
			log(Object.keys(d))
		},
	},//JSON.stringifyで覚えてない,
	{
		name: '2018/5に何か実験、覚えてない',
		date: '',
		play: 0,
		uniq: 34,
		func: function() {
			let C = function(name) {
				this.name = name
			}
			log(new Date() + '888888888888888888888888888888')
			log(C.toString()) //Function.prototype.toStringが使える
			//log(C.__proto__.__proto__.toString());//Function.prototype.toStringが使える
			let s = ''
			s += ' ' + C.hasOwnProperty('toString') //false
			s += ' ' + Function.prototype.hasOwnProperty('toString') //true
			s += ' ' + Object.prototype.hasOwnProperty('toString') //t
			log(s)
			let array = new Array()
			log('Q1', array.isArray, array.constructor.isArray, Array.isArray)
			let Hoge = function HOGE() {
				//this.f=1;
			}
			//Hoge.f=2;
			Hoge.prototype.f = 3
			let h = new Hoge()
			log(h.f, h.constructor.name, Hoge.f)
		},
	},//2018/5に何か実験、覚えてない,
	{
		name: 'argumentで引数全部取れる？失敗 2018/06/01',
		date: '',
		play: 0,
		uniq: 35,
		func: function() {
			'use strict'
			function func1() {
				log(arguments[0])
				// expected output: 1
				log(JSON.stringify(arguments))
				// expected output: 2
			}
			func1(1, 1 == 1)
		},
	},//argumentで引数全部取れる？失敗 2018/06/01,
	{
		name: 'Date.toXXXXを全部書きだしてみる 失敗',
		date: '',
		play: 0,
		uniq: 36,
		func: function() {
			'use strict'
			let d = new Date()
			console.log(Date.now())

			console.log(d.toString())
			console.log(JSON.stringify(d))
			console.log(Object.keys(d))
		},
	},//Date.toXXXXを全部書きだしてみる 失敗,
	{
		name: '配列の追加、レベルが低いのが欲しい',
		date: '',
		play: 0,
		uniq: 37,
		func: function() {
			'use strict'
			//オブジェクトに追加する場合、こんな感じ数字を書き換える必要あり。
			let list = {}
			list.hoge1 = 111
			list.hoge2 = 222
			//log(`list.hoge1=${list.hoge1}`);
			for (let i in list) {
				if (list.hasOwnProperty(i)) {
					log(i)
				}
			}
			let arrs = []
			arrs.push(111)
			arrs.push(222)
			log(`arrs[0]=${arrs[0]}`)
			for (let val of arrs) {
				log(val)
			}
			for (let i in arrs) {
				if (arrs.hasOwnProperty(i)) {
					log(i)
				}
			}
		},
	},//配列の追加、レベルが低いのが欲しい,
	{
		name: 'newの基礎、func編、class前',
		date: '',
		play: 0,
		uniq: 38,
		func: function() {
			log('newの基礎、func編、class前')
			function Cons() {
				this.v1 = 100
				let v2 = 200
				Cons.v3 = 300
				//log(++this.v1,++v2,++Cons.v3);
				this.fn = () => log(++this.v1, ++v2, ++Cons.v3)
			}

			let obj = new Cons()
			log(obj.v1, obj.v2, obj.v3) //101,und,un
			obj.fn()
			Cons()
			obj.fn()
			obj.fn()
		},
	},//newの基礎、func編、class前,
	{
		name: '正規表現のreplaceは、一度だけ',
		date: '',
		play: 0,
		uniq: 39,
		func: function() {
			log('正規表現')
			let str = 'aabbcc//\\'
			log('str', str)
			let pattern = /a/g
			log(str.replace('a', '@'))
			log(str.replace(/a/g, '@'))
			log(str.replace(new RegExp('a', 'g'), '@'))

			log(str.replace(pattern, '@'))
			log(str.replace(/\//g, '@'))
			log(str.replace(new RegExp('/', 'g'), '@'))

			log(str.replace(new RegExp('\\\\', 'g'), '@'))
			log(str.replace(new RegExp('aa|c', 'g'), '@'))
			/*
			"@abbcc//\"
			"@@bbcc//\"
			"@@bbcc//\"
		
			"@@bbcc//\"
			"aabbcc@@\"
			"aabbcc@@\"
		
			"aabbcc//@"
			"@bb@@//\"
			*/

			log(132223)
		},
	},//正規表現のreplaceは、一度だけ,
	{
		name: 'アロー関数使っちゃダメパターン、多い。',
		date: '',
		play: 0,
		uniq: 40,
		func: function() {
			'use strict'
			log('アロー関数使っちゃダメパターン')
			let obj = {
				hoge: 'ほげー',
				f0: () => log(this.hoge),
				fa: function() {
					log(this.hoge)
				}
			}
			this.hoge = '違うこれじゃない' //この場合は関数群のfn:がループで呼ばれたのがthis
			obj.f0()
			obj.fa()

			obj.f1 = () => {
				log(this.hoge)
			}
			obj.f1()

			obj.f2 = function() {
				log(this.hoge)
			}
			obj.f2()
			//function は呼ばれかたでthisが変わる、obj.fn()ならthisはobj。
			//アロー関数はリテラルした瞬間に固定される。
			//便利そうだがダメなパターンが多い。
			//es6前は、function(){}.bind(this)で固定していた。
		},
	},//アロー関数使っちゃダメパターン、多い。,
	{
		name: 'domの基礎',
		date: '',
		play: 0,
		uniq: 41,
		func: function() {
			'use strict'
			document.body.style.backgroundColor = 'green'

			let div = document.createElement('div')
			div.style.border = '4px solid #222'
			let div2 = div.cloneNode(true)
			let div3 = div.cloneNode(true)

			div.textContent = 'div1'
			div2.textContent = 'div2'
			div3.textContent = 'div3'

			div.style = 'background-color : aqua' //textは非推奨,他が消える
			div2.style.backgroundColor = 'lime' //domだとキャメル
			div3.style.backgroundColor = 'rgba(255,255,255,0.8)'
			//log(div3.style)
			//div3.style={backgroundColor:'red'}; //無理
			log(div3.style.backgroundColor) //"rgba(255, 255, 255, 0.8)"

			document.body.appendChild(div)
			document.body.appendChild(div2)
			document.body.appendChild(div3)
			document.body.appendChild(div) //二回appendすると、増えずに移動
		},
	},//domの基礎,
	{
		name: '分割代入 配列 es6',
		date: '',
		play: 0,
		uniq: 42,
		func: function() {
			'use strict'
			log('分割代入')

			const arr = ['Japan', 'Tokyo', 'Shinjuku']
			const [country, state, city] = arr

			console.log(`country: ${country}, state: ${state}, city: ${city}`)
		},
	},//分割代入 配列 es6,
	{
		name: '関数群フォーマット、arr.push({fn:})型',
		date: '',
		play: 0,
		uniq: 43,
		func: function() {
			'use strict'
			log('関数群の新しいフォーマット')
			//log(this)
			let arr = []
			//関数群の登録
			arr.push({
				name: 'hoge',
				fn: function() {
					log(this)
				}
			})
			// arr.push({name:'hoge',fn:()=> //アローだと更に上になり混乱。
			// 	log(this)
			// });
			//実行パート
			for (let i = 0, l = arr.length; i < l; i++) {
				let val = arr[i]
				if (val.do || i == l - 1) {
					log(`arr[${i}]:name:${val.name}`)
					val.fn()
					break
				}
			} //関数の実行、Tが無ければ、最後の関数を実行

			/*
			2019/10/12
			専用の関数を作ることで、折りたたんだ状態で説明が読め、
			説明文をコピペや、スクリプトバッチする必要も無い、
			しかし専用関数が増える
			*/
		},
	},//関数群フォーマット、arr.push({fn:})型,
	{
		name: '分割代入オブジェ、ややこしい es6',
		date: '',
		play: 0,
		uniq: 44,
		func: function() {
			'use strict'
			log('分割代入')

			//オブジェクトの分割代入
			const obj = {country: 'Japan', state: 'Tokyo', city: 'Shinjuku'}
			const {country, state, city} = obj

			console.log(`country: ${country}, state: ${state}, city: ${city}`)
			// -> 'country: Japan, state: Tokyo, city: Shinjuku'

			//countryが3回出てくるが、どれも変えてはいけない、謎。
		},
	},//分割代入オブジェ、ややこしい es6,
	{
		name: '関数群フォーマット、専用関数タイプ',
		date: '',
		play: 0,
		uniq: 45,
		func: function() {
			'use strict'
			log('関数群の新しいフォーマット')
			//log(this)
			let arr = []
			//登録用関数
			function kang(s, d, f) {
				//log(s,d)
				arr.push({
					name: s,
					do: d,
					fn: f
				})
			}
			//関数群の登録
			kang('関数群の新しいフォーマット模索してる', 0, function() {
				log(0, this.hoge)
				this.hoge = 'ほげー'
				log(this)
			})
			kang('ここに簡単な説明文を書く', 0, function() {
				log(1)
			})
			//実行パート
			for (let i = 0, l = arr.length; i < l; i++) {
				let val = arr[i]
				if (val.do || i == l - 1) {
					log(`arr[${i}]:name:${val.name}`)
					val.fn()
					break
				}
			} //関数の実行、Tが無ければ、最後の関数を実行

			/*
			2019/10/12
			専用の関数を作ることで、折りたたんだ状態で説明が読め、
			説明文をコピペや、スクリプトバッチする必要も無い、
			しかし専用関数が増える
			*/
		},
	},//関数群フォーマット、専用関数タイプ,
	{
		name: '関数群フォーマット、配列タイプ、arr.push([fn])型',
		date: '',
		play: 0,
		uniq: 46,
		func: function() {
			'use strict'
			log('関数群の新しいフォーマット')
			//log(this)
			let arr = []

			//関数群の登録
			arr.push([
				'a説明文',
				0,
				function() {
					this.hoge = 'ほげー'
					log(this)
				}
			])
			arr.push([
				'jhghjgjh',
				0,
				function() {
					this.hoge = 'ほげー'
					log(this)
					let a = ['aa', 0, {a: 1, b: 2}]
					log(a)
					a = [
						'aa',
						0,
						function() {
							return 1
						}
					]
					log(a)
				}
			])
			//実行パート
			for (let i = 0, l = arr.length; i < l; i++) {
				let val = arr[i]
				if (val[1] || i == l - 1) {
					log(`arr[${i}]:name:${val[0]}`)
					val[2]()
					break
				}
				//let [name,do,fn] = arr[i];
				// if (do || i == l - 1) {
				// 	log(`arr[${i}]:name:${name}`);
				// 	fn();
				// 	break;
				// }
			} //関数の実行、Tが無ければ、最後の関数を実行

			/*
			2019/10/13
			配列だと折りたたんでも説明読める
			駄目だった、配列が自動インデントで折られる；
			配列ナンバーは読み辛い、分割代入しようとするもエラー
			doがメタ文字だった。
			*/
		},
	},//関数群フォーマット、配列タイプ、arr.push([fn])型,
	{
		name: 'クロージャ',
		date: '',
		play: 0,
		uniq: 47,
		func: function() {
			'use strict'
			//クロージャを駆使する方法は、このようなやり方になります。

			// 処理内容の関数を生成
			let test = (function() {
				let a = 0
				// 処理内容の（外側でtest関数になる）無名関数を返す
				return function() {
					log(this) //無理
					return (a = a + 1)
				}
			})()
			log(test())
			log(test())
			log(test())
		},
	},//クロージャ,
	{
		name: '関数群・即実行型',
		date: '',
		play: 0,
		uniq: 48,
		func: function() {
			'use strict'
			function kg(play, name, func) {
				//プロパティの初期値、falseだとv=v||1←とか使えない。三項演算子なら出来る
				// if(kg.flag ==undefined)
				// 	kg.flag=false
				//三項演算子の初期値
				kg.flag = kg.flag !== undefined ? kg.flag : false

				//log("aflag", kg.flag);
				//kg.flag=kg.flag
				let obj = {name: name, f: func}

				//オブジェに入れることで、thisが個別で使える。必要無いかも。
				//登録型と違って、何度も実行や、最後だけ実行はできない。
				//変数を使って、実行前にフラグを書き換えれば近いことはできるかも。
				if (play || kg.flag) {
					log(` ${name} $$$$$$$$$$$$$$$$$$$$$$$$$$$$`)
					obj.f()
					kg.flag = false
				}
			}
			//
			log(888)
			kg(0, 'temp1', function() {})
			kg.flag = 1
			kg(0, 'temp2', function() {})
			kg(0, 'temp3', function() {})
		},
	},//関数群・即実行型,
	{
		name: 'undefineのプロパティを見るとクラッシュ',
		date: '',
		play: 0,
		uniq: 49,
		func: function() {
			'use strict'
			let hoge = 123
			log(hoge)
			log(typeof hogehoge) //大丈夫
			//log( hogehoge); //クラッシュ
			log(hoge.a) //undefine 大丈夫
			//log(hoge.a.a) //クラッシュ
			//log(typeof hoge.a.a) //クラッシュ
		},
	},//undefineのプロパティを見るとクラッシュ,
	{
		name: 'Dateのproto2018/6スクラッチパッド↓',
		date: '',
		play: 0,
		uniq: 50,
		func: function() {
			//"use strict";
			//FFのスクラッチパッドに2018/6ぐらいに書いてたもの
			//'use strict';
			log(new Date()) //Date 2018-06-02T06:55:44.790Z
			log(new Date().__proto__) //Objcet {,48...}
			log(Object.keys(new Date().__proto__)) // Array[] 0個、keys関数では全て表示されるわけじゃない。
			Object.getOwnPropertyNames(new Date())
			/**/
			let arr = Object.getOwnPropertyNames(new Date().__proto__)
			/*48個
		  getTime,getTimezoneOffset,getYear,getFullYear,getUTCFullYear,getMonth,
		  getUTCMonth,getUTCDate,getDay,getUTCDay,getHours,getUTCHours,getMinutes,getUTCMinutes,getSeconds,
		  getUTCSeconds,getMilliseconds,getUTCMilliseconds,setTime,setYear,setFullYear,setUTCFullYear,setMonth,
		  setUTCMonth,setDate,setUTCDate,setHours,setUTCHours,setMinutes,setUTCMinutes,setSeconds,setUTCSeconds,
		  setMilliseconds,setUTCMilliseconds,toUTCString,toLocaleFormat,toLocaleString,toLocaleDateString,
		  toLocaleTimeString,toDateString,toTimeString,toISOString,toJSON,toSource,toString,valueOf,constructor,toGMTString
			*/

			//Date.prototypeでset以外で始まるものを全て実行
			//set系はtoSourceがNullに書き換えられるから。
			let d = new Date()
			arr.map(function(value) {
				if (!value.match(/^set/)) {
					console.log(value, ' => ' + d[value]())
					// d.[value]
				}
			})
			//for in では0個
			for (let prop in new Date().__proto__) {
				console.log(prop)
			}
		},
	},//Dateのproto2018/6スクラッチパッド↓,
	{
		name: 'prototype',
		date: '',
		play: 0,
		uniq: 51,
		func: function() {
			'use strict'
			//firefoxのスクラッチパッドは、ブラウザコンソールだとエラーが表示されるぽい
			//ただスクラッチにもエラー時は表示される。
			//cssエラーとか邪魔なのも多いからoffにする
			//スクラッチパッドの調査便利、console.dirを書かなくて良い、ブロックの中とか上手く使えないけど。
			//スクラッチパッドは再読込実行⌘Shift Rしないと、前のvar宣言とか汚染とかが全部残る。

			//FFのスクラッチパッドに2018/6ぐらいに書いてたもの
			//'use strict';
			Object.defineProperty(Object.prototype, 'myMethod', {
				// 拡張
				configurable: true, // false is immutable
				enumerable: false, // false is invisible
				writable: true, // false is read-only
				value: function() {
					console.log('myMethod')
				}
			})
			function eachObject(obj) {
				for (let key in obj) {
					console.log(key)
				} // "a", "b"
			}
			function eachArray(ary) {
				for (let key in ary) {
					console.log(key)
				} // "0", "1", "2"
			}
			eachObject({
				a: 1,
				b: 2
			})
			eachArray([1, 2, 3])
		},
	},//prototype,
	{
		name: 'prototypeにこ謎',
		date: '',
		play: 0,
		uniq: 52,
		func: function() {
			'use strict'
			//prototype汚染 ※汚染後はリーロードでリセット 2018/06/03
			//'use strict';
			Object.prototype.myMethod = function() {
				console.log('myMethod')
			} // 汚染
			function eachObject(obj) {
				for (let key in obj) {
					console.log(key)
				} // "myMethod", "a", "b"
			}
			function eachArray(ary) {
				for (let key in ary) {
					console.log(key)
				} // "myMethod", "0", "1", "2"
			}
			eachObject({
				a: 1,
				b: 2
			})
			eachArray([1, 2, 3])
		},
	},//prototypeにこ謎,
	{
		name: '関数を囲む・ボッチつける、とスコープに入らない',
		date: '',
		play: 0,
		uniq: 53,
		func: function() {
			'use strict'
			//関数を囲む・ボッチつける、とスコープに入らない。括弧でくくられてると同じ
			function f1() {
				log('f1')
			}
			+function f2() {
				log('f2')
			}

			try {
				f1() //f1
				f2() //unavilable
				f1() //実行されず
			} catch (e) {
				log(e)
			}
		},
	},//関数を囲む・ボッチつける、とスコープに入らない,
	{
		name: 'temp',
		date: '',
		play: 0,
		uniq: 54,
		func: function() {
			+function() {
				//関数内this use strict で変わる 2018/06/08
				'use strict'
				console.log(1, this) //window
			};
			+function() {
				//関数内this use strict で変わる
				//'use strict';
				console.log(1, this) //undefined
			};
			// delete 出来るのはプロパティだけ、var 付けたものは無理、エラーで動かせない
			+function() {
				'use strict'
				a = 1
				//delete a;
				console.log(a)
			}
		},
	},//temp,
	{
		name: '関数のプロパティに内と外から',
		date: '',
		play: 0,
		uniq: 55,
		func: function() {
			'use strict'
			function hoge() {
				hoge.aaa = hoge.aaa || 1
				hoge.aaa++
				console.log(hoge.aaa)
			}
			hoge() //2
			hoge.aaa = 10
			hoge() //11
			//console.dir(hoge)
		},
	},//関数のプロパティに内と外から,
	{
		name: '++の使い方基本',
		date: '',
		play: 0,
		uniq: 56,
		func: function() {
			'use strict'
			//バグのもと
			let n
			n = 10
			n = n++
			console.log(n) //10
			n = 10
			n = n++ + n //10+11
			console.log(n) //21
		},
	},//++の使い方基本,
	{
		name: '謎、関数で暮らす作ってる2018/6スクラッチパッドここまで',
		date: '',
		play: 0,
		uniq: 57,
		func: function() {
			'use strict'

			let hoge_class = function hoge_p() {
				let abc = 123
				function pf() {}
				console.log(333)
				//	 this.f=function(){
				//		   console.log("fff")
				//	 }
				return 9
			}
			//hoge_p() //not defined
			console.log(hoge_class())
			console.log(new hoge_class())
		},
	},//謎、関数で暮らす作ってる2018/6スクラッチパッドここまで,
	{
		name: '複数url対応の関数郡、旧mypo',
		date: '',
		play: 0,
		uniq: 58,
		func: function() {
			'use strict'
			function autoRunList() {
				let H
				const kazari = ' ###### '
				for (let key in list) {
					//console.log("1 "+list[i].host);
					H = list[key].host
					switch (typeof H) {
						case 'string':
							H = new RegExp(H, 'i')
							break
						case 'object':
							H = new RegExp(H.join('|'), 'i')
							break
					}
					if (H.test(location.href)) {
						//debugger;
						console.log(` ###### ${key} start ###### `)
						list[key].func()
						//console.log(` ###### ${key} end `);
						//fn = list[i].fn;
						// addEvent(window, "DOMContentLoaded", fn);
						// window.addEventListener("DOMContentLoaded", fn, false);
						//return; //1つヒットしたら終わり
					}
				}
			}
		},
	},//複数url対応の関数郡、旧mypo,
	{
		name: '新毎ポ関数2019-10-17',
		date: '2019-10-17',
		play: 0,
		uniq: 59,
		func: function() {
			'use strict'
			//使ってみると、メインが恐ろしく長くなる。やっぱ登録型のほうがええかな。
			function kkk(play, name, url, func) {
				//log(location.href)
				// log(url.join('|'))
				let urlpai = url.join('|').replace(/\./g, '\\.') //.は正規表現のためにエスケープ
				urlpai = urlpai.replace(/\*/g, '.*?') //ワイルドカードを実装。
				log(urlpai)
				let patt = new RegExp(urlpai, 'i')
				//log(patt)
				if (patt.test(location.href)) {
					let obj = {name: name, f: func}
					log(` ${name} $$$$$$$$$$$$$$$$$$$`)
					obj.f()
				}
			}
			kkk(
				1,
				'グーグルでアラーム',
				['https://news.google.com/', 'cd*n.io'],
				function() {
					'use strict'
					//log((new RegExp('a', 'i')).test."ac.ap")
				}
			)
		},
	},//新毎ポ関数2019-10-17,
	{
		name: 'codepenでサムネ',
		date: '',
		play: 0,
		uniq: 60,
		func: function() {
			'use strict'
			if (location.href.match('cdpn.io')) {
				let d = document.body
				d.style.backgroundColor = '#333'
				d.style.color = '#aaa'
				d.style.fontSize = '70px'
				d.innerHTML = 'べんきよ関数群</br>a'
			}
		},
	},//codepenでサムネ,
	{
		name: 'replaceは一度だけ',
		date: '',
		play: 0,
		uniq: 61,
		func: function() {
			'use strict'
			log(9999)
			let str = 'a.b.c'
			log(str.replace('.', '-')) //"a-b.c"
			log(str.replace(/\./g, '-')) //"a-b-c"
			log(str.replace(new RegExp(/\./), '-')) //"a-b.c"

			log(str.replace(new RegExp(/\./g), '-')) //"a-b-c"
			log(str.replace(new RegExp(/\./, 'g'), '-')) //"a-b-c"
			log(str.replace(RegExp(/\./g), '-')) //"a-b-c"

			log(str.split('.').join('-')) //"a-b-c"
		},
	},//replaceは一度だけ,
	{
		name: 'ベンチマーク',
		date: '',
		play: 0,
		uniq: 62,
		func: function() {
			'use strict'
			function bench(max, func) {
				let time = Date.now() //時間測定
				for (let i = 0; i < max; i++) {
					func()
				}
				log(` ${Date.now() - time}ms %%%%%%%%%%`)
			}

			let str = 'aaa.bbb.ccca'
			let max = 10e4
			log(max)

			bench(max, function() {
				str.split('.').join('-') //worst
			})
			bench(max, function() {
				str.replace(/\./g, '-')
			})
			bench(max, function() {
				str.replace(/\./, 'g', '-') //best
			})
			bench(max, () => str.replace(/\./, 'g', '-'))
			//アローは130%ぐらい時間になるが、一行で書きやすい
			bench(max, function() {
				str.replace(new RegExp(/\./, 'g'), '-')
			})
			bench(max, function() {
				str.replace(RegExp(/\./, 'g'), '-')
			})

			// " 131ms %%%%%%%%%%"
			// " 31ms %%%%%%%%%%"
			// " 16ms %%%%%%%%%%"
			// " 23ms %%%%%%%%%%"
			// " 46ms %%%%%%%%%%"
			// " 47ms %%%%%%%%%%"
		},
	},//ベンチマーク,
	{
		name: 'ベンチ2、設定を内包',
		date: '2019/10/18',
		play: 0,
		uniq: 63,
		func: function() {
			'use strict'
			//
			//初期化が多いとややこしいから、くくってみたが、読みにくい。
			//ベンチが複数同時進行しないから、インスタンス化は必要ない。
			//なんで、シンプルにObject一個で作れるが、ben.loop(func)みたいになっちゃう。
			//クロージャにすりゃ、出来るかも。綺麗には書けないだろうな。
			function bench(func) {
				if (!bench.initial) {
					bench.initial = 1
					bench.loop = bench.loop || 10e1

					bench.log = `\n// loop=${bench.loop.toLocaleString()}\n`
					bench.prt = function() {
						log(bench.log + '\n')
					}
				}
				//プロパティに初期化書き足す関数、作ってみたが、引数が文字列になっちゃう。
				// prop(bench,"log" ,`\n// loop=${bench.loop.toLocaleString()}\n`)
				// function prop(o,key,val){
				// 	if(o[key]==undefined){
				// 		o[key]=val
				// 	}
				// }

				//log(`bench(${func}) //`)
				let time = Date.now() //時間測定
				//log(typeof func)
				//if(typeof func=="function")
				for (let i = 0, l = bench.loop; i < l; i++) func()

				time = Date.now() - time
				let timeStr = ('		' + time).slice(-4)
				bench.log += `/* ${timeStr} ms*/ bench(${func}) \n`
				//bench.log+=`\n/*\t${time} ms\t*/`
				//log(` ${time}ms %%%%%%%%%%`);
			}
			//let ben = new bench()
			bench.loop = 30e4
			let r,
				str = 'aaa.bbb.ccc'

	// loop=100,000
	/*   71 ms*/ bench(() => 1)
	/*   71 ms*/ bench(() => (r = str.replace(/\./g, 'o')))
	/*   71 ms*/ bench(() => (r = str.replace(/\./g, 'o')))
	/*   99 ms*/ bench(() => (r = str.replace(RegExp('\\.', 'g'), '-')))
	/*   81 ms*/ bench(() => (r = str.replace(RegExp(/\./g), '-')))
	/*   72 ms*/ bench(() => (r = str.replace(/\./g, 'z')))
			bench.prt()
			log(str.replace(RegExp('\\.', 'g'), '-'))
		},
	},//ベンチ2、設定を内包,
	{
		name: 'アロー関数のthis固定の有効利用',
		date: '',
		play: 0,
		uniq: 64,
		func: function() {
			'use strict'
			const Counter = function() {
				this.count = 0
			}

			Counter.prototype.increment = function() {
				setTimeout(() => {
					this.count++
					console.log(this.count) // 1
				}, 1000)
			}

			const counter = new Counter().increment()
		},
	},//アロー関数のthis固定の有効利用,
	{
		name: 'クラスっぽいもの先達のコピペ',
		date: '',
		play: 0,
		uniq: 65,
		func: function() {
			'use strict'
			var Person = function(name) {
				this.name = name
			}

			Person.prototype.sayHello = function() {
				console.log('Hello, I\'m ' + this.getName(), this.name)
			}
			Person.prototype.getName = function() {
				return this.name
			}
			let p = new Person(123)
			p.sayHello()
		},
	},//クラスっぽいもの先達のコピペ,
	{
		name: 'newは{}.func()に近い',
		date: '',
		play: 0,
		uniq: 66,
		func: function() {
			'use strict'
			// //let h=new Hoge(123) は
			// //let h={}
			// //h.Hoge(123)
			// // aaa()

			// this.f()log(this) //既にfが存在している、巻き上げ？
			//this.f() //ブラウザフリーズ
			this.f = function() {
				log(this)
			}
			this.hoge = 123
			// function aaa(){
			// 	log(this)
			// }
		},
	},//newは{}.func()に近い,
	{
		name: 'Objectにリテラル関数が定義前に存在',
		date: '',
		play: 0,
		uniq: 67,
		func: function() {
			'use strict'

			// this.f()
			log(this) //既にfが存在している、巻き上げ？
			//this.f() //ブラウザフリーズ
			this.f = function() {
				log(this)
			}
			this.hoge = 111
			log(this)
		},
	},//Objectにリテラル関数が定義前に存在,
	{
		name: 'リテラル関数も上から呼べる？',
		date: '',
		play: 0,
		uniq: 68,
		func: function() {
			'use strict'
			//f1() //エラー
			let f1 = function() {
				log(this, 111)
			}

			f2() //OK
			function f2() {
				log(222)
			}

			//this.f3() //err
			this.f3 = function() {
				log(333)
			}
			//this.f3()
		},
	},//リテラル関数も上から呼べる？,
	{
		name: '基礎class構文',
		date: '',
		play: 0,
		uniq: 69,
		func: function() {
			'use strict'
			class User {
				constructor(name, age) {
					this.name = name
					this.age = age
				}
				//普通のメソッド
				getName() {
					return this.name
				}
				//セッターメソッド
				set myName(value) {
					this.name = value
				}
				//ゲッターメソッド
				get myName() {
					return this.name
				}
			}

			var taro = new User('太郎', 32)
			console.log(taro.getName()) //太郎
			console.log(taro.myName) //太郎
			// console.log( taro.myName() ); //err
			taro.myName = '花子'
			console.log(taro.myName) //花子
		},
	},//基礎class構文,
	{
		name: 'ベンチ3、クロージャ断念',
		date: '2019/10/18',
		play: 0,
		uniq: 70,
		func: function() {
			'use strict'
			//2019/10/18
			//クロージャはlet系なんでthis系オブジェとちゃう。
			//クロージャはメソッド作れないぽい、ちょっと複雑なことやるのすら無理。

			let benc = (function() {
				let loop = 1000
				function hoge() {
					loop = 0
				}
				function lo(func) {
					log(++loop)
				}
				return lo
			})()
			benc()
			//benc.hoge()
			benc()
		},
	},//ベンチ3、クロージャ断念,
	{
		name: 'f=obj.func から呼び出すとthis狂う',
		date: '',
		play: 0,
		uniq: 71,
		func: function() {
			'use strict'
			let o = {
				v1: 1,
				f: function() {
					log(this.v1)
				}
			}
			o.f() //1
			o.v1 = 10
			o.f() //10
			let ff = o.f
			//ff() //err thisがunde
			let o2 = {v1: 200}
			o2.f2 = o.f
			o2.f2() //200
		},
	},//f=obj.func から呼び出すとthis狂う,
	{
		name: 'thisを色々な呼び出し',
		date: '',
		play: 0,
		uniq: 72,
		func: function() {
			'use strict'
			let o = {v1: 10}

			o.f = () => log(this) //oにならない。
			o.f()
			//アロー関数でthisをoにするにゃ、o.function(){アロー関数}にしないと
			log('root', this)
			function hoge() {
				log(this)
			}
			hoge() //und
			o.ff2 = (function() {
				log('o.ff2 this', this) //und
			})()
			o.ff = function() {
				log('o.ff this', this)
			}
			o.ff() //v1:10
		},
	},//thisを色々な呼び出し,
	{
		name: 'アロー関数のthisを指定objに',
		date: '',
		play: 0,
		uniq: 73,
		func: function() {
			'use strict'
			//アロー関数の固定を強行してみた。
			let o = {
				name: 'hoge',
				f: function() {
					log('f', this ? this.name : this)
				},
				reg: function() {
					this.arrowFn = () => log('arrowFn', this ? this.name : this)
				}
			}
			o.reg()
			o.f() //hoge
			o.arrowFn() //hoge
			let nf = o.f
			nf() //und
			let af = o.arrowFn
			af() //hoge アロー関数だからthis固定
		},
	},//アロー関数のthisを指定objに,
	{
		name: 'アロー関数で、thisの使えるobj()',
		date: '',
		play: 0,
		uniq: 74,
		func: function() {
			'use strict'
			//Objectを関数で上書き、クロージャみたいになった、外からアクセできない。
			//残骸としてのこる、まあ使えない。
			let o = {
				name: 'hoge',
				f: function() {
					log('f', this ? this.name : this)
				},
				reg: function() {
					o = () => log('arrowFn', this ? this.name : this, this)
				}
			}
			o.reg()
			o() //
			log(o.name) //o ?謎
			//o.f() //not func
		},
	},//アロー関数で、thisの使えるobj(),
	{
		name: 'ベンチ2をclass化',
		date: '',
		play: 0,
		uniq: 75,
		func: function() {
			'use strict'
			//一重ループで作ったが、最初だけとてつもなく遅くなる。
			//二重ループにして平均取る、二重目が100未満だと誤差が激しすぎる。
			class Bench {
				constructor(lop1, loop2 = 100) {
					this.loop2 = loop2
					this.lop1 = lop1
					this.head = 'b.add('
					this.times = []
				}
				lp(func) {
					let time = Date.now() //時間測定
					for (let i = 0, l = this.loop2; i < l; i++) func()
					time = Date.now() - time
					//this.logs.push(func)
					return time
					//this.times.push(time)
				}
				add(func) {
					if (!this.funcs) this.funcs = []
					this.funcs.push(func)
					this.times.push(0)
				}
				play() {
					//時間配列を0で初期化
					// this.times=Array(this.funcs.length)
					// this.times.fill(0)

					//ループ一次元
					for (let j = 0; j < this.lop1; j++) {
						let i = 0
						for (let val of this.funcs) {
							this.times[i] += this.lp(val)
							i++
						}
						//this.prt()
					}
				}
				prt() {
					//ヘッダー
					let str = '\n'
					let [l1, l2] = [this.lop1, this.loop2] //分割代入で見やすく。
					str += `//${l1.toLocaleString()}*(${l2}*code)`
					str += `= ${(l1 * l2).toLocaleString()} \n`

					let max = Math.max(...this.times)
					let maxlen = String(max).length
					//log(maxlen)

					for (let i = 0, l = this.funcs.length; i < l; i++) {
						let timeStr = ('		' + this.times[i]).slice(-maxlen)
						let graf = this.mgraf(this.times[i], max)
						str += `/*${graf} ${timeStr}ms */ ${this.head}${this.funcs[i]})\n`
					}
					log(str)
				}
				mgraf(val, max) {
					let len = 10,
						s = '#_'
					let count = Math.round(val / max * len)
					let str = s[0].repeat(count) + s[1].repeat(len - count)
					return str
				}
			}

			let b = new Bench(1000, 1000)
			let r,
				str = 'aaa.bbb.ccc'
			//b.add(() => null);
			b.add(() => str.replace(/\./g, 'o'))
			b.add(() => str.replace(/\./g, 'o'))
			b.add(() => str.replace(/\./g, 'o'))
			b.add(() => str.replace(/\./g, 'o'))
			b.add(() => null)
			b.add(() => str.replace('.', 'o'))

			b.play()
			b.prt()
			//log(str.replace(RegExp("\\.", "g"), "-"));
		},
	},//ベンチ2をclass化,
	{
		name: 'obo覚書専用の関数',
		date: '',
		play: 0,
		uniq: 76,
		func: function() {
			'use strict'
			//そこそこ使えるかも、しかしカッコが増えてコピペミスしそう。
			//出力コメを関数直後にも挿入出来るが、それをやると次から文字列走査して消す必要も出てくる。
			function obo(func) {
				let o = obo
				if (!o.ini) {
					o.ini = 1
					o.log = '\n'
					o.head = 'obo'
					o.prt = function() {
						log(o.log + '\n')
					}
					o.kome = function(s) {
						o.log += `${o.head}.kome("${s}");\n`
					}
				}
				o.log += `${o.head}(${func}  );//  ${func()}\n\n`
			}

			obo(() => Number('12e2')) //1200

			obo(() =>
				//文字列の連続、es6
				'#$'.repeat(3)
			) //#$#$#$

			obo.kome('数値にカンマ')
			obo(() => Number(1000000).toLocaleString()) //1,000,000

			obo.kome('分割代入、コードを見やすくできるかも')
			obo(() => {
				let [a, b] = [10, 11]
				return [a, b]
			}) //10,11

			obo.prt()
		},
	},//obo覚書専用の関数,
	{
		name: 'obo覚書専用の関数​オブジェクト化',
		date: '',
		play: 0,
		uniq: 77,
		func: function() {
			'use strict'
			//objectに文字列化できれば、すべてのフォーマットを統一出来るかも。コメも含め。
			//良さそうな気がする。もちろん配列でも良いかなと思った、が、
			//巨大な置換をする場合、keyがあったほうが楽か。
			let obj = {
				a: 'abc数値にカンマ',
				f: () => Number(1000000).toLocaleString()
			}
			obj.r = obj.f()
			log(obj)
			log('' + obj.f) //"() => Number(1000000).toLocaleString()"
			log(obj.f.toString()) //onaji

			log(JSON.stringify(obj)) //"{'a':'数値にカンマ','r':'1,000,000'}"
			log(obj.toString()) //"[object Object]"
			log(obj.toSource()) //"非推奨、日本語は変換される、構造がワンラインになってる。

			let arr = []
			arr = ['数値にカンマ', () => Number(1000000).toLocaleString()]
			arr[2] = arr[1]()
			log(arr)
			log(arr.toString()) //"数値にカンマ,() => Number(1000000).toLocaleString(),1,000,000"
			log(JSON.stringify(arr)) //"['数値にカンマ',null,'1,000,000']"
			log(arr.join('\n'))
		},
	},//obo覚書専用の関数​オブジェクト化,
	{
		name: '関数と出力を結合',
		date: '',
		play: 0,
		uniq: 78,
		func: function() {
			'use strict'
			function hoge() {
				//コメント1
				window['console'].log('hoge')
				//hoge

				//
				log(window.navigator.userAgent)
				//Mozilla/5.0 (Macintosh; Intel Mac OS X 10.11; rv:70.0) Gecko/20100101 Firefox/70.0
			}
			//log(hoge);
			log(hoge.toString())

			hoge()
		},
	},//関数と出力を結合,
	{
		name: '変数名を取得',
		date: '',
		play: 0,
		uniq: 79,
		func: function() {
			'use strict'
			var v3
			for (let s in {v3}) {
				console.log(s)
			} //v3

			var v4
			console.log(Object.keys({v4})[0]) //v4

			//関数化しようと思ったら、変数入れ替えるから無理や。
			const vlog = function() {}
		},
	},//変数名を取得,
	{
		name: 'objを展開する関数作りたい',
		date: '',
		play: 0,
		uniq: 80,
		func: function() {
			'use strict'
			let obj = {
				a: 'abc数値にカンマ',
				f: () => Number(1000000).toLocaleString()
			}
			obj.r = obj.f()
			for (let [key, value] of Object.entries(obj)) {
				console.log(`${key}: ${value}`)
			}
		},
	},//objを展開する関数作りたい,
	{
		name: 'objに勉強関数を入れたい,obj一個編',
		date: '',
		play: 0,
		uniq: 81,
		func: function() {
			'use strict'
			//objに入れることで、変換とかも簡単にできることが、今更気づく。
			let arr, obj
			obj = {
				a: 'abc数値にカンマ',
				f: () => Number(1000000).toLocaleString()
			}
			arr = [
				{
					a: 'abc数値にカンマ',
					f: () => Number(1000000).toLocaleString(),
					r: '1,000,000'
				},
				{
					a: '文字列の連続、es6',
					f: () => '_-$'.repeat(3),
					r: '1,000,000'
				}
			]
			// let obj=
			obj.r = obj.f()
			let str = ''
			for (let [key, value] of Object.entries(obj)) {
				if (typeof value === 'string') value = `"${value}"`
				str += `\t${key}: ${value},\n`
				//console.log();
			}
			log(`\n{\n${str}}\n`)
		},
	},//objに勉強関数を入れたい,obj一個編,
	{
		name: 'obj+arrの複合を展開書き出す車輪開発',
		date: '',
		play: 0,
		uniq: 82,
		func: function() {
			'use strict'
			//objに入れることで、変換とかも簡単にできることが、今更気づく。
			//畳むとなにも見えねえ→配列を止めてobjにして名前コピー
			//firefoxでlog(obj)→コピーでテキスト化できるけど、関数が消える。

			const obj = {
				abc数値にカンマ: {
					n: 'abc数値にカンマ',
					f: () => Number(1000000).toLocaleString(),
					r: '1,000,000',
					d: '2019/10/27 13:05:58'
				},
				'es6 分割代入': {
					n: 'es6 分割代入',
					f: () => {
						let [a, b] = [10, 11]
						return [b, a].join(',')
					},
					r: '11,10',
					d: '2019/10/27 13:05:58'
				},
				date: {
					n: 'date',
					f: () => {
						return {a: Date(), b: Date.now()}
					},
					r: {
						a: 'Fri Oct 25 2019 22:29:27 GMT+0900 (日本標準時)',
						b: 1572010167428
					},
					d: '2019/10/27 13:05:58'
				},
				配列なのにtypeofでobject: {
					n: '配列なのにtypeofでobject',
					f: () => [typeof [], Array.isArray([])].join(','),
					r: 'object,true',
					d: '2019/10/27 13:05:58'
				},
				'文字列の連続、es6': {
					n: '文字列の連続、es6',
					f: () => ['_##'.repeat(3), 'a'.repeat(0)].join(','),
					d: '2019/10/27 13:05:58',
					r: '_##_##_##,'
				}
			}

			let obj2 = {}
			//log(arr)
			kansuGunObj1(obj)
			//log(obj2)
			let str = obj_to_txt(obj)
			str = `${str};`
			//log(str)
			dom_copy(str)

			//関数群obj1型用の関数
			function kansuGunObj1(obj) {
				for (let [key, val] of Object.entries(obj)) {
					//log(key,val)
					//rがなければ、関数を実行し、作る
					if (!val.r) val.r = val.f()
					//日付がなければ日付
					if (!val.d) val.d = new Date().toLocaleString()
					//obj2に代入する。
					obj2[val.n] = val
				}
			}

			//htmlに表示させてclickコピー
			function dom_copy(str) {
				let d = document.body
				d.style.backgroundColor = '#222'
				d.style.color = '#fff'
				d.style.whiteSpace = 'pre'
				d.style.tabSize = 2
				d.style.MozTabSize = 2 //firefox用
				d.style.fontFamily = 'monospace'
				//d.style.fontSize = "70px";
				d.innerHTML = str
				d.onclick = function(e) {
					let selection = getSelection()
					selection.selectAllChildren(this)
					document.execCommand('copy')
					//selection.removeAllRanges()
					this.onclick = null
				}
			}

			//obj+arrを展開してテキストで返す。
			function obj_to_txt(obj, indent = 0) {
				let str = ''
				let ind = '\t'.repeat(indent)
				let is_arr = Array.isArray(obj)

				for (let [key, value] of Object.entries(obj)) {
					if (typeof value === 'string') {
						value = `'${value}'`
					}
					if (typeof value === 'object') value = obj_to_txt(value, indent + 1)
					if (!is_arr) value = `'${key}': ${value}`

					str += `${ind}\t${value},\n`

					//console.log();
				}
				if (is_arr) str = `[\n${str}${ind}]`
				else str = `{\n${str}${ind}}`
				return str
			}
		},
	},//obj+arrの複合を展開書き出す車輪開発,
	{
		name: '日付文字列を解析、i===あたり不明',
		date: '',
		play: 0,
		uniq: 83,
		func: function() {
			'use strict'
			new Date(
				.../(\d{4})-(\d{1,2})-(\d{1,2})/
					.exec('2018-3-30')
					.slice(1)
					.map((v, i) => v - (i === 1 ? 1 : 0))
			)
			let d = /(\d{4})-(\d{1,2})-(\d{1,2})/
				.exec('2018-3-30')
				.slice(1)
				.map((v, i) => v - (i === 1 ? 1 : 0))
			log(d)
		},
	},//日付文字列を解析、i===あたり不明,
	{
		name: '日付関数こぴぺ',
		date: '',
		play: 0,
		uniq: 84,
		func: function() {
			'use strict'
			//functionにしてるけど、結局走査の時に実行されてる。
			//もし実行させないなら、検索時は場所だけ数字とって、ifで置換する。
			let dateFormat = {
				_fmt: {
					yyyy: function(date) {
						return date.getFullYear() + ''
					},
					MM: function(date) {
						return ('0' + (date.getMonth() + 1)).slice(-2)
					},
					dd: function(date) {
						return ('0' + date.getDate()).slice(-2)
					},
					hh: function(date) {
						return ('0' + date.getHours()).slice(-2)
					},
					mm: function(date) {
						return ('0' + date.getMinutes()).slice(-2)
					},
					ss: function(date) {
						return ('0' + date.getSeconds()).slice(-2)
					}
				},
				_priority: ['yyyy', 'MM', 'dd', 'hh', 'mm', 'ss'],
				format: function(date, format) {
					return this._priority.reduce((res, fmt, i) => {
						log(res, fmt, i)
						return res.replace(fmt, this._fmt[fmt](date))
					}, format)
				}
			}
			log(dateFormat.format(new Date(), 'yyyy/MM/dd hh:mm:ss'))
		},
	},//日付関数こぴぺ,
	{
		name: '2017年？ぐらいに車輪した日付関数',
		date: '',
		play: 0,
		uniq: 85,
		func: function() {
			'use strict'

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
		},
	},//2017年？ぐらいに車輪した日付関数,
	{
		name: 'localhostをimportテスト\\',
		date: '',
		play: 0,
		uniq: [86, 12],
		func: async function() {
			'use strict'
			log(12e4)
			let url = 'https://codepen.io/pwdr/pen/VXxMoy.js'
			//url = 'http://localhost:8888/utils.js'
			let module2 = await import(url)
			log(module2)
			module2.default()
			//module2.bar();
		},
	},//localhostをimportテスト,
	{
		name: '関数群、関数を複数にしてみる',
		date: '',
		play: 0,
		uniq: 82,
		func: function() {
			'use strict'
			const obj = {
				abc数値にカンマ: {
					n: 'abc数値にカンマ',
					f: () => Number(1000000).toLocaleString(),
					r: '1,000,000',
					d: '2019/10/27 13:05:58'
				},
				'es6 分割代入': {
					n: 'es6 分割代入',
					f1_: () => {
						let [a, b] = [10, 11]
						return [b, a].join(',')
					},
					r: '11,10',
					d: '2019/10/27 13:05:58'
				},
				date: {
					n: 'dateオブジェ',
					f1_: () => Date(),
					f2_: () => Date.now(),
					f3_: () => (new Date).toLocaleString(),

					d: '2019/10/27 13:05:58'
				},
				配列なのにtypeofでobject: {
					n: '配列なのにtypeofでobject',
					d: '2019/10/27 13:05:58',
					f1_: () => typeof [],
					f2_: () => Array.isArray([]),
				},
				'文字列の連続、es6': {
					n: '文字列の連続、es6',
					d: '2019/10/27 13:05:58',
					f1_: () => '_##'.repeat(4),
					f1__r: '_##_##_##_##',
					f2_: () => 'a'.repeat(3),
					f2__r: 'aaa',
					f3_: () => 'a'.repeat(0),
					f3__r: '',
					hoge: [() => 'a'.repeat(3), 'a',],
					fns: [
						[() => '12345'.slice(2), '345',],
						[() => '12345'.slice(-2), '45',],
						[() => '12345'.slice(1, -2), '23',],
						[() => '12345'.slice(-3, -1), '34',],
						[() => '12345'.slice(-4, 3), '23',],
					],
				},
			}

			let obj2 = {}
			//log(arr)
			kansuGunObj1(obj)
			//log(obj2)
			import('http://localhost:8888/js/mod.js')
				.then((mod) => {
					console.log(mod)
					// インポートしたモジュールが、module にセットされています

					let str = mod.obj_to_txt(obj2)
					mod.dom_copy('const arr=' + str)
					// module を使った処理を記述します
					str = `${str};`
					log(str)
				})


			//関数群obj1型用の関数
			function kansuGunObj1(obj) {
				for (let [key, val] of Object.entries(obj)) {
					//log(key,val)
					//log(key, typeof val)
					//rがなければ、関数を実行し、作る
					//if (!val.r) val.r = val.f()
					//日付がなければ日付
					if (!val.d) val.d = new Date().toLocaleString()
					//obj2に代入する。
					let p_val = val
					let newobj = {}
					for (let [key, val] of Object.entries(p_val)) {
						if (newobj[key] === undefined)
							newobj[key] = val
						//p_val[key] = val
						if (typeof val === 'function') {
							//log(key, typeof val, val2.n)
							//log(val2)
							//log(val.call(val2))
							//log(val2[key]())
							//アロー関数で作ったので、メソッド関係なくthis固定
							//p_val[key.slice(0, -1) + 'R'] = val()// val.call(val2)  // val2[key]()
							newobj[key + '_r'] = val()// val.call(val2)  // val2[key]()
						}
						if (Array.isArray(val)) {
							let arr = val
							//arr_fn0_res1(arr)
							if (typeof val[0] === 'function')
								val[1] = val[0]()
							if (Array.isArray(val[0])) {
								let p_val = val//[0]
								for (let i = 0; i < p_val.length; i++) {
									let vvv = p_val[i]
									//p_val[i] = [vvv[0], vvv[0]()]
									vvv[1] = vvv[0]()
								}
							}
							function arr_fn0_res1(arr) {
								let newarray = []
								for (let [key, val] of Object.entries(arr)) {
									log(key, val)
									if (typeof val === 'function') {
										//arr[key + 1] = arr[key]()
										arr = 0//[val, 1, val()]
									}
									if (Array.isArray(val)) {
										arr_fn0_res1(val)
									}
								}
							}

						}
					}
					// val2=newobj
					// obj2[val.n] = val
					obj2[val.n] = newobj
				}
			}

			//htmlに表示させてclickコピー
			function dom_copy(str) {
				let d = document.body
				d.style.backgroundColor = '#222'
				d.style.color = '#fff'
				d.style.whiteSpace = 'pre'
				d.style.tabSize = 2
				d.style.MozTabSize = 2 //firefox用
				d.style.fontFamily = 'monospace'
				//d.style.fontSize = "70px";
				d.innerHTML = str
				d.onclick = function(e) {
					let selection = getSelection()
					selection.selectAllChildren(this)
					document.execCommand('copy')
					//selection.removeAllRanges()
					this.onclick = null
				}
			}

			//obj+arrを展開してテキストで返す。
			function obj_to_txt(obj, indent = 0) {
				let str = ''
				let ind = '\t'.repeat(indent)
				let is_arr = Array.isArray(obj)

				for (let [key, value] of Object.entries(obj)) {
					if (typeof value === 'string') {
						value = `'${value}'`
					}
					if (typeof value === 'object') value = obj_to_txt(value, indent + 1)
					if (!is_arr) value = `'${key}': ${value}`

					str += `${ind}\t${value},\n`

					//console.log();
				}
				if (is_arr) str = `[\n${str}${ind}]`
				else str = `{\n${str}${ind}}`
				return str
			}
		},
	},//obj+arrの複合を展開書き出す車輪開発,
	{
		name: 'arr_objの多次元配列でarray.map',
		date: '2019/12/03',
		play: 0,
		uniq: 82,
		func: function() {
			'usestrict'
			let arr_obj = [
				{a: 1, b: 2, },
				{a: 3, b: 4, },
				{a: 5, b: 3, },
			]
			let bMax
			bMax = Math.max(...arr_obj.map(val => val.b))
			log('max=' + bMax)
			bMax = arr_obj.reduce((max, val) => max > val.b ? max : val.b)
			log('max=' + bMax)

			arr_obj.map(val => val.a = val.a + 'z')
			arr_obj.map((val, i, arr) => arr[i].a = val.a + 'z') //上と同じ、
			//一次元arrだとvalがobjにならないから、第三でarrが必要になる。

			log(JSON.stringify(arr_obj, null, '  '))
		},
	},//
	{
		name: 'テンプレートリテラルを自分でParse',
		date: '2019/12/05',
		play: 0,
		uniq: 0,
		func: function() {
			'use strict'
			const res = 'ss${func} // ${result_R}\\$a  a{} ${type_R}aa'.match(/\$\{.+?\}|[^$]+|\$/g)
			console.log(res)
		},
	},//
	{
		name: 'funcにmethod作ってlet変数にアクセスできた？',
		date: '2019/12/07',
		play: 0,
		uniq: 0,
		des: 'クロージャみたいに、一部が生きてる感じ',
		func: function() {
			'use strict'
			function hoge() {
				try {log(a)}
				catch (e) {log(e)}
				hoge.me = function() {log(a++)}
				let a = 1
			}
			log(typeof hoge.me) //undef
			hoge() //cannot a
			log(typeof hoge.me) //func
			hoge.me() //1
			hoge.me() //2
			hoge() //cannot a
			hoge.me() //2
		},
	},//
	{
		name: 'ループ関数にデフォ値',
		date: '2019/12/07',
		play: 0,
		uniq: 0,
		func: function() {
			'use strict'
			!(function hoge(i = 0) {
				log(i)
				if (5 < i) return
				setTimeout(() => hoge(i + 1), 1000)
			})()

		},
	},//
	{
		name: 'スプレッド構文、レストはややこしい',
		date: '2019/12/07',
		play: 1,
		uniq: 0,
		func: function() {
			'use strict'
			hoge(1, 2, 3)
			function hoge(...arg) {
				log(arg) //array(3)
				log(...arg) //1 2 3
				log([...arg]) //array(3)
			}
			hoge2(10)
			function hoge2(...arg) {
				log(arg) //array(3)
				log(...arg) //1 2 3
				log([...arg]) //array(3)
			}
		},
	},//
	{
		name: '関数内での初期化',
		date: '2019/12/08',
		play: 0,
		uniq: 0,
		func: function() {
			'use strict'
			hoge()
			function hoge() {
				let v
				function f() {log('f', v); v = 10}
				if (!v) f()
				f()
				log(v)
			}
		},
	},//
]
// {
// 	name: 'temp',
// 	date: '',
// 	play: 0,
// 	uniq: 82,
// 	func: function() {
// 	},
// },//temp

/**関数群を実行 */
function arrPlay(arr) { //関数の実行、Tが無ければ、最後の関数を実行
	for (let i = 0, l = arr.length; i < l; i++) {
		let val = arr[i]
		if (val.play || i == l - 1) {
			log(`[${i}]:${val.name} $$$$$$$$$$$$$$$$$$$$$$$$$$$$`)
			val.func()
			break
		}
	}
}
/** 関数群の整備用関数 */
!(function arr_seibi(arr) {
	for (let i = 0, l = arr.length; i < l; i++) {
		let v = arr[i]
		//objの並び替えと初期値
		arr[i] = {
			name: v.name,
			date: v.date || '',
			play: v.play,
			uniq: v.uniq,
			func: v.func
		}
	}
})//(arr)

//Object書き出し
// import * as lib from './mod.js'
// let str = lib.obj_to_txt(arr)
// lib.dom_copy('const arr=' + str)



arrPlay(arr)
log(` ${Date.now() - time}ms エラー無し##########################`)

/*




kkk(0, "temp", function() {
	"use strict";
	log("テンプレああああ");
});
kkk(0, "temp", function() {
	"use strict";
	log("テンプレああああ");
});
kkk(0, "temp", function() {
	"use strict";
});
*/

/**
デフォルト
   [p]
[b][n][f]
//
ctrl+h バックスペース
ctrl+d でるキー
ctrl+ 文字単位
alt+ ワード単位
//
cmd+u 選択を戻る、cursorを戻る、入力が戻る時も
shift+tab 選択範囲整形
ct+F 検索、/^\n/ みたくスラッシュでregexp
ctrl+sh+F 置換win



*/ //codepen keybind
/*
2019/10/29 モジュールでm.func=function(){}的なやつを作っていたが。
classにしてstatic付ければ良い気がした。

classはコンマが要らない。

2019/10/28 だいぶコードが煩雑化してきて、限界ぽい。整理がひつよう。

2019/10/28 モジュールをcodepenで作ろうかと思ったけど、export文でエラーで止まるのが難点すぎる。
あとブラウザcacheされるらしく、URL表示しないとcacheが使い続けるぽい。

2019/10/28 関数の静的importはトップレベルじゃなきゃ無理、つまり関数内むり。
クロスドメインも当然無理、Access-Control-Allow-Originがなんたらでエラー。
ただ同期なので簡単。codepenのソースはローカルホストで読めれた。不思議。
ローカルホストがガバガバだったんだろう、Googleじゃ無理だった。双方で許可が必要になるはず。

import * as my_mod from 'https://codepen.io/pwdr/pen/VXxMoy.js';
↑これが基本、urlは変数は使えない。* as modを｛name,name2｝にできるが、不要そう。
defにも出来る。一番シンプル。
--
awaitすると関数内は止まるけど上の関数は進んでる、謎


2019/10/25 typefo arrayはobjectを返す
alert(Array.isArray(obj));
alert(obj instanceof Array); //インスタンスのほうが理論的だが、別のwindow.では異なる判定をする。

2019/10/25 codepenやウェブコンソールで、Objectをlogすると、
toString()とは別の便利機能で表示される。
"/"+func ←は恐らくtoStringと等しい。

2019/10/18 #js 関数呼ぶ時、xxx.f() ならthis=xxx、それ以外はund

2019/10/12 #codepen エラー文が出ないからエラーチェックがムズすぎる。

macとwinでキーバインドが違うのが、がっつり困る。

2019/10/11 #codepen で過去の勉強関数群を移植中。
フォーマットが同じことはやはり超重要、そしてフォーマットは常に1つに集約すべき、
置換でほぼ正確に移植出来るから。
ただサクラエディタは行マタギの検索に対応してないらしい。
sedかreplaceが履歴として使えるエディタが欲しい、作るか？

関数群にやはりnameは必要、何実行してるか分かりづらい。

codepenはオートセーブしてるようでしてない、最後はセーブボタン必須

2019/10/07 codepen.ioでフォーマットは右上のtidy js
エラーが有ると途中で止まるがエラーメッセージなし。typeofでも。
フォントはChromeの設定でコンソーラスが良い。
urlに.jsでファイルURL、しかしtamperが反応しない。設定インポートからできた。

for of だとlengthが使えない、最後だけ例外とか作るのが面倒。
Object.key(arr)で回せば可能かな？。

2019/10/08 昨日書いたcodepenが1時間分ぐらい消えた。コメントも消えたのが痛い。

codepenのkeybind
普通、vim, sublimとある。一つ折りたたみはctrl+shift+[で、全体ができず困る。
subでc-k c-j は出来るが、c-k c-0 が動かない。
右のタブにfoldallボタンが隠れてた。
https://blog.codepen.io/documentation/editor/key-bindings/

for (let i = 0,l=arr.length; i < l; i++) {}
*/
