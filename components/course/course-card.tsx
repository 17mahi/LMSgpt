"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Star, PlayCircle, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type CourseCardProps = {
  course: {
    id: string;
    title: string;
    description: string;
    thumbnail?: string | null;
    category?: string | null;
    instructor?: string; // We'll mock this if not present
    price?: number;      // We'll mock this if not present
    rating?: number;
    reviewCount?: number;
  };
};

export function CourseCard({ course }: CourseCardProps) {
  // Mock data for Udemy feel
  const instructor = course.instructor || "KodLearn Instructor";
  const rating = course.rating || 4.7;
  
  // Fix hydration mismatch by using a stable count or reviewCount from props
  const reviewCount = course.reviewCount || 
                     (course.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % 5000) + 120;
  const price = course.price || 19.99;
  const isBestseller = rating >= 4.7;

  return (
    <Link href={`/courses/${course.id}`}>
      <motion.div
        className="glass-card glass-card-hover flex flex-col h-full group cursor-pointer"
        whileHover={{ y: -8 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="relative aspect-video w-full overflow-hidden shrink-0 border-b border-white/5">
          <div className="absolute inset-0 bg-gradient-glass opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
          {course.thumbnail ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={course.thumbnail}
              alt={course.title}
              className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="h-full w-full bg-gradient-premium opacity-80 group-hover:scale-105 transition-transform duration-500" />
          )}
          
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 z-20">
            <div className="rounded-full bg-black/60 backdrop-blur-md p-4 shadow-glass-elevated scale-75 group-hover:scale-100 transition-transform">
               <PlayCircle className="h-10 w-10 text-white fill-white/20" />
            </div>
          </div>
        </div>

        <div className="flex flex-col flex-1 p-4 space-y-2">
          <h3 className="line-clamp-2 text-base font-bold text-foreground leading-tight group-hover:text-primary-foreground transition-colors">
            {course.title}
          </h3>
          
          <p className="text-xs text-muted-foreground line-clamp-1">
            {instructor}
          </p>
          
          <div className="flex items-center gap-1.5 mt-1">
            <span className="text-sm font-bold text-amber-400">{rating.toFixed(1)}</span>
            <div className="flex items-center text-amber-400">
              {[1, 2, 3, 4, 5].map((star) => (
                 <Star 
                   key={star} 
                   className={`h-3 w-3 ${star <= Math.round(rating) ? "fill-amber-400" : "fill-transparent border-amber-400 text-amber-400"}`} 
                 />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">({reviewCount.toLocaleString()})</span>
          </div>
          
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
            <span className="text-xl font-black text-foreground tracking-tight">
              ${price.toFixed(2)}
            </span>
            <button className="h-8 w-8 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-all">
               <Heart className="h-4 w-4" />
            </button>
          </div>

          {(isBestseller || course.category) && (
            <div className="flex items-center gap-2 mt-2">
              {isBestseller && (
                <Badge className="bg-[#eceb98] text-[#3d3c0a] hover:bg-[#eceb98] border-none font-bold rounded-sm px-2 text-[10px] uppercase">
                  Bestseller
                </Badge>
              )}
              {course.category && !isBestseller && (
                 <Badge variant="outline" className="text-[10px] uppercase text-muted-foreground border-white/10">
                   {course.category}
                 </Badge>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </Link>
  );
}
