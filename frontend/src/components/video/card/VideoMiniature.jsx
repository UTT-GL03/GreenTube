import { Link } from 'react-router-dom'
import minia from "/miniaGT.png"

function VideoMiniature({ video }) {
  return (
    <div className="card-sm flex flex-col" data-ecoid="video-card">

      <div className="flex-content">
        <Link to={`/video/${video.id_video}`}>
          <img
            className="fit-cover rounded w-full h-auto mb-1"
            src={minia}
            alt={video.title} />
          <h4 className="truncate my-1">{video.title}</h4>
        </Link>
      </div>

      <div className="flex justify-between mt-1">
        <Link to={`/channel/${video.id_user}`}>
          <span className="fs-sm">{video.id_user}</span>
        </Link>
        <span className="fs-sm text-gray">{video.date}</span>
      </div>

    </div>
  );
}

export default VideoMiniature