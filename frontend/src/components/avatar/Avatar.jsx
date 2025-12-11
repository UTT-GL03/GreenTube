import { Link } from 'react-router-dom'
import { API } from '../../constants/constants';

// TODO : Pas super joli, faire plus propre
const sizeMap = {
    xl: "circle-xl",
    lg: "circle-lg",
    md: "circle-md",
    sm: "circle-sm",
    xsm: "circle-xsm"
}

export function Avatar({ idUser, avatarPath, size = "sm", isPreview = false}) {

    const sizeClass = sizeMap[size] || sizeMap.sm;

    const src = isPreview ? avatarPath : `${API.URL}/${avatarPath || "/default-avatar.png" }`

    const img = (
        <img
            src={src}
            data-ecoid="channel-avatar"
            className={`${sizeClass} border`}
            onError={(e) => {
                if (!e.target.dataset.fallback) {
                    e.target.dataset.fallback = true;
                    e.target.src = `${API.URL}/${"/default-avatar.png" }`;
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