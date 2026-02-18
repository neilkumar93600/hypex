"use client";

import { siteData } from "@/data/siteData";
import { motion } from "framer-motion";
import Image from "next/image";

export default function DropSection() {
  return (
    <section
      id="featured"
      className="relative bg-[#0B0B0B] text-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-stretch min-h-[80vh]">
        {/* Image Side */}
        <div className="relative w-full md:w-1/2 min-h-[40vh] md:min-h-[80vh] bg-neutral-900">
          {/* Background Pattern */}
          <div
            className="absolute inset-0 opacity-[0.04] z-0"
            style={{
              backgroundImage: `repeating-linear-gradient(-45deg, #fff 0px, #fff 1px, transparent 1px, transparent 30px)`,
            }}
          />

          <div className="absolute inset-0 flex items-center justify-center p-8 z-10">
            {/* Main Product Image Placeholder or Actual Image */}
            {/* If we had a real image component we'd use it, for now using a styled placeholder or the image path if available */}
            <div className="relative w-full h-full flex items-center justify-center">
              <div className="w-64 h-64 md:w-96 md:h-96 relative flex items-center justify-center">
                {/* Circle Background */}
                <div className="absolute inset-0 border border-neutral-800 rounded-full opacity-20 transform scale-150" />
                <div className="absolute inset-0 border border-neutral-800 rounded-full opacity-20 transform scale-125" />

                {/* Product Name as Placeholder Art */}
                <span className="text-neutral-800 text-6xl md:text-8xl font-black uppercase tracking-tighter opacity-20 rotate-[-15deg] select-none">
                  VOID
                </span>

                {/* Actual product image would go here */}
                {/* <Image src={siteData.drop.productImage} alt={siteData.drop.productName} fill className="object-contain" /> */}
              </div>
            </div>
          </div>

          {/* Accent line */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white" />
        </div>

        {/* Content Side */}
        <div className="relative z-10 w-full md:w-1/2 p-8 md:p-16 lg:p-24 flex flex-col justify-center items-start space-y-8">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="inline-block bg-white text-black px-4 py-1 text-xs font-bold tracking-widest uppercase mb-2">
              {siteData.drop.title}
            </div>

            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.85] text-white">
              {siteData.drop.productName}
            </h2>

            <p className="text-3xl md:text-4xl font-medium text-neutral-400">
              {siteData.drop.price}
            </p>

            <p className="text-neutral-400 max-w-md leading-relaxed">
              Experience the next evolution in streetwear. Premium materials,
              unmatched comfort, and a silhouette that defines the modern era.
            </p>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full max-w-md bg-white text-black text-lg font-black uppercase py-4 px-12 hover:bg-neutral-200 transition-colors"
          >
            {siteData.drop.cta}
          </motion.button>
        </div>
      </div>
    </section>
  );
}
