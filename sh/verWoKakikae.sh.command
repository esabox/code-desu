#!/bin/bash
cd `dirname $0`
#変数にdateコマンドから日付を入れる
val=`date '+%Y-%m-%d-%H%M%S'`
#sedで置換、-iで上書き、後ろは接尾辞、 -eはexp コマンドラインの$1は引数
#-i -e にするとdummy-eてファイルになるってしまう、謎
# -e は無くても良い、ワンライナーで何度も置換したい時は必要
#-iのみだとmacはエラーになる、バックアップ作らない時は空文字必要
#-iを使わないなら sed /a/b/ dummy.txt > out.txt みたいに
sed -i.bak "s/\(@version\).*/\1 ${val}/" mypo.user.js
sed -i '' "s/\(const ver *=\).*$/\1'${val}'/" mypo.user.js

#入力ファイルの@versionなどを探して書き換える
#ex:code$./verWoka*** hoge.js


