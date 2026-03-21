"use client";

import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Area,
  CartesianGrid
} from "recharts";

type Props = {
  enrollments: { course_id: string; courses: { title: string } | null }[];
  progressRows: { course_id: string; status: string }[];
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-panel p-4 border border-white/20 rounded-2xl shadow-glass-elevated backdrop-blur-3xl">
        <p className="text-[10px] font-black text-white/40 mb-2 uppercase tracking-[0.2em]">{label}</p>
        <p className="text-sm font-black text-primary">
          {payload[0].value}% Complete
        </p>
      </div>
    );
  }
  return null;
};

export function AnalyticsChart({ enrollments, progressRows }: Props) {
  const chartData = enrollments.map((e) => {
    const rows = progressRows.filter((p) => p.course_id === e.course_id);
    const completed = rows.filter((r) => r.status === "completed").length;
    const total = rows.length || 1;
    const pct = Math.round((completed / total) * 100);
    return {
      name: e.courses?.title ?? "Course",
      value: pct
    };
  });

  if (!chartData.length) {
    return (
      <div className="glass-card p-10 text-center space-y-4 border-dashed border-white/10">
        <p className="text-white/40 font-medium italic">No learning activity found yet.</p>
        <p className="text-xs text-white/20 uppercase tracking-widest font-bold">Start a course to track your progress</p>
      </div>
    );
  }

  return (
    <div className="h-[400px] w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(262, 83%, 58%)" stopOpacity={0.4}/>
              <stop offset="95%" stopColor="hsl(262, 83%, 58%)" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
          <XAxis
            dataKey="name"
            stroke="rgba(255,255,255,0.1)"
            fontSize={10}
            tickLine={false}
            axisLine={false}
            tick={{ fill: 'rgba(255,255,255,0.4)', fontWeight: 800 }}
            dy={20}
            interval={0}
          />
          <YAxis
            stroke="rgba(255,255,255,0.1)"
            fontSize={10}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}%`}
            tick={{ fill: 'rgba(255,255,255,0.4)', fontWeight: 800 }}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(139, 92, 246, 0.2)', strokeWidth: 2 }} />
          <Area
            type="monotone"
            dataKey="value"
            stroke="hsl(262, 83%, 58%)"
            strokeWidth={4}
            fillOpacity={1}
            fill="url(#colorValue)"
            animationDuration={2500}
            animationEasing="ease-in-out"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

