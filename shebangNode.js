#!/usr/bin/env node
//自分用記録memo.txt、メモフォーマットを整形するスクリプト
//読み込んでparseしたり、csvに書き出したり。
//ex
//$./ shebangNode.js workfメモ全書き出し.txt debug

function parse連続改行分け(text) {
	const arr = text.trim().split(/\n\n+/)
	return arr
}
function parse先頭文字列で分け(text, separator) {
	let reStr=separator + '(?=\\d{4})'
	// reStr.replace('\\','\\\\') //バッすらエスケープ
	let re = new RegExp(reStr)
	console.log(reStr,re)
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
	arr.forEach((val, i) => {
		// let date = val.split(/^[\d/]{10}/)
		//let [, date, tag, content] = val.match(/^([\d/]{10}) ((?:#\S+ )*)([\S\s]+)/)

		//時間 #タグ? 本文 の形式を変数に分ける
		let date, tag = '', content = ''
		val
			.replace(/^[\d/]{10} ?/, all => {date = all.trim(); return ''})
			.replace(/^(#\S+ ?)*/, s => {tag = s.trim(); return ''})
			// .replace(/^\n/, '')
			.replace(/^[\S\s]+/, s => {content = s.trim(); return ''})
		// console.log('---', date, 'tag@' + tag, 'con@' + content)

		// content = content.replace(/\n/g, '\\n').replace(/\t/g, '\\t')

		tag = tag.replace(/#/g, '') //タグシャープ消す
		date = date.replace(/\/00/g, '/01') // /00/00のありえない時間は01/01に

		//googleインポート用にエスケープ、CSVのメタがだぶくぉ
		content = content.replace(/"/g, '""')//.replace(/\t/g, '\\t')
		arr[i] = `"${date}","${tag}","${content}"`

		debug && console.log([date, tag, content])
	})
	return arr
}
//339+3280 = 3619
let debug = false
async function main() {
	const fs = require('fs').promises//require('fs')

	console.log('process.argv', process.argv)
	const args = process.argv.slice(2)
	// console.log('args', args)

	const filePath = args[0] || 'memo.txt'
	const output_path = filePath + '.out.txt'
	if (args[1]) debug = true
	console.log(`filePath=${filePath}`)

	//文字列として読み込み
	const text = await fs.readFile(filePath, 'utf-8')
	let lastDate

	//Parseして配列に
	let arr
	if (0) arr = parse連続改行分け(text)
	if (0) arr = parseインデント(text)
	if (1) arr = parse先頭文字列で分け(text,',,,')
	if (debug) arr = arr.slice(0, 4) //デバッグ用に配列を小さくする
	// console.log(arr[0], arr[1])
	//  console.log(arr)

	//変換
	// if (!0) conv日付なければ上の日付(arr) //参照渡しだから、式にする必要無いけど、
	// if (0) convタグを付ける(arr) //参照渡しだから、式にする必要無いけど、
	if (1) {
		//スプレッドシート用csvを書き出す
		const newArr = convGoogleスプレッドシート用csv(arr.slice())
		const buff = newArr.join('\n')
		fs.writeFile(filePath + '.google.csv', buff)//
	}
	if (!0) convインデント分け(arr)
	if (0) conv二重改行にする(arr)

	//書き出す
	let buff
	buff = arr.join('\n')
	await fs.writeFile(filePath + '.out.txt', buff)// 

	console.log(arr.length, '#'.repeat(20))
}
main()

// console.log('ファイル読み込みを待たずに後続処理が走ります。')
// console.log('ファイル読み込みを待たずに後続処理が走ります。')