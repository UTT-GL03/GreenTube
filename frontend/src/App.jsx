import { BrowserRouter, Routes, Route, Link } from 'react-router'

import Home from './Home'
//import Video from './Videos'
import './App.css'
import Header from './Header'
import Login from './Login'
import Register from './Register'

function App() {
  return (
     <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/video" element={<Videos/>} />
        <Route path="/channel" element={<Channels/>} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App