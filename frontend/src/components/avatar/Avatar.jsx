import { Link } from 'react-router-dom'

function Avatar({ user, size = "sm" }) {
    const sizeClass = size === "xl" ? "circle-xl" : "circle-sm"

    return (
        <Link to={`/channel/${user.id_user}`}>
            <img
                src={user?.avatar || "/default-avatar.png"}
                data-ecoid="channel-avatar"
                className={`${sizeClass} border`}
                onError={(e) => {
                    if (!e.target.dataset.fallback) {
                        e.target.dataset.fallback = true
                        e.target.src = "/default-avatar.png"
                    }
                }}
            />
        </Link>
    )
}

export default Avatar
