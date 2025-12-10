import { createContext, useContext, useState } from "react"

// Si on utilise le localStorage
const AUTH_STORAGE_KEY = "USER";

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem(AUTH_STORAGE_KEY);
    return savedUser ? JSON.parse(savedUser) : null
  })

  function login(user) {
    setUser(user);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user))
  }

  function logout() {
    setUser(null)
    localStorage.removeItem(AUTH_STORAGE_KEY)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
