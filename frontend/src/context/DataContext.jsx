import { createContext, useState, useEffect, useContext } from 'react'

export const DataContext = createContext()

export function DataProvider({ children }) {
  const [videos, setVideos] = useState([])
  const [users, setUsers] = useState([])
  const [comments, setComments] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:5984/greentube/_all_docs?include_docs=true')
        const json = await response.json()
        // setVideos(json.videos)
        // setUsers(json.users)
        // setComments(json.comments)
        const docs = json.rows.map(r => r.doc) || []
        setVideos(docs.filter(d => d.type === 'video'))
        setUsers(docs.filter(d => d.type === 'user'))
        setComments(docs.filter(d => d.type === 'comment'))
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

export const useData = () => useContext(DataContext)
