"use client";

import { useState } from "react";

export default function Footer() {
  const [modalContent, setModalContent] = useState<string | null>(null);

  const openModal = (type: string) => {
    setModalContent(type);
  };

  return (
    <footer className="bg-black border-t border-white/5 py-16 px-6 text-neutral-500 text-xs">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div>
          <p className="font-mono tracking-widest text-white mb-2">AURA X ECOSYSTEM</p>
          <p>© 2026 Vesper 🕷 Technologies Inc. All quantum rights reserved.</p>
        </div>

        <div className="flex flex-wrap gap-6 font-medium text-neutral-400">
          <button onClick={() => openModal("privacy")} className="hover:text-white transition">Privacy Policy</button>
          <button onClick={() => openModal("terms")} className="hover:text-white transition">Terms of Service</button>
          <button onClick={() => openModal("warranty")} className="hover:text-white transition">Quantum Warranty</button>
        </div>
      </div>

      {/* Modal Popup */}
      {modalContent && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-6">
          <div className="bg-neutral-950 border border-white/10 rounded-3xl max-w-lg w-full p-8 relative text-white space-y-4">
            <h3 className="text-xl font-bold capitalize">{modalContent.replace("-", " ")}</h3>
            <p className="text-neutral-400 text-sm font-light leading-relaxed">
              {modalContent === "privacy" && "Your data telemetry is protected under 256-bit quantum encryption. We never share your shipping or biometric records with third-party entities."}
              {modalContent === "terms" && "By accessing the Vesper 🕷 Ecosystem, you agree to adhere to our aerospace-grade operational protocols and localized distribution guidelines."}
              {modalContent === "warranty" && "All Vesper 🕷 devices come with a 3-year global quantum warranty covering hardware degradation, circuit latency, and accidental drop protection."}
            </p>
            <button 
              onClick={() => setModalContent(null)}
              className="mt-6 w-full py-3 rounded-full bg-white text-black font-semibold hover:bg-neutral-200 transition text-xs"
            >
              Close Policy
            </button>
          </div>
        </div>
      )}
    </footer>
  );
}