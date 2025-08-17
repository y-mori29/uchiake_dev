import { PrismaClient, Prisma, Gender } from "@prisma/client";
import fs from "fs";
import csv from "csv-parser";
import path from "path";

const prisma = new PrismaClient();

interface CsvRow {
  date: string;
  title: string;
  q1: string;
  q2: string;
  q3: string;
  q4: string;
  q5: string;
  genre: string;
  age: string;
  gender: string;
  name: string;
}

interface ValidationError {
  row: number;
  field: string;
  value: string;
  message: string;
}

interface UploadProgress {
  totalRows: number;
  processedRows: number;
  successfulRows: number;
  failedRows: number;
  lastProcessedIndex: number;
  errors: ValidationError[];
  startTime: Date;
  endTime?: Date;
}

const PROGRESS_FILE = path.join(process.cwd(), "upload-progress.json");
const CSV_FILE_PATH = path.join(process.cwd(), "../../answer_seed.csv");

// データベースから取得するデータ
let VALID_CATEGORIES: string[] = [];
let QUESTIONS_COUNT = 0;

const convertGender = (japaneseGender: string): Gender => {
  if (japaneseGender === "男") {
    return Gender.MALE;
  } else if (japaneseGender === "女") {
    return Gender.FEMALE;
  }
  return Gender.UNKNOWN;
};

const calculateBirthday = (age: string): Date => {
  const ageNumber = parseInt(age.replace(/[^\d]/g, ""));
  if (isNaN(ageNumber)) {
    throw new Error(`Invalid age format: ${age}`);
  }
  const currentDate = new Date();
  const birthYear = currentDate.getFullYear() - ageNumber;
  return new Date(birthYear, currentDate.getMonth(), currentDate.getDate());
};

const initializeValidationData = async (): Promise<void> => {
  console.log("🔍 データベースからバリデーション用データを取得しています...");
  
  try {
    // カテゴリを取得
    const categories = await prisma.category.findMany({
      select: { name: true },
      orderBy: { order: "asc" }
    });
    VALID_CATEGORIES = categories.map(c => c.name);
    
    // 質問数を取得
    const questionsCount = await prisma.question.count();
    QUESTIONS_COUNT = questionsCount;
    
    console.log(`✅ カテゴリ ${VALID_CATEGORIES.length}件、質問 ${QUESTIONS_COUNT}件を取得しました`);
    
    if (VALID_CATEGORIES.length === 0) {
      throw new Error("カテゴリが見つかりません。先にdb:seedを実行してください。");
    }
    
    if (QUESTIONS_COUNT === 0) {
      throw new Error("質問が見つかりません。先にdb:seedを実行してください。");
    }
    
  } catch (error) {
    console.error("❌ データベースからのデータ取得に失敗しました:", error);
    throw error;
  }
};

const validateRow = (row: CsvRow, rowIndex: number): ValidationError[] => {
  const errors: ValidationError[] = [];

  // 必須フィールドのチェック
  if (!row.date?.trim()) {
    errors.push({
      row: rowIndex,
      field: "date",
      value: row.date,
      message: "日付が入力されていません"
    });
  } else {
    // 日付形式のチェック
    const dateObj = new Date(row.date);
    if (isNaN(dateObj.getTime())) {
      errors.push({
        row: rowIndex,
        field: "date",
        value: row.date,
        message: "日付の形式が正しくありません"
      });
    }
  }

  if (!row.title?.trim()) {
    errors.push({
      row: rowIndex,
      field: "title",
      value: row.title,
      message: "タイトルが入力されていません"
    });
  }

  // 質問回答のチェック（動的に質問数に対応）
  for (let i = 1; i <= QUESTIONS_COUNT; i++) {
    const questionField = `q${i}` as keyof CsvRow;
    const questionValue = row[questionField];
    
    if (!questionValue?.trim()) {
      errors.push({
        row: rowIndex,
        field: questionField,
        value: questionValue || "",
        message: `質問${i}の回答が入力されていません`
      });
    }
  }

  if (!row.genre?.trim()) {
    errors.push({
      row: rowIndex,
      field: "genre",
      value: row.genre,
      message: "カテゴリが入力されていません"
    });
  } else if (!VALID_CATEGORIES.includes(row.genre.trim())) {
    errors.push({
      row: rowIndex,
      field: "genre",
      value: row.genre,
      message: `無効なカテゴリです。利用可能なカテゴリ: ${VALID_CATEGORIES.join(", ")}`
    });
  }

  if (!row.age?.trim()) {
    errors.push({
      row: rowIndex,
      field: "age",
      value: row.age,
      message: "年齢が入力されていません"
    });
  } else {
    try {
      calculateBirthday(row.age);
    } catch (error) {
      errors.push({
        row: rowIndex,
        field: "age",
        value: row.age,
        message: "年齢の形式が正しくありません"
      });
    }
  }

  if (!row.gender?.trim()) {
    errors.push({
      row: rowIndex,
      field: "gender",
      value: row.gender,
      message: "性別が入力されていません"
    });
  } else if (!["男", "女"].includes(row.gender.trim())) {
    errors.push({
      row: rowIndex,
      field: "gender",
      value: row.gender,
      message: "性別は「男」または「女」で入力してください"
    });
  }

  if (!row.name?.trim()) {
    errors.push({
      row: rowIndex,
      field: "name",
      value: row.name,
      message: "ユーザー名が入力されていません"
    });
  }

  return errors;
};

const readCsvFile = (): Promise<CsvRow[]> => {
  return new Promise((resolve, reject) => {
    const rows: CsvRow[] = [];
    
    if (!fs.existsSync(CSV_FILE_PATH)) {
      reject(new Error(`CSVファイルが見つかりません: ${CSV_FILE_PATH}`));
      return;
    }

    fs.createReadStream(CSV_FILE_PATH)
      .pipe(csv())
      .on("data", (row: CsvRow) => {
        rows.push(row);
      })
      .on("end", () => {
        resolve(rows);
      })
      .on("error", (error) => {
        reject(error);
      });
  });
};

const saveProgress = (progress: UploadProgress): void => {
  fs.writeFileSync(PROGRESS_FILE, JSON.stringify(progress, null, 2));
};

const loadProgress = (): UploadProgress | null => {
  if (!fs.existsSync(PROGRESS_FILE)) {
    return null;
  }
  
  try {
    const data = fs.readFileSync(PROGRESS_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.warn("進捗ファイルの読み込みに失敗しました:", error);
    return null;
  }
};

const validateAllRows = async (rows: CsvRow[]): Promise<ValidationError[]> => {
  console.log("📋 CSVデータのバリデーションを開始します...");
  
  const allErrors: ValidationError[] = [];
  
  for (let i = 0; i < rows.length; i++) {
    const errors = validateRow(rows[i], i + 1);
    allErrors.push(...errors);
    
    if ((i + 1) % 100 === 0) {
      console.log(`   ${i + 1}/${rows.length} 行のバリデーション完了`);
    }
  }
  
  console.log(`✅ バリデーション完了: ${rows.length}行中${allErrors.length}個のエラー`);
  return allErrors;
};

const uploadData = async (): Promise<void> => {
  console.log("🚀 CSVアップロード処理を開始します...");
  
  // データベースからバリデーション用データを取得
  await initializeValidationData();
  
  // 既存の進捗を確認
  let progress = loadProgress();
  let rows: CsvRow[];
  
  if (progress && progress.endTime) {
    console.log("⚠️  前回のアップロードは完了しています。新しいアップロードを開始しますか？");
    console.log("続行するには進捗ファイルを削除してください:", PROGRESS_FILE);
    return;
  }
  
  // CSVファイルを読み込み
  try {
    rows = await readCsvFile();
    console.log(`📁 CSVファイルを読み込みました: ${rows.length}行`);
  } catch (error) {
    console.error("❌ CSVファイルの読み込みに失敗しました:", error);
    return;
  }
  
  // バリデーション実行
  const validationErrors = await validateAllRows(rows);
  
  if (validationErrors.length > 0) {
    console.error("❌ バリデーションエラーが発生しました:");
    validationErrors.forEach(error => {
      console.error(`   行${error.row}: ${error.field} - ${error.message} (値: "${error.value}")`);
    });
    console.error("エラーを修正してから再実行してください。");
    return;
  }
  
  // 進捗の初期化または復元
  if (!progress) {
    progress = {
      totalRows: rows.length,
      processedRows: 0,
      successfulRows: 0,
      failedRows: 0,
      lastProcessedIndex: -1,
      errors: [],
      startTime: new Date()
    };
    saveProgress(progress);
  } else {
    console.log(`📊 前回の進捗を復元しました: ${progress.processedRows}/${progress.totalRows}行処理済み`);
  }
  
  // カテゴリとクエスチョンを取得
  const categories = await prisma.category.findMany();
  const questions = await prisma.question.findMany({ orderBy: { order: "asc" } });
  
  console.log("💾 データベースへの登録を開始します...");
  
  // データ登録処理
  for (let i = progress.lastProcessedIndex + 1; i < rows.length; i++) {
    const row = rows[i];
    
    try {
      const category = categories.find(c => c.name === row.genre.trim());
      if (!category) {
        throw new Error(`カテゴリが見つかりません: ${row.genre}`);
      }
      
      const answers = questions.map((question, index) => {
        const questionField = `q${index + 1}` as keyof CsvRow;
        const content = row[questionField] as string;
        return {
          content: content.trim(),
          question: {
            connect: {
              id: question.id,
            },
          },
        };
      });
      
      const postData: Prisma.PostCreateInput = {
        title: row.title.trim(),
        createdAt: new Date(row.date),
        updatedAt: new Date(),
        user: {
          create: {
            name: row.name.trim(),
            foreignId: `csv-upload:${i + 1}:${Date.now()}`,
            birthday: calculateBirthday(row.age),
            gender: convertGender(row.gender.trim()),
          },
        },
        category: {
          connect: {
            id: category.id,
          },
        },
        answers: {
          create: answers,
        },
      };
      
      await prisma.post.create({ data: postData });
      
      progress.successfulRows++;
      progress.lastProcessedIndex = i;
      
    } catch (error) {
      console.error(`❌ 行${i + 1}の登録に失敗しました:`, error);
      progress.failedRows++;
      progress.errors.push({
        row: i + 1,
        field: "database",
        value: JSON.stringify(row),
        message: error instanceof Error ? error.message : "不明なエラー"
      });
    }
    
    progress.processedRows++;
    
    // 進捗を定期的に保存
    if (progress.processedRows % 10 === 0) {
      saveProgress(progress);
      console.log(`📊 進捗: ${progress.processedRows}/${progress.totalRows} (成功: ${progress.successfulRows}, 失敗: ${progress.failedRows})`);
    }
  }
  
  // 完了処理
  progress.endTime = new Date();
  saveProgress(progress);
  
  console.log("🎉 アップロード処理が完了しました!");
  console.log(`📊 最終結果:`);
  console.log(`   総行数: ${progress.totalRows}`);
  console.log(`   成功: ${progress.successfulRows}`);
  console.log(`   失敗: ${progress.failedRows}`);
  console.log(`   処理時間: ${Math.round((progress.endTime.getTime() - progress.startTime.getTime()) / 1000)}秒`);
  
  if (progress.failedRows > 0) {
    console.log("⚠️  失敗した行の詳細:");
    progress.errors.forEach(error => {
      console.log(`   行${error.row}: ${error.message}`);
    });
  }
  
  // 進捗ファイルをクリーンアップ
  if (progress.failedRows === 0) {
    fs.unlinkSync(PROGRESS_FILE);
    console.log("✅ 進捗ファイルをクリーンアップしました");
  } else {
    console.log(`📁 エラーがあるため進捗ファイルを保持しています: ${PROGRESS_FILE}`);
  }
};

const main = async (): Promise<void> => {
  try {
    await uploadData();
  } catch (error) {
    console.error("💥 予期しないエラーが発生しました:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

// 処理開始
main(); 