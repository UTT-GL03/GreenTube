import { Route, Routes } from 'react-router'
import { useAuth } from './contexts/AuthContext'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import Video from './pages/Video'
import Channel from './pages/Channel'
import Auth from './pages/Auth'
import ProfileEdit from "./pages/ProfileEdit";

export default function AppRoutes() {
  const { user } = useAuth();
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/profile/edit" element={<ProfileEdit />} />
        <Route path="/video/:id" element={<Video />} />
        <Route path="/channel/:id" element={<Channel />} />
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