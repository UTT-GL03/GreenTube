import { BrowserRouter, Routes, Route } from 'react-router-dom'

import MainLayout from './layouts/MainLayout'
import Home from './page/Home'
import Video from './page/Video'
import Channel from './page/Channel'
import Auth from './page/Auth'
import './App.css'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/:query?" element={<Home />} />
          <Route path="/video/:id" element={<Video />} />
          <Route path="/channel/:channelId" element={<Channel />} />
        </Route>

        <Route path="/login" element={<Auth mode="login" />} />
        <Route path="/register" element={<Auth mode="register" />} />
      </Routes>
    </BrowserRouter>
  )
}
