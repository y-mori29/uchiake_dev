import Head from "next/head";
import React from "react";

export default function Terms() {
  return (
    <div className="min-h-[calc(100vh-48px)]">
      <Head>
        <title>サービス利用規約 | うちあけ</title>
      </Head>
      <div className="mx-auto w-full rounded-lg p-8 shadow-lg">
        <h1 className="mb-6 text-2xl font-bold text-gray-800">サービス利用規約</h1>
        <p className="mb-6 leading-relaxed text-gray-700">
          以下は、サービス「うちあけ」をご利用いただく際の利用規約です。本規約に同意いただいた上で、サービスをご利用ください。
        </p>
        <h2 className="mb-4 border-b pb-2 text-xl font-semibold text-gray-800">第1条（目的）</h2>
        <p className="mb-6 leading-relaxed text-gray-700">
          本規約は、サービス「うちあけ」（以下「本サービス」といいます）の提供条件および本サービスの利用に関する利用者と運営者との間の権利義務関係を定めることを目的とします。本サービスを利用するにあたり、本規約に同意いただいたものとみなします。
        </p>
        <h2 className="mb-4 border-b pb-2 text-xl font-semibold text-gray-800">第2条（個人情報の取り扱い）</h2>
        <ol className="mb-6 list-decimal pl-6 leading-relaxed text-gray-700">
          <li className="mb-4">
            <p>個人情報取扱事業者</p>
            <ul className="mt-2 list-disc pl-6 text-gray-600">
              <li>
                本サービスにおける個人情報の管理責任者および連絡先については、別途定める「プライバシーポリシー」をご確認ください。
              </li>
            </ul>
          </li>
          <li className="mb-4">
            <p>利用目的</p>
            <p className="mt-2">
              当社は、本サービスの提供に際して必要な一定の個人情報を取得し、以下の目的で利用します。
            </p>
            <ul className="mt-2 list-disc pl-6 text-gray-600">
              <li>本人確認および認証のため。</li>
              <li>郵送、電話、電子メール等による当社またはグループ会社の商品、サービスのご案内のため。</li>
              <li>個人を識別できない形式に加工し、統計データを作成するため。</li>
              <li>サービス改善や利便性向上のための分析データの作成。</li>
              <li>必要に応じてお客様に対し連絡を行うため。</li>
              <li>外部サービス連携機能利用時の本人確認のため。</li>
            </ul>
          </li>
          <li className="mb-4">
            <p>第三者提供</p>
            <p className="mt-2">当社は、以下の場合を除き、個人情報を第三者に提供しません。</p>
            <ul className="mt-2 list-disc pl-6 text-gray-600">
              <li>ユーザーの同意がある場合。</li>
              <li>個人を識別できない状態で統計的なデータとして提供する場合。</li>
              <li>法令に基づく場合。</li>
              <li>人の生命、身体、または財産の保護のために必要であり、本人の同意を得ることが困難な場合。</li>
              <li>公衆衛生の向上または児童の健全な育成推進のために必要であり、本人の同意を得ることが困難な場合。</li>
              <li>
                国や地方公共団体の法令に定める事務を遂行するために必要であり、本人の同意がその事務に支障を及ぼす場合。
              </li>
            </ul>
          </li>
          <li className="mb-4">
            <p>業務委託</p>
            <ul className="mt-2 list-disc pl-6 text-gray-600">
              <li>
                当社は、取得した個人情報の取り扱いを、必要な保護措置を講じた上で、利用目的の範囲内で第三者に委託する場合があります。
              </li>
            </ul>
          </li>
          <li className="mb-4">
            <p>開示・訂正・削除等</p>
            <ul className="mt-2 list-disc pl-6 text-gray-600">
              <li>
                ユーザーは、自身の個人情報に関する利用目的の通知、開示、訂正、追加、削除、利用停止、消去等を請求できます。請求手続きについては、「プライバシーポリシー」に記載されています。
              </li>
            </ul>
          </li>
        </ol>
        <h2 className="mb-4 border-b pb-2 text-xl font-semibold text-gray-800">第3条（データの取り扱いと二次利用）</h2>
        <ol className="mb-6 list-decimal pl-6 leading-relaxed text-gray-700">
          <li className="mb-4">
            <p>
              ユーザーが本サービス内に投稿した内容について、運営者は匿名化した上で、以下の目的で二次利用することがあります。
            </p>
            <ul className="mt-2 list-disc pl-6 text-gray-600">
              <li>統計分析</li>
              <li>データ解析</li>
              <li>プラットフォーム内でのご紹介</li>
            </ul>
          </li>
          <li className="mb-4">
            <p>二次利用に際しては、個人が特定されない形でデータを適切に処理します。</p>
          </li>
          <li className="mb-4">
            <p>投稿を完了した時点で、本規約に記載された二次利用に同意いただいたものとみなします。</p>
          </li>
        </ol>
        <h2 className="mb-4 border-b pb-2 text-xl font-semibold text-gray-800">第4条（禁止事項）</h2>
        <p className="mb-2 leading-relaxed text-gray-700">ユーザーは以下の行為を禁止します。</p>
        <ol className="mb-6 list-decimal pl-6 leading-relaxed text-gray-700">
          <li className="mb-2">
            <p>他のユーザーに対する誹謗中傷、嫌がらせ、または不快感を与える行為</p>
          </li>
          <li className="mb-2">
            <p>虚偽または誤解を招く情報の提供</p>
          </li>
          <li className="mb-2">
            <p>他人のプライバシーや権利を侵害する行為</p>
          </li>
          <li className="mb-2">
            <p>本サービスの運営を妨害する行為</p>
          </li>
          <li className="mb-2">
            <p>公序良俗に反する行為</p>
          </li>
          <li className="mb-2">
            <p>不適切な投稿（他人を傷つける投稿、不快な思いをさせると運営が判断した投稿など）</p>
          </li>
          <li className="mb-2">
            <p>その他、運営者が不適切と判断する行為</p>
          </li>
        </ol>
        <h2 className="mb-4 border-b pb-2 text-xl font-semibold text-gray-800">第5条（対応措置）</h2>
        <ol className="mb-6 list-decimal pl-6 leading-relaxed text-gray-700">
          <li className="mb-4">
            <p>ユーザーが第4条に定める禁止事項に違反した場合、運営者は以下の措置を取ることがあります。</p>
            <ul className="mt-2 list-disc pl-6 text-gray-600">
              <li>該当する投稿の削除</li>
              <li>ユーザーアカウントの一時停止または永久停止</li>
              <li>その他、運営者が必要と判断する措置</li>
            </ul>
          </li>
          <li className="mb-4">
            <p>不適切な投稿については、運営者の判断で削除する場合があり、その異議申し立ては受け付けません。</p>
          </li>
        </ol>
        <h2 className="mb-4 border-b pb-2 text-xl font-semibold text-gray-800">第6条（著作権）</h2>
        <ol className="mb-6 list-decimal pl-6 leading-relaxed text-gray-700">
          <li className="mb-4">
            <p>
              本サービスに投稿された内容の著作権は、投稿者に帰属します。ただし、投稿された時点で当該投稿内容に関する複製、公衆送信、頒布、翻訳、翻案等、著作権法上の権利（当社から第三者に対する再使用許諾権を含む）を、投稿者が当社に対して無償で利用することを許諾したものとします。
            </p>
          </li>
          <li className="mb-4">
            <p>
              投稿者は、自身の投稿内容が第三者の権利を侵害しないことを保証するものとします。第三者の著作物等を利用して投稿を行う場合、必要な権利処理を完了した上で投稿を行う責任を負います。
            </p>
          </li>
          <li className="mb-4">
            <p>当社または当社から再使用許諾を受けた第三者が、投稿内容を以下の目的で利用する場合があります。</p>
            <ul className="mt-2 list-disc pl-6 text-gray-600">
              <li>本サービス内外でのコンテンツ提供。</li>
              <li>提携サイトでの紹介やプロモーション。</li>
              <li>投稿内容の一部を要約・抜粋等の加工。</li>
              <li>投稿内容を元にした漫画、動画等の創作物の制作。</li>
            </ul>
          </li>
          <li className="mb-4">
            <p>
              当社または再使用許諾を受けた第三者が、投稿内容を利用する際は、細心の注意を払い、投稿者の名誉や権利を侵害しないよう努めます。万が一、利用が不適切であると判断される場合は、当社までご連絡ください。
            </p>
          </li>
          <li className="mb-4">
            <p>
              当社または第三者が投稿内容を利用する場合、地域制限や著作権表示義務その他付随条件はなく、投稿者による利用許諾の期間は著作権が存続する限り有効です。ロイヤリティ等の対価は発生しません。
            </p>
          </li>
          <li className="mb-4">
            <p>
              当社が投稿内容を利用することにより生じた損害については、当社の過失（重過失を除く）に基づく場合を除き、責任を負いません。
            </p>
          </li>
        </ol>
        <h2 className="mb-4 border-b pb-2 text-xl font-semibold text-gray-800">第7条（免責事項）</h2>
        <ol className="mb-6 list-decimal pl-6 leading-relaxed text-gray-700">
          <li className="mb-2">
            <p>本サービスに投稿された内容の正確性、有用性について、運営者は一切の保証を行いません。</p>
          </li>
          <li className="mb-2">
            <p>ユーザー間のトラブルについては、運営者は一切の責任を負いません。</p>
          </li>
          <li className="mb-2">
            <p>本サービスの利用により生じた損害について、運営者は一切の責任を負いません。</p>
          </li>
          <li className="mb-2">
            <p>サービス提供の中断、停止、変更により生じた損害についても、運営者は責任を負いません。</p>
          </li>
        </ol>
        <h2 className="mb-4 border-b pb-2 text-xl font-semibold text-gray-800">第8条（サービス内容の変更・終了）</h2>
        <ol className="mb-6 list-decimal pl-6 leading-relaxed text-gray-700">
          <li className="mb-2">
            <p>運営者は、事前の通知なしに本サービスの内容を変更、または終了することがあります。</p>
          </li>
          <li className="mb-2">
            <p>サービス内容の変更または終了によって生じた損害について、運営者は責任を負いません。</p>
          </li>
        </ol>
        <h2 className="mb-4 border-b pb-2 text-xl font-semibold text-gray-800">第9条（利用規約の変更）</h2>
        <ol className="mb-6 list-decimal pl-6 leading-relaxed text-gray-700">
          <li className="mb-2">
            <p>本規約は、必要に応じて変更されることがあります。</p>
          </li>
          <li className="mb-2">
            <p>規約の変更が行われた場合は、変更後の内容を速やかに通知または公表します。</p>
          </li>
          <li className="mb-2">
            <p>変更後の規約は、通知または公表後に本サービスを利用した時点で同意されたものとみなします。</p>
          </li>
        </ol>
        <h2 className="mb-4 border-b pb-2 text-xl font-semibold text-gray-800">第10条（準拠法および管轄）</h2>
        <ol className="mb-6 list-decimal pl-6 leading-relaxed text-gray-700">
          <li className="mb-2">
            <p>本規約は、日本法を準拠法とします。</p>
          </li>
          <li className="mb-2">
            <p>本サービスに関連して生じた紛争については、運営者の所在地を管轄する裁判所を専属的合意管轄とします。</p>
          </li>
        </ol>
        <h2 className="mb-4 border-b pb-2 text-xl font-semibold text-gray-800">第11条（お問い合わせ）</h2>
        <p>本規約に関するお問い合わせは、以下の連絡先までお願いいたします。</p>
        <p>【お問い合わせ先】 メールアドレス: info@medi-canvas.com</p>
        <p className="mt-8 text-gray-700">以上</p>
      </div>
    </div>
  );
}
