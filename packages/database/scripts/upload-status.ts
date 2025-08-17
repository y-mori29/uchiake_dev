import fs from "fs";
import path from "path";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface UploadProgress {
  totalRows: number;
  processedRows: number;
  successfulRows: number;
  failedRows: number;
  lastProcessedIndex: number;
  errors: Array<{
    row: number;
    field: string;
    value: string;
    message: string;
  }>;
  startTime: Date;
  endTime?: Date;
}

const PROGRESS_FILE = path.join(process.cwd(), "upload-progress.json");

const showDatabaseInfo = async (): Promise<void> => {
  try {
    console.log("🗄️  データベース情報:");
    
    const categoriesCount = await prisma.category.count();
    const questionsCount = await prisma.question.count();
    const postsCount = await prisma.post.count();
    const usersCount = await prisma.user.count();
    
    console.log(`   カテゴリ数: ${categoriesCount}`);
    console.log(`   質問数: ${questionsCount}`);
    console.log(`   投稿数: ${postsCount}`);
    console.log(`   ユーザー数: ${usersCount}`);
    
    if (categoriesCount > 0) {
      const categories = await prisma.category.findMany({
        select: { name: true },
        orderBy: { order: "asc" }
      });
      console.log(`   利用可能なカテゴリ: ${categories.map(c => c.name).join(", ")}`);
    }
    
  } catch (error) {
    console.warn("⚠️  データベース情報の取得に失敗しました:", error);
  }
};

const showStatus = async (): Promise<void> => {
  // データベース情報を表示
  await showDatabaseInfo();
  console.log("");
  
  if (!fs.existsSync(PROGRESS_FILE)) {
    console.log("📄 進捗ファイルが見つかりません。アップロードは実行されていないか、既に完了しています。");
    return;
  }

  try {
    const data = fs.readFileSync(PROGRESS_FILE, "utf-8");
    const progress: UploadProgress = JSON.parse(data);

    console.log("📊 アップロード進捗状況");
    console.log("=" .repeat(50));
    console.log(`開始時刻: ${new Date(progress.startTime).toLocaleString()}`);
    
    if (progress.endTime) {
      console.log(`完了時刻: ${new Date(progress.endTime).toLocaleString()}`);
      const duration = Math.round((new Date(progress.endTime).getTime() - new Date(progress.startTime).getTime()) / 1000);
      console.log(`処理時間: ${duration}秒`);
    } else {
      console.log("状態: 実行中");
    }
    
    console.log("");
    console.log("📈 処理状況:");
    console.log(`総行数: ${progress.totalRows}`);
    console.log(`処理済み: ${progress.processedRows} (${Math.round((progress.processedRows / progress.totalRows) * 100)}%)`);
    console.log(`成功: ${progress.successfulRows}`);
    console.log(`失敗: ${progress.failedRows}`);
    console.log(`最後に処理した行: ${progress.lastProcessedIndex + 1}`);

    if (progress.errors.length > 0) {
      console.log("");
      console.log("❌ エラー詳細:");
      progress.errors.forEach((error, index) => {
        console.log(`${index + 1}. 行${error.row}: ${error.message}`);
        if (error.field !== "database") {
          console.log(`   フィールド: ${error.field}, 値: "${error.value}"`);
        }
      });
    }

    if (!progress.endTime) {
      console.log("");
      console.log("💡 ヒント:");
      console.log("- アップロードを再開するには: pnpm run upload");
      console.log("- 進捗をリセットするには: rm upload-progress.json");
    }

  } catch (error) {
    console.error("❌ 進捗ファイルの読み込みに失敗しました:", error);
  }
};

const resetProgress = (): void => {
  if (fs.existsSync(PROGRESS_FILE)) {
    fs.unlinkSync(PROGRESS_FILE);
    console.log("✅ 進捗ファイルを削除しました。新しいアップロードを開始できます。");
  } else {
    console.log("📄 進捗ファイルが見つかりません。");
  }
};

const main = async (): Promise<void> => {
  const command = process.argv[2];

  try {
    switch (command) {
      case "status":
      case undefined:
        await showStatus();
        break;
      case "reset":
        resetProgress();
        break;
      default:
        console.log("使用方法:");
        console.log("  pnpm run upload:status        # 進捗状況を表示");
        console.log("  pnpm run upload:status reset  # 進捗をリセット");
    }
  } catch (error) {
    console.error("❌ エラーが発生しました:", error);
  } finally {
    await prisma.$disconnect();
  }
};

main(); 