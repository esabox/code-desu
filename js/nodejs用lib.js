// 関数を定義
/**日付関数 yyyy-MM-dd hh:mm:ss	 */
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

// 関数を公開
module.exports = mydate