'use strict'


const performance = (typeof exports === 'object')
	? require('perf_hooks').performance
	: window.performance
const log = console['log']
//一重ループで作ったが、最初だけとてつもなく遅くなる。
//二重ループにして平均取る、二重目が100未満だと誤差が激しすぎる。
class Bench {

	constructor(loop1, loop2 = 100) {
		this.loop2 = loop2
		this.lll1 = loop1
		this.head = 'b.add('
		this.times = []
		this.performance = (typeof exports === 'object')
			? require('perf_hooks').performance
			: window.performance

	}

	lp(func) {
		let time = performance.now() //時間測定this.this.
		for (let i = 0, l = this.loop2; i < l; i++) func()
		time = performance.now() - time

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
		for (let j = 0; j < this.lll1; j++) {
			let i = 0
			for (let [key, val] of Object.entries(this.funcs)) {
				this.times[key] += this.lp(val)
				i++
			}
			//this.prt()
		}
	}
	print_result() {
		//ヘッダー
		let str = '\n'
		let [l1, l2] = [this.lll1, this.loop2] //分割代入で見やすく。
		str += `//${l1.toLocaleString()}*(${l2}*code)`
		str += `= ${(l1 * l2).toLocaleString()} \n`

		this.times = this.times.map(t => t.toFixed(1))
		let max = Math.max(...this.times) //型がNumに戻る
		let maxlen = String(max.toFixed(1)).length
		this.times = this.times.map(t => ('   ' + t).slice(-maxlen))
		log(max, maxlen)

		for (let i = 0, l = this.funcs.length; i < l; i++) {
			let timeStr = this.times[i]
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

let b = new Bench(1000, 100)
let r,
	str = 'aaa.bbb.ccc'
//b.add(() => null);
b.add(() => str.replace(/\./g, 'o'))
b.add(() => str.replace(/\./g, 'o'))
b.add(() => str.replace(new RegExp('\\.', 'g'), 'o'))
b.add(() => str.split('.').join('o'))
b.add(() => null)
b.add(() => 0)
b.add(() => undefined)
b.add(() => str.replace(/\./g, 'o'))
b.add(() => str.replace('.', 'o'))

b.play()
b.print_result()
//log(str.replace(RegExp("\\.", "g"), "-"));
console.log(123)