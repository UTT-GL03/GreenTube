import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import Avatar from "./avatar/Avatar";
import { useAuth } from "../contexts/AuthContext";

export function UserDropdown() {
    const [open, setOpen] = useState(false);
    const { user, logout } = useAuth();
    const ref = useRef();

    if (!user) return null;

    useEffect(() => {
        function handleClickOutside(e) {
            if (ref.current && !ref.current.contains(e.target)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={ref}>
            <button
                className="card flex items-center border-0 p-1 cursor-pointer select-none"
                onClick={() => setOpen((o) => !o)}
            >
                <span className="me-1">{user?.name}</span>
                <Avatar avatarPath={user?.avatar} />
            </button>

            {open && (
                <div className="absolute right-0 mt-2 w-40 card p-2 flex flex-col text-sm z-50 bg-white gap-2">
                    <Link
                        to={`/channel/${user?._id}`}
                        className="btn btn-outline text-left p-1 rounded-md"
                        onClick={() => setOpen(false)}
                    >
                        Mon profil
                    </Link>
                    <button
                        className="btn btn-outline text-left p-1 rounded-md text-red"
                        onClick={() => {
                            logout()
                            window.location.reload();
                        }}
                    >
                        Déconnexion
                    </button>
                </div>
            )}
        </div>
    );
}

export default UserDropdown;
