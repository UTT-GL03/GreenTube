function VideoPlayer({ src }) {
  return (
    <video
      className="rounded"
      controls width="100%"
      src={src}
      data-ecoid="video-player"
      data-greenframeid="video-player"
    />
  )
}


export default VideoPlayer
