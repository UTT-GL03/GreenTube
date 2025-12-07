import VideoCard from "../card/VideoCard"

function VideoGrid({ videos, loading }) {
    if (!loading && (!videos || videos.length === 0)) {
        return;
    }

    return (
        <div data-ecoid='video-grid'>
            {videos.map((row, rowIndex) => (
                <div key={rowIndex} className="row my-2">
                    {row.map((video) => (
                        <VideoCard key={video.id} video={video} />
                    ))}
                </div>
            ))}
        </div>
    )
}

export default VideoGrid