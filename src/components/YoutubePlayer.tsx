interface YoutubePlayerProps {
    videoId: string;
    Title: string;
}

export function YoutubePlayer({
    videoId,
    title,
}: YoutubePlayerProps){
    return (
        <div className="aspect-video w-full overflow-hidden rounded-lg">
            <iframe
                className="h-full w-full"
                src={`https://www.youtube.com/embed/${videoId}`}
                title={title}
                allow="autoplay; picture-in-picture"
                
                allowFullScreen
            />
        </div>
    )
}