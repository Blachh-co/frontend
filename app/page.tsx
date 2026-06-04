import { Collections } from "@/components/home/Collections";
import { Hero } from "@/components/home/Hero";
import { OurCommuninity } from "@/components/home/OurCommuninity";
import { Testimonials } from "@/components/home/Testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <Collections />
      <OurCommuninity />
      <Testimonials />
    </>
  );
}
