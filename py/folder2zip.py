#!/usr/bin/env python3
# -*- coding: utf-8 -*-

# フォルダの中のフォルダを無圧縮zip化

import os
import glob
import re
import sys
import shutil

gomibako = '/Users/kazoku/.Trash/'


def main():
    print(sys.version)
    print(sys.argv)
    work_dir = '/Users/kazoku/Desktop/book/'

    # workdirの引数があれば
    if 1 < len(sys.argv):
        work_dir = sys.argv[1]

    os.chdir(work_dir)
    print('pwd :'+os.getcwd())

    ls = glob.glob('*/')  # フォルダのみ

    zipnisuru(ls)
    res = input('\n[rename？ Yes="" / No=other ]:')
    if res == '':
        print('リネーム実行')
        zipnisuru(ls, True)

    print('終了')


def zipnisuru(ls, write=False):
    for f in ls:
        # print(f)
        nf = re.sub('/', '.zip', f)

        print('new: '+nf)
        cmd = 'zip -r --quiet -0 "' + nf + '" "' + f + '"'
        # フォルダを圧縮するときは単一でも再帰必須

        if write:
            os.system(cmd)
            print(cmd)
            # os.remove(f)  #ファイル一個か、空フォルダしか無理
            # shutil.rmtree(f) #ゴミ箱経由にならない
            shutil.move(f, gomibako)
    pass

# zip -r -n ".jpg:.JPG:.jpeg:.JPEG:.gif:.GIF" "$zipf" "$zipd" -x ".DS_Store"
# -r オプションは、ZIPの入力ファイルにディレクトリがある場合、再帰的にたどっていくことを指示します。
# -n オプションは、引数として与えられた拡張子を持つファイルを、圧縮しないように指示します。tiffやpngも入れてもいいかもしれません。大文字小文字の違いを無視できればよいのですが、ちょっと冗長になっています。私は、テキストファイルなどは圧縮したいので、このオプションを使っています。
# -nオプションの代わりに、-0オプションを使えばすべてのファイルが無圧縮になります。-# (#は0から9の数字が入ります)の形式のオプションは、圧縮スピードを相対的に指定するのですが、-0は無圧縮の指定になっています。-0の方が無圧縮ファイル作成の目的に合う人はこちらの方がよいと思います。
# $zipfは、作成するZIPファイル名が入った変数です。
# $zipdは、作成対象のディレクトリ名が入った変数です。両方共ダブルクォーテーションで囲んであるのは、文字列中にスペースがあるとシェルが別々の引数として処理するため、予防的に入れています。
# 最後の-xオプションは、ZIPの対象としないファイルを指定します。.DS_StoreはFinderが不可視ファイルとして作る場合がありますが、今回はZIPファイルに含める必要はないため除外するようにしています。
# zipコマンドの詳細はターミナルからmanコマンドで調べることもできます。


if __name__ == '__main__':
    main()
