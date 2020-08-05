## tekuteku
テイクアウトしたお店と写真、感想を共有するSNSです。
かんたんログインから会員登録なしでログインできます。

[URL] https://tekuteku.vercel.app/

<img width="1421" alt="スクリーンショット 2020-08-06 0 24 06" src="https://user-images.githubusercontent.com/58762157/89431922-7c9f8600-d77b-11ea-9cc5-c38411b0888f.png">

## 機能一覧
- Twitterログイン認証
- 会員登録
- ログアウト
- フォロー/アンフォロー
- いいね/いいね取り消し
- いいねのカウント
- コメント
- 投稿時店舗名のサジェスト機能
- ぐるなびAPIレストラン検索機能
- 画像投稿機能
- 投稿一覧
- フォローしている人の投稿一覧

## 使用技術
フロントエンド
- HTML
- CSS
- JavaScript
- Vue.js
- Nuxt.js
- tailwindcss
- ElementUI

バックエンド
- Firebase
- Firebase Authentication
- Cloud Firestore
- Cloud Storage 

デプロイ
- Vercel

## こだわりポイント
- 作成時に、期限を設けて機能の優先度を決めて取り組み、１ヶ月で作成した
- ユーザーのリクエストからぐるなびAPIを返して、お店のURLにとべるようにした
    - その際に、ユーザーのinputのイベントを監視し、処理が重くならないようthrottle-debounceで間引きした
- サービスの使い方、機能が直感的にわかるようUIを工夫した。
- UXを考え、下タブを採用した。
    - 片手で操作できる
    - 一目でわかる
    - タップ数が一回で済む
- 使う色に統一感を出した
- デザインにも興味があるため、トップ画像を自分で作成した
- 作成開始から毎日の振り返りを書いています。
    - https://github.com/rica441/tekuteku.Development-log
