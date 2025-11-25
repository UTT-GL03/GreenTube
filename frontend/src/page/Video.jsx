import { useParams, Link } from 'react-router-dom'
import VideoPlayer from '../components/video/player/VideoPlayer'
import VideoCard from '../components/video/card/VideoCard'
import Comment from '../components/comment/Comment'
import Avatar from '../components/channel/avatar/Avatar'
import { useState } from 'react'

const response = await fetch('/data/sample_data_high.json');
const data = await response.json();

function Video() {
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
    <main>
      <div className="flex flex-wrap center mt-2 mb-4 gap-4">
        <div>
          <VideoPlayerCard video={video} user={user} />

          <CommentsSection
            input={input}
            setInput={setInput}
            addComment={addComment}
            video={video}
            comments={comments}
          />
        </div>
        <Recommendations related={related} />
      </div>
    </main>
  )
}

function CommentsSection({ input, setInput, addComment, video, comments }) {
  return (
    <div className="max-w-900 mx-1">
      <h2>Commentaires</h2>

      <div className="flex w-full my-1">
        <input
          className="flex-content input-text me-1"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addComment("u1", video.id_video)}
          placeholder="Ajouter un commentaire..."
        />

        <button className="btn" onClick={() => addComment("u1", video.id_video)}>
          Publier
        </button>
      </div>

      <div className="overflow-y-sm w-full">
        <ul>
          {comments.map((c) => {
            let cUser = data.users.find(u => u.id_user === c.id_user)
            return (
              <Comment user={cUser} comment={c} />
            )
          })}
        </ul>
      </div>
    </div>
  )
}

function VideoPlayerCard({ video, user }) {
  const [showFullDesc, setShowFullDesc] = useState(false)

  const shortDescSize = 150;

  const shortDesc =
    video.desc?.length > shortDescSize
      ? video.desc.slice(0, shortDescSize) + "..."
      : video.desc

  return (
    <div className="card-xl">
      <div className="center mt-2">
        <VideoPlayer src={"/videoTest.mp4"} title={video.title} />
      </div>

      <div className="my-2" data-ecoid="video-desc">
        <div className="flex flex-col gap-2">
          <h2 className="fs-lg fw-bold">{video.title}</h2>

          <div className="flex align-center gap-2">
            <Avatar user={user !== null ? user : null} />
            <Link to={`/channel/${video.id_user}`} className="fw-bold my-auto">
              {video.id_user}
            </Link>
          </div>

          <div className="flex gap-3 opacity-7 fs-sm">
            <span>{video.views} vues</span>
            <span>{video.date}</span>
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-1">
          <p>
            {showFullDesc ? video.desc : shortDesc}

            {video.desc?.length > shortDescSize && (
              <button
                data-greenframeid="see-more-desc"
                className="bg-none border-0 cursor-pointer fs-sm text-blue hover-underline me-1"
                onClick={() => setShowFullDesc(prev => !prev)}
              >
                {showFullDesc ? "Voir moins" : "Voir plus"}
              </button>
            )}
          </p>
        </div>
      </div>
    </div>
  )
}

function Recommendations({ related }) {
  return <div>
    <h3 className="text-center">Vidéos recommandées</h3>
    <div>
      {related.map(v => <div>
        <VideoCard key={v.id_video} video={v} />
        <div className="spacer-2" />
      </div>
      )}
    </div>
  </div>
}

export default Video
