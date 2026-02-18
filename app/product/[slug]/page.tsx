"use client";

import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, ShieldCheck, AlertTriangle, ChevronRight } from "lucide-react";
import { siteData, Product } from "@/data/siteData";
import ProductCard from "@/components/product/ProductCard";

// ─── Helpers ────────────────────────────────────────────────────────────────

function StarRating({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <span className="inline-flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={size}
          className={
            i < Math.round(rating)
              ? "fill-[#FFD400] text-[#FFD400]"
              : "fill-none text-neutral-600"
          }
        />
      ))}
    </span>
  );
}

function averageRating(product: Product): number {
  if (!product.reviews || product.reviews.length === 0) return 0;
  const sum = product.reviews.reduce((acc, r) => acc + r.rating, 0);
  return sum / product.reviews.length;
}

// ─── Animation Variants ─────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

// ─── Tabs ───────────────────────────────────────────────────────────────────

type TabKey = "description" | "details" | "size-guide";

// ─── Page Component ─────────────────────────────────────────────────────────

export default function ProductDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;

  const product = siteData.products.find((p) => p.slug === slug);

  // ── State ──────────────────────────────────────────────────────────
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabKey>("description");

  // Determine size guide type based on category keywords
  const sizeGuideType: "clothing" | "pants" = useMemo(() => {
    if (!product) return "clothing";
    const cat = product.category.toLowerCase();
    const name = product.name.toLowerCase();
    if (
      cat.includes("pants") ||
      name.includes("pants") ||
      name.includes("joggers") ||
      name.includes("cargo")
    ) {
      return "pants";
    }
    return "clothing";
  }, [product]);

  // Related products: same category, exclude current, max 4
  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return siteData.products
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, 4);
  }, [product]);

  // ── Not Found ──────────────────────────────────────────────────────
  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 px-4">
        <h1 className="text-4xl font-black uppercase tracking-tight">
          Product Not Found
        </h1>
        <p className="text-[#9CA3AF]">
          The product you are looking for does not exist or has been removed.
        </p>
        <Link
          href="/shop"
          className="bg-[#FFD400] hover:bg-[#E6BF00] text-black font-bold uppercase px-8 py-3 text-sm tracking-widest transition-colors"
        >
          Back to Shop
        </Link>
      </div>
    );
  }

  // ── Derived ────────────────────────────────────────────────────────
  const images = product.images && product.images.length > 0 ? product.images : [product.image];
  const isSoldOut = product.stock === 0;
  const isLowStock =
    product.stock !== undefined && product.stock > 0 && product.stock <= 5;
  const avgRating = averageRating(product);
  const reviewCount = product.reviews ? product.reviews.length : 0;

  // Also determine if sizes look like pant sizes (numbers)
  const hasPantSizes =
    product.sizes &&
    product.sizes.length > 0 &&
    product.sizes.every((s) => /^\d+$/.test(s));

  const effectiveSizeGuideType = hasPantSizes ? "pants" : sizeGuideType;
  const effectiveSizeGuide = siteData.sizeGuide[effectiveSizeGuideType];

  return (
    <div className="bg-[#0B0B0B] min-h-screen">
      {/* ─── Above The Fold ────────────────────────────────────────── */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12"
      >
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* ── Left: Image Gallery (60%) ───────────────────────────── */}
          <div className="w-full lg:w-[60%]">
            {/* Main Image */}
            <div className="relative aspect-[3/4] bg-neutral-900 overflow-hidden border border-neutral-800">
              <div
                className="absolute inset-0 bg-cover bg-center transition-all duration-500"
                style={{
                  backgroundImage: `url(${images[selectedImageIndex]}), repeating-linear-gradient(45deg, #111, #111 20px, #151515 20px, #151515 40px)`,
                }}
              />
              {/* Fallback text */}
              <div className="absolute inset-0 flex items-center justify-center text-neutral-700 font-mono text-sm opacity-20">
                {product.name}
              </div>
            </div>

            {/* Thumbnail Strip */}
            {images.length > 1 && (
              <div className="mt-3 flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImageIndex(i)}
                    className={`relative flex-shrink-0 w-20 h-24 bg-neutral-900 border-2 transition-colors duration-200 overflow-hidden ${
                      selectedImageIndex === i
                        ? "border-[#FFD400]"
                        : "border-neutral-800 hover:border-neutral-600"
                    }`}
                  >
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{
                        backgroundImage: `url(${img}), repeating-linear-gradient(45deg, #111, #111 10px, #151515 10px, #151515 20px)`,
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Right: Product Info (40%) ───────────────────────────── */}
          <div className="w-full lg:w-[40%] flex flex-col gap-5">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-xs text-[#9CA3AF] uppercase tracking-widest">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <ChevronRight size={12} />
              <Link href="/shop" className="hover:text-white transition-colors">
                Shop
              </Link>
              <ChevronRight size={12} />
              <span className="text-white truncate">{product.name}</span>
            </nav>

            {/* Tag Badge */}
            {product.tag && (
              <div className="inline-flex self-start bg-black border-l-4 border-[#FFD400] text-white text-xs font-bold uppercase py-1.5 px-4 tracking-wider">
                {product.tag}
              </div>
            )}

            {/* Product Name */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight leading-none">
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-center gap-3">
              {product.originalPrice && (
                <span className="text-lg text-[#9CA3AF] line-through font-mono">
                  ${product.originalPrice}
                </span>
              )}
              <span
                className={`text-2xl font-black font-mono ${
                  product.originalPrice ? "text-[#FFD400]" : "text-white"
                }`}
              >
                ${product.price}
              </span>
            </div>

            {/* Rating */}
            {reviewCount > 0 && (
              <div className="flex items-center gap-2">
                <StarRating rating={avgRating} />
                <span className="text-sm text-[#9CA3AF]">
                  ({reviewCount} {reviewCount === 1 ? "review" : "reviews"})
                </span>
              </div>
            )}

            {/* Stock Warnings */}
            {isLowStock && (
              <div className="inline-flex self-start items-center gap-2 bg-[#E10600]/10 border border-[#E10600]/30 text-[#E10600] text-xs font-bold uppercase py-1.5 px-3 tracking-wider">
                <AlertTriangle size={14} />
                ONLY {product.stock} LEFT
              </div>
            )}

            {isSoldOut && (
              <div className="inline-flex self-start items-center gap-2 bg-neutral-800 text-[#9CA3AF] text-xs font-bold uppercase py-1.5 px-3 tracking-wider">
                SOLD OUT
              </div>
            )}

            {/* ── Size Selector ──────────────────────────────────────── */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-[#9CA3AF]">
                  Size
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[48px] px-4 py-2.5 text-sm font-bold uppercase tracking-wider border transition-colors duration-200 ${
                        selectedSize === size
                          ? "bg-[#FFD400] text-black border-[#FFD400]"
                          : "bg-transparent text-white border-neutral-700 hover:border-neutral-500"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ── Color Selector ─────────────────────────────────────── */}
            {product.colors && product.colors.length > 0 && (
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-[#9CA3AF]">
                  Color{" "}
                  {selectedColor && (
                    <span className="text-white ml-2">
                      — {product.colors.find((c) => c.hex === selectedColor)?.name}
                    </span>
                  )}
                </label>
                <div className="flex items-center gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.hex}
                      onClick={() => setSelectedColor(color.hex)}
                      title={color.name}
                      className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${
                        selectedColor === color.hex
                          ? "border-[#FFD400] ring-2 ring-[#FFD400] ring-offset-2 ring-offset-[#0B0B0B]"
                          : "border-neutral-600 hover:border-neutral-400"
                      }`}
                      style={{ backgroundColor: color.hex }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* ── Add to Cart ────────────────────────────────────────── */}
            <button
              disabled={isSoldOut}
              className={`w-full py-4 text-sm font-black uppercase tracking-[0.2em] transition-colors duration-200 mt-2 ${
                isSoldOut
                  ? "bg-neutral-800 text-[#9CA3AF] cursor-not-allowed"
                  : "bg-[#FFD400] text-black hover:bg-[#E6BF00] active:scale-[0.98] transition-transform"
              }`}
            >
              {isSoldOut ? "SOLD OUT" : "ADD TO CART"}
            </button>
          </div>
        </div>
      </motion.section>

      {/* ─── Below The Fold: Tabs ──────────────────────────────────── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={fadeUp}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-neutral-800"
      >
        {/* Tab Buttons */}
        <div className="flex gap-0 border-b border-neutral-800 overflow-x-auto scrollbar-hide">
          {(
            [
              { key: "description" as TabKey, label: "DESCRIPTION" },
              { key: "details" as TabKey, label: "DETAILS" },
              { key: "size-guide" as TabKey, label: "SIZE GUIDE" },
            ] as const
          ).map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`relative px-6 py-4 text-sm font-bold uppercase tracking-widest whitespace-nowrap transition-colors ${
                activeTab === tab.key
                  ? "text-[#FFD400]"
                  : "text-[#9CA3AF] hover:text-white"
              }`}
            >
              {tab.label}
              {activeTab === tab.key && (
                <motion.div
                  layoutId="tab-underline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FFD400]"
                />
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="py-8 min-h-[200px]">
          {activeTab === "description" && (
            <motion.div
              key="description"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-3xl"
            >
              <p className="text-[#9CA3AF] text-base leading-relaxed">
                {product.description || "No description available."}
              </p>
            </motion.div>
          )}

          {activeTab === "details" && (
            <motion.div
              key="details"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-3xl"
            >
              {product.details && product.details.length > 0 ? (
                <ul className="space-y-3">
                  {product.details.map((detail, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-[#9CA3AF]"
                    >
                      <span className="mt-1.5 w-1.5 h-1.5 bg-[#FFD400] rounded-full flex-shrink-0" />
                      <span className="text-base">{detail}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-[#9CA3AF]">No details available.</p>
              )}
            </motion.div>
          )}

          {activeTab === "size-guide" && (
            <motion.div
              key="size-guide"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-3xl overflow-x-auto"
            >
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr>
                    {effectiveSizeGuide.headers.map((header) => (
                      <th
                        key={header}
                        className="py-3 px-4 text-xs font-bold uppercase tracking-widest text-[#FFD400] border-b border-neutral-800"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {effectiveSizeGuide.rows.map((row, i) => (
                    <tr
                      key={i}
                      className="border-b border-neutral-800/50 hover:bg-neutral-900/50 transition-colors"
                    >
                      {row.map((cell, j) => (
                        <td
                          key={j}
                          className={`py-3 px-4 text-sm ${
                            j === 0
                              ? "font-bold text-white"
                              : "text-[#9CA3AF]"
                          }`}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          )}
        </div>
      </motion.section>

      {/* ─── Reviews Section ───────────────────────────────────────── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={fadeUp}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-neutral-800"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <h2 className="text-2xl font-black uppercase tracking-tight">
            Reviews{" "}
            <span className="text-[#9CA3AF] text-lg font-mono">
              ({reviewCount})
            </span>
          </h2>
          {reviewCount > 0 && (
            <div className="flex items-center gap-3">
              <StarRating rating={avgRating} size={20} />
              <span className="text-sm text-[#9CA3AF]">
                {avgRating.toFixed(1)} out of 5
              </span>
            </div>
          )}
        </div>

        {/* Review Cards */}
        {reviewCount > 0 ? (
          <div className="grid gap-6">
            {product.reviews!.map((review) => (
              <motion.div
                key={review.id}
                variants={fadeUp}
                className="border border-neutral-800 bg-neutral-900/30 p-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-white uppercase">
                      {review.author}
                    </span>
                    {review.verified && (
                      <span className="inline-flex items-center gap-1 text-xs text-[#FFD400] font-bold uppercase">
                        <ShieldCheck size={14} />
                        Verified
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-[#9CA3AF]">
                    {new Date(review.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>

                <StarRating rating={review.rating} size={14} />

                <h4 className="text-base font-bold text-white mt-3 uppercase">
                  {review.title}
                </h4>
                <p className="text-sm text-[#9CA3AF] mt-1.5 leading-relaxed">
                  {review.body}
                </p>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="border border-neutral-800 bg-neutral-900/30 p-12 text-center">
            <p className="text-[#9CA3AF] text-sm uppercase tracking-widest">
              No reviews yet
            </p>
            <p className="text-neutral-600 text-xs mt-2">
              Be the first to review this product.
            </p>
          </div>
        )}
      </motion.section>

      {/* ─── Related Products ──────────────────────────────────────── */}
      {relatedProducts.length > 0 && (
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeUp}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-neutral-800"
        >
          <h2 className="text-2xl font-black uppercase tracking-tight mb-8">
            You May Also Like
          </h2>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6"
          >
            {relatedProducts.map((rp) => (
              <motion.div key={rp.id} variants={fadeUp}>
                <ProductCard product={rp} />
              </motion.div>
            ))}
          </motion.div>

          {/* Mobile horizontal scroll alternative */}
          <div className="md:hidden -mx-4 px-4 overflow-x-auto scrollbar-hide mt-6">
            <div className="flex gap-4 w-max">
              {relatedProducts.map((rp) => (
                <motion.div
                  key={`mobile-${rp.id}`}
                  variants={fadeUp}
                  className="w-[200px] flex-shrink-0"
                >
                  <ProductCard product={rp} />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      {/* Bottom spacing */}
      <div className="h-12" />
    </div>
  );
}
