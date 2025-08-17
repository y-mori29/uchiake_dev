import { PrismaClient, Prisma, Gender } from "@prisma/client";
import fs from "fs";
import csv from "csv-parser";
const prisma = new PrismaClient();

const transfer = async () => {
  const categoryData: Prisma.CategoryCreateInput[] = [
    {
      order: 1,
      name: "頭・脳・神経",
      image: "/imgs/category/head-brain-nerves.png",
    },
    {
      order: 2,
      name: "耳鼻・口・目",
      image: "/imgs/category/ear-nose-mouth-eye.png",
    },
    {
      order: 3,
      name: "手足・肩・腰",
      image: "/imgs/category/hands-feet-shoulders-waist.png",
    },
    {
      order: 4,
      name: "心臓・肺・気道",
      image: "/imgs/category/lungs-heart-airways.png",
    },
    {
      order: 5,
      name: "血管・血液",
      image: "/imgs/category/blood-vessels.png",
    },
    {
      order: 6,
      name: "胃・食道・腸",
      image: "/imgs/category/stomach-intestine-esophagus.png",
    },
    {
      order: 7,
      name: "肝臓・膵臓・胆嚢",
      image: "/imgs/category/liver-pancreas-gallbladder.png",
    },
    {
      order: 8,
      name: "腎臓・尿路・尻",
      image: "/imgs/category/kidney-urinary-system.png",
    },
    {
      order: 9,
      name: "皮膚・肌・髪",
      image: "/imgs/category/skin-hair.png",
    },
    {
      order: 10,
      name: "骨・関節・筋肉",
      image: "/imgs/category/bones-joints-muscles.png",
    },
    {
      order: 11,
      name: "ストレス・睡眠",
      image: "/imgs/category/stress-sleep.png",
    },
    {
      order: 12,
      name: "ホルモン・代謝",
      image: "/imgs/category/hormone-metabolism.png",
    },
    {
      order: 13,
      name: "心・精神",
      image: "/imgs/category/heart-mental.png",
    },
    {
      order: 14,
      name: "感染症",
      image: "/imgs/category/infectious-diseases.png",
    },
    {
      order: 15,
      name: "がん",
      image: "/imgs/category/cancer.png",
    },
    {
      order: 16,
      name: "生活習慣病",
      image: "/imgs/category/lifestyle-diseases.png",
    },
    {
      order: 17,
      name: "免疫疾患",
      image: "/imgs/category/immune-diseases.png",
    },
    {
      order: 18,
      name: "遺伝子疾患",
      image: "/imgs/category/genetic-diseases.png",
    },
    {
      order: 19,
      name: "男性に多い疾患",
      image: "/imgs/category/common-male-diseases.png",
    },
    {
      order: 20,
      name: "女性に多い疾患",
      image: "/imgs/category/common-female-diseases.png",
    },
    {
      order: 21,
      name: "子供に多い疾患",
      image: "/imgs/category/common-childhood-diseases.png",
    },
    {
      order: 22,
      name: "その他",
      image: "/imgs/category/others.png",
    },
  ];
  await prisma.category.createMany({
    data: categoryData,
    skipDuplicates: true,
  });
  const categories = await prisma.category.findMany();

  // const userData: Prisma.UserCreateInput[] = [
  //   {
  //     foreignId: "auth0|676faa8f553a1d0d4f62f146",
  //     name: "佐藤 太郎",
  //     birthday: new Date("1990-03-15"),
  //     gender: "MALE",
  //   },
  //   {
  //     foreignId: "foreign-2",
  //     name: "鈴木 花子",
  //     birthday: new Date("1985-07-22"),
  //     gender: "FEMALE",
  //   },
  //   {
  //     foreignId: "foreign-3",
  //     name: "高橋 健",
  //     birthday: new Date("1978-11-04"),
  //     gender: "MALE",
  //   },
  //   {
  //     foreignId: "foreign-4",
  //     name: "田中 美咲",
  //     birthday: new Date("1995-05-18"),
  //     gender: "FEMALE",
  //   },
  //   {
  //     foreignId: "foreign-5",
  //     name: "伊藤 直樹",
  //     birthday: new Date("1988-09-30"),
  //     gender: "MALE",
  //   },
  //   {
  //     foreignId: "foreign-6",
  //     name: "山本 由香",
  //     birthday: new Date("2000-12-10"),
  //     gender: "FEMALE",
  //   },
  //   {
  //     foreignId: "foreign-7",
  //     name: "中村 智也",
  //     birthday: new Date("1992-08-25"),
  //     gender: "MALE",
  //   },
  //   {
  //     foreignId: "foreign-8",
  //     name: "小林 彩香",
  //     birthday: new Date("1983-02-06"),
  //     gender: "FEMALE",
  //   },
  //   {
  //     foreignId: "foreign-9",
  //     name: "松本 翔太",
  //     birthday: new Date("1998-06-01"),
  //     gender: "MALE",
  //   },
  //   {
  //     foreignId: "foreign-10",
  //     name: "林 美穂",
  //     birthday: new Date("1975-10-12"),
  //     gender: "FEMALE",
  //   },
  // ];
  // await prisma.user.createMany({
  //   data: userData,
  // });
  // const users = await prisma.user.findMany();

  const questionsData: Prisma.QuestionCreateInput[] = [
    {
      order: 1,
      content: "あなたが抱えている疾患について教えてください",
      viewContent: "病気の概要",
      // description: "あなたの疾患について（10文字以上）※無理のない範囲でご記入ください。ご自身のペースで、伝えたいと思える範囲でお書きください。",
      description: "あなたの疾患について（10文字以上）※詳しく書きたくない部分はぼかして書いていただいて大丈夫です。",
      minimum: 10,
    },
    {
      order: 2,
      content: "疾患、体調不良に気づいたタイミングについて教えてください",
      viewContent: "症状に気付いたタイミング",
      description: "元々自覚症状があった、定期検診で引っかかったなどを書いてください（10文字以上）",
      minimum: 10,
    },
    {
      order: 3,
      content: "抱えていた不満、不安を教えてください",
      viewContent: "症状について抱えている不満や不安",
      description: "症状がある中で不安だったこと、怖かったことなどを教えてください（10文字以上）",
      minimum: 10,
    },
    {
      order: 4,
      content: "治療の有無を教えてください。治療経過や使用した薬など",
      viewContent: "現在進めている治療や使用中の薬",
      description:
        "どんな治療をしたか、どんな薬を飲んだか、などできるだけ覚えている限り詳しく教えてください（10文字以上）",
      minimum: 10,
    },
    {
      order: 5,
      content: "現在の経過を教えてください",
      viewContent: "今の課題や症状を通じて言えるアドバイス",
      description: "治療中、経過観察中、完治などをお書きください（10文字以上）",
      minimum: 10,
    },
  ];
  await prisma.question.createMany({
    data: questionsData,
    skipDuplicates: true,
  });
  const questions = await prisma.question.findMany();

  const subQuestionsData: Prisma.SubQuestionCreateInput[] = [
    {
      order: 1,
      content: "最近の調子はどうですか？",
      viewContent: "最近の調子",
      description: "最近の調子を教えて下さい（10文字以上）",
      minimum: 10,
    },
    {
      order: 2,
      content: "前回、書き込みをしてから、体調や症状の変化はありますか？",
      viewContent: "症状の変化",
      description: "症状の変化を教えて下さい（10文字以上）",
      minimum: 10,
    },
    {
      order: 3,
      content: "前回、書き込みをしてから、心理面の変化はありますか？",
      viewContent: "心理面の変化",
      description: "心理面の変化を教えて下さい（10文字以上）",
      minimum: 10,
    },
    {
      order: 4,
      content: "今、一番困っていることはなんですか？",
      viewContent: "一番困っていること",
      description: "今、一番困っていること、不安に感じていること、悩んでいることを教えてください（10文字以上）",
      minimum: 10,
    },
    {
      order: 5,
      content: "これから予定していること、次への頑張ること、プチ目標を教えてください。",
      viewContent: "目標",
      description: "これから予定していること、次への頑張ること、プチ目標を教えてください（10文字以上）",
      minimum: 10,
    },
  ];
  await prisma.subQuestion.createMany({
    data: subQuestionsData,
    skipDuplicates: true,
  });
  const subQuestions = await prisma.subQuestion.findMany();

  // const postData: Prisma.PostCreateInput[] = [
  //   {
  //     title: "太り過ぎて膝が・・・",
  //     createdAt: new Date(),
  //     updatedAt: new Date(),
  //     user: {
  //       connect: {
  //         id: users[0].id,
  //       },
  //     },
  //     category: {
  //       connect: {
  //         id: categories[0].id,
  //       },
  //     },
  //     answers: {
  //       create: [
  //         {
  //           content:
  //             "私は生活習慣病をずっと放置してしまい、今では肥満に悩んでいます。どうしたらいいかわからず、体重は120キロを超えて膝が痛み出しました。これを改善するためにどのような運動や食事が適切でしょうか？",
  //           question: {
  //             connect: {
  //               id: questions[0].id,
  //             },
  //           },
  //         },
  //         {
  //           content:
  //             "私は生活習慣病をずっと放置してしまい、今では肥満に悩んでいます。どうしたらいいかわからず、体重は120キロを超えて膝が痛み出しました。これを改善するためにどのような運動や食事が適切でしょうか？",
  //           question: {
  //             connect: {
  //               id: questions[1].id,
  //             },
  //           },
  //         },
  //         {
  //           content:
  //             "私は生活習慣病をずっと放置してしまい、今では肥満に悩んでいます。どうしたらいいかわからず、体重は120キロを超えて膝が痛み出しました。これを改善するためにどのような運動や食事が適切でしょうか？",
  //           question: {
  //             connect: {
  //               id: questions[2].id,
  //             },
  //           },
  //         },
  //         {
  //           content:
  //             "私は生活習慣病をずっと放置してしまい、今では肥満に悩んでいます。どうしたらいいかわからず、体重は120キロを超えて膝が痛み出しました。これを改善するためにどのような運動や食事が適切でしょうか？",
  //           question: {
  //             connect: {
  //               id: questions[3].id,
  //             },
  //           },
  //         },
  //         {
  //           content:
  //             "私は生活習慣病をずっと放置してしまい、今では肥満に悩んでいます。どうしたらいいかわからず、体重は120キロを超えて膝が痛み出しました。これを改善するためにどのような運動や食事が適切でしょうか？",
  //           question: {
  //             connect: {
  //               id: questions[4].id,
  //             },
  //           },
  //         },
  //       ],
  //     },
  //     comments: {
  //       create: [
  //         {
  //           content: "私も同じ悩みを抱えています。一緒に頑張りましょう！",
  //           user: {
  //             connect: {
  //               id: users[1].id,
  //             },
  //           },
  //         },
  //         {
  //           content: "私も同じ悩みを抱えています。一緒に頑張りましょう！",
  //           user: {
  //             connect: {
  //               id: users[2].id,
  //             },
  //           },
  //         },
  //         {
  //           content: "私も同じ悩みを抱えています。一緒に頑張りましょう！",
  //           user: {
  //             connect: {
  //               id: users[3].id,
  //             },
  //           },
  //         },
  //         {
  //           content: "私も同じ悩みを抱えています。一緒に頑張りましょう！",
  //           user: {
  //             connect: {
  //               id: users[4].id,
  //             },
  //           },
  //         },
  //       ],
  //     },
  //   },
  //   {
  //     title: "最近は眠れない日が続いて・・・",
  //     createdAt: new Date(),
  //     updatedAt: new Date(),
  //     user: {
  //       connect: {
  //         id: users[1].id,
  //       },
  //     },
  //     category: {
  //       connect: {
  //         id: categories[8].id,
  //       },
  //     },
  //     answers: {
  //       create: [
  //         {
  //           content:
  //             "私は今、不眠症に悩んでいます。いつも夜中の3時ごろに目覚めてしまい、そこから朝の7時まで眠れません。その結果、日中の仕事に集中できず非常に困っています。改善のためのアドバイスをお願いします。",
  //           question: {
  //             connect: {
  //               id: questions[0].id,
  //             },
  //           },
  //         },
  //         {
  //           content:
  //             "私は今、不眠症に悩んでいます。いつも夜中の3時ごろに目覚めてしまい、そこから朝の7時まで眠れません。その結果、日中の仕事に集中できず非常に困っています。改善のためのアドバイスをお願いします。",
  //           question: {
  //             connect: {
  //               id: questions[1].id,
  //             },
  //           },
  //         },
  //         {
  //           content:
  //             "私は今、不眠症に悩んでいます。いつも夜中の3時ごろに目覚めてしまい、そこから朝の7時まで眠れません。その結果、日中の仕事に集中できず非常に困っています。改善のためのアドバイスをお願いします。",
  //           question: {
  //             connect: {
  //               id: questions[2].id,
  //             },
  //           },
  //         },
  //         {
  //           content:
  //             "私は今、不眠症に悩んでいます。いつも夜中の3時ごろに目覚めてしまい、そこから朝の7時まで眠れません。その結果、日中の仕事に集中できず非常に困っています。改善のためのアドバイスをお願いします。",
  //           question: {
  //             connect: {
  //               id: questions[3].id,
  //             },
  //           },
  //         },
  //         {
  //           content:
  //             "私は今、不眠症に悩んでいます。いつも夜中の3時ごろに目覚めてしまい、そこから朝の7時まで眠れません。その結果、日中の仕事に集中できず非常に困っています。改善のためのアドバイスをお願いします。",
  //           question: {
  //             connect: {
  //               id: questions[4].id,
  //             },
  //           },
  //         },
  //       ],
  //     },
  //   },
  //   {
  //     title: "希少疾患「全身性強皮症」です",
  //     createdAt: new Date(),
  //     updatedAt: new Date(),
  //     user: {
  //       connect: {
  //         id: users[2].id,
  //       },
  //     },
  //     category: {
  //       connect: {
  //         id: categories[11].id,
  //       },
  //     },
  //     answers: {
  //       create: [
  //         {
  //           content:
  //             "難病指定されている希少疾患の一つ「全身性強皮症」です。主な症状はレイノー現象で、寒気が頻発して生活が非常に困難です。医療的なサポートや生活の工夫について何かアドバイスをいただけますか？",
  //           question: {
  //             connect: {
  //               id: questions[0].id,
  //             },
  //           },
  //         },
  //       ],
  //     },
  //   },
  //   {
  //     title: "痛風が再発しています",
  //     createdAt: new Date(),
  //     updatedAt: new Date(),
  //     user: {
  //       connect: {
  //         id: users[3].id,
  //       },
  //     },
  //     category: {
  //       connect: {
  //         id: categories[0].id,
  //       },
  //     },
  //     answers: {
  //       create: [
  //         {
  //           content:
  //             "運動不足のためか会社の健康診断で引っかかりました。気をつけてた気がするけど、体は正直ですね。特に痛風の症状が再発して痛みがひどいです。どのような生活習慣を取り入れたらよいでしょうか？",
  //           question: {
  //             connect: {
  //               id: questions[0].id,
  //             },
  //           },
  //         },
  //       ],
  //     },
  //   },
  //   {
  //     title: "最近は更年期障害？で体が・・・",
  //     createdAt: new Date(),
  //     updatedAt: new Date(),
  //     user: {
  //       connect: {
  //         id: users[4].id,
  //       },
  //     },
  //     category: {
  //       connect: {
  //         id: categories[8].id,
  //       },
  //     },
  //     answers: {
  //       create: [
  //         {
  //           content:
  //             "40代女性です。最近は更年期のためか、なぜか体のあちこちがむずむずしたり、火照ってしまったりします。このような症状に対する具体的な対処方法を知りたいです。",
  //           question: {
  //             connect: {
  //               id: questions[0].id,
  //             },
  //           },
  //         },
  //       ],
  //     },
  //   },
  // ];
  // postData.forEach(async (post) => {
  //   await prisma.post.create({
  //     data: post,
  //   });
  // });

  const convertGender = (japaneseGender: string) => {
    if (japaneseGender === "男") {
      return Gender.MALE;
    } else if (japaneseGender === "女") {
      return Gender.FEMALE;
    }
    return Gender.UNKNOWN;
  };

  const calculateBirthday = (age: number): Date => {
    const currentDate = new Date(); // 今日の日付
    const birthYear = currentDate.getFullYear() - age; // 年齢分引いた年
    return new Date(birthYear, currentDate.getMonth(), currentDate.getDate());
  };

  let rowIndex = 0;
  const csvPostData: Prisma.PostCreateInput[] = [];

  // csv
  fs.createReadStream("/Users/tomisawakenshin/Documents/開発用/medi-canvas/patient-voice/answer_seed.csv")
    .pipe(csv())
    .on("data", (row: Record<string, string>, i: number) => {
      rowIndex++;
      const answers = Array.from({ length: 5 }, (_, i) => ({
        content: row[`q${i + 1}`],
        question: {
          connect: {
            id: i + 1,
          },
        },
      }));

      const category = categories.find((c) => c.name === row.genre);
      if (!category) {
        console.error(`カテゴリ "${row.genre}" が見つかりません`);
        return;
      }

      if (row.age === "" || row.gender === "") {
        return;
      }

      csvPostData.push({
        title: row.title,
        createdAt: new Date(row.date),
        updatedAt: new Date(),
        user: {
          create: {
            name: row.name,
            foreignId: `dummydummy:${rowIndex}`,
            birthday: calculateBirthday(parseInt(row.age)),
            gender: convertGender(row.gender),
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
      });
    })
    .on("end", async () => {
      for (const post of csvPostData) {
        await prisma.post.create({
          data: post,
        });
      }
    });
};

// 定義されたデータを実際のモデルへ登録する処理
const main = async () => {
  console.log(`Start seeding ...`);

  await transfer();

  console.log(`Seeding finished.`);
};

// 処理開始
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
