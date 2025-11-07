import SortButtons from "./SortButtons"
import VideoMiniature from "./video/minia/VideoMiniature"

function VideoGrid({ videosByRow, visibleCount, setVisibleCount, totalVideos }) {

    return (
        <div>
            <SortButtons></SortButtons>

            <div className="grid my-3">
                {videosByRow.map((row, rowIndex) => (
                    <div key={rowIndex} className="row my-2">
                        {row.map((video) => (
                            <VideoMiniature key={video.id} video={video} />
                        ))}
                    </div>
                ))}
            </div>

            <div className='center'>
                {visibleCount < totalVideos && (
                    <button className="btn" onClick={() => setVisibleCount((p) => p + 6)}>
                        Voir plus
                    </button>
                )}
            </div>

            <div className="spacer-2" />
        </div>
    )
}

export default VideoGrid