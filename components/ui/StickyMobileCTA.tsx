"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { siteData } from "@/data/siteData";

export default function StickyMobileCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling down 300px
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          className="fixed bottom-0 left-0 right-0 z-40 p-4 bg-black/90 backdrop-blur md:hidden border-t border-neutral-800"
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-col">
              <span className="text-white font-bold uppercase text-sm line-clamp-1">
                {siteData.drop.productName}
              </span>
              <span className="text-white font-mono text-xs">
                {siteData.drop.price}
              </span>
            </div>
            <button className="bg-white text-black font-bold uppercase py-3 px-6 text-sm whitespace-nowrap">
              {siteData.drop.cta}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
