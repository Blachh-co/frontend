import { notFound } from "next/navigation";
import { Star, Truck } from "lucide-react";

import { ProductDetailPurchasePanel } from "@/components/products/ProductDetailPurchasePanel";
import { ProductDetailTabs } from "@/components/products/ProductDetailTabs";
import { ProductImageGallery } from "@/components/products/ProductImageGallery";
import { ProductReviewCarousel } from "@/components/products/ProductReviewCarousel";
import { formatMoney, type SupportedCurrencyCode } from "@/lib/currency";
import { getCurrencyPreferenceFromRequest } from "@/lib/currency-server";
import { getDictionary, isValidLocale, type Locale } from "@/lib/i18n";
import { getProductByHandle } from "@/lib/products";

const rating = 4.9;
const ratingBreakdown = [
  { rating: 5, fillPercent: 84, reviewsCount: 4_142 },
  { rating: 4, fillPercent: 10, reviewsCount: 493 },
  { rating: 3, fillPercent: 4, reviewsCount: 197 },
  { rating: 2, fillPercent: 1.5, reviewsCount: 74 },
  { rating: 1, fillPercent: 0.5, reviewsCount: 28 },
] as const;

const freeShippingThresholdByCurrency: Record<SupportedCurrencyCode, number> = {
  SEK: 500,
  EUR: 45,
  USD: 50,
};

export const dynamic = "force-dynamic";

interface LocalizedProductDetailPageProps {
  params: Promise<{
    lang: string;
    handle: string;
  }>;
}

function getNumberLocale(lang: Locale) {
  if (lang === "th") {
    return "th-TH";
  }

  if (lang === "sv") {
    return "sv-SE";
  }

  return "en-US";
}

export default async function LocalizedProductDetailPage({
  params,
}: LocalizedProductDetailPageProps) {
  const { lang, handle } = await params;

  if (!isValidLocale(lang)) {
    notFound();
  }

  const currencyPreference = await getCurrencyPreferenceFromRequest();
  const [product, dictionary] = await Promise.all([
    getProductByHandle(handle, currencyPreference),
    getDictionary(lang),
  ]);
  const numberLocale = getNumberLocale(lang);

  if (!product) {
    notFound();
  }

  return (
    <>
      <div className="bg-[#F5F0E8]">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-8 px-5 pb-12 pt-8 md:flex-row md:gap-[72px] md:px-[64px] md:pb-[120px] md:pt-[80px]">
          <ProductImageGallery product={product} />

          <section className="flex min-w-0 flex-1 flex-col gap-4 md:gap-3">
            <p className="font-libre text-[12px] font-normal leading-5 text-[#9A9C9D] md:leading-none">
              {product.eyebrow}
            </p>
            <div className="flex flex-col gap-2">
              <h1 className="font-libre text-[30px] font-normal leading-[1.05] text-[#1F1A17] md:text-[36px] md:leading-none">
                {product.productName}
              </h1>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className="h-4 w-4 fill-[#79994D] text-[#79994D]"
                    />
                  ))}
                </div>
                <p className="font-hanken text-[16px] font-normal leading-none text-[#5D5E5B]">
                  {dictionary.product.reviewSummary.count}
                </p>
              </div>
            </div>
            <ProductDetailPurchasePanel
              product={product}
              currentCurrency={currencyPreference.currencyCode}
              dictionary={dictionary.product.purchase}
              a11y={dictionary.a11y}
            />
            <div className="flex items-start justify-start gap-3 md:items-center md:gap-4">
              <Truck className="mt-1 h-6 w-6 shrink-0 text-[#5E554D] md:mt-0" />
              <p className="font-libre text-[14px] font-normal leading-6 text-[#5E554D] md:leading-[31px]">
                {`${dictionary.product.freeShippingPrefix} ${formatMoney(
                  freeShippingThresholdByCurrency[
                    product.currency as SupportedCurrencyCode
                  ],
                  product.currency as SupportedCurrencyCode,
                )}`}
              </p>
            </div>
            <div className="my-[22px] w-full border-t border-black" />
            <ProductDetailTabs dictionary={dictionary.product.tabs} />
          </section>
        </div>
      </div>

      <section className="flex flex-col border-t border-[#DCD0C3] bg-[#FAF1EA] px-5 py-10 md:px-[96px] md:py-[60px]">
        <h2 className="font-libre text-[30px] italic font-medium leading-[1.05] text-[#000] md:text-[36px] md:leading-[31px]">
          {dictionary.product.reviewSummary.sectionTitle}
        </h2>
        <div className="mt-8 flex flex-col items-start justify-start gap-8 md:mt-9 md:flex-row md:items-center md:gap-[72px]">
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-4">
              <p className="font-libre text-[42px] font-medium leading-[1] text-[#000] md:text-[48px] md:leading-[31px]">
                {rating}
              </p>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={`review-star-${index}`}
                    className="h-4 w-4 fill-[#79994D] text-[#79994D]"
                  />
                ))}
              </div>
            </div>
            <p className="font-libre text-[14px] font-medium leading-[31px] text-[#020000]">
              {dictionary.product.reviewSummary.basedOn}
            </p>
          </div>
          <div className="flex w-full flex-col md:w-auto">
            {ratingBreakdown.map((item) => (
              <div
                key={item.rating}
                className="flex w-full items-center gap-3 md:gap-5"
              >
                <div className="flex items-center gap-2">
                  <p className="font-libre text-[14px] font-medium leading-[31px] text-[#5D5E5B]">
                    {item.rating}
                  </p>
                  <Star className="h-4 w-4 fill-[#79994D] text-[#79994D]" />
                </div>
                <div className="h-2 flex-1 rounded-full bg-[#F0E8E0] md:w-[240px] md:flex-none">
                  <div
                    className="h-2 min-w-2 rounded-full bg-[#79994D]"
                    style={{ width: `${item.fillPercent}%` }}
                  />
                </div>
                <p className="font-libre text-[14px] font-medium leading-[31px] text-[#5D5E5B]">
                  {item.reviewsCount.toLocaleString(numberLocale)}
                </p>
              </div>
            ))}
          </div>
        </div>
        <ProductReviewCarousel dictionary={dictionary.product.reviewCarousel} />
      </section>
    </>
  );
}
