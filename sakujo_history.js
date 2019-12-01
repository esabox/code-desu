const arr =
   [
      ['2019/11/25 mypo.user.js 古い関数削除', async function loadself() {
         let domID = 'loadSelfScript'
         //log('スタート loadSelf');
         const el = document.querySelector('#' + domID)
         if (el === null) {
            let url = 'http://localhost:8888/mypo.user.js?' + Date.now()
            //let url = 'http://localhost:8888/mm.js?'+Date.now();
            log('読み込む→' + url)
            let aasd = document.createElement('script')
            const aaa = await new Promise((resolve, reject) => {
               aasd.onload = () => resolve(true)
               aasd.onerror = () => resolve(false)
               aasd.src = url
               aasd.id = domID
               document.body.appendChild(aasd)
            })
            log('読み込み結果', aaa)
            if (aaa) {
               log('localhostの読み込み成功、ブラウザ内蔵のスクリプトは終了')
               return aaa
            } else {
               log('ローカル読み込み失敗、インストールスクリプトを続ける')
            }
         } else {
            log('既にscriptあるので作らない')
         }
      }
         /*/
         function loadself() {
             let domID = 'loadSelfScript';
             //log('スタート loadSelf');
             const el = document.querySelector('#' + domID);
             if (el === null) {
                 let url = 'http://localhost:8888/mypo.user.js';
                 log('読み込む→'+url);
                 document.body.appendChild(
                     Object.assign(document.createElement('script'), {id: domID, src: url})
                     //ファイルが存在しない場合はまだ未実装
                 );
                 return true;
             } else {
                 log('既にscriptあるので作らない');
             }
         }
         /**/
      ],
      ['2019/11/26 mypo.ujsから関数群実行用', function xdo() {
         //log(arr)
         for (let val of arr) {
            //log(val)
            let [name, url, func] = val

            //urlは.エスケープしてワイルドカードが使えるように。そのかわりドットは使えない。
            let url_join = url.join('|').replace(/\./g, '\\.') //.は正規表現のためにエスケープ
            url_join = url_join.replace(/\*/g, '.*?')//ワイルドカードを実装。
            let re = new RegExp(url_join, 'i')
            //log(name,url_join)
            //log(url_exp)
            if (re.test(location.href)) {
               let obj = {name: name, f: func}
               ugoiteruka('*')

               //log(` ${name} $$$$$$$$$$$$$$$$$$$`);
               log(`${name} $$$$$$$$$$$$$$$$$$$`)
               obj.f()
            }
         }
      }],
      ['',],
      ['',],
      ['',],
      ['',],
      ['',],
   ]