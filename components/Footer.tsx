import Link from "next/link";
import InstagramIcon from "./icons/Instagram";
import { ChevronDown, Mail } from "lucide-react";
import TiktokIcon from "./icons/Tiktok";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="h-89.25 w-full border-t border-[#E2DDD5] bg-[#FBF9F6] py-20 px-16 flex justify-center items-center gap-3">
      
      {/* LEFT */}
      <div className="px-5 flex flex-col h-full justify-between w-full">
        <div className="gap-3 font-hanken text-sm text-[#6D625A] font-light flex justify-between items-center">
          <p>About Us</p>
          <p>Shopping Policy</p>
          <p>Privacy</p>
          <p>Cancellation Policy</p>
          <p>Terms of Service</p>
          <p>FAQs</p>
        </div>

        <div className="font-hanken text-sm font-light text-[#9A9A9494]">
          © 2025 Blachh Matcha
        </div>
      </div>

      {/* DIVIDER */}
      <div className="h-58.25 border-r border-[#E2DDD5]" />


      {/* RIGHT */}
      <div className="w-full h-full flex flex-col justify-between px-5">
        <div className="flex flex-col">
          <Link
            href="mailto:hello@blach.co"
            className="font-hanken text-sm font-light text-black underline"
          >
            hello@blach.co
          </Link>
          <Link
            href="mailto:hello@blach.co"
            className="font-hanken text-sm font-light text-black underline"
          >
            wholesale@blach.co
          </Link>
        </div>

        <div className="flex items-center gap-4 mt-8">
          <InstagramIcon />
          <TiktokIcon />
          <Mail className="w-5.5 h-5.5" />
        </div>

        <div className="flex flex-col items-center self-end ">
          <Image 
            src={'/mascots/BLACHH-04-1.png'}
            alt="Footer mascot"
            width={101}
            height={65}
          />
          <button className="rounded-[8px] border border-[#1C1C1A] flex justify-center items-center p-2 gap-1">
            <p className="text-[#1C1C1A] font-cormorant text-sm">Sweden (SEK)</p>
            <ChevronDown className="w-6 h-6 text-[#1C1C1A] stroke-1" />
          </button>
        </div>
      </div>

    </footer>
  );
}
