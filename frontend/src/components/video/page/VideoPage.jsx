import { useParams, Link } from 'react-router-dom'
import data from '/data/sample_data.json'
import VideoPlayer from '../player/VideoPlayer'
import VideoMiniature from '../minia/VideoMiniature'
import Comment from '../../comment/Comment'
import Avatar from '../../channel/avatar/Avatar'
import './VideoPage.css'
import { useState } from 'react'

function VideoPage() {
  const { id } = useParams()
  const video = data.videos.find((v) => String(v.id_video) === id)
  let user = null
  if (video) {
    user = data.users.find(u => u.id_user == video.id_user)
  }
  const [comments, setComments] = useState(
    data.comments.filter(c => c.id_video === video.id_video)
  )
  const [input, setInput] = useState('')

  if (!video) return <main className="center"><p>Vidéo introuvable.</p></main>

  const related = data.videos.filter((v) => v.id_video !== video.id).slice(0, 3)

  const addComment = (currentUserId, currentVideoId) => {
    if (!input.trim()) return

    const newComment = {
      id_comments: `c${Date.now()}`,
      id_user: currentUserId,
      id_video: currentVideoId,
      date: new Date().toLocaleString(),
      content: input
    }

    setComments([newComment, ...comments])
    setInput('')
  }

  return (
    <main className="">

      <div className="spacer-4" />

      <div className="video-page">

        <div className="video-main">

          <VideoCard video={video} user={user} />

          <div className="spacer-2" />

          <CommentsSection
            input={input}
            setInput={setInput}
            addComment={addComment}
            video={video}
            comments={comments}
          />
        </div>

        <Recommendations related = {related} />
      </div>
    </main>
  )
}

function CommentsSection({ input, setInput, addComment, video, comments }) {
  return <div className="video-comments">
    <h2>Commentaires</h2>
    {/* Désactiver l'input si pas connecté */}
    <div className="comment-input">
      <input
        className="input-text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && addComment("u1", video.id_video)}
        placeholder="Ajouter un commentaire..." />

      <button
        className="btn"
        onClick={() => addComment("u1", video.id_video)}
      >
        Publier
      </button>

    </div>
    <div className="spacer-1" />
    <div className="overflow-y-sm">
      <ul>
        {comments.map((c) => {
          let cUser = data.users.find(u => u.id_user === c.id_user)

          return (<Comment
            user={cUser}
            comment={c} />)
        })}
      </ul>
    </div>
  </div>
}

function VideoCard({ video, user }) {
  const [showFullDesc, setShowFullDesc] = useState(false)

  const shortDesc =
    video.desc?.length > 150
      ? video.desc.slice(0, 150) + "..."
      : video.desc

  return (
    <div className="card-lg mx-2" >
      <div className='center my-2'>
        <VideoPlayer src={"/videoTest.mp4"} title={video.title} />
      </div>

      <div className="my-3" data-ecoid="video-desc">
        <div className="video-author">
          <Avatar user={user !== null ? user : null} />
          <div>
            <h2>{video.title}</h2>
            <p>
              <Link to={`/channel/${video.id_user}`}>{video.id_user}</Link> - {video.date}
            </p>
          </div>
        </div>

        <div>
          <p>{showFullDesc ? video.desc : shortDesc}</p>
          {video.desc?.length > 150 && (
            <button
              className="desc-toggle"
              onClick={() => setShowFullDesc((prev) => !prev)}
            >
              {showFullDesc ? "Voir moins" : "Voir plus"}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

function Recommendations({related}) {
  return <div>
    <h3 className="text-center">Vidéos recommandées</h3>
    <div>
      {related.map(v => <div>
        <VideoMiniature key={v.id_video} video={v} />
        <div className="spacer-2" />
      </div>
      )}
    </div>
  </div>
}

export default VideoPage
