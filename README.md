# Todoリストアプリ

## 使用技術一覧
- React (Next.js)
- TypeScript
- Supabase
- Chakra UI
- HTML/CSS

## アプリをつくったきっかけ
歯科医院のバックヤードで使える在庫管理系のアプリを作りたかったが、なにから手をつければいいかなかなかまとまらないのでリストアップして可視化できる媒体を作成。

## アプリ機能説明
- 新規登録＆ログイン (Supabase認証を使用)
- タスクの登録
- タスクの編集
- ステータスの変更
- タスクの削除
- フィルター機能 (ステータス別表示)
- ソート機能 (昇順/降順)

## アプリURL
[Todoリストアプリ](https://todo-list-r1n7opmad-nami73kans-projects.vercel.app/)

## テストアカウント
- メールアドレス：
- パスワード：Password1234123

## 開発環境の構築方法

### 構築環境
- OS: Windows 11
- フレームワーク: Next.js
- データベース: Supabase

### インストール手順

1. リポジトリをクローンします。
```bash
git clone https://github.com/nami73kan/todo-list.git
```

2. クローンしたディレクトリに移動します。
```bash
cd todo-list
```

3. 環境変数ファイルを作成します。
```bash
cp .env.example .env
```

4. 必要なパッケージをインストールします。
```bash
npm install
```

5. ローカルサーバーを起動します。
```bash
npm run dev
```

6. Supabaseの環境設定
- Supabaseプロジェクトを作成し、APIキーとデータベースURLを.envに追加します。
```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

7. データベースのセットアップ
- SupabaseのSQLエディタを使ってテーブルを作成します。
```
CREATE TABLE todos (
  id SERIAL PRIMARY KEY,
  title TEXT,
  status TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```


## Languages
- TypeScript: 70%
- JavaScript: 20%
- HTML/CSS: 10%

---
© 2025  [GitHub リポジトリ](https://github.com/nami73kan/todo-list.git)

