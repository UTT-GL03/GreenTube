import './VideoPlayer.css'

function VideoPlayer({ src }) {
  return (
      <video controls width="100%" src={src} />
  )
}


export default VideoPlayer
