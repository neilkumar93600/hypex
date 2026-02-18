"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function MiniCart() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Trigger */}
      <button
        onClick={() => setIsOpen(true)}
        className="relative group p-2 hover:bg-neutral-800 rounded-full transition-colors"
      >
        <ShoppingBag className="w-6 h-6 text-white group-hover:text-[#FFD400] transition-colors" />
        <span className="absolute -top-1 -right-1 bg-[#FFD400] text-black text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
          2
        </span>
      </button>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 cursor-pointer"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-neutral-900 border-l border-neutral-800 z-50 shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-neutral-800">
                <h2 className="text-xl font-black uppercase text-white tracking-widest">
                  YOUR STASH <span className="text-[#FFD400]">(2)</span>
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="bg-neutral-800 hover:bg-neutral-700 p-2 rounded-full transition-colors text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Items */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Mock Item 1 */}
                <div className="flex gap-4">
                  <div className="w-20 h-20 bg-neutral-800 rounded flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-white uppercase mb-1">
                      Oversized Graphic Hoodie
                    </h3>
                    <p className="text-xs text-neutral-400 mb-2">
                      Size: L | Color: Black
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-[#FFD400] font-mono">$85.00</span>
                      <div className="flex items-center space-x-2 bg-neutral-800 px-2 py-1 rounded text-xs text-white">
                        <button>-</button>
                        <span>1</span>
                        <button>+</button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mock Item 2 */}
                <div className="flex gap-4">
                  <div className="w-20 h-20 bg-neutral-800 rounded flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-white uppercase mb-1">
                      Cargo Utility Pants
                    </h3>
                    <p className="text-xs text-neutral-400 mb-2">
                      Size: 32 | Color: Olive
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-[#FFD400] font-mono">$110.00</span>
                      <div className="flex items-center space-x-2 bg-neutral-800 px-2 py-1 rounded text-xs text-white">
                        <button>-</button>
                        <span>1</span>
                        <button>+</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-neutral-800 bg-neutral-900">
                <div className="flex justify-between items-center mb-4 text-white">
                  <span className="text-sm font-bold uppercase">Subtotal</span>
                  <span className="font-mono text-lg">$195.00</span>
                </div>
                <div className="bg-[#111] p-3 mb-4 rounded text-xs text-neutral-400 text-center">
                  Shipping & Taxes calculated at checkout
                </div>
                <Link
                  href="/checkout"
                  onClick={() => setIsOpen(false)}
                  className="block w-full bg-[#FFD400] text-black font-black uppercase py-4 hover:bg-[#E6BF00] transition-colors tracking-widest text-lg text-center"
                >
                  SECURE CHECKOUT
                </Link>
                <Link
                  href="/cart"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center text-sm text-neutral-400 hover:text-white transition-colors uppercase tracking-widest mt-3 font-bold"
                >
                  View Full Cart
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
