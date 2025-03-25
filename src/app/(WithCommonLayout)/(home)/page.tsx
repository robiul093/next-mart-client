'use client'

import Category from "@/components/modules/home/Category";
import FeaturedProduct from "@/components/modules/home/FeaturedProduct";
import FlashSell from "@/components/modules/home/FlashSell";
import HeroSection from "@/components/modules/home/HeroSection";

export default function HomePage() {


  return (
    <div className="bg-[#1B1B1B1A] py-10">
      <HeroSection />
      <Category />
      <FeaturedProduct />
      <FlashSell />
    </div>
  )
}
