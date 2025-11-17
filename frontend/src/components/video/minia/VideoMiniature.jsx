import { Link } from 'react-router-dom'
import "./VideoMiniature.css"
import minia from "/miniaGT.png"

function VideoMiniature({ video }) {
  return (
    <div className="video-miniature" data-ecoid="video-card">

      <div className="video-info">
        <Link to={`/video/${video.id_video}`}>
          <img src={minia} alt={video.title}/>
          <h4>{video.title}</h4>
        </Link>
      </div>

      <div className="minia-details">
        <Link to={`/channel/${video.id_user}`}>
          <span>{video.id_user}</span>
        </Link>
        <span>{video.date}</span>
      </div>
    </div>
  );
}

export default VideoMiniature