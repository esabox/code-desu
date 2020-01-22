'use strict'


const performance = (typeof exports === 'object') //nodejs or ブラウザ判定
	? require('perf_hooks').performance
	: window.performance
const log = console['log']
//一重ループで作ったが、最初だけとてつもなく遅くなる。
//二重ループにして平均取る、二重目が100未満だと誤差が激しすぎる。

class Bench {
	// @param {{sort: string, format: string} } opt オブジェクト(プロパティ mem1・プロパティ mem2)

	/**
	 * consoleでbenchmarkしちゃうもな
	 * @param {Number=10} loop1 平均用ループ
	 * @param {Number} loop2 メインループ
	 * @param {Object} opt オプション
	 * @param {?String} opt.sort 並び替え
	 * @param {?String} opt.format 出力ようのフォーマット
	 * @return {Bench} ベンチーマークインスタンス
	 */
	constructor(loop1 = 10, loop2 = 1000, opt = {}) {
		this.sssort = opt.sort || false
		this.format = opt.format ||
			'[*idR*] *funcL* // *resultR* *typeL* *graf* *timeStrR*ms'
		this.loop1 = loop1 || 10
		this.loop2 = loop2 || 1000
		this.head = 'b.add('
		this.obj_arr = []
		// this.obj_arr = [{func: () => undefined, time: 0, }]
		// this.performance = (typeof exports === 'object')
		// 	? require('perf_hooks').performance
		// 	: window.performance
	}

	/**
	 * 
	 * @param {Function} func 
	 * @param {Number} loop 
	 */
	do_func_loop_and_returnTime(func, loop) {
		let time = performance.now() //時間測定this.this.
		for (let i = 0; i < loop; i++) func()
		time = performance.now() - time
		return time
	}
	add(func) {
		const len = this.obj_arr.length
		this.obj_arr.push({func: func, time: 0, id: len})
	}
	play() {

		//結果だけとりあえず回収
		for (let val of this.obj_arr) {
			val.result = val.func()
			val.type = typeof val.result
		}

		//ループ一次元
		for (let j = 0; j < this.loop1; j++) {
			for (let [key, val] of this.obj_arr.entries()) { //Object.entries(this.obj_arr)
				val.time += this.do_func_loop_and_returnTime(val.func, this.loop2)
			}
		}
		// this.obj_arr =this.obj_arr.shift() 
		return this.obj_arr
	}

	//左右は選択じゃなく同時に作っちゃえばいいんだもな
	_padding2(arrObj, key) {
		//配列としてコピーを作る
		let arr = arrObj.map(o => o[key])

		//全角を二文字としてカウントする関数を汚染
		String.prototype.zen2_lenght = function() {
			return this.replace(/[^\x01-\x7E]/g, '**').length
		}
		//最長の文字数
		const maxlen = ((arr) => {
			const len_arr = arr.map(
				val => ('' + val).zen2_lenght()
			)
			return Math.max(...len_arr)
		})(arr)

		// //空白を足すタイプに書き換え、全角2文字扱いならsliceは複雑になる。
		// function padd(val, maxlen, opt = {align: 'left'}) {
		// 	let str = '' + val
		// 	const len = str.zen2_lenght()
		// 	const space = ' '.repeat(maxlen - len)
		// 	if (opt.align === 'left') str = str + space
		// 	if (opt.align === 'right') str = space + str
		// 	return str
		// }
		// arr = arr.map(val => padd(val, maxlen, {align: align}))

		//空白を足すタイプに書き換え、全角2文字扱いならsliceは複雑になる。
		function padd(val, maxlen) {
			const str = '' + val
			const len = str.zen2_lenght()
			const space = ' '.repeat(maxlen - len)
			const strL = str + space
			const strR = space + str
			return {strL, strR}
		}
		const arr_objLR = arr.map(val => padd(val, maxlen))
		//戻す
		arrObj.forEach((obj, i) => {
			obj[key + 'L'] = arr_objLR[i].strL
			obj[key + 'R'] = arr_objLR[i].strR
		})
	}

	print_result() {
		//非同期で呼び出すことで安定化目指したが、効果は不明。
		// setTimeout(function() {this.print_result2()}, 100) //this==Timeout{}で関数が見つからない
		// setTimeout(() => this.print_result2(), 100) //OK
		// setTimeout(this.print_result2,100) //呼び出せるが、先でthisがTimeout{}
		// setTimeout(this.print_result2.bind(this), 100) //OK
		this.print_result2()
		// (async () => { //先にスリープすると安定しそう？
		// 	// await new Promise(r => setTimeout(r, 100))
		// 	await this.print_result2()
		// })()
		// log(222)
	}
	print_result2() {
		let objArr = this.play()

		//ヘッダー
		let str = '\n'
		const [l1, l2] = [this.loop1, this.loop2] //分割代入で見やすく。
		str += `// ${l1.toLocaleString()}*(${l2}*fn)`
		str += `= ${(l1 * l2).toLocaleString()}*fn \n`

		//最大値
		const max = Math.max(...objArr.map(o => o.time))

		//グラフを作る
		objArr.forEach(obj =>
			obj.graf = this.create_graf(obj.time, max)
		)

		//時間を小数点揃えて文字列化
		objArr.map(o => o.timeStr = o.time.toFixed(1))

		//パディング
		this._padding2(objArr, 'timeStr')
		this._padding2(objArr, 'id')
		this._padding2(objArr, 'result')
		this._padding2(objArr, 'type')
		this._padding2(objArr, 'func')


		//並び替え
		if (this.sssort === 'ascend')
			objArr.sort((a, b) => a.time - b.time)
		if (this.sssort === 'descend')
			objArr.sort((b, a) => a.time - b.time)

		//log(JSON.stringify(objArr, undefined, '  '))

		//気づいた、パティングを作るのは左右同時なら同じ1コストで作れる。
		//objをフォーマットで文字列化、replaceで。
		//予めフォーマットを配列化しておいて、それに変数投げ入れる方式もある。

		function fmt_obj_conv(obj, fmt) {
			return fmt.replace(/\*.*?\*|[^*]+/g, aaa) + '\n'
			// return fmt.replace(/\$\{.+?\}|[^$]+|\$/g, aaa)+'\n' //最初はテンプレートリテラル
			function aaa(str) {
				const res = str.match(/^\*(.*)\*/)
				if (!res) return str
				if (str === '**') return '*'

				const key = res[1]
				return obj[key]
			}
		}
		str += '\n'
		//表を作る
		objArr.forEach(obj =>
			str += fmt_obj_conv(obj, this.format)
		)

		log(str)
	}

	create_graf(val, max) {
		let len = 10, s = '#.'
		let count = Math.round(val / max * len)
		let str = s[0].repeat(count) + s[1].repeat(len - count)
		return str
	}
}
let kasu = new Bench(1, 100)

let b
b = new Bench(1000, 100)
let r,
	str = 'aa.bb.cc'
//b.add(() => null);
b.add(() => str.replace(/\./g, '-'))
b.add(() => str.replace(/\./g, '-'))
b.add(() => str.replace(new RegExp('\\.', 'g'), '-'))
b.add(() => str.split('.').join('-'))
b.add(() => str.replace(/\./g, '-'))
b.add(() => str.replace('.', '-'))

// b.print_result()

b = new Bench(1, 100000, {
	// sort: 'descend',
	// format: '// *timeStrL*ms *graf* *resultR* \n*funcL*\n'
})
// b.add(() => !!1)
// b.add(() => !1)
// b.add(() => false)
// b.add(() => Boolean(0))
// b.add(() => {a: 100})
// b.add(() => [11, 22])
// b.add(() => 100)
// b.add(() => '日本語')
// b.add(() => '123')
// b.add(() => undefined)
// b.add(() => `${undefined}`)
// b.add(() => String(undefined))
// b.add(() => new String(111))
// b.add(() => String(111))
// b.add(() => ('' + undefined))
// b.add(() => (undefined + ''))
b.add(() => (undefined + ''))
b.add(() => (undefined + ''))
b.add(() => [1, '', , 4].map(v => v + 1))
b.add(() => [1, '', , 4].forEach(v => v + 1))
b.add(() => Array(1, 2).map((v) => 1))
b.add(() => {Array(100).fill(1).map(v => v * 2)})
b.add(() => {Array(100).fill(1).forEach(v => v * 2)})
// b.add(() => {for (let i = 0, arr = Array(100).fill(1); i < arr.length; i++) {arr[i] * 2} })
// b.add(() => {for (let i = 0, arr = Array(100).fill(1), l = arr.length; i < l; i++) {arr[i] * 2} })

b.print_result()
log(111)

function settimeo() {
	// let i = 0
	const p = new Promise((resolve, reject) => {
		//conDoW('js_xhr')
		let time = performance.now() //時間測定this.this.	
		!function aaaa(i = 0) {
			// log(i)
			if (i == 100) {
				time = performance.now() - time
				log(i, time.toFixed(1))
				resolve()
				return
			}
			setTimeout(aaaa, 0, i + 1)
		}()
	})
	return p
}
function setin() {
	let time = performance.now() //時間測定this.this.	
	let i = 0
	let timer = setInterval(() => {
		++i
		if (i == 1000) {
			time = performance.now() - time
			log(i, time.toFixed(1))
			clearInterval(timer)
			return
		}
	})
}
async function hogea() {
	await settimeo()
	log(2222)
}
// log(111)
// setin()
