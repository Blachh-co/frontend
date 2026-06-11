"use client"

import type { CSSProperties } from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronUp, ChevronDown } from "lucide-react"
import { Swiper, SwiperSlide } from "swiper/react"
import type { Dictionary } from "@/lib/i18n"
import TestimonialsCard from "../ui/TestimonialsCard"

import "swiper/css"

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
}

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const VISIBLE_CARDS = 3

interface TestimonialsProps {
  dictionary: Dictionary["home"]["testimonials"]
  previousLabel: string
  nextLabel: string
}

export function Testimonials({
  dictionary,
  previousLabel,
  nextLabel,
}: TestimonialsProps) {
  const [startIndex, setStartIndex] = useState(0)
  const testimonials = dictionary.items

  const maxStartIndex = Math.max(testimonials.length - VISIBLE_CARDS, 0)

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeUp}
      className="bg-[#F7F2ED] flex justify-center px-5 py-16 md:px-8 md:py-20 xl:h-243 xl:items-center xl:py-0"
    >

      <div className="flex w-full max-w-5xl flex-col gap-12 xl:h-full xl:max-w-7xl xl:flex-row xl:items-center xl:justify-between">

        {/* LEFT */}
        <motion.div
          variants={stagger}
          className="flex flex-col gap-8 xl:h-full xl:justify-center xl:gap-y-56"
        >
          
          <motion.div variants={stagger} className="flex flex-col gap-3">
            <motion.h1 variants={fadeUp} className="font-libre text-[2rem] leading-tight text-[#1C1C1A] md:text-[2.625rem] md:leading-12">
              {dictionary.titleStart} <span className="text-[#9BB845]">{dictionary.titleAccentOne}</span><br />
              <span className="text-[#9BB845]">{dictionary.titleAccentTwo}</span> {dictionary.titleEnd}
            </motion.h1>

            <motion.p variants={fadeUp} className="text-black font-hanken text-sm leading-6 md:leading-4.25">
              {dictionary.description}
            </motion.p>
          </motion.div>

          <motion.div variants={fadeUp} className="hidden items-center gap-4 xl:flex xl:flex-col xl:gap-6">
            <button
              type="button"
              aria-label={previousLabel}
              onClick={() => setStartIndex((current) => Math.max(current - 1, 0))}
              disabled={startIndex === 0}
              className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-[1.5px] border-[#1C1C1A] bg-white disabled:cursor-not-allowed disabled:opacity-40 md:h-14 md:w-14"
            >
              <ChevronUp className="h-5 w-5 text-[#1C1C1A] md:h-6 md:w-6" />
            </button>

            <button
              type="button"
              aria-label={nextLabel}
              onClick={() =>
                setStartIndex((current) => Math.min(current + 1, maxStartIndex))
              }
              disabled={startIndex === maxStartIndex}
              className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-[1.5px] border-[#1C1C1A] bg-white disabled:cursor-not-allowed disabled:opacity-40 md:h-14 md:w-14"
            >
              <ChevronDown className="h-5 w-5 text-[#1C1C1A] md:h-6 md:w-6" />
            </button>

            <p className="ml-auto font-hanken text-sm text-[#3E2723] xl:hidden">
              {startIndex + 1} / {testimonials.length}
            </p>
          </motion.div>

        </motion.div>

        {/* RIGHT */}
        <motion.div variants={fadeUp} className="overflow-x-hidden xl:hidden">
          <Swiper slidesPerView={1} spaceBetween={12} className="w-full">
            {testimonials.map((testimonial) => (
              <SwiperSlide key={`${testimonial.reviewerName}-${testimonial.review}`}>
                <TestimonialsCard
                  imageUrl={testimonial.imageUrl}
                  review={testimonial.review}
                  reviewerName={testimonial.reviewerName}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        <motion.div variants={fadeUp} className="hidden h-[18rem] overflow-hidden xl:block xl:h-[41.875rem]">
          <div
            className="flex flex-col gap-4 transition-transform duration-300 ease-out md:gap-5 translate-y-[calc(var(--testimonial-offset)*-17rem)] md:translate-y-[calc(var(--testimonial-offset)*-18.25rem)] xl:translate-y-[calc(var(--testimonial-offset)*-14.375rem)]"
            style={{ "--testimonial-offset": startIndex } as CSSProperties}
          >
            {testimonials.map((testimonial) => (
              <TestimonialsCard
                key={`${testimonial.reviewerName}-${testimonial.review}`}
                imageUrl={testimonial.imageUrl}
                review={testimonial.review}
                reviewerName={testimonial.reviewerName}
              />
            ))}
          </div>
        </motion.div>

      </div>

    </motion.section>
  )
}
