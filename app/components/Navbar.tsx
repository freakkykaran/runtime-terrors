"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useCurrency } from "../context/CurrencyContext";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { cart } = useCart() as { cart: any[] };
  const currencyContext = useCurrency() as any;
  const currency = currencyContext?.currency || "USD";
  const setCurrency = currencyContext?.setCurrency || currencyContext?.toggleCurrency || (() => {});
  
  const { user, logout } = useAuth() as { user: any; logout: () => void };
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  return (
    <header className="sticky top-0 z-50 bg-black/60 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link href="/" className="text-base sm:text-lg font-bold tracking-widest text-white uppercase font-mono flex items-center gap-2">
          <span className="text-emerald-400">👑</span> 
          <span>Vesper X</span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-mono text-neutral-300">
          <Link href="/" className="hover:text-white transition">Home</Link>
          <Link href="/products" className="hover:text-white transition">Shop</Link>
          <Link href="/compare" className="hover:text-white transition">Compare</Link>
          <Link href="/order-tracking" className="hover:text-white transition">Orders</Link>
          <Link href="/contact" className="hover:text-white transition">Contact Us</Link>
        </nav>

        {/* Right Actions (Currency, Cart, Auth & Mobile Hamburger) */}
        <div className="flex items-center gap-3">
          
          {/* Currency Switcher */}
          <button
            onClick={() => {
              if (typeof setCurrency === 'function') {
                setCurrency(currency === "USD" ? "INR" : "USD");
              }
            }}
            className="px-2.5 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] font-mono text-neutral-300 hover:bg-white/10 transition"
          >
            {currency} {currency === "USD" ? "$" : "₹"}
          </button>

          {/* Cart Icon */}
          <Link 
            href="/checkout" 
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition text-xs font-mono"
          >
            <span>🛒</span>
            <span className="hidden sm:inline">Cart</span>
            <span className="bg-white text-black font-bold px-1.5 py-0.2 rounded-full text-[10px]">
              {totalItems}
            </span>
          </Link>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-2">
            {user ? (
              <div className="flex items-center gap-3">
                <Link href="/profile" className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center font-bold text-xs text-white">
                  {user.name ? user.name.split(" ").map((n: string) => n[0]).join("") : "U"}
                </Link>
                <button onClick={logout} className="text-xs font-mono text-neutral-400 hover:text-red-400 transition">
                  Logout
                </button>
              </div>
            ) : (
              <Link href="/login" className="px-4 py-1.5 rounded-full bg-white text-black text-xs font-bold hover:bg-neutral-200 transition">
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Menu Hamburger Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white focus:outline-none"
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>

        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-2xl border-b border-white/10 px-6 py-6 space-y-4 text-sm font-mono transition-all">
          <div className="flex flex-col space-y-3 pb-4 border-b border-white/10">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="text-neutral-300 hover:text-white py-1">Home</Link>
            <Link href="/products" onClick={() => setMobileMenuOpen(false)} className="text-neutral-300 hover:text-white py-1">Shop</Link>
            <Link href="/compare" onClick={() => setMobileMenuOpen(false)} className="text-neutral-300 hover:text-white py-1">Compare</Link>
            <Link href="/order-tracking" onClick={() => setMobileMenuOpen(false)} className="text-neutral-300 hover:text-white py-1">Orders</Link>
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="text-neutral-300 hover:text-white py-1">Contact Us</Link>
          </div>

          <div className="flex flex-col gap-3 pt-2">
            {user ? (
              <>
                <Link href="/profile" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 text-neutral-200 py-1">
                  <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold">
                    {user.name ? user.name[0] : "U"}
                  </span>
                  <span>{user.name || "User"}</span>
                </Link>
                <button 
                  onClick={() => { logout(); setMobileMenuOpen(false); }} 
                  className="text-left text-red-400 py-1"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link 
                href="/login" 
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 rounded-xl bg-white text-black text-center font-bold text-xs"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}