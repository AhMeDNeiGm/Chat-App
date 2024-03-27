import { Outlet, Navigate } from 'react-router-dom'

export default function PublicRoutes() {
  const authToken = localStorage.getItem('token')
  return !authToken ? <Outlet /> : <Navigate to={`/chat`} />
}
