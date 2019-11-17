#!/usr/bin/env python
# -*- coding: utf-8 -*-

#@がついてないファイルに更新日の@yyyymmddhhmmss-をつける。
#けっこう危険、使い方、変えたいフォルダまでcdして、このスクリプトを起動
#まず結果予測だけ表示、inputで最終確認

import os
import datetime
import glob
import re
import sys
import shutil

print(sys.version_info)
def myrename(write=False):
    i=0
    for f in ls:
        #print(f)
        i=i+1 #i++は無理
        dt = datetime.datetime.fromtimestamp(os.path.getmtime(f))
        dt= dt.strftime('@%Y%m%d%H%M%S-')
        # nf=re.sub('.part$', '', f)
        nf=re.sub('/', '.zip', f)
        # print('old: '+f)
        
        print('new: '+nf)
        cmd = 'zip -r --quiet -0 "' + nf + '" "' + f + '"'
        #フォルダを圧縮するときは単一でも再帰必須
        #--quiet
        # print(cmd)
        if write:
            os.system(cmd)
            print(cmd)
            # os.remove(f)  #ファイル一個か、空フォルダしか無理
            # shutil.rmtree(f) #ゴミ箱経由にならない
            shutil.move(f,gomibako)

        #     os.rename(f, dt+nf)
        # if i==20:
        #     break #テスト用

# zip -r -n ".jpg:.JPG:.jpeg:.JPEG:.gif:.GIF" "$zipf" "$zipd" -x ".DS_Store"
# -r オプションは、ZIPの入力ファイルにディレクトリがある場合、再帰的にたどっていくことを指示します。
# -n オプションは、引数として与えられた拡張子を持つファイルを、圧縮しないように指示します。tiffやpngも入れてもいいかもしれません。大文字小文字の違いを無視できればよいのですが、ちょっと冗長になっています。私は、テキストファイルなどは圧縮したいので、このオプションを使っています。
# -nオプションの代わりに、-0オプションを使えばすべてのファイルが無圧縮になります。-# (#は0から9の数字が入ります)の形式のオプションは、圧縮スピードを相対的に指定するのですが、-0は無圧縮の指定になっています。-0の方が無圧縮ファイル作成の目的に合う人はこちらの方がよいと思います。
# $zipfは、作成するZIPファイル名が入った変数です。
# $zipdは、作成対象のディレクトリ名が入った変数です。両方共ダブルクォーテーションで囲んであるのは、文字列中にスペースがあるとシェルが別々の引数として処理するため、予防的に入れています。
# 最後の-xオプションは、ZIPの対象としないファイルを指定します。.DS_StoreはFinderが不可視ファイルとして作る場合がありますが、今回はZIPファイルに含める必要はないため除外するようにしています。
# zipコマンドの詳細はターミナルからmanコマンドで調べることもできます。

#main
# print('\n')
work_dir='/Users/kazoku/Desktop/book/'
gomibako='/Users/kazoku/.Trash/'

print('pwd :'+os.getcwd()) #Print Working Dir
os.chdir(work_dir)
print('pwd :'+os.getcwd())

ls=glob.glob('*/') # フォルダのみ

myrename()
res = raw_input('書き換えてよい？ Y="" / N=other >')
print res

if  res == '' :
    print 'リネーム実行'
    myrename(True)

print '終了'