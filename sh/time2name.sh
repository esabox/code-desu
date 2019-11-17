#!/bin/bash
#cd `dirname $0`
#変数にdateコマンドから日付を入れる
#macはgnu date じゃないから仕様がちがったので mac stat使う、これもgnuじゃないから注意、オプションが違う。
val=`stat -f "%Sm" -t "@%Y%m%d%H%M%S-" $1`
#val=@$val
echo $1 $val$1
echo $0
echo `pwd`
mv $1 $val$1