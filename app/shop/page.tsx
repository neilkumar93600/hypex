"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, SlidersHorizontal, X, PackageOpen } from "lucide-react";
import Link from "next/link";
import { siteData } from "@/data/siteData";
import ProductCard from "@/components/product/ProductCard";

type Category = "all" | "new-arrivals" | "best-sellers" | "accessories";
type SortOption = "newest" | "price-low-high" | "price-high-low";

const CATEGORIES: { label: string; value: Category }[] = [
  { label: "ALL", value: "all" },
  { label: "NEW ARRIVALS", value: "new-arrivals" },
  { label: "BEST SELLERS", value: "best-sellers" },
  { label: "ACCESSORIES", value: "accessories" },
];

const SORT_OPTIONS: { label: string; value: SortOption }[] = [
  { label: "NEWEST", value: "newest" },
  { label: "PRICE: LOW-HIGH", value: "price-low-high" },
  { label: "PRICE: HIGH-LOW", value: "price-high-low" },
];

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [sortOpen, setSortOpen] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filteredAndSortedProducts = useMemo(() => {
    let products = [...siteData.products];

    // Filter by category
    if (activeCategory !== "all") {
      products = products.filter((p) => p.category === activeCategory);
    }

    // Sort
    switch (sortBy) {
      case "price-low-high":
        products.sort((a, b) => a.price - b.price);
        break;
      case "price-high-low":
        products.sort((a, b) => b.price - a.price);
        break;
      case "newest":
      default:
        // newest first by id descending
        products.sort((a, b) => b.id - a.id);
        break;
    }

    return products;
  }, [activeCategory, sortBy]);

  const currentSortLabel =
    SORT_OPTIONS.find((o) => o.value === sortBy)?.label ?? "NEWEST";

  return (
    <section>
      {/* Page Header — white background */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <nav className="flex items-center gap-2 text-xs tracking-widest text-neutral-400 mb-6">
            <Link
              href="/"
              className="hover:text-black transition-colors uppercase"
            >
              Home
            </Link>
            <span>/</span>
            <span className="text-black uppercase font-semibold">Shop</span>
          </nav>

          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-black">
            Shop All
          </h1>
        </div>
      </div>

      {/* Filter / Sort Bar + Products — dark bg */}
      <div className="bg-[#0B0B0B] min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* ---- Desktop Filter Bar ---- */}
          <div className="hidden md:flex items-center justify-between border-b border-neutral-800 pb-6 mb-8">
            {/* Category Pills */}
            <div className="flex items-center gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setActiveCategory(cat.value)}
                  className={`px-5 py-2 text-xs font-bold uppercase tracking-widest border transition-all duration-200 ${
                    activeCategory === cat.value
                      ? "bg-white text-black border-white"
                      : "bg-transparent text-neutral-400 border-neutral-700 hover:border-white hover:text-white"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <button
                onClick={() => setSortOpen(!sortOpen)}
                className="flex items-center gap-2 px-5 py-2 text-xs font-bold uppercase tracking-widest text-neutral-400 border border-neutral-700 hover:border-white hover:text-white transition-colors"
              >
                SORT: {currentSortLabel}
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    sortOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {sortOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 z-40 bg-neutral-900 border border-neutral-700 min-w-[200px]"
                  >
                    {SORT_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => {
                          setSortBy(opt.value);
                          setSortOpen(false);
                        }}
                        className={`block w-full text-left px-5 py-3 text-xs font-bold uppercase tracking-widest transition-colors ${
                          sortBy === opt.value
                            ? "text-white bg-neutral-800"
                            : "text-neutral-400 hover:text-white hover:bg-neutral-800"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* ---- Mobile Filter Toggle ---- */}
          <div className="md:hidden flex items-center justify-between border-b border-neutral-800 pb-4 mb-6">
            <button
              onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-white transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters &amp; Sort
            </button>

            <span className="text-xs font-bold uppercase tracking-widest text-neutral-500">
              {filteredAndSortedProducts.length} Products
            </span>
          </div>

          {/* ---- Mobile Filters Panel ---- */}
          <AnimatePresence>
            {mobileFiltersOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="md:hidden overflow-hidden mb-6"
              >
                <div className="border border-neutral-800 bg-neutral-900/50 p-4 space-y-5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-widest text-white">
                      Filter &amp; Sort
                    </span>
                    <button
                      onClick={() => setMobileFiltersOpen(false)}
                      className="text-neutral-400 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Categories */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">
                      Category
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {CATEGORIES.map((cat) => (
                        <button
                          key={cat.value}
                          onClick={() => setActiveCategory(cat.value)}
                          className={`px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest border transition-all duration-200 ${
                            activeCategory === cat.value
                              ? "bg-white text-black border-white"
                              : "bg-transparent text-neutral-400 border-neutral-700 hover:border-white hover:text-white"
                          }`}
                        >
                          {cat.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Sort */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">
                      Sort By
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {SORT_OPTIONS.map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => setSortBy(opt.value)}
                          className={`px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest border transition-all duration-200 ${
                            sortBy === opt.value
                              ? "bg-white text-black border-white"
                              : "bg-transparent text-neutral-400 border-neutral-700 hover:border-white hover:text-white"
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Result Count (desktop) */}
          <div className="hidden md:block mb-6">
            <span className="text-xs font-bold uppercase tracking-widest text-neutral-500">
              Showing {filteredAndSortedProducts.length} Products
            </span>
          </div>

          {/* ---- Product Grid ---- */}
          {filteredAndSortedProducts.length > 0 ? (
            <motion.div
              key={activeCategory + sortBy}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
            >
              {filteredAndSortedProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.07,
                    ease: "easeOut",
                  }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            /* Empty State */
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-24 text-center"
            >
              <PackageOpen className="w-16 h-16 text-neutral-700 mb-6" />
              <h3 className="text-xl font-bold uppercase tracking-wider text-white mb-2">
                No Products Found
              </h3>
              <p className="text-sm text-neutral-500 max-w-md">
                No products match the current filters. Try selecting a different
                category or clearing filters.
              </p>
              <button
                onClick={() => {
                  setActiveCategory("all");
                  setSortBy("newest");
                }}
                className="mt-6 px-8 py-3 bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-neutral-200 transition-colors"
              >
                Clear Filters
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
