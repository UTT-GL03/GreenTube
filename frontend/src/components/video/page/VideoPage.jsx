import { useParams } from 'react-router-dom'
import data from '/data/sample_data.json'
import VideoPlayer from '../player/VideoPlayer'
import VideoMiniature from '../minia/VideoMiniature'
import Comment from '../../comment/Comment'
import './VideoPage.css'
import { useState } from 'react'

function VideoPage() {
  const { id } = useParams()
  const video = data.videos.find((v) => String(v.id_video) === id)
  const [comments, setComments] = useState([])
  const [input, setInput] = useState('')

  if (!video) return <main className="center"><p>Vidéo introuvable.</p></main>

  const related = data.videos.filter((v) => v.id_video !== video.id).slice(0, 3)

  const addComment = () => {
    if (!input.trim()) return
    setComments([{ id: Date.now(), text: input }, ...comments])
    setInput('')
  }

  return (
    <main className="">

      <div className="spacer-4" />

      <div className="video-page">

        <div>
          <VideoPlayer src={"/videoTest.mp4"} title={video.title} />

          <div className="video-info">
            <h1>{video.title}</h1>
            <p className="video-meta">{video.author} • {video.date}</p>
            <p>{video.description}</p>
          </div>

          <div className="spacer-2" />

          <div className="video-comments">
            <h2>Commentaires</h2>
            {/* Désactiver l'input si pas connecté */}
            <div className="comment-input">
              <input
                className="input-text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addComment()}
                placeholder="Ajouter un commentaire..."
              />

              <button className="btn" onClick={addComment}>Publier</button>
            </div>
            <div className="spacer-1" />
            <div className="overflow-y-sm">
              <ul>
                {comments.map(c => <Comment
                  key={c.id}
                  username="Utilisateur"
                  content={c.text}
                  date={new Date().toLocaleString()}
                />)}
              </ul>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-center">Vidéos recommandées</h3>
          <div>
            {related.map(v =>
              <div>
                <VideoMiniature key={v.id_video} video={v} />
                <div className="spacer-2" />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

export default VideoPage
