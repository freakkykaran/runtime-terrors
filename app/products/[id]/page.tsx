"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useCart, Product } from "../../context/CartContext";
import { useState } from "react";

const allProducts: Product[] = [
  { id: 1, name: "Vesper 🕷 X Pro", category: "Smartphone", price: 1199, image: "/aur-diagram.jpg", description: "Aerospace Titanium. A19 Pro Neural Core." },
  { id: 2, name: "Vesper 🕷 Watch S", category: "Wearable", price: 399, image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=800&auto=format&fit=crop", description: "Sapphire Crystal. Satellite Emergency Link." },
  { id: 3, name: "Vesper 🕷 Buds Ultra", category: "Audio", price: 249, image: "https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?q=80&w=800&auto=format&fit=crop", description: "Neural Noise Cancellation & Spatial Audio." },
  { id: 4, name: "Vesper 🕷 Vision Glass", category: "Spatial Computing", price: 1499, image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=800&auto=format&fit=crop", description: "Dual 4K Micro-OLED Displays. Eye Tracking." },
  { id: 5, name: "Vesper 🕷 Ring Titanium", category: "Health & Fitness", price: 299, image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800&auto=format&fit=crop", description: "Biometric Sleep & Health Tracking. 7-Day Battery." },
  { id: 6, name: "Vesper 🕷 Charging Dock", category: "Accessories", price: 149, image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?q=80&w=800&auto=format&fit=crop", description: "MagSafe Fast Charging & Ambient Speaker Base." },
  { id: 7, name: "Vesper 🕷 Book Studio", category: "Computing", price: 2299, image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=800&auto=format&fit=crop", description: "14-inch Mini-LED Display. M-Core Ultra Processor." },
  { id: 8, name: "Vesper 🕷 Drone Apex", category: "Robotics", price: 999, image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=800&auto=format&fit=crop", description: "8K Video Capture. AI Obstacle Avoidance System." },
  { id: 9, name: "Vesper 🕷 Pad X", category: "Tablet", price: 899, image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=800&auto=format&fit=crop", description: "12.9-inch Liquid Retina. Magnetic Stylus Support." },
  { id: 10, name: "Vesper 🕷 Pods", category: "Accessories", price: 129, image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=800&auto=format&fit=crop", description: "Ultra-low latency pressure sensitive smart device." },
  { id: 11, name: "Vesper 🕷 Home Hub", category: "Smart Home", price: 199, image: "https://images.unsplash.com/photo-1558089687-f282ffcbc126?q=80&w=800&auto=format&fit=crop", description: "AI Voice Assistant with 360-degree spatial sound." },
  { id: 12, name: "Vesper 🕷 Soundbar Max", category: "Audio", price: 599, image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=800&auto=format&fit=crop", description: "Dolby Atmos enabled cinematic sound system." },
  { id: 13, name: "Vesper 🕷 Power Bank 100W", category: "Accessories", price: 89, image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?q=80&w=800&auto=format&fit=crop", description: "20,000mAh Graphene battery. Charges laptop & phone." },
  { id: 14, name: "Vesper 🕷 Display 32\"", category: "Monitor", price: 1599, image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=800&auto=format&fit=crop", description: "6K Resolution. Reference mode for creators." },
  { id: 15, name: "Vesper 🕷 VR Headset", category: "Gaming", price: 499, image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?q=80&w=800&auto=format&fit=crop", description: "Wireless VR gaming with haptic feedback controllers." }
];

export default function ProductDetails() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  
  const [added, setAdded] = useState(false);
  const [selectedColor, setSelectedColor] = useState(0);

  // Reviews State
  const [reviews, setReviews] = useState([
    { name: "Rahul Sharma", rating: 5, comment: "Absolute beast of a device! Build quality is top notch." },
    { name: "Priya Das", rating: 4.8, comment: "Seamless integration with the Vesper 🕷 ecosystem. Highly recommend." }
  ]);
  const [newReviewer, setNewReviewer] = useState("");
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState("5");

  const productId = Number(params.id);
  const product = allProducts.find((p) => p.id === productId);
  const otherProducts = allProducts.filter((p) => p.id !== productId).slice(0, 3);
  const colors = ["bg-neutral-900", "bg-neutral-200", "bg-blue-900"];

  if (!product) {
    return <div className="min-h-screen flex items-center justify-center text-white bg-black">Product not found.</div>;
  }

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product);
    router.push("/checkout");
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewer || !newComment) return;
    setReviews([{ name: newReviewer, rating: Number(newRating), comment: newComment }, ...reviews]);
    setNewReviewer("");
    setNewComment("");
  };

  return (
    <main className="min-h-screen bg-black text-white px-6 pt-32 pb-24 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-neutral-900/40 rounded-full blur-[150px] pointer-events-none opacity-50"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
          <div className="aspect-square w-full rounded-[2.5rem] bg-neutral-950 border border-white/10 overflow-hidden flex items-center justify-center p-8 group">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover rounded-2xl opacity-90 group-hover:scale-105 transition-transform duration-700" 
            />
          </div>

          <div className="flex flex-col justify-center">
            <span className="text-sm font-mono tracking-widest text-neutral-500 uppercase mb-4 block">
              {product.category}
            </span>
            <h1 className="text-5xl font-bold tracking-tight mb-4">{product.name}</h1>
            
            <div className="flex items-center gap-2 mb-6">
              <div className="flex text-yellow-500 text-sm">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
              <span className="text-neutral-500 text-sm">(4.9/5 from verified reviews)</span>
            </div>

            <p className="text-2xl font-semibold mb-6">${product.price}</p>
            <p className="text-neutral-400 font-light leading-relaxed mb-10 text-lg">
              {product.description} Built with quantum precision and engineered to seamlessly integrate into the Vesper 🕷 Ecosystem.
            </p>

            <div className="mb-10">
              <h3 className="text-sm font-medium mb-4">Available Finishes</h3>
              <div className="flex gap-4">
                {colors.map((color, index) => (
                  <button 
                    key={index}
                    onClick={() => setSelectedColor(index)}
                    className={`w-10 h-10 rounded-full border-2 transition-all ${
                      selectedColor === index ? "border-white scale-110" : "border-transparent"
                    } ${color} shadow-lg`}
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handleAddToCart}
                className={`px-8 py-4 rounded-full font-semibold transition-all duration-300 w-full sm:w-1/2 border border-white/20 ${
                  added ? "bg-emerald-500 text-black border-transparent" : "bg-black text-white hover:bg-neutral-900"
                }`}
              >
                {added ? "✓ Added" : "Add to Cart"}
              </button>
              
              <button 
                onClick={handleBuyNow}
                className="px-8 py-4 rounded-full font-semibold transition-all duration-300 w-full sm:w-1/2 bg-white text-black hover:bg-neutral-200"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* Middle Section: Interactive Reviews & Rating Submitter */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24 pt-16 border-t border-white/10">
          
          {/* Reviews List */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tight">Verified Customer Feedback</h2>
            <div className="space-y-4">
              {reviews.map((rev, idx) => (
                <div key={idx} className="bg-white/[0.01] border border-white/5 p-6 rounded-2xl backdrop-blur-sm">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold text-sm">{rev.name}</h4>
                    <span className="text-yellow-500 text-xs">★ {rev.rating} / 5</span>
                  </div>
                  <p className="text-neutral-400 text-sm font-light">{rev.comment}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Review Form */}
          <div className="bg-white/[0.01] border border-white/10 p-8 rounded-3xl backdrop-blur-sm">
            <h3 className="text-xl font-semibold mb-6">Leave Your Review</h3>
            <form onSubmit={handleAddReview} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-neutral-400 mb-2">Your Name</label>
                <input 
                  type="text" 
                  placeholder="Karan Kumar" 
                  value={newReviewer}
                  onChange={(e) => setNewReviewer(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white transition"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-mono uppercase text-neutral-400 mb-2">Rating Score</label>
                <select 
                  value={newRating}
                  onChange={(e) => setNewRating(e.target.value)}
                  className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white transition"
                >
                  <option value="5">5 Stars - Exceptional</option>
                  <option value="4">4 Stars - Very Good</option>
                  <option value="3">3 Stars - Average</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-mono uppercase text-neutral-400 mb-2">Review Comment</label>
                <textarea 
                  rows={3}
                  placeholder="Share your experience with this device..." 
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-sm focus:outline-none focus:border-white transition resize-none"
                  required
                ></textarea>
              </div>
              <button 
                type="submit"
                className="w-full py-3.5 rounded-full bg-white text-black font-semibold hover:bg-neutral-200 transition text-sm shadow-xl"
              >
                Submit Review
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Section: Explore Other Products */}
        <div className="pt-16 border-t border-white/10">
          <h2 className="text-3xl font-bold tracking-tight mb-10">Explore the Ecosystem</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {otherProducts.map((p) => (
              <Link href={`/products/${p.id}`} key={p.id} className="group rounded-3xl bg-white/[0.01] border border-white/5 hover:border-white/20 p-4 transition-all flex flex-col items-center text-center">
                <div className="w-full aspect-square bg-neutral-950 rounded-2xl mb-4 overflow-hidden p-4 flex items-center justify-center">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover rounded-xl opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                </div>
                <h3 className="font-semibold mb-1">{p.name}</h3>
                <p className="text-neutral-500 text-sm">${p.price}</p>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}