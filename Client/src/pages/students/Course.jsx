import { AvatarImage, AvatarFallback, Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import React from 'react'

function Course() {
  return (
    <Card className='overflow-hidden w-72 rounded-lg dark:bg-gray-800 bg-white shadow-lg hover:shadow-2xl trasnsform hover:scale-105 transition-transform duration-500'>
      <div className='relative'>
        <img
          src="https://jaygould.co.uk/static/a540c5d36e6d0b33716ed77fa4a00bc3/40601/react.png"
          className='w-full h-36 object-cover rounded-t-lg '
        />

      </div>
      <CardContent className='p-3'>
        <h1 className='hover:underline font-bold text-lg truncate'>React Js Full Course in Hindi 2k25</h1>
        <div className='flex items-center mt-3  justify-between'>
          <div className='flex items-center gap-2 '>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h1 className='font-medium text-sm'>Harsh Donda</h1>
          </div>
          <Badge className='bg-blue-600 text-white px-2 py-1 text-xs rounded-full hover:bg-blue-500 dark:bg-gray-700 dark:hover:bg-gray-600'>Medium</Badge>
        </div>
        <div className='flex items-center justify-between mt-3'>
          <span className='font-bold text-lg'>₹ 499</span>
        </div>
      </CardContent>
    </Card>
  )
}

export default Course
