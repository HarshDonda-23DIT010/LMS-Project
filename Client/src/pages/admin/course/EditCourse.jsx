import { Button } from '@/components/ui/button'
import React from 'react'
import { Link } from 'react-router-dom'
import CourseTab from './CourseTab'
import { Contact } from 'lucide-react'

const EditCourse = () => {
   return (
      <div className='ml-5 mr-5 flex-1'>
         <div className='flex items-center justify-between mb-5'>
            <h1 className='text-bold  text-center text-xl'>Add detail and information regarding course.</h1>
            <Link to='lecture'>
               <Button className='text-blue-500 hover:text-blue-700' variant='link'>Go to lectures page</Button>
            </Link>
         </div>
         <CourseTab />
      </div>
   )
}

export default EditCourse
