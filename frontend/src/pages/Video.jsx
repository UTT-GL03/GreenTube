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
  const [error, setError] = useState("")

  useEffect(() => {
    loadAll()
  }, [id])

  // FUNCTIONs
  const loadAll = async () => {
    setLoading(true);
    setError("");

    setVideo(null);
    setComments([]);
    setRelated([]);

    try {
      const res = await backApi.getVideo(id);

      if (!res.success) {
        setError(res.message);
        return;
      }

      setVideo(res.data.video);
      setComments(res.data.comments);
      setRelated(res.data.related);

    }
    catch (err) {
      console.error(err.message);
    }
    finally {
      setLoading(false);
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
        <div className="flex flex-col card-md mt-4">
          <h2>Oups !</h2>
          <p className="mt-1">Impossible de charger la vidéo demandée.</p>
          {error && <p className="mt-1 text-red">{error}</p>}
        </div>
      </main>
    );
  }

  return (
    <main>
      <div className="flex flex-wrap center mt-2 mb-4 gap-4">
        <div>
          <VideoPlayerCard video={video} />
          <CommentsSection comments={comments} id_video={video._id} />
        </div>
        <Recommendations related={related} />
      </div>
    </main>
  )
}

export default Video
