import { ChevronUp, ChevronDown } from "lucide-react"
import TestimonialsCard from "../ui/TestimonialsCard"

export function Testimonials() {
  return (
    <section className="bg-[#F7F2ED] h-243 flex justify-center items-center">

      <div className="max-w-5xl xl:max-w-7xl flex justify-between items-center w-full h-full">

        {/* LEFT */}
        <div className="flex flex-col h-full justify-center gap-y-56">
          
          <div className="flex flex-col gap-3">
            <h1 className="font-libre text-[42px] leading-12 text-[#1C1C1A]">
              Loved by <span className="text-[#9BB845]">matcha</span><br />
              <span className="text-[#9BB845]">lovers</span> across the<br/>
              world.
            </h1>

            <p className="text-black font-hanken text-sm leading-4.25">
              Real reviews from our community, people who love slow<br/>
              mornings, quality, matcha, and a little joy from Japan.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <button className="cursor-pointer rounded-full w-14 h-14 bg-white border-[1.5px] border-[#1C1C1A] flex justify-center items-center">
              <ChevronUp className="w-6 h-6 text-[#1C1C1A]" />
            </button>

            <button className="cursor-pointer rounded-full w-14 h-14 bg-white border-[1.5px] border-[#1C1C1A] flex justify-center items-center">
              <ChevronDown className="w-6 h-6 text-[#1C1C1A]" />
            </button>
          </div>

        </div>

        {/* RIGHT */}
        <div className="flex flex-col gap-5">
          <TestimonialsCard 
            imageUrl="/mock/testimonial-person-1.png"
            review="The quality blew me away, rich, smooth, and nothing like supermarket matcha. This is now my daily ritual."
            reviewerName="Kaito S."
          />

          <TestimonialsCard 
            imageUrl="/mock/testimonial-person-2.png"
            review="Ordered the Sakura Matcha and I'm obsessed. The packaging is so cute and the flavor is so smooth!"            
            reviewerName="Mia K."
          />

          <TestimonialsCard 
            imageUrl="/mock/testimonial-person-3.png"
            review="The matcha aesthetic is everything. Cute packaging, great quality. My morning routine is so much better now."
            reviewerName="Yuna L."
          />
        </div>

      </div>

    </section>
  )
}
