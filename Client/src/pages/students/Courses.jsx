import { Skeleton } from '@/components/ui/skeleton';
import React from 'react'
import Course from './Course';

function Courses() {
   const isLoading = false

   return (
      <div className='bg-gray-50 dark:bg-gray-950'>
         <div className='max-w-7xl mx-auto p-6'>
            <h1 className='font-bold text-3xl text-center mb-10 text-blue-700 dark:text-gray-200'>Our Courses</h1>
            <div className="flex flex-wrap justify-center gap-6">
               {
                  isLoading ? Array.from({ length: 8 }).map((_, i) => <CoursesSkeleton key={i} />) : (
                     <>
                        <Course />
                        <Course />
                        <Course />
                        <Course />
                        <Course />
                        <Course />
                     </>
                  )}
            </div>

         </div>
      </div>
   )
}

export default Courses;

const CoursesSkeleton = () => {
   return (
      <div className='bg-white w-72 shadow-md hover:shadow-lg transition-shadow rounded-lg overflow-hidden'>
         <Skeleton className='h-48 w-full bg-gray-200' />
         <div className='px-5 py-4 space-y-3'>
            <Skeleton className='h-6 w-3/4' />
            <div className='flex items-center justify-between'>
               <div className='flex items-center gep-3'>
                  <Skeleton className='h-4 w-4 mr-2 rounded-full' />
                  <Skeleton className='h-4 w-20' />
               </div>
               <Skeleton className='h-4 w-16' />
            </div>
            <Skeleton className='h-4 w-1/4' />
         </div>
      </div>
   )
}
