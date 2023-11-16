import { useState } from 'react'

const Navbar = () => {
  const [menu, setMenu] = useState(false)

  const toggleMenu = () => {
    setMenu(!menu)
  }

  const logout = () => {
    localStorage.setItem("userId", "")
  }

  return (
    <div>
      <nav className="bg-primary-600 p-3 md:delil-antara w-full flex flex-row">
      <div className="text-white text-xl font-bold px-5 max-md:w-11/12 md:w-9/12 flex flex-row h-5">
        <img src="/bookshelf.svg" className="px-1 py-1 w-10 h-8" alt="Bookshelf Icon" />
        Bokhyllen
      </div>
      <div className="md:hidden w-1/12">
        <button className="text-white" onClick={toggleMenu}>
        <svg
          className="h-6 w-6 filler fill-white"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 80"
          >
          <rect className="w-24 h-4"></rect>
          <rect y="30" className="w-24 h-4"></rect>
          <rect y="60" className="w-24 h-4"></rect>
        </svg>
        </button>
      </div>
      <div className="hidden md:flex space-x-4 w-4/12 justify-end">
        <a href="/bookspage" className="text-white">
          Bok-søk
        </a>
        <a href="/mypage" className="text-white">
          Min bokhylle
        </a>
        <a href="/userSettings" className="text-white">
          Rediger bruker
        </a>
        <a href="/" onClick={logout} className="text-white">
          Logg ut
        </a>
      </div>
      </nav>
      {menu && (
        <div id="dropdown" className="z-10 md:hidden bg-white absolute divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 right-0 w-60">
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
            <li>
              <a href="/bookspage" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                Bok-søk
              </a>
            </li>
            <li>
              <a href="/mypage" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                Min bokhylle
              </a>
            </li>
            <li>
              <a href="/userSettings" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                Rediger bruker
              </a>
            </li>
            <li>
              <a href="/" onClick={logout} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                Logg ut
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}

export default Navbar
