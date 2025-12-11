import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router'

import { backApi } from '../../api/backApi';

import Avatar from '../../components/avatar/Avatar'
import VideoGrid from '../../components/video/grid/VideoGrid';
import SeeMoreButton from '../../components/SeeMoreButton';
import SortButtons from '../../components/SortButtons';
import ScrollTopButton from '../../components/ScrollTopButton';

function ChannelView() {
    // HOOKs
    const { id } = useParams();

    const [user, setUser] = useState(null);
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [sortKey, setSortKey] = useState("date");
    const [order, setOrder] = useState("asc");
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        loadAll(true)
    }, [id, sortKey, order])

    // FUNCTIONs
    const loadAll = async (reset = false) => {
        setLoading(true)

        const isApiFirstLoad = user === null || user.id_user !== id;
        const offset = reset ? 0 : videos.length
        const limit = 6

        const params = {
            id_user: id,
            sortKey,
            order,
            offset,
            limit,
            firstLoad: isApiFirstLoad
        };

        try {
            const data = await backApi.getChannel(params)

            setVideos(prev =>
                reset ? data.videos : [...prev, ...data.videos]
            );
            setHasMore(data.length === limit)
            if (isApiFirstLoad) {
                setUser(data.user || null)
            }
        } catch (err) {
            console.error("Erreur chargement Channel : " + err)
        } finally {
            setLoading(false)
        }
    }

    const handleSeeMore = () => {
        loadAll(false)
    }

    // VARs
    const visibleVideos = Object.values(
        Object.groupBy(videos, (_, i) => Math.floor(i / 3))
    )

    //
    return (
        <main className="center">
            <div>

                <div className="card-xl rounded flex mx-auto p-4 my-3 relative">

                    {user && (
                        <Link
                            to="/channel/edit"
                            className="btn absolute top-10 right-10 rounded"
                        >
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M12 20h9" />
                                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
                            </svg>
                        </Link>
                    )}
                    <Avatar avatarPath={user?.avatar} size={"xl"} />
                    <div className="flex flex-col mx-3">
                        <h1>{!loading && user === null ? "Chaîne introuvable :/" : user?.name}</h1>
                        <span className="fs-sm text-gray">{user?.desc}</span>
                        {/*
                        TODO : Récupérer le count totale de video de l'user
                        Potentiellement _design map reduce de couchDB
                        <p className="fs-sm text-gray">{videos.length} vidéos</p> 
                         */}
                    </div>
                </div>

                {videos.length !== 0 && (
                    <SortButtons sortKey={sortKey} setSortKey={setSortKey} type={"video"} order={order} setOrder={setOrder} />
                )}

                <VideoGrid videos={visibleVideos} />

                {hasMore && videos.length !== 0 && (
                    !loading ? (
                        <SeeMoreButton onSeeMore={handleSeeMore} />
                    ) : (
                        <div className="center">
                            <div className="btn mt-2">Chargement...</div>
                        </div>
                    )
                )}

                {!loading && !hasMore && videos.length === 0 && (
                    <h4 className="text-center mt-3"> Aucun résultat </h4>
                )}
            </div>
            <ScrollTopButton scrollOffset={100} />
        </main>
    )
}

export default ChannelView
