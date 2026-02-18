"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  ChevronLeft,
  Lock,
  ShoppingBag,
  CreditCard,
  Truck,
  User,
} from "lucide-react";
import { siteData } from "@/data/siteData";

// Mock order items (same defaults as cart)
const orderItems = [
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

const subtotal = orderItems.reduce(
  (sum, item) => sum + item.product.price * item.quantity,
  0
);

type Step = 1 | 2 | 3;

const stepLabels: { step: Step; label: string; icon: React.ElementType }[] = [
  { step: 1, label: "INFORMATION", icon: User },
  { step: 2, label: "SHIPPING", icon: Truck },
  { step: 3, label: "PAYMENT", icon: CreditCard },
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
  }),
};

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [direction, setDirection] = useState(0);

  // Form state (UI only, no real submission)
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [phone, setPhone] = useState("");

  const [shippingMethod, setShippingMethod] = useState<"standard" | "express">(
    "standard"
  );

  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");

  const shippingCost =
    shippingMethod === "express" ? 14.99 : subtotal >= 150 ? 0 : 7.99;
  const total = subtotal + shippingCost;

  const goToStep = (step: Step) => {
    setDirection(step > currentStep ? 1 : -1);
    setCurrentStep(step);
  };

  const inputClassName =
    "w-full bg-white border border-neutral-300 rounded-lg px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-[#FFD400] focus:ring-1 focus:ring-[#FFD400] transition-colors";
  const labelClassName =
    "block text-xs font-semibold text-neutral-600 uppercase tracking-wider mb-1.5";

  return (
    <section className="min-h-screen bg-[#0B0B0B]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/cart"
            className="flex items-center gap-1 text-sm text-[#9CA3AF] hover:text-white transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Cart
          </Link>
          <h1 className="text-xl md:text-2xl font-black tracking-tight">
            CHECKOUT
          </h1>
          <div className="flex items-center gap-1 text-xs text-[#9CA3AF]">
            <Lock className="w-3.5 h-3.5" />
            Secure
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center gap-0 mb-10 md:mb-14">
          {stepLabels.map(({ step, label, icon: Icon }, i) => {
            const isActive = currentStep === step;
            const isCompleted = currentStep > step;
            return (
              <div key={step} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center text-sm font-bold transition-colors duration-300 ${
                      isCompleted
                        ? "bg-green-500 text-white"
                        : isActive
                        ? "bg-[#FFD400] text-black"
                        : "bg-neutral-800 text-neutral-500"
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Icon className="w-4 h-4" />
                    )}
                  </div>
                  <span
                    className={`text-[10px] md:text-xs font-bold uppercase tracking-wider mt-2 transition-colors duration-300 ${
                      isActive
                        ? "text-[#FFD400]"
                        : isCompleted
                        ? "text-green-400"
                        : "text-neutral-600"
                    }`}
                  >
                    {label}
                  </span>
                </div>
                {i < stepLabels.length - 1 && (
                  <div
                    className={`w-16 sm:w-24 md:w-32 h-0.5 mx-2 sm:mx-3 mb-5 transition-colors duration-300 ${
                      currentStep > step ? "bg-green-500" : "bg-neutral-800"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Main Content */}
        <div className="lg:grid lg:grid-cols-5 lg:gap-12">
          {/* Form Area - White Background */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl p-6 sm:p-8 md:p-10 shadow-xl shadow-black/20">
              <AnimatePresence mode="wait" custom={direction}>
                {/* Step 1: Information */}
                {currentStep === 1 && (
                  <motion.div
                    key="step-1"
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <h2 className="text-lg font-black text-neutral-900 uppercase tracking-wide mb-6">
                      Contact Information
                    </h2>

                    <div className="space-y-4">
                      <div>
                        <label className={labelClassName}>Email Address</label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@example.com"
                          className={inputClassName}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className={labelClassName}>First Name</label>
                          <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="John"
                            className={inputClassName}
                          />
                        </div>
                        <div>
                          <label className={labelClassName}>Last Name</label>
                          <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="Doe"
                            className={inputClassName}
                          />
                        </div>
                      </div>

                      <div>
                        <label className={labelClassName}>Address</label>
                        <input
                          type="text"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="123 Street Ave"
                          className={inputClassName}
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label className={labelClassName}>City</label>
                          <input
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder="New York"
                            className={inputClassName}
                          />
                        </div>
                        <div>
                          <label className={labelClassName}>State</label>
                          <input
                            type="text"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            placeholder="NY"
                            className={inputClassName}
                          />
                        </div>
                        <div>
                          <label className={labelClassName}>Zip Code</label>
                          <input
                            type="text"
                            value={zip}
                            onChange={(e) => setZip(e.target.value)}
                            placeholder="10001"
                            className={inputClassName}
                          />
                        </div>
                      </div>

                      <div>
                        <label className={labelClassName}>Phone</label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="(555) 123-4567"
                          className={inputClassName}
                        />
                      </div>
                    </div>

                    <button
                      onClick={() => goToStep(2)}
                      className="w-full mt-8 bg-[#FFD400] hover:bg-[#E6BF00] text-black font-bold text-sm uppercase tracking-wider py-4 rounded-lg transition-colors duration-200"
                    >
                      Continue to Shipping
                    </button>
                  </motion.div>
                )}

                {/* Step 2: Shipping */}
                {currentStep === 2 && (
                  <motion.div
                    key="step-2"
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <h2 className="text-lg font-black text-neutral-900 uppercase tracking-wide mb-6">
                      Shipping Method
                    </h2>

                    <div className="space-y-3">
                      {/* Standard Shipping */}
                      <label
                        className={`flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition-colors ${
                          shippingMethod === "standard"
                            ? "border-[#FFD400] bg-yellow-50"
                            : "border-neutral-200 hover:border-neutral-300"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                              shippingMethod === "standard"
                                ? "border-[#FFD400]"
                                : "border-neutral-300"
                            }`}
                          >
                            {shippingMethod === "standard" && (
                              <div className="w-2.5 h-2.5 rounded-full bg-[#FFD400]" />
                            )}
                          </div>
                          <div>
                            <p className="font-bold text-sm text-neutral-900">
                              Standard Shipping
                            </p>
                            <p className="text-xs text-neutral-500">
                              3-5 business days
                            </p>
                          </div>
                        </div>
                        <span className="font-bold text-sm text-neutral-900">
                          {subtotal >= 150 ? (
                            <span className="text-green-600">FREE</span>
                          ) : (
                            "$7.99"
                          )}
                        </span>
                        <input
                          type="radio"
                          name="shipping"
                          value="standard"
                          checked={shippingMethod === "standard"}
                          onChange={() => setShippingMethod("standard")}
                          className="sr-only"
                        />
                      </label>

                      {/* Express Shipping */}
                      <label
                        className={`flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition-colors ${
                          shippingMethod === "express"
                            ? "border-[#FFD400] bg-yellow-50"
                            : "border-neutral-200 hover:border-neutral-300"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                              shippingMethod === "express"
                                ? "border-[#FFD400]"
                                : "border-neutral-300"
                            }`}
                          >
                            {shippingMethod === "express" && (
                              <div className="w-2.5 h-2.5 rounded-full bg-[#FFD400]" />
                            )}
                          </div>
                          <div>
                            <p className="font-bold text-sm text-neutral-900">
                              Express Shipping
                            </p>
                            <p className="text-xs text-neutral-500">
                              1-2 business days
                            </p>
                          </div>
                        </div>
                        <span className="font-bold text-sm text-neutral-900">
                          $14.99
                        </span>
                        <input
                          type="radio"
                          name="shipping"
                          value="express"
                          checked={shippingMethod === "express"}
                          onChange={() => setShippingMethod("express")}
                          className="sr-only"
                        />
                      </label>
                    </div>

                    <button
                      onClick={() => goToStep(3)}
                      className="w-full mt-8 bg-[#FFD400] hover:bg-[#E6BF00] text-black font-bold text-sm uppercase tracking-wider py-4 rounded-lg transition-colors duration-200"
                    >
                      Continue to Payment
                    </button>

                    <button
                      onClick={() => goToStep(1)}
                      className="flex items-center justify-center gap-1 w-full mt-4 text-sm text-neutral-400 hover:text-neutral-600 transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Back to Information
                    </button>
                  </motion.div>
                )}

                {/* Step 3: Payment */}
                {currentStep === 3 && (
                  <motion.div
                    key="step-3"
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <h2 className="text-lg font-black text-neutral-900 uppercase tracking-wide mb-6">
                      Payment Details
                    </h2>

                    <div className="space-y-4">
                      <div>
                        <label className={labelClassName}>Card Number</label>
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          placeholder="4242 4242 4242 4242"
                          className={inputClassName}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className={labelClassName}>Expiry Date</label>
                          <input
                            type="text"
                            value={expiry}
                            onChange={(e) => setExpiry(e.target.value)}
                            placeholder="MM / YY"
                            className={inputClassName}
                          />
                        </div>
                        <div>
                          <label className={labelClassName}>CVV</label>
                          <input
                            type="text"
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value)}
                            placeholder="123"
                            className={inputClassName}
                          />
                        </div>
                      </div>

                      <div>
                        <label className={labelClassName}>Name on Card</label>
                        <input
                          type="text"
                          value={nameOnCard}
                          onChange={(e) => setNameOnCard(e.target.value)}
                          placeholder="John Doe"
                          className={inputClassName}
                        />
                      </div>
                    </div>

                    {/* Order Total Prominent */}
                    <div className="mt-8 p-4 bg-neutral-50 rounded-xl border border-neutral-200">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-semibold text-neutral-600 uppercase">
                          Order Total
                        </span>
                        <span className="text-2xl font-black text-neutral-900">
                          ${total.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        /* UI only */
                      }}
                      className="w-full mt-6 bg-[#FFD400] hover:bg-[#E6BF00] text-black font-black text-sm uppercase tracking-wider py-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                      <Lock className="w-4 h-4" />
                      PLACE ORDER &mdash; ${total.toFixed(2)}
                    </button>

                    <button
                      onClick={() => goToStep(2)}
                      className="flex items-center justify-center gap-1 w-full mt-4 text-sm text-neutral-400 hover:text-neutral-600 transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Back to Shipping
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-2 mt-8 lg:mt-0">
            <div className="bg-neutral-900/60 border border-neutral-800 rounded-xl p-6 sticky top-28">
              <h2 className="text-lg font-bold uppercase tracking-wide mb-6">
                Order Summary
              </h2>

              {/* Items */}
              <div className="space-y-4 mb-6">
                {orderItems.map((item) => (
                  <div
                    key={`${item.product.id}-${item.size}`}
                    className="flex items-center gap-4"
                  >
                    <div className="relative w-14 h-14 flex-shrink-0 bg-neutral-800 rounded-lg flex items-center justify-center">
                      <ShoppingBag className="w-5 h-5 text-neutral-600" />
                      <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#FFD400] text-black text-[10px] font-bold rounded-full flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold truncate">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-[#9CA3AF]">
                        {item.size} / {item.color}
                      </p>
                    </div>
                    <p className="text-sm font-semibold">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-neutral-800 pt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-[#9CA3AF]">Subtotal</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#9CA3AF]">Shipping</span>
                  <span className="font-semibold">
                    {shippingCost === 0 ? (
                      <span className="text-green-400">FREE</span>
                    ) : (
                      `$${shippingCost.toFixed(2)}`
                    )}
                  </span>
                </div>
              </div>

              <div className="border-t border-neutral-700 mt-4 pt-4">
                <div className="flex justify-between items-center">
                  <span className="font-bold">Total</span>
                  <span className="text-xl font-black">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
