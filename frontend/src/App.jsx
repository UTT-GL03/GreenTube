import { BrowserRouter, Routes, Route, Link } from 'react-router'

import Home from './Home'
//import Video from './Videos'
import './App.css'
import Header from './Header'

function App() {
  return (
     <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home/>} />
        {/* <Route path="/video" element={<Videos/>} />
        <Route path="/channel" element={<Channels/>} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App