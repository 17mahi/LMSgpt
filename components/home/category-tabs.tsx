"use client";

import { useState, useEffect } from "react";
import { CourseGrid } from "@/components/course/course-grid";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

type CategoryTabsProps = {
  categories: string[];
  allCourses: any[];
};

export function CategoryTabs({ categories, allCourses }: CategoryTabsProps) {
  const [activeTab, setActiveTab] = useState(categories[0]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredCourses = allCourses.filter(
    (course) => course.category?.toLowerCase() === activeTab.toLowerCase()
  );

  const categoryDescriptions: Record<string, { title: string; desc: string }> = {
    "Python": {
      title: "Master Python from Scratch",
      desc: "Python is one of the most popular programming languages in the world. It's used in data science, web development, automation, and more."
    },
    "Web Development": {
      title: "Build modern web apps with Web Development",
      desc: "The world of web development is as wide as the internet itself. Much of our social and vocational lives play out on the internet, which prompts new industries aimed at creating, managing, and debugging the web applications."
    },
    "Excel": {
      title: "Become an Excel Power User",
      desc: "Excel is the gold standard for data analysis in the business world. Learn how to use formulas, pivot tables, and macros to save time and gain insights."
    },
    "JavaScript": {
      title: "The Heart of Modern Web Development",
      desc: "JavaScript is the language of the web. Learn how to build interactive websites and complex web applications with modern JS frameworks."
    },
    "Data Science": {
      title: "Unlock Insights with Data Science",
      desc: "Data science is about using data to solve problems and make decisions. Learn how to analyze data, build models, and communicate your findings."
    },
    "AWS Certification": {
      title: "Scale Your Career with AWS",
      desc: "Amazon Web Services is the leading cloud platform in the world. Learn how to design, deploy, and manage applications in the cloud."
    }
  };

  const currentInfo = categoryDescriptions[activeTab] || {
    title: `Explore ${activeTab}`,
    desc: `Discover top-rated courses in ${activeTab} to help you reach your professional goals.`
  };

   if (!mounted) {
    return (
      <div className="space-y-8 w-full animate-pulse">
        <div className="h-12 bg-white/5 rounded-full w-1/2"></div>
        <div className="h-64 bg-white/5 rounded-3xl w-full"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 w-full" suppressHydrationWarning>
      {/* Tabs */}
      <div className="flex overflow-x-auto pb-4 gap-2 scrollbar-none snap-x border-b border-white/5">
        {categories.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`snap-start whitespace-nowrap px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 relative ${
              activeTab === tab
                ? "text-background"
                : "text-white/60 hover:text-white hover:bg-white/5"
            }`}
          >
            {activeTab === tab && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-foreground rounded-full z-0"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10">{tab}</span>
          </button>
        ))}
      </div>

      {/* Content Area */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="glass-panel rounded-3xl p-6 md:p-10 border border-white/10 w-full relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-radial opacity-30 pointer-events-none" />
          <div className="relative z-10 space-y-8">
            <div className="max-w-2xl space-y-4">
              <h3 className="text-2xl md:text-3xl font-black tracking-tight">{currentInfo.title}</h3>
              <p className="text-white/70 text-base md:text-lg leading-relaxed font-medium">
                {currentInfo.desc}
              </p>
              <Link href={`/courses?category=${activeTab}`}>
                <button className="h-10 px-6 font-black text-sm bg-white text-black hover:bg-white/90 rounded-none transition-all shadow-glow flex items-center justify-center">
                  Explore {activeTab}
                </button>
              </Link>
            </div>

            <CourseGrid courses={filteredCourses} />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
