"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import { siteData } from "@/data/siteData";
import ProductCard from "@/components/product/ProductCard";

const popularTags = ["HOODIE", "CARGO", "LIMITED", "BEANIE", "TEE", "JOGGERS"];

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus the search input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Debounce the search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  const results = debouncedQuery
    ? siteData.products.filter((p) =>
        p.name.toLowerCase().includes(debouncedQuery.toLowerCase())
      )
    : [];

  const handleTagClick = useCallback((tag: string) => {
    setQuery(tag);
    setDebouncedQuery(tag);
    inputRef.current?.focus();
  }, []);

  const clearSearch = useCallback(() => {
    setQuery("");
    setDebouncedQuery("");
    inputRef.current?.focus();
  }, []);

  return (
    <main className="min-h-screen bg-[#0B0B0B] pt-32 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Search Input */}
        <div className="relative mb-10">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-neutral-500" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="SEARCH PRODUCTS..."
            className="w-full bg-neutral-900 border border-neutral-800 text-white text-lg sm:text-xl font-bold tracking-wider pl-14 pr-14 py-5 placeholder:text-neutral-600 focus:outline-none focus:border-[#FFD400] transition-colors"
          />
          {query && (
            <button
              onClick={clearSearch}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          )}
        </div>

        {/* Content */}
        {debouncedQuery ? (
          <>
            {/* Search query label */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-neutral-500 text-xs tracking-widest mb-8"
            >
              SEARCHING FOR:{" "}
              <span className="text-white font-bold">
                &ldquo;{debouncedQuery}&rdquo;
              </span>
            </motion.p>

            {/* Results */}
            <AnimatePresence mode="wait">
              {results.length > 0 ? (
                <motion.div
                  key={debouncedQuery}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
                >
                  {results.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-20"
                >
                  <p className="text-neutral-500 text-sm tracking-widest">
                    NO PRODUCTS FOUND FOR{" "}
                    <span className="text-white font-bold">
                      &lsquo;{debouncedQuery}&rsquo;
                    </span>
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        ) : (
          /* Default state - no query */
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-10"
          >
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tighter mb-8">
              SEARCH OUR COLLECTION
            </h2>

            <div className="flex flex-wrap justify-center gap-3">
              {popularTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleTagClick(tag)}
                  className="border border-neutral-700 text-neutral-400 text-xs font-bold tracking-widest px-5 py-2.5 hover:border-[#FFD400] hover:text-[#FFD400] transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </main>
  );
}
