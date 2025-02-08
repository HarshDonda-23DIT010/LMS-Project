
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const searchHandler = (e) => {
    e.preventDefault();
    if(searchQuery.trim() !== ""){
      navigate(`/course/search?query=${searchQuery}`)
    }
    setSearchQuery("");
  }
   return (
    <div className='relative mt-16 bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 dark:from-gray-800 dark:via-gray-700 dark:to-gray-900 py-16 px-4 text-center animate-gradient'>
    <div className='max-w-3xl flex flex-col items-center mx-auto'>
      <h1 className='text-black dark:text-gray-100 text-4xl font-bold mb-4 '>Find the Best Courses for You</h1>
      <p className='text-orange-500 dark:text-cyan-400 mb-8 '>Discover, Learn, and Upskill with our wide range of courses</p>
  
      <form onSubmit={searchHandler}  className="flex justify-center w-full mx-auto mb-6">
        <div className="relative group w-fit animate-float">
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search here..."
            className="w-60 sm:w-72 px-6 py-4 text-lg text-gray-700 dark:text-gray-200 rounded-full bg-white/10 dark:bg-gray-800/50 backdrop-blur-lg shadow-2xl border-2 border-white/20 dark:border-gray-600/50
              focus:outline-none focus:border-cyan-400 dark:focus:border-cyan-300 focus:ring-4 focus:ring-cyan-400/20 dark:focus:ring-cyan-300/20 transition-all duration-500 ease-out 
              group-hover:w-80 group-focus:w-80 shadow-cyan-500/20 dark:shadow-cyan-400/20 hover:shadow-cyan-500/40 dark:hover:shadow-cyan-400/40
              placeholder:text-gray-500 dark:placeholder:text-gray-400 placeholder:transition-all placeholder:duration-300 hover:placeholder:translate-x-2
              neon-glow" 
          />
          <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-cyan-500 dark:bg-cyan-600 text-white p-3 rounded-full shadow-lg 
                hover:bg-cyan-600 dark:hover:bg-cyan-700 transition-all duration-300 hover:scale-110 hover:shadow-cyan-600/50 dark:hover:shadow-cyan-700/50
                flex items-center justify-center neon-button">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
              />
            </svg>
          </button>
        </div>
      </form>
      
      <Button onClick={()=> navigate(`/course/search?query`)} className='bg-white dark:bg-gray-700 w-40 text-blue-600 dark:text-cyan-400 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 
        transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg dark:shadow-cyan-400/20'>
        Explore Courses
      </Button>
    </div>
  </div>
   )
}

export default HeroSection
