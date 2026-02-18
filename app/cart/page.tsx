"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, X, ShoppingBag, ArrowRight, Tag } from "lucide-react";
import { siteData, type Product } from "@/data/siteData";

interface CartItem {
  product: Product;
  quantity: number;
  size: string;
  color: string;
}

const initialCartItems: CartItem[] = [
  {
    product: siteData.products[0],
    quantity: 1,
    size: siteData.products[0].sizes?.[1] ?? "M",
    color: siteData.products[0].colors?.[0]?.name ?? "Black",
  },
  {
    product: siteData.products[1],
    quantity: 1,
    size: siteData.products[1].sizes?.[2] ?? "32",
    color: siteData.products[1].colors?.[0]?.name ?? "Black",
  },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  const updateQuantity = (index: number, delta: number) => {
    setCartItems((prev) =>
      prev.map((item, i) => {
        if (i !== index) return item;
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      })
    );
  };

  const removeItem = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const shippingCost = subtotal >= 150 ? 0 : 7.99;
  const total = subtotal + shippingCost;

  const handleApplyPromo = () => {
    if (promoCode.trim().length > 0) {
      setPromoApplied(true);
    }
  };

  // Empty cart state
  if (cartItems.length === 0) {
    return (
      <section className="min-h-[80vh] flex flex-col items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <ShoppingBag className="w-20 h-20 text-neutral-700 mx-auto mb-6" />
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
            YOUR CART IS EMPTY
          </h1>
          <p className="text-[#9CA3AF] mb-8 max-w-md mx-auto">
            Looks like you haven&apos;t added anything to your cart yet. Browse
            our latest drops and find something you love.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-[#FFD400] hover:bg-[#E6BF00] text-black font-bold text-sm uppercase tracking-wider px-8 py-4 transition-colors duration-200"
          >
            CONTINUE SHOPPING
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Page Title */}
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-3xl md:text-5xl font-black tracking-tight mb-8 md:mb-12"
      >
        YOUR CART
      </motion.h1>

      <div className="lg:grid lg:grid-cols-3 lg:gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="popLayout">
            {cartItems.map((item, index) => (
              <motion.div
                key={`${item.product.id}-${item.size}-${item.color}`}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20, height: 0, marginBottom: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <div className="flex gap-4 sm:gap-6 py-6">
                  {/* Product Image Placeholder */}
                  <div className="w-[120px] h-[120px] flex-shrink-0 bg-neutral-900 rounded-lg flex items-center justify-center overflow-hidden">
                    <ShoppingBag className="w-8 h-8 text-neutral-700" />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-bold text-sm sm:text-base uppercase tracking-wide leading-tight">
                          {item.product.name}
                        </h3>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1.5 text-xs sm:text-sm text-[#9CA3AF]">
                          <span>Size: {item.size}</span>
                          <span>Color: {item.color}</span>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeItem(index)}
                        className="p-1.5 text-neutral-500 hover:text-[#E10600] transition-colors flex-shrink-0"
                        aria-label="Remove item"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Quantity + Price Row */}
                    <div className="flex items-center justify-between mt-4">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-neutral-700 rounded">
                        <button
                          onClick={() => updateQuantity(index, -1)}
                          className="w-9 h-9 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-10 h-9 flex items-center justify-center text-sm font-semibold border-x border-neutral-700">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(index, 1)}
                          className="w-9 h-9 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Item Price */}
                      <p className="font-bold text-sm sm:text-base">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                {index < cartItems.length - 1 && (
                  <div className="border-b border-neutral-800" />
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Cart Summary Sidebar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="lg:col-span-1 mt-8 lg:mt-0"
        >
          <div className="bg-neutral-900/60 border border-neutral-800 rounded-xl p-6 sticky top-28">
            <h2 className="text-lg font-bold uppercase tracking-wide mb-6">
              Order Summary
            </h2>

            {/* Subtotal */}
            <div className="flex justify-between text-sm mb-3">
              <span className="text-[#9CA3AF]">Subtotal</span>
              <span className="font-semibold">${subtotal.toFixed(2)}</span>
            </div>

            {/* Shipping */}
            <div className="flex justify-between text-sm mb-3">
              <span className="text-[#9CA3AF]">Shipping</span>
              <span className="font-semibold">
                {shippingCost === 0 ? (
                  <span className="text-green-400">FREE</span>
                ) : (
                  `$${shippingCost.toFixed(2)}`
                )}
              </span>
            </div>

            {shippingCost > 0 && (
              <p className="text-xs text-[#9CA3AF] mb-3">
                Add ${(150 - subtotal).toFixed(2)} more for free shipping
              </p>
            )}

            <div className="border-t border-neutral-700 my-4" />

            {/* Total */}
            <div className="flex justify-between text-base mb-6">
              <span className="font-bold">Estimated Total</span>
              <span className="font-black text-lg">${total.toFixed(2)}</span>
            </div>

            {/* Promo Code */}
            <div className="mb-6">
              <label className="text-xs text-[#9CA3AF] uppercase tracking-wider block mb-2">
                Promo Code
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => {
                      setPromoCode(e.target.value);
                      setPromoApplied(false);
                    }}
                    placeholder="Enter code"
                    className="w-full bg-neutral-800 border border-neutral-700 rounded-lg pl-10 pr-3 py-2.5 text-sm placeholder:text-neutral-600 focus:outline-none focus:border-[#FFD400] transition-colors"
                  />
                </div>
                <button
                  onClick={handleApplyPromo}
                  className="px-4 py-2.5 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  Apply
                </button>
              </div>
              {promoApplied && (
                <p className="text-xs text-[#9CA3AF] mt-2">
                  Invalid promo code. Please try again.
                </p>
              )}
            </div>

            {/* Checkout Button */}
            <Link
              href="/checkout"
              className="flex items-center justify-center gap-2 w-full bg-[#FFD400] hover:bg-[#E6BF00] text-black font-bold text-sm uppercase tracking-wider py-4 rounded-lg transition-colors duration-200"
            >
              PROCEED TO CHECKOUT
              <ArrowRight className="w-4 h-4" />
            </Link>

            {/* Continue Shopping */}
            <Link
              href="/shop"
              className="flex items-center justify-center gap-1 w-full mt-4 text-sm text-[#9CA3AF] hover:text-white transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
