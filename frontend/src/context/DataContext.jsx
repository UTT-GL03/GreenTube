import { createContext, useState, useEffect } from 'react'

export const DataContext = createContext()

export function DataProvider({ children }) {
  const [videos, setVideos] = useState([])
  const [users, setUsers] = useState([])
  const [comments, setComments] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/data/sample_data_high.json')
        const json = await response.json()
        setVideos(json.videos)
        setUsers(json.users)
        setComments(json.comments)
      } catch (err) {
        console.error('Error fetching data:', err)
      }
    }

    fetchData()
  }, [])

  return (
    <DataContext.Provider value={{ videos, users, comments }}>
      {children}
    </DataContext.Provider>
  )
}
