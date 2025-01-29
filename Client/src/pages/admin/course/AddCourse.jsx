import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
   Select,
   SelectContent,
   SelectGroup,
   SelectItem,
   SelectLabel,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select"
import { useCreateCourseMutation } from '@/features/api/courseApi'
import { Loader } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const AddCourse = () => {
   const [title, setTitle] = useState("");
   const [category, setCategory] = useState("");

   //backend intigration 
   const [createCourse, { data, error, isLoading, isSuccess }] = useCreateCourseMutation();

   const navigate = useNavigate()

   const createCourseHandler = async () => {
      await createCourse({ courseTitle: title, category })
   }

   //useEffect for tost
   useEffect(()=>{
      if(isSuccess){
         toast.success(data?.message || "Course Created")
      }
   },[isSuccess,error])

   const getSelectedCategory = (value) => {
      setCategory(value);
   }

   return (
      <div className='flex-1  mt16 mx-10'>
         <div className='mb-4 w-full'>
            <h1 className='font-bold text-xl'>Lets add course, add some basic course detail for your new course.</h1>
            <p className='text-sm'>Build High-Quality Courses for Effective Knowledge Transfer</p>
         </div>
         <div>
            <div className='space-y-4 mb-3 flex-1'>
               <Label>Title</Label>
               <Input
                  type='text'
                  name='courseTitle'
                  placeholder='Course Title'
                  onChange={(e) => setTitle(e.target.value)}
                  className='w-72 mt-3 shadow-md '
               />
            </div>
            <div className='space-y-4'>
               <Label>Category</Label>
               <Select onValueChange={getSelectedCategory}>
                  <SelectTrigger className="w-52">
                     <SelectValue placeholder="Select a Course Category" />
                  </SelectTrigger>
                  <SelectContent>
                     <SelectGroup>
                        <SelectLabel>Category</SelectLabel>
                        <SelectItem value="Next JS">Next JS</SelectItem>
                        <SelectItem value="Data Science">Data Science</SelectItem>
                        <SelectItem value="Frontend Development">Frontend Development</SelectItem>
                        <SelectItem value="Backend Development">Backend Development</SelectItem>
                        <SelectItem value="MERN Stack Development">MERN Stack Development</SelectItem>
                        <SelectItem value="Gen AI">Gen AI</SelectItem>
                        <SelectItem value="Machine Learning">Machine Learning</SelectItem>
                        <SelectItem value="Cloud Computing">Cloud Computing</SelectItem>
                        <SelectItem value="Computer Architecture">Computer Architecture</SelectItem>
                        <SelectItem value="Software Engineering">Software Engineering</SelectItem>
                     </SelectGroup>
                  </SelectContent>
               </Select>
            </div>
            <div className='mt-6 flex gap-11'>
               <Button onClick={() => navigate('/admin/course')} className='shadow-md' variant='outline'>Back</Button>
               <Button onClick={()=>{createCourseHandler(); navigate("/admin/course")}} disabled={isLoading}>
                  {
                     isLoading ? (
                        <>
                           <Loader className="w-4 animate-spin h-6" /> please wait..
                        </>
                     ) : (
                        'Create'
                     )

                  }
               </Button>
            </div>
         </div>
      </div>

   )
}

export default AddCourse
