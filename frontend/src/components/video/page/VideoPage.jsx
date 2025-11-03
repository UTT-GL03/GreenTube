import { useParams } from 'react-router-dom'
import data from '/data/sample_data.json'
import VideoPlayer from '../player/VideoPlayer'
import VideoMiniature from '../minia/VideoMiniature'
import './VideoPage.css'
import { useState } from 'react'

function VideoPage() {
  const { id } = useParams()
  const video = data.videos.find((v) => String(v.id_video) === id)
  const [likes, setLikes] = useState(0)
  const [comments, setComments] = useState([])
  const [input, setInput] = useState('')

  if (!video) return <main className="video-page"><p>Vidéo introuvable.</p></main>

  const related = data.videos.filter((v) => v.id_video !== video.id).slice(0, 3)

  const addComment = () => {
    if (!input.trim()) return
    setComments([{ id: Date.now(), text: input }, ...comments])
    setInput('')
  }

  return (
    <main className="video-page">
      <section className="video-main">
        <VideoPlayer src={"/videoTest.mp4"} title={video.title} />

        <div className="video-info">
          <h1>{video.title}</h1>
          <p className="video-meta">{video.author} • {video.date}</p>
          <p>{video.description}</p>
        </div>

        <div className="video-comments">
          <h2>Commentaires</h2>
          <div className="comment-input">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ajouter un commentaire..."
            />
            <button onClick={addComment}>Publier</button>
          </div>
          <ul>
            {comments.map(c => <li key={c.id}>{c.text}</li>)}
          </ul>
        </div>
      </section>

      <aside className="video-sidebar">
        <h3>Vidéos recommandées</h3>
        <div className="sidebar-list">
          {related.map(v => <VideoMiniature key={v.id_video} video={v} />)}
        </div>
      </aside>
    </main>
  )
}

export default VideoPage
