/* 
2020/07/27
テキストエディタの文字を置換したくて作った。
ただ保存されてしまう、保存がトリガーなアプリで使いたい。
クリップボードはどうだろうか。
vscodeの拡張でできそうだけどコードジェネレーターのインストールが面倒そうで躊躇。
 */
var fs = require('fs')
var someFile = 'someFile'
fs.readFile(someFile, 'utf8', function(err, data) {
  if (err) {
    return console.log(err)
  }
  var result = data.replace(/string to be replaced/g, 'replacement')

  fs.writeFile(someFile, result, 'utf8', function(err) {
    if (err) return console.log(err)
  })
})