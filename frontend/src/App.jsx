// App.jsx
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Home from './components/homepage/Home'
import Header from './components/header/Header'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import './App.css'

function AppShell() {
  const location = useLocation()
  const hideHeader = ['/login', '/register'].includes(location.pathname)

  return (
    <>
      {!hideHeader && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
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
