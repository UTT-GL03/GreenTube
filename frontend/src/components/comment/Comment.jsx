import { Link } from "react-router"
import { useState } from "react"
import Avatar from "../channel/avatar/Avatar"

function Comment({ user, comment }) {
    const [showFullCom, setShowFullCom] = useState(false)

    const shortComSize = 250;

    const shortCom =
        comment.content?.length > shortComSize
            ? comment.content.slice(0, shortComSize) + "..."
            : comment.content

    return (
        <div className="flex my-1 max-w-800">
            <div className="me-2">
                <Avatar user={user} />
            </div>

            <div className="w-full">
                <div className="flex justify-between my-1">
                    <Link to={`/channel/${user.id_user}`}>
                        <span className="fw-bold">{user.pseudo}</span>
                    </Link>
                    <span className="fs-xsm text-gray">{comment.date}</span>
                </div>

                <p className="fs-sm word-break">
                    {showFullCom ? comment.content : shortCom}

                    {comment.content?.length > shortComSize && (
                        <button
                            className="bg-none border-0 cursor-pointer fs-sm text-blue hover-underline me-1"
                            onClick={() => setShowFullCom(prev => !prev)}
                        >
                            {showFullCom ? "Voir moins" : "Voir plus"}
                        </button>
                    )}
                </p>
            </div>
        </div>

    )
}

export default Comment