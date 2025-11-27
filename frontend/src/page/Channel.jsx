import { useParams } from 'react-router'

import { useData } from '../context/DataContext';

import Avatar from '../components/avatar/Avatar'
import ContentGrid from '../components/contentGrid/grid/ContentGrid'

function Channel() {
    const { videos, users } = useData()

    const { channelId } = useParams()

    const channelVideos = videos.filter(v => v.id_user === channelId)

    const channelUser = users.find(u => u._id === channelId)
    console.log(channelUser)

    return (
        <main className="center">
            <div>

                <div className="card-xl rounded flex mx-auto p-4 my-3">

                    <Avatar user={channelUser} size={"xl"} link={false} />

                    <div className="flex flex-col mx-3">
                        <h1>{channelUser === null ? "Chaîne introuvable" : channelUser?.pseudo}</h1>
                        <span className="fs-sm text-gray">{channelUser?.desc}</span>
                        <p className="fs-sm text-gray">{channelVideos.length} vidéos</p>
                    </div>

                </div>

                <ContentGrid
                    videos={channelVideos}
                    showModeSwitch={false}
                />

            </div>
        </main>
    )
}

export default Channel
