import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

import { Sidebar } from '../Sidebar'

export const ProtectedRoute = ({ children }) => {
  const { user } = useAuth()

  return user
    ? (
      <div className="h-full flex flex-col-reverse lg:flex-row lg:justify-center lg:px-40">
        <Sidebar />
        {children}
      </div>
    ) : <Navigate to="/login" />
}
