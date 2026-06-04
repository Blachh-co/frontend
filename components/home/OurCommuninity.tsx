"use client";

import Image from "next/image"
import { useRouter } from "next/navigation"
export function OurCommuninity() {
  const router = useRouter();
  const onClickFollowButton = () => {
    router.push('https://instagram.com/blachh.co')
  }
  return (
    <section className="flex flex-col items-center py-20 px-18 bg-[#F7F3EE]">
      <p className="uppercase font-hanken text-sm text-[#9A9A94] leading-6.75">OUR COMMUNITY</p>
      
      <h1 className="mt-2.5 font-libre text-[52px] text-[#2B211B] leading-6.75">Join the Blachh Community</h1>
    
      <h2 className="mt-3.5 text-[#5A5A55] font-hanken text-sm font-light leading-6.75">Snapshots of matcha rituals and slow living moments from our community</h2>
    
      <div className="mt-6 grid grid-cols-4 w-full gap-x-2.5">
        <div className="h-112 w-full rounded-md bg-gray-300" />
        <div className="h-112 w-full rounded-md bg-gray-300" />
        <div className="h-112 w-full rounded-md bg-gray-300" />
        <div className="h-112 w-full rounded-md bg-gray-300" />
      </div>

      <div className="mt-14 mb-6 flex justify-center items-center gap-2.5">
        <Image 
          src="/BLACHH-02.png"
          alt="Blachh Mascot"
          width={84}
          height={80}
        />

        <p className="text-[#5A5A55] font-hanken text-sm leading-6.75">Follow us on Instagram <span className="font-medium text-[#2D4A2A]">@blachh.co</span></p>
        
        <button 
          className="cursor-pointer w-20 h-6.75 text-sm rounded-sm border-[1.5px] border-[#FFCAD4] bg-[#FFCAD4B2]"
          onClick={onClickFollowButton}
          >
            Follow
          </button>
      </div>
    </section>
  )
}
