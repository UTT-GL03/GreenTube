// App.jsx
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Home from './Home'
import Header from './Header'
import Login from './Login'
import Register from './Register'
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
