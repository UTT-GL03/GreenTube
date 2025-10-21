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
        <button className="search-button">🔍</button>
      </div>

      <div className="header-right">
        {/* 
        if login => profil = badge pdp link channel
        else => login/register btn link form 
        */}
        <button className="button">Connexion</button>
        {/* <button className="button">Profil</button> */}
      </div>
      
    </header>
  )
}

export default Header
