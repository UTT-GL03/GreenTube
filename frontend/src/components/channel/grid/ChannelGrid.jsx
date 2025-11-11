import ChannelCard from "../card/ChannelCard"

function ChannelGrid({ channels}) {


  return (
    <div>

      <div className="grid my-3">
        {channels?.length === 0 && (<h4>Aucune chaîne disponible</h4>)}

        {channels.map((row, rowIndex) => (
          <div key={rowIndex} className="row my-2">
            {row.map((channel) => (
              <ChannelCard key={channel.id_user} channel={channel} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ChannelGrid
