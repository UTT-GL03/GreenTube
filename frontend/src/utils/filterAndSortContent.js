import dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat"

dayjs.extend(customParseFormat)

export function filterAndSort(items, query, mode, sortKey, order = "asc") {
    let filtered = items

    // Filtrage en fonction de la query
    if (query && query !== "") {
        filtered = filtered.filter((item) => {
            if (mode === "video") return item.name.toLowerCase().includes(query) || item.desc.toLowerCase().includes(query)
            if (mode === "channel") return item.name.toLowerCase().includes(query) || item.desc.toLowerCase().includes(query)
            return false
        })
    }

    const sorted = [...filtered]

    const multiplier = order === "asc" ? 1 : -1

    switch (mode) {
        case "video":
            if (sortKey === "name") {
                sorted.sort((a, b) => multiplier * a.name.localeCompare(b.name))
            }
            if (sortKey === "date") {
                sorted.sort((a, b) => {
                    const dateA = dayjs(a.date, "YYYY-MM-DD HH:mm:ss")
                    const dateB = dayjs(b.date, "YYYY-MM-DD HH:mm:ss")
                    return multiplier * (dateB.valueOf() - dateA.valueOf())
                })
            }

            break
        case "channel":
            if (sortKey === "name") sorted.sort((a, b) => multiplier * a.name.localeCompare(b.name))
            if (sortKey === "subscribers") sorted.sort((a, b) =>  multiplier * (b.subscribers - a.subscribers))
            if (sortKey === "date") {
                sorted.sort((a, b) => {
                    const dateA = dayjs(a.date, "YYYY-MM-DD HH:mm:ss")
                    const dateB = dayjs(b.date, "YYYY-MM-DD HH:mm:ss")
                    return multiplier * (dateB.valueOf() - dateA.valueOf())
                })
            }

            break
        default:
            break
    }

    return sorted
}
