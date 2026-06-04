import Link from "next/link";
import Image from "next/image";
import { ChevronDown, ShoppingBag } from "lucide-react";

export function Navbar() {
  return (
    <nav className="grid h-18 grid-cols-[1fr_auto_1fr] items-center px-12">
      <div className="flex items-center gap-10 text-[#2B211B] font-cormorant text-sm">
        <Link href="/shop" className="cursor-pointer">SHOP</Link>
        <Link href="/about" className="cursor-pointer">ABOUT</Link>
        <Link href="/contact" className="cursor-pointer">CONTACT</Link>
      </div>

      <div className="cursor-pointer justify-self-center">
        <Image
          src="/logo/logo.png"
          width={176}
          height={32}
          alt="Blachh Logo"
        />
      </div>

      <div className="flex items-center justify-self-end gap-6">
        <div className="flex gap-3 items-center ">
          {/* Currency */}
          <button className="flex cursor-pointer items-center gap-1">
            <p className="font-cormorant text-sm text-[#2B211B]">SEK</p>
            <ChevronDown className="w-4 h-4 text-[#2B211B]" />
          </button>
          {/* Language */}
          <button className="flex cursor-pointer items-center gap-1">
              <p className="font-cormorant text-sm text-[#2B211B]">ENG</p>
            <ChevronDown className="w-4 h-4 text-[#2B211B]" />
          </button>
        </div>

        {/* Shopping Bag */}
        <ShoppingBag className="w-5 h-5 cursor-pointer text-[#2B211B] " />
      </div>
    </nav>
  );
}
