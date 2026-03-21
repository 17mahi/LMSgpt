import Link from "next/link";
import { CheckCircle2, ChevronRight, PlayCircle, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SuccessPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-4 md:px-6 py-24 flex flex-col items-center justify-center space-y-10 min-h-[80vh] text-center">
      <div className="relative">
         <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-150 animate-pulse"></div>
         <CheckCircle2 className="w-24 h-24 text-primary relative z-10" />
      </div>

      <div className="space-y-4 max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
          Payment <span className="text-gradient">Successful!</span>
        </h1>
        <p className="text-lg md:text-xl text-white/70 font-medium">
          Thank you for your purchase! Your enrollment is complete, and you can now start learning immediately. 
          A confirmation email has been sent to your inbox.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
        <Link href="/dashboard" className="flex-1">
          <Button className="w-full h-14 bg-white text-black hover:bg-white/90 font-black text-lg rounded-none shadow-glow flex gap-2">
            <LayoutDashboard className="w-5 h-5" />
            Go to Dashboard
          </Button>
        </Link>
        <Link href="/courses/python-masterclass/learn" className="flex-1">
          <Button variant="outline" className="w-full h-14 border-white/20 bg-transparent hover:bg-white/10 font-bold rounded-none flex gap-2">
            <PlayCircle className="w-5 h-5" />
            Start Learning
          </Button>
        </Link>
      </div>

      <div className="pt-12 flex items-center gap-8 opacity-40 grayscale pointer-events-none">
         <span className="text-xl font-black tracking-widest uppercase">Volkswagen</span>
         <span className="text-xl font-bold tracking-widest uppercase">Samsung</span>
         <span className="text-xl font-serif font-black italic">Cisco</span>
      </div>
    </div>
  );
}
