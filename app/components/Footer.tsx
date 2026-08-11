import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#020202] border-t border-white/5 pt-16 pb-8 font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Column */}
          <div className="md:col-span-1">
            <Link href="/" className="text-xl font-black tracking-widest text-white uppercase flex items-center gap-2 mb-4">
              <span className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]">🕷️</span>
              Vesper X
            </Link>
            <p className="text-[10px] text-neutral-500 uppercase tracking-widest leading-relaxed">
              Precision engineered aerospace-grade hardware. Designed in the shadows, built for the grid.
            </p>
          </div>

          {/* Nav Column 1 */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-4">System Links</h4>
            <ul className="space-y-3 text-[10px] text-neutral-500 uppercase tracking-widest">
              <li><Link href="/products" className="hover:text-white transition">Hardware Catalog</Link></li>
              <li><Link href="/compare" className="hover:text-white transition">Node Comparison</Link></li>
              <li><Link href="/profile" className="hover:text-white transition">Command Terminal</Link></li>
            </ul>
          </div>

          {/* Nav Column 2 (Legal & Policies - IDEA IMPLEMENTED) */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-4">Protocols</h4>
            <ul className="space-y-3 text-[10px] text-neutral-500 uppercase tracking-widest">
              <li><Link href="#" className="hover:text-white transition">Privacy Matrix</Link></li>
              <li><Link href="#" className="hover:text-white transition">Terms of Operation</Link></li>
              <li><Link href="#" className="hover:text-white transition">Return Policy (14-Days)</Link></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-4">Comm Link</h4>
            <ul className="space-y-3 text-[10px] text-neutral-500 uppercase tracking-widest">
              <li>Support: +1 (800) VSP-X99</li>
              <li>Email: support@vesper.io</li>
              <li>Grid: Sector 9, Neo-Kolkata</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-[9px] text-neutral-600 uppercase tracking-widest">
          <p>© 2026 VESPER X ECOSYSTEM. ALL NODES SECURED.</p>
          <div className="flex gap-4">
            <span className="hover:text-white cursor-pointer transition">INSTAGRAM</span>
            <span className="hover:text-white cursor-pointer transition">TWITTER / X</span>
            <span className="hover:text-white cursor-pointer transition">GITHUB</span>
          </div>
        </div>
      </div>
    </footer>
  );
}