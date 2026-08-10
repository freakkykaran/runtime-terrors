"use client";

import Link from "next/link";
import { useCart } from "../context/CartContext";
import { useCurrency } from "../context/CurrencyContext";
import { useState, useEffect } from "react";

export default function Navbar() {
  const { cart } = useCart();
  const { currency, toggleCurrency } = useCurrency();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 bg-black/60 backdrop-blur-xl border-b border-white/5">
      {/* Brand Logo */}
      <Link href="/" className="text-lg font-bold tracking-widest text-white uppercase font-mono">
        Vesper 🕷 X
      </Link>

      {/* Navigation Links */}
      <div className="hidden md:flex items-center gap-8 text-sm text-neutral-400 font-medium">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <Link href="/products" className="hover:text-white transition-colors">Shop</Link>
        <Link href="/compare" className="hover:text-white transition-colors">Compare</Link>
        <Link href="/profile" className="hover:text-white transition-colors">Account</Link>
      </div>

      {/* Right Action Items */}
      <div className="flex items-center gap-4">
        {/* Currency Switcher */}
        <button 
          onClick={toggleCurrency}
          className="px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition text-xs font-mono font-semibold text-neutral-300"
        >
          {currency === "USD" ? "🇺🇸 USD ($)" : "🇮🇳 INR (₹)"}
        </button>

        {/* Live Cart Button */}
        <Link 
          href="/checkout" 
          className="relative px-5 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition text-sm flex items-center gap-2"
        >
          <span>Cart</span>
          <span className="w-5 h-5 rounded-full bg-white text-black text-xs font-bold flex items-center justify-center">
            {mounted ? cart.length : 0}
          </span>
        </Link>

        {/* Contact Us Button */}
        <Link 
          href="/contact" 
          className="px-5 py-2 rounded-full border border-white/10 hover:bg-white/10 transition text-sm font-medium"
        >
          Contact Us
        </Link>
      </div>
    </nav>
  );
}