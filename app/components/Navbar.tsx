"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currency, setCurrency] = useState("USD"); // Currency changer state ($ / ₹)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleCurrency = () => {
    setCurrency((prev) => (prev === "USD" ? "INR" : "USD"));
  };

  return (
    <header className="sticky top-0 z-50 bg-black/85 backdrop-blur-xl border-b border-white/10 px-4 sm:px-8 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo with Spider */}
        <Link href="/" className="text-base sm:text-lg font-bold tracking-widest text-white uppercase font-mono flex items-center gap-2">
          <span className="text-emerald-400">🕷️</span>
          <span>Vesper X</span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm text-neutral-300 font-mono">
          <Link href="/" className="hover:text-white transition">Home</Link>
          <Link href="/shop" className="hover:text-white transition">Shop</Link>
          <Link href="/compare" className="hover:text-white transition">Compare</Link>
          <Link href="/order-tracking" className="hover:text-white transition">Orders</Link>
          <Link href="/account" className="hover:text-white transition">Account</Link>
          <Link href="/contact" className="hover:text-white transition">Contact Us</Link>
        </nav>

        {/* Right Actions: Search, Wishlist, Currency, Cart, Mobile Hamburger */}
        <div className="flex items-center gap-3">
          
          {/* Search Bar / Toggle */}
          <div className="relative hidden sm:block">
            {searchOpen ? (
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onBlur={() => setSearchOpen(false)}
                autoFocus
                className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/20 text-xs text-white focus:outline-none focus:border-emerald-400 w-44 font-mono"
              />
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 rounded-lg bg-white/5 border border-white/10 text-neutral-300 hover:text-white hover:bg-white/10 transition text-xs flex items-center gap-1.5"
                title="Search"
              >
                <span>🔍</span>
              </button>
            )}
          </div>

          {/* Wishlist Link */}
          <Link
            href="/wishlist"
            className="p-2 rounded-lg bg-white/5 border border-white/10 text-neutral-300 hover:text-white hover:bg-white/10 transition text-xs flex items-center gap-1"
            title="Wishlist"
          >
            <span>❤️</span>
          </Link>

          {/* Currency Switcher Button */}
          <button
            onClick={toggleCurrency}
            className="px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-neutral-300 hover:text-white hover:bg-white/10 transition text-xs font-bold font-mono"
          >
            {currency === "USD" ? "$ USD" : "₹ INR"}
          </button>

          {/* Cart Link */}
          <Link
            href="/cart"
            className="px-4 py-2 rounded-lg bg-emerald-500 text-black font-bold text-xs hover:bg-emerald-400 transition font-mono"
          >
            Cart
          </Link>

          {/* Mobile Menu Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-neutral-300 hover:text-white transition text-sm"
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-4 pt-4 border-t border-white/10 flex flex-col gap-3 text-sm text-neutral-300 font-mono pb-2">
          <Link href="/" onClick={() => setMobileMenuOpen(false)} className="hover:text-white transition">Home</Link>
          <Link href="/shop" onClick={() => setMobileMenuOpen(false)} className="hover:text-white transition">Shop</Link>
          <Link href="/compare" onClick={() => setMobileMenuOpen(false)} className="hover:text-white transition">Compare</Link>
          <Link href="/order-tracking" onClick={() => setMobileMenuOpen(false)} className="hover:text-white transition">Orders</Link>
          <Link href="/account" onClick={() => setMobileMenuOpen(false)} className="hover:text-white transition">Account</Link>
          <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-white transition">Contact Us</Link>
          <Link href="/wishlist" onClick={() => setMobileMenuOpen(false)} className="hover:text-white transition">Wishlist ❤️</Link>
        </div>
      )}
    </header>
  );
}