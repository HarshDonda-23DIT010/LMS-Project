import React from 'react'
import Course from './Course'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetPurchasedCoursesQuery } from '@/features/api/purchaseApi'

function MyLearning() {
   const { data  , isLoading} = useGetPurchasedCoursesQuery();
   console.log(data);

   return (
      <div className='w-90% mx-12 px-4 mt-24 my-10 md:px-0'>
         <h1 className='font-bold text-center text-2xl'>MY LEARNING</h1>
         <div className='my-5'>
            {isLoading ? (
               <CoursesSkeleton />
            ) : (
               data?.purchasedCourses.length === 0 ? (
                  <p className='text-center'>You are not enrolled in any course</p>
               ) : (
                  <div className="flex flex-wrap justify-center gap-6">
                     {data?.purchasedCourses.map((course, index) => (
                        <Course key={index} course={course.courseId} />
                     ))}
                  </div>
               )
            )}
         </div>
      </div>

   )
}

export default MyLearning

export
   const CoursesSkeleton = () => {
      return (
         <div className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
               <div key={index} className="bg-white w-full shadow-md hover:shadow-lg transition-shadow rounded-lg overflow-hidden">
                  <Skeleton className="h-48 w-full bg-gray-200" />
               </div>
            ))}
         </div>

      )
   }