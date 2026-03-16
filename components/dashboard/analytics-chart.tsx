"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

type Props = {
  enrollments: { course_id: string; courses: { title: string } | null }[];
  progressRows: { course_id: string; status: "completed" | "in_progress" }[];
};

export function AnalyticsChart({ enrollments, progressRows }: Props) {
  const byCourse = enrollments.map((e) => {
    const rows = progressRows.filter((p) => p.course_id === e.course_id);
    const completed = rows.filter((r) => r.status === "completed").length;
    const total = rows.length || 1;
    const pct = Math.round((completed / total) * 100);
    return {
      name: e.courses?.title ?? "Course",
      progress: pct
    };
  });

  if (!byCourse.length) {
    return (
      <div className="glass-card p-5 text-sm text-white/70">
        Enroll in a course to see progress analytics here.
      </div>
    );
  }

  return (
    <div className="glass-card p-5 space-y-3">
      <p className="text-xs uppercase tracking-[0.18em] text-white/60">
        Progress overview
      </p>
      <div className="h-60">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={byCourse}>
            <XAxis
              dataKey="name"
              tick={{ fill: "rgba(255,255,255,0.7)", fontSize: 11 }}
            />
            <YAxis
              tick={{ fill: "rgba(255,255,255,0.7)", fontSize: 11 }}
              tickFormatter={(v) => `${v}%`}
            />
            <Tooltip
              contentStyle={{
                background: "rgba(15,23,42,0.95)",
                borderRadius: 16,
                border: "1px solid rgba(148,163,184,0.4)",
                color: "white"
              }}
            />
            <Bar dataKey="progress" fill="#6366f1" radius={6} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

