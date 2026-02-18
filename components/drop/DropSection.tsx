"use client";

import { useState, useEffect } from "react";
import { siteData } from "@/data/siteData";
import { motion } from "framer-motion";

export default function DropSection() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const update = () => {
      const dropDate = new Date(siteData.drop.date).getTime();
      const now = new Date().getTime();
      const difference = dropDate - now;

      if (difference <= 0) return;

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        ),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      });
    };

    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="drop"
      className="relative bg-[#0B0B0B] text-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-stretch min-h-[80vh]">
        {/* Image Side */}
        <div className="relative w-full md:w-1/2 min-h-[40vh] md:min-h-[80vh]">
          {/* Styled placeholder */}
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 via-neutral-900 to-black">
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: `repeating-linear-gradient(-45deg, #fff 0px, #fff 1px, transparent 1px, transparent 30px)`,
              }}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
              <div className="w-32 h-32 md:w-48 md:h-48 border-2 border-neutral-700 rounded-full flex items-center justify-center mb-6">
                <span className="text-5xl md:text-7xl font-black text-neutral-700">V2</span>
              </div>
              <span className="text-neutral-600 text-xs uppercase tracking-[0.3em] font-bold">
                {siteData.drop.productName}
              </span>
            </div>
          </div>
          {/* Yellow accent line */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#FFD400]" />
        </div>

        {/* Content Side */}
        <div className="relative z-10 w-full md:w-1/2 p-8 md:p-16 lg:p-24 flex flex-col justify-center items-start space-y-8">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <div className="inline-block bg-[#E10600] text-white px-3 py-1 text-xs font-bold tracking-widest uppercase">
              {siteData.drop.stockStatus}
            </div>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.85]">
              {siteData.drop.productName}
            </h2>
            <p className="text-3xl md:text-4xl font-black text-[#FFD400]">
              {siteData.drop.price}
            </p>
          </motion.div>

          {/* Countdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="w-full max-w-md"
          >
            <p className="text-xs text-neutral-500 uppercase tracking-[0.2em] mb-4 font-bold">
              {siteData.drop.title}
            </p>
            <div className="grid grid-cols-4 gap-3">
              {Object.entries(timeLeft).map(([unit, value]) => (
                <div key={unit} className="bg-neutral-900 border border-neutral-800 p-4 text-center">
                  <span className="block text-3xl md:text-5xl font-black tabular-nums leading-none mb-1">
                    {String(value).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] uppercase text-neutral-500 tracking-wider font-bold">
                    {unit}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full max-w-md bg-[#FFD400] text-black text-lg font-black uppercase py-4 px-12 hover:bg-[#E6BF00] transition-colors"
          >
            {siteData.drop.cta}
          </motion.button>
        </div>
      </div>
    </section>
  );
}
