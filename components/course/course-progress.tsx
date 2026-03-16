import { Progress } from "@/components/ui/progress";

type Props = {
  completedLessons: number;
  totalLessons: number;
};

export function CourseProgress({ completedLessons, totalLessons }: Props) {
  const pct =
    totalLessons === 0 ? 0 : Math.round((completedLessons / totalLessons) * 100);

  return (
    <div className="glass-card p-4 space-y-2">
      <div className="flex items-center justify-between text-xs">
        <p className="uppercase tracking-[0.18em] text-white/60">Progress</p>
        <p className="text-white/80">
          {completedLessons}/{totalLessons} lessons
        </p>
      </div>
      <Progress value={pct} />
      <p className="text-xs text-white/60">{pct}% complete</p>
    </div>
  );
}

