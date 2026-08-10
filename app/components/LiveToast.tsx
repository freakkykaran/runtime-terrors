"use client";

import { useState, useEffect } from "react";

const notifications = [
  { name: "Rahul S.", city: "Mumbai", item: "Vesper 🕷 X Pro", time: "2 mins ago" },
  { name: "Ananya M.", city: "Bengaluru", item: "Vesper 🕷 Watch S", time: "5 mins ago" },
  { name: "Vikram K.", city: "Delhi", item: "Vesper 🕷 Vision Glass", time: "12 mins ago" },
  { name: "Sneha R.", city: "Kolkata", item: "Vesper 🕷 Buds Ultra", time: "Just now" }
];

export default function LiveToast() {
  const [current, setCurrent] = useState<any | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomNote = notifications[Math.floor(Math.random() * notifications.length)];
      setCurrent(randomNote);
      setVisible(true);

      setTimeout(() => {
        setVisible(false);
      }, 4000); // Hide after 4 seconds
    }, 12000); // Trigger every 12 seconds

    return () => clearInterval(interval);
  }, []);

  if (!visible || !current) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50 bg-neutral-950/90 border border-white/10 p-4 rounded-2xl shadow-2xl backdrop-blur-xl flex items-center gap-3 max-w-xs animate-slideUp">
      <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center font-bold text-xs">
        🛍️
      </div>
      <div>
        <p className="text-xs text-white font-medium">{current.name} from {current.city}</p>
        <p className="text-[11px] text-neutral-400">Purchased {current.item} • <span className="text-emerald-400">{current.time}</span></p>
      </div>
    </div>
  );
}