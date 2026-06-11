import type { Dictionary } from "@/lib/i18n";

interface BannerProps {
  dictionary: Dictionary["banner"];
}

export function Banner({ dictionary }: BannerProps) {
  return (
    <div className="w-full flex justify-center items-center bg-[#8CAF5A] h-10">
      <p className="font-cormorant text-sm text-[#F7F3EE]">{dictionary.message}</p>
    </div>
  );
}
