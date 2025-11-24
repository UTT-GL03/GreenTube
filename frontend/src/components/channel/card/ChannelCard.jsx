import { Link } from "react-router-dom"
import avatar from "/default-avatar.png"

function ChannelCard({ channel }) {
  return (
    <div className="card-sm flex flex-col text-center" data-ecoid='channel-card'>

      <div className="flex-content">
      <Link to={`/channel/${channel.id_user}`}>
        <img src={channel.avatar || avatar} alt={channel.pseudo} className="channel-avatar circle-lg border" />
        <h4>{channel.pseudo}</h4>
      </Link>
      </div>
      <div className="flex justify-between">
        <span className="fs-sm">{channel.subscribers} abonnés</span>
        <span className="fs-sm">Créée le {new Date(channel.creation_date).toLocaleDateString()}</span>
      </div>
    </div>
  )
}

export default ChannelCard
