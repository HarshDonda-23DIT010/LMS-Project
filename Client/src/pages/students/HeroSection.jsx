
import { Button } from '@/components/ui/button'
import React from 'react'

function HeroSection() {
   return (
      <div className='relative bg-gradient-to-r mt-16 from-blue-500 to bg-indigo-600 dark:from-gray-800 dark:to-gray-900 py-16 px-4 text-center'>
         <div className='max-w-3xl mx-auto'>
            <h1 className='text-white text-4xl font-bold mb-4 '>Find the Best Courses for You</h1>
            <p className='text-gray-200 dark:text-gray-400 mb-8 '>Discover, Learn, and Upskill with our wide range of courses</p>
          
            <form action="" className="flex items-center max-w-xl mx-auto mb-6">
               <input
                  type="text"
                  placeholder="Search Courses"
                  className="flex-grow border-none h-10 px-4 dark:text-black text-black rounded-l-full shadow-lg focus:ring-0 focus:outline-none"
               />
               <Button
                  className="h-10 rounded-r-full  bg-blue-400 dark:bg-gray-500 dark:hover:bg-gray-800 hover:bg-blue-600 text-white px-6"
               >
                  Search
               </Button>
            </form>
            <Button className='bg-white w-40 dark:bg-gray-600 text-blue-600 dark:text-white rounded-full  hover:bg-gray-300'>
               Expolore Courses
            </Button>
         </div>

      </div>
   )
}

export default HeroSection
