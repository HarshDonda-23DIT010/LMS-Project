import {
   Table,
   TableBody,
   TableCaption,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table"
import { Button } from '@/components/ui/button'
import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { useGetCreaterCourseQuery } from "@/features/api/courseApi"
import { Edit } from "lucide-react"

const AddCourse = () => {
   const { data, isLoading, refetch } = useGetCreaterCourseQuery();

   useEffect(() => {
      refetch();
   }, [])

   const courses = data?.courses;
   const navigate = useNavigate()
   return (
      <div className='flex-1  mt16 mx-10'>

         <div className='mt-4'>
            <Button onClick={() => navigate('/admin/course/create')}>Create Course</Button>
         </div>
         {
            isLoading ? (
               <div className="flex items-center justify-center">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-500"></div>
               </div>
            ) : (
               <div className='mt-4 w-full'>
                  <Table>
                     <TableCaption>A list of your recent courses.</TableCaption>
                     <TableHeader>
                        <TableRow>
                           <TableHead className="">Title</TableHead>
                           <TableHead className="text-right">Price</TableHead>
                           <TableHead className='text-right'>Status</TableHead>
                           <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                     </TableHeader>
                     <TableBody>
                        {Array.isArray(courses) && courses.map((course) => (
                           <TableRow key={course._id}>
                              <TableCell >{course.courseTitle}</TableCell>
                              <TableCell className="text-right">{course.coursePrice || "NAN"}</TableCell>
                              <TableCell  
                                 className={`text-right ${course.isPublished ? "text-green-500" : "text-red-500"
                                    } `}
                              >
                                 {course.isPublished ? "Published" : "In Draft"}
                              </TableCell>

                              <TableCell className="text-right">
                                 <Button onClick={() => navigate(`/admin/course/${course._id}`)} variant='outline' className='shadow-md bg-gray-300'><Edit /></Button>
                              </TableCell>
                           </TableRow>
                        ))}
                     </TableBody>
                  </Table>

               </div>
            )
         }

      </div>
   )
}

export default AddCourse
