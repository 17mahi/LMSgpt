import { MOCK_COURSES } from "@/lib/mock-data";
import { Lock, CreditCard, ChevronRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Image from "next/image";

export default function CheckoutPage() {
  const cartItems = [MOCK_COURSES[0], MOCK_COURSES[1]];
  const total = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="mx-auto max-w-[1400px] px-4 md:px-6 py-12 space-y-12 min-h-screen">
      <div className="flex items-center gap-3 text-sm font-bold text-white/30 uppercase tracking-widest">
        <Link href="/cart" className="hover:text-primary transition-colors text-white/60">Cart</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-primary">Checkout</span>
        <ChevronRight className="w-4 h-4" />
        <span>Success</span>
      </div>

      <div className="grid lg:grid-cols-12 gap-12">
        {/* Payment Methods */}
        <div className="lg:col-span-8 space-y-10">
          <div className="space-y-6">
            <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
               <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm">1</div>
               Billing Address
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
               <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-black text-white/40 ml-1">Country</label>
                  <select className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-4 text-sm font-bold focus:outline-none focus:border-primary/50 transition-all text-white appearance-none">
                     <option>United States</option>
                     <option>India</option>
                     <option>United Kingdom</option>
                  </select>
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-black text-white/40 ml-1">State / Province</label>
                  <Input placeholder="E.g. California" className="h-12 bg-white/5 border-white/10 rounded-xl px-4 text-sm font-bold focus:border-primary/50 transition-all" />
               </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
               <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm">2</div>
               Payment Method
            </h2>
            <div className="space-y-4">
               <div className="glass-card p-6 border-primary/50 bg-primary/5 rounded-2xl flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center gap-4">
                     <div className="w-6 h-6 rounded-full border-2 border-primary flex items-center justify-center">
                        <div className="w-3 h-3 bg-primary rounded-full"></div>
                     </div>
                     <div className="flex items-center gap-3">
                        <CreditCard className="w-6 h-6 text-primary" />
                        <span className="font-bold">Credit/Debit Card</span>
                     </div>
                  </div>
                  <div className="flex gap-2">
                     <div className="h-6 w-10 bg-white/10 rounded"></div>
                     <div className="h-6 w-10 bg-white/10 rounded"></div>
                  </div>
               </div>

               <div className="glass-panel p-8 space-y-6 rounded-2xl border-white/5">
                  <div className="grid gap-6">
                     <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest font-black text-white/40 ml-1">Card Name</label>
                        <Input placeholder="Name on card" className="h-12 bg-white/5 border-white/10 rounded-xl px-4 text-sm font-bold" />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest font-black text-white/40 ml-1">Card Number</label>
                        <div className="relative">
                           <Input placeholder="0000 0000 0000 0000" className="h-12 bg-white/5 border-white/10 rounded-xl px-4 pl-12 text-sm font-bold" />
                           <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
                        </div>
                     </div>
                     <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                           <label className="text-[10px] uppercase tracking-widest font-black text-white/40 ml-1">Expiry Date</label>
                           <Input placeholder="MM / YY" className="h-12 bg-white/5 border-white/10 rounded-xl px-4 text-sm font-bold" />
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] uppercase tracking-widest font-black text-white/40 ml-1">CVC / CVV</label>
                           <div className="relative">
                              <Input placeholder="123" type="password" className="h-12 bg-white/5 border-white/10 rounded-xl px-4 pl-12 text-sm font-bold" />
                              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="flex items-center gap-3">
                     <input type="checkbox" id="save-card" className="w-4 h-4 rounded border-white/10 bg-white/5 text-primary" />
                     <label htmlFor="save-card" className="text-xs font-medium text-white/50">Securely save this card for my next purchase</label>
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-4">
          <div className="glass-card p-8 space-y-8 sticky top-24 border-white/10 shadow-glass-elevated">
            <h2 className="text-xl font-black tracking-tight">Summary</h2>
            
            <div className="space-y-6">
                {cartItems.map(item => (
                   <div key={item.id} className="flex gap-4 items-start">
                      <div className="relative w-16 aspect-video shrink-0 overflow-hidden rounded border border-white/10">
                         <Image 
                           src={item.thumbnail || ""} 
                           alt={item.title} 
                           fill 
                           className="object-cover"
                         />
                      </div>
                      <div className="flex-1 space-y-1">
                         <p className="text-xs font-bold leading-tight line-clamp-2">{item.title}</p>
                         <p className="text-[10px] font-black tracking-widest text-primary uppercase">${item.price}</p>
                      </div>
                   </div>
                ))}
            </div>

            <div className="border-t border-white/10 pt-6 space-y-3">
               <div className="flex justify-between items-center text-sm font-medium text-white/50">
                  <span>Original Price:</span>
                  <span className="line-through">$189.98</span>
               </div>
               <div className="flex justify-between items-center text-sm font-medium text-white/50">
                  <span>Discounts:</span>
                  <span className="text-primary">- $145.00</span>
               </div>
               <div className="flex justify-between items-center text-xl font-black tracking-tight pt-2">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
               </div>
            </div>

            <p className="text-[10px] text-white/40 leading-relaxed text-center">
               By completing your purchase, you agree to these <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link>.
            </p>

            <Link href="/checkout/success">
               <Button className="w-full h-14 bg-white text-black hover:bg-white/90 font-black text-lg rounded-none shadow-glow">
                  Complete Payment
               </Button>
            </Link>

            <div className="flex items-center justify-center gap-3 text-xs font-medium text-white/40">
               <Lock className="w-3 h-3" />
               <span>Encrypted & Secure Payment</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
