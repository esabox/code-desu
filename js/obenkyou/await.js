import hoge from 'http://localhost:8888/lib/jszip.js';
let log = console.log
async function name(params) {
    let log = console.log
    let s = ''
    //log(s)
    log(1)
    log(11)
    await new Promise((r) => setTimeout(r, 1000)); // sleep
    log(2)

}
name()
log(3)

/*
凄い重い処理が何秒かかろうと、hogeがlog2に抜かれることは無い、settimeoutなど非同期が無い限り。
async hoge function(){凄い重い処理}
hoge()
log(2)
*/