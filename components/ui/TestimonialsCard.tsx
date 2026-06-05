import Image from "next/image";

interface TestimonialCardI {
  imageUrl: string;
  review: string;
  reviewerName: string;
}

export default function TestimonialsCard({
  imageUrl,
  review,
  reviewerName
}: TestimonialCardI) {
  return (
    <div className="flex h-64 w-full max-w-[26.25rem] flex-col justify-between rounded-md border border-[#E2DDD5] bg-white p-5 md:h-[17.25rem] md:p-6 xl:h-52.5">
      <p className="text-[#3E2723] font-hanken text-sm leading-7 md:leading-7.75">
        &quot;{review}&quot;
      </p>

      <div className="flex items-center gap-4 md:gap-5">
        <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full">
          <Image
            src={imageUrl}
            alt="User's avatar image"
            fill
            sizes="36px"
            className="object-cover"
          />
        </div>

        <p className="text-[#3E2723] font-hanken text-base leading-7">{reviewerName}</p>
      </div>
    </div>
  )
}
