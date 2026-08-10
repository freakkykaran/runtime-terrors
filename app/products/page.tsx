"use client";

import Link from "next/link";
import { useCart, Product } from "../context/CartContext";
import { useState } from "react";

const products: Product[] = [
  {
    id: 1,
    name: "Vesper 🕷 X Pro",
    category: "Smartphone",
    price: 1199,
    image: "/aur-diagram.jpg",
    description: "Aerospace Titanium. A19 Pro Neural Core."
  },
  {
    id: 2,
    name: "Vesper 🕷 Watch S",
    category: "Wearable",
    price: 399,
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=800&auto=format&fit=crop",
    description: "Sapphire Crystal. Satellite Emergency Link."
  },
  {
    id: 3,
    name: "Vesper 🕷 Buds Ultra",
    category: "Audio",
    price: 249,
    image: "https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?q=80&w=800&auto=format&fit=crop",
    description: "Neural Noise Cancellation & Spatial Audio."
  },
  {
    id: 4,
    name: "Vesper 🕷 Vision Glass",
    category: "Spatial Computing",
    price: 1499,
    image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=800&auto=format&fit=crop",
    description: "Dual 4K Micro-OLED Displays. Eye Tracking."
  },
  {
    id: 5,
    name: "Vesper 🕷 Ring Titanium",
    category: "Health & Fitness",
    price: 299,
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800&auto=format&fit=crop",
    description: "Biometric Sleep & Health Tracking. 7-Day Battery."
  },
  {
    id: 6,
    name: "Vesper 🕷 Charging Dock",
    category: "Accessories",
    price: 149,
    image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?q=80&w=800&auto=format&fit=crop",
    description: "MagSafe Fast Charging & Ambient Speaker Base."
  },
  {
    id: 7,
    name: "Vesper 🕷 Book Studio",
    category: "Computing",
    price: 2299,
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=800&auto=format&fit=crop",
    description: "14-inch Mini-LED Display. M-Core Ultra Processor."
  },
  {
    id: 8,
    name: "Vesper 🕷 Drone Apex",
    category: "Robotics",
    price: 999,
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=800&auto=format&fit=crop",
    description: "8K Video Capture. AI Obstacle Avoidance System."
  },
  {
    id: 9,
    name: "Vesper 🕷 Pad X",
    category: "Tablet",
    price: 899,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=800&auto=format&fit=crop",
    description: "12.9-inch Liquid Retina. Magnetic Stylus Support."
  },
  {
    id: 10,
    name: "Vesper 🕷 Pods",
    category: "Accessories",
    price: 129,
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=800&auto=format&fit=crop",
    description: "Ultra-low latency pressure sensitive smart device."
  },
  {
    id: 11,
    name: "Vesper 🕷 Home Hub",
    category: "Smart Home",
    price: 199,
    image: "https://images.unsplash.com/photo-1558089687-f282ffcbc126?q=80&w=800&auto=format&fit=crop",
    description: "AI Voice Assistant with 360-degree spatial sound."
  },
  {
    id: 12,
    name: "Vesper 🕷 Soundbar Max",
    category: "Audio",
    price: 599,
    image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=800&auto=format&fit=crop",
    description: "Dolby Atmos enabled cinematic sound system."
  },
  {
    id: 13,
    name: "Vesper 🕷 Power Bank 100W",
    category: "Accessories",
    price: 89,
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?q=80&w=800&auto=format&fit=crop",
    description: "20,000mAh Graphene battery. Charges laptop & phone."
  },
  {
    id: 14,
    name: "Vesper 🕷 Display 32\"",
    category: "Monitor",
    price: 1599,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=800&auto=format&fit=crop",
    description: "6K Resolution. Reference mode for creators."
  },
  {
    id: 15,
    name: "Vesper 🕷 VR Headset",
    category: "Gaming",
    price: 499,
    image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?q=80&w=800&auto=format&fit=crop",
    description: "Wireless VR gaming with haptic feedback controllers."
  }
];

export default function ProductsPage() {
  const { addToCart } = useCart();
  const [addedId, setAddedId] = useState<number | null>(null);

  const handleAdd = (product: Product) => {
    addToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <main className="min-h-screen bg-black text-white px-6 pt-32 pb-24 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-neutral-900/30 rounded-full blur-[150px] pointer-events-none opacity-50"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-16 border-b border-white/5 pb-10">
          <span className="text-xs font-mono tracking-[0.3em] uppercase text-neutral-500 mb-2 block">The Ecosystem</span>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white">
            Explore Vesper 🕷 Devices
          </h1>
          <p className="text-neutral-400 mt-4 max-w-xl font-light">
            Designed to work seamlessly together. Select any product to view full details, reviews, and options.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="group relative rounded-3xl bg-white/[0.01] border border-white/5 hover:border-neutral-700/50 hover:bg-white/[0.03] transition-all duration-500 overflow-hidden backdrop-blur-sm p-6 flex flex-col"
            >
              <Link href={`/products/${product.id}`} className="block flex-grow cursor-pointer">
                <div className="aspect-square w-full rounded-2xl bg-neutral-950 border border-white/5 overflow-hidden mb-6 flex items-center justify-center p-6">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover rounded-xl opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  />
                </div>

                <div className="mb-6">
                  <span className="text-xs font-mono text-neutral-600 uppercase tracking-wider mb-1 block">{product.category}</span>
                  <h3 className="text-2xl font-semibold text-white tracking-tight mb-2 group-hover:text-neutral-300 transition-colors">{product.name}</h3>
                  <p className="text-neutral-500 text-sm font-light leading-relaxed">{product.description}</p>
                </div>
              </Link>

              <div className="flex items-center justify-between gap-4 mt-auto pt-5 border-t border-white/5 relative z-10">
                <p className="text-xl font-bold text-white tracking-tight">${product.price}</p>
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    handleAdd(product);
                  }}
                  className={`text-xs px-5 py-2.5 rounded-full font-medium transition-all duration-300 ${
                    addedId === product.id 
                      ? "bg-emerald-500 text-black scale-105" 
                      : "bg-white text-black hover:bg-neutral-200"
                  }`}
                >
                  {addedId === product.id ? "✓ Added to Cart" : "Add to Cart"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}