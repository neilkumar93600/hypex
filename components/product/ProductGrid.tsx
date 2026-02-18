"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import ProductCard from "./ProductCard";
import { siteData } from "@/data/siteData";

export default function ProductGrid() {
  return (
    <section
      className="py-24 px-4 scroll-m-20 w-full max-w-7xl mx-auto"
      id="products"
    >
      <div className="flex justify-between items-end mb-12">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-black uppercase text-white"
        >
          Latest Heat <span className="text-[#FFD400]">.</span>
        </motion.h2>
        <Link href="/shop" className="hidden md:inline-block border-2 border-neutral-800 text-white hover:text-[#FFD400] hover:border-[#FFD400] font-mono text-sm uppercase px-6 py-2 transition-colors">
          View All Drops
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {siteData.featuredProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>

      <div className="mt-12 text-center md:hidden">
        <Link href="/shop" className="block w-full border-2 border-neutral-800 text-white font-mono text-sm uppercase px-6 py-4 hover:bg-neutral-900 transition-colors text-center">
          View All Drops
        </Link>
      </div>
    </section>
  );
}
