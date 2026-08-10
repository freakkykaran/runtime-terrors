"use client";

import { useState } from "react";
import Link from "next/link";

const allProducts = [
  { id: 1, name: "Vesper 🕷 X Pro", category: "Smartphone", price: 1199, image: "/aur-diagram.jpg", description: "Aerospace Titanium. A19 Pro Neural Core.", battery: "35 Hours Playback", durability: "Titanium Grade-5" },
  { id: 2, name: "Vesper 🕷 Watch S", category: "Wearable", price: 399, image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=800&auto=format&fit=crop", description: "Sapphire Crystal. Satellite Emergency Link.", battery: "7 Days Battery", durability: "Sapphire Glass" },
  { id: 3, name: "Vesper 🕷 Buds Ultra", category: "Audio", price: 249, image: "https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?q=80&w=800&auto=format&fit=crop", description: "Neural Noise Cancellation & Spatial Audio.", battery: "30h with Case", durability: "IPX5 Water Resistant" },
  { id: 4, name: "Vesper 🕷 Vision Glass", category: "Spatial Computing", price: 1499, image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=800&auto=format&fit=crop", description: "Dual 4K Micro-OLED Displays. Eye Tracking.", battery: "4 Hours Continuous", durability: "Carbon Composite" },
  { id: 7, name: "Vesper 🕷 Book Studio", category: "Computing", price: 2299, image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=800&auto=format&fit=crop", description: "14-inch Mini-LED Display. M-Core Ultra Processor.", battery: "22 Hours Battery", durability: "Unibody Aluminum" },
  { id: 15, name: "Vesper 🕷 VR Headset", category: "Gaming", price: 499, image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?q=80&w=800&auto=format&fit=crop", description: "Wireless VR gaming with haptic feedback controllers.", battery: "8 Hours Playback", durability: "Impact Resistant" }
];

export default function ComparePage() {
  const [product1, setProduct1] = useState(allProducts[0]);
  const [product2, setProduct2] = useState(allProducts[1]);

  return (
    <main className="min-h-screen bg-black text-white px-6 pt-32 pb-24 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-neutral-900/30 rounded-full blur-[150px] pointer-events-none opacity-50"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="mb-16 border-b border-white/5 pb-10 text-center">
          <span className="text-xs font-mono tracking-[0.3em] uppercase text-neutral-500 mb-2 block">Hardware Matrix</span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
            Compare Vesper 🕷 Devices
          </h1>
          <p className="text-neutral-400 max-w-xl mx-auto font-light text-sm">
            Select two distinct hardware systems to evaluate performance benchmarks side-by-side.
          </p>
        </div>

        {/* Dropdown Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white/[0.01] border border-white/10 rounded-2xl p-4">
            <label className="block text-xs font-mono uppercase text-neutral-400 mb-2">Select Device A</label>
            <select 
              value={product1.id}
              onChange={(e) => {
                const found = allProducts.find(p => p.id === Number(e.target.value));
                if (found) setProduct1(found);
              }}
              className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white transition"
            >
              {allProducts.map(p => (
                <option key={p.id} value={p.id}>{p.name} (${p.price})</option>
              ))}
            </select>
          </div>

          <div className="bg-white/[0.01] border border-white/10 rounded-2xl p-4">
            <label className="block text-xs font-mono uppercase text-neutral-400 mb-2">Select Device B</label>
            <select 
              value={product2.id}
              onChange={(e) => {
                const found = allProducts.find(p => p.id === Number(e.target.value));
                if (found) setProduct2(found);
              }}
              className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white transition"
            >
              {allProducts.map(p => (
                <option key={p.id} value={p.id}>{p.name} (${p.price})</option>
              ))}
            </select>
          </div>
        </div>

        {/* Comparison Side-by-Side Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Product 1 Details */}
          <div className="bg-white/[0.01] border border-white/10 rounded-3xl p-8 backdrop-blur-sm space-y-6">
            <div className="aspect-square w-full rounded-2xl bg-neutral-950 border border-white/5 overflow-hidden flex items-center justify-center p-6">
              <img src={product1.image} alt={product1.name} className="w-full h-full object-cover rounded-xl" />
            </div>
            <div>
              <span className="text-xs font-mono text-neutral-500 uppercase">{product1.category}</span>
              <h2 className="text-3xl font-bold mt-1 mb-2">{product1.name}</h2>
              <p className="text-2xl font-semibold text-emerald-400">${product1.price}</p>
            </div>
            <div className="space-y-4 border-t border-white/5 pt-6 text-sm">
              <div>
                <span className="text-neutral-500 font-mono text-xs block mb-1">Architecture & Core</span>
                <p className="text-neutral-300">{product1.description}</p>
              </div>
              <div>
                <span className="text-neutral-500 font-mono text-xs block mb-1">Energy & Battery</span>
                <p className="text-neutral-300">{product1.battery}</p>
              </div>
              <div>
                <span className="text-neutral-500 font-mono text-xs block mb-1">Chassis Durability</span>
                <p className="text-neutral-300">{product1.durability}</p>
              </div>
            </div>
          </div>

          {/* Product 2 Details */}
          <div className="bg-white/[0.01] border border-white/10 rounded-3xl p-8 backdrop-blur-sm space-y-6">
            <div className="aspect-square w-full rounded-2xl bg-neutral-950 border border-white/5 overflow-hidden flex items-center justify-center p-6">
              <img src={product2.image} alt={product2.name} className="w-full h-full object-cover rounded-xl" />
            </div>
            <div>
              <span className="text-xs font-mono text-neutral-500 uppercase">{product2.category}</span>
              <h2 className="text-3xl font-bold mt-1 mb-2">{product2.name}</h2>
              <p className="text-2xl font-semibold text-emerald-400">${product2.price}</p>
            </div>
            <div className="space-y-4 border-t border-white/5 pt-6 text-sm">
              <div>
                <span className="text-neutral-500 font-mono text-xs block mb-1">Architecture & Core</span>
                <p className="text-neutral-300">{product2.description}</p>
              </div>
              <div>
                <span className="text-neutral-500 font-mono text-xs block mb-1">Energy & Battery</span>
                <p className="text-neutral-300">{product2.battery}</p>
              </div>
              <div>
                <span className="text-neutral-500 font-mono text-xs block mb-1">Chassis Durability</span>
                <p className="text-neutral-300">{product2.durability}</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </main>
  );
}