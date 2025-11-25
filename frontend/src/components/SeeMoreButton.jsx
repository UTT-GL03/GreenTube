function SeeMoreButton({ visibleCount, totalItems, onSeeMore }) {
  if (visibleCount >= totalItems) return null

  return (
    <div className="center">
      <button className="btn mt-2" onClick={onSeeMore}>
        Voir plus
      </button>
    </div>
  )
}

export default SeeMoreButton
