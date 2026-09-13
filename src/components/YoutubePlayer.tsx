interface YoutubePlayerProps {
    videoId: string;
    title: string;
}

export function YoutubePlayer({
    videoId,
    title,
}: YoutubePlayerProps){
    return (
        <div className="relative w-full aspect-video overflow-hidden rounded-xl bg-black">
            <iframe
                className="absolute inset-0 w-full h-full border-0"
                src={`https://www.youtube.com/embed/${videoId}`}
                title={title}
                allow="autoplay; picture-in-picture"
                allowFullScreen
            />
        </div>
    )
}