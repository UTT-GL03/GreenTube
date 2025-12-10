import { Route, Routes } from 'react-router'
import { useAuth } from './contexts/AuthContext'
import MainLayout from './layouts/MainLayout'
import Auth from './pages/Auth'
import Home from './pages/Home'
import Video from './pages/Video'
import ChannelView from './pages/channel/ChannelView'
import ChannelEdit from './pages/channel/ChannelEdit'

export default function AppRoutes() {
  const { user } = useAuth();
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/video/:id" element={<Video />} />
        <Route path="/channel/:id" element={<ChannelView />} />
        <Route path="/channel/edit" element={<ChannelEdit />} />
      </Route>

      {user === null && (
        <>
          <Route path="/login" element={<Auth mode="login" />} />
          <Route path="/register" element={<Auth mode="register" />} />
        </>
      )}
    </Routes>
  )
}