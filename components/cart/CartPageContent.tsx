"use client";

import Link from "next/link";

import { useCart } from "@/components/cart/CartProvider";
import { formatMoney } from "@/lib/currency";
import type { Dictionary } from "@/lib/i18n";
import { resolveCartPageCart } from "@/lib/cart-page-state";
import type { ShopifyCart } from "@/lib/shopify-cart";

interface CartPageContentProps {
  lang: string;
  initialCart: ShopifyCart;
  dictionary: Dictionary["cart"];
}

export function CartPageContent({
  lang,
  initialCart,
  dictionary,
}: CartPageContentProps) {
  const { cart } = useCart();
  const displayCart = resolveCartPageCart(cart, initialCart);

  return (
    <div className="bg-[#F5F0E8] px-5 py-10 md:px-[64px] md:py-16">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <p className="font-hanken text-[13px] uppercase tracking-[0.2em] text-[#7D746D]">
              {dictionary.eyebrow}
            </p>
            <h1 className="font-libre text-[34px] leading-none text-[#1C1C1A] md:text-[46px]">
              {dictionary.title}
            </h1>
          </div>
          <Link
            href={`/${lang}/products`}
            className="font-hanken text-sm uppercase tracking-[0.16em] text-[#5D5E5B] underline underline-offset-4"
          >
            {dictionary.continueShopping}
          </Link>
        </div>

        {displayCart.lines.length === 0 ? (
          <div className="rounded-[24px] border border-[#E6DED5] bg-[#FBF7F2] px-6 py-10">
            <p className="font-libre text-[24px] text-[#1C1C1A]">
              {dictionary.empty}
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_320px]">
            <section className="space-y-4">
              {displayCart.lines.map((line) => (
                <article
                  key={line.id}
                  className="rounded-[24px] border border-[#E6DED5] bg-[#FBF7F2] px-5 py-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-2">
                      <p className="font-hanken text-[12px] uppercase tracking-[0.16em] text-[#8D837B]">
                        {line.variantTitle || dictionary.defaultVariant}
                      </p>
                      <h2 className="font-hanken text-[22px] font-bold uppercase leading-tight text-[#1C1C1A]">
                        {line.productTitle}
                      </h2>
                      <p className="font-hanken text-sm text-[#5D5E5B]">
                        {dictionary.quantity}: {line.quantity}
                      </p>
                    </div>
                    <p className="font-libre text-[20px] text-[#1C1C1A]">
                      {formatMoney(line.lineAmount, line.currencyCode)}
                    </p>
                  </div>
                </article>
              ))}
            </section>

            <aside className="h-fit rounded-[24px] border border-[#E6DED5] bg-[#FBF7F2] px-5 py-5">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="font-hanken text-[13px] uppercase tracking-[0.18em] text-[#7D746D]">
                    {dictionary.items}
                  </p>
                  <p className="font-hanken text-sm text-[#1C1C1A]">
                    {displayCart.totalQuantity}
                  </p>
                </div>
                <div className="flex items-center justify-between border-t border-[#E6DED5] pt-4">
                  <p className="font-hanken text-[13px] uppercase tracking-[0.18em] text-[#7D746D]">
                    {dictionary.subtotal}
                  </p>
                  <p className="font-libre text-[26px] leading-none text-[#1C1C1A]">
                    {formatMoney(displayCart.subtotalAmount, displayCart.currencyCode)}
                  </p>
                </div>
                {displayCart.checkoutUrl ? (
                  <a
                    href={displayCart.checkoutUrl}
                    className="block w-full rounded-full bg-[#1C1C1A] px-4 py-3 text-center font-hanken text-sm uppercase tracking-[0.16em] text-[#F5F0E8]"
                  >
                    {dictionary.checkoutWithShopify}
                  </a>
                ) : null}
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
