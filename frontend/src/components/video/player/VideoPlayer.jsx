import './VideoPlayer.css'

function VideoPlayer({ src, title }) {
  return (
    <div className="video-player">
      <video controls width="100%" src={src}>
      </video>
    </div>
  )
}


export default VideoPlayer
