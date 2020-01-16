#!/usr/bin/env node
console.log(process.argv)
const args = process.argv.slice(2)

console.log(args)
const filePath = args[0] || 'memo.txt'
const fs = require('fs').promises//require('fs')

function 改行分けtextをParse(text) {
  const arr = text.trim().split(/\n\n+/)
  return arr
}
function textをインデントParse(text) {
  const arr = text.trim().split(/\n(?=\S)/)
  return arr.map(v => v.replace(/\n\t/g, '\n'))
}

function 日付なければ上の日付(arr) {
  arr.forEach((val, i) => {
    const result = val.match(/^[\d/]{10}( #\S+ )*/)
    if (result)
      lastDate = result[0]
    if (!result) {
      console.log(lastDate, val, '\n')
      arr[i] = lastDate + val
    }
  })
  return arr
}
function インデント分け(arr) {
  arr.forEach((val, i) => arr[i] = val.replace(/\n/g, '\n\t'))
}
function 二重改行にする(arr) {
  arr.forEach((val, i) => arr[i] = val + '\n')
}
function convGoogleスプレッドシート用csv(arr) {
  arr.forEach((val, i) => {
    // let date = val.split(/^[\d/]{10}/)
    let [, date, tag, content] = val.match(/^([\d/]{10}) ((?:#\S+ )*)([\S\s]+)/)
    // content = content.replace(/\n/g, '\\n').replace(/\t/g, '\\t')
    content = content.replace(/"/g, '""')//.replace(/\t/g, '\\t')

    arr[i] = `${date},${tag},"${content}"`

  })
}
async function main() {
  const text = await fs.readFile(filePath, 'utf-8')
  let lastDate
  let arr
  if (0) arr = 改行分けtextをParse(text)
  if (1) arr = textをインデントParse(text)

  arr = 日付なければ上の日付(arr) //参照渡しだから、式にする必要無いけど、
  convGoogleスプレッドシート用csv(arr)
  if (0) インデント分け(arr)
  if (0) 二重改行にする(arr)

  let buff
  buff = arr.join('\n')
  await fs.writeFile(filePath + '.out.txt', buff)//

  console.log(arr.length, '#'.repeat(20))
}

main()

// console.log('ファイル読み込みを待たずに後続処理が走ります。')
// console.log('ファイル読み込みを待たずに後続処理が走ります。')