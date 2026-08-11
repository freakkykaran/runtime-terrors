"use client";

import { useState, Suspense } from "react";
import { useCart } from "../context/CartContext";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

// 30 FULL CATALOG MATRIX
export const PRODUCT_CATALOG = [
  { id: 1, name: "Vesper X Flagship Titanium", price: 1299, image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=80", desc: "Aerospace Titanium chassis with quantum neural processor nodes." },
  { id: 2, name: "Vesper Pro Cyberpunk Edition", price: 1099, image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=600&auto=format&fit=crop&q=80", desc: "Neon holographic backplate with ultra-fast glowing matrix OLED display." },
  { id: 3, name: "Vesper Fold Dual Screen Grid", price: 1499, image: "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=600&auto=format&fit=crop&q=80", desc: "Flexible twin OLED display panels configured with zero-gap fluid hinge." },
  { id: 4, name: "Vesper Lite Minimalist Core", price: 499, image: "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=600&auto=format&fit=crop&q=80", desc: "Ultra-sleek stealth lightweight system built for daily developer operation." },
  { id: 5, name: "Cybernetic Neural Audio Pods", price: 349, image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&auto=format&fit=crop&q=80", desc: "Active Noise Cancellation integrated with low-latency bio spatial audio grids." },
  { id: 6, name: "Vesper Power Core GaN 20K", price: 129, image: "https://images.unsplash.com/photo-1609592424009-5a109435b2e9?w=600&auto=format&fit=crop&q=80", desc: "Fast 100W multi-channel power system with dual dynamic Type-C output array." },
  { id: 7, name: "Vesper Ultra Watch Series 2", price: 399, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80", desc: "Rugged matte black titanium smartwatch loaded with advanced tracking matrix." },
  { id: 8, name: "Vesper Armor Kevlar Case Shield", price: 49, image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=600&auto=format&fit=crop&q=80", desc: "Military grade composite protection shell optimized with magnetic lock array." },
  { id: 9, name: "Vesper Quantum Brick 120W", price: 79, image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600&auto=format&fit=crop&q=80", desc: "Multi-device high density GaN wall array charging node with heat shield." },
  { id: 10, name: "Vesper Wireless Dock Pro", price: 99, image: "https://images.unsplash.com/photo-1622445268465-84281f62372f?w=600&auto=format&fit=crop&q=80", desc: "Fast 15W Qi wireless charging stand engineered with glass neon status bar." },
  { id: 11, name: "Vesper VR Glass Matrix", price: 899, image: "https://images.unsplash.com/photo-1622979135225-d2ba269bc1bd?w=600&auto=format&fit=crop&q=80", desc: "Augmented simulation terminal array loaded with twin micro-OLED 4K lenses." },
  { id: 12, name: "Vesper Cyber Ring Tracker S1", price: 299, image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&auto=format&fit=crop&q=80", desc: "Smart peripheral health link tracking heart metrics and core dynamic sleep data." },
  { id: 13, name: "Vesper Magnetic Matte Wallet", price: 39, image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&auto=format&fit=crop&q=80", desc: "Slim profile RFID safe acrylic alloy shield with automated magnetic latch." },
  { id: 14, name: "Vesper Gaming Axis Grip", price: 149, image: "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?w=600&auto=format&fit=crop&q=80", desc: "Mobile tactical operational layout framework containing hall-effect triggers." },
  { id: 15, name: "Vesper Lens Pro Capture Set", price: 199, image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=600&auto=format&fit=crop&q=80", desc: "Anamorphic ultra definition optical modification glass for extreme field capture." },
  { id: 16, name: "Vesper Cyber Tablet Panel 12", price: 849, image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&auto=format&fit=crop&q=80", desc: "Next-gen industrial multi touch interface loaded with high dark tracking panel." },
  { id: 17, name: "Neural Link Band Concept V1", price: 449, image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=600&auto=format&fit=crop&q=80", desc: "EEG biometric pulse analysis interface syncing operational data modules." },
  { id: 18, name: "Vesper Capsule Pods Obsidian", price: 219, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80", desc: "High fidelity acoustic nodes isolated inside thick sound proof acrylic shell." },
  { id: 19, name: "Matrix GaN Heavy Desk Block", price: 179, image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&auto=format&fit=crop&q=80", desc: "Multi channel desk station providing continuous fast input logic distribution." },
  { id: 20, name: "Vesper Nano SSD Storage 2TB", price: 259, image: "https://images.unsplash.com/photo-1601524909162-be87252be298?w=600&auto=format&fit=crop&q=80", desc: "Micro scale high speed flash data capsule featuring extreme rewrite stability." },
  { id: 21, name: "Cyberpunk Mechanical Keyboard", price: 299, image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=600&auto=format&fit=crop&q=80", desc: "Stealth mechanical layout key matrix with deep reactive smoked glass underglow paths." },
  { id: 22, name: "Vesper Beam Projection Node X", price: 799, image: "https://images.unsplash.com/photo-1535016120720-40c646be5580?w=600&auto=format&fit=crop&q=80", desc: "Ultra crisp smart laser projector designed for wall display scaling operations." },
  { id: 23, name: "Quantum Audio Soundbar Array", price: 549, image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&auto=format&fit=crop&q=80", desc: "Surround structural audio hardware unit enclosed inside rich polished dark acrylic." },
  { id: 24, name: "Vesper Haptic Tracking Vest", price: 999, image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80", desc: "Full tactical environment body tracking matrix optimized for simulator arrays." },
  { id: 25, name: "Stealth Drone Recon Quad S", price: 699, image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=600&auto=format&fit=crop&q=80", desc: "Automated carbon composite aerial camera system tracking vector trajectories." },
  { id: 26, name: "Vesper Thermal Shield Module", price: 119, image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=600&auto=format&fit=crop&q=80", desc: "Dynamic high efficiency dual cooling array block built to avoid processing throttles." },
  { id: 27, name: "Grid Desktop Ambient Light Unit", price: 139, image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80", desc: "Smart structural light arrays providing dark environment aesthetic syncs." },
  { id: 28, name: "Vesper Bio Sensor Tracker Band", price: 189, image: "https://images.unsplash.com/photo-1557438159-51eec7a6c9e8?w=600&auto=format&fit=crop&q=80", desc: "Real time user body thermal analytics scanner feeding continuous database logs." },
  { id: 29, name: "Exo Frame Support System Node", price: 449, image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80", desc: "Ergonomic compression mesh system minimizing strain during deep dev workflows." },
  { id: 30, name: "Vesper Curved Ultrawide Matrix", price: 1199, image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&auto=format&fit=crop&q=80", desc: "Panoramic immersive development display panel running fluid stealth refresh lines." }
];

// 1. DYNAMIC COMPONENT INTEGRATION
function CatalogContent() {
  const { addToCart, toggleWishlist, wishlist, searchQuery } = useCart() as any;
  const searchParams = useSearchParams();
  const [sortBy, setSortBy] = useState("default");
  
  const urlSearch = searchParams.get("search")?.toLowerCase() || "";
  const activeSearch = searchQuery ? searchQuery.toLowerCase() : urlSearch;

  const filteredProducts = PRODUCT_CATALOG.filter(product => 
    product.name.toLowerCase().includes(activeSearch) || 
    product.desc.toLowerCase().includes(activeSearch)
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "name-asc") return a.name.localeCompare(b.name);
    return 0;
  });

  return (
    <div className="space-y-8">
      {/* Dynamic Dark Matte Glass Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-zinc-950/60 border border-white/5 p-6 rounded-2xl backdrop-blur-3xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)]">
        <div>
          <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-widest text-white font-mono">
            Hardware <span className="text-zinc-400">Catalog</span>
          </h1>
          <p className="text-xs text-neutral-500 mt-1 uppercase tracking-wider font-semibold font-mono">
            System Nodes: {sortedProducts.length} Units Online
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs w-full sm:w-auto justify-end">
          <label className="text-neutral-500 text-[10px] uppercase tracking-wider">Sort Engine:</label>
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 rounded-xl bg-zinc-900 border border-white/10 text-neutral-200 focus:outline-none focus:border-white/40 backdrop-blur-md cursor-pointer tracking-wider text-xs uppercase transition"
          >
            <option value="default">Default Node</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name-asc">Alphabetical A-Z</option>
          </select>
        </div>
      </div>

      {/* ECOSYSTEM ECO-BUNDLE PROMO BANNER */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-zinc-950/80 via-zinc-900/40 to-black border border-white/5 backdrop-blur-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 shadow-md font-mono text-xs">
        <div className="flex items-center gap-2">
          <span className="text-neutral-400">⚡</span>
          <span className="text-neutral-200 tracking-wide uppercase font-bold">Vesper X Ecosystem Bundle Deal:</span>
          <span className="text-neutral-400 font-light font-sans">Combine Titanium Phone + Watch S2 + Pods to trigger 15% manual fallback reduction!</span>
        </div>
        <span className="text-[10px] bg-white/5 px-2.5 py-1 border border-white/10 rounded-lg text-white font-bold tracking-widest uppercase shrink-0">AUTO_SYNCED</span>
      </div>

      {sortedProducts.length === 0 ? (
        <div className="p-16 text-center border border-white/5 rounded-2xl bg-zinc-950/40 backdrop-blur-md shadow-inner">
          <p className="text-xs text-neutral-500 uppercase tracking-widest font-mono">0 System matches found within network grids.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedProducts.map((product) => {
            const isInWish = Array.isArray(wishlist) && wishlist.some((w: any) => w.id === product.id);

            return (
              <div 
                key={product.id} 
                className="p-5 rounded-2xl bg-gradient-to-b from-zinc-950/70 to-black border border-white/5 flex flex-col justify-between hover:border-white/20 transition-all duration-300 relative group backdrop-blur-3xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.9)] hover:shadow-black"
              >
                <button 
                  type="button"
                  onClick={() => toggleWishlist(product)}
                  className="absolute top-4 right-4 z-10 p-2.5 rounded-xl bg-black/60 border border-white/10 backdrop-blur-xl text-xs transition duration-200 hover:border-white/40 active:scale-95 shadow-lg"
                >
                  {isInWish ? <span className="text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.7)]">❤️</span> : <span className="opacity-80 group-hover:opacity-100 transition grayscale-0">🖤</span>}
                </button>

                <div>
                  <div className="w-full h-52 rounded-xl bg-zinc-950/90 border border-white/5 overflow-hidden flex items-center justify-center mb-4 relative">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" 
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&auto=format&fit=crop&q=80";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-500"></div>
                  </div>

                  <h3 className="font-bold text-base text-neutral-100 group-hover:text-white transition-colors duration-200 tracking-wide">{product.name}</h3>
                  <p className="text-[12px] text-neutral-400 mt-1 line-clamp-2 leading-relaxed font-light font-sans">{product.desc}</p>
                  <p className="text-sm font-bold text-white mt-4 tracking-widest font-mono">${product.price} USD</p>
                </div>

                <div className="mt-6 flex gap-2 font-mono">
                  <Link 
                    href={`/products/${product.id}`} 
                    className="flex-1 py-2.5 text-center text-xs bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 rounded-xl transition-all duration-200 font-bold text-neutral-300 hover:text-white active:scale-98 tracking-wider uppercase"
                  >
                    Details
                  </Link>
                  <button 
                    type="button"
                    onClick={() => {
                      addToCart(product);
                      alert(`${product.name} added to cart!`);
                    }} 
                    className="px-4 py-2.5 bg-zinc-900/90 hover:bg-white hover:text-black border border-white/10 text-white font-bold text-xs rounded-xl transition-all duration-300 uppercase tracking-widest active:scale-98 shadow-md"
                  >
                    Add Cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// 2. MAIN ENTRY COMPONENT EXPORTING SUSPENSE BOUNDARY BLOCK
export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-[#020202] text-white font-sans p-4 sm:p-8 selection:bg-neutral-800 selection:text-white">
      <div className="max-w-7xl mx-auto">
        <Suspense fallback={
          <div className="min-h-[50vh] flex items-center justify-center font-mono">
            <p className="text-neutral-500 tracking-widest uppercase animate-pulse text-xs">Loading Databank Stream...</p>
          </div>
        }>
          <CatalogContent />
        </Suspense>
      </div>
    </div>
  );
}