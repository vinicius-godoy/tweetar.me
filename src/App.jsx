import { useState } from 'react'
import { Home } from './pages/Home/'
import { Login } from './pages/Login/'

export const App = () => {
  const [user, setUser] = useState(null)

  return user ? <Home /> : <Login signInUser={setUser} />
}
