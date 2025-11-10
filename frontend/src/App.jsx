import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Home from './components/homepage/Home'
import Header from './components/header/Header'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import VideoPage from './components/video/page/VideoPage'
import Channel from './components/channel/Channel'
import './App.css'

function AppShell() {
  const location = useLocation()
  const hideHeader = ['/login', '/register'].includes(location.pathname)

  return (
    <>
      {!hideHeader && <Header />}
      <Routes>
        <Route path="/:query?" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
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
