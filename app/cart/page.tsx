import { MOCK_COURSES } from "@/lib/mock-data";
import { Trash2, ShoppingBag, ArrowRight, ShieldCheck, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CartPage() {
  const cartItems = [MOCK_COURSES[0], MOCK_COURSES[1]];
  const total = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="mx-auto max-w-[1400px] px-4 md:px-6 py-12 space-y-10 min-h-screen">
      <div className="space-y-2">
        <h1 className="text-3xl md:text-5xl font-black tracking-tight">Shopping Cart</h1>
        <p className="text-white/50 font-medium">{cartItems.length} Courses in Cart</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {cartItems.map((item) => (
            <div key={item.id} className="glass-card p-6 flex flex-col sm:flex-row gap-6 border-white/5 group hover:border-primary/30 transition-all duration-500">
               <div className="w-full sm:w-48 aspect-video overflow-hidden rounded-lg shrink-0 border border-white/10">
                  <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
               </div>
               <div className="flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                     <h3 className="text-lg font-bold group-hover:text-primary transition-colors leading-tight">{item.title}</h3>
                     <p className="text-xs text-white/40 font-medium">By <span className="text-primary/70">{item.instructor}</span></p>
                     <div className="flex items-center gap-2 mt-2">
                        <span className="text-amber-400 font-bold text-sm">4.8</span>
                        <div className="flex text-amber-400">★ ★ ★ ★ ★</div>
                        <span className="text-[10px] text-white/30">(45k ratings)</span>
                     </div>
                  </div>
                  <div className="flex items-center gap-4 mt-6">
                     <button className="text-[11px] font-black uppercase tracking-widest text-primary/60 hover:text-primary transition-colors">Remove</button>
                     <button className="text-[11px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-colors">Save for later</button>
                     <button className="text-[11px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-colors">Move to Wishlist</button>
                  </div>
               </div>
               <div className="text-right flex flex-col justify-between">
                  <span className="text-xl font-black text-primary tracking-tight">${item.price}</span>
                  <s className="text-xs text-white/30 font-medium">$94.99</s>
               </div>
            </div>
          ))}

          {cartItems.length === 0 && (
            <div className="glass-card p-20 flex flex-col items-center justify-center gap-6 border-dashed border-white/10">
               <div className="p-6 rounded-full bg-white/5"><ShoppingBag className="w-12 h-12 text-white/20" /></div>
               <div className="text-center space-y-2">
                  <p className="text-lg font-bold text-white/70">Your cart is empty.</p>
                  <p className="text-sm text-white/40">Keep shopping to find a course!</p>
               </div>
               <Link href="/courses">
                  <Button className="bg-primary text-white font-black px-10 h-12">Keep Shopping</Button>
               </Link>
            </div>
          )}
        </div>

        {/* Sidebar Summary */}
        <div className="lg:col-span-1">
          <div className="glass-card p-8 space-y-8 sticky top-24 border-white/10 shadow-glass-elevated">
            <div className="space-y-4">
               <p className="text-sm font-black text-white/40 uppercase tracking-[0.2em]">Total Amount</p>
               <div className="space-y-1">
                  <p className="text-4xl font-black tracking-tighter text-white">${total.toFixed(2)}</p>
                  <p className="text-sm text-white/40 line-through">$189.98</p>
                  <p className="text-sm text-primary font-black">84% Off</p>
               </div>
            </div>

            <Link href="/checkout">
               <Button className="w-full h-14 bg-white text-black hover:bg-white/90 font-black text-lg rounded-none shadow-glow flex gap-3 group">
                  Checkout
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
               </Button>
            </Link>

            <div className="relative">
               <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
               <div className="relative flex justify-center text-[10px] uppercase tracking-widest font-black"><span className="bg-[#0a0a0b] px-4 text-white/30">Promotions</span></div>
            </div>

            <div className="flex gap-2">
               <div className="flex-1 relative">
                  <input type="text" placeholder="Enter Coupon" className="w-full h-11 bg-white/5 border border-white/10 rounded-none px-4 text-sm font-medium focus:outline-none focus:border-primary/50 transition-all placeholder:text-white/20" />
               </div>
               <Button variant="outline" className="h-11 border-white/20 hover:bg-white/5 rounded-none font-bold">Apply</Button>
            </div>

            <div className="pt-4 space-y-4">
               <div className="flex items-center gap-3 text-xs font-medium text-white/50">
                  <ShieldCheck className="w-4 h-4 text-primary" />
                  <span>30-Day Money-Back Guarantee</span>
               </div>
               <div className="flex items-center gap-3 text-xs font-medium text-white/50">
                  <CreditCard className="w-4 h-4 text-primary" />
                  <span>Secure Payment Gateway</span>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
