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
    <div className="w-105 h-52.5 rounded-md border border-[#E2DDD5] bg-white flex flex-col justify-between p-6">
      <p className="text-[#3E2723] font-hanken text-sm leading-7.75">"{review}"</p>

      <div className="flex items-center gap-5">
        <Image 
          src={imageUrl}
          alt="User's avatar image"
          height={36}
          width={36}
          className="rounded-full"
        />

        <p className="text-[#3E2723] font-hanken text-base leading-7.75">{reviewerName}</p>
      </div>
    </div>
  )
}