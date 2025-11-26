import { useState } from "react";
import { Link } from "react-router";

import Avatar from "../../../avatar/Avatar";
import VideoPlayer from "../VideoPlayer";

import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import customParseFormat from "dayjs/plugin/customParseFormat"
import 'dayjs/locale/fr'

dayjs.extend(relativeTime)
dayjs.extend(customParseFormat)
dayjs.locale('fr')

export function VideoPlayerCard({ video, user }) {
  const [showFullDesc, setShowFullDesc] = useState(false)

  const shortDescSize = 150;

  const shortDesc =
    video.desc?.length > shortDescSize
      ? video.desc.slice(0, shortDescSize) + "..."
      : video.desc

  return (
    <div className="card-xl">
      <div className="center mt-2">
        <VideoPlayer src={"/videoTest.mp4"} title={video.title} />
      </div>

      <div className="my-2" data-ecoid="video-desc">
        <div className="flex flex-col gap-2">
          <h2 className="fs-lg fw-bold">{video.title}</h2>

          <div className="flex align-center gap-2">
            <Avatar user={user !== null ? user : null} />
            <Link to={`/channel/${video.id_user}`} className="fw-bold my-auto">
              {user.pseudo}
            </Link>
          </div>

          <div className="flex gap-3 opacity-7 fs-sm">
            <span>{video.views} vues</span>
            <span>{dayjs(video.date, "DD/MM/YYYY HH:mm:ss").fromNow()}</span>
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-1">
          <p>
            {showFullDesc ? video.desc : shortDesc}

            {video.desc?.length > shortDescSize && (
              <button
                data-greenframeid="see-more-desc"
                className="bg-none border-0 cursor-pointer fs-sm text-blue hover-underline me-1"
                onClick={() => setShowFullDesc(prev => !prev)}
              >
                {showFullDesc ? "Voir moins" : "Voir plus"}
              </button>
            )}
          </p>
        </div>
      </div>
    </div>
  )
}

export default VideoPlayerCard