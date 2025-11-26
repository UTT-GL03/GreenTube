import ChannelCard from "../card/ChannelCard"

function ChannelGrid({ channels}) {


  return (
      <div data-ecoid="channel-grid">
        {channels?.length === 0 && (<h4>Aucune chaîne disponible</h4>)}

        {channels.map((row, rowIndex) => (
          <div key={rowIndex} className="row my-2">
            {row.map((channel) => (
              <ChannelCard key={channel._id} channel={channel} />
            ))}
          </div>
        ))}
      </div>
  )
}

export default ChannelGrid
