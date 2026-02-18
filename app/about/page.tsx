"use client";

import { motion } from "framer-motion";
import { siteData } from "@/data/siteData";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6 },
};

export default function AboutPage() {
  const { title, subtitle, story, values } = siteData.pages.about;

  return (
    <main className="min-h-screen bg-[#0B0B0B]">
      {/* Hero Section */}
      <section className="pt-36 pb-20 px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl sm:text-6xl md:text-7xl font-black text-white tracking-tighter"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-neutral-400 text-lg sm:text-xl mt-4 max-w-xl mx-auto tracking-wide"
        >
          {subtitle}
        </motion.p>
      </section>

      {/* Story Section */}
      <section className="max-w-3xl mx-auto px-4 pb-20">
        <motion.div
          {...fadeUp}
          className="border-l-4 border-[#FFD400] pl-6 sm:pl-8"
        >
          <h2 className="text-xs font-bold tracking-widest text-[#FFD400] mb-6">
            OUR STORY
          </h2>
          <div className="space-y-5">
            {story.map((paragraph, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="text-neutral-400 text-base sm:text-lg leading-relaxed"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Values Grid */}
      <section className="max-w-4xl mx-auto px-4 pb-24">
        <motion.h2
          {...fadeUp}
          className="text-xs font-bold tracking-widest text-[#FFD400] mb-8 text-center"
        >
          OUR VALUES
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {values.map((value, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-neutral-900/50 border border-neutral-800 p-6 sm:p-8 hover:border-[#FFD400]/40 transition-colors"
            >
              <h3 className="text-[#FFD400] font-bold text-sm tracking-widest mb-3">
                {value.title}
              </h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
