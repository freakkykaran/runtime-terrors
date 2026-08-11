"use client";

import { useCart } from "../context/CartContext";
import Link from "next/link";

export default function WishlistPage() {
  // Destructure real-time data from CartContext
  const { wishlist, toggleWishlist, addToCart } = useCart() as any;

  const safeWishlist = Array.isArray(wishlist) ? wishlist : [];

  return (
    <div className="min-h-screen bg-[#020202] text-white font-sans p-4 sm:p-8 selection:bg-neutral-800 selection:text-white">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Smoked Glass Header */}
        <div className="bg-zinc-950/60 border border-white/5 p-6 rounded-2xl backdrop-blur-3xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)]">
          <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-widest text-white font-mono">
            My <span className="text-zinc-400">Wishlist</span>
          </h1>
          <p className="text-xs text-neutral-500 mt-1 font-mono uppercase tracking-wider font-semibold">
            Saved Core Nodes: {safeWishlist.length} Items Locked
          </p>
        </div>

        {safeWishlist.length === 0 ? (
          <div className="p-16 text-center border border-white/5 rounded-2xl bg-zinc-950/40 backdrop-blur-md shadow-inner space-y-4">
            <p className="text-xs text-neutral-500 uppercase tracking-widest font-mono">Aapki wishlist khali hai.</p>
            <Link 
              href="/products" 
              className="inline-block px-5 py-2.5 bg-zinc-900 border border-white/10 text-white font-bold text-xs rounded-xl transition font-mono uppercase tracking-wider hover:bg-white hover:text-black"
            >
              Explore Products
            </Link>
          </div>
        ) : (
          /* Smoked Dark Glass Grid Layout */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {safeWishlist.map((item: any) => (
              <div 
                key={item.id} 
                className="p-5 rounded-2xl bg-gradient-to-b from-zinc-950/70 to-black border border-white/5 flex flex-col justify-between relative group backdrop-blur-3xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.9)]"
              >
                
                {/* Remove Latch Button */}
                <button 
                  type="button"
                  onClick={() => toggleWishlist(item)}
                  className="absolute top-4 right-4 z-10 p-2 rounded-xl bg-black/60 border border-white/10 text-red-400 font-mono text-[10px] hover:border-red-500/40 transition active:scale-95"
                >
                  REMOVE
                </button>

                <div>
                  {/* Original Colored Image Container */}
                  <div className="w-full h-48 rounded-xl bg-zinc-950/90 border border-white/5 overflow-hidden flex items-center justify-center mb-4 relative">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover opacity-90 group-hover:scale-102 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&auto=format&fit=crop&q=80";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-40"></div>
                  </div>

                  <h3 className="font-bold text-base text-neutral-100 tracking-wide">{item.name}</h3>
                  <p className="text-sm font-bold text-white mt-2 tracking-widest font-mono">${item.price} USD</p>
                </div>

                {/* Tactical Actions */}
                <div className="mt-6 flex gap-2 font-mono">
                  <Link 
                    href={`/products/${item.id}`} 
                    className="flex-1 py-2 text-center text-xs bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 rounded-xl transition font-bold text-neutral-300"
                  >
                    View Node
                  </Link>
                  <button 
                    type="button"
                    onClick={() => {
                      addToCart(item);
                      alert(`${item.name} moved to cart!`);
                    }} 
                    className="px-4 py-2 bg-zinc-900 hover:bg-white hover:text-black border border-white/10 text-white font-bold text-xs rounded-xl transition uppercase tracking-widest active:scale-98"
                  >
                    Add Cart
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}