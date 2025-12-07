import ChannelCard from "../card/ChannelCard"

function ChannelGrid({ channels }) {
  if (!channels || channels.length === 0) {
    return;
  }

  return (
    <div data-ecoid="channel-grid">
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
