#!/usr/bin/env node
//自分用記録memo.txt、メモフォーマットを整形するスクリプト
//読み込んでparseしたり、csvに書き出したり。
//ex
//$./ shebangNode.js workfメモ全書き出し.txt debug
// const log=console.log
function parse連続改行分け(text) {
	const arr = text.trim().split(/\n\n+/)
	return arr
}
function parse先頭文字列で分け(text, separator) {
	let reStr = separator + '(?=\\d{4})'
	// reStr.replace('\\','\\\\') //バッすらエスケープ
	let re = new RegExp(reStr)
	console.log(reStr, re)
	// const arr = text.trim().split(/,,,(?=\d{4})/)
	const arr = text.trim().split(re)
	arr.shift()
	return arr
}
function parseインデント(text) {
	const arr = text.trim().split(/\n(?=\S)/)  //改行（直後に文字）で配列化
	return arr.map(v => v.replace(/\n\t/g, '\n'))  //先頭タブを全消し
}

function conv日付なければ上の日付(arr) {
	arr.forEach((val, i) => {
		const result = val.match(/^[\d/]{10} (#\S+ )*/)
		if (result) {
			lastDate = result[0]
		}
		if (!result) {
			console.log(lastDate, val, '\n')
			arr[i] = lastDate + val
		}
	})
}
function convインデント分け(arr) {
	arr.forEach((val, i) => arr[i] = val.replace(/\n/g, '\n\t'))
}
function conv二重改行にする(arr) {
	arr.forEach((val, i) => arr[i] = val + '\n')
}
function convタグを付ける(arr) {
	arr.forEach((val, i) => {
		arr[i] = val.replace(/^[\d/]{10} (#\S+ )*/, function(s) {
			if (!s.match(/#js /)) s = s + '#js '
			console.log(s)
			return s
		})
	})
}

function convGoogleスプレッドシート用csv(arr) {
	let hoge = []
	arr.forEach((val, i) => {
		// let date = val.split(/^[\d/]{10}/)
		//let [, date, tag, content] = val.match(/^([\d/]{10}) ((?:#\S+ )*)([\S\s]+)/)

		//時間 #タグ? 本文 の形式を変数に分ける
		let {date, tag , content} = val
		
		tag = tag.replace(/#/g, '') //タグシャープ消す
		date = date.replace(/\/00/g, '/01') // /00/00のありえない時間は01/01に

		//googleインポート用にエスケープ、CSVのメタがだぶくぉ
		content = content.replace(/"/g, '""')//.replace(/\t/g, '\\t')
		hoge[i] = `"${date}","${tag}","${content}"`

		debug && console.log([date, tag, content])
	})
	return hoge.join('\n')
}
//339+3280 = 3619
let debug = false
async function main() {
	const fs = require('fs').promises//require('fs')

	console.log('process.argv', process.argv)
	const args = process.argv.slice(2)
	// console.log('args', args)

	const filePath = args[0]
	const output_path = filePath + '.out.txt'
	if (args[1]) debug = true
	console.log(`filePath=${filePath}`)
	let buff = ''
	//文字列として読み込み
	let text = await fs.readFile(filePath, 'utf-8')
	// console.log(text)
	console.log(text.length)
	// text = text.replace(/^\s+(?=\n)/mg, () => console.log('hit') || '')
	let arr = []
	//全行trim
	if (1) {
		let arr = text.trim().split(/\n/)
		arr = arr.map(v => v.trimEnd())
		text = arr.join('\n')
	}

	//2連続改行で分け
	arr = text.trim().split(/\n\n+/)
	// console.log(arr)

	//日付無い要素に前のを付ける
	if (!1) {
		let date
		arr.forEach((v, i) => {
			let d = v.match(/^\d\d\d\d\/\d\d\/\d\d/)
			if (d) {
				// console.log(d)
				date = d[0]
			} else {
				arr[i] = date + '\n' + arr[i]
			}
		})
	}

	//日付の次の行にタグ行をつける
	if (1) {
		arr = arr.map(v => v.replace(/\n/, '\n__tag__ ahk\n'))
	}

	//日付、タグ、本文、に分ける
	let ArrObj
	if (1) {
		ArrObj = arr.map(v => {
			let vdate, vtag, vcontent
			//replaceでやってみた。
			// v
			// 	.replace(/.+?\n/, (all) => {vdate = all.trim(); return ''})
			// 	.replace(/.+?\n/, (all) => {
			// 		all = all.trim().split(' ')
			// 		all.shift()
			// 		vtag = all.join(' ');
			// 		return ''
			// 	})
			// 	.replace(/.*/s, (all) => {vcontent = all; return ''})
			let ar = v.split('\n')
			vdate = ar[0]
			// vtag = ar[1].slice(ar[1].indexOf(" ")+1)
			vtag = ar[1].split(' ').slice(1).join(' ')
			vcontent = ar.slice(2).join('\n')
			return {date: vdate, tag: vtag, content: vcontent}
		})
	}
	//JSONで保存
	if (1) {
		let buff=JSON.stringify(ArrObj, 2, '  ')
		fs.writeFile(filePath + '.json', buff)//
	}
	if (1) {
		//スプレッドシート用csvを書き出す
		const buff = convGoogleスプレッドシート用csv(ArrObj)
		fs.writeFile(filePath + '.google.csv', buff)//
	}

	//書き出す
	buff = arr.join('\n\n')
	// console.log(buff)
	await fs.writeFile(filePath + '.out.txt', buff)// 
	// console.log( buff,'#'.repeat(20))
}
main()

// console.log('ファイル読み込みを待たずに後続処理が走ります。')
// console.log('ファイル読み込みを待たずに後続処理が走ります。')