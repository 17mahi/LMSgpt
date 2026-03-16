"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, Play, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type CourseCardProps = {
  course: {
    id: string;
    title: string;
    description: string;
    thumbnail?: string | null;
    category?: string | null;
  };
};

export function CourseCard({ course }: CourseCardProps) {
  return (
    <motion.div
      className="glass-card flex flex-col overflow-hidden group"
      whileHover={{ y: -4 }}
    >
      <div className="relative h-40 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-glass opacity-40 group-hover:opacity-60 transition" />
        {course.thumbnail ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={course.thumbnail}
            alt={course.title}
            className="h-full w-full object-cover scale-105 group-hover:scale-110 transition-transform"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-indigo-500 via-sky-400 to-emerald-400" />
        )}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="rounded-full bg-black/40 px-3 py-1 text-xs text-white flex items-center gap-2">
            <Play className="h-3 w-3" />
            Streamed from YouTube
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-3 p-4">
        <div className="flex items-center justify-between gap-2">
          <Badge
            variant="outline"
            className="border-indigo-400/60 text-[0.65rem] uppercase tracking-[0.17em] text-indigo-200"
          >
            {course.category || "General"}
          </Badge>
          <span className="flex items-center gap-1 text-[0.7rem] text-white/60">
            <Clock className="h-3 w-3" /> Self-paced
          </span>
        </div>
        <h3 className="line-clamp-1 text-sm font-semibold">{course.title}</h3>
        <p className="line-clamp-2 text-xs text-white/60">
          {course.description}
        </p>
      </div>
      <div className="flex items-center justify-between border-t border-white/10 px-4 py-3 text-xs">
        <div className="flex items-center gap-1.5 text-white/65">
          <BookOpen className="h-3.5 w-3.5" />
          Structured by sections & lessons
        </div>
        <Link
          href={`/courses/${course.id}`}
          className="text-indigo-200 hover:text-indigo-100 font-medium"
        >
          View
        </Link>
      </div>
    </motion.div>
  );
}

