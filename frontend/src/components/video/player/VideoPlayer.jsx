import './VideoPlayer.css'

function VideoPlayer({ src, title }) {
  return (
    <div className="video-player">
      <video controls width="100%" src={src}>
        Votre navigateur ne supporte pas la vidéo.
      </video>
    </div>
  )
}


export default VideoPlayer
