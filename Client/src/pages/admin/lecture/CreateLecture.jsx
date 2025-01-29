import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCreateLectureMutation, useGetCourseLectureQuery } from '@/features/api/courseApi';
import { Loader } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import Lecture from './Lecture';

function CreateLecture() {
   const params = useParams()
   const courseId = params.courseId

   const [lectureTitle, setLectureTitle] = useState();

   const [createLecture, { data, isLoading, isSuccess, error }] = useCreateLectureMutation()

   const { data: getData, isLoading: getIsLoading, isSuccess: getIsSuccess, error: getError,refetch } = useGetCourseLectureQuery(courseId);


   const createLectureHandler = async () => {
      await createLecture({ lectureTitle, courseId });
   }

  useEffect(()=>{
   refetch()
  },[])

   useEffect(() => {
      if (isSuccess) {
         refetch()
         toast.success(data.message || "Lecture Created")
      }
      if (error) {
         toast.error(error.data.message || "Lecture not created")
      }
   }, [isSuccess, error])

   const navigate = useNavigate();



   return (
      <div className='flex-1  mt16 mx-10'>
         <div className='mb-4 w-full'>
            <h1 className='font-bold text-xl'>Let's add lecture, add some basic lecture detail for your course.</h1>
            <p className='text-sm'>Build High-Quality Lecture for Effective Knowledge Transfer</p>
         </div>
         <div>
            <div className='space-y-4 mb-3 flex-1'>
               <Label>Lecture Name</Label>
               <Input
                  type='text'
                  name='courseTitle'
                  placeholder='Lecture Title'
                  value={lectureTitle}
                  onChange={(e) => setLectureTitle(e.target.value)}
                  className='w-96 mt-3 shadow-md '
               />
            </div>
            <div className='mt-6 flex gap-11'>
               <Button className='shadow-md' onClick={() => { navigate(`/admin/course/${courseId}`) }} variant='outline'>Back to Course</Button>
               <Button onClick={createLectureHandler} >
                  {
                     isLoading ? (
                        <>
                           <Loader className="w-4 animate-spin h-6" /> please wait..
                        </>
                     ) : (
                        'Create Lecture'
                     )
                  }
               </Button>
            </div>
         </div>
         <div className='mt-10'>
            <h2 className='font-bold mb-2 text-lg'>Lecture Details</h2>
            {
               getIsLoading ? (<Loader className='justify-center items-center' />) : (
                  getError ? (<p className='text-sm text-red-200'>Failed to Load Lectures</p>) : (
                     getData.lectures.length === 0 ? (<p>Lectures is Not Available</p>) : (
                        getData.lectures.map((lecture, index) => {
                           return <Lecture data={lecture} index={index}/>
                        })
                     )
                  )
               )
            }
         </div>
      </div>
   )
}

export default CreateLecture 
