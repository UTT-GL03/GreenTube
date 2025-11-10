import SortButtons from "./SortButtons"
import VideoMiniature from "./video/minia/VideoMiniature"
import { useState } from "react"

function VideoGrid({ videos, visibleCount, setVisibleCount, totalVideos }) {

    const [sortKey, setSortKey] = useState("title")

    let sortedVideos = [...videos]

    switch (sortKey) {
        case "title":
            sortedVideos.sort((a, b) => a.title.localeCompare(b.title))
            break
        case "date":
            sortedVideos.sort((a, b) => new Date(b.date) - new Date(a.date))
            break
    }

    const visibleVideos = sortedVideos.slice(0, visibleCount)

    const videosByRow = Object.values(
        Object.groupBy(visibleVideos, (_, i) => Math.floor(i / 3))
    )

    return (
        <div>
            {totalVideos !== 0 && (
                <SortButtons sortKey={sortKey} setSortKey={setSortKey} />
            )}


            <div className="grid my-3">
                {totalVideos === 0 && (
                    <h4>Aucune vidéo disponible</h4>
                )}
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