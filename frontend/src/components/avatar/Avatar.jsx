import { Link } from 'react-router-dom'

// TODO : Pas super joli, faire plus propre
const sizeMap = {
    xl: "circle-xl",
    lg: "circle-lg",
    md: "circle-md",
    sm: "circle-sm",
    xsm: "circle-xsm"
}

export function Avatar({ channelId, size = "sm" }) {

    const sizeClass = sizeMap[size] || sizeMap.sm;

    // Si on a un channelId → on construit l’URL de l'avatar CouchDB
    const avatarUrl = channelId
        ? `http://localhost:5984/greentube/${channelId}/avatar`
        : "/default-avatar.png";

    const img = (
        <img
            src={avatarUrl}
            data-ecoid="channel-avatar"
            className={`${sizeClass} border`}
            onError={(e) => {
                // On revient au default-avatar si CouchDB ne trouve pas l'image
                if (!e.target.dataset.fallback) {
                    e.target.dataset.fallback = true;
                    e.target.src = "/default-avatar.png";
                }
            }}
        />
    );

    // Si pas de channelId, on ne clique sur rien
    if (!channelId) return img;

    // Sinon, clic → page de la chaîne
    return (
        <Link to={`/channel/${channelId}`}>
            {img}
        </Link>
    );
}

export default Avatar;
