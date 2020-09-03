## tekuteku
テイクアウトしたお店と写真、感想を共有するSNSです。
かんたんログインから会員登録なしでログインできます。

[URL] https://tekuteku.vercel.app/

<img width="1402" alt="スクリーンショット 2020-08-09 22 17 35" src="https://user-images.githubusercontent.com/58762157/89733134-52590b80-da8e-11ea-826d-ac847121ee98.png">

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
- 機能ごとにコンポーネントを分割し、再利用性、保守性を高めた。
    
## 課題
- 期日に間に合わせることを第一優先にした結果、テストが書けなかったので
JESTやVisual regression testでテストする
- いいねした投稿を表示
- 全ユーザーの投稿から、キーワード検索する機能
- UIにオリジナル性をだす
- フォロー/フォロワーをマイページで完結させる
- 位置情報から近くのtekuteku.店舗をマップで探せる
