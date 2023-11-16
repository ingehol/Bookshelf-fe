import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import './styles/styles.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Mainpage from './pages/Mainpage'
import Register from './pages/Register'
import Bookspage from './pages/Bookspage'
import MyPage from './pages/MyPage'
import UserSettings from './pages/UserSettings'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="" index element={<Mainpage />} />
        <Route path="register" element={<Register />} />
        <Route path="bookspage" element={<Bookspage />} />
        <Route path="mypage" element={<MyPage />} />
        <Route path="userSettings" element={<UserSettings />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)