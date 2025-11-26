import { useMemo } from 'react'
import { useParams } from 'react-router-dom'

import { useData } from '../context/DataContext'

import CommentsSection from '../components/comment/section/CommentsSection'
import Recommendations from '../components/video/recommendations/Recommendations'
import VideoPlayerCard from '../components/video/player/card/VideoPlayerCard'

function Video() {
  const { videos, users } = useData()

  const { id } = useParams()
  
  const currentVideo = useMemo(() => videos.find(v => String(v._id) === id), [videos, id])
  const currentUser = useMemo(() => users.find(u => u._id === currentVideo.id_user), [users, currentVideo])

  if (!currentVideo) return <main className="center"><p>Vidéo introuvable.</p></main>

  return (
    <main>
      <div className="flex flex-wrap center mt-2 mb-4 gap-4">
        <div>
          <VideoPlayerCard video={currentVideo} user={currentUser} />

          <CommentsSection
            currentVideo={currentVideo}
          />
        </div>
        <Recommendations currentVideo={currentVideo} />
      </div>
    </main>
  )
}

export default Video
