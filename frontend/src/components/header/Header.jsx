import { Link } from 'react-router-dom'
import greentubeLogo from '/greentube.svg'


function Header({ query, setQuery }) {

  return (
    <div className="pt-4">

      <header className="fixed top-0 left-0 right-0 h-56 shadow-header px-1 py-1 bg-white z-1000">

        <div className="header-section header-left" data-ecoid="home-logo">
          <Link to="/" className="flex gap-2 item-center">
            <img src={greentubeLogo} alt="Greentube" />
            <p className="fw-bold fs-xl">GREENTUBE</p>
          </Link>
        </div>

        <div className="header-section header-center">
          <div>
            <input
              id="search-input"
              type="text"
              placeholder="Rechercher"
              className="search-input"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => e.key === "Enter" && setQuery(e.target.value)}
            />
            <button
              className="search-button"
              type="button"
              onClick={() => {
                const inputValue = document.getElementById("search-input").value
                setQuery(inputValue)
              }}>
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

        <div className="header-section header-right">
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

      </header >
    </div>
  )
}

export default Header
