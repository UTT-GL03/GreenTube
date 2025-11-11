import { useParams } from 'react-router'
import data from '/data/sample_data.json'
import "./Channel.css"
import Avatar from '../../Avatar'
import ContentGrid from '../../ContentGrid'

function Channel() {
    const { channelId } = useParams()

    const channelVideos = data.videos.filter(v => v.id_user === channelId)

    const channelUser = data.users.find(u => u.id_user === channelId)

    return (
        <main className="center">
            <div>

                <div className="card-lg rounded flex mx-auto px-4 py-4 my-3">

                    <Avatar user={channelUser} size={"xl"} />

                    <div className="flex flex-col mx-3">
                        <h1>{channelUser === null ? "Chaîne introuvable" : channelUser.pseudo}</h1>
                        <span className="text-sm text-gray">{channelUser?.desc}</span>
                        <p className="text-sm text-gray">{channelVideos.length} vidéos</p>
                    </div>

                </div>

                <ContentGrid
                    videos = {channelVideos}
                    showModeSwitch = {false}
                />

            </div>
        </main>
    )
}

export default Channel
