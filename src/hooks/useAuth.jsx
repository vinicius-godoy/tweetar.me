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

  const signUpLogin = async (data) => {
    setUser(data)
    navigate("/")
  }

  const refreshData = async () => {
    const res = await axios({
      method: 'get',
      url: `${import.meta.env.VITE_API_HOST}/users`,
      headers: {
        authorization: `Bearer ${user.accessToken}`
      }
    })
    const updatedData = { ...res.data, password: undefined }
    setUser(state => ({ accessToken: state.accessToken, ...updatedData }))
  }

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      signUpLogin,
      refreshData,
    }),
    [user]
  )
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  return useContext(AuthContext)
}
