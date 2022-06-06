import { createContext, useContext, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import axios from 'axios'

import { useLocalStorage } from "./useLocalStorage"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null)
  const navigate = useNavigate()

  const login = async (data) => {
    const res = await axios
      .get(`${import.meta.env.VITE_API_HOST}/login`, {
        auth: {
          username: data.email,
          password: data.password,
        }
      })
    setUser(res.data)
    navigate("/")
  }

  const logout = () => {
    setUser(null)
    navigate("/login", { replace: true })
  }

  const value = useMemo(
    () => ({
      user,
      login,
      logout
    }),
    [user]
  )
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  return useContext(AuthContext)
}
