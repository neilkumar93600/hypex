import Hero from "@/components/hero/Hero";
import DropSection from "@/components/drop/DropSection";
import ProductGrid from "@/components/product/ProductGrid";
import CollectionPreview from "@/components/collection/CollectionPreview";
import SocialProof from "@/components/social/SocialProof";

export default function Home() {
  return (
    <>
      <Hero />
      <DropSection />
      <ProductGrid />
      <CollectionPreview />
      <SocialProof />
    </>
  );
}
