"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";

export default function OrderTrackingPage() {
  const [orderId, setOrderId] = useState("");
  const [trackedOrder, setTrackedOrder] = useState<any>(null);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId) return;
    // Mock tracking data for hackathon demo
    setTrackedOrder({
      id: orderId,
      status: "Dispatched from Aerospace Hub",
      estimatedDelivery: "August 14, 2026",
      item: "Vesper X Masterpiece (Titanium Edition)",
      location: "Kolkata Hub, IN"
    });
  };

  return (
    <div className="min-h-screen bg-black text-white font-mono selection:bg-emerald-500 selection:text-black">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-wider uppercase">Order Tracking</h1>
          <p className="text-sm text-neutral-400">Enter your order ID to track your aerospace titanium delivery in real-time.</p>
        </div>

        {/* Tracking Form */}
        <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto mb-12">
          <input
            type="text"
            placeholder="Enter Order ID (e.g. VSP-9821)"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-emerald-400 transition"
          />
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-white text-black font-bold text-sm hover:bg-neutral-200 transition"
          >
            Track Order
          </button>
        </form>

        {/* Tracking Result */}
        {trackedOrder && (
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-6 backdrop-blur-xl">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-white/10 gap-2">
              <div>
                <span className="text-xs text-neutral-400">ORDER ID</span>
                <h3 className="text-lg font-bold text-emerald-400">{trackedOrder.id}</h3>
              </div>
              <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
                {trackedOrder.status}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="p-4 rounded-xl bg-black/40 border border-white/5">
                <span className="text-xs text-neutral-400 block mb-1">PRODUCT ITEM</span>
                <span className="font-semibold">{trackedOrder.item}</span>
              </div>
              <div className="p-4 rounded-xl bg-black/40 border border-white/5">
                <span className="text-xs text-neutral-400 block mb-1">ESTIMATED DELIVERY</span>
                <span className="font-semibold">{trackedOrder.estimatedDelivery}</span>
              </div>
            </div>

            <div className="pt-2 flex justify-between items-center text-xs text-neutral-400">
              <span>Current Status: In Transit</span>
              <span>Location: {trackedOrder.location}</span>
            </div>
          </div>
        )}

        <div className="text-center mt-12">
          <Link href="/" className="text-xs text-neutral-400 hover:text-white underline transition">
            ← Back to Home
          </Link>
        </div>
      </main>
    </div>
  );
}