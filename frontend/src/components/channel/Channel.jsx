import { useState } from 'react'
import { useParams } from 'react-router'
import data from '/data/sample_data.json'
import VideoMiniature from '../video/minia/VideoMiniature'
import "./Channel.css"
import SortButtons from '../SortButtons'
import Avatar from '../Avatar'
import VideoGrid from '../VideoGrid'

function Channel() {
    const { channelId } = useParams()
    const [visibleCount, setVisibleCount] = useState(6)

    const channelVideos = data.videos.filter(v => v.id_user === channelId)

    const channelUser = data.users.find(u => u.id_user === channelId)



    // Tri

    const visibleVideos = channelVideos.slice(0, visibleCount)
    const videosByRow = Object.values(Object.groupBy(visibleVideos, (_, i) => Math.floor(i / 3)))

    return (
        <main className="center">
            <div>

                <div className="channel-header px-4 py-4 my-3">

                    <Avatar user={channelUser} size={"xl"} />

                    <div className="channel-info">
                        <h1>{channelUser === null ? "Chaîne introuvable" : channelUser.pseudo}</h1>
                        <span>{channelUser?.desc}</span>
                        <p>{channelVideos.length} vidéos</p>
                    </div>

                </div>

                <VideoGrid
                    videosByRow={videosByRow}
                    visibleCount={visibleCount}
                    setVisibleCount={setVisibleCount}
                    totalVideos={channelVideos.length}
                />
            </div>
        </main>
    )
}

export default Channel
