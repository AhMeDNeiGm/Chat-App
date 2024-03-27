import { Outlet, Navigate } from 'react-router-dom'

export default function PrivateRoutes() {
  const authToken = localStorage.getItem('token')
  return authToken ? <Outlet /> : <Navigate to={'/login'} />
}
