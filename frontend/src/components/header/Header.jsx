import { Link } from 'react-router-dom'
import greentubeLogo from '/greentube.svg'
import './Header.css'

function Header() {
  return (
    <header className="header">

      <div className="header-left">
        <Link to="/" className="logo">
          <img src={greentubeLogo} alt="Greentube" />
          <span>GREENTUBE</span>
        </Link>
      </div>

      <div className="header-center">
        <input
          type="text"
          placeholder="Rechercher"
          className="search-input"
        />
        <button className="btn search-btn center">🔍</button>
      </div>

      
      <div>
        {/* 
        if login => profil = badge pdp link channel
        else => login/register btn link form 
        */}
        <div>
          <Link to="/login" className="btn">Connexion</Link>
        </div>

        {/* <button className="button">Profil</button> */}
      </div>

    </header>
  )
}

export default Header
