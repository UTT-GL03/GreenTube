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
        <div className="search-bar">
          <input
            type="text"
            placeholder="Rechercher"
            className="search-input"
          />
          <button className="search-button" type="button">
            <svg
              className="search-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="black"
                strokeWidth="2"
                d="M10 2a8 8 0 1 1 0 16 8 8 0 0 1 0-16zm11 20-6-6"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="header-right">
        <button className="btn circle-sm">
          +
        </button>
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
