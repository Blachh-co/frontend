import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative h-145 w-full overflow-hidden">
      <Image
        src="/hero-background.png"
        alt="Hero background"
        fill
        priority
        className="object-cover object-center"
      />

      <div className="absolute inset-0 bg-linear-to-r from-white/35 via-white/10 to-white/0" />

      <div className="relative z-10 mx-auto flex h-full w-full items-center ">
        <div className="max-w-xl h-full ml-20 mt-48">
          <p className="font-hanken text-sm uppercase leading-7.75 text-[#1C1C1A80]">
            Ceremonial Grade · Stone-Milled in Japan
          </p>

          <h1 className="mt-4 text-[58px] font-normal leading-12.75 text-[#1C1C1A] font-libre">
            Made for <span className="italic">slow</span> <br />
            mornings.
          </h1>

          <p className="mt-3 font-hanken text-sm leading-7 text-[#1C1C1AB2]">
            Matcha that tastes like the morning you&apos;ve been looking for.
          </p>

          <div className="mt-5 font-hanken text-sm leading-7 text-[#1C1C1A99]">
            ★★★★★ 4.9 · 134 reviews
          </div>

          <button className="cursor-pointer mt-6 flex items-center justify-center gap-1 rounded-sm bg-[#FFCAD4] px-5 py-3">
            <p className="font-hanken text-md leading-7 text-[#2B211B]">
              Shop Now
            </p>
            <ArrowRight className="h-4 w-4 text-[#2B211B]" />
          </button>
        </div>
      </div>
    </section>
  );
}
