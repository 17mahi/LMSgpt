"use client";

import { CheckCircle2, Circle, PlayCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type Lesson = {
  id: string;
  title: string;
  status?: "completed" | "in_progress" | null;
};

type SectionWithLessons = {
  id: string;
  title: string;
  lessons: Lesson[];
};

type Props = {
  sections: SectionWithLessons[];
  activeLessonId: string;
};

export function CourseSidebar({ sections, activeLessonId }: Props) {
  return (
    <aside className="glass-card h-full overflow-hidden flex flex-col">
      <div className="border-b border-white/10 px-4 py-3 text-xs uppercase tracking-[0.18em] text-white/60">
        Lesson list
      </div>
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3 text-xs">
        {sections.map((section) => (
          <div key={section.id} className="space-y-1.5">
            <p className="px-1 text-[0.68rem] font-medium text-white/55">
              {section.title}
            </p>
            <ul className="space-y-1.5">
              {section.lessons.map((lesson) => {
                const isActive = lesson.id === activeLessonId;
                const status = lesson.status;
                return (
                  <li key={lesson.id}>
                    <a
                      href={`?lessonId=${lesson.id}`}
                      className={cn(
                        "flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-left transition",
                        isActive
                          ? "bg-indigo-500/25 text-white shadow-glow border border-indigo-400/40"
                          : "text-white/70 hover:bg-white/5"
                      )}
                    >
                      <span className="flex items-center gap-2">
                        {status === "completed" ? (
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                        ) : isActive ? (
                          <PlayCircle className="h-3.5 w-3.5 text-indigo-300" />
                        ) : (
                          <Circle className="h-3 w-3 text-white/35" />
                        )}
                        <span className="line-clamp-1">{lesson.title}</span>
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  );
}

