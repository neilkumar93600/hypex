"use client";

import { motion } from "framer-motion";
import { siteData } from "@/data/siteData";

export default function ShippingPage() {
  const { title, policies } = siteData.pages.shipping;

  return (
    <main className="min-h-screen bg-[#0B0B0B] pt-32 pb-20 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl font-black text-white tracking-tighter mb-12"
        >
          {title}
        </motion.h1>

        {/* Policy Cards */}
        <div className="space-y-4">
          {policies.map((policy, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-neutral-900/50 border border-neutral-800 p-6 sm:p-8 hover:border-neutral-700 transition-colors"
            >
              <h2 className="text-white font-bold text-sm tracking-widest mb-3">
                {policy.title}
              </h2>
              <p className="text-neutral-400 text-sm leading-relaxed">
                {policy.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
