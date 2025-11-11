import VideoMiniature from "../minia/VideoMiniature"

function VideoGrid({ videos }) {

    return (
        <div>
            <div className="grid my-3">
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
        </div>
    )
}

export default VideoGrid