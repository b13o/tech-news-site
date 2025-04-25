import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="space-y-16 px-4 sm:px-6 lg:px-8">
      {/* Hero  */}
      <section
        className="py-20 lg:py-40 lg:pb-20"
        aria-labelledby="hero-heading"
      >
        <div className="max-w-3xl mx-auto text-center space-y-10">
          <h1
            id="hero-heading"
            className="text-4xl tracking-tight md:text-5xl lg:text-7xl"
          >
            慎重な開発者のための技術選定ガイド
          </h1>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed">
            最新のフレームワーク・ライブラリ・ツールを徹底比較。
            <br />
            プロジェクトに最適な技術選定をサポートします。
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/newsletter"
              className="px-5 py-3 rounded-lg bg-[#7c9070] text-white font-medium 
                hover:bg-[#6a7b5f] active:bg-[#5c6c52] 
                focus:outline-none focus:ring-2 focus:ring-[#7c9070]/30 focus:ring-offset-2 
                transition-all duration-200 inline-flex items-center shadow-sm"
              aria-label="ニュースレターを購読する"
            >
              ニュースレターを購読 <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="#about"
              className="px-5 py-3 rounded-lg border border-[#7c9070] text-[#7c9070] font-medium 
                hover:bg-[#7c9070]/10 active:bg-[#7c9070]/20
                focus:outline-none focus:ring-2 focus:ring-[#7c9070]/30 focus:ring-offset-2 
                transition-all duration-200 inline-flex items-center"
              aria-label="サイトの詳細を見る"
            >
              詳細を見る
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Article */}
      <section
        className="py-16 container mx-auto"
        aria-labelledby="latest-article-heading"
      >
        <div className="max-w-5xl mx-auto border bg-white p-8 rounded-2xl border-neutral-200">
          <div className="text-center mb-12">
            <span className="text-[#7c9070] font-medium inline-block px-3 py-1 bg-[#7c9070]/10 rounded-md mb-2">
              最新記事
            </span>
            <h2 id="latest-article-heading" className="text-3xl font-bold mt-2">
              Reactフォーム実装アプローチの比較
            </h2>
            <p className="text-lg text-neutral-600 mt-4 max-w-2xl mx-auto leading-relaxed">
              3つの異なるフォーム実装手法を比較検証。それぞれの特徴と適切なユースケースを解説します。
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div
              className="bg-white p-6 rounded-xl shadow-sm border border-neutral-100 
              hover:shadow-md hover:border-[#7c9070]/30 transition-all duration-300"
            >
              <h3 className="text-xl font-semibold mb-3">React Hook Form</h3>
              <p className="text-neutral-600 mb-4 leading-relaxed">
                高パフォーマンスで柔軟性の高いフォームライブラリ。
                使いやすいバリデーション機能を備えています。
              </p>
              <Link
                href="/newsletter"
                className="text-[#7c9070] font-medium inline-flex items-center 
                  hover:text-[#5c6c52] hover:translate-x-0.5 transition-all duration-200"
                aria-label="ニュースレター登録フォームのデモを見る"
              >
                ソースコード <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>

            <div
              className="bg-white p-6 rounded-xl shadow-sm border border-neutral-100 
              hover:shadow-md hover:border-[#7c9070]/30 transition-all duration-300"
            >
              <h3 className="text-xl font-semibold mb-3">Conform</h3>
              <p className="text-neutral-600 mb-4 leading-relaxed">
                Web 標準に基づいて HTML
                フォームを構築。RSCを完全にサポートする、型安全なフォームバリデーションライブラリ。
              </p>
              <Link
                href="/newsletter"
                className="text-[#7c9070] font-medium inline-flex items-center 
                  hover:text-[#5c6c52] hover:translate-x-0.5 transition-all duration-200"
                aria-label="法人用お問い合わせフォームのデモを見る"
              >
                ソースコード <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>

            <div
              className="bg-white p-6 rounded-xl shadow-sm border border-neutral-100 
              hover:shadow-md hover:border-[#7c9070]/30 transition-all duration-300"
            >
              <h3 className="text-xl font-semibold mb-3">
                （β）React Hook Form
              </h3>
              <p className="text-neutral-600 mb-4 leading-relaxed">
                React 19 の Actions と React Hook Form を組み合わせて、
                サーバーサイド処理を実現する新しいアプローチ。
              </p>
              <Link
                href="/newsletter"
                className="text-[#7c9070] font-medium inline-flex items-center 
                  hover:text-[#5c6c52] hover:translate-x-0.5 transition-all duration-200"
                aria-label="個人用お問い合わせフォームのデモを見る"
              >
                ソースコード <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/newsletter"
              className="px-5 py-3 rounded-lg border border-[#7c9070] text-[#7c9070] font-medium 
                hover:bg-[#7c9070]/10 active:bg-[#7c9070]/20
                focus:outline-none focus:ring-2 focus:ring-[#7c9070]/30 focus:ring-offset-2 
                transition-all duration-200 inline-flex items-center shadow-sm"
              aria-label="記事の詳細ページを読む"
            >
              調査レポートを受け取る <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section
        className="py-16 md:py-20 bg-[#efeee9] -mx-8 border-neutral-200"
        aria-labelledby="newsletter-heading"
      >
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 id="newsletter-heading" className="text-3xl font-bold mb-4">
            最新の技術情報をお届けします
          </h2>
          <p className="text-lg text-neutral-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            ニュースレターを購読して、定期的な技術比較レポートや
            開発者インタビューなどの最新コンテンツをお受け取りください。
          </p>
          <Link
            href="/newsletter"
            className="px-6 py-3 rounded-lg bg-[#7c9070] text-white font-medium 
              hover:bg-[#6a7b5f] active:bg-[#5c6c52] 
              focus:outline-none focus:ring-2 focus:ring-[#7c9070]/30 focus:ring-offset-2 
              transition-all duration-200 inline-flex items-center shadow-md"
            aria-label="ニュースレター購読ページに移動"
          >
            ニュースレターを購読する <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
