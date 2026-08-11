"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function ProfilePage() {
  // 1. User Identity Core States
  const [user, setUser] = useState({
    name: "Karan Kumar",
    email: "karan.kumar@vesper.io",
    phone: "+91 9876543210",
    wallet: 7500.00,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(user);
  
  // 2. Delivery Vector Node Data
  const [address, setAddress] = useState({
    street: "123, Vesper Grid, Sector 9",
    city: "Kolkata",
    state: "West Bengal",
    pincode: "700001",
  });

  // 3. Saved Secure Payment Methods Logs
  const [paymentMethods, setPaymentMethods] = useState([
    { id: "pm_1", type: "Visa Black Card", expiry: "12/29", last4: "8894" },
    { id: "pm_2", type: "Cash on Delivery", expiry: "N/A", last4: "COD" }
  ]);

  const [orders, setOrders] = useState<any[]>([]);

  // Real-time hooks synchronization loop
  useEffect(() => {
    // Sync custom workspace user data profile
    const savedUser = localStorage.getItem("vesper_user_profile");
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      setUser(parsed);
      setEditForm(parsed);
    } else {
      // Setup initial state if storage node empty
      localStorage.setItem("vesper_user_profile", JSON.stringify(user));
    }

    // Sync checkout transactions automatically
    const savedOrders = localStorage.getItem("vesper_orders");
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setUser(editForm);
    localStorage.setItem("vesper_user_profile", JSON.stringify(editForm));
    setIsEditing(false);
    
    // Dispatch local notification sync event to notify navbar layout component instantly
    window.dispatchEvent(new Event("storage"));
    alert("System database modified successfully.");
  };

  // HARD REFRESH TERMINATE ROUTINE (Forces immediate Navbar Re-Evaluation)
  const handleLogout = () => {
    localStorage.removeItem("vesper_user_profile");
    alert("Secure logout complete. Terminating current databank session...");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-[#020202] text-white font-mono p-4 sm:p-8 selection:bg-neutral-800 selection:text-white pb-24">
      <main className="max-w-6xl mx-auto space-y-10">
        
        {/* VIP Profile Card Header Grid Layout (Pure Dark Smoked Glass Effect) */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-zinc-950/70 via-zinc-900/40 to-black border border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 relative overflow-hidden backdrop-blur-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95)]">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/[0.01] rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="space-y-4">
            <span className="inline-block text-[10px] bg-white/[0.04] border border-white/10 px-3 py-1 rounded-full text-neutral-400 tracking-widest uppercase font-bold shadow-inner">
              Secure Terminal / Account Node
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-widest text-white uppercase mt-2">
              {user.name}
            </h1>
            <p className="text-xs text-neutral-500 tracking-widest font-sans font-light">{user.email} <span className="text-neutral-700 mx-2">|</span> ID: VSP-2077X</p>
          </div>
          
          <div className="w-full md:w-auto p-5 rounded-2xl bg-black/60 border border-white/5 backdrop-blur-md text-left md:text-right shadow-xl shrink-0">
            <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">Encrypted Balance</p>
            <p className="text-3xl font-black text-white mt-1 tracking-wider">${user.wallet.toFixed(2)}</p>
            <button onClick={() => alert("Terminal node payment interface initialization offline.")} className="mt-3 w-full text-[10px] font-bold uppercase tracking-widest py-2 rounded-xl bg-white/[0.02] hover:bg-white hover:text-black border border-white/10 transition-all duration-300 text-neutral-300">
              Sync Topup Funds
            </button>
          </div>
        </div>

        {/* Triple Action Dashboard Nodes System Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Identity Matrix Configuration Box */}
          <div className="p-6 sm:p-8 rounded-3xl bg-zinc-950/50 border border-white/5 backdrop-blur-2xl shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center border-b border-white/5 pb-4 mb-6">
                <h3 className="text-xs font-black tracking-widest uppercase text-neutral-400">1. Identity Matrix</h3>
                <button onClick={() => setIsEditing(!isEditing)} className="text-[10px] text-zinc-400 hover:text-white font-bold uppercase tracking-widest transition">
                  {isEditing ? "✕ Abort" : "Modify"}
                </button>
              </div>

              {isEditing ? (
                <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
                  <div>
                    <label className="text-neutral-500 block mb-1 uppercase tracking-wider text-[9px]">Operator Name</label>
                    <input type="text" value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} className="w-full p-3 rounded-xl bg-black/80 border border-white/10 text-white focus:outline-none focus:border-white transition font-mono" required />
                  </div>
                  <div>
                    <label className="text-neutral-500 block mb-1 uppercase tracking-wider text-[9px]">Email Node</label>
                    <input type="email" value={editForm.email} onChange={(e) => setEditForm({ ...editForm, email: e.target.value })} className="w-full p-3 rounded-xl bg-black/80 border border-white/10 text-white focus:outline-none focus:border-white transition font-mono" required />
                  </div>
                  <div>
                    <label className="text-neutral-500 block mb-1 uppercase tracking-wider text-[9px]">Secure Phone Line</label>
                    <input type="text" value={editForm.phone} onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })} className="w-full p-3 rounded-xl bg-black/80 border border-white/10 text-white focus:outline-none focus:border-white transition font-mono" required />
                  </div>
                  <button type="submit" className="w-full py-3 rounded-xl bg-white text-black font-black hover:bg-neutral-200 transition-all duration-300 uppercase tracking-widest mt-4">
                    Commit Changes
                  </button>
                </form>
              ) : (
                <div className="space-y-5 text-xs text-neutral-300">
                  <div>
                    <p className="text-[9px] text-neutral-600 uppercase tracking-widest mb-1">Assigned Username</p>
                    <p className="font-bold text-white tracking-wide text-sm">{user.name}</p>
                  </div>
                  <div>
                    <p className="text-[9px] text-neutral-600 uppercase tracking-widest mb-1">Communication String</p>
                    <p className="font-bold text-neutral-200 tracking-wide">{user.email}</p>
                  </div>
                  <div>
                    <p className="text-[9px] text-neutral-600 uppercase tracking-widest mb-1">Verification Code Node</p>
                    <p className="font-bold text-neutral-200 tracking-wide">{user.phone}</p>
                  </div>
                </div>
              )}
            </div>

            {!isEditing && (
              <button onClick={handleLogout} className="mt-8 w-full py-3 rounded-xl bg-zinc-900/60 hover:bg-red-950/20 border border-white/5 hover:border-red-900/30 text-neutral-400 hover:text-red-400 font-bold text-xs transition-all duration-300 uppercase tracking-widest">
                Terminate Grid Session (Logout)
              </button>
            )}
          </div>

          {/* Delivery Vector Node Box */}
          <div className="p-6 sm:p-8 rounded-3xl bg-zinc-950/50 border border-white/5 backdrop-blur-2xl shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center border-b border-white/5 pb-4 mb-6">
                <h3 className="text-xs font-black tracking-widest uppercase text-neutral-400">2. Delivery Vector</h3>
                <button 
                  onClick={() => {
                    const newStreet = prompt("Enter modifications for grid vector destination:", address.street);
                    if (newStreet) setAddress({ ...address, street: newStreet });
                  }}
                  className="text-[10px] text-zinc-400 hover:text-white font-bold uppercase tracking-widest transition"
                >
                  Edit Path
                </button>
              </div>
              <div className="bg-black/40 rounded-2xl p-5 border border-white/5 space-y-4 shadow-inner">
                <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">Primary Location Mapping:</p>
                <p className="text-xs text-neutral-300 leading-relaxed font-sans font-light">
                  {address.street}<br/>
                  {address.city}, {address.state}<br/>
                  Sector Code Reference: <span className="font-mono font-bold text-white">{address.pincode}</span>
                </p>
              </div>
            </div>
            
            <Link href="/products" className="mt-6 w-full py-3 text-center rounded-xl bg-white/[0.02] hover:bg-white/[0.08] border border-white/10 text-neutral-200 font-bold text-xs uppercase tracking-widest transition-all duration-200">
              Deploy Shopping Interface
            </Link>
          </div>

          {/* Vault Secure Payments Storage Box */}
          <div className="p-6 sm:p-8 rounded-3xl bg-zinc-950/50 border border-white/5 backdrop-blur-2xl shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center border-b border-white/5 pb-4 mb-6">
                <h3 className="text-xs font-black tracking-widest uppercase text-neutral-400">3. Vault Secure Payments</h3>
                <span className="text-[9px] text-neutral-600 uppercase tracking-widest font-bold">Encrypted</span>
              </div>
              
              <div className="space-y-3">
                {paymentMethods.map((pm) => (
                  <div key={pm.id} className="p-4 rounded-xl bg-black/40 border border-white/5 flex justify-between items-center text-xs">
                    <div>
                      <h4 className="font-bold text-white text-[11px]">{pm.type}</h4>
                      <p className="text-[10px] text-neutral-500 font-sans mt-0.5">Exp Node: {pm.expiry}</p>
                    </div>
                    <span className="px-2 py-1 rounded bg-white/[0.03] border border-white/5 text-neutral-400 tracking-wider text-[10px] font-bold">
                      •••• {pm.last4}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <button onClick={() => alert("Vault connection offline.")} className="mt-6 w-full py-3 rounded-xl bg-zinc-900/40 border border-white/5 text-neutral-500 font-bold text-xs uppercase tracking-widest cursor-not-allowed">
              + Insert New Token Card
            </button>
          </div>

        </div>

        {/* OPERATION TRANSACTION SUMMARY LOGS (My Orders Layout) */}
        <div className="pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-white/5 pb-4 mb-6 gap-2">
            <div>
              <h3 className="text-xl sm:text-2xl font-black tracking-widest uppercase text-white">System Operations Log</h3>
              <p className="text-[10px] text-neutral-500 mt-1 uppercase tracking-widest">Real-time status updates from Vesper nodes</p>
            </div>
            <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
              <span className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">[{orders.length} Nodes Placed]</span>
              <Link href="/order-tracking" className="text-[10px] text-zinc-400 hover:text-white underline uppercase tracking-widest transition">Live Tracking Utility</Link>
            </div>
          </div>

          {orders.length === 0 ? (
            <div className="p-16 rounded-3xl bg-zinc-950/20 border border-white/5 text-center text-neutral-500 text-xs uppercase tracking-widest shadow-inner">
              0 Dynamic transactions detected in hardware database. Place an order to sync records.
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order, index) => (
                <div key={index} className="p-6 rounded-2xl bg-gradient-to-b from-zinc-950 to-black/90 border border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 backdrop-blur-xl hover:border-white/20 transition-all duration-300 shadow-xl">
                  
                  <div className="space-y-1">
                    <p className="text-[9px] text-neutral-600 uppercase tracking-widest">Transaction Reference</p>
                    <p className="font-black text-white text-base tracking-widest">{order.id}</p>
                    <p className="text-[10px] text-neutral-400 tracking-wider">Stamp Date: {order.date}</p>
                  </div>

                  <div className="flex-1 md:px-12 w-full space-y-2">
                    <p className="text-[9px] text-neutral-600 uppercase tracking-widest">Cargo Manifest</p>
                    <div className="max-h-20 overflow-y-auto space-y-1 pr-2 custom-scrollbar text-xs text-neutral-400 font-sans font-light">
                      {Array.isArray(order.items) ? order.items.map((it: any, idx: number) => (
                        <div key={idx} className="flex justify-between border-b border-white/[0.02] pb-0.5">
                          <span>• {it.name || it.title}</span>
                          <span className="font-mono text-[10px] text-neutral-500">x{it.quantity || 1}</span>
                        </div>
                      )) : <span>Standard System Node Payload</span>}
                    </div>
                  </div>

                  <div className="w-full md:w-auto flex md:flex-col justify-between items-center md:items-end gap-2 border-t md:border-t-0 border-white/5 pt-4 md:pt-0">
                    <div>
                      <p className="text-[9px] text-neutral-600 uppercase tracking-widest md:text-right">Operational Status</p>
                      <span className="mt-1 inline-block px-2.5 py-0.5 rounded bg-white/[0.04] text-white border border-white/10 font-bold text-[9px] uppercase tracking-widest">
                        {order.status || "Processing"}
                      </span>
                    </div>
                    
                    <div className="text-right bg-black/50 p-3 rounded-xl border border-white/5 shrink-0 min-w-[120px] mt-2">
                      <p className="text-[9px] text-neutral-600 uppercase tracking-widest">Net Value</p>
                      <p className="text-lg font-black text-white tracking-wider">${order.total}</p>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>

      </main>
    </div>
  );
}