"use client";

import Link from "next/link";
import { siteData } from "@/data/siteData";
import Image from "next/image";
import { useState } from "react";

export default function ProductCard({
  product,
}: {
  product: (typeof siteData.featuredProducts)[0];
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <Link
      href={product.link}
      className="block group w-full h-full relative"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-neutral-900 border border-neutral-800 hover:border-[#FFD400] transition-colors duration-300">
        {/* Tag */}
        {product.tag && (
          <div className="absolute top-4 left-4 z-10 bg-black/80 backdrop-blur-sm text-white text-xs font-bold uppercase py-1 px-3 border-l-4 border-[#FFD400]">
            {product.tag}
          </div>
        )}

        {/* Product Image or Placeholder */}
        <div className="w-full h-full relative group-hover:scale-105 transition-transform duration-500 ease-out">
          {!imgError ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              onError={() => setImgError(true)}
            />
          ) : (
            /* Styled placeholder when image is missing */
            <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 via-neutral-900 to-black flex flex-col items-center justify-center p-6">
              <div className="w-16 h-16 border-2 border-neutral-700 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-black text-neutral-600">
                  {product.name.charAt(0)}
                </span>
              </div>
              <span className="text-neutral-600 text-xs uppercase tracking-[0.2em] text-center font-bold">
                {product.name}
              </span>
            </div>
          )}
        </div>

        {/* Overlay on hover */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
          <button className="w-full bg-[#FFD400] text-black font-bold uppercase py-3 text-sm tracking-widest hover:bg-[#E6BF00] transition-colors">
            Quick Add
          </button>
        </div>
      </div>

      <div className="mt-4 flex justify-between items-start">
        <h3 className="text-sm font-bold uppercase tracking-wider text-white group-hover:text-[#FFD400] transition-colors line-clamp-1">
          {product.name}
        </h3>
        <span className="text-sm text-neutral-400 whitespace-nowrap ml-2">
          ${product.price}
        </span>
      </div>
    </Link>
  );
}
