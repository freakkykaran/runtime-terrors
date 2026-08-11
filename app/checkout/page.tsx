"use client";

import { useState } from "react";
import Link from "next/link";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Vesper X Masterpiece (Titanium Edition)",
      price: 1299,
      quantity: 1,
      image: "🕷️",
    }
  ]);

  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState("");

  const handleQuantityChange = (id: number, delta: number) => {
    setCartItems(
      cartItems.map((item) => {
        if (item.id === id) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : item;
        }
        return item;
      })
    );
  };

  const handleRemove = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === "VIBE10" || couponCode.toUpperCase() === "RUNTIME10") {
      setDiscount(0.1);
      setCouponMessage("Coupon applied successfully! 10% off added.");
    } else {
      setDiscount(0);
      setCouponMessage("Invalid coupon code. Try 'VIBE10'.");
    }
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = subtotal * discount;
  const shipping = cartItems.length > 0 ? 25 : 0;
  const total = subtotal - discountAmount + shipping;

  return (
    <div className="min-h-screen bg-black text-white font-mono selection:bg-emerald-500 selection:text-black">
      <main className="max-w-6xl mx-auto px-4 sm:px-8 py-12">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-wider uppercase mb-8">
          Shopping <span className="text-emerald-400">Cart</span> & Checkout
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-20 space-y-4">
            <p className="text-neutral-400 text-sm">Your cart is empty.</p>
            <Link
              href="/shop"
              className="inline-block px-6 py-3 rounded-xl bg-emerald-500 text-black font-bold text-xs hover:bg-emerald-400 transition"
            >
              Explore Shop
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 rounded-2xl bg-white/5 border border-white/10 gap-4 backdrop-blur-xl"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl bg-white/10 flex items-center justify-center text-2xl">
                      {item.image}
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-white">{item.name}</h3>
                      <p className="text-xs text-emerald-400 mt-1">${item.price} USD</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                    <div className="flex items-center gap-2 bg-black/40 border border-white/10 rounded-lg p-1">
                      <button
                        onClick={() => handleQuantityChange(item.id, -1)}
                        className="px-2.5 py-1 text-xs text-neutral-300 hover:text-white"
                      >
                        -
                      </button>
                      <span className="text-xs font-bold px-2">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item.id, 1)}
                        className="px-2.5 py-1 text-xs text-neutral-300 hover:text-white"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => handleRemove(item.id)}
                      className="text-xs text-red-400 hover:text-red-300 transition"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-6 backdrop-blur-xl h-fit">
              <h3 className="text-sm font-bold tracking-wider uppercase text-neutral-300 pb-2 border-b border-white/10">
                Order Summary
              </h3>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between text-neutral-300">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount (10%)</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-neutral-300">
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="pt-3 border-t border-white/10 flex justify-between text-sm font-bold text-white">
                  <span>Total</span>
                  <span className="text-emerald-400">${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <label className="text-xs text-neutral-400 block">COUPON CODE (Try: VIBE10)</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-lg bg-black/50 border border-white/10 text-xs text-white focus:outline-none focus:border-emerald-400"
                  />
                  <button
                    onClick={applyCoupon}
                    className="px-4 py-2 rounded-lg bg-white text-black font-bold text-xs hover:bg-neutral-200 transition"
                  >
                    Apply
                  </button>
                </div>
                {couponMessage && (
                  <p className={`text-[10px] mt-1 ${discount > 0 ? "text-emerald-400" : "text-red-400"}`}>
                    {couponMessage}
                  </p>
                )}
              </div>

              <button
                onClick={() => alert("Order placed successfully! Thank you for choosing Vesper X.")}
                className="w-full py-3 rounded-xl bg-emerald-500 text-black font-bold text-xs hover:bg-emerald-400 transition tracking-wider uppercase"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}