"use client";

import { motion } from "framer-motion";
import { siteData } from "@/data/siteData";
import { Star } from "lucide-react";

export default function SocialProof() {
  return (
    <section className="py-24 px-4 bg-[#0B0B0B] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-[#FFD400] opacity-[0.02] blur-3xl rounded-full -translate-x-1/4 translate-y-1/4" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
        >
          {siteData.socialProof.stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl md:text-5xl font-black text-[#FFD400] mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-neutral-500 uppercase tracking-widest font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Section Header */}
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-black uppercase text-white mb-12"
        >
          What They Say <span className="text-[#FFD400]">.</span>
        </motion.h2>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {siteData.socialProof.testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-neutral-900 border border-neutral-800 p-6 hover:border-[#FFD400]/30 transition-colors duration-300"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-[#FFD400] text-[#FFD400]"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-white text-sm leading-relaxed mb-6">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-neutral-800 text-[#FFD400] flex items-center justify-center text-xs font-bold">
                  {testimonial.avatar}
                </div>
                <span className="text-xs text-neutral-400 font-bold uppercase tracking-wider">
                  {testimonial.author}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
