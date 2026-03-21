"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  PlayCircle, 
  Search, 
  ShoppingCart, 
  Globe, 
  Menu,
  ChevronRight,
  Heart,
  Bell,
  User
} from "lucide-react";
import { 
  MOCK_CATEGORIES 
} from "@/lib/mock-data";
import { useState, useEffect } from "react";
import * as LucideIcons from "lucide-react";
import { useRouter } from "next/navigation";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check for auth cookie
    const checkAuth = () => {
      const loggedIn = document.cookie.includes("kodlearn_auth=true");
      setIsLoggedIn(loggedIn);
    };
    checkAuth();
    // Also listen for storage events or just poll briefly for demo simplicity
    const interval = setInterval(checkAuth, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    document.cookie = "kodlearn_auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    setIsLoggedIn(false);
    router.push("/");
  };

  return (
    <motion.header
      className="sticky top-0 z-50 w-full glass-panel border-b border-white/10 shadow-sm"
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="mx-auto max-w-[1400px] px-4 md:px-6 h-16 flex items-center justify-between gap-4 lg:gap-8">
        
        {/* Mobile Menu & Logo */}
        <div className="flex items-center gap-4">
          <button 
            className="md:hidden text-foreground hover:text-primary transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
          
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <div className="h-9 w-9 rounded-[10px] bg-gradient-premium flex items-center justify-center shadow-glow group-hover:shadow-glow-strong transition-all duration-300">
              <PlayCircle className="h-5 w-5 text-white/90 group-hover:text-white transition-colors" fill="currentColor" />
            </div>
            <span className="font-bold text-xl tracking-tight hidden sm:block text-foreground group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-premium transition-all duration-300">
              KodLearn
            </span>
          </Link>
        </div>

        {/* Categories (Desktop with Dropdown) */}
        <nav className="hidden md:block shrink-0 group relative py-4">
          <button className="text-sm font-medium text-foreground hover:text-primary transition-colors hover:bg-white/5 px-3 py-2 rounded-md flex items-center gap-1">
            Categories
          </button>
          <div className="absolute top-full left-0 w-64 glass-panel border border-white/10 rounded-xl shadow-glass-elevated py-2 opacity-0 translate-y-2 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible transition-all duration-300 z-50">
            {MOCK_CATEGORIES.slice(0, 8).map((cat) => (
              <Link 
                key={cat.name} 
                href={`/courses?category=${cat.name}`}
                className="flex items-center justify-between px-4 py-2 text-sm text-foreground hover:bg-primary/20 hover:text-primary transition-colors group/item"
              >
                <div className="flex items-center gap-3">
                  {(() => {
                    const Icon = (LucideIcons as any)[cat.icon] || LucideIcons.HelpCircle;
                    return <Icon className="w-4 h-4" />;
                  })()}
                  {cat.name}
                </div>
                <ChevronRight className="w-4 h-4 opacity-0 group-hover/item:opacity-100 transition-opacity" />
              </Link>
            ))}
          </div>
        </nav>

        {/* Global Search Bar (Premium Glass) */}
        <div className="hidden sm:flex flex-1 max-w-2xl relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
            <Search className="h-4 w-4" />
          </div>
          <Input 
            type="text"
            placeholder="Search for courses, technologies, authors..." 
            className="w-full pl-11 h-11 rounded-full bg-white/5 border border-white/10 focus-visible:ring-primary/50 text-sm focus-visible:bg-white/10 focus-visible:border-primary/30 transition-all placeholder:text-muted-foreground/60 shadow-inner"
          />
        </div>

        {/* Right Section Links & Icons */}
        <div className="hidden xl:flex items-center gap-1 shrink-0 text-sm font-medium">
          <Link href="/business" className="px-3 py-2 text-foreground hover:text-primary transition-colors hover:bg-white/5 rounded-md">
            Business
          </Link>
          <Link href="/teach" className="px-3 py-2 text-foreground hover:text-primary transition-colors hover:bg-white/5 rounded-md">
            Teach
          </Link>
        </div>

        {/* Icons & Auth */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          <button className="hidden sm:flex h-10 w-10 items-center justify-center rounded-full hover:bg-white/10 transition-colors text-foreground hover:text-primary relative group">
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-4 w-4 bg-primary text-[10px] font-bold text-white rounded-full flex items-center justify-center scale-0 group-hover:scale-100 transition-transform">0</span>
          </button>
          
          <button className="hidden lg:flex h-10 w-10 items-center justify-center rounded-full hover:bg-white/10 transition-colors text-foreground hover:text-primary">
            <Heart className="h-5 w-5" />
          </button>

          <button className="hidden lg:flex h-10 w-10 items-center justify-center rounded-full hover:bg-white/10 transition-colors text-foreground hover:text-primary">
            <Bell className="h-5 w-5" />
          </button>
                    <div className="flex items-center gap-2 pl-2 border-l border-white/10 ml-2">
            {!isLoggedIn ? (
              <>
                <Link href="/auth?mode=signin">
                  <Button variant="ghost" className="hidden sm:flex hover:bg-white/5 font-bold h-10 px-4 rounded-md">
                    Log in
                  </Button>
                </Link>
                <Link href="/auth?mode=signup">
                  <Button className="hidden sm:flex bg-white text-black hover:bg-white/90 font-bold h-10 px-5 rounded-md shadow-glow-primary transition-all active:scale-95">
                    Sign up
                  </Button>
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Link href="/dashboard">
                  <Button variant="ghost" className="hidden sm:flex hover:bg-white/5 font-bold h-10 px-4 rounded-md">
                    My Learning
                  </Button>
                </Link>
                <button 
                  onClick={handleLogout}
                  className="hidden sm:flex h-10 px-4 items-center justify-center rounded-md hover:bg-red-500/10 text-red-400 font-bold transition-colors text-xs uppercase tracking-widest"
                >
                  Log out
                </button>
                {/* User Avatar */}
                <button className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-premium p-[1px] group transition-all duration-300">
                  <div className="h-full w-full rounded-full bg-background flex items-center justify-center group-hover:bg-transparent transition-colors">
                    <User className="h-5 w-5 text-foreground group-hover:text-white" />
                  </div>
                </button>
              </div>
            )}
            
            {/* Mobile Search Icon */}
            <button className="sm:hidden h-10 w-10 items-center justify-center rounded-full hover:bg-white/10 transition-colors text-foreground">
              <Search className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown (Animated) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden border-t border-white/10 bg-background/95 backdrop-blur-xl"
          >
            <div className="p-4 flex flex-col gap-4">
              <Link href="/auth?mode=login" onClick={() => setIsMobileMenuOpen(false)} className="text-primary font-bold">Log in</Link>
              <Link href="/auth?mode=signup" onClick={() => setIsMobileMenuOpen(false)} className="text-primary font-bold">Sign up</Link>
              <hr className="border-white/10" />
              <Link href="/categories" onClick={() => setIsMobileMenuOpen(false)} className="text-foreground">Categories</Link>
              <Link href="/business" onClick={() => setIsMobileMenuOpen(false)} className="text-foreground">KodLearn Business</Link>
              <Link href="/teach" onClick={() => setIsMobileMenuOpen(false)} className="text-foreground">Teach on KodLearn</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
