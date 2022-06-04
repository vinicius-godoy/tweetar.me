import { useState } from 'react'

import { Home } from './pages/Home/'
import { Login } from './pages/Login/'
import { SignUp } from './pages/Signup'

export const App = () => {
  const [user, setUser] = useState(null)

  if (user) return <Home />

  return window.location.pathname === '/signup'
    ? <SignUp signInUser={setUser} />
    : <Login signInUser={setUser} />
}
