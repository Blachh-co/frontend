import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mail, MapPin, Store } from "lucide-react";

const contactHeroImage =
  "https://images.unsplash.com/photo-1755001437609-bb2abcde9755?auto=format&fit=crop&w=1400&q=80";

const partnershipHighlights = [
  {
    title: "Ceremonial-grade quality",
    description:
      "Stone-milled matcha designed for calm menus, considered retail shelves, and premium gifting moments.",
  },
  {
    title: "Display-ready brand presence",
    description:
      "A visual identity built to sit naturally in boutiques, cafes, studios, and hospitality spaces.",
  },
  {
    title: "Thoughtful wholesale support",
    description:
      "Sampling, launch guidance, and clear communication for partners who care about the full customer experience.",
  },
];

const details = [
  {
    label: "Best for",
    value: "Cafes, boutiques, concept stores, hotels, and wellness spaces",
    icon: Store,
  },
  {
    label: "Region",
    value: "Sweden, Europe, and selected international inquiries",
    icon: MapPin,
  },
  {
    label: "Direct email",
    value: "wholesale@blachh.co",
    icon: Mail,
  },
];

const formFields = [
  {
    label: "Name",
    name: "name",
    type: "text",
    placeholder: "Your full name",
  },
  {
    label: "Business / Store",
    name: "business",
    type: "text",
    placeholder: "Studio, cafe, boutique, or hotel",
  },
  {
    label: "Email",
    name: "email",
    type: "email",
    placeholder: "you@business.com",
  },
  {
    label: "Website or Instagram",
    name: "website",
    type: "text",
    placeholder: "Website URL or @handle",
  },
  {
    label: "Location",
    name: "location",
    type: "text",
    placeholder: "City, country",
  },
  {
    label: "Estimated order interest",
    name: "orderInterest",
    type: "text",
    placeholder: "Opening order size or expected cadence",
  },
];

export function ContactPage() {
  return (
    <div className="bg-[#F7F3EE] text-[#2B211B]">
      <section className="border-b border-[#E2DDD5] px-5 py-14 sm:px-6 md:px-12 md:py-20 lg:px-16">
        <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-14">
          <div className="max-w-2xl">
            <p className="font-hanken text-xs uppercase tracking-[0.18em] text-[#8E857E] sm:text-sm">
              WHOLESALE & PARTNERSHIPS
            </p>
            <h1 className="mt-3 font-libre text-[2.4rem] leading-[1.02] text-[#1C1C1A] sm:text-5xl md:text-[58px]">
              Let&apos;s bring Blachh to your shelves.
            </h1>
            <p className="mt-5 max-w-xl font-hanken text-sm leading-7 text-[#5A5A55] md:text-[15px]">
              For cafes, boutiques, hospitality spaces, and concept stores with
              a slower point of view. We partner with stockists who value
              quality, ritual, and a clear visual identity.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#wholesale-inquiry"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-sm bg-[#FFCAD4] px-6 font-hanken text-sm text-[#2B211B]"
              >
                Send an inquiry
                <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                href="mailto:wholesale@blachh.co"
                className="font-hanken text-sm text-[#2B211B] underline underline-offset-4"
              >
                wholesale@blachh.co
              </Link>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {details.map(({ label, value, icon: Icon }) => (
                <div
                  key={label}
                  className="rounded-2xl border border-[#E2DDD5] bg-[#FBF7F2] px-4 py-4"
                >
                  <Icon className="h-4 w-4 text-[#8CAF5A]" />
                  <p className="mt-4 font-hanken text-[11px] uppercase tracking-[0.18em] text-[#8E857E]">
                    {label}
                  </p>
                  <p className="mt-2 font-hanken text-sm leading-6 text-[#3F3731]">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
              <Image
                src={contactHeroImage}
                alt="Cafe interior with display shelves and counter"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#2B211B14] via-transparent to-white/6" />
          </div>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-6 md:px-12 md:py-18 lg:px-16">
        <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-14">
          <div className="max-w-md">
            <p className="font-hanken text-xs uppercase tracking-[0.18em] text-[#8E857E] sm:text-sm">
              Why partner with us
            </p>
            <h2 className="mt-3 font-libre text-[2rem] leading-tight text-[#1C1C1A] md:text-[44px]">
              A wholesale page that feels closer to a brand invitation.
            </h2>
            <p className="mt-4 font-hanken text-sm leading-7 text-[#5A5A55]">
              The right stockists usually want the same things your customers
              do: quality, clarity, and a product that looks intentional in the
              room.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {partnershipHighlights.map((item, index) => (
              <article
                key={item.title}
                className="flex min-h-60 flex-col justify-between rounded-[1.75rem] border border-[#E2DDD5] bg-[#FBF9F6] p-5"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F2E8DC] font-libre text-lg text-[#2B211B]">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div className="mt-10">
                  <h3 className="font-libre text-[1.45rem] leading-tight text-[#1C1C1A]">
                    {item.title}
                  </h3>
                  <p className="mt-3 font-hanken text-sm leading-7 text-[#5A5A55]">
                    {item.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="wholesale-inquiry"
        className="border-y border-[#E2DDD5] bg-[#FBF7F2] px-5 py-14 sm:px-6 md:px-12 md:py-18 lg:px-16"
      >
        <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <div className="max-w-md">
            <p className="font-hanken text-xs uppercase tracking-[0.18em] text-[#8E857E] sm:text-sm">
              Inquiry form
            </p>
            <h2 className="mt-3 font-libre text-[2rem] leading-tight text-[#1C1C1A] md:text-[44px]">
              Tell us a little about your space.
            </h2>
            <p className="mt-4 font-hanken text-sm leading-7 text-[#5A5A55]">
              Share your business, location, and what kind of partnership you
              have in mind. We can follow up with availability, pricing, and
              next steps.
            </p>

            <div className="mt-8 rounded-[1.75rem] border border-[#E2DDD5] bg-white p-5">
              <p className="font-hanken text-[11px] uppercase tracking-[0.18em] text-[#8E857E]">
                What we can share
              </p>
              <div className="mt-4 space-y-3 font-hanken text-sm leading-6 text-[#3F3731]">
                <p>Wholesale pricing and opening order guidance</p>
                <p>Lead times and shipping regions</p>
                <p>Sampling and launch support for selected partners</p>
                <p>Brand assets for retail or menu presentation</p>
              </div>
            </div>
          </div>

          <form className="rounded-[2rem] border border-[#E2DDD5] bg-white p-5 sm:p-6 md:p-8">
            <div className="grid gap-5 md:grid-cols-2">
              {formFields.map((field) => (
                <label
                  key={field.name}
                  className="flex flex-col gap-2 font-hanken text-sm text-[#3F3731]"
                >
                  <span>{field.label}</span>
                  <input
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    className="h-12 rounded-2xl border border-[#DDD5CC] bg-[#FBF9F6] px-4 text-sm text-[#2B211B] placeholder:text-[#9B938C]"
                  />
                </label>
              ))}

              <label className="flex flex-col gap-2 font-hanken text-sm text-[#3F3731] md:col-span-2">
                <span>Business type</span>
                <select className="h-12 rounded-2xl border border-[#DDD5CC] bg-[#FBF9F6] px-5 text-sm text-[#2B211B]">
                  <option>Cafe</option>
                  <option>Boutique</option>
                  <option>Hotel or hospitality</option>
                  <option>Wellness studio</option>
                  <option>Concept store</option>
                  <option>Other</option>
                </select>
              </label>

              <label className="flex flex-col gap-2 font-hanken text-sm text-[#3F3731] md:col-span-2">
                <span>Message</span>
                <textarea
                  name="message"
                  rows={6}
                  placeholder="Tell us about your store, menu, audience, or the kind of partnership you have in mind."
                  className="rounded-[1.5rem] border border-[#DDD5CC] bg-[#FBF9F6] px-4 py-3 text-sm leading-6 text-[#2B211B] placeholder:text-[#9B938C]"
                />
              </label>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-sm font-hanken text-xs leading-6 text-[#8E857E]">
                This form is a design-first inquiry surface for now. Direct
                email remains the fastest path for immediate wholesale requests.
              </p>
              <button
                type="submit"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-sm bg-[#8CAF5A] px-6 font-hanken text-sm text-[#F7F3EE]"
              >
                Submit inquiry
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </form>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-6 md:px-12 md:py-18 lg:px-16">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-5 rounded-[2rem] border border-[#E2DDD5] bg-[#F3ECE3] px-6 py-8 text-center sm:px-8 md:flex-row md:items-center md:justify-between md:text-left">
          <div className="flex items-center gap-4">
            <Image
              src="/mascots/BLACHH-02.png"
              alt="Blachh mascot"
              width={84}
              height={80}
              className="h-auto w-16 shrink-0"
            />
            <div>
              <p className="font-libre text-2xl leading-tight text-[#1C1C1A]">
                Prefer email?
              </p>
              <p className="mt-2 font-hanken text-sm leading-6 text-[#5A5A55]">
                Reach us directly at wholesale@blachh.co or visit{" "}
                <span className="font-medium text-[#2D4A2A]">@blachh.co</span>{" "}
                for the broader world around the brand.
              </p>
            </div>
          </div>

          <Link
            href="mailto:wholesale@blachh.co"
            className="inline-flex h-12 items-center justify-center rounded-sm border border-[#1C1C1A] px-6 font-hanken text-sm text-[#1C1C1A]"
          >
            Email wholesale team
          </Link>
        </div>
      </section>
    </div>
  );
}
