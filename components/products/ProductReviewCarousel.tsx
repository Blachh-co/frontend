"use client";

import { CircleCheck, Star } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Dictionary } from "@/lib/i18n";

import "swiper/css";

interface ProductReviewCarouselProps {
  dictionary: Dictionary["product"]["reviewCarousel"];
}

export function ProductReviewCarousel({
  dictionary,
}: ProductReviewCarouselProps) {
  return (
    <Swiper
      slidesPerView="auto"
      spaceBetween={20}
      className="mt-10 w-full md:mt-9"
      breakpoints={{
        768: {
          spaceBetween: 36,
        },
      }}
    >
      {dictionary.items.map((review) => (
        <SwiperSlide
          key={`${review.name}-${review.title}`}
          className="!flex !h-auto !w-auto"
        >
          <article className="flex h-full w-[272px] flex-col rounded-sm border border-[#1C1C1A80] px-5 py-[28px] md:w-[304px]">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, starIndex) => (
                <Star
                  key={`${review.name}-star-${starIndex}`}
                  className="h-4 w-4 fill-[#79994D] text-[#79994D]"
                />
              ))}
            </div>
            <p className="mt-5 font-libre text-base italic font-medium leading-[31px] text-[#1C1C1A]">
              {review.title}
            </p>
            <p className="mt-5 font-libre text-[14px] font-medium leading-[31px] text-[#1C1C1A]">
              {review.body}
            </p>
            <div className="mt-6 flex flex-col">
              <p className="font-libre text-[16px] font-medium leading-[31px] text-[#1C1C1A]">
                {review.name}
              </p>
              <div className="flex items-center justify-start gap-1">
                <CircleCheck className="h-4 w-4 text-[#A49F9B]" />
                <p className="font-libre text-[12px] font-medium leading-[31px] text-[#A49F9B]">
                  {dictionary.verifiedPurchase}
                </p>
              </div>
            </div>
          </article>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
