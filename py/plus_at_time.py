#!/usr/bin/env python
# -*- coding: utf-8 -*-

#@がついてないファイルに更新日の@yyyymmddhhmmss-をつける。
#けっこう危険、使い方、変えたいフォルダまでcdして、このスクリプトを起動
#まず結果予測だけ表示、inputで最終確認

import os
import datetime
import glob
import re

def myrename(write=False):
    for f in ls:
        #print(f)
        dt = datetime.datetime.fromtimestamp(os.path.getmtime(f))
        dt= dt.strftime('@%Y%m%d%H%M%S-')
        nf=re.sub('.part$', '', f)
        print('old:'+f)
        print('new:'+dt+nf)
        if write:
            os.rename(f, dt+nf)

#main
os.chdir('/Users/kazoku/Desktop/book/')
print('pwd :'+os.getcwd())

ls=glob.glob('[!@]*') # @じゃないファイルのリスト

myrename()
res = raw_input('書き換えてよい？ Y="" / N=other >')
print res

if  res == '' :
    print 'リネーム実行'
    myrename(True)

print '終了'