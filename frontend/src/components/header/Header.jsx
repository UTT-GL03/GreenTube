import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSearch } from '../../context/SearchContext'

import greentubeLogo from '/greentube.svg'

import UploadVideoModal from '../video/upload/UploadVideoModal'
import UserDropdown from '../UserDropdown'

function Header() {
  const { setQuery } = useSearch()
  const [inputValue, setInputValue] = useState("");

  const [showUploadModal, setShowUploadModal] = useState(false)

  let loggedUser = localStorage.getItem("user")

  if (typeof loggedUser === "string") {
    try {
      loggedUser = JSON.parse(loggedUser);
    } catch {
      return null;
    }
  }

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
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              onKeyDown={e => e.key === "Enter" && setQuery(e.target.value)}
            />
            <button
              className="search-button"
              type="button"
              onClick={() => setQuery(inputValue.trim())}>
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

          {loggedUser ? (
            <>
              <button
                className="btn circle-sm"
                type="button"
                onClick={() => setShowUploadModal(true)}
              >
                +
              </button>
              <UserDropdown user={loggedUser} />
            </>
          ) : (
            <div>
              <Link to="/login" className="btn">Connexion</Link>
            </div>
          )
          }
        </div >
      </header >

      {showUploadModal && loggedUser && (
        <UploadVideoModal user={loggedUser} onClose={() => setShowUploadModal(false)} />
      )}
    </div>
  )
}

export default Header
