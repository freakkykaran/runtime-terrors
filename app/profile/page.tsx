"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { user, updateUser, logout } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"orders" | "addresses" | "payments" | "edit">("orders");
  
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editAddress, setEditAddress] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    if (!user) {
      router.push("/login");
    } else {
      setEditName(user.name);
      setEditEmail(user.email);
      setEditPhone(user.phone || "+91 98765 43210");
      setEditAddress(user.address || "Sector V, Salt Lake, Kolkata, 700091");
    }
  }, [user, router]);

  if (!user) return null;

  const getInitials = (fullName: string) => {
    const parts = fullName.trim().split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    } else if (parts.length === 1 && parts[0].length > 0) {
      return parts[0].substring(0, 2).toUpperCase();
    }
    return "KK";
  };

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({
      name: editName,
      email: editEmail,
      phone: editPhone,
      address: editAddress
    });
    setSuccessMsg("Profile details and avatar updated successfully!");
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  return (
    <main className="min-h-screen bg-black text-white px-6 pt-32 pb-24 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-neutral-900/30 rounded-full blur-[150px] pointer-events-none opacity-50"></div>

      <div className="max-w-5xl mx-auto relative z-10 space-y-10">
        
        {/* User Info Header */}
        <div className="bg-white/[0.01] border border-white/10 rounded-3xl p-8 backdrop-blur-sm flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-neutral-800 to-neutral-600 border border-white/20 flex items-center justify-center text-2xl font-bold font-mono shadow-xl text-white">
              {getInitials(user.name)}
            </div>
            <div className="text-center md:text-left space-y-1">
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">Verified Quantum Member</span>
              <h1 className="text-2xl md:text-3xl font-bold">{user.name}</h1>
              <p className="text-neutral-400 text-xs md:text-sm">{user.email} • Kolkata, India</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-neutral-900/80 border border-white/10 px-6 py-4 rounded-2xl flex items-center gap-4">
              <span className="text-2xl">💳</span>
              <div>
                <span className="text-[10px] font-mono text-neutral-500 uppercase block">Quantum Wallet</span>
                <span className="text-sm font-bold font-mono text-emerald-400">$1,450.00</span>
              </div>
            </div>
            <button 
              onClick={logout} 
              className="px-5 py-4 rounded-2xl border border-red-500/20 bg-red-500/5 text-red-400 text-xs font-semibold hover:bg-red-500/10 transition"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-3 border-b border-white/10 pb-4">
          <button 
            onClick={() => setActiveTab("orders")}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold transition ${activeTab === "orders" ? "bg-white text-black" : "bg-white/5 text-neutral-400 hover:text-white"}`}
          >
            📦 My Orders & Tracking ({user.orders?.length || 0})
          </button>
          <button 
            onClick={() => setActiveTab("addresses")}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold transition ${activeTab === "addresses" ? "bg-white text-black" : "bg-white/5 text-neutral-400 hover:text-white"}`}
          >
            📍 Saved Addresses
          </button>
          <button 
            onClick={() => setActiveTab("payments")}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold transition ${activeTab === "payments" ? "bg-white text-black" : "bg-white/5 text-neutral-400 hover:text-white"}`}
          >
            💳 Saved Payment Methods
          </button>
          <button 
            onClick={() => setActiveTab("edit")}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold transition ${activeTab === "edit" ? "bg-white text-black" : "bg-white/5 text-neutral-400 hover:text-white"}`}
          >
            ⚙️ Edit Profile
          </button>
        </div>

        {/* Tab 1: Dynamic Orders & Tracking List */}
        {activeTab === "orders" && (
          <div className="space-y-8 animate-fadeIn">
            {user.orders && user.orders.length > 0 ? (
              user.orders.map((order, idx) => (
                <div key={idx} className="bg-white/[0.01] border border-white/10 rounded-3xl p-8 backdrop-blur-sm space-y-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-white/5 pb-4">
                    <div>
                      <span className="text-xs font-mono text-neutral-500">Order ID: <span className="text-white">{order.id}</span> • Date: {order.date}</span>
                      <h2 className="text-xl font-bold text-emerald-400 font-mono mt-1">Total: {order.total}</h2>
                    </div>
                    <span className="px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-400">
                      {order.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative pt-2">
                    {order.steps.map((step, sIdx) => (
                      <div key={sIdx} className={`p-4 rounded-2xl border ${step.active ? 'bg-neutral-950/80 border-emerald-500/30' : 'bg-neutral-950/40 border-white/5 opacity-50'}`}>
                        <div className={`w-3 h-3 rounded-full mb-3 ${step.active ? 'bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]' : 'bg-neutral-700'}`}></div>
                        <h4 className="font-semibold text-sm mb-1">{step.title}</h4>
                        <p className="text-xs text-neutral-400">{step.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-16 bg-white/[0.01] border border-white/10 rounded-3xl">
                <p className="text-neutral-400 text-sm">No orders placed yet.</p>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Saved Addresses */}
        {activeTab === "addresses" && (
          <div className="space-y-4 animate-fadeIn">
            <div className="bg-white/[0.01] border border-white/10 rounded-3xl p-6 backdrop-blur-sm flex justify-between items-center">
              <div className="space-y-1">
                <span className="px-3 py-1 rounded-full bg-white/10 text-[10px] font-mono text-emerald-400">Default Shipping Address</span>
                <h3 className="font-semibold text-base mt-2">{user.name}</h3>
                <p className="text-sm text-neutral-400">{user.address || "Sector V, Salt Lake, Kolkata, 700091"}</p>
                <p className="text-xs text-neutral-500 font-mono">Phone: {user.phone || "+91 98765 43210"}</p>
              </div>
              <button onClick={() => setActiveTab("edit")} className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold hover:bg-white/10 transition">Edit</button>
            </div>
          </div>
        )}

        {/* Tab 3: Saved Payment Methods */}
        {activeTab === "payments" && (
          <div className="space-y-4 animate-fadeIn">
            <div className="bg-white/[0.01] border border-white/10 rounded-3xl p-6 backdrop-blur-sm flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-neutral-900 border border-white/10 flex items-center justify-center font-bold font-mono text-emerald-400">
                  VISA
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Quantum Infinite Card</h4>
                  <p className="text-xs font-mono text-neutral-400">•••• •••• •••• 9842 • Exp 08/29</p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-400">Default</span>
            </div>
          </div>
        )}

        {/* Tab 4: Edit Profile */}
        {activeTab === "edit" && (
          <div className="bg-white/[0.01] border border-white/10 rounded-3xl p-8 backdrop-blur-sm animate-fadeIn">
            <h3 className="text-lg font-semibold mb-6">Edit Personal Information</h3>
            {successMsg && <div className="mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs">{successMsg}</div>}
            
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-400 mb-2">Full Name</label>
                  <input 
                    type="text" 
                    value={editName} 
                    onChange={(e) => setEditName(e.target.value)} 
                    className="w-full bg-black/40 border border-white/10 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-white transition" 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-400 mb-2">Email Address</label>
                  <input 
                    type="email" 
                    value={editEmail} 
                    onChange={(e) => setEditEmail(e.target.value)} 
                    className="w-full bg-black/40 border border-white/10 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-white transition" 
                    required 
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-mono uppercase text-neutral-400 mb-2">Phone Number</label>
                <input 
                  type="text" 
                  value={editPhone} 
                  onChange={(e) => setEditPhone(e.target.value)} 
                  className="w-full bg-black/40 border border-white/10 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-white transition" 
                  required 
                />
              </div>
              <div>
                <label className="block text-xs font-mono uppercase text-neutral-400 mb-2">Default Address</label>
                <input 
                  type="text" 
                  value={editAddress} 
                  onChange={(e) => setEditAddress(e.target.value)} 
                  className="w-full bg-black/40 border border-white/10 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-white transition" 
                  required 
                />
              </div>
              <button type="submit" className="px-8 py-3.5 rounded-full bg-white text-black font-semibold hover:bg-neutral-200 transition text-sm">
                Save Changes & Update Avatar
              </button>
            </form>
          </div>
        )}

      </div>
    </main>
  );
}