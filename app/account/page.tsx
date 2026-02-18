"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Package, User, Settings, ChevronRight } from "lucide-react";

const tabs = [
  { id: "orders", label: "ORDERS", icon: Package },
  { id: "profile", label: "PROFILE", icon: User },
  { id: "settings", label: "SETTINGS", icon: Settings },
] as const;

type TabId = (typeof tabs)[number]["id"];

const mockOrders = [
  {
    id: "#HYP-2026-0142",
    date: "February 3, 2026",
    status: "DELIVERED" as const,
    items: ["Oversized Graphic Hoodie (Black, L)", "Streetwear Beanie (Yellow)"],
    total: 120,
  },
  {
    id: "#HYP-2026-0089",
    date: "January 18, 2026",
    status: "SHIPPED" as const,
    items: ["Cargo Utility Pants (Olive, 32)", "Graphic Crewneck Tee (White, M)"],
    total: 165,
  },
];

function OrdersTab() {
  return (
    <div className="space-y-4">
      {mockOrders.map((order) => (
        <motion.div
          key={order.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="border border-neutral-800 bg-neutral-900/50 p-5 sm:p-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <p className="text-white font-bold tracking-wider text-sm">
                {order.id}
              </p>
              <p className="text-neutral-500 text-xs mt-1">{order.date}</p>
            </div>
            <span
              className={`inline-block text-xs font-bold tracking-widest px-3 py-1 w-fit ${
                order.status === "DELIVERED"
                  ? "bg-green-500/10 text-green-400 border border-green-500/30"
                  : "bg-[#FFD400]/10 text-[#FFD400] border border-[#FFD400]/30"
              }`}
            >
              {order.status}
            </span>
          </div>

          <div className="border-t border-neutral-800 pt-4 space-y-1">
            {order.items.map((item, i) => (
              <p key={i} className="text-neutral-400 text-sm">
                {item}
              </p>
            ))}
          </div>

          <div className="flex items-center justify-between mt-4 pt-4 border-t border-neutral-800">
            <p className="text-white font-bold text-sm tracking-wider">
              TOTAL: ${order.total.toFixed(2)}
            </p>
            <button className="text-[#FFD400] text-xs font-bold tracking-wider flex items-center gap-1 hover:text-[#E6BF00] transition-colors">
              VIEW DETAILS
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function ProfileTab() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="border border-neutral-800 bg-neutral-900/50 p-6 sm:p-8"
    >
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 bg-[#FFD400] flex items-center justify-center text-black text-xl font-black">
          AM
        </div>
        <div>
          <h3 className="text-white font-bold text-lg tracking-wider">
            ALEX MORGAN
          </h3>
          <p className="text-neutral-500 text-sm">Member since JANUARY 2026</p>
        </div>
      </div>

      <div className="space-y-5">
        <div>
          <label className="text-neutral-500 text-xs tracking-widest block mb-1">
            FULL NAME
          </label>
          <p className="text-white font-medium tracking-wide">ALEX MORGAN</p>
        </div>
        <div className="border-t border-neutral-800" />
        <div>
          <label className="text-neutral-500 text-xs tracking-widest block mb-1">
            EMAIL ADDRESS
          </label>
          <p className="text-white font-medium tracking-wide">
            alex@example.com
          </p>
        </div>
        <div className="border-t border-neutral-800" />
        <div>
          <label className="text-neutral-500 text-xs tracking-widest block mb-1">
            MEMBER SINCE
          </label>
          <p className="text-white font-medium tracking-wide">JANUARY 2026</p>
        </div>
      </div>

      <button className="mt-8 border border-neutral-700 text-white text-xs font-bold tracking-widest px-6 py-3 hover:border-[#FFD400] hover:text-[#FFD400] transition-colors">
        EDIT PROFILE
      </button>
    </motion.div>
  );
}

function SettingsTab() {
  const [newsletter, setNewsletter] = useState(true);
  const [sms, setSms] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="border border-neutral-800 bg-neutral-900/50 p-6 sm:p-8"
    >
      <h3 className="text-white font-bold text-sm tracking-widest mb-6">
        NOTIFICATIONS
      </h3>

      <div className="space-y-6">
        {/* Newsletter toggle */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white text-sm font-bold tracking-wider">
              NEWSLETTER
            </p>
            <p className="text-neutral-500 text-xs mt-1">
              Receive drop announcements and exclusive offers
            </p>
          </div>
          <button
            onClick={() => setNewsletter(!newsletter)}
            className={`relative w-12 h-6 rounded-full transition-colors ${
              newsletter ? "bg-[#FFD400]" : "bg-neutral-700"
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-black transition-transform ${
                newsletter ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        <div className="border-t border-neutral-800" />

        {/* SMS toggle */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white text-sm font-bold tracking-wider">
              SMS NOTIFICATIONS
            </p>
            <p className="text-neutral-500 text-xs mt-1">
              Get text alerts for order updates and restocks
            </p>
          </div>
          <button
            onClick={() => setSms(!sms)}
            className={`relative w-12 h-6 rounded-full transition-colors ${
              sms ? "bg-[#FFD400]" : "bg-neutral-700"
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-black transition-transform ${
                sms ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </div>

      <button className="mt-8 bg-[#FFD400] text-black text-xs font-bold tracking-widest px-8 py-3 hover:bg-[#E6BF00] transition-colors">
        SAVE CHANGES
      </button>
    </motion.div>
  );
}

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<TabId>("orders");

  return (
    <main className="min-h-screen bg-[#0B0B0B] pt-32 pb-20 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl sm:text-5xl font-black text-white tracking-tighter mb-10"
        >
          MY ACCOUNT
        </motion.h1>

        {/* Tab Navigation */}
        <div className="flex border-b border-neutral-800 mb-8 gap-0">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 sm:px-6 py-3 text-xs font-bold tracking-widest transition-colors relative ${
                  activeTab === tab.id
                    ? "text-[#FFD400]"
                    : "text-neutral-500 hover:text-white"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FFD400]"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === "orders" && <OrdersTab key="orders" />}
          {activeTab === "profile" && <ProfileTab key="profile" />}
          {activeTab === "settings" && <SettingsTab key="settings" />}
        </AnimatePresence>
      </div>
    </main>
  );
}
