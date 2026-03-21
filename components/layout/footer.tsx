import Link from "next/link";
import { Youtube, Twitter, Facebook, Instagram, Linkedin, Globe } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-black/90 border-t border-white/5 pt-16 pb-8 mt-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none" />
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 md:gap-8 mb-16">
          <div className="col-span-2 lg:col-span-1 space-y-6">
            <Link href="/" className="text-2xl font-black tracking-tighter flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-premium shadow-glow group-hover:scale-110 transition-transform" />
              KodLearn
            </Link>
            <p className="text-sm text-white/40 font-medium leading-relaxed">
              Transforming the way the world learns through premium, cloud-native technology and YouTube-powered automation.
            </p>
            <div className="flex items-center gap-4">
               {[Twitter, Facebook, Instagram, Linkedin, Youtube].map((Icon, i) => (
                  <Link key={i} href="#" className="h-8 w-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-all shadow-sm">
                     <Icon className="w-4 h-4" />
                  </Link>
               ))}
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-black uppercase tracking-[0.2em] text-white/20">Platform</h4>
            <ul className="space-y-3 text-sm font-bold text-white/60">
              <li><Link href="/courses" className="hover:text-primary transition-colors">All Courses</Link></li>
              <li><Link href="/business" className="hover:text-primary transition-colors">For Business</Link></li>
              <li><Link href="/teach" className="hover:text-primary transition-colors">Teach on KodLearn</Link></li>
              <li><Link href="/dashboard" className="hover:text-primary transition-colors">My Learning</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-black uppercase tracking-[0.2em] text-white/20">Company</h4>
            <ul className="space-y-3 text-sm font-bold text-white/60">
              <li><Link href="#" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Careers</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Press</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-black uppercase tracking-[0.2em] text-white/20">Legal</h4>
            <ul className="space-y-3 text-sm font-bold text-white/60">
              <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Use</Link></li>
              <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Cookie Settings</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Sitemap</Link></li>
            </ul>
          </div>

          <div className="col-span-2 lg:col-span-1">
             <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
                <p className="text-xs font-black uppercase tracking-widest text-primary">Language Preference</p>
                <button className="flex items-center justify-between w-full h-11 px-4 bg-white/5 border border-white/10 rounded-xl text-sm font-bold hover:bg-white/10 transition-all">
                   <div className="flex items-center gap-3">
                      <Globe className="w-4 h-4 text-white/40" />
                      English
                   </div>
                   <div className="w-2 h-2 rounded-full bg-green-500 shadow-glow animate-pulse" />
                </button>
             </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-medium text-white/20">
          <p>© 2026 KodLearn, Inc. All rights reserved.</p>
          <div className="flex items-center gap-8 uppercase tracking-[0.1em]">
            <Link href="#" className="hover:text-white transition-colors">Help Center</Link>
            <Link href="#" className="hover:text-white transition-colors">Accessibility</Link>
            <Link href="#" className="hover:text-white transition-colors">Trust & Safety</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
