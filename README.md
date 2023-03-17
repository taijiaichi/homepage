# 愛知県太極拳協会ホームページ

愛知県太極拳協会のホームページです。

GitHub Pages の機能を用いて公開されております。
<https://taijiaichi.github.io/homepage/>

なお、本README.mdの内容は非技術者にとって読みやすいように多少厳密性を犠牲に記載してあります。予めご了承ください。

## フォルダ構成

.
├── default_img (デザイン用パーツ画像)
└── docs (ホームページ本体)
    ├── css (ホームページ用CSSファイル)
    ├── data (表示用データ)
    │   └── regularMeetingImg (定例会案内画像)
    ├── img (ホームページ用画像)
    ├── js (ホームページ用JavaScript)
    ├── lib (ホームページ用サードパーティライブラリ)
    └── mov (ホームページ用動画)

## データ更新方法

"docs/data"フォルダ内の編集を原則とし、それ以外のフォルダの変更についてはWebエンジニアに対して依頼してください。
なお、バックアップについてはgithubの機能で自動で取得されている為、手動で取得する必要はございません。

### CSVファイル共通

"docs/data"フォルダ内の拡張子がcsvとなっている各ファイルは以下の通りです。

+ annualEvents.csv (年間行事一覧)
+ committee.csv (協会役員一覧)
+ taichiLessons.csv (教室案内 - 太極拳クラス)
+ tyokenLessons.csv (教室案内 - 長拳クラス)

上記のファイルを編集する場合は以下の手順を実施してください。
なお、csvファイルの特性上、文字列に半角のカンマを入れる事が出来ない事にご注意ください。

1. GitHubにログインする。
1. ブラウザのURL欄に"https://github.com/taijiaichi/homepage/tree/main/docs/data"と入力する。
1. 編集したいファイルをクリックする。(間にフォルダが挟まっている場合は、フォルダを順にクリックする)
1. ファイル内容が表示されているエリア上部のペンのマークをクリックする。
1. ファイルの中身を編集する。(この際、編集した行のカンマの数が先頭行と一致することを確認する)
1. 画面下部の「Commit changes」項目の上段に編集目的、下段に具体的な編集内容を記載し、緑色の「Commit changes」ボタンをクリックする。

### 定例会ファイル

定例会の画像ファイルについては、"yyyy-mm.png"(yyyyは年度、mmは月)という名称で"docs/data/regularMeetingImg"内にアップロードしてください。
アップロードする場合は以下の手順を実施してください。

1. 「定例会のご案内」の画像ファイルをpng形式、yyyy-mm.pngという名称で作成する。
1. GitHubにログインする。
1. ブラウザのURL欄に"https://github.com/taijiaichi/homepage/tree/main/docs/data/regularMeetingImg"と入力する。
1. 「Add file > Upload files」をクリックする。
1. 用意しておいた画像ファイルを「Drag files here to add them to your repository」へドラッグ&ドロップする。
1. 画面下部の「Commit changes」項目の上段に編集目的、下段に具体的な編集内容を記載し、緑色の「Commit changes」ボタンをクリックする。

## バックアップ確認方法

以下のURLからご確認ください。
<https://github.com/taijiaichi/homepage/commits/main>

## 利用している外部ツール

### Bulma

<https://bulma.io/>

CSS フレームワーク。サイト全体のデザインに利用しております。

### フォームメーラー

<https://www.form-mailer.jp/>

フォーム作成ツール。メールフォームに利用しております。

### FullCalendar

<https://fullcalendar.io/>

カレンダー機能。協会の教室や活動についてカレンダー形式で表示するために利用しております。
