//obj+arrを展開してテキストで返す。

/**
 * obj,arrを展開して文字列で返す
 * 文字列中の\が消える問題、修正完了2019/11/25
 * 正規表現に対応してない、考え中。
 * カッコ内が短い時に、改行しない機能もつけたが、文字数からインデントを計算してないガバ実装
 * @param {*} obj 
 * @param {*} indent 
 */
export function obj_to_txt(obj, indent = 0) {
    let str = ''
    let sp = '\t'
    let ind = sp.repeat(indent)
    let is_arr = Array.isArray(obj)
    let indent_len = 0 //インデントに使われた文字数

    //最初に、オブジェ含んでないを判定して、改行無しやるほうがええ？

    //{ 中身 } の中身を書き出す
    for (let [key, value] of Object.entries(obj)) {
        if (typeof value === 'string') {
            value = value.replace(/\\/g, '\\\\') //バッスラだけはエスケープしないと減っていく。
            value = `'${value}'`
        }
        if (typeof value === 'object') value = obj_to_txt(value, indent + 1)

        if (!is_arr) value = `${key}: ${value}` //keyを''するほうが正しいが邪魔。
        if (str.length == 0) str = '\n' //改行 値 改行 値 改行 で返す
        str += `${ind + sp}${value},\n`
        indent_len += (ind + sp).length

        //console.log();
    }

    //短い物なら改行しない
    if (str.length < 50 + indent_len) {
        str = str.replace(/\n|\t/g, '') //
        ind = ''
    }

    //外側の括弧をつける
    if (is_arr) str = `[${str}${ind}]`
    else str = `{${str}${ind}}` //例外処理
    //例外処理、コメントを外に
    let kome = obj.name ? `,//${obj.name}` : ''
    str += kome
    return str
}
//htmlに表示させてclickコピー
export function dom_copy(str) {
    let d = document.body
    d.style.backgroundColor = '#222'
    d.style.color = '#fff'
    d.style.whiteSpace = 'pre'
    d.style.tabSize = 4
    d.style.MozTabSize = 4 //firefox用
    d.style.fontFamily = 'Monaco, monospace'
    d.style.fontSize = '14px'
    d.textContent = str
    d.onclick = function(e) {
        let selection = getSelection()
        selection.selectAllChildren(this)
        document.execCommand('copy')
        //selection.removeAllRanges()
        this.onclick = null
    }
}

// export Array(1,2)
// let a =
//     [
//         1,
//         2
//     ]