import { createContext, useContext, useState } from "react"

// Si on utilise le localStorage
const AUTH_STORAGE_KEY = "...";

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [logged, setLogged] = useState(false)

  function login(user) {

  }

  function logout() {

  }

  return (
    <AuthContext.Provider value={{ logged, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
