"use client";

import { useState } from "react";
import Link from "next/link";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API logic delay if needed, then trigger popup
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setFormData({ name: "", email: "", subject: "", message: "" }); // Reset form
  };

  return (
    <div className="min-h-screen bg-[#020202] text-white font-sans p-4 sm:p-8 selection:bg-neutral-800 selection:text-white relative">
      <div className="max-w-5xl mx-auto space-y-12 pb-20">
        
        {/* Header Node */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-zinc-950/60 border border-white/5 p-6 sm:p-10 rounded-3xl backdrop-blur-3xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)]">
          <div>
            <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-widest text-white font-mono">
              Secure <span className="text-zinc-500">Comm Link</span>
            </h1>
            <p className="text-xs text-neutral-400 mt-2 uppercase tracking-wider font-semibold font-mono">
              Vesper Concierge is online 24/7. Establish connection below.
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-3 bg-black/50 px-4 py-2 rounded-xl border border-white/5">
            <span className="w-2 h-2 rounded-full bg-neutral-400 animate-pulse"></span>
            <span className="text-[10px] text-neutral-300 font-mono tracking-widest uppercase">System Online</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Contact Details Panel */}
          <div className="lg:col-span-1 space-y-6">
            <div className="p-8 rounded-3xl bg-zinc-950/40 border border-white/5 backdrop-blur-2xl shadow-xl h-full flex flex-col justify-between">
              <div className="space-y-8">
                <div>
                  <h3 className="text-[10px] font-black tracking-widest uppercase text-neutral-500 mb-2 font-mono">Direct Channel</h3>
                  <p className="text-sm font-bold text-white tracking-widest font-mono">support@vesper.io</p>
                </div>
                <div>
                  <h3 className="text-[10px] font-black tracking-widest uppercase text-neutral-500 mb-2 font-mono">Priority Voice</h3>
                  <p className="text-sm font-bold text-white tracking-widest font-mono">+1 (800) VSP-X99</p>
                </div>
                <div>
                  <h3 className="text-[10px] font-black tracking-widest uppercase text-neutral-500 mb-2 font-mono">HQ Coordinates</h3>
                  <p className="text-xs text-neutral-300 leading-relaxed font-light">
                    Sector 9, Vesper Tower<br/>
                    Neo-Kolkata Grid<br/>
                    India - 700001
                  </p>
                </div>
              </div>
              <div className="pt-8 mt-8 border-t border-white/5">
                <p className="text-[9px] text-neutral-600 uppercase tracking-widest font-mono">Average Response Time: &lt; 15 Minutes</p>
              </div>
            </div>
          </div>

          {/* Secure Form Panel */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="p-8 rounded-3xl bg-gradient-to-br from-zinc-950/70 to-black border border-white/5 backdrop-blur-3xl shadow-2xl space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-neutral-500 block mb-2 font-mono uppercase tracking-wider text-[10px]">Operator Name</label>
                  <input 
                    type="text" 
                    required 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Enter your designation" 
                    className="w-full p-4 rounded-xl bg-black/80 border border-white/5 text-white focus:outline-none focus:border-white/40 transition font-sans text-sm placeholder:text-neutral-700" 
                  />
                </div>
                <div>
                  <label className="text-neutral-500 block mb-2 font-mono uppercase tracking-wider text-[10px]">Return Ping (Email)</label>
                  <input 
                    type="email" 
                    required 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="name@node.com" 
                    className="w-full p-4 rounded-xl bg-black/80 border border-white/5 text-white focus:outline-none focus:border-white/40 transition font-sans text-sm placeholder:text-neutral-700" 
                  />
                </div>
              </div>

              <div>
                <label className="text-neutral-500 block mb-2 font-mono uppercase tracking-wider text-[10px]">Subject Vector</label>
                <input 
                  type="text" 
                  required 
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  placeholder="State your objective" 
                  className="w-full p-4 rounded-xl bg-black/80 border border-white/5 text-white focus:outline-none focus:border-white/40 transition font-sans text-sm placeholder:text-neutral-700" 
                />
              </div>

              <div>
                <label className="text-neutral-500 block mb-2 font-mono uppercase tracking-wider text-[10px]">Encrypted Message</label>
                <textarea 
                  required 
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder="Transmit your message here..." 
                  className="w-full p-4 rounded-xl bg-black/80 border border-white/5 text-white focus:outline-none focus:border-white/40 transition font-sans text-sm placeholder:text-neutral-700 resize-none" 
                />
              </div>

              <button 
                type="submit" 
                className="w-full py-4 rounded-xl bg-white hover:bg-neutral-200 text-black font-black text-xs transition-all duration-300 uppercase tracking-widest active:scale-98 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] font-mono mt-4"
              >
                Transmit Signal
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* ================= SUCCESS POPUP MODAL (YOUR BRILLIANT IDEA) ================= */}
      {showPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Blurred Background Overlay */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={closePopup}
          ></div>
          
          {/* Glassmorphic Popup Card */}
          <div className="relative z-10 w-full max-w-md p-8 rounded-3xl bg-gradient-to-b from-zinc-900 to-black border border-white/10 shadow-[0_0_50px_rgba(255,255,255,0.05)] text-center space-y-6">
            
            <div className="w-16 h-16 mx-auto rounded-full bg-white/5 border border-white/10 flex items-center justify-center shadow-inner">
              <span className="text-2xl drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">✓</span>
            </div>
            
            <div>
              <h2 className="text-xl sm:text-2xl font-black tracking-widest text-white uppercase font-mono mb-2">
                Signal <span className="text-neutral-500">Received</span>
              </h2>
              <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                Thank you, Operator. Your encrypted message has been securely transmitted to the Vesper Concierge node. We will return your ping shortly.
              </p>
            </div>

            <button 
              onClick={closePopup}
              className="w-full py-3 rounded-xl bg-zinc-900/80 hover:bg-white hover:text-black border border-white/10 text-white font-bold text-[10px] transition-all duration-300 uppercase tracking-widest active:scale-95 font-mono shadow-md"
            >
              Close Connection
            </button>
          </div>
        </div>
      )}
    </div>
  );
}