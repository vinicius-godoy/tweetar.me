import { Routes, Route } from 'react-router-dom'

import { Home } from './pages/Home/'
import { Login } from './pages/Login/'
import { SignUp } from './pages/Signup'
import { Profile } from './pages/Profile'
import { Bookmarks } from './pages/Bookmarks'
import { ProtectedRoute } from './components/ProtectedRoute'
import { AuthProvider } from './hooks/useAuth'

export const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/bookmarks"
          element={
            <ProtectedRoute>
              <Bookmarks />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </AuthProvider>
  )
}
