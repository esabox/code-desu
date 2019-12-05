'use strict'


const performance = (typeof exports === 'object')
	? require('perf_hooks').performance
	: window.performance
const log = console['log']
//一重ループで作ったが、最初だけとてつもなく遅くなる。
//二重ループにして平均取る、二重目が100未満だと誤差が激しすぎる。
/**
 * consoleでbenchmarkしちゃうもな
 */
class Bench {

	/**
	 * 
	 */
	constructor(loop1 = 10, loop2 = 1000, opt = {}) {
		this.sssort = opt.sort||false
		this.column = opt.column || [
			'func_L',
			'//',
			'result_R',
			'type_R',
		]
		this.loop1 = loop1||10
		this.loop2 = loop2||1000
		this.head = 'b.add('
		this.obj_arr = [{func: () => undefined, time: 0, }]
		// this.performance = (typeof exports === 'object')
		// 	? require('perf_hooks').performance
		// 	: window.performance
	}

	/**
	 * 
	 * @param {*} func 
	 * @param {*} loop 
	 */
	do_func_loop_and_returnTime(func, loop) {
		let time = performance.now() //時間測定this.this.
		for (let i = 0; i < loop; i++) func()
		time = performance.now() - time
		return time
	}
	add(func) {
		const len=this.obj_arr.length
		this.obj_arr.push({func: func, time: 0,id:len})
	}
	play() {

		//結果だけとりあえず回収
		for (let val of this.obj_arr) {
			val.result = val.func()
			val.type = typeof val.result
		}

		//ループ一次元
		for (let j = 0; j < this.loop1; j++) {
			for (let [key, val] of Object.entries(this.obj_arr)) {
				val.time += this.do_func_loop_and_returnTime(val.func, this.loop2)
			}
		}
		// this.obj_arr =this.obj_arr.shift() 
		return  this.obj_arr
	}

	_padding2(arrObj, key, newKey = key, align = 'right') {
		//配列としてコピーを作る
		let arr = arrObj.map(o => o[key])
		// arr = this._padding(arr)
		// let maxlen = this._maxleng(arr)
		String.prototype.zen2_lenght = function() {
			return this.replace(/[^\x01-\x7E]/g, '**').length
		}
		const maxlen = (() => {
			const len_arr = arr.map(val => ('' + val).zen2_lenght())
			return Math.max(...len_arr)
		})()
		//パディングで空白足して切り取ってたが、必要な空白を足したほうが良さそう。
		function sliceZenkaku(str, arg) {
			const zenkakuCount = (str.match(/[^\x01-\x7E]/g) || []).length
			const len = str.length
			// log(str, zenkakuCount)
			arg.length === 1
				? arg[0] += zenkakuCount
				: arg[1] -= zenkakuCount
			return str.slice(...arg)
		}
		//空白を足すタイプに書き換え、全角2文字扱いならsliceは複雑になる。
		function padd(val, maxlen, opt = {align: 'left'}) {
			let str = '' + val
			const len = str.zen2_lenght()
			const space = ' '.repeat(maxlen - len)
			if (opt.align === 'left') str = str + space
			if (opt.align === 'right') str = space + str
			return str
		}
		arr = arr.map(val => padd(val, maxlen, {align: align}))
		//戻す
		arrObj.map((o, i) => o[newKey] = arr[i])
	}

	print_result() {
		// setTimeout(function() {this.print_result2()}, 100) //this==Timeout{}で関数が見つからない
		// setTimeout(() => this.print_result2(), 100) //OK
		// setTimeout(this.print_result2,100) //呼び出せるが、先でthisがTimeout{}
		// setTimeout(this.print_result2.bind(this), 100) //OK
		this.print_result2()
	}
	print_result2() {
		log(this)
		let objArr = this.play()

		//ヘッダー
		let str = '\n'
		const [l1, l2] = [this.loop1, this.loop2] //分割代入で見やすく。
		str += `// ${l1.toLocaleString()}*(${l2}*fn)`
		str += `= ${(l1 * l2).toLocaleString()}*fn \n`

		//一回配列にコピー
		// const time_arr = objArr.map(o => o.time)
		//最大値
		const max = Math.max(...objArr.map(o => o.time))//time_arr)// 
		//グラフを作る
		objArr.forEach(obj =>
			obj.graf = this.create_graf(obj.time, max)
		)
		// for (let [key, val] of objArr.entries()) {
		// 	val.graf = this.create_graf(val.time, max)
		// }

		// objArr = objArr.map(o => o.time.toFixed(1))
		// time_arr = objArr.map(o => o.time.toFixed(1))
		//time_arr = time_arr.map(t => t.toFixed(1))

		//時間を小数点揃えて文字列化
		objArr.map(o => o.time_str = o.time.toFixed(1))
		// let maxlen = max.toFixed(1).length
		// let time_strArray = objArr.map(o => o.time_str)
		// time_strArray = this._padding(time_strArray)
		// objArr.map((o, i) => o.timeStr = time_strArray[i])

		// let result_arr = objArr.map(o => o.result)
		// result_arr = this._padding(result_arr)
		// objArr.map((o, i) => o.result_pad = result_arr[i])

		// let tmp_arr = this._padding(objArr.map(val => val.type))
		// objArr.map((o, i) => o.type = tmp_arr[i])

		this._padding2(objArr, 'time_str')
		this._padding2(objArr, 'result', 'result_pad')
		this._padding2(objArr, 'type')
		this._padding2(objArr, 'func', undefined, 'left')



		// log(1, JSON.stringify(objArr.entries(), null, '  '))
		// log(JSON.stringify(objArr, null, '  '))


		// for (let i = 0, l = this.funcs.length; i < l; i++) {
		// 	let timeStr = time_arr[i]
		// 	let graf = this.mgraf(time_arr[i], max)
		// 	str += `/*${graf} ${timeStr}ms */ ${this.head}${this.funcs[i]})\n`
		// }
		// for (let [key, val] of Object.entries(objArr)) {
		// 	str += `/*${val.graf} ${val.timeStr}ms */ ${this.head}${val.func})\n`
		// }

		//並び替え
		if (this.sssort)
			objArr.sort((a, b) => a.time - b.time)

		//表を作る
		objArr.forEach(o =>
			str += `${o.func} // ${o.result_pad} ${o.type} ${o.graf} ${o.time_str}ms |\n`
			// str += `/* ${o.graf} ${o.timeStr}ms ${o.result_pad} ${o.type} */ ${this.head}${o.func})  \n`
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

b = new Bench(10, 100000,{sort:false})
b.add(() => 1)
b.add(() => !1)
b.add(() => false)
b.add(() => Boolean(0))
b.add(() => {a: 100})
b.add(() => [11, 22])
b.add(() => 100)
b.add(() => '日本語')
// b.add(() => '123')
// b.add(() => undefined)
// b.add(() => `${undefined}`)
// b.add(() => String(undefined))
// b.add(() => new String(111))
// b.add(() => String(111))
// b.add(() => ('' + undefined))
// b.add(() => (undefined + ''))
// b.play()
b.print_result()
//log(str.replace(RegExp("\\.", "g"), "-"));
