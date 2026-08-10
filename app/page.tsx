import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-start px-6 relative overflow-hidden pt-32 pb-24">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neutral-900/50 rounded-full blur-[200px] pointer-events-none opacity-60"></div>

      {/* Hero Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/5 bg-white/[0.02] backdrop-blur-sm mb-6 text-xs tracking-widest uppercase text-neutral-400 hover:border-white/20 transition duration-300">
        <span className="w-2 h-2 rounded-full bg-neutral-400 animate-pulse"></span>
        The Flagship, Redefined
      </div>

      {/* Main Title */}
      <h1 className="text-5xl md:text-8xl font-bold tracking-tight text-center mb-4 bg-gradient-to-b from-white via-neutral-100 to-neutral-700 bg-clip-text text-transparent">
        Vesper 🕷 X Masterpiece
      </h1>

      {/* Subtitle */}
      <p className="text-neutral-400 text-center max-w-xl text-base md:text-lg mb-8 font-light tracking-wide">
        Forged from aerospace titanium. Powered by light. Designed to disappear into the dark and capture everything within it.
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 items-center mb-24">
        <Link 
          href="/products" 
          className="rounded-full bg-white text-black px-8 py-3.5 font-medium text-sm hover:bg-neutral-200 transition duration-300 shadow-xl shadow-white/5 hover:scale-105 transform"
        >
          Explore Collection
        </Link>
        <Link 
          href="/checkout" 
          className="rounded-full border border-white/10 px-8 py-3.5 font-medium text-sm text-white hover:bg-white/[0.03] transition duration-300 backdrop-blur-sm hover:scale-105 transform"
        >
          View Cart / Checkout
        </Link>
      </div>

      {/* Dark Black Glass Exploded-View Showcase */}
      <div className="relative w-full max-w-5xl py-28 my-12 flex flex-col items-center justify-center group overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-950/20 to-transparent backdrop-blur-[2px] pointer-events-none rounded-3xl"></div>

        <div className="text-center mb-20 z-10">
          <span className="text-xs uppercase tracking-[0.4em] text-neutral-500 font-mono mb-2 block">Deep Architecture</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Precision Engineered from Within</h2>
        </div>

        {/* Exploded Layers */}
        <div className="relative w-full flex flex-col items-center gap-6 transition-all duration-700 group-hover:scale-[1.02]">
          <div className="w-[85%] md:w-[65%] h-24 bg-neutral-900/90 rounded-3xl border border-white/10 shadow-[0_10px_50px_-15px_rgba(0,0,0,0.5)] flex items-center justify-between px-10 transform group-hover:-translate-y-20 transition-all duration-700 backdrop-blur-xl hover:border-neutral-600">
            <span className="text-xs font-mono text-neutral-600">LAYER 01</span>
            <span className="text-sm font-semibold tracking-wider text-white">Aerospace Titanium Back Plate & Triple Camera</span>
            <span className="w-3 h-3 rounded-full bg-neutral-700"></span>
          </div>
          <div className="w-[75%] md:w-[55%] h-20 bg-black/80 rounded-3xl border border-neutral-800 shadow-[0_10px_50px_-15px_rgba(0,0,0,0.5)] flex items-center justify-between px-10 transform group-hover:-translate-y-10 transition-all duration-700 backdrop-blur-xl hover:border-neutral-500">
            <span className="text-xs font-mono text-neutral-500">LAYER 02</span>
            <span className="text-sm font-semibold tracking-wider text-white">A19 Pro Bionic & Neural Quantum Core</span>
            <span className="w-3 h-3 rounded-full bg-neutral-500"></span>
          </div>
          <div className="w-[70%] md:w-[50%] h-20 bg-neutral-900/90 rounded-3xl border border-white/10 shadow-[0_10px_50px_-15px_rgba(0,0,0,0.5)] flex items-center justify-between px-10 transform group-hover:translate-y-10 transition-all duration-700 backdrop-blur-xl hover:border-neutral-600">
            <span className="text-xs font-mono text-neutral-600">LAYER 03</span>
            <span className="text-sm font-semibold tracking-wider text-white">Solid-State Solar Cell & Vapor Chamber</span>
            <span className="w-3 h-3 rounded-full bg-neutral-700"></span>
          </div>
          <div className="w-[85%] md:w-[65%] h-24 bg-black/80 rounded-3xl border border-neutral-800 shadow-[0_10px_50px_-15px_rgba(0,0,0,0.5)] flex items-center justify-between px-10 transform group-hover:translate-y-20 transition-all duration-700 backdrop-blur-xl hover:border-neutral-500">
            <span className="text-xs font-mono text-neutral-500">LAYER 04</span>
            <span className="text-sm font-semibold tracking-wider text-white">120Hz Sapphire Micro-OLED Glass Front</span>
            <span className="w-3 h-3 rounded-full bg-neutral-600"></span>
          </div>
        </div>
      </div>

      {/* Apple-Style Battery & Performance Image Showcase */}
      <div className="max-w-6xl w-full border-t border-white/5 pt-32 mb-28 flex flex-col items-center">
       {/* Clean Image Container (No Border, No Dynamic Island) */}
       <div className="relative w-full max-w-4xl aspect-[21/9] md:aspect-video rounded-[2.5rem] overflow-hidden mb-20 group hover:scale-[1.01] transition-transform duration-700">
          
          <img
            src="/aur-diagram.jpg" 
            alt="Vesper 🕷 X Landscape view"
            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-700"
          />
          
        </div>

        {/* Apple-Style Orange Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left max-w-4xl w-full px-6">
          <div className="hover:-translate-y-1 transition duration-300">
            <p className="text-neutral-500 text-sm font-semibold mb-1">Up to</p>
            <h3 className="text-orange-500 text-4xl font-bold tracking-tight mb-3">31 hours</h3>
            <p className="text-neutral-400 text-sm font-light leading-snug">video playback on<br/>Vesper 🕷 X Pro<sup className="text-[10px]">1</sup></p>
          </div>
          <div className="hover:-translate-y-1 transition duration-300">
            <p className="text-neutral-500 text-sm font-semibold mb-1">Up to</p>
            <h3 className="text-orange-500 text-4xl font-bold tracking-tight mb-3">37 hours</h3>
            <p className="text-neutral-400 text-sm font-light leading-snug">video playback on<br/>Vesper 🕷 X Pro Max<sup className="text-[10px]">2</sup></p>
          </div>
          <div className="hover:-translate-y-1 transition duration-300">
            <p className="text-neutral-500 text-sm font-semibold mb-1">Up to</p>
            <h3 className="text-orange-500 text-4xl font-bold tracking-tight mb-3">50% charge<br/>in 20 minutes</h3>
            <p className="text-neutral-400 text-sm font-light leading-snug">with high-wattage power<br/>adapter<sup className="text-[10px]">3</sup></p>
          </div>
        </div>

        {/* Compare Button */}
        <button className="mt-20 flex items-center gap-3 bg-neutral-900/50 hover:bg-neutral-800 border border-white/10 px-6 py-3 rounded-full transition-all duration-300 backdrop-blur-md">
          <span className="text-sm text-neutral-300 font-medium">Compare Vesper 🕷 performance</span>
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white text-lg leading-none">+</span>
        </button>
      </div>

      {/* 6 Main Features Grid */}
      <div className="max-w-5xl w-full border-t border-white/5 pt-20 mb-28">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight mb-3 text-white">Engineered Beyond Limits</h2>
          <p className="text-neutral-400 text-base font-light">Every component meticulously crafted for supreme dominance.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="group p-8 rounded-3xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05] hover:border-neutral-500/50 hover:-translate-y-2 transition-all duration-500 shadow-xl">
            <div className="text-neutral-500 font-mono text-xs mb-3 group-hover:text-white transition duration-300">01 / MATERIAL</div>
            <h3 className="text-white font-semibold text-xl mb-3">Aerospace Grade Titanium</h3>
            <p className="text-neutral-400 text-sm leading-relaxed font-light">Same alloy that spacecraft use for Mars missions. Unmatched strength-to-weight ratio.</p>
          </div>
          <div className="group p-8 rounded-3xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05] hover:border-neutral-500/50 hover:-translate-y-2 transition-all duration-500 shadow-xl">
            <div className="text-neutral-500 font-mono text-xs mb-3 group-hover:text-white transition duration-300">02 / PERFORMANCE</div>
            <h3 className="text-white font-semibold text-xl mb-3">Thermal Vapor Chamber</h3>
            <p className="text-neutral-400 text-sm leading-relaxed font-light">Advanced micro-cooling architecture designed to sustain peak frame rates during intense tasks.</p>
          </div>
          <div className="group p-8 rounded-3xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05] hover:border-neutral-500/50 hover:-translate-y-2 transition-all duration-500 shadow-xl">
            <div className="text-neutral-500 font-mono text-xs mb-3 group-hover:text-white transition duration-300">03 / BATTERY</div>
            <h3 className="text-white font-semibold text-xl mb-3">All-Day Solar Energy</h3>
            <p className="text-neutral-400 text-sm leading-relaxed font-light">High-density solid-state cell combined with micro-solar absorption panels for endless standby.</p>
          </div>
        </div>
      </div>

      {/* Bottom Call to Action Card */}
      <div className="max-w-5xl w-full rounded-3xl p-10 md:p-14 bg-gradient-to-r from-neutral-900/80 via-black to-neutral-900/80 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-8 backdrop-blur-2xl hover:border-white/20 transition duration-500">
        <div>
          <span className="text-xs font-mono tracking-[0.3em] uppercase text-neutral-500 mb-2 block">Ready for Deployment</span>
          <h3 className="text-3xl md:text-4xl font-serif font-semibold text-white">Experience Vesper 🕷 X Today.</h3>
          <p className="text-neutral-400 text-sm font-light mt-2 max-w-md">Limited production run. Claim your flagship device with complimentary global express shipping.</p>
        </div>
        <Link 
          href="/checkout" 
          className="rounded-full bg-white text-black px-8 py-4 font-medium text-sm hover:bg-neutral-200 transition duration-300 shadow-2xl hover:scale-105 whitespace-nowrap"
        >
          Order Now — $1,999
        </Link>
      </div>
    </main>
  );
}