"use client";

import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useCurrency } from "../context/CurrencyContext";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CheckoutPage() {
  const { cart, removeFromCart } = useCart();
  const { formatPrice } = useCurrency();
  const { user, addOrder } = useAuth();
  const router = useRouter();

  const [shippingInfo, setShippingInfo] = useState({
    fullName: user?.name || "Karan Kumar",
    email: user?.email || "karan@example.com",
    address: user?.address || "Sector V, Salt Lake, Kolkata, 700091",
    phone: user?.phone || "+91 98765 43210"
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [generatedOrderId, setGeneratedOrderId] = useState("");

  // Calculate Subtotal (assuming each item has price in USD)
  const calculateTotalUSD = () => {
    return cart.reduce((acc, item) => acc + (item.price || 999), 0);
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      const totalUSD = calculateTotalUSD();
      const formattedTotal = formatPrice(totalUSD);
      
      // Add order to user profile history
      addOrder(formattedTotal);

      setIsProcessing(false);
      setOrderComplete(true);
      setGeneratedOrderId("AURA-" + Math.floor(10000 + Math.random() * 90000));
    }, 1500);
  };

  if (orderComplete) {
    return (
      <main className="min-h-screen bg-black text-white px-6 pt-32 pb-24 flex items-center justify-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-950/20 rounded-full blur-[150px]"></div>
        
        <div className="max-w-md w-full bg-black/60 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-10 text-center relative z-10 space-y-6 shadow-2xl animate-fadeIn">
          <div className="w-20 h-20 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto text-3xl shadow-[0_0_20px_rgba(52,211,153,0.3)]">
            ✓
          </div>
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">Order Dispatched Successfully</span>
            <h1 className="text-3xl font-bold">Payment Confirmed</h1>
            <p className="text-neutral-400 text-sm font-light">
              Your order <span className="text-white font-mono font-bold">{generatedOrderId}</span> has been securely logged into your Quantum Profile and dispatched from our Kolkata facility.
            </p>
          </div>

          <div className="pt-4 flex flex-col gap-3">
            <Link 
              href="/profile" 
              className="w-full py-4 rounded-2xl bg-white text-black font-bold hover:bg-neutral-200 transition text-sm shadow-xl"
            >
              View Live Tracking in Profile
            </Link>
            <Link 
              href="/products" 
              className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 transition text-sm"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white px-6 pt-32 pb-24 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-neutral-900/30 rounded-full blur-[150px] pointer-events-none opacity-50"></div>

      <div className="max-w-6xl mx-auto relative z-10 space-y-10">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-xs font-mono tracking-[0.3em] uppercase text-neutral-500 mb-2 block">Quantum Gateway</span>
          <h1 className="text-4xl font-bold tracking-tight">Secure Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Shipping & Payment Form */}
          <div className="lg:col-span-7 bg-white/[0.01] border border-white/10 p-8 rounded-3xl backdrop-blur-sm">
            <h2 className="text-xl font-semibold mb-6">Shipping & Telemetry Details</h2>
            
            <form onSubmit={handlePlaceOrder} className="space-y-5">
              <div>
                <label className="block text-xs font-mono uppercase text-neutral-400 mb-2">Full Name</label>
                <input 
                  type="text" 
                  value={shippingInfo.fullName}
                  onChange={(e) => setShippingInfo({...shippingInfo, fullName: e.target.value})}
                  className="w-full bg-black/40 border border-white/10 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-white transition text-white"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-400 mb-2">Email Address</label>
                  <input 
                    type="email" 
                    value={shippingInfo.email}
                    onChange={(e) => setShippingInfo({...shippingInfo, email: e.target.value})}
                    className="w-full bg-black/40 border border-white/10 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-white transition text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-400 mb-2">Phone Number</label>
                  <input 
                    type="text" 
                    value={shippingInfo.phone}
                    onChange={(e) => setShippingInfo({...shippingInfo, phone: e.target.value})}
                    className="w-full bg-black/40 border border-white/10 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-white transition text-white"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-neutral-400 mb-2">Delivery Address</label>
                <input 
                  type="text" 
                  value={shippingInfo.address}
                  onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
                  className="w-full bg-black/40 border border-white/10 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-white transition text-white"
                  required
                />
              </div>

              <div className="pt-4 border-t border-white/5">
                <h3 className="text-sm font-semibold mb-4 text-neutral-300">Payment Protocol</h3>
                <div className="p-4 rounded-2xl bg-neutral-900 border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">💳</span>
                    <div>
                      <span className="text-xs font-bold block">Quantum Infinite Card</span>
                      <span className="text-[10px] font-mono text-neutral-400">•••• •••• •••• 9842</span>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">Secured</span>
                </div>
              </div>

              <button 
                type="submit"
                disabled={isProcessing || cart.length === 0}
                className="w-full py-4 rounded-full bg-white text-black font-bold hover:bg-neutral-200 transition text-sm shadow-xl disabled:opacity-50 mt-6"
              >
                {isProcessing ? "Processing Secure Transaction..." : `Authorize & Place Order (${formatPrice(calculateTotalUSD())})`}
              </button>
            </form>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5 bg-white/[0.01] border border-white/10 p-8 rounded-3xl backdrop-blur-sm space-y-6">
            <h2 className="text-xl font-semibold border-b border-white/5 pb-4">Cart Summary ({cart.length})</h2>

            {cart.length === 0 ? (
              <div className="text-center py-12 space-y-4">
                <p className="text-neutral-400 text-sm">Your cart is currently empty.</p>
                <Link href="/products" className="inline-block px-6 py-2.5 rounded-full bg-white text-black text-xs font-semibold">
                  Explore Shop
                </Link>
              </div>
            ) : (
              <div className="space-y-4 max-h-[320px] overflow-y-auto pr-2">
                {cart.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center bg-neutral-950/60 p-4 rounded-2xl border border-white/5">
                    <div>
                      <h4 className="font-semibold text-sm">{item.name}</h4>
                      <span className="text-xs font-mono text-neutral-400">{formatPrice(item.price || 999)}</span>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-neutral-500 hover:text-red-400 text-xs font-mono p-2 transition"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="border-t border-white/5 pt-6 space-y-3 font-mono text-xs">
              <div className="flex justify-between text-neutral-400">
                <span>Subtotal</span>
                <span>{formatPrice(calculateTotalUSD())}</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Quantum Rail Freight</span>
                <span className="text-emerald-400">FREE</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-white/5">
                <span>Total Amount</span>
                <span className="text-emerald-400 font-mono text-base">{formatPrice(calculateTotalUSD())}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}