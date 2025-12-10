import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { backApi } from '../api/backApi'

import CommentsSection from '../components/comment/section/CommentsSection'
import Recommendations from '../components/video/recommendations/Recommendations'
import VideoPlayerCard from '../components/video/player/card/VideoPlayerCard'

function Video() {
  // HOOKs
  const { id } = useParams()

  const [video, setVideo] = useState(null)
  const [comments, setComments] = useState([])
  const [related, setRelated] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadAll()
  }, [id])

  // FUNCTIONs
  const loadAll = async () => {
    setLoading(true)

    setVideo(null) 
    setComments([])
    setRelated([])

    try {
      const data = await backApi.getVideo(id)
      setVideo(data.video)
      setComments(data.comments)
      setRelated(data.related)
    } catch (err) {
      console.error("Erreur chargement vidéo :", err)
    } finally {
      setLoading(false)
    }
  }

  //
  if (loading) {
    return (
      <main className="center">
        <p>Chargement... à améliorer visuellement</p>
      </main>
    )
  }

  if (!video && !loading) {
    return (
      <main className="center">
        <p className="mt-4">Problème de récupération de la vidéo.</p>
      </main>
    )
  }

  return (
    <main>
      <div className="flex flex-wrap center mt-2 mb-4 gap-4">
        <div>
          <VideoPlayerCard video={video}/>
          <CommentsSection comments={comments} id_video={video._id} />
        </div>
        <Recommendations related={related} />
      </div>
    </main>
  )
}

export default Video
