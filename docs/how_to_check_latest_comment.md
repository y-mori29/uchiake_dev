# 最新のコメントの確認方法

このドキュメントでは、CSVからアップロードされたユーザーの投稿に対する最新のコメントを確認する方法について説明します。

## 1. TablePlusのインストール

### macOS

**Homebrew経由でのインストール（推奨）:**
```bash
brew install --cask tableplus
```

**公式サイトからのダウンロード:**
1. [TablePlus公式サイト](https://tableplus.com/)にアクセス
2. 「Download for macOS」をクリック
3. ダウンロードしたdmgファイルを開いてインストール

### Windows

1. [TablePlus公式サイト](https://tableplus.com/)にアクセス
2. 「Download for Windows」をクリック
3. ダウンロードしたexeファイルを実行してインストール

### Linux

1. [TablePlus公式サイト](https://tableplus.com/)にアクセス
2. 「Download for Linux」をクリック
3. AppImageファイルをダウンロードして実行

## 2. データベース接続設定

### 接続情報の準備

#### データベース接続情報

| 項目 | 値 | 説明 |
|------|-----|------|
| Host | `patient-voice-prod-rds-instance-db.c5m6gy60qgre.ap-northeast-1.rds.amazonaws.com` | RDSエンドポイント |
| Port | `5432` | PostgreSQLのデフォルトポート |
| Database | `mydatabase` | データベース名 |
| User | `postgres` | ユーザー名 |
| Password | `lHsEibSuxmeN0Equfqy4SNhInqTAWXrZ` | パスワード |

#### SSH接続情報

| 項目 | 値 | 説明 |
|------|-----|------|
| SSH Host | `43.207.235.163` | EC2インスタンスのIPアドレス |
| SSH Port | `22` | SSHのデフォルトポート |
| SSH User | `ubuntu` | EC2のデフォルトユーザー |
| SSH Key | `~/.ssh/id_rsa` | SSH秘密鍵のパス |

### 接続設定

RDSに直接接続できない場合は、EC2インスタンス経由でSSH接続を使用します：

1. **SSH設定を有効化**
   - 接続設定画面で「Use SSH」をチェック

2. **SSH情報を入力**
   ```
   SSH Host: 43.207.235.163
   SSH Port: 22
   SSH User: ubuntu
   SSH Key: ~/.ssh/id_rsa
   ```

3. **データベース接続情報（SSH経由の場合）**
   ```
   Name: Patient Voice DB (via SSH)
   Host: patient-voice-prod-rds-instance-db.c5m6gy60qgre.ap-northeast-1.rds.amazonaws.com
   Port: 5432
   User: postgres
   Password: lHsEibSuxmeN0Equfqy4SNhInqTAWXrZ
   Database: mydatabase
   Use SSH: ✓
   ```

## 3. SQLクエリの実行

### 基本クエリ：CSVユーザーの投稿に対する最新コメント100件

```sql
SELECT 
    c.id AS comment_id,
    c.content AS comment_content,
    c."createdAt" AS comment_created_at,
    cu.name AS commenter_name,
    cu."foreignId" AS commenter_foreign_id,
    p.id AS post_id,
    p.title AS post_title,
    pu.name AS post_author_name,
    pu."foreignId" AS post_author_foreign_id,
    cat.name AS category_name
FROM 
    "Comment" c
    INNER JOIN "User" cu ON c."userId" = cu.id
    INNER JOIN "Post" p ON c."postId" = p.id
    INNER JOIN "User" pu ON p."userId" = pu.id
    INNER JOIN "Category" cat ON p."categoryId" = cat.id
WHERE 
    pu."foreignId" LIKE 'dummydummy:%'
ORDER BY 
    c."createdAt" DESC
LIMIT 100;
```

### 詳細クエリ：コメント統計情報付き

```sql
SELECT 
    c.id AS comment_id,
    c.content AS comment_content,
    c."createdAt" AS comment_created_at,
    cu.name AS commenter_name,
    cu."foreignId" AS commenter_foreign_id,
    cu.gender AS commenter_gender,
    p.id AS post_id,
    p.title AS post_title,
    p."createdAt" AS post_created_at,
    pu.name AS post_author_name,
    pu."foreignId" AS post_author_foreign_id,
    cat.name AS category_name,
    -- 投稿に対するコメント数
    (SELECT COUNT(*) FROM "Comment" WHERE "postId" = p.id) AS total_comments_on_post,
    -- コメント投稿者の総コメント数
    (SELECT COUNT(*) FROM "Comment" WHERE "userId" = cu.id) AS commenter_total_comments
FROM 
    "Comment" c
    INNER JOIN "User" cu ON c."userId" = cu.id
    INNER JOIN "Post" p ON c."postId" = p.id
    INNER JOIN "User" pu ON p."userId" = pu.id
    INNER JOIN "Category" cat ON p."categoryId" = cat.id
WHERE 
    pu."foreignId" LIKE 'dummydummy:%'
ORDER BY 
    c."createdAt" DESC
LIMIT 100;
```

### 期間指定クエリ：過去7日間のコメント

```sql
SELECT 
    c.id AS comment_id,
    c.content AS comment_content,
    c."createdAt" AS comment_created_at,
    cu.name AS commenter_name,
    p.title AS post_title,
    pu.name AS post_author_name,
    cat.name AS category_name
FROM 
    "Comment" c
    INNER JOIN "User" cu ON c."userId" = cu.id
    INNER JOIN "Post" p ON c."postId" = p.id
    INNER JOIN "User" pu ON p."userId" = pu.id
    INNER JOIN "Category" cat ON p."categoryId" = cat.id
WHERE 
    pu."foreignId" LIKE 'dummydummy:%'
    AND c."createdAt" >= NOW() - INTERVAL '7 days'
ORDER BY 
    c."createdAt" DESC;
```

### カテゴリ別コメント統計

```sql
SELECT 
    cat.name AS category_name,
    COUNT(c.id) AS comment_count,
    COUNT(DISTINCT p.id) AS posts_with_comments,
    COUNT(DISTINCT cu.id) AS unique_commenters,
    MIN(c."createdAt") AS first_comment,
    MAX(c."createdAt") AS latest_comment
FROM 
    "Comment" c
    INNER JOIN "User" cu ON c."userId" = cu.id
    INNER JOIN "Post" p ON c."postId" = p.id
    INNER JOIN "User" pu ON p."userId" = pu.id
    INNER JOIN "Category" cat ON p."categoryId" = cat.id
WHERE 
    pu."foreignId" LIKE 'dummydummy:%'
GROUP BY 
    cat.id, cat.name
ORDER BY 
    comment_count DESC;
```

## 4. クエリの実行方法

### TablePlusでのSQL実行

1. **SQLエディタを開く**
   - 接続後、上部の「SQL」ボタンをクリック
   - または `Cmd+T` (macOS) / `Ctrl+T` (Windows)

2. **クエリを入力**
   - 上記のSQLクエリをコピー&ペースト

3. **クエリを実行**
   - `Cmd+R` (macOS) / `Ctrl+R` (Windows)
   - または「Run」ボタンをクリック

4. **結果の確認**
   - 下部のタブで結果を確認
   - 必要に応じてCSVエクスポートも可能

### 結果の解釈

**基本クエリの結果カラム:**
- `comment_id`: コメントの一意ID
- `comment_content`: コメントの内容
- `comment_created_at`: コメント投稿日時
- `commenter_name`: コメント投稿者名
- `post_title`: 元投稿のタイトル
- `post_author_name`: 元投稿の作成者名
- `category_name`: 投稿のカテゴリ

## 5. 便利なフィルター

### 特定のカテゴリのコメントのみ表示

```sql
-- 基本クエリに以下の条件を追加
AND cat.name = 'ホルモン・代謝'
```

### 特定の期間のコメントのみ表示

```sql
-- 基本クエリに以下の条件を追加
AND c."createdAt" BETWEEN '2025-01-01' AND '2025-01-31'
```

### コメント内容で検索

```sql
-- 基本クエリに以下の条件を追加
AND c.content ILIKE '%キーワード%'
```

## 6. トラブルシューティング

### 接続エラー

1. **接続情報の確認**
   - IPアドレス、ポート、認証情報を再確認

2. **ネットワーク接続の確認**
   ```bash
   # EC2インスタンスへの接続確認
   ping 43.207.235.163
   
   # RDSエンドポイントへの接続確認（EC2経由）
   ssh -i ~/.ssh/id_rsa ubuntu@43.207.235.163 "telnet patient-voice-prod-rds-instance-db.c5m6gy60qgre.ap-northeast-1.rds.amazonaws.com 5432"
   ```

3. **ファイアウォール・セキュリティグループ設定**
   - EC2のセキュリティグループでSSHポート（22）が開放されているか確認
   - RDSのセキュリティグループでPostgreSQLポート（5432）がEC2からアクセス可能か確認

### クエリエラー

1. **テーブル名の確認**
   - PostgreSQLでは大文字小文字を区別するため、ダブルクォートが必要

2. **権限の確認**
   - 使用しているユーザーに適切な読み取り権限があるか確認

### パフォーマンス問題

1. **LIMIT句の使用**
   - 大量データの場合は適切なLIMITを設定

2. **インデックスの確認**
   - 頻繁に使用するカラムにインデックスが設定されているか確認

## 7. データエクスポート

### CSV形式でのエクスポート

1. **クエリ実行後**
   - 結果画面で右クリック
   - 「Export」→「CSV」を選択

2. **エクスポート設定**
   - ファイル名と保存場所を指定
   - 必要に応じてエンコーディングを設定（UTF-8推奨）

### Excel形式でのエクスポート

1. **結果画面で右クリック**
   - 「Export」→「Excel」を選択

2. **ファイル保存**
   - 適切な場所に保存

## 8. セキュリティに関する注意事項

### 認証情報の管理

1. **パスワードの取り扱い**
   - データベースパスワードは機密情報として適切に管理してください
   - 共有する際は安全な方法を使用してください

2. **SSH鍵の管理**
   - SSH秘密鍵（`~/.ssh/id_rsa`）は適切な権限設定（600）で保護してください
   - 鍵ファイルを他者と共有しないでください

3. **接続の制限**
   - 本番データベースへのアクセスは必要最小限に留めてください
   - 作業完了後は接続を切断してください

### ネットワークセキュリティ

- RDSインスタンスはプライベートサブネット内に配置されています
- 直接接続できない場合は、EC2インスタンス経由でのSSH接続を使用してください
- セキュリティグループの設定により、適切なアクセス制御が行われています

これで、CSVからアップロードされたユーザーの投稿に対する最新のコメントを効率的かつ安全に確認できます。
