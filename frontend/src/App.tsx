import { Route, Routes } from "react-router-dom"
import Homepage from "./pages/home/HomePage" 
import AuthCallbackPage from "./pages/auth-callback/AuthCallbackPage"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/auth-callback" element={<AuthCallbackPage />} />
      </Routes>
    </>
  )}

export default App
