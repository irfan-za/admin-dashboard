import React from 'react'
import { Link} from "react-router-dom"

function Home() {
  return (
    <div className="bg-gray-500 h-screen">
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:h-screen lg:flex lg:flex-col lg:items-center lg:justify-center  transform lg:-translate-y-10">
      <h2 className="text-3xl font-extrabold text-indigo-600 sm:text-4xl">Dashboard Admin</h2>
      <div className="mt-8 flex lg:mt-7 lg:flex-shrink-0">
        <div className="inline-flex rounded-md shadow">
          <Link to="/login"
            href="#"
            className="inline-flex items-center justify-center w-20 h-11 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-800 "
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Home
