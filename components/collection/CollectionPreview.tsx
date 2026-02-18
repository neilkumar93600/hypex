"use client";

import Link from "next/link";
import { siteData } from "@/data/siteData";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const collectionAccents = ["#FFFFFF", "#E5E5E5", "#FFFFFF"];

export default function CollectionPreview() {
  return (
    <section
      className="py-24 px-4 bg-[#0B0B0B] overflow-hidden relative"
      id="collections"
    >
      {/* Section Header */}
      <div className="max-w-7xl mx-auto mb-12">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-black uppercase text-white"
        >
          Collections <span className="text-[#FFFFFF]">.</span>
        </motion.h2>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {siteData.collections.map((collection, index) => (
          <Link
            key={collection.id}
            href={collection.link}
            className="group relative overflow-hidden block"
          >
            <motion.div
              className="relative h-[50vh] md:h-[60vh] bg-neutral-900 border border-neutral-800 group-hover:border-neutral-700 transition-colors duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
            >
              {/* Styled placeholder background */}
              <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 via-neutral-900 to-black">
                <div
                  className="absolute inset-0 opacity-[0.03]"
                  style={{
                    backgroundImage: `repeating-linear-gradient(${120 + index * 45}deg, #fff 0px, #fff 1px, transparent 1px, transparent 50px)`,
                  }}
                />
                {/* Large collection number */}
                <div className="absolute top-6 right-6">
                  <span
                    className="text-8xl md:text-9xl font-black leading-none opacity-[0.06]"
                    style={{ color: collectionAccents[index] }}
                  >
                    0{index + 1}
                  </span>
                </div>
              </div>

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <span className="text-[#FFFFFF] text-[10px] font-bold tracking-[0.3em] uppercase mb-3 block opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Explore Collection
                </span>
                <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-white leading-none mb-2">
                  {collection.title}
                </h3>
                {"description" in collection && collection.description && (
                  <p className="text-sm text-neutral-500 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 max-w-xs">
                    {collection.description}
                  </p>
                )}
              </div>

              {/* Hover Arrow */}
              <div className="absolute top-6 left-6 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <ArrowRight className="w-6 h-6 text-[#FFFFFF] -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
              </div>

              {/* Accent line on hover */}
              <div
                className="absolute bottom-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                style={{ backgroundColor: collectionAccents[index] }}
              />
            </motion.div>
          </Link>
        ))}
      </div>
    </section>
  );
}
