"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function CheckoutPage() {
  // Destructure state and functions from CartContext safely
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart() as any;

  const [address, setAddress] = useState({
    fullName: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    pincode: "",
  });
  
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState("");
  
  // Custom Local State for UI Success Fallback to guarantee no 404s
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [generatedTrackingId, setGeneratedTrackingId] = useState("");

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === "VIBE10") {
      setDiscount(0.1);
      setCouponMessage("Coupon applied successfully! 10% off.");
    } else {
      setDiscount(0);
      setCouponMessage("Invalid coupon code. Try 'VIBE10'.");
    }
  };

  const safeCart = Array.isArray(cart) ? cart : [];
  const subtotal = safeCart.reduce((acc: number, item: any) => acc + (item.price || 0) * (item.quantity || 1), 0);
  const discountAmount = subtotal * discount;
  const shipping = safeCart.length > 0 ? 25 : 0;
  const total = subtotal - discountAmount + shipping;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (safeCart.length === 0) {
      alert("Aapka cart khali hai!");
      return;
    }

    if (!address.fullName || !address.street || !address.city) {
      alert("Kripya apna shipping address poora bharein!");
      return;
    }

    try {
      // 1. Generate Random Tracking / Order ID
      const orderId = "VSP-" + Math.floor(100000 + Math.random() * 900000);
      setGeneratedTrackingId(orderId);
      
      // 2. Save order to LocalStorage for Profile Page history
      const currentOrders = JSON.parse(localStorage.getItem("vesper_orders") || "[]");
      const newOrder = {
        id: orderId,
        date: new Date().toLocaleDateString("en-IN", { dateStyle: "medium" }),
        items: safeCart,
        total: total.toFixed(2),
        address,
        paymentMethod,
        status: "Processing"
      };

      currentOrders.unshift(newOrder);
      localStorage.setItem("vesper_orders", JSON.stringify(currentOrders));

      // 3. Save current tracking ID to pass globally if needed
      localStorage.setItem("vesper_recent_tracking_id", orderId);

      // 4. Clear the Cart completely
      if (clearCart) {
        clearCart();
      } else {
        localStorage.removeItem("vesper_cart");
      }

      // 5. Instantly change state to render a beautiful premium success layout
      setIsOrderPlaced(true);
      
    } catch (error) {
      console.error("Order processing failed:", error);
    }
  };

  // PREMIUM SUCCESS LAYOUT SCREEN STATE (SMOKED DARK TONE - NO GREEN)
  if (isOrderPlaced) {
    return (
      <div className="min-h-screen bg-[#020202] text-white font-mono flex items-center justify-center p-4 selection:bg-neutral-800 selection:text-white">
        <div className="max-w-xl w-full p-8 rounded-3xl bg-gradient-to-br from-zinc-950 via-zinc-900/40 to-black border border-white/5 text-center space-y-6 relative overflow-hidden backdrop-blur-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95)]">
          
          <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-4xl mx-auto shadow-inner animate-pulse">
            🕷️
          </div>
          
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black tracking-widest text-white uppercase">Order <span className="text-zinc-400">Confirmed</span></h2>
            <p className="text-xs text-neutral-500 uppercase tracking-wider">Vesper X framework transaction successful.</p>
          </div>

          <div className="p-5 bg-black/60 border border-white/5 rounded-xl text-left space-y-3 font-mono text-xs shadow-inner">
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-neutral-500">Tracking Reference:</span>
              <span className="text-white font-bold tracking-widest">{generatedTrackingId}</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-neutral-500">Operator:</span>
              <span className="text-white font-bold uppercase">{address.fullName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">Status Node:</span>
              <span className="px-2 py-0.5 rounded bg-white/10 text-white border border-white/10 font-bold uppercase tracking-wider text-[9px]">Processing</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link 
              href="/profile" 
              className="flex-1 py-3 rounded-xl bg-white text-black font-black text-xs hover:bg-neutral-200 transition-all duration-300 tracking-wider uppercase shadow-md shadow-white/5"
            >
              Go to Profile / History
            </Link>
            <Link 
              href="/products" 
              className="flex-1 py-3 rounded-xl bg-white/[0.02] border border-white/10 text-neutral-300 font-bold text-xs hover:bg-white/[0.08] transition tracking-wider uppercase"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020202] text-white font-mono selection:bg-neutral-800 selection:text-white pb-20">
      <main className="max-w-6xl mx-auto px-4 sm:px-8 py-12">
        <h1 className="text-3xl sm:text-4xl font-black tracking-wider uppercase mb-8">
          Checkout & <span className="text-zinc-400">Shipping</span>
        </h1>

        {safeCart.length === 0 ? (
          <div className="text-center py-20 border border-white/5 bg-zinc-950/40 rounded-3xl backdrop-blur-md space-y-4 shadow-inner">
            <p className="text-neutral-500 text-xs uppercase tracking-widest">Aapka cart khali hai.</p>
            <Link
              href="/products"
              className="inline-block px-6 py-3 rounded-xl bg-zinc-900 border border-white/10 text-white font-bold text-xs hover:bg-white hover:text-black transition-all duration-300 uppercase tracking-widest"
            >
              Explore Shop
            </Link>
          </div>
        ) : (
          <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column: Cart Items, Address & Payment */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Cart Items List */}
              <div className="p-6 rounded-2xl bg-zinc-950/50 border border-white/5 space-y-4 backdrop-blur-xl shadow-lg">
                <h3 className="text-xs font-black tracking-wider uppercase text-zinc-400 pb-2 border-b border-white/5">1. Cart Items</h3>
                {safeCart.map((item: any) => (
                  <div key={item.id || item._id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-4 border-b border-white/5 gap-4">
                    
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-xl bg-zinc-900 border border-white/5 overflow-hidden flex items-center justify-center relative shrink-0">
                        {item.image || item.imageUrl ? (
                          <img 
                            src={item.image || item.imageUrl} 
                            alt={item.name || "Product"} 
                            className="w-full h-full object-cover opacity-90"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&auto=format&fit=crop&q=80";
                            }}
                          />
                        ) : (
                          <span className="text-xl">📦</span>
                        )}
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-neutral-200">{item.name || item.title}</h4>
                        <p className="text-xs text-zinc-400 mt-1 tracking-wider">${item.price} USD</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                      <div className="flex items-center bg-black/60 border border-white/5 rounded-xl p-1 shadow-inner">
                        <button type="button" onClick={() => updateQuantity(item.id || item._id, (item.quantity || 1) - 1)} className="px-2.5 py-1 text-xs text-neutral-400 hover:text-white transition font-bold">-</button>
                        <span className="text-xs font-bold px-2 text-white">{item.quantity || 1}</span>
                        <button type="button" onClick={() => updateQuantity(item.id || item._id, (item.quantity || 1) + 1)} className="px-2.5 py-1 text-xs text-neutral-400 hover:text-white transition font-bold">+</button>
                      </div>
                      <button type="button" onClick={() => removeFromCart(item.id || item._id)} className="text-[10px] text-neutral-500 hover:text-white font-bold uppercase tracking-wider transition">Remove</button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Shipping Address */}
              <div className="p-6 rounded-2xl bg-zinc-950/50 border border-white/5 space-y-4 backdrop-blur-xl shadow-lg">
                <h3 className="text-xs font-black tracking-wider uppercase text-zinc-400 pb-2 border-b border-white/5">2. Shipping Address</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
                  <input type="text" placeholder="Full Name" required value={address.fullName} onChange={(e) => setAddress({ ...address, fullName: e.target.value })} className="p-3.5 rounded-xl bg-black/60 border border-white/5 text-white focus:outline-none focus:border-white/40 font-mono transition" />
                  <input type="email" placeholder="Email Address" required value={address.email} onChange={(e) => setAddress({ ...address, email: e.target.value })} className="p-3.5 rounded-xl bg-black/60 border border-white/5 text-white focus:outline-none focus:border-white/40 font-mono transition" />
                  <input type="text" placeholder="Phone Number" required value={address.phone} onChange={(e) => setAddress({ ...address, phone: e.target.value })} className="p-3.5 rounded-xl bg-black/60 border border-white/5 text-white focus:outline-none focus:border-white/40 font-mono transition" />
                  <input type="text" placeholder="Street Address" required value={address.street} onChange={(e) => setAddress({ ...address, street: e.target.value })} className="p-3.5 rounded-xl bg-black/60 border border-white/5 text-white focus:outline-none focus:border-white/40 font-mono transition" />
                  <input type="text" placeholder="City" required value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} className="p-3.5 rounded-xl bg-black/60 border border-white/5 text-white focus:outline-none focus:border-white/40 font-mono transition" />
                  <input type="text" placeholder="Pincode" required value={address.pincode} onChange={(e) => setAddress({ ...address, pincode: e.target.value })} className="p-3.5 rounded-xl bg-black/60 border border-white/5 text-white focus:outline-none focus:border-white/40 font-mono transition" />
                </div>
              </div>

              {/* Payment Option */}
              <div className="p-6 rounded-2xl bg-zinc-950/50 border border-white/5 space-y-4 backdrop-blur-xl shadow-lg">
                <h3 className="text-xs font-black tracking-wider uppercase text-zinc-400 pb-2 border-b border-white/5">3. Payment Method</h3>
                <div className="flex flex-col sm:flex-row gap-4 text-xs">
                  <label className="flex items-center gap-3 cursor-pointer bg-black/60 p-4 rounded-xl border border-white/5 hover:border-white/20 transition flex-1 shadow-inner">
                    <input type="radio" name="payment" checked={paymentMethod === "cod"} onChange={() => setPaymentMethod("cod")} className="accent-white" />
                    <span className="text-neutral-300 font-bold uppercase tracking-wider text-[11px]">Cash on Delivery (COD)</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer bg-black/60 p-4 rounded-xl border border-white/5 hover:border-white/20 transition flex-1 shadow-inner">
                    <input type="radio" name="payment" checked={paymentMethod === "online"} onChange={() => setPaymentMethod("online")} className="accent-white" />
                    <span className="text-neutral-300 font-bold uppercase tracking-wider text-[11px]">Online Token Card</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Right Column: Order Summary & Coupon */}
            <div className="p-6 rounded-2xl bg-zinc-950/50 border border-white/5 space-y-6 backdrop-blur-xl h-fit sticky top-24 shadow-2xl">
              <h3 className="text-xs font-black tracking-wider uppercase text-neutral-300 pb-2 border-b border-white/5">
                Order Summary
              </h3>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between text-neutral-400">
                  <span>Subtotal</span>
                  <span className="text-white">${subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-zinc-300 font-bold">
                    <span>Discount (10%)</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-neutral-400">
                  <span>Shipping</span>
                  <span className="text-white">${shipping.toFixed(2)}</span>
                </div>
                <div className="pt-3 border-t border-white/5 flex justify-between text-sm font-bold text-white">
                  <span>Total Payload</span>
                  <span className="text-white tracking-widest">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Coupon Box */}
              <div className="space-y-2 pt-4 border-t border-white/5 mt-4">
                <label className="text-[10px] text-neutral-500 block uppercase tracking-wider font-bold">COUPON CODE (Try: VIBE10)</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="ENTER CODE"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 px-3 py-2.5 rounded-xl bg-black/60 border border-white/5 text-xs text-white focus:outline-none focus:border-white/40 uppercase tracking-widest"
                  />
                  <button
                    type="button"
                    onClick={applyCoupon}
                    className="px-4 py-2.5 rounded-xl bg-white text-black font-black text-xs hover:bg-neutral-200 transition-all duration-300 uppercase tracking-wider"
                  >
                    Apply
                  </button>
                </div>
                {couponMessage && (
                  <p className="text-[10px] mt-1 text-neutral-400 uppercase tracking-widest">
                    {couponMessage}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-white hover:bg-neutral-200 text-black font-black text-sm transition-all duration-300 tracking-widest uppercase mt-4 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] active:scale-98"
              >
                Place Order Now
              </button>
            </div>
            
          </form>
        )}
      </main>
    </div>
  );
}