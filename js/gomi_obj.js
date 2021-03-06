const arr = [
    {
        play: 0,
        name: 'テンプレート原本',
        func: function() {
            'use strict';
            log('テンプレああああ');
        },
        uniq: 1,
    },//テンプレート原本,
    {
        play: 0,
        name: 'objとthis、深いとややこやし',
        func: function() {
            let obj = {
                kore: {
                    ssss: 1,
                    fn: function(s) {
                        //console.log(Date.now());
                        console.log(this); //"kore"a
                        //console.log(this);
                        for (let key in this) {
                            console.log(key);
                        }
                    }
                }
            };
            obj.kore.fn();
        },
        uniq: 2,
    },//objとthis、深いとややこやし,
    {
        play: 0,
        name: 'proto実験、記憶にない',
        func: function() {
            let obj = {x: 20, y: 30, z: 43};
            obj.__proto__ = {a: 100};
            obj.__proto__.__proto__ = {x: 200};
            console.log(obj.x, obj.a); //20 100
            console.log(obj);
            obj.a = 500;
            console.log(obj.a, obj.__proto__.a); //500 100 表面上上書きされる
            console.log(obj);
        },
        uniq: 3,
    },//proto実験、記憶にない,
    {
        play: 0,
        name: 'proto実験、記憶にない',
        func: function() {
            let obj1, obj2, obj3;
            obj1 = {x: 50};
            obj2 = {a: 100};
            obj3 = {x: 20, y: 30, z: 40};
            obj3.__proto__ = obj2;
            obj2.__proto__ = obj1;
            console.log(obj3);
            obj2.a = 111;
            console.log(obj3.a); //111 参照している
            console.log(obj3);
            //ループさせるとエラー
            //obj1.__proto__ = obj3;
        },
        uniq: 4,
    },//proto実験、記憶にない,
    {
        play: 0,
        name: 'proto実験、記憶にない',
        func: function() {
            function Test() {}
            //debugger;
            Test.prototype.abc = 100;
            x = new Test();
            console.log(x.__proto__);
            // {abc: 100}
            // getPrototypeOfは__proto__にアクセスするのと一緒
            console.log(Object.getPrototypeOf(x));
            //  {abc: 100}
            console.log(x.__proto__ === Object.getPrototypeOf(x)); //t
            // setPrototypeOfで__proto__に代入と一緒
            Object.setPrototypeOf(x, {xyz: 1});
            console.log(x.__proto__); // Object {xyz: 1}
            console.log(x.abc, x.xyz); //undefined 1
            console.log(x);
        },
        uniq: 5,
    },//proto実験、記憶にない,
    {
        play: 0,
        name: 'プロトタイプを切ると',
        func: function() {
            log('プロトタイプを切ると');
            let a;
            function A() {}
            // __proto__ を Object.prototype から null にする
            A.prototype.__proto__ = null;
            a = new A();
            console.log(a);
            // Objectのインスタンスじゃなくなる！
            console.log(a instanceof Object);
            //false
            // toStringがない！
            console.log(a.toString);
            //undefined
            // toStringが必要な計算をすると
            //console.log(1 + a);
            //Uncaught TypeError: Cannot convert object to primitive value
            // 普通のオブジェクトだと
            console.log(1 + {});
            //"1[object Object]"
            console.log(Object.prototype.__proto__);
            //null
            console.log(A.prototype.__proto__);
            //undefined
        },
        uniq: 6,
    },//プロトタイプを切ると,
    {
        play: 0,
        name: 'newを忘れるとグローバルに変数を定義',
        func: function() {
            /* newを付け忘れたパターン */
            let Constructor = function() {
                this.message = 'こんにちは！';
            };
            let obj = Constructor();
            console.log(obj); //un
            //console.log(obj.message); //エラー
            console.log(message); // こんにちは！
            console.log(window.message); // こんにちは！
        },
        uniq: 7,
    },//newを忘れるとグローバルに変数を定義,
    {
        play: 0,
        name: 'newについて',
        func: function() {
            log('newについて');
            function Blog() {
                log(123);
                this.vvv = 222;
                let zz = 444;
                this.hoge = function() {
                    log(this.vvv);
                };
                this.nage = () => {
                    log(this.vvv, ++zz);
                };
            }
            let blog = new Blog();
            //blog.a=1113
            //blog.hoge()
            blog.nage();
            blog.nage();
            Blog = function() {
                console.log(this); //Window{...}
            };
            blog = Blog();
        },
        uniq: 8,
    },//newについて,
    {
        play: 0,
        name: 'proto上書き、上手く動かない。',
        func: function() {
            // try{
            //   document.querySelector('adiv').click();
            // }catch(e){
            //   //console.log(e);
            // }
            Node.prototype.click = () => log(111);
            let tag = 'body';
            //document.querySelector(tag) && document.querySelector(tag).click();
            document.querySelector(tag).click();
            log(document.querySelector(tag).tagName);
            log(333);
        },
        uniq: 9,
    },//proto上書き、上手く動かない。,
    {
        play: 0,
        name: 'thisチェック、長すぎる',
        func: function() {
            log('this check');
            console.log('---1---');
            let myObject = {
                value: 10,
                show: function() {
                    console.log(this.value); //10
                }
            };
            function show() {
                value = 22; //グローバル汚染
                console.log(this.value); //10
                //console.log('this',this); //window
            }
            myObject.show(); // 10
            log(window.value);
            show();
            log(window.value);
            //myObject.show(); // メソッド呼び出し メソッドは自身への操作
            //show(); // 関数呼び出し
            console.log('---2---');
            myObject = {
                value: 1,
                show: function() {
                    console.log('@1', this.value); // 1
                    function show() {
                        console.log('@2', this); //
                    }
                    show();
                }
            };
            myObject.show();
            console.log('---3---');
            myObject = {
                value: 1,
                show: function() {
                    let self = this;
                    console.log('A', self.value); // 1
                    function show() {
                        console.log('B', self.value); // 1
                    }
                    show();
                }
            };
            myObject.show();
            console.log('---4---');
            function MyObject(value) {
                this.value = value;
                this.increment = function() {
                    this.value++;
                };
            }
            myObject = new MyObject(0);
            console.log(myObject.value); // 0
            myObject.increment();
            console.log(myObject.value); // 1
            console.log('---5---');
            myObject = {
                add: function(value1, value2) {
                    console.log(this.value + value1 + value2);
                }
            };
            let yourObject = {
                value: 3
            };
            myObject.add.apply(yourObject, [2, 10]); // 15
            myObject.add.call(yourObject, 2, 10); // 15
            console.log('this', this); //window
        },
        uniq: 10,
    },//thisチェック、長すぎる,
    {
        play: 0,
        name: 'objをforループ、objは順序が不定。',
        func: function() {
            let obj = {
                zz: 0,
                aa: '',
                23: 'keyが数字だと並びが変わる',
                課長: '日本語キー'
            };
            console.log(obj);
            /**/
            function forin() {
                for (let key in obj) {
                    console.log(key, obj[key]);
                }
            }
            console.log(forin);
            forin();
            function fore() {
                //Arraryに変換してから
                Object.keys(obj).forEach(function(key, i) {
                    console.log(i, key, this[key]); //this=obj
                }, obj);
            }
            console.log(fore);
            fore();
            //無理だった
            // [].forEach.call(obj, function(item) {
            //    console.log(item);
            //  });
        },
        uniq: 11,
    },//objをforループ、objは順序が不定。,
    {
        play: 0,
        name: 'アロー関数とthis、上手く書けない、配列で表現すべきか。',
        func: function() {
            'use strict';
            let obj = {
                des: '1',
                n1: function() {
                    return this.des;
                },
                n2: () => this.des,
                obj: {
                    des: '2',
                    n1: function() {
                        return this.des;
                    },
                    n2: () => this.des,
                    n3: (() => this.des)(),
                    n4: (function() {
                        log(this); //window、strictだとunでプロパティ参照するとエラー。
                        //return this.des
                    })()
                }
            };
            obj.n3 = () => this.des; //Window
            obj.n4 = function() {
                return this.des;
            };
            log(obj.n1()); //"1"
            log(obj.n2()); //"arrow func"
            log(obj.n3()); //"arrow func"
            log(obj.n4()); //"1"
            log(obj.obj.n1()); //"2"
            log(obj.obj.n2()); //"arrow func"
            log(obj.obj.n3); //"arrow func"
            log(111);
            //codepenでconsole.dirが使えない
        },
        uniq: 12,
    },//アロー関数とthis、上手く書けない、配列で表現すべきか。,
    {
        play: 0,
        name: 'グローバル汚染、まだ書きかけ',
        func: function() {
            log('guro osen');
            let a = 222;
            //var a = 111;
            function hoge() {
                //"use strict"  関数の最初の実行行でやらないと無効ぽ。
                //let a = 333;
                log(a); //222
                log(this.a);
                //log(this.a, a, this); //111,333,window{} //strictにするとthisがunでエラー
            }
            hoge();
        },
        uniq: 13,
    },//グローバル汚染、まだ書きかけ,
    {
        play: 0,
        name: 'use strict のテスト',
        func: function() {
            log('use strict のテスト');
            let strictTest = () => {
                +(function() {
                    log('@1', this); //Window
                })();
                +(function() {
                    'use strict';
                    log('@2', this); //und
                })();
                +(function() {
                    log('@3', this); //Window
                    ('use strict'); //先頭に書かないと効果なし
                    log('@4', this); //Window
                })();
                let obj = {};
                obj.f = function() {
                    console.dir(this); //Object,111
                };
                obj.f();
            };
            strictTest();
        },
        uniq: 14,
    },//use strict のテスト,
    {
        play: 0,
        name: 'オブジェクトと配列を混ぜる、連想配列',
        func: function() {
            'use strict';
            let obj = {a: 111, '3': [11, 22, 33]};
            log(obj['a'], obj[3][2]); //111 33
        },
        uniq: 15,
    },//オブジェクトと配列を混ぜる、連想配列,
    {
        play: 0,
        name: '呼び出し元でthisが変わる',
        func: function() {
            'use strict';
            let obj = {
                fn: function() {
                    log('@1', this && this.v);
                },
                v: 111
            };
            let obj2 = {v: 222};
            let f;
            obj.fn(); //@1,111
            f = obj.fn;
            f(); //@1,undefined
            obj2.f = obj.fn;
            obj2.f(); //222
        },
        uniq: 16,
    },//呼び出し元でthisが変わる,
    {
        play: 0,
        name: 'インスタンス作成',
        func: function() {
            'use strict';
            function Teki() {}
            let teki1 = new Teki();
            log(teki1); //Teki{}
            let ins = new Object('hoge');
            log(teki1); //Teki{}
        },
        uniq: 17,
    },//インスタンス作成,
    {
        play: 0,
        name: 'thisの挙動',
        func: function() {
            'use strict';
            log(88888888888888);
            log('this@0 ', this);
            const tsubasa = {
                log: log('@1', this),
                me: this,
                me2: +(function() {
                    log('@2 ', this);
                    return this;
                })(),
                hello: function() {
                    log('me ', this.me);
                    log('me2 ', this.me2);
                    log('this ', this);
                }
            }; //Object
            tsubasa.hello(); // tsubasa
        },
        uniq: 18,
    },//thisの挙動,
    {
        play: 0,
        name: 'アロー関数のthisは定義した時のthisに固定される',
        func: function() {
            'use strict';
            log('this@0 ', this); //ここのthisがhello2のthisに固定される
            const tsubasa = {
                name: 'yamada',
                f1: function() {
                    //function定義時には固定されない
                    log('f1', this && this.name);
                    setTimeout(() => {
                        //ここで固定
                        log('f1 Time', this && this.name);
                    });
                },
                f2: () => {
                    //アロー関数定義時にthis固定
                    log('f2 this ', this && this.name);
                    setTimeout(() => {
                        //ここでも固定
                        log('f2 Time', this && this.name);
                    });
                },
                f3: function() {
                    //function定義時には固定されない
                    log('f3', this && this.name);
                    setTimeout(function() {
                        //ここでも固定されない
                        log('f3 Time', this && this.name); //win
                    });
                }
            }; //Object
            tsubasa.f1(); // tsubasa //メソッド呼び出しなのでインスタンスがthisになる
            tsubasa.f2(); // undefined
            tsubasa.f3(); // undefined
        },
        uniq: 19,
    },//アロー関数のthisは定義した時のthisに固定される,
    {
        play: 0,
        name: 'thisとスコープとアローとオブジェクト',
        func: function() {
            'use strict';
            let o = {
                v: 111,
                f: function() {
                    let v = 222;
                    setTimeout(() => {
                        log('@1', v, this.v); //222,111
                    });
                },
                o: {
                    v: 333,
                    f: function() {
                        let v = 444;
                        log('@3', v, this.v); //444,333
                        setTimeout(() => {
                            log('@2', v, this.v); //444,333
                        });
                    }
                }
            };
            o.f();
            o.o.f();
        },
        uniq: 20,
    },//thisとスコープとアローとオブジェクト,
    {
        play: 0,
        name: '変数にアクセスするとエラー、そのテスト',
        func: function() {
            'use strict';
            let obj = {};
            for (let i = 0; i < 10; i++) {
                try {
                    switch (i) {
                        case 0:
                            log('@0', v); //err -> not defined
                        case 1:
                            log('@1', obj.hoge); //undefine
                        case 2:
                            log('@2', obj.hoge.bbb); //err undefinedのbbbプロパティがよめねー
                        case 3:
                            log('@3', this); // undefined
                        default:
                            break;
                    }
                } catch (e) {
                    log(e);
                }
            }
        },
        uniq: 21,
    },//変数にアクセスするとエラー、そのテスト,
    {
        play: 0,
        name: '隣のメソッドの変数を読みたい、無理ぽい',
        func: function() {
            'use strict';
            let obj = {
                v: 123,
                f1: function() {
                    let v1 = 111;
                    log(this.f2);
                },
                f2: function() {
                    let v2 = 222;
                }
            };
            obj.f1();
        },
        uniq: 22,
    },//隣のメソッドの変数を読みたい、無理ぽい,
    {
        play: 0,
        name: '日付の関数を車輪してみた、曜日が無い',
        func: function() {
            'use strict';
            function mydate(format, zerofill = 1) {
                let date = new Date();
                let hi = {};
                format = format || 'YYYY-MM-DD hh:mm:ss';
                hi.YYYY = date.getFullYear();
                hi.MM = date.getMonth() + 1;
                hi.DD = date.getDate();
                hi.hh = date.getHours();
                hi.mm = date.getMinutes();
                hi.ss = date.getSeconds();
                for (let key in hi) {
                    if (key !== 'YYYY' && zerofill) {
                        hi[key] = ('0' + hi[key]).slice(-2); //ゼロうめ
                    }
                    format = format.replace(key, hi[key]); //フォーマット文字を置換
                }
                return format;
            }
            log(mydate('YYYY-MM-DD'));
        },
        uniq: 23,
    },//日付の関数を車輪してみた、曜日が無い,
    {
        play: 0,
        name: 'menberFunctionはいつ定義されるか',
        func: function() {
            'use strict';
            let o = {
                fn: function(hoge) {
                    this.fn2 = function() {
                        log(1);
                    };
                }
            };
            o.fn(); //ここでfn2が定義
            o.fn2();
        },
        uniq: 24,
    },//menberFunctionはいつ定義されるか,
    {
        play: 0,
        name: 'switch、よく忘れる、breakしないと続く',
        func: function() {
            /*、一度breakすると終わり*/
            'use strict';
            switch ('a') {
                case 1:
                    log(1);
                case 'a':
                    log(2);
                case 3:
                    log(3);
                    break;
                case 4:
                    log(4);
                case 'a':
                    log(5);
            }
            //2 3
        },
        uniq: 25,
    },//switch、よく忘れる、breakしないと続く,
    {
        play: 0,
        name: '変数の巻き上げ',
        func: function() {
            'use strict';
            /*
        変数の巻き上げとは、スコープ内で宣言された変数は、
        実際に宣言された場所に関係なく、スコープの先頭で宣言されたことになる、というものである。
        */
            log(x); // undefined エラーにならない不思議！
            let x = 0;
            //var宣言は位置に関係なく先頭で宣言されるから、以下と等しい
            // var x;
            // log(x); // undefined
            // var x = 0;
            //
            //letは巻きあげない、ので以下はエラー
            // log(x);    // ReferenceError: x is not defined
            // let x = 0;
        },
        uniq: 26,
    },//変数の巻き上げ,
    {
        play: 0,
        name: 'let var のブロックスコープ',
        func: function() {
            'use strict';
            /* 
            ブロックスコープ
            これまでのJavaScriptでは、スコープをつくるのは、
            グローバルスコープ
            ローカルスコープ
            evalスコープ
            の3つのみであった。
            スコープについては以下を参照。
            スコープとクロージャ
            {}で囲まれている領域をブロックと呼ぶが、これはスコープは作らなかった。そのため、ifやforはスコープを持たなかった。
            */
            let x = 0;
            log(x); // 0
            if (true) {
                x = 1;
                log(x); // 1
            }
            log(x); // 1
            // ブロックスコープを持たないため、if文の内側のxも、外側のxも、同じものを指す
            //しかしletは、ブロックスコープを作る。
            x = 0;
            log(x); // 0
            if (true) {
                let x = 1;
                log(x); // 1
            }
            log(x); // 0
            // letはブロックスコープを持つため、if文の内側のxと外側のxは、区別される
        },
        uniq: 27,
    },//let var のブロックスコープ,
    {
        play: 0,
        name: 'オブジェクト宣言のキーを変数では、作れません',
        func: function() {
            'use strict';
            let hoge = 'aaa';
            let o = {
                hoge: 222
            };
            log(o.hoge); //222
        },
        uniq: 28,
    },//オブジェクト宣言のキーを変数では、作れません,
    {
        play: 0,
        name: '複数OR条件のifをArray.prototype.include',
        func: function() {
            'use strict';
            log(`//複数OR条件のifをArray.prototype.includesで、
            //関数定義の時に引数は変数でないといけない、デフォルトで数値入力ぽいことはできる`);
            let a;
            //if(b===2 || b===3 || b===5)を
            //Array.includes 一番見やすい
            log((a = 3), [2, 3, 5].includes(a));
            //Array.some
            log((a = 3), [2, 3, 5].some(v => v === a));
            //if(b===2 && b===3 && b===5) 使う機会がない
            //every
            log((a = 3), [2, 3, 5].every(v => v === a));
            //someをアロー関数で2重にすると
            let f0 = (c, ar) => ar.some(v => v === c);
            log((a = 3), f0(a, [2, 3, 5]));
        },
        uniq: 29,
    },//複数OR条件のifをArray.prototype.include,
    {
        play: 0,
        name: 'コンストラクタ？中途半端',
        func: function() {
            'use strict';
            let Hoge = function HOGE() {
                this.v = 1;
            };
            Hoge.prototype.v = 2;
            let hoge = new Hoge();
            log(hoge.v, hoge.constructor.name, hoge.__proto__.constructor.name);
            log(hoge.__proto__.hasOwnProperty('constructor'));
            log(Hoge.v, Hoge.constructor.name); //コンストラクタにはアクセスできない
        },
        uniq: 30,
    },//コンストラクタ？中途半端,
    {
        play: 0,
        name: 'Codepenでconsole.time()が使えない',
        func: function() {
            'use strict';
            let time = new Date();
            alert();
            log(new Date() - time + 'ms');
        },
        uniq: 31,
    },//Codepenでconsole.time()が使えない,
    {
        play: 0,
        name: 'new のあとは()を付けなくても良い',
        func: function() {
            'use strict';
            log(new Date().toString());
            log(JSON.stringify(new Date()));
        },
        uniq: 32,
    },//new のあとは()を付けなくても良い,
    {
        play: 0,
        name: 'JSON.stringifyで覚えてない',
        func: function() {
            //
            'use strict';
            let d = new Date();
            log(Date.now());
            log(d.toString());
            log(JSON.stringify(d));
            log(Object.keys(d));
        },
        uniq: 33,
    },//JSON.stringifyで覚えてない,
    {
        play: 0,
        name: '2018/5に何か実験、覚えてない',
        func: function() {
            let C = function(name) {
                this.name = name;
            };
            log(new Date() + '888888888888888888888888888888');
            log(C.toString()); //Function.prototype.toStringが使える
            //log(C.__proto__.__proto__.toString());//Function.prototype.toStringが使える
            let s = '';
            s += ' ' + C.hasOwnProperty('toString'); //false
            s += ' ' + Function.prototype.hasOwnProperty('toString'); //true
            s += ' ' + Object.prototype.hasOwnProperty('toString'); //t
            log(s);
            let array = new Array();
            log('Q1', array.isArray, array.constructor.isArray, Array.isArray);
            let Hoge = function HOGE() {
                //this.f=1;
            };
            //Hoge.f=2;
            Hoge.prototype.f = 3;
            let h = new Hoge();
            log(h.f, h.constructor.name, Hoge.f);
        },
        uniq: 34,
    },//2018/5に何か実験、覚えてない,
    {
        play: 0,
        name: 'argumentで引数全部取れる？失敗 2018/06/01',
        func: function() {
            'use strict';
            function func1() {
                log(arguments[0]);
                // expected output: 1
                log(JSON.stringify(arguments));
                // expected output: 2
            }
            func1(1, 1 == 1);
        },
        uniq: 35,
    },//argumentで引数全部取れる？失敗 2018/06/01,
    {
        play: 0,
        name: 'Date.toXXXXを全部書きだしてみる 失敗',
        func: function() {
            'use strict';
            let d = new Date();
            console.log(Date.now());
            console.log(d.toString());
            console.log(JSON.stringify(d));
            console.log(Object.keys(d));
        },
        uniq: 36,
    },//Date.toXXXXを全部書きだしてみる 失敗,
    {
        play: 0,
        name: '配列の追加、レベルが低いのが欲しい',
        func: function() {
            'use strict';
            //オブジェクトに追加する場合、こんな感じ数字を書き換える必要あり。
            let list = {};
            list.hoge1 = 111;
            list.hoge2 = 222;
            //log(`list.hoge1=${list.hoge1}`);
            for (let i in list) {
                if (list.hasOwnProperty(i)) {
                    log(i);
                }
            }
            let arrs = [];
            arrs.push(111);
            arrs.push(222);
            log(`arrs[0]=${arrs[0]}`);
            for (let val of arrs) {
                log(val);
            }
            for (let i in arrs) {
                if (arrs.hasOwnProperty(i)) {
                    log(i);
                }
            }
        },
        uniq: 37,
    },//配列の追加、レベルが低いのが欲しい,
    {
        play: 0,
        name: 'newの基礎、func編、class前',
        func: function() {
            log('newの基礎、func編、class前');
            function Cons() {
                this.v1 = 100;
                let v2 = 200;
                Cons.v3 = 300;
                //log(++this.v1,++v2,++Cons.v3);
                this.fn = () => log(++this.v1, ++v2, ++Cons.v3);
            }
            let obj = new Cons();
            log(obj.v1, obj.v2, obj.v3); //101,und,un
            obj.fn();
            Cons();
            obj.fn();
            obj.fn();
        },
        uniq: 38,
    },//newの基礎、func編、class前,
    {
        play: 0,
        name: '正規表現のreplaceは、一度だけ',
        func: function() {
            log('正規表現');
            let str = 'aabbcc//\\';
            log('str', str);
            let pattern = /a/g;
            log(str.replace('a', '@'));
            log(str.replace(/a/g, '@'));
            log(str.replace(new RegExp('a', 'g'), '@'));
            log(str.replace(pattern, '@'));
            log(str.replace(/\//g, '@'));
            log(str.replace(new RegExp('/', 'g'), '@'));
            log(str.replace(new RegExp('\\\\', 'g'), '@'));
            log(str.replace(new RegExp('aa|c', 'g'), '@'));
            /*
            "@abbcc//\"
            "@@bbcc//\"
            "@@bbcc//\"
            "@@bbcc//\"
            "aabbcc@@\"
            "aabbcc@@\"
            "aabbcc//@"
            "@bb@@//\"
            */
            log(132223);
        },
        uniq: 39,
    },//正規表現のreplaceは、一度だけ,
    {
        play: 0,
        name: 'アロー関数使っちゃダメパターン、多い。',
        func: function() {
            'use strict';
            log('アロー関数使っちゃダメパターン');
            let obj = {
                hoge: 'ほげー',
                f0: () => log(this.hoge),
                fa: function() {
                    log(this.hoge);
                }
            };
            this.hoge = '違うこれじゃない'; //この場合は関数群のfn:がループで呼ばれたのがthis
            obj.f0();
            obj.fa();
            obj.f1 = () => {
                log(this.hoge);
            };
            obj.f1();
            obj.f2 = function() {
                log(this.hoge);
            };
            obj.f2();
            //function は呼ばれかたでthisが変わる、obj.fn()ならthisはobj。
            //アロー関数はリテラルした瞬間に固定される。
            //便利そうだがダメなパターンが多い。
            //es6前は、function(){}.bind(this)で固定していた。
        },
        uniq: 40,
    },//アロー関数使っちゃダメパターン、多い。,
    {
        play: 0,
        name: 'domの基礎',
        func: function() {
            'use strict';
            document.body.style.backgroundColor = 'green';
            let div = document.createElement('div');
            div.style.border = '4px solid #222';
            let div2 = div.cloneNode(true);
            let div3 = div.cloneNode(true);
            div.textContent = 'div1';
            div2.textContent = 'div2';
            div3.textContent = 'div3';
            div.style = 'background-color : aqua'; //textは非推奨,他が消える
            div2.style.backgroundColor = 'lime'; //domだとキャメル
            div3.style.backgroundColor = 'rgba(255,255,255,0.8)';
            //log(div3.style)
            //div3.style={backgroundColor:'red'}; //無理
            log(div3.style.backgroundColor); //"rgba(255, 255, 255, 0.8)"
            document.body.appendChild(div);
            document.body.appendChild(div2);
            document.body.appendChild(div3);
            document.body.appendChild(div); //二回appendすると、増えずに移動
        },
        uniq: 41,
    },//domの基礎,
    {
        play: 0,
        name: '分割代入 配列 es6',
        func: function() {
            'use strict';
            log('分割代入');
            const arr = ['Japan', 'Tokyo', 'Shinjuku'];
            const [country, state, city] = arr;
            console.log(`country: ${country}, state: ${state}, city: ${city}`);
        },
        uniq: 42,
    },//分割代入 配列 es6,
    {
        play: 0,
        name: '関数群フォーマット、arr.push({fn:})型',
        func: function() {
            'use strict';
            log('関数群の新しいフォーマット');
            //log(this)
            let arr = [];
            //関数群の登録
            arr.push({
                name: 'hoge',
                fn: function() {
                    log(this);
                }
            });
            // arr.push({name:'hoge',fn:()=> //アローだと更に上になり混乱。
            // 	log(this)
            // });
            //実行パート
            for (let i = 0, l = arr.length; i < l; i++) {
                let val = arr[i];
                if (val.do || i == l - 1) {
                    log(`arr[${i}]:name:${val.name}`);
                    val.fn();
                    break;
                }
            } //関数の実行、Tが無ければ、最後の関数を実行
            /*
            2019/10/12
            専用の関数を作ることで、折りたたんだ状態で説明が読め、
            説明文をコピペや、スクリプトバッチする必要も無い、
            しかし専用関数が増える
            */
        },
        uniq: 43,
    },//関数群フォーマット、arr.push({fn:})型,
    {
        play: 0,
        name: '分割代入オブジェ、ややこしい es6',
        func: function() {
            'use strict';
            log('分割代入');
            //オブジェクトの分割代入
            const obj = {country: 'Japan', state: 'Tokyo', city: 'Shinjuku'};
            const {country, state, city} = obj;
            console.log(`country: ${country}, state: ${state}, city: ${city}`);
            // -> 'country: Japan, state: Tokyo, city: Shinjuku'
            //countryが3回出てくるが、どれも変えてはいけない、謎。
        },
        uniq: 44,
    },//分割代入オブジェ、ややこしい es6,
    {
        play: 0,
        name: '関数群フォーマット、専用関数タイプ',
        func: function() {
            'use strict';
            log('関数群の新しいフォーマット');
            //log(this)
            let arr = [];
            //登録用関数
            function kang(s, d, f) {
                //log(s,d)
                arr.push({
                    name: s,
                    do: d,
                    fn: f
                });
            }
            //関数群の登録
            kang('関数群の新しいフォーマット模索してる', 0, function() {
                log(0, this.hoge);
                this.hoge = 'ほげー';
                log(this);
            });
            kang('ここに簡単な説明文を書く', 0, function() {
                log(1);
            });
            //実行パート
            for (let i = 0, l = arr.length; i < l; i++) {
                let val = arr[i];
                if (val.do || i == l - 1) {
                    log(`arr[${i}]:name:${val.name}`);
                    val.fn();
                    break;
                }
            } //関数の実行、Tが無ければ、最後の関数を実行
            /*
            2019/10/12
            専用の関数を作ることで、折りたたんだ状態で説明が読め、
            説明文をコピペや、スクリプトバッチする必要も無い、
            しかし専用関数が増える
            */
        },
        uniq: 45,
    },//関数群フォーマット、専用関数タイプ,
    {
        play: 0,
        name: '関数群フォーマット、配列タイプ、arr.push([fn])型',
        func: function() {
            'use strict';
            log('関数群の新しいフォーマット');
            //log(this)
            let arr = [];
            //関数群の登録
            arr.push([
                'a説明文',
                0,
                function() {
                    this.hoge = 'ほげー';
                    log(this);
                }
            ]);
            arr.push([
                'jhghjgjh',
                0,
                function() {
                    this.hoge = 'ほげー';
                    log(this);
                    let a = ['aa', 0, {a: 1, b: 2}];
                    log(a);
                    a = [
                        'aa',
                        0,
                        function() {
                            return 1;
                        }
                    ];
                    log(a);
                }
            ]);
            //実行パート
            for (let i = 0, l = arr.length; i < l; i++) {
                let val = arr[i];
                if (val[1] || i == l - 1) {
                    log(`arr[${i}]:name:${val[0]}`);
                    val[2]();
                    break;
                }
                //let [name,do,fn] = arr[i];
                // if (do || i == l - 1) {
                // 	log(`arr[${i}]:name:${name}`);
                // 	fn();
                // 	break;
                // }
            } //関数の実行、Tが無ければ、最後の関数を実行
            /*
            2019/10/13
            配列だと折りたたんでも説明読める
            駄目だった、配列が自動インデントで折られる；
            配列ナンバーは読み辛い、分割代入しようとするもエラー
            doがメタ文字だった。
            */
        },
        uniq: 46,
    },//関数群フォーマット、配列タイプ、arr.push([fn])型,
    {
        play: 0,
        name: 'クロージャ',
        func: function() {
            'use strict';
            //クロージャを駆使する方法は、このようなやり方になります。
            // 処理内容の関数を生成
            let test = (function() {
                let a = 0;
                // 処理内容の（外側でtest関数になる）無名関数を返す
                return function() {
                    log(this); //無理
                    return (a = a + 1);
                };
            })();
            log(test());
            log(test());
            log(test());
        },
        uniq: 47,
    },//クロージャ,
    {
        play: 0,
        name: '関数群・即実行型',
        func: function() {
            'use strict';
            function kg(play, name, func) {
                //プロパティの初期値、falseだとv=v||1←とか使えない。三項演算子なら出来る
                // if(kg.flag ==undefined)
                // 	kg.flag=false
                //三項演算子の初期値
                kg.flag = kg.flag !== undefined ? kg.flag : false;
                //log("aflag", kg.flag);
                //kg.flag=kg.flag
                let obj = {name: name, f: func};
                //オブジェに入れることで、thisが個別で使える。必要無いかも。
                //登録型と違って、何度も実行や、最後だけ実行はできない。
                //変数を使って、実行前にフラグを書き換えれば近いことはできるかも。
                if (play || kg.flag) {
                    log(` ${name} $$$$$$$$$$$$$$$$$$$$$$$$$$$$`);
                    obj.f();
                    kg.flag = false;
                }
            }
            //
            log(888);
            kg(0, 'temp1', function() {});
            kg.flag = 1;
            kg(0, 'temp2', function() {});
            kg(0, 'temp3', function() {});
        },
        uniq: 48,
    },//関数群・即実行型,
    {
        play: 0,
        name: 'undefineのプロパティを見るとクラッシュ',
        func: function() {
            'use strict';
            let hoge = 123;
            log(hoge);
            log(typeof hogehoge); //大丈夫
            //log( hogehoge); //クラッシュ
            log(hoge.a); //undefine 大丈夫
            //log(hoge.a.a) //クラッシュ
            //log(typeof hoge.a.a) //クラッシュ
        },
        uniq: 49,
    },//undefineのプロパティを見るとクラッシュ,
    {
        play: 0,
        name: 'Dateのproto2018/6スクラッチパッド↓',
        func: function() {
            //"use strict";
            //FFのスクラッチパッドに2018/6ぐらいに書いてたもの
            //'use strict';
            log(new Date()); //Date 2018-06-02T06:55:44.790Z
            log(new Date().__proto__); //Objcet {,48...}
            log(Object.keys(new Date().__proto__)); // Array[] 0個、keys関数では全て表示されるわけじゃない。
            Object.getOwnPropertyNames(new Date());
            /**/
            let arr = Object.getOwnPropertyNames(new Date().__proto__);
            /*48個
          getTime,getTimezoneOffset,getYear,getFullYear,getUTCFullYear,getMonth,
          getUTCMonth,getUTCDate,getDay,getUTCDay,getHours,getUTCHours,getMinutes,getUTCMinutes,getSeconds,
          getUTCSeconds,getMilliseconds,getUTCMilliseconds,setTime,setYear,setFullYear,setUTCFullYear,setMonth,
          setUTCMonth,setDate,setUTCDate,setHours,setUTCHours,setMinutes,setUTCMinutes,setSeconds,setUTCSeconds,
          setMilliseconds,setUTCMilliseconds,toUTCString,toLocaleFormat,toLocaleString,toLocaleDateString,
          toLocaleTimeString,toDateString,toTimeString,toISOString,toJSON,toSource,toString,valueOf,constructor,toGMTString
            */
            //Date.prototypeでset以外で始まるものを全て実行
            //set系はtoSourceがNullに書き換えられるから。
            let d = new Date();
            arr.map(function(value) {
                if (!value.match(/^set/)) {
                    console.log(value, ' => ' + d[value]());
                    // d.[value]
                }
            });
            //for in では0個
            for (prop in new Date().__proto__) {
                console.log(prop);
            }
        },
        uniq: 50,
    },//Dateのproto2018/6スクラッチパッド↓,
    {
        play: 0,
        name: 'prototype',
        func: function() {
            'use strict';
            //firefoxのスクラッチパッドは、ブラウザコンソールだとエラーが表示されるぽい
            //ただスクラッチにもエラー時は表示される。
            //cssエラーとか邪魔なのも多いからoffにする
            //スクラッチパッドの調査便利、console.dirを書かなくて良い、ブロックの中とか上手く使えないけど。
            //スクラッチパッドは再読込実行⌘Shift Rしないと、前のvar宣言とか汚染とかが全部残る。
            //FFのスクラッチパッドに2018/6ぐらいに書いてたもの
            //'use strict';
            Object.defineProperty(Object.prototype, 'myMethod', {
                // 拡張
                configurable: true, // false is immutable
                enumerable: false, // false is invisible
                writable: true, // false is read-only
                value: function() {
                    console.log('myMethod');
                }
            });
            function eachObject(obj) {
                for (let key in obj) {
                    console.log(key);
                } // "a", "b"
            }
            function eachArray(ary) {
                for (let key in ary) {
                    console.log(key);
                } // "0", "1", "2"
            }
            eachObject({
                a: 1,
                b: 2
            });
            eachArray([1, 2, 3]);
        },
        uniq: 51,
    },//prototype,
    {
        play: 0,
        name: 'prototypeにこ謎',
        func: function() {
            'use strict';
            //prototype汚染 ※汚染後はリーロードでリセット 2018/06/03
            //'use strict';
            Object.prototype.myMethod = function() {
                console.log('myMethod');
            }; // 汚染
            function eachObject(obj) {
                for (key in obj) {
                    console.log(key);
                } // "myMethod", "a", "b"
            }
            function eachArray(ary) {
                for (key in ary) {
                    console.log(key);
                } // "myMethod", "0", "1", "2"
            }
            eachObject({
                a: 1,
                b: 2
            });
            eachArray([1, 2, 3]);
        },
        uniq: 52,
    },//prototypeにこ謎,
    {
        play: 0,
        name: '関数を囲む・ボッチつける、とスコープに入らない',
        func: function() {
            'use strict';
            //関数を囲む・ボッチつける、とスコープに入らない。括弧でくくられてると同じ
            function f1() {
                log('f1');
            }
            +function f2() {
                log('f2');
            };
            try {
                f1(); //f1
                f2(); //unavilable
                f1(); //実行されず
            } catch (e) {
                log(e);
            }
        },
        uniq: 53,
    },//関数を囲む・ボッチつける、とスコープに入らない,
    {
        play: 0,
        name: 'temp',
        func: function() {
            +function() {
                //関数内this use strict で変わる 2018/06/08
                'use strict';
                console.log(1, this); //window
            };
            +function() {
                //関数内this use strict で変わる
                //'use strict';
                console.log(1, this); //undefined
            };
            // delete 出来るのはプロパティだけ、var 付けたものは無理、エラーで動かせない
            +function() {
                'use strict';
                a = 1;
                //delete a;
                console.log(a);
            };
        },
        uniq: 54,
    },//temp,
    {
        play: 0,
        name: '関数のプロパティに内と外から',
        func: function() {
            'use strict';
            function hoge() {
                hoge.aaa = hoge.aaa || 1;
                hoge.aaa++;
                console.log(hoge.aaa);
            }
            hoge(); //2
            hoge.aaa = 10;
            hoge(); //11
            //console.dir(hoge)
        },
        uniq: 55,
    },//関数のプロパティに内と外から,
    {
        play: 0,
        name: '++の使い方基本',
        func: function() {
            'use strict';
            //バグのもと
            let n;
            n = 10;
            n = n++;
            console.log(n); //10
            n = 10;
            n = n++ + n; //10+11
            console.log(n); //21
        },
        uniq: 56,
    },//++の使い方基本,
    {
        play: 0,
        name: '謎、関数で暮らす作ってる2018/6スクラッチパッドここまで',
        func: function() {
            'use strict';
            let hoge_class = function hoge_p() {
                let abc = 123;
                function pf() {}
                console.log(333);
                //     this.f=function(){
                //           console.log("fff")
                //     }
                return 9;
            };
            //hoge_p() //not defined
            console.log(hoge_class());
            console.log(new hoge_class());
        },
        uniq: 57,
    },//謎、関数で暮らす作ってる2018/6スクラッチパッドここまで,
    {
        play: 0,
        name: '複数url対応の関数郡、旧mypo',
        func: function() {
            'use strict';
            function autoRunList() {
                let H;
                const kazari = ' ###### ';
                for (let key in list) {
                    //console.log("1 "+list[i].host);
                    H = list[key].host;
                    switch (typeof H) {
                        case 'string':
                            H = new RegExp(H, 'i');
                            break;
                        case 'object':
                            H = new RegExp(H.join('|'), 'i');
                            break;
                    }
                    if (H.test(location.href)) {
                        //debugger;
                        console.log(` ###### ${key} start ###### `);
                        list[key].func();
                        //console.log(` ###### ${key} end `);
                        //fn = list[i].fn;
                        // addEvent(window, "DOMContentLoaded", fn);
                        // window.addEventListener("DOMContentLoaded", fn, false);
                        //return; //1つヒットしたら終わり
                    }
                }
            }
        },
        uniq: 58,
    },//複数url対応の関数郡、旧mypo,
    {
        play: 0,
        name: '新毎ポ関数2019-10-17',
        func: function() {
            'use strict';
            //使ってみると、メインが恐ろしく長くなる。やっぱ登録型のほうがええかな。
            function kkk(play, name, url, func) {
                //log(location.href)
                // log(url.join('|'))
                let urlpai = url.join('|').replace(/\./g, '\\.'); //.は正規表現のためにエスケープ
                urlpai = urlpai.replace(/\*/g, '.*?'); //ワイルドカードを実装。
                log(urlpai);
                let patt = new RegExp(urlpai, 'i');
                //log(patt)
                if (patt.test(location.href)) {
                    let obj = {name: name, f: func};
                    log(` ${name} $$$$$$$$$$$$$$$$$$$`);
                    obj.f();
                }
            }
            kkk(
                1,
                'グーグルでアラーム',
                ['https://news.google.com/', 'cd*n.io'],
                function() {
                    'use strict';
                    //log((new RegExp('a', 'i')).test."ac.ap")
                }
            );
        },
        uniq: 59,
    },//新毎ポ関数2019-10-17,
    {
        play: 0,
        name: 'codepenでサムネ',
        func: function() {
            'use strict';
            if (location.href.match('cdpn.io')) {
                let d = document.body;
                d.style.backgroundColor = '#333';
                d.style.color = '#aaa';
                d.style.fontSize = '70px';
                d.innerHTML = 'べんきよ関数群</br>a';
            }
        },
        uniq: 60,
    },//codepenでサムネ,
    {
        play: 0,
        name: 'replaceは一度だけ',
        func: function() {
            'use strict';
            log(9999);
            let str = 'a.b.c';
            log(str.replace('.', '-')); //"a-b.c"
            log(str.replace(/\./g, '-')); //"a-b-c"
            log(str.replace(new RegExp(/\./), '-')); //"a-b.c"
            log(str.replace(new RegExp(/\./g), '-')); //"a-b-c"
            log(str.replace(new RegExp(/\./, 'g'), '-')); //"a-b-c"
            log(str.replace(RegExp(/\./g), '-')); //"a-b-c"
            log(str.split('.').join('-')); //"a-b-c"
        },
        uniq: 61,
    },//replaceは一度だけ,
    {
        play: 0,
        name: 'ベンチマーク',
        func: function() {
            'use strict';
            function bench(max, func) {
                let time = Date.now(); //時間測定
                for (let i = 0; i < max; i++) {
                    func();
                }
                log(` ${Date.now() - time}ms %%%%%%%%%%`);
            }
            let str = 'aaa.bbb.ccca';
            let max = 10e4;
            log(max);
            bench(max, function() {
                str.split('.').join('-'); //worst
            });
            bench(max, function() {
                str.replace(/\./g, '-');
            });
            bench(max, function() {
                str.replace(/\./, 'g', '-'); //best
            });
            bench(max, () => str.replace(/\./, 'g', '-'));
            //アローは130%ぐらい時間になるが、一行で書きやすい
            bench(max, function() {
                str.replace(new RegExp(/\./, 'g'), '-');
            });
            bench(max, function() {
                str.replace(RegExp(/\./, 'g'), '-');
            });
            // " 131ms %%%%%%%%%%"
            // " 31ms %%%%%%%%%%"
            // " 16ms %%%%%%%%%%"
            // " 23ms %%%%%%%%%%"
            // " 46ms %%%%%%%%%%"
            // " 47ms %%%%%%%%%%"
        },
        uniq: 62,
    },//ベンチマーク,
    {
        play: 0,
        name: 'ベンチ2、設定を内包',
        func: function() {
            'use strict';
            //2019/10/18
            //初期化が多いとややこしいから、くくってみたが、読みにくい。
            //ベンチが複数同時進行しないから、インスタンス化は必要ない。
            //なんで、シンプルにObject一個で作れるが、ben.loop(func)みたいになっちゃう。
            //クロージャにすりゃ、出来るかも。綺麗には書けないだろうな。
            function bench(func) {
                if (!bench.initial) {
                    bench.initial = 1;
                    bench.loop = bench.loop || 10e1;
                    bench.log = `\n// loop=${bench.loop.toLocaleString()}\n`;
                    bench.prt = function() {
                        log(bench.log + '\n');
                    };
                }
                //プロパティに初期化書き足す関数、作ってみたが、引数が文字列になっちゃう。
                // prop(bench,"log" ,`\n// loop=${bench.loop.toLocaleString()}\n`)
                // function prop(o,key,val){
                // 	if(o[key]==undefined){
                // 		o[key]=val
                // 	}
                // }
                //log(`bench(${func}) //`)
                let time = Date.now(); //時間測定
                //log(typeof func)
                //if(typeof func=="function")
                for (let i = 0, l = bench.loop; i < l; i++) func();
                time = Date.now() - time;
                let timeStr = ('        ' + time).slice(-4);
                bench.log += `/* ${timeStr} ms*/ bench(${func}) \n`;
                //bench.log+=`\n/*\t${time} ms\t*/`
                //log(` ${time}ms %%%%%%%%%%`);
            }
            //let ben = new bench()
            bench.loop = 30e4;
            let r,
                str = 'aaa.bbb.ccc';
	// loop=100,000
	/*   71 ms*/ bench(() => 1);
	/*   71 ms*/ bench(() => (r = str.replace(/\./g, 'o')));
	/*   71 ms*/ bench(() => (r = str.replace(/\./g, 'o')));
	/*   99 ms*/ bench(() => (r = str.replace(RegExp('\\.', 'g'), '-')));
	/*   81 ms*/ bench(() => (r = str.replace(RegExp(/\./g), '-')));
	/*   72 ms*/ bench(() => (r = str.replace(/\./g, 'z')));
            bench.prt();
            log(str.replace(RegExp('\\.', 'g'), '-'));
        },
        uniq: 63,
    },//ベンチ2、設定を内包,
    {
        play: 0,
        name: 'アロー関数のthis固定の有効利用',
        func: function() {
            'use strict';
            const Counter = function() {
                this.count = 0;
            };
            Counter.prototype.increment = function() {
                setTimeout(() => {
                    this.count++;
                    console.log(this.count); // 1
                }, 1000);
            };
            const counter = new Counter().increment();
        },
        uniq: 64,
    },//アロー関数のthis固定の有効利用,
    {
        play: 0,
        name: 'クラスっぽいもの先達のコピペ',
        func: function() {
            'use strict';
            let Person = function(name) {
                this.name = name;
            };
            Person.prototype.sayHello = function() {
                console.log('Hello, I\'m ' + this.getName(), this.name);
            };
            Person.prototype.getName = function() {
                return this.name;
            };
            let p = new Person(123);
            p.sayHello();
        },
        uniq: 65,
    },//クラスっぽいもの先達のコピペ,
    {
        play: 0,
        name: 'newは{}.func()に近い',
        func: function() {
            'use strict';
            // //let h=new Hoge(123) は
            // //let h={}
            // //h.Hoge(123)
            // // aaa()
            // this.f()log(this) //既にfが存在している、巻き上げ？
            //this.f() //ブラウザフリーズ
            this.f = function() {
                log(this);
            };
            this.hoge = 123;
            // function aaa(){
            // 	log(this)
            // }
        },
        uniq: 66,
    },//newは{}.func()に近い,
    {
        play: 0,
        name: 'Objectにリテラル関数が定義前に存在',
        func: function() {
            'use strict';
            // this.f()
            log(this); //既にfが存在している、巻き上げ？
            //this.f() //ブラウザフリーズ
            this.f = function() {
                log(this);
            };
            this.hoge = 111;
            log(this);
        },
        uniq: 67,
    },//Objectにリテラル関数が定義前に存在,
    {
        play: 0,
        name: 'リテラル関数も上から呼べる？',
        func: function() {
            'use strict';
            //f1() //エラー
            let f1 = function() {
                log(this, 111);
            };
            f2(); //OK
            function f2() {
                log(222);
            }
            //this.f3() //err
            this.f3 = function() {
                log(333);
            };
            //this.f3()
        },
        uniq: 68,
    },//リテラル関数も上から呼べる？,
    {
        play: 0,
        name: '基礎class構文',
        func: function() {
            'use strict';
            class User {
                constructor(name, age) {
                    this.name = name;
                    this.age = age;
                }
                //普通のメソッド
                getName() {
                    return this.name;
                }
                //セッターメソッド
                set myName(value) {
                    this.name = value;
                }
                //ゲッターメソッド
                get myName() {
                    return this.name;
                }
            }
            let taro = new User('太郎', 32);
            console.log(taro.getName()); //太郎
            console.log(taro.myName); //太郎
            // console.log( taro.myName() ); //err
            taro.myName = '花子';
            console.log(taro.myName); //花子
        },
        uniq: 69,
    },//基礎class構文,
    {
        play: 0,
        name: 'ベンチ3、クロージャ断念',
        func: function() {
            'use strict';
            //2019/10/18
            //クロージャはlet系なんでthis系オブジェとちゃう。
            //クロージャはメソッド作れないぽい、ちょっと複雑なことやるのすら無理。
            let benc = (function() {
                let loop = 1000;
                function hoge() {
                    loop = 0;
                }
                function lo(func) {
                    log(++loop);
                }
                return lo;
            })();
            benc();
            //benc.hoge()
            benc();
        },
        uniq: 70,
    },//ベンチ3、クロージャ断念,
    {
        play: 0,
        name: 'f=obj.func から呼び出すとthis狂う',
        func: function() {
            'use strict';
            let o = {
                v1: 1,
                f: function() {
                    log(this.v1);
                }
            };
            o.f(); //1
            o.v1 = 10;
            o.f(); //10
            let ff = o.f;
            //ff() //err thisがunde
            let o2 = {v1: 200};
            o2.f2 = o.f;
            o2.f2(); //200
        },
        uniq: 71,
    },//f=obj.func から呼び出すとthis狂う,
    {
        play: 0,
        name: 'thisを色々な呼び出し',
        func: function() {
            'use strict';
            let o = {v1: 10};
            o.f = () => log(this); //oにならない。
            o.f();
            //アロー関数でthisをoにするにゃ、o.function(){アロー関数}にしないと
            log('root', this);
            function hoge() {
                log(this);
            }
            hoge(); //und
            o.ff2 = (function() {
                log('o.ff2 this', this); //und
            })();
            o.ff = function() {
                log('o.ff this', this);
            };
            o.ff(); //v1:10
        },
        uniq: 72,
    },//thisを色々な呼び出し,
    {
        play: 0,
        name: 'アロー関数のthisを指定objに',
        func: function() {
            'use strict';
            //アロー関数の固定を強行してみた。
            let o = {
                name: 'hoge',
                f: function() {
                    log('f', this ? this.name : this);
                },
                reg: function() {
                    this.arrowFn = () => log('arrowFn', this ? this.name : this);
                }
            };
            o.reg();
            o.f(); //hoge
            o.arrowFn(); //hoge
            let nf = o.f;
            nf(); //und
            let af = o.arrowFn;
            af(); //hoge アロー関数だからthis固定
        },
        uniq: 73,
    },//アロー関数のthisを指定objに,
    {
        play: 0,
        name: 'アロー関数で、thisの使えるobj()',
        func: function() {
            'use strict';
            //Objectを関数で上書き、クロージャみたいになった、外からアクセできない。
            //残骸としてのこる、まあ使えない。
            let o = {
                name: 'hoge',
                f: function() {
                    log('f', this ? this.name : this);
                },
                reg: function() {
                    o = () => log('arrowFn', this ? this.name : this, this);
                }
            };
            o.reg();
            o(); //
            log(o.name); //o ?謎
            //o.f() //not func
        },
        uniq: 74,
    },//アロー関数で、thisの使えるobj(),
    {
        play: 0,
        name: 'ベンチ2をclass化',
        func: function() {
            'use strict';
            //一重ループで作ったが、最初だけとてつもなく遅くなる。
            //二重ループにして平均取る、二重目が100未満だと誤差が激しすぎる。
            class Bench {
                constructor(lop1, loop2 = 100) {
                    this.loop2 = loop2;
                    this.lop1 = lop1;
                    this.head = 'b.add(';
                    this.times = [];
                }
                lp(func) {
                    let time = Date.now(); //時間測定
                    for (let i = 0, l = this.loop2; i < l; i++) func();
                    time = Date.now() - time;
                    //this.logs.push(func)
                    return time;
                    //this.times.push(time)
                }
                add(func) {
                    if (!this.funcs) this.funcs = [];
                    this.funcs.push(func);
                    this.times.push(0);
                }
                play() {
                    //時間配列を0で初期化
                    // this.times=Array(this.funcs.length)
                    // this.times.fill(0)
                    //ループ一次元
                    for (let j = 0; j < this.lop1; j++) {
                        let i = 0;
                        for (let val of this.funcs) {
                            this.times[i] += this.lp(val);
                            i++;
                        }
                        //this.prt()
                    }
                }
                prt() {
                    //ヘッダー
                    let str = '\n';
                    let [l1, l2] = [this.lop1, this.loop2]; //分割代入で見やすく。
                    str += `//${l1.toLocaleString()}*(${l2}*code)`;
                    str += `= ${(l1 * l2).toLocaleString()} \n`;
                    let max = Math.max(...this.times);
                    let maxlen = String(max).length;
                    //log(maxlen)
                    for (let i = 0, l = this.funcs.length; i < l; i++) {
                        let timeStr = ('        ' + this.times[i]).slice(-maxlen);
                        let graf = this.mgraf(this.times[i], max);
                        str += `/*${graf} ${timeStr}ms */ ${this.head}${this.funcs[i]})\n`;
                    }
                    log(str);
                }
                mgraf(val, max) {
                    let len = 10,
                        s = '#_';
                    let count = Math.round(val / max * len);
                    let str = s[0].repeat(count) + s[1].repeat(len - count);
                    return str;
                }
            }
            let b = new Bench(1000, 1000);
            let r,
                str = 'aaa.bbb.ccc';
            //b.add(() => null);
            b.add(() => str.replace(/\./g, 'o'));
            b.add(() => str.replace(/\./g, 'o'));
            b.add(() => str.replace(/\./g, 'o'));
            b.add(() => str.replace(/\./g, 'o'));
            b.add(() => null);
            b.add(() => str.replace('.', 'o'));
            b.play();
            b.prt();
            //log(str.replace(RegExp("\\.", "g"), "-"));
        },
        uniq: 75,
    },//ベンチ2をclass化,
    {
        play: 0,
        name: 'obo覚書専用の関数',
        func: function() {
            'use strict';
            //そこそこ使えるかも、しかしカッコが増えてコピペミスしそう。
            //出力コメを関数直後にも挿入出来るが、それをやると次から文字列走査して消す必要も出てくる。
            function obo(func) {
                let o = obo;
                if (!o.ini) {
                    o.ini = 1;
                    o.log = '\n';
                    o.head = 'obo';
                    o.prt = function() {
                        log(o.log + '\n');
                    };
                    o.kome = function(s) {
                        o.log += `${o.head}.kome("${s}");\n`;
                    };
                }
                o.log += `${o.head}(${func}  );//  ${func()}\n\n`;
            }
            obo(() => Number('12e2')); //1200
            obo(() =>
                //文字列の連続、es6
                '#$'.repeat(3)
            ); //#$#$#$
            obo.kome('数値にカンマ');
            obo(() => Number(1000000).toLocaleString()); //1,000,000
            obo.kome('分割代入、コードを見やすくできるかも');
            obo(() => {
                let [a, b] = [10, 11];
                return [a, b];
            }); //10,11
            obo.prt();
        },
        uniq: 76,
    },//obo覚書専用の関数,
    {
        play: 0,
        name: 'obo覚書専用の関数​オブジェクト化',
        func: function() {
            'use strict';
            //objectに文字列化できれば、すべてのフォーマットを統一出来るかも。コメも含め。
            //良さそうな気がする。もちろん配列でも良いかなと思った、が、
            //巨大な置換をする場合、keyがあったほうが楽か。
            let obj = {
                a: 'abc数値にカンマ',
                f: () => Number(1000000).toLocaleString()
            };
            obj.r = obj.f();
            log(obj);
            log('' + obj.f); //"() => Number(1000000).toLocaleString()"
            log(obj.f.toString()); //onaji
            log(JSON.stringify(obj)); //"{'a':'数値にカンマ','r':'1,000,000'}"
            log(obj.toString()); //"[object Object]"
            log(obj.toSource()); //"非推奨、日本語は変換される、構造がワンラインになってる。
            let arr = [];
            arr = ['数値にカンマ', () => Number(1000000).toLocaleString()];
            arr[2] = arr[1]();
            log(arr);
            log(arr.toString()); //"数値にカンマ,() => Number(1000000).toLocaleString(),1,000,000"
            log(JSON.stringify(arr)); //"['数値にカンマ',null,'1,000,000']"
            log(arr.join('\n'));
        },
        uniq: 77,
    },//obo覚書専用の関数​オブジェクト化,
    {
        play: 0,
        name: '関数と出力を結合',
        func: function() {
            'use strict';
            function hoge() {
                //コメント1
                window['console'].log('hoge');
                //hoge
                //
                log(window.navigator.userAgent);
                //Mozilla/5.0 (Macintosh; Intel Mac OS X 10.11; rv:70.0) Gecko/20100101 Firefox/70.0
            }
            //log(hoge);
            log(hoge.toString());
            hoge();
        },
        uniq: 78,
    },//関数と出力を結合,
    {
        play: 0,
        name: '変数名を取得',
        func: function() {
            'use strict';
            let v3;
            for (let s in {v3}) {
                console.log(s);
            } //v3
            let v4;
            console.log(Object.keys({v4})[0]); //v4
            //関数化しようと思ったら、変数入れ替えるから無理や。
            const vlog = function() {};
        },
        uniq: 79,
    },//変数名を取得,
    {
        play: 0,
        name: 'objを展開する関数作りたい',
        func: function() {
            'use strict';
            let obj = {
                a: 'abc数値にカンマ',
                f: () => Number(1000000).toLocaleString()
            };
            obj.r = obj.f();
            for (let [key, value] of Object.entries(obj)) {
                console.log(`${key}: ${value}`);
            }
        },
        uniq: 80,
    },//objを展開する関数作りたい,
    {
        play: 0,
        name: 'objに勉強関数を入れたい,obj一個編',
        func: function() {
            'use strict';
            //objに入れることで、変換とかも簡単にできることが、今更気づく。
            let arr, obj;
            obj = {
                a: 'abc数値にカンマ',
                f: () => Number(1000000).toLocaleString()
            };
            arr = [
                {
                    a: 'abc数値にカンマ',
                    f: () => Number(1000000).toLocaleString(),
                    r: '1,000,000'
                },
                {
                    a: '文字列の連続、es6',
                    f: () => '_-$'.repeat(3),
                    r: '1,000,000'
                }
            ];
            // let obj=
            obj.r = obj.f();
            let str = '';
            for (let [key, value] of Object.entries(obj)) {
                if (typeof value === 'string') value = `"${value}"`;
                str += `\t${key}: ${value},\n`;
                //console.log();
            }
            log(`\n{\n${str}}\n`);
        },
        uniq: 81,
    },//objに勉強関数を入れたい,obj一個編,
    {
        play: 0,
        name: 'obj+arrの複合を展開書き出す車輪開発',
        func: function() {
            'use strict';
            //objに入れることで、変換とかも簡単にできることが、今更気づく。
            //畳むとなにも見えねえ→配列を止めてobjにして名前コピー
            //firefoxでlog(obj)→コピーでテキスト化できるけど、関数が消える。
            const obj = {
                abc数値にカンマ: {
                    n: 'abc数値にカンマ',
                    f: () => Number(1000000).toLocaleString(),
                    r: '1,000,000',
                    d: '2019/10/27 13:05:58'
                },
                'es6 分割代入': {
                    n: 'es6 分割代入',
                    f: () => {
                        let [a, b] = [10, 11];
                        return [b, a].join(',');
                    },
                    r: '11,10',
                    d: '2019/10/27 13:05:58'
                },
                date: {
                    n: 'date',
                    f: () => {
                        return {a: Date(), b: Date.now()};
                    },
                    r: {
                        a: 'Fri Oct 25 2019 22:29:27 GMT+0900 (日本標準時)',
                        b: 1572010167428
                    },
                    d: '2019/10/27 13:05:58'
                },
                配列なのにtypeofでobject: {
                    n: '配列なのにtypeofでobject',
                    f: () => [typeof [], Array.isArray([])].join(','),
                    r: 'object,true',
                    d: '2019/10/27 13:05:58'
                },
                '文字列の連続、es6': {
                    n: '文字列の連続、es6',
                    f: () => ['_##'.repeat(3), 'a'.repeat(0)].join(','),
                    d: '2019/10/27 13:05:58',
                    r: '_##_##_##,'
                }
            };
            let obj2 = {};
            //log(arr)
            kansuGunObj1(obj);
            //log(obj2)
            let str = obj_to_txt(obj);
            str = `${str};`;
            //log(str)
            dom_copy(str);
            //関数群obj1型用の関数
            function kansuGunObj1(obj) {
                for (let [key, val] of Object.entries(obj)) {
                    //log(key,val)
                    //rがなければ、関数を実行し、作る
                    if (!val.r) val.r = val.f();
                    //日付がなければ日付
                    if (!val.d) val.d = new Date().toLocaleString();
                    //obj2に代入する。
                    obj2[val.n] = val;
                }
            }
            //htmlに表示させてclickコピー
            function dom_copy(str) {
                let d = document.body;
                d.style.backgroundColor = '#222';
                d.style.color = '#fff';
                d.style.whiteSpace = 'pre';
                d.style.tabSize = 2;
                d.style.MozTabSize = 2; //firefox用
                d.style.fontFamily = 'monospace';
                //d.style.fontSize = "70px";
                d.innerHTML = str;
                d.onclick = function(e) {
                    let selection = getSelection();
                    selection.selectAllChildren(this);
                    document.execCommand('copy');
                    //selection.removeAllRanges()
                    this.onclick = null;
                };
            }
            //obj+arrを展開してテキストで返す。
            function obj_to_txt(obj, indent = 0) {
                let str = '';
                let ind = '\t'.repeat(indent);
                let is_arr = Array.isArray(obj);
                for (let [key, value] of Object.entries(obj)) {
                    if (typeof value === 'string') {
                        value = `'${value}'`;
                    }
                    if (typeof value === 'object') value = obj_to_txt(value, indent + 1);
                    if (!is_arr) value = `'${key}': ${value}`;
                    str += `${ind}\t${value},\n`;
                    //console.log();
                }
                if (is_arr) str = `[\n${str}${ind}]`;
                else str = `{\n${str}${ind}}`;
                return str;
            }
        },
        uniq: 82,
    },//obj+arrの複合を展開書き出す車輪開発,
    {
        play: 0,
        name: '日付文字列を解析、i===あたり不明',
        func: function() {
            'use strict';
            new Date(
                .../(\d{4})-(\d{1,2})-(\d{1,2})/
                    .exec('2018-3-30')
                    .slice(1)
                    .map((v, i) => v - (i === 1 ? 1 : 0))
            );
            let d = /(\d{4})-(\d{1,2})-(\d{1,2})/
                .exec('2018-3-30')
                .slice(1)
                .map((v, i) => v - (i === 1 ? 1 : 0));
            log(d);
        },
        uniq: 83,
    },//日付文字列を解析、i===あたり不明,
    {
        play: 0,
        name: '日付関数こぴぺ',
        func: function() {
            'use strict';
            //functionにしてるけど、結局走査の時に実行されてる。
            //もし実行させないなら、検索時は場所だけ数字とって、ifで置換する。
            let dateFormat = {
                _fmt: {
                    yyyy: function(date) {
                        return date.getFullYear() + '';
                    },
                    MM: function(date) {
                        return ('0' + (date.getMonth() + 1)).slice(-2);
                    },
                    dd: function(date) {
                        return ('0' + date.getDate()).slice(-2);
                    },
                    hh: function(date) {
                        return ('0' + date.getHours()).slice(-2);
                    },
                    mm: function(date) {
                        return ('0' + date.getMinutes()).slice(-2);
                    },
                    ss: function(date) {
                        return ('0' + date.getSeconds()).slice(-2);
                    }
                },
                _priority: ['yyyy', 'MM', 'dd', 'hh', 'mm', 'ss'],
                format: function(date, format) {
                    return this._priority.reduce((res, fmt, i) => {
                        log(res, fmt, i);
                        return res.replace(fmt, this._fmt[fmt](date));
                    }, format);
                }
            };
            log(dateFormat.format(new Date(), 'yyyy/MM/dd hh:mm:ss'));
        },
        uniq: 84,
    },//日付関数こぴぺ,
    {
        play: 0,
        name: '2017年？ぐらいに車輪した日付関数',
        func: function() {
            'use strict';
            function mydate(format, zerofill = 1) {
                let date = new Date();
                let hi = {};
                //初期設定
                format = format || 'yyyy-MM-dd hh:mm:ss';
                hi.yyyy = date.getFullYear();
                hi.MM = date.getMonth() + 1;
                hi.dd = date.getDate();
                hi.hh = date.getHours();
                hi.mm = date.getMinutes();
                hi.ss = date.getSeconds();
                for (let key in hi) {
                    if (key !== 'yyyy' && zerofill) {
                        hi[key] = ('0' + hi[key]).slice(-2); //ゼロうめ
                    }
                    format = format.replace(key, hi[key]); //フォーマット文字を置換
                }
                return format;
            }
        },
        uniq: 85,
    },//2017年？ぐらいに車輪した日付関数,
    {
        play: 0,
        name: 'localhostをimportテスト',
        func: async function() {
            'use strict';
            log(12e4);
            let url = 'https://codepen.io/pwdr/pen/VXxMoy.js';
            url = 'http://localhost:8888/utils.js';
            //let module2 = await import(url);
            log(module2);
            module2.default();
            //module2.bar();
        },
        uniq: 86,
    },//localhostをimportテスト,
]