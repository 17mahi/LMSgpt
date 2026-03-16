"use client";

type LessonPlayerProps = {
  youtubeUrl: string;
};

function extractYoutubeId(url: string) {
  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    const match =
      url.match(/(?:v=|youtu\.be\/|embed\/)([^&?/]+)/) ?? [];
    return match[1] || url;
  }
  return url;
}

export function LessonPlayer({ youtubeUrl }: LessonPlayerProps) {
  const videoId = extractYoutubeId(youtubeUrl);
  const src = `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`;

  return (
    <div className="aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-black">
      <iframe
        src={src}
        title="Lesson video"
        className="h-full w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

