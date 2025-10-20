import { BrowserRouter, Routes, Route, Link } from 'react-router'
import greentubeLogo from '/greentube.svg'
import Home from './Home'
//import Video from './Videos'
import './App.css'

function App() {
  return (
     <BrowserRouter>
      <header>
        <Link to="/">
          <h1>
            <img src={greentubeLogo}/>
            GREENTUBE
          </h1>
          <input>
          </input>
        </Link>
      </header>
      <Routes>
        <Route path="/" element={<Home/>} />
        {/* <Route path="/video" element={<Videos/>} />
        <Route path="/channel" element={<Channels/>} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App