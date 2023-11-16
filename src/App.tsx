import './App.css'
import Mainpage from './pages/Mainpage'
import Register from './pages/Register'
import Navbar from './components/Navbar'
import Bookspage from './pages/Bookspage'
import MyPage from './pages/MyPage'
import UserSettings from './pages/UserSettings'


function App() {
  return (
    <div className="App">
      <div className='content'>
        <Navbar />
        <Mainpage />
        <Register />
        <Bookspage />
        <MyPage />
        <UserSettings />
      </div>
      </div>)
}

export default App