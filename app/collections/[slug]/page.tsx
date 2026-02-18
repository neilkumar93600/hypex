"use client";

import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, SlidersHorizontal, X, PackageOpen } from "lucide-react";
import Link from "next/link";
import { siteData } from "@/data/siteData";
import ProductCard from "@/components/product/ProductCard";

type SortOption = "newest" | "price-low-high" | "price-high-low";

const SORT_OPTIONS: { label: string; value: SortOption }[] = [
  { label: "NEWEST", value: "newest" },
  { label: "PRICE: LOW-HIGH", value: "price-low-high" },
  { label: "PRICE: HIGH-LOW", value: "price-high-low" },
];

export default function CollectionPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;

  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [sortOpen, setSortOpen] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Find matching collection
  const collection = siteData.collections.find((c) => c.id === slug);

  const filteredAndSortedProducts = useMemo(() => {
    // Filter products whose category matches the collection id (slug)
    let products = siteData.products.filter((p) => p.category === slug);

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
        products.sort((a, b) => b.id - a.id);
        break;
    }

    return products;
  }, [slug, sortBy]);

  const currentSortLabel =
    SORT_OPTIONS.find((o) => o.value === sortBy)?.label ?? "NEWEST";

  // 404 state: collection not found
  if (!collection) {
    return (
      <section className="bg-[#0B0B0B] min-h-screen flex flex-col items-center justify-center text-center px-4">
        <PackageOpen className="w-16 h-16 text-neutral-700 mb-6" />
        <h1 className="text-3xl font-black uppercase tracking-tight text-white mb-3">
          Collection Not Found
        </h1>
        <p className="text-sm text-neutral-500 mb-8 max-w-md">
          The collection you&apos;re looking for doesn&apos;t exist or has been
          removed.
        </p>
        <Link
          href="/shop"
          className="px-8 py-3 bg-[#FFD400] text-black text-xs font-bold uppercase tracking-widest hover:bg-[#E6BF00] transition-colors"
        >
          Shop All Products
        </Link>
      </section>
    );
  }

  return (
    <section>
      {/* Collection Hero Banner */}
      <div className="relative w-full h-[280px] sm:h-[340px] md:h-[400px] overflow-hidden">
        {/* Background image + fallback */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${collection.image}), linear-gradient(135deg, #1a1a1a 0%, #0B0B0B 100%)`,
          }}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/65" />

        {/* Hero Content */}
        <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-10 md:pb-14">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-[10px] sm:text-xs tracking-widest text-neutral-400 mb-4">
            <Link
              href="/"
              className="hover:text-[#FFD400] transition-colors uppercase"
            >
              Home
            </Link>
            <span>/</span>
            <Link
              href="/shop"
              className="hover:text-[#FFD400] transition-colors uppercase"
            >
              Collections
            </Link>
            <span>/</span>
            <span className="text-white uppercase font-semibold">
              {collection.title}
            </span>
          </nav>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-6xl font-black uppercase tracking-tight text-white"
          >
            {collection.title}
          </motion.h1>

          {collection.description && (
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-3 text-sm md:text-base text-neutral-300 max-w-xl"
            >
              {collection.description}
            </motion.p>
          )}
        </div>
      </div>

      {/* Filter / Sort + Products */}
      <div className="bg-[#0B0B0B] min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* ---- Desktop Filter Bar ---- */}
          <div className="hidden md:flex items-center justify-between border-b border-neutral-800 pb-6 mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-neutral-500">
              Showing {filteredAndSortedProducts.length} Products
            </span>

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
                            ? "text-[#FFD400] bg-neutral-800"
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
              Sort
            </button>

            <span className="text-xs font-bold uppercase tracking-widest text-neutral-500">
              {filteredAndSortedProducts.length} Products
            </span>
          </div>

          {/* ---- Mobile Sort Panel ---- */}
          <AnimatePresence>
            {mobileFiltersOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="md:hidden overflow-hidden mb-6"
              >
                <div className="border border-neutral-800 bg-neutral-900/50 p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-widest text-white">
                      Sort By
                    </span>
                    <button
                      onClick={() => setMobileFiltersOpen(false)}
                      className="text-neutral-400 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {SORT_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => setSortBy(opt.value)}
                        className={`px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest border transition-all duration-200 ${
                          sortBy === opt.value
                            ? "bg-[#FFD400] text-black border-[#FFD400]"
                            : "bg-transparent text-neutral-400 border-neutral-700 hover:border-white hover:text-white"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ---- Product Grid ---- */}
          {filteredAndSortedProducts.length > 0 ? (
            <motion.div
              key={slug + sortBy}
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
                No Products Yet
              </h3>
              <p className="text-sm text-neutral-500 max-w-md">
                This collection doesn&apos;t have any products yet. Check back
                soon for the next drop.
              </p>
              <Link
                href="/shop"
                className="mt-6 inline-block px-8 py-3 bg-[#FFD400] text-black text-xs font-bold uppercase tracking-widest hover:bg-[#E6BF00] transition-colors"
              >
                Shop All Products
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
