export function filterAndSort(items, query, mode, sortKey) {
  let filtered = items

  if (query && query !== "") {
    filtered = filtered.filter((item) => {
      if (mode === "video") return item.title.toLowerCase().includes(query) || item.desc.toLowerCase().includes(query)
      if (mode === "channel") return item.pseudo.toLowerCase().includes(query) || item.desc.toLowerCase().includes(query)
      return false
    })
  }

  const sorted = [...filtered]
  
  switch (mode) {
    case "video":
      if (sortKey === "title") sorted.sort((a, b) => a.title.localeCompare(b.title))
      if (sortKey === "date") sorted.sort((a, b) => new Date(b.date) - new Date(a.date))
      break
    case "channel":
      if (sortKey === "name") sorted.sort((a, b) => a.pseudo.localeCompare(b.pseudo))
      if (sortKey === "subscribers") sorted.sort((a, b) => b.subscribers - a.subscribers)
      if (sortKey === "date") sorted.sort((a, b) => new Date(b.creation_date) - new Date(a.creation_date))
      break
    default:
      break
  }

  return sorted
}