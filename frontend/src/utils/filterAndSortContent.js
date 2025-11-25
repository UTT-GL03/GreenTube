import dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat"

dayjs.extend(customParseFormat)

export function filterAndSort(items, query, mode, sortKey) {
    let filtered = items

    // Filtrage par query
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
            if (sortKey === "title") {
                sorted.sort((a, b) => a.title.localeCompare(b.title))
            }
            if (sortKey === "date") {
                sorted.sort((a, b) => {
                    const dateA = dayjs(a.date, "DD/MM/YYYY HH:mm:ss")
                    const dateB = dayjs(b.date, "DD/MM/YYYY HH:mm:ss")
                    return dateB.valueOf() - dateA.valueOf()
                })
            }

            break
        case "channel":
            if (sortKey === "name") sorted.sort((a, b) => a.pseudo.localeCompare(b.pseudo))
            if (sortKey === "subscribers") sorted.sort((a, b) => b.subscribers - a.subscribers)
            if (sortKey === "date") {
                sorted.sort((a, b) => {
                    const dateA = dayjs(a.creation_date, "DD/MM/YYYY HH:mm:ss")
                    const dateB = dayjs(b.creation_date, "DD/MM/YYYY HH:mm:ss")
                    return dateB.valueOf() - dateA.valueOf()
                })
            }

            break
        default:
            break
    }

    return sorted
}
