import { Link } from 'react-router-dom'

// TODO : Pas super joli, faire plus propre
const sizeMap = {
    xl: "circle-xl",
    lg: "circle-lg",
    md: "circle-md",
    sm: "circle-sm",
    xsm: "circle-xsm"
}

export function Avatar({ idUser, avatarPath, size = "sm"}) {

    const sizeClass = sizeMap[size] || sizeMap.sm;

    const img = (
        <img
            src={avatarPath || "/default-avatar.png"}
            data-ecoid="channel-avatar"
            className={`${sizeClass} border`}
            onError={(e) => {
                if (!e.target.dataset.fallback) {
                    e.target.dataset.fallback = true;
                    e.target.src = "/default-avatar.png";
                }
            }}
        />
    );

    if (!idUser) return img;

    return (
        <Link to={`/channel/${idUser}`}>
            {img}
        </Link>
    );
}

export default Avatar;