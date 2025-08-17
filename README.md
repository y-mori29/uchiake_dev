# 開発環境構築

## Mac

### Brew

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### Node

```bash
brew install asdf

# bashのとき
echo -e "\n. $(brew --prefix asdf)/libexec/asdf.sh" >> ~/.bashrc
source ~/.bashrc

# zshのとき
echo -e "\n. $(brew --prefix asdf)/libexec/asdf.sh" >> ~/.zshrc
source ~/.zshrc

# 以降共通
asdf plugin-add nodejs https://github.com/asdf-vm/asdf-nodejs.git
asdf install nodejs latest:20
asdf global nodejs latest:20
node -v #でinstallされたバージョンをチェック
```

### pnpm, turboをinstall

```bash
corepack enable
corepack prepare pnpm@9.15.1 --activate
pnpm add -g turbo
```

### DockerのInstall

```bash
brew install --cask rancher
```

Rancher Desktopを起動する

### Cloneとプロジェクトの初期化

注意: 前もってgithubにssh keyを登録すること。

```bash
git clone git@github.com:medicanvas/patient-voice.git
cd patient-voice
pnpm install
```

### Prismaのinit

dbのスキーマをupdateするたびに実行すること。

```bash
# patient-voice/
turbo db:generate
```

# 実行

```bash
# patient-voice/
docker-compose up --build -d
export DATABASE_URL="postgresql://postgres:testpassword@localhost:5432/mydatabase"
turbo db:push
turbo db:seed
```

http://localhost:8080 にアクセス

# DBの初期化

```bash
docker-compose down
```

# Update client lib

```bash
openapi-generator-cli generate -i http://localhost:8080/document-json -g typescript-fetch -o ./apps/web/src/client
```
