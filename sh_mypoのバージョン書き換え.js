#!/usr/bin/env node
//自分用記録memo.txt、メモフォーマットを整形するスクリプト

function parse連続改行分け(text) {
  const arr = text.trim().split(/\n\n+/)
  return arr
}
function parseインデント(text) {
  const arr = text.trim().split(/\n(?=\S)/)
  return arr.map(v => v.replace(/\n\t/g, '\n'))
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
    let date, tag, content
    val
      .replace(/^[\d/]{10} /, s => {date = s; return ''})
      .replace(/^(#\S+ )*/, s => {tag = s; return ''})
      .replace(/^[\S\s]+/, s => {content = s; return ''})
    //console.log('xxx', v1, v2, v3)

    // content = content.replace(/\n/g, '\\n').replace(/\t/g, '\\t')
    content = content.replace(/"/g, '""')//.replace(/\t/g, '\\t')

    arr[i] = `"${date}","${tag}","${content}"`
  })
  return arr
}

async function main() {
  const fs = require('fs').promises//require('fs')

  console.log(process.argv)
  const args = process.argv.slice(2)
  const f = require('./js/mod')
  f()  // Hello!
  let d = new Date()
  console.log(d)

  console.log(args)
  const filePath = args[0] || 'memo.txt'

  const text = await fs.readFile(filePath, 'utf-8')
  let lastDate

}

main()

// console.log('ファイル読み込みを待たずに後続処理が走ります。')
// console.log('ファイル読み込みを待たずに後続処理が走ります。')