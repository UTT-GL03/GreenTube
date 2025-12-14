import { Link } from 'react-router-dom'
import { API } from '../../../constants/constants'

import dayjs from 'dayjs'
import relativeTime from "dayjs/plugin/relativeTime"
import customParseFormat from "dayjs/plugin/customParseFormat"
import 'dayjs/locale/fr'

dayjs.extend(relativeTime)
dayjs.extend(customParseFormat)
dayjs.locale('fr')

function VideoCard({ video }) {
  return (
    <div className="card-sm flex flex-col" data-ecoid="video-card">

      <div className="flex-content">
        <Link to={`/video/${video._id}`}>
        <div className="relative">
          <img
            className="fit-contain rounded-md w-full h-200 mb-1"
            src={`${API.URL}/${video.thumbnail}`}
            alt={video.name} />
          <span
            className="absolute bottom-15 right-5 bg-black opacity-7 text-white text-xs px-2 py-1 rounded-md">
            {video.views} vues
          </span>
        </div>
          <h4 className="truncate my-1">{video.name}</h4>
        </Link>
      </div>

      <div className="flex justify-between mt-1">
        <Link to={`/channel/${video.user.id_user}`}>
          <span className="fs-sm">{video?.user?.name ?? ""}</span>
        </Link>
        <span className="fs-sm text-gray">{dayjs(video.date, "YYYY-MM-DD HH:mm:ss").fromNow()}</span>
      </div>

    </div>
  );
}

export default VideoCard