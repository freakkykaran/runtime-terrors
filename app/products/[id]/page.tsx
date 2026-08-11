"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useCart } from "../../context/CartContext";
import Link from "next/link";

// SAME 30 FULLY WORKING PRODUCTS DATA FOR EXACT ID MATCHING
const PRODUCT_CATALOG = [
  { id: 1, name: "Vesper X Flagship Titanium", price: 1299, image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=80", desc: "Aerospace Titanium chassis with quantum neural processor nodes. Engineered for maximum output with minimal thermal throttling. The ultimate development machine." },
  { id: 2, name: "Vesper Pro Cyberpunk Edition", price: 1099, image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=600&auto=format&fit=crop&q=80", desc: "Neon holographic backplate with ultra-fast glowing matrix OLED display. Next generation optical sensors and an expanded battery grid." },
  { id: 3, name: "Vesper Fold Dual Screen Grid", price: 1499, image: "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=600&auto=format&fit=crop&q=80", desc: "Flexible twin OLED display panels configured with zero-gap fluid hinge. Multitask across dual environments seamlessly." },
  { id: 4, name: "Vesper Lite Minimalist Core", price: 499, image: "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=600&auto=format&fit=crop&q=80", desc: "Ultra-sleek stealth lightweight system built for daily developer operation. Stripped of excess, leaving only pure performance." },
  { id: 5, name: "Cybernetic Neural Audio Pods", price: 349, image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&auto=format&fit=crop&q=80", desc: "Active Noise Cancellation integrated with low-latency bio spatial audio grids. Unmatched acoustic isolation." },
  { id: 6, name: "Vesper Power Core GaN 20K", price: 129, image: "https://images.unsplash.com/photo-1609592424009-5a109435b2e9?w=600&auto=format&fit=crop&q=80", desc: "Fast 100W multi-channel power system with dual dynamic Type-C output array. Charge your entire rig on the go." },
  { id: 7, name: "Vesper Ultra Watch Series 2", price: 399, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80", desc: "Rugged matte black titanium smartwatch loaded with advanced tracking matrix. Waterproof and pressure resistant." },
  { id: 8, name: "Vesper Armor Kevlar Case Shield", price: 49, image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=600&auto=format&fit=crop&q=80", desc: "Military grade composite protection shell optimized with magnetic lock array. Drop tested from orbital heights." },
  { id: 9, name: "Vesper Quantum Brick 120W", price: 79, image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600&auto=format&fit=crop&q=80", desc: "Multi-device high density GaN wall array charging node with heat shield. Cool operation under heavy load." },
  { id: 10, name: "Vesper Wireless Dock Pro", price: 99, image: "https://images.unsplash.com/photo-1622445268465-84281f62372f?w=600&auto=format&fit=crop&q=80", desc: "Fast 15W Qi wireless charging stand engineered with glass neon status bar. Perfect angle for face unlock arrays." },
  { id: 11, name: "Vesper VR Glass Matrix", price: 899, image: "https://images.unsplash.com/photo-1622979135225-d2ba269bc1bd?w=600&auto=format&fit=crop&q=80", desc: "Augmented simulation terminal array loaded with twin micro-OLED 4K lenses. Step into the deep web." },
  { id: 12, name: "Vesper Cyber Ring Tracker S1", price: 299, image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&auto=format&fit=crop&q=80", desc: "Smart peripheral health link tracking heart metrics and core dynamic sleep data. Unobtrusive biometric scanning." },
  { id: 13, name: "Vesper Magnetic Matte Wallet", price: 39, image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&auto=format&fit=crop&q=80", desc: "Slim profile RFID safe acrylic alloy shield with automated magnetic latch. Protect your physical crypto storage." },
  { id: 14, name: "Vesper Gaming Axis Grip", price: 149, image: "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?w=600&auto=format&fit=crop&q=80", desc: "Mobile tactical operational layout framework containing hall-effect triggers. Zero deadzone competitive advantage." },
  { id: 15, name: "Vesper Lens Pro Capture Set", price: 199, image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=600&auto=format&fit=crop&q=80", desc: "Anamorphic ultra definition optical modification glass for extreme field capture. Cinematic flair for your optic nodes." },
  { id: 16, name: "Vesper Cyber Tablet Panel 12", price: 849, image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&auto=format&fit=crop&q=80", desc: "Next-gen industrial multi touch interface loaded with high dark tracking panel. The ultimate portable canvas." },
  { id: 17, name: "Neural Link Band Concept V1", price: 449, image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=600&auto=format&fit=crop&q=80", desc: "EEG biometric pulse analysis interface syncing operational data modules. Control systems with your core thoughts." },
  { id: 18, name: "Vesper Capsule Pods Obsidian", price: 219, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80", desc: "High fidelity acoustic nodes isolated inside thick sound proof acrylic shell. Heavy bass response." },
  { id: 19, name: "Matrix GaN Heavy Desk Block", price: 179, image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&auto=format&fit=crop&q=80", desc: "Multi channel desk station providing continuous fast input logic distribution. Eliminate cable clutter forever." },
  { id: 20, name: "Vesper Nano SSD Storage 2TB", price: 259, image: "https://images.unsplash.com/photo-1601524909162-be87252be298?w=600&auto=format&fit=crop&q=80", desc: "Micro scale high speed flash data capsule featuring extreme rewrite stability. Secure your entire local database." },
  { id: 21, name: "Cyberpunk Mechanical Keyboard", price: 299, image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=600&auto=format&fit=crop&q=80", desc: "Stealth mechanical layout key matrix with deep reactive smoked glass underglow paths. Tactile feedback perfection." },
  { id: 22, name: "Vesper Beam Projection Node X", price: 799, image: "https://images.unsplash.com/photo-1535016120720-40c646be5580?w=600&auto=format&fit=crop&q=80", desc: "Ultra crisp smart laser projector designed for wall display scaling operations. 4K structural mapping capabilities." },
  { id: 23, name: "Quantum Audio Soundbar Array", price: 549, image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&auto=format&fit=crop&q=80", desc: "Surround structural audio hardware unit enclosed inside rich polished dark acrylic. Fill your habitat with sound." },
  { id: 24, name: "Vesper Haptic Tracking Vest", price: 999, image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80", desc: "Full tactical environment body tracking matrix optimized for simulator arrays. Feel every impact in the grid." },
  { id: 25, name: "Stealth Drone Recon Quad S", price: 699, image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=600&auto=format&fit=crop&q=80", desc: "Automated carbon composite aerial camera system tracking vector trajectories. Silent operation algorithms." },
  { id: 26, name: "Vesper Thermal Shield Module", price: 119, image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=600&auto=format&fit=crop&q=80", desc: "Dynamic high efficiency dual cooling array block built to avoid processing throttles. Keep your nodes frozen." },
  { id: 27, name: "Grid Desktop Ambient Light Unit", price: 139, image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80", desc: "Smart structural light arrays providing dark environment aesthetic syncs. Matches your monitor's dominant frequencies." },
  { id: 28, name: "Vesper Bio Sensor Tracker Band", price: 189, image: "https://images.unsplash.com/photo-1557438159-51eec7a6c9e8?w=600&auto=format&fit=crop&q=80", desc: "Real time user body thermal analytics scanner feeding continuous database logs. Optimize your physical framework." },
  { id: 29, name: "Exo Frame Support System Node", price: 449, image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80", desc: "Ergonomic compression mesh system minimizing strain during deep dev workflows. Posture correction protocols." },
  { id: 30, name: "Vesper Curved Ultrawide Matrix", price: 1199, image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&auto=format&fit=crop&q=80", desc: "Panoramic immersive development display panel running fluid stealth refresh lines. See the entire code structure." }
];

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart, wishlist, toggleWishlist } = useCart() as any;
  
  const [product, setProduct] = useState<any>(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch product based on ID
    if (params.id) {
      const foundProduct = PRODUCT_CATALOG.find((p) => p.id.toString() === params.id);
      if (foundProduct) {
        setProduct(foundProduct);
      }
      setLoading(false);
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020202] text-white flex items-center justify-center font-mono">
        <p className="text-neutral-500 tracking-widest uppercase animate-pulse">Initializing System Node...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#020202] text-white flex flex-col items-center justify-center font-mono space-y-6">
        <h1 className="text-4xl font-black tracking-widest text-white">404</h1>
        <p className="text-neutral-500 uppercase tracking-widest">Hardware node not found in databank.</p>
        <Link href="/products" className="px-6 py-3 bg-zinc-900 border border-white/10 rounded-xl hover:bg-white hover:text-black transition uppercase font-bold text-xs tracking-wider">
          Return to Catalog
        </Link>
      </div>
    );
  }

  const isInWish = Array.isArray(wishlist) && wishlist.some((w: any) => w.id === product.id);

  const handleAddToCart = () => {
    const productWithQty = { ...product, quantity: qty };
    addToCart(productWithQty);
    alert(`[${qty}x] ${product.name} locked into secure cart!`);
  };

  return (
    <div className="min-h-screen bg-[#020202] text-white font-sans p-4 sm:p-8 selection:bg-neutral-800 selection:text-white pb-24">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Back Button Navigation */}
        <button 
          onClick={() => router.back()} 
          className="text-neutral-500 hover:text-white font-mono text-xs uppercase tracking-widest transition flex items-center gap-2"
        >
          ← Return to Grid
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* Left Side: Product Image Display */}
          <div className="relative p-2 rounded-3xl bg-gradient-to-br from-zinc-900/50 to-black border border-white/5 backdrop-blur-3xl shadow-[0_20px_50px_-15px_rgba(0,0,0,0.9)] sticky top-24">
            
            {/* Absolute Wishlist Floating Button */}
            <button 
              type="button"
              onClick={() => toggleWishlist(product)}
              className="absolute top-6 right-6 z-20 p-3.5 rounded-2xl bg-black/60 border border-white/10 backdrop-blur-xl text-lg transition duration-200 hover:border-white/40 active:scale-90 shadow-xl"
            >
              {isInWish ? <span className="text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]">❤️</span> : <span className="opacity-70 hover:opacity-100 transition grayscale-0">🖤</span>}
            </button>

            <div className="w-full aspect-square rounded-2xl bg-zinc-950 overflow-hidden relative flex items-center justify-center">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover opacity-90 transition-transform duration-700 hover:scale-105" 
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&auto=format&fit=crop&q=80";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#020202]/80 via-transparent to-transparent pointer-events-none"></div>
            </div>
          </div>

          {/* Right Side: Product Details & Controls */}
          <div className="space-y-8 flex flex-col justify-center">
            
            <div className="space-y-4">
              <div className="inline-block px-3 py-1 bg-white/[0.03] border border-white/5 rounded-full text-[10px] text-neutral-400 font-mono tracking-widest uppercase">
                Hardware Node: #{product.id}
              </div>
              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-wide leading-tight font-mono">
                {product.name}
              </h1>
              <p className="text-2xl font-bold text-white font-mono tracking-widest">
                ${product.price} <span className="text-sm text-neutral-500">USD</span>
              </p>
            </div>

            <div className="pt-6 border-t border-white/10">
              <h3 className="text-xs text-neutral-500 uppercase tracking-widest font-mono mb-3">System Specifications</h3>
              <p className="text-sm text-neutral-300 leading-relaxed font-light">
                {product.desc}
              </p>
            </div>

            {/* Cart & Quantity Controls */}
            <div className="pt-8 flex flex-col sm:flex-row gap-4">
              
              {/* Quantity Selector */}
              <div className="flex items-center justify-between bg-zinc-900/60 border border-white/10 rounded-xl p-2 w-full sm:w-32 backdrop-blur-md">
                <button 
                  onClick={() => setQty(qty > 1 ? qty - 1 : 1)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-black hover:bg-white/10 text-neutral-400 hover:text-white transition font-mono"
                >
                  -
                </button>
                <span className="font-bold font-mono text-white">{qty}</span>
                <button 
                  onClick={() => setQty(qty + 1)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-black hover:bg-white/10 text-neutral-400 hover:text-white transition font-mono"
                >
                  +
                </button>
              </div>

              {/* Add to Cart Premium Button */}
              <button 
                onClick={handleAddToCart}
                className="flex-1 py-4 bg-zinc-900 hover:bg-white text-white hover:text-black border border-white/10 font-black text-sm rounded-xl transition-all duration-300 uppercase tracking-widest active:scale-[0.98] shadow-md hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] font-mono"
              >
                Add to Cart
              </button>
            </div>
            
            {/* Minimal Info */}
            <div className="flex items-center gap-6 text-[10px] text-neutral-500 font-mono uppercase tracking-widest pt-4">
              <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-neutral-400 animate-pulse"></span> In Stock</span>
              <span>Secure Shipping</span>
            </div>
          </div>
        </div>

        {/* ================= REVIEWS SECTION (NEWLY ADDED) ================= */}
        <div className="mt-20 sm:mt-24 border-t border-white/5 pt-16">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-widest font-mono">
                Terminal <span className="text-zinc-500">Feedback</span>
              </h2>
              <p className="text-xs text-neutral-500 mt-1 font-mono tracking-widest uppercase">Verified System Logs & Reviews</p>
            </div>
            <button className="px-6 py-3 bg-zinc-950 hover:bg-white hover:text-black border border-white/10 text-white font-bold text-xs rounded-xl transition-all duration-300 uppercase tracking-widest shadow-md font-mono">
              Write a Review
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Review Card 1 */}
            <div className="p-6 rounded-2xl bg-zinc-950/60 border border-white/5 backdrop-blur-md shadow-lg">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-white text-sm">★★★★★</span>
                <span className="text-[10px] text-neutral-500 font-mono tracking-widest">| OPTIMAL</span>
              </div>
              <p className="text-sm text-neutral-300 leading-relaxed font-light mb-6">
                "The structural integrity and processing nodes on this hardware are unmatched. Seamless integration with my current framework."
              </p>
              <div className="flex items-center justify-between text-[10px] font-mono text-neutral-500 uppercase tracking-widest border-t border-white/5 pt-3">
                <span>Operator: AX-99</span>
                <span>Verified</span>
              </div>
            </div>
            
            {/* Review Card 2 */}
            <div className="p-6 rounded-2xl bg-zinc-950/60 border border-white/5 backdrop-blur-md shadow-lg">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-white text-sm">★★★★<span className="text-neutral-700">★</span></span>
                <span className="text-[10px] text-neutral-500 font-mono tracking-widest">| SOLID BUILD</span>
              </div>
              <p className="text-sm text-neutral-300 leading-relaxed font-light mb-6">
                "Aesthetic is pure stealth. Runs quiet even under heavy simulation loads. Highly recommend for grid runners."
              </p>
              <div className="flex items-center justify-between text-[10px] font-mono text-neutral-500 uppercase tracking-widest border-t border-white/5 pt-3">
                <span>Operator: J. DOE</span>
                <span>Verified</span>
              </div>
            </div>

            {/* Review Card 3 */}
            <div className="p-6 rounded-2xl bg-zinc-950/60 border border-white/5 backdrop-blur-md shadow-lg">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-white text-sm">★★★★★</span>
                <span className="text-[10px] text-neutral-500 font-mono tracking-widest">| FLAWLESS</span>
              </div>
              <p className="text-sm text-neutral-300 leading-relaxed font-light mb-6">
                "Exceeded all parameters. The glass finish and dark metal feel incredible. Setup took less than two minutes."
              </p>
              <div className="flex items-center justify-between text-[10px] font-mono text-neutral-500 uppercase tracking-widest border-t border-white/5 pt-3">
                <span>Operator: NEO-7</span>
                <span>Verified</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}