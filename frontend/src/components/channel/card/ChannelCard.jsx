import { Link } from "react-router-dom"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import customParseFormat from "dayjs/plugin/customParseFormat"
import 'dayjs/locale/fr'

import Avatar from "../../avatar/Avatar"

dayjs.extend(relativeTime)
dayjs.extend(customParseFormat)
dayjs.locale('fr')

function ChannelCard({ channel }) {
  return (
    <div className="card-sm flex flex-col text-center" data-ecoid='channel-card'>

      <div className="flex-content">
        <Avatar user={channel} size="lg" />
        <Link to={`/channel/${channel.id_user}`}>
          <h4>{channel.pseudo}</h4>
        </Link>
      </div>
      <div className="flex justify-between">
        <span className="fs-sm text-gray">{channel.subscribers} abonnés</span>
        <span className="fs-sm text-gray">Créée le {dayjs(channel.creation_date, "DD/MM/YYYY HH:mm:ss").fromNow()}</span>
      </div>
    </div>
  )
}

export default ChannelCard
