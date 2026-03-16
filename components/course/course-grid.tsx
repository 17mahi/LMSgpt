import { CourseCard } from "./course-card";

type CourseGridProps = {
  courses: {
    id: string;
    title: string;
    description: string;
    thumbnail?: string | null;
    category?: string | null;
  }[];
};

export function CourseGrid({ courses }: CourseGridProps) {
  if (!courses?.length) {
    return (
      <div className="glass-card p-6 text-sm text-white/70">
        No courses yet. Ask an instructor to create one.
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
}

