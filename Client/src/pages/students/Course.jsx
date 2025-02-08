import { AvatarImage, AvatarFallback, Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import React from 'react'
import { Link } from 'react-router-dom';

function Course({course , index}) {

  
  return (
    <Card className='overflow-hidden w-72 rounded-lg dark:bg-gray-800 bg-white shadow-lg hover:shadow-2xl trasnsform hover:scale-105 transition-transform duration-500'>
      <div className='relative'>
        <img
          src={course.courseThumbnail}
          className='w-full h-36 object-cover rounded-t-lg '
        />
      </div>
      <CardContent className='p-3'>
        <Link  to={`/course-detail/${course._id}`} >
        <h1 className='hover:underline hover:text-blue-600 font-bold text-lg truncate'>{course.courseTitle}</h1>
        </Link>
        <div className='flex items-center mt-3  justify-between'>
          <div className='flex items-center gap-2 '>
            <Avatar>
              <AvatarImage src={course?.creater?.photoUrl} alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h1 className='font-medium text-sm'>{course?.creater?.name}</h1>
          </div>
          <Badge className='bg-blue-600 text-white px-2 py-1 text-xs rounded-full hover:bg-blue-500 dark:bg-gray-700 dark:hover:bg-gray-600'>{course?.courseLevel}</Badge>
        </div>
        <div className='flex items-center justify-between mt-3'>
          <span className='font-bold text-lg'>₹ {course.coursePrice}</span>
        </div>
      </CardContent>
    </Card>
  )
}

export default Course
