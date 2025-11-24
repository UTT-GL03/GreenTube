import VideoMiniature from "../card/VideoMiniature"

function VideoGrid({ videos }) {

    return (
            <div data-ecoid='video-grid'>
                {videos?.length === 0 && (
                    <h4>Aucune vidéo disponible</h4>
                )}
                {videos.map((row, rowIndex) => (
                    <div key={rowIndex} className="row my-2">
                        {row.map((video) => (
                            <VideoMiniature key={video.id} video={video} />
                        ))}
                    </div>
                ))}
            </div>
    )
}

export default VideoGrid