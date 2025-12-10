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

export function VideoPlayerCard({ video }) {
  // HOOKs
  const [showFullDesc, setShowFullDesc] = useState(false)

  // VARs
  const shortDescSize = 150;

  const shortDesc = video?.desc ? (
    video.desc.length > shortDescSize
      ? video.desc.slice(0, shortDescSize) + "..."
      : video.desc
  ) : (
    ""
  );

  //
  return (
    <div className="card-xl">
      <div className="center mt-2">
        <VideoPlayer path={video?.path} />
      </div>

      <div className="my-2" data-ecoid="video-desc">
        <div className="flex flex-col gap-2">
          <h2 className="fs-lg fw-bold">{video?.name}</h2>

          <div className="flex align-center gap-2">
            <Avatar idUser={video?.user?.id_user} avatarPath={video?.user?.avatar} />
            <Link to={`/channel/${video?.user?.id_user}`} className="fw-bold my-auto">
              {video?.user.name ?? ""}
            </Link>
          </div>

          <div className="flex gap-3 opacity-7 fs-sm">
            <span>{video?.views} vues</span>
            <span>{dayjs(video?.date, "YYYY-MM-DD HH:mm:ss").fromNow()}</span>
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-1">
          <p>
            {showFullDesc ? video?.desc : shortDesc}

            {video?.desc?.length > shortDescSize && (
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