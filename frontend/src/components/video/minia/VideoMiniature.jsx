import { Link } from 'react-router-dom'
import "./VideoMiniature.css"
import minia from "/miniaGT.png"

function VideoMiniature({ video }) {
  return (
    <div className="video-miniature">

      <Link to={`/video/${video.id_video}`}>
        <img src={minia} alt={video.title} />
        <h4>{video.title}</h4>
      </Link>

      <div className="video-info">
        <Link to={`/channel/${video.id_user}`}>
          <span>{video.id_user}</span>
        </Link>
        <span>{video.date}</span>
      </div>
    </div>
  );
}



export default VideoMiniature