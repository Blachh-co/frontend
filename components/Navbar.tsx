"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Menu, ShoppingBag, X } from "lucide-react";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <nav>
        <div className="grid h-16 grid-cols-[40px_1fr_40px] items-center px-5 md:hidden">
          <button
            type="button"
            aria-label="Open shopping bag"
            className="flex h-10 w-10 items-center justify-center text-[#2B211B]"
          >
            <ShoppingBag className="h-5 w-5" />
          </button>

          <div className="justify-self-center">
            <Link href="/" className="block" aria-label="Go to homepage">
              <Image
                src="/logo/logo.png"
                width={176}
                height={32}
                alt="Blachh Logo"
                className="h-auto w-[144px]"
              />
            </Link>
          </div>

          <button
            type="button"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((open) => !open)}
            className="flex h-10 w-10 items-center justify-center justify-self-end text-[#2B211B]"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <div className="hidden h-18 grid-cols-[1fr_auto_1fr] items-center px-12 md:grid">
          <div className="flex items-center gap-10 text-sm font-cormorant text-[#2B211B]">
            <Link href="/products" className="cursor-pointer">
              SHOP
            </Link>
            <Link href="/about" className="cursor-pointer">
              ABOUT
            </Link>
            <Link href="/contact" className="cursor-pointer">
              CONTACT
            </Link>
          </div>

          <div className="justify-self-center">
            <Link href="/" className="block" aria-label="Go to homepage">
              <Image
                src="/logo/logo.png"
                width={176}
                height={32}
                alt="Blachh Logo"
                className="h-auto w-[176px]"
              />
            </Link>
          </div>

          <div className="flex items-center justify-self-end gap-6">
            <div className="flex items-center gap-3">
              <button type="button" className="flex cursor-pointer items-center gap-1">
                <p className="font-cormorant text-sm text-[#2B211B]">SEK</p>
                <ChevronDown className="h-4 w-4 text-[#2B211B]" />
              </button>
              <button type="button" className="flex cursor-pointer items-center gap-1">
                <p className="font-cormorant text-sm text-[#2B211B]">ENG</p>
                <ChevronDown className="h-4 w-4 text-[#2B211B]" />
              </button>
            </div>
            <button
              type="button"
              aria-label="Open shopping bag"
              className="text-[#2B211B]"
            >
              <ShoppingBag className="h-5 w-5 cursor-pointer" />
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-50 bg-[#F7F3EE] transition-transform duration-300 ease-out md:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!isMenuOpen}
      >
        <div className="flex h-full flex-col px-5 pb-8 pt-4">
          <div className="grid grid-cols-[40px_1fr_40px] items-center">
            <button
              type="button"
              aria-label="Open shopping bag"
              className="flex h-10 w-10 items-center justify-center text-[#2B211B]"
            >
              <ShoppingBag className="h-5 w-5" />
            </button>

            <Link
              href="/"
              aria-label="Go to homepage"
              className="justify-self-center"
              onClick={closeMenu}
            >
              <Image
                src="/logo/logo.png"
                width={176}
                height={32}
                alt="Blachh Logo"
                className="h-auto w-[144px]"
              />
            </Link>

            <button
              type="button"
              aria-label="Close menu"
              onClick={closeMenu}
              className="flex h-10 w-10 items-center justify-center justify-self-end text-[#2B211B]"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex flex-1 flex-col items-center justify-center gap-8 text-center">
            <Link
              href="/products"
              onClick={closeMenu}
              className="font-cormorant text-4xl leading-none tracking-[0.08em] text-[#2B211B]"
            >
              SHOP
            </Link>
            <Link
              href="/about"
              onClick={closeMenu}
              className="font-cormorant text-4xl leading-none tracking-[0.08em] text-[#2B211B]"
            >
              ABOUT
            </Link>
            <Link
              href="/contact"
              onClick={closeMenu}
              className="font-cormorant text-4xl leading-none tracking-[0.08em] text-[#2B211B]"
            >
              CONTACT
            </Link>
          </div>

          <div className="flex flex-col items-center gap-4 pb-6">
            <div className="flex items-center gap-6">
              <button
                type="button"
                className="flex items-center gap-1 font-cormorant text-sm tracking-[0.12em] text-[#2B211B]"
              >
                SEK
                <ChevronDown className="h-4 w-4" />
              </button>
              <button
                type="button"
                className="flex items-center gap-1 font-cormorant text-sm tracking-[0.12em] text-[#2B211B]"
              >
                ENG
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
