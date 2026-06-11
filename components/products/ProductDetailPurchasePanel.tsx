"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

import { useCart } from "@/components/cart/CartProvider";
import { ProductQuantityStepper } from "@/components/products/ProductQuantityStepper";
import type {
  Product,
  ProductVariant,
} from "@/components/products/productsData";

interface ProductDetailPurchasePanelProps {
  product: Product;
}

export function ProductDetailPurchasePanel({
  product,
}: ProductDetailPurchasePanelProps) {
  const { addItem, isPending } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isVariantMenuOpen, setIsVariantMenuOpen] = useState(false);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const selectedVariant = product.variants[selectedVariantIndex] ?? {
    merchandiseId: product.merchandiseId,
    size: product.size,
    price: product.price,
    currency: product.currency,
    formattedPrice: product.formattedPrice,
  };

  const handleAddToCart = async () => {
    await addItem(createCartProduct(product, selectedVariant), quantity);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="relative flex flex-col">
        <p className="font-libre text-[14px] font-normal leading-[31px] text-[#000]">
          Weight
        </p>
        <button
          type="button"
          onClick={() => setIsVariantMenuOpen((current) => !current)}
          className="flex h-[44px] cursor-pointer items-center justify-between rounded-[2px] border border-[rgba(28,28,26,0.50)] px-4"
          aria-expanded={isVariantMenuOpen}
          aria-haspopup="listbox"
        >
          <span className="font-libre text-[14px] font-normal leading-[31px] text-[#1C1C1A]">
            {selectedVariant.size > 0 ? `${selectedVariant.size}g` : "Default"}
          </span>
          <ChevronDown
            className={`h-5 w-5 text-[#1C1C1A] transition-transform ${
              isVariantMenuOpen ? "rotate-180" : ""
            }`}
          />
        </button>
        {isVariantMenuOpen ? (
          <div className="absolute left-0 top-full z-10 mt-2 min-w-full rounded-[2px] border border-[#D9D1C8] bg-[#F5F0E8] shadow-[0_12px_32px_rgba(28,28,26,0.12)]">
            {product.variants.map((variant, index) => {
              const isActive = index === selectedVariantIndex;

              return (
                <button
                  key={variant.merchandiseId}
                  type="button"
                  onClick={() => {
                    setSelectedVariantIndex(index);
                    setIsVariantMenuOpen(false);
                  }}
                  className={`flex w-full items-center justify-between px-4 py-3 text-left transition-colors ${
                    isActive ? "bg-[#EDE3D6]" : "hover:bg-[#EFE8DE]"
                  }`}
                  role="option"
                  aria-selected={isActive}
                >
                  <span className="font-libre text-[14px] font-normal leading-[31px] text-[#1C1C1A]">
                    {variant.size > 0 ? `${variant.size}g` : "Default"}
                  </span>
                </button>
              );
            })}
          </div>
        ) : null}
      </div>

      <div className="flex flex-col items-stretch justify-start gap-3 md:flex-row md:items-center md:gap-4">
        <ProductQuantityStepper
          quantity={quantity}
          onDecrease={() => setQuantity((current) => Math.max(1, current - 1))}
          onIncrease={() => setQuantity((current) => current + 1)}
        />
        <button
          type="button"
          onClick={() => void handleAddToCart()}
          disabled={isPending}
          className="flex h-[48px] w-full cursor-pointer items-center justify-center gap-1 bg-[#FFCAD4] px-4 transition-colors duration-200 hover:bg-[#f7b7c5] md:h-auto"
        >
          <span className="font-libre text-[14px] font-normal leading-[31px] text-[#1C1C1A]">
            {isPending ? "Adding..." : "Add to cart"}
          </span>
          <span className="h-[3px] w-[3px] rounded-full bg-[#1C1C1A]" />
          <span className="font-libre text-[14px] font-normal leading-[31px] text-[#1C1C1A]">
            {selectedVariant.formattedPrice}
          </span>
        </button>
      </div>
    </div>
  );
}

function createCartProduct(product: Product, variant: ProductVariant): Product {
  return {
    ...product,
    merchandiseId: variant.merchandiseId,
    size: variant.size,
    price: variant.price,
    currency: variant.currency,
    formattedPrice: variant.formattedPrice,
  };
}
