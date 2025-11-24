import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useState } from 'react'

import Home from './components/homepage/Home'
import Header from './components/header/Header'
import VideoPage from './components/video/page/VideoPage'
import Channel from './components/channel/page/Channel'
import AuthPage from './components/auth/page/AuthPage'
import './App.css'

function AppShell() {
  const location = useLocation()
  const hideHeader = ['/login', '/register'].includes(location.pathname)

  const [query, setQuery] = useState("")

  return (
    <>
      {!hideHeader && <Header query={query} setQuery={setQuery} />}
      <Routes>
        <Route path="/:query?" element={<Home query={query} />} />
        <Route path="/login" element={<AuthPage mode="login" />} />
        <Route path="/register" element={<AuthPage mode="register" />} />
        <Route path="/video/:id" element={<VideoPage />} />
        <Route path="/channel/:channelId" element={<Channel />} />
      </Routes>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  )
}
