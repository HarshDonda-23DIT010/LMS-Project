import { ChartNoAxesColumn, SquareLibrary } from 'lucide-react'
import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const Sidebar = () => {
   return (
      <div className='flex'>
         <div className='hidden mt-16 lg:block w-[250px] sm:w-[300px] space-y-8 border-r-gray-300 dark:border-r-gray-700 bg-[#f0f0f0] p-5 fixed top-0 h-screen'>
            <div className='space-y-4'>
               <Link className='hover:bg-gray-300 rounded-md p-2 flex items-center gap-2 mb-4' to="/admin/dashboard">
                  <ChartNoAxesColumn size={22} />
                  <h1>DashBoard</h1>
               </Link >
               <Link className='hover:bg-gray-300 rounded-md p-2  flex items-center gap-2 mb-4' to="/admin/course">
                  <SquareLibrary size={22} />
                  <h1>Courses</h1>
               </Link>
            </div>
         </div>
         <div className='ml-[300px] w-full mt-20 '>
            <Outlet />
         </div>
      </div>
   )
}

export default Sidebar
