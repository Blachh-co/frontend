import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-[72svh] w-full overflow-hidden md:min-h-[45rem]">
      <Image
        src="/hero-background.png"
        alt="Hero background"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      <div className="absolute inset-0 bg-linear-to-r from-white/80 via-white/45 to-white/10 md:from-white/35 md:via-white/10 md:to-white/0" />

      <div className="relative z-10 flex min-h-[72svh] w-full items-center justify-center md:min-h-[45rem] md:justify-start">
        <div className="flex max-w-[20rem] flex-col items-center px-5 py-10 text-center sm:max-w-md sm:px-6 md:max-w-xl md:items-start md:px-10 md:text-left lg:px-16">
          <p className="font-hanken text-xs leading-6 uppercase tracking-[0.18em] text-[#1C1C1A80] sm:text-sm sm:leading-7">
            Ceremonial Grade · Stone-Milled in Japan
          </p>

          <h1 className="mt-3 font-libre text-4xl leading-tight font-normal text-[#1C1C1A] sm:mt-4 sm:text-5xl md:text-[58px] md:leading-[1.02]">
            Made for <span className="italic">slow</span>{" "}
            <span className="block md:inline">mornings.</span>
          </h1>

          <p className="mt-3 max-w-sm font-hanken text-sm leading-6 text-[#1C1C1AB2] md:leading-7">
            Matcha that tastes like the morning you&apos;ve been looking for.
          </p>

          <div className="mt-4 font-hanken text-sm leading-6 text-[#1C1C1A99] md:mt-5 md:leading-7">
            ★★★★★ 4.9 · 134 reviews
          </div>

          <button className="mt-6 flex w-full cursor-pointer items-center justify-center gap-1 rounded-sm bg-[#FFCAD4] px-5 py-3 sm:w-fit">
            <p className="font-hanken text-base leading-7 text-[#2B211B]">
              Shop Now
            </p>
            <ArrowRight className="h-4 w-4 text-[#2B211B]" />
          </button>
        </div>
      </div>
    </section>
  );
}
