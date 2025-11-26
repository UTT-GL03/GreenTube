import { Link } from 'react-router-dom'

import { useData } from '../../../context/DataContext'

import minia from "/miniaGT.png"

import dayjs from 'dayjs'
import relativeTime from "dayjs/plugin/relativeTime"
import customParseFormat from "dayjs/plugin/customParseFormat"
import 'dayjs/locale/fr'

dayjs.extend(relativeTime)
dayjs.extend(customParseFormat)
dayjs.locale('fr')

function VideoCard({ video }) {
  const { users } = useData()
  const userPseudo = users.find(u => u._id === video.id_user)?.pseudo ?? ""

  return (
    <div className="card-sm flex flex-col" data-ecoid="video-card">

      <div className="flex-content">
        <Link to={`/video/${video._id}`}>
          <img
            className="fit-cover rounded w-full h-auto mb-1"
            src={minia}
            alt={video.title} />
          <h4 className="truncate my-1">{video.title}</h4>
        </Link>
      </div>

      <div className="flex justify-between mt-1">
        <Link to={`/channel/${video.id_user}`}>
          <span className="fs-sm">{userPseudo}</span>
        </Link>
        <span className="fs-sm text-gray">{dayjs(video.date, "DD/MM/YYYY HH:mm:ss").fromNow()}</span>
      </div>

    </div>
  );
}

export default VideoCard