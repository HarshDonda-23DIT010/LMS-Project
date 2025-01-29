import { Edit } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Lecture = ({ data, index }) => {
   const navigate = useNavigate();
   return (
      <div className='flex max-w-3xl items-center justify-between bg-[#e8edf0] dark:bg-[#1a1a1a] px-4 py-2 rounded-md my-2'>
         <h1 className='font-bold text-gray-700 dark:text-gray-300'>Lecture - {index+1} : {data.lectureTitle}</h1>
         <Edit
            size={20}
            onClick={()=>{navigate(`${data._id}`)}}
            className='cursor-pointer text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
         />
      </div>
   )
}

export default Lecture
