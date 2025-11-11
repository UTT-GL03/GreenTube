function VideoPlayer({ src }) {
  return (
      <video className='rounded' controls width="100%" src={src} />
  )
}


export default VideoPlayer
