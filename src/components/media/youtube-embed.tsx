interface YoutubeEmbedProps {
  videoId: string;
  title: string;
}

export function YoutubeEmbed({ videoId, title }: YoutubeEmbedProps) {
  return (
    <div className="mt-6 aspect-video overflow-hidden rounded-xl border border-border">
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${videoId}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="h-full w-full"
      />
    </div>
  );
}
