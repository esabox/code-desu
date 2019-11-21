//obj+arrを展開してテキストで返す。
/**
 * obj,arrを展開して文字列で返す
 * @param {*} obj 
 * @param {*} indent 
 */
export default function obj_to_txt(obj, indent = 0) {
    let str = '';
    let sp = '    ';
    let ind = sp.repeat(indent);
    let is_arr = Array.isArray(obj);

    for (let [key, value] of Object.entries(obj)) {
        if (typeof value === 'string') {
            value = `'${value}'`;
        }
        if (typeof value === 'object') value = obj_to_txt(value, indent + 1);
        if (!is_arr) value = `${key}: ${value}`; //keyを''するほうが正しいが邪魔。

        str += `${ind + sp}${value},\n`;

        //console.log();
    }
    //例外処理、コメントを外に
    let kome = obj.name ? `,//${obj.name}` : '';
    if (is_arr) str = `[\n${str}${ind}]`;
    else str = `{\n${str}${ind}}${kome}`; //例外処理
    return str;
}