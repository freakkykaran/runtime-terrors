"use client";

import { useState } from "react";
import Link from "next/link";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-black text-white px-6 pt-32 pb-24 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-neutral-900/40 rounded-full blur-[150px] pointer-events-none opacity-50"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="mb-16 border-b border-white/5 pb-10 text-center md:text-left">
          <span className="text-xs font-mono tracking-[0.3em] uppercase text-neutral-500 mb-2 block">Get in Touch</span>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-4">
            We are here for you.
          </h1>
          <p className="text-neutral-400 max-w-xl font-light text-lg">
            Have questions about the Vesper 🕷 Ecosystem, quantum shipping, or bulk enterprise procurement? Reach out to our concierge team.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Left Side: Contact Details */}
          <div className="space-y-8">
            <div className="bg-white/[0.01] border border-white/5 rounded-3xl p-8 backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-6">Global Headquarters</h3>
              <p className="text-neutral-400 text-sm leading-relaxed mb-6 font-light">
                Vesper 🕷 Tech Innovation Hub<br />
                Silicon Tower, Sector V, Salt Lake<br />
                Kolkata, WB 700091, India
              </p>
              <div className="space-y-3 text-sm text-neutral-300">
                <div className="flex items-center gap-3">
                  <span className="text-neutral-500 font-mono">Email:</span>
                  <span className="text-white">support@aurax.tech</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-neutral-500 font-mono">Helpline:</span>
                  <span className="text-white">+91 (800) AURA-X-PRO</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-neutral-500 font-mono">Hours:</span>
                  <span className="text-white">24/7 Quantum Concierge Support</span>
                </div>
              </div>
            </div>

            <div className="bg-white/[0.01] border border-white/5 rounded-3xl p-8 backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-3">Press & Media</h3>
              <p className="text-neutral-400 text-sm font-light mb-4">
                For media inquiries, hardware review units, or partnership opportunities.
              </p>
              <span className="text-sm font-mono text-white underline cursor-pointer">media@aurax.tech</span>
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <div className="bg-white/[0.01] border border-white/5 rounded-3xl p-8 md:p-10 backdrop-blur-sm">
            <h3 className="text-2xl font-semibold mb-6">Send us a Message</h3>

            {submitted ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto text-2xl">
                  ✓
                </div>
                <h4 className="text-xl font-medium">Message Dispatched</h4>
                <p className="text-neutral-400 text-sm max-w-sm mx-auto font-light">
                  Thank you. Our quantum support unit has received your transmission and will reply within 2 hours.
                </p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="mt-4 text-xs bg-white text-black px-6 py-2.5 rounded-full font-medium hover:bg-neutral-200 transition"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-400 mb-2">Your Full Name</label>
                  <input 
                    required 
                    type="text" 
                    placeholder="Karan Kumar" 
                    className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-neutral-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-400 mb-2">Email Address</label>
                  <input 
                    required 
                    type="email" 
                    placeholder="karan@example.com" 
                    className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-neutral-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-400 mb-2">Message</label>
                  <textarea 
                    required 
                    rows={4} 
                    placeholder="Type your inquiry here..." 
                    className="w-full bg-white/[0.02] border border-white/10 rounded-xl p-4 text-sm focus:outline-none focus:border-neutral-400 transition-colors resize-none"
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="w-full py-4 rounded-full bg-white text-black font-semibold hover:bg-neutral-200 transition duration-300 shadow-xl"
                >
                  Transmit Message
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </main>
  );
}