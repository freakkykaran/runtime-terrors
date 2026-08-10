"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function CheckoutSuccessPage() {
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    // Generate a random futuristic order ID
    const randomId = "AURA-" + Math.floor(10000 + Math.random() * 90000);
    setOrderId(randomId);
  }, []);

  return (
    <main className="min-h-screen bg-black text-white px-6 pt-32 pb-24 relative overflow-hidden flex items-center justify-center">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-emerald-950/20 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-xl w-full mx-auto relative z-10 text-center">
        
        {/* Success Check Icon */}
        <div className="w-20 h-20 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto text-3xl mb-8 shadow-2xl animate-bounce">
          ✓
        </div>

        <span className="text-xs font-mono tracking-[0.3em] uppercase text-neutral-500 mb-2 block">Quantum Transaction Secured</span>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Order Successfully Placed
        </h1>
        <p className="text-neutral-400 font-light text-sm mb-8">
          Your payment has been processed and your device is being assembled at our Kolkata Quantum Facility.
        </p>

        {/* Invoice Summary Box */}
        <div className="bg-white/[0.01] border border-white/10 rounded-3xl p-8 backdrop-blur-sm text-left mb-8 space-y-4">
          <div className="flex justify-between items-center border-b border-white/5 pb-4">
            <span className="text-xs font-mono text-neutral-500">Order ID</span>
            <span className="font-mono text-sm text-emerald-400 font-semibold">{orderId || "AURA-98421"}</span>
          </div>
          <div className="flex justify-between items-center border-b border-white/5 pb-4">
            <span className="text-xs font-mono text-neutral-500">Estimated Delivery</span>
            <span className="text-sm font-medium">Tomorrow, by 4:00 PM</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs font-mono text-neutral-500">Payment Status</span>
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Paid (Encrypted)
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/profile" 
            className="px-8 py-4 rounded-full bg-white text-black font-semibold hover:bg-neutral-200 transition shadow-xl text-sm"
          >
            Track Order in Profile
          </Link>
          <Link 
            href="/products" 
            className="px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 transition text-sm"
          >
            Continue Shopping
          </Link>
        </div>

      </div>
    </main>
  );
}