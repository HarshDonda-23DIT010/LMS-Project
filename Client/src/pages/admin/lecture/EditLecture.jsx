import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import React from 'react'
import { Link, useParams } from 'react-router-dom'
import LectureTab from './LectureTab'

const EditLecture = () => {
   const params = useParams()
   const courseId = params.courseId
   return (
      <>
      <div className='mt-5 ml-10 flex justify-between items-center mb-5'>
         <div className='flex items-center'>
            <Link to={`/admin/course/${courseId}/lecture`} >
               <Button variant='outline' className='shadow-md rounded-full'>
                  <ArrowLeft size={16} />
               </Button>
            </Link>
            <h1 className='text-xl ml-5 font-semibold'>Update Your Lecture</h1>
         </div>
      </div>
         <div className='ml-10'>
            <LectureTab/>
         </div>
         </>
   )
}

export default EditLecture
