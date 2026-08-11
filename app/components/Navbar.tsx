"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { cart, wishlist, searchQuery, setSearchQuery } = useCart() as any;
  const [searchOpen, setSearchOpen] = useState(false);
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Authentication States
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [savedName, setSavedName] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/products?search=${searchQuery}`);
  };

  // Real-time Auth Checker
  useEffect(() => {
    const checkAuth = () => {
      if (typeof window !== "undefined") {
        const profile = localStorage.getItem("vesper_user_profile");
        if (profile) {
          setSavedName(JSON.parse(profile).name);
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
          setSavedName("");
        }
      }
    };

    // Initial check
    checkAuth();

    // Event listener for tab sync & manual updates
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  const cartCount = Array.isArray(cart) ? cart.reduce((acc: number, item: any) => acc + (item.quantity || 1), 0) : 0;
  const wishlistCount = Array.isArray(wishlist) ? wishlist.length : 0;

  return (
    <header className="sticky top-0 z-50 bg-[#020202]/80 backdrop-blur-3xl border-b border-white/5 px-4 sm:px-8 py-4 font-mono shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)]">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link href="/" className="text-base sm:text-lg font-black tracking-widest text-white uppercase flex items-center gap-2 group">
          <span className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.6)] group-hover:scale-110 transition-transform">🕷️</span>
          <span>Vesper X</span>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden lg:flex items-center gap-7 text-[11px] text-neutral-400 font-bold tracking-widest uppercase">
          <Link href="/" className="hover:text-white transition">Home</Link>
          <Link href="/products" className="hover:text-white transition">Shop</Link>
          <Link href="/compare" className="hover:text-white transition">Compare</Link>
          <Link href="/order-tracking" className="hover:text-white transition">Orders</Link>
          <Link href="/contact" className="hover:text-white transition">Contact Us</Link>
          
          {/* DYNAMIC AUTH LINK (Idea Implemented) */}
          {isLoggedIn ? (
            <Link href="/profile" className="hover:text-white transition text-neutral-200 border-b border-white/10 pb-0.5">
              [{savedName}]
            </Link>
          ) : (
            <Link href="/login" className="hover:text-white transition text-neutral-200 border-b border-white/10 pb-0.5">
              [SIGN IN]
            </Link>
          )}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          
          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} className="relative hidden sm:flex items-center">
            {searchOpen ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="SEARCH..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="px-4 py-1.5 rounded-full bg-zinc-900/60 border border-white/10 text-xs text-white focus:outline-none focus:border-white w-44 backdrop-blur-md uppercase tracking-wider"
                />
                <button type="button" onClick={() => setSearchOpen(false)} className="text-xs text-neutral-500 hover:text-white font-black transition">✕</button>
              </div>
            ) : (
              <button type="button" onClick={() => setSearchOpen(true)} className="p-2 rounded-full bg-zinc-900/50 border border-white/5 text-neutral-400 hover:text-white transition text-xs backdrop-blur-md">
                🔍
              </button>
            )}
          </form>

          {/* Wishlist Link */}
          <Link href="/wishlist" className="relative p-2.5 rounded-full bg-zinc-900/50 border border-white/5 text-neutral-400 hover:text-white transition text-xs backdrop-blur-md flex items-center justify-center">
            🖤
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-white text-black text-[9px] font-black px-1.5 py-0.5 rounded-full shadow-lg">{wishlistCount}</span>
            )}
          </Link>

          {/* Dark Glass Oval Cart Button */}
          <Link href="/checkout" className="px-5 py-2.5 rounded-full bg-zinc-900/90 border border-white/10 text-white hover:bg-white hover:text-black font-black text-[10px] transition-all duration-300 uppercase tracking-widest backdrop-blur-xl flex items-center gap-2 shadow-[0_0_15px_rgba(255,255,255,0.03)] active:scale-95">
            Cart <span>[{cartCount}]</span>
          </Link>

          {/* Mobile Menu Toggle */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2 text-neutral-400 hover:text-white transition">
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-4 pt-4 border-t border-white/5 flex flex-col gap-4 text-xs font-bold text-neutral-400 font-mono tracking-widest uppercase pb-2">
          <Link href="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
          <Link href="/products" onClick={() => setMobileMenuOpen(false)}>Shop</Link>
          <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>Contact Us</Link>
          
          {/* Dynamic Auth for Mobile */}
          {isLoggedIn ? (
            <Link href="/profile" onClick={() => setMobileMenuOpen(false)} className="text-white">Account [{savedName}]</Link>
          ) : (
            <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="text-white">Sign In / Register</Link>
          )}
        </div>
      )}
    </header>
  );
}