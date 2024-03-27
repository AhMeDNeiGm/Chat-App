import HomePage from './pages/HomePage'
import ChatPage from './pages/ChatPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PublicRoutes from './guards/PublicRoutes'
import PrivateRoutes from './guards/PrivateRoutes'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/chat" element={<ChatPage />} />
        </Route>
        <Route element={<PublicRoutes />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
