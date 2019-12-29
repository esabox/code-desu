#!/usr/bin/env python3
# -*- coding: utf-8 -*-

# ファイルネーム書き換え、タイムスタンプ監視もつけたい。

import argparse
import os
import datetime
import glob
import sys
import time

#ファイルオープンコマンド **file**を開く
default_cmd = 'open -a "Visual Studio Code.app" **file** --args -r'
# default_cmd = 'open -a TextEdit.app **file**'
# default_cmd=  'open -a CotEditor.app **file**'


# app_dir = os.path.dirname(__file__)+'/'
# #appフォルダにリネームキャッシュ作ろうと思ったけど、2つ動かすと競合してファイルぐっちゃになった。
# ファイルネームも乱数を使うべき
# print('app_dir:', app_dir)


def get_args():
    # 準備
    parser = argparse.ArgumentParser(description='エディター開いて編集→リネーム\
        フォルダー名変更は、フォルダのみにする')

    parser.add_argument(
        "-c", "--command", help="ex1) -c 'open -a CotEditor.app **file**'")
    parser.add_argument("-w", "--workDir", help="オプション")
    parser.add_argument("-r",
                        "--recursive", help="再帰検索・上位でやると危険かも", action="store_true")

    # 結果を受ける
    args = parser.parse_args()

    return (args)


def write_list(lsArr, txtPath):
    '''テキストにファイルリストを書き込み
    '''
    buff = '\n'.join(lsArr)
    print(buff)
    try:
        # file = open(name_list_filename, 'x')  # 排他的、ファイルが存在する時はエラーらしい。
        file = open(txtPath, 'w')  # デバッグ用
    except FileExistsError as e:
        print(e, '\n--終了--')
        sys.exit()
    else:
        file.write(buff)
        file.close()


def read_listfile(file_path):
    """ファイルを読み込んで配列にして返す

        Args:
            file_path (str): Description of param2
        Returns:
            list: テキストファイルの行の配列
    """
    file = open(file_path, 'r')
    contents = file.read()
    file.close()

    # すべての内容を表示する
    textArr = contents.splitlines()
    return textArr


def cheak_rename(textArr, lsArr, rename=False):
    if not rename:
        print('変更予定')
    for text, ls in zip(textArr, lsArr):
        # print(text, ls)
        if (text != ls):
            print('old:'+ls)
            print('new:' + text)
            if rename:
                if not os.path.exists(text):
                    os.rename(ls, text)  # 同名は上書きされる注意
                else:
                    print('変更先に既にファイルあったからキャンセル')
            print()


def den_exit(txtPath, msg):
    '''ファイルを削除して終了
    '''
    os.remove(txtPath)
    print(msg)
    sys.exit()


def main():
    print(sys.version)
    print(sys.argv)
    args = get_args()
    print(args.command)

    isodate = datetime.datetime.now().isoformat(timespec='seconds')
    print(isodate)
    # listfile_name = '__rename__.txt'
    txtPath = '__rename__'+isodate+'.txt'
    # リストファイルにタイムスタンプで安全性高めようとしたけど、エディターに溜まって邪魔すぎた。
    # 排他的にしてるしまあ必要ないか、リストの最上位に乱数とかもまあいいか。
    # 同名のファイルでも消すとゾンビみたいにエディターに残って邪魔だった。

    print('Print Working Dir :' + os.getcwd() + '\n')

    # working dir の中身のリストを作る
    lsArr = glob.glob('**', recursive=args.recursive)

    # リストファイルに書き込み
    write_list(lsArr, txtPath)

    # テキストファイルをエディターで開く
    # グローバル変数も読むだけなら大丈夫、書き換えでエラー global 変数 が必要
    cmd2 = args.command or default_cmd
    os.system(cmd2.replace('**file**', txtPath))

    # タイムスタンプが変わるまで監視
    timestamp = os.path.getmtime(txtPath)
    for i in range(3000):
        i = i*0
        print(".", end="", flush=True)
        time.sleep(1)
        if timestamp != os.path.getmtime(txtPath):
            print('\n')
            break

    # 変更されたテキストファイルを配列に
    textArr = read_listfile(txtPath)

    # 長さチェック、違ったら終わり
    if len(lsArr) != len(textArr):
        den_exit(txtPath, 'エラー、リストの長さが違う')

    # リネーム候補をテスト
    cheak_rename(textArr, lsArr, rename=False)

    # リネーム実行確認
    res = input('\n[rename？ Yes="" / No=other ]:')
    if res == '':
        print('リネーム実行')
        cheak_rename(textArr, lsArr, rename=True)

    # 編集ファイルを削除して終了
    den_exit(txtPath, '正常に終了')


if __name__ == '__main__':
    main()
