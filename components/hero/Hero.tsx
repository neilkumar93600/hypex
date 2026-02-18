"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { siteData } from "@/data/siteData";
import Link from "next/link";

export default function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#0B0B0B] text-white flex items-center justify-center">
      {/* Background — gradient + subtle pattern */}
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-neutral-900" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.05)_0%,_transparent_70%)]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, #fff 0px, #fff 1px, transparent 1px, transparent 40px)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-transparent to-[#0B0B0B]/50" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <span className="text-white text-xs md:text-sm font-bold uppercase tracking-[0.3em] opacity-80">
            {siteData.slogan}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-7xl sm:text-8xl md:text-9xl font-black tracking-tighter uppercase mb-6 text-white leading-[0.85]"
        >
          {siteData.hero.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-sm md:text-base font-medium tracking-[0.15em] uppercase mb-10 text-neutral-400 max-w-xl mx-auto leading-relaxed"
        >
          {siteData.hero.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Link
            href="#featured"
            className="inline-block bg-white text-black font-black text-lg md:text-xl px-12 py-4 uppercase border-2 border-white hover:bg-transparent hover:text-white transition-all duration-300"
          >
            {siteData.hero.cta}
          </Link>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-500">
          Scroll
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-neutral-500 to-transparent animate-pulse" />
      </motion.div>
    </section>
  );
}
