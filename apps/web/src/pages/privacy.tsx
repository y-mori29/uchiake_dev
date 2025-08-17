import Head from "next/head";
import React from "react";

export default function Privacy() {
  return (
    <div className="min-h-[calc(100vh-48px)]">
      <Head>
        <title>プライバシーポリシー | うちあけ</title>
      </Head>
      <div className="mx-auto w-full rounded-lg bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-2xl font-bold text-gray-800">プライバシーポリシー</h1>
        <p className="mb-6 leading-relaxed text-gray-700">
          株式会社メディキャンバス（以下「当社」といいます）は、当社が提供するサービス「うちあけ」（以下「本サービス」といいます）をご利用いただく皆様（以下「ユーザー」といいます）の個人情報を適切に取り扱うことを重要な責務と考え、以下のプライバシーポリシー（以下「本ポリシー」といいます）を定めます。本ポリシーに同意のうえ、本サービスをご利用ください。
        </p>

        <h2 className="mb-4 border-b pb-2 text-xl font-semibold text-gray-800">第1条（個人情報の定義）</h2>
        <p className="mb-6 leading-relaxed text-gray-700">
          個人情報とは、個人情報保護法に基づき、特定の個人を識別できる情報を指します。これには、氏名、住所、電話番号、メールアドレス、その他個人に関連する情報が含まれます。
        </p>

        <h2 className="mb-4 border-b pb-2 text-xl font-semibold text-gray-800">第2条（収集する情報）</h2>
        <ol className="mb-6 list-decimal pl-6 leading-relaxed text-gray-700">
          <li className="mb-2">
            ユーザーが本サービスに登録する際に提供される情報（氏名、メールアドレス、パスワードなど）
          </li>
          <li className="mb-2">本サービス利用中に記載または投稿された情報（体験談、コメント、画像など）</li>
          <li className="mb-2">サービス利用状況に関する情報（ログデータ、アクセスデータ、クッキー、端末情報など）</li>
          <li className="mb-2">ユーザーが提供するその他の情報</li>
        </ol>

        <h2 className="mb-4 border-b pb-2 text-xl font-semibold text-gray-800">第3条（情報の利用目的）</h2>
        <ol className="mb-6 list-decimal pl-6 leading-relaxed text-gray-700">
          <li className="mb-2">本サービスの提供および運営のため</li>
          <li className="mb-2">ユーザー認証および本人確認のため</li>
          <li className="mb-2">サービス向上および新機能開発のため</li>
          <li className="mb-2">必要に応じてユーザーに連絡を行うため</li>
          <li className="mb-2">
            統計データの作成およびマーケティング分析のため（個人を特定できない形式に加工して利用します）
          </li>
          <li className="mb-2">法令に基づく対応のため</li>
        </ol>

        <h2 className="mb-4 border-b pb-2 text-xl font-semibold text-gray-800">第4条（情報の第三者提供）</h2>
        <p className="mb-2 leading-relaxed text-gray-700">
          当社は、以下の場合を除き、個人情報を第三者に提供することはありません。
        </p>
        <ol className="mb-6 list-decimal pl-6 leading-relaxed text-gray-700">
          <li className="mb-2">ユーザーの同意がある場合</li>
          <li className="mb-2">個人を特定できない状態で統計データとして提供する場合</li>
          <li className="mb-2">法令に基づく場合</li>
          <li className="mb-2">人の生命、身体、または財産の保護のために必要であり、本人の同意を得ることが困難な場合</li>
          <li className="mb-2">
            公衆衛生の向上または児童の健全な育成推進のために必要であり、本人の同意を得ることが困難な場合
          </li>
          <li className="mb-2">国または地方公共団体等が法令に基づく事務を遂行するために協力する必要がある場合</li>
        </ol>

        <h2 className="mb-4 border-b pb-2 text-xl font-semibold text-gray-800">第5条（情報の管理）</h2>
        <p className="mb-6 leading-relaxed text-gray-700">
          当社は、収集した個人情報を適切に管理し、不正アクセス、紛失、破壊、改ざん、漏洩を防ぐために必要かつ適切な安全管理措置を講じます。また、個人情報の取り扱いを委託する場合には、委託先の管理体制を確認したうえで適切に監督します。
        </p>

        <h2 className="mb-4 border-b pb-2 text-xl font-semibold text-gray-800">
          第6条（クッキーおよび類似技術の使用）
        </h2>
        <p className="mb-6 leading-relaxed text-gray-700">
          当社は、ユーザーの利用状況を把握し、サービス向上を目的として、クッキーやウェブビーコン等の技術を使用します。これらの技術により収集した情報は、個人を特定しない形式で利用します。ユーザーはブラウザ設定によりクッキーを拒否することができますが、これにより一部機能が制限される場合があります。
        </p>

        <h2 className="mb-4 border-b pb-2 text-xl font-semibold text-gray-800">第7条（個人情報の開示、訂正、削除）</h2>
        <p className="mb-6 leading-relaxed text-gray-700">
          ユーザーは、当社に対して、自己の個人情報の開示、訂正、追加、削除、利用停止を請求することができます。これらの請求を行う場合は、以下の連絡先までご連絡ください。
        </p>
        <p className="mb-6 leading-relaxed text-gray-700">【お問い合わせ先】 メールアドレス: info@medi-canvas.com</p>

        <h2 className="mb-4 border-b pb-2 text-xl font-semibold text-gray-800">第8条（プライバシーポリシーの変更）</h2>
        <p className="mb-6 leading-relaxed text-gray-700">
          当社は、必要に応じて本ポリシーを変更することがあります。変更後の内容は、本サービス上に掲示または通知した時点で効力を生じるものとします。
        </p>

        <h2 className="mb-4 border-b pb-2 text-xl font-semibold text-gray-800">第9条（お問い合わせ）</h2>
        <p className="leading-relaxed text-gray-700">
          本ポリシーに関するお問い合わせは、以下の連絡先までお願いいたします。
        </p>
        <p className="mt-2 leading-relaxed text-gray-700">【お問い合わせ先】 メールアドレス: info@medi-canvas.com</p>

        <p className="mt-8 text-gray-700">以上</p>
      </div>
    </div>
  );
}
