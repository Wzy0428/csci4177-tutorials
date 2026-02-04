import {BrowserRouter, Routes, Route } from 'react-router-dom'
import Registration from './pages/Registration'
import Profile from './pages/Profile'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<Registration />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App

