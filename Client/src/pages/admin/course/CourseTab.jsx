import RichTextEditor from '@/components/RichTextEditor'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useEffect, useState } from 'react'
import {
   Select,
   SelectContent,
   SelectGroup,
   SelectItem,
   SelectLabel,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select"
import { Loader, Loader2 } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { useEditCourseMutation, useGetCourseByIdQuery, usePublishCourseMutation } from '@/features/api/courseApi'
import { toast } from 'sonner'

const CourseTab = () => {

   const params = useParams()
   const courseId = params.courseId


   const [previewThumbnail, setPreviewThumbnail] = useState("");


   const [input, setInput] = useState({
      courseTitle: '',
      subtitle: '',
      description: '',
      category: '',
      courseLevel: '',
      coursePrice: '',
      courseThumbnail: '',
   });


   const { data: getData, isLoading: getIsLoading, refetch } = useGetCourseByIdQuery(courseId, { refetchOnMountOrArgChange: true });

   const course = getData?.course
   useEffect(() => {
      if (!getIsLoading && course) {
         setInput({
            courseTitle: course.courseTitle || "",
            subtitle: course.subtitle || "",
            description: course.description || "",
            category: course.category || "",
            courseLevel: course.courseLevel || "",
            coursePrice: course.coursePrice || "",
            courseThumbnail: course.courseThumbnail || "",
         });
         setPreviewThumbnail(course.courseThumbnail)
      }
   }, [course]);


   useEffect(() => {
      refetch();
   }, [])



   const changeEventHandler = (e) => {
      const { name, value } = e.target
      setInput({ ...input, [name]: value })
   }

   const [editCourse, { data, isLoading, isSuccess, error }] = useEditCourseMutation()

   //select form drop down
   const selectCategory = (value) => {
      setInput({ ...input, category: value })
   }
   const selectLevel = (value) => {
      setInput({ ...input, courseLevel: value })
   }

   const selectThumbnail = (e) => {
      const file = e.target.files?.[0]
      if (file) {
         setInput({ ...input, courseThumbnail: file })
         const fileReader = new FileReader();
         fileReader.onloadend = () => {
            setPreviewThumbnail(fileReader.result)
         }
         fileReader.readAsDataURL(file);
      }
   }

   const updateCourseHandler = async () => {
      const formData = new FormData();
      formData.append('courseTitle', input.courseTitle);
      formData.append('subtitle', input.subtitle);
      formData.append('description', input.description);
      formData.append('category', input.category);
      formData.append('courseLevel', input.courseLevel);
      formData.append('coursePrice', input.coursePrice);
      formData.append('courseThumbnail', input.courseThumbnail);

      await editCourse({ formData, courseId });
   }

   useEffect(() => {
      if (isSuccess) {
         toast.success(data?.message || "Course Updeted.")
      }
      if (error) {
         toast.error(error?.data?.message || "Faild to updete course.")
      }
   }, [isSuccess, error])


   const [publishCourse, { isLoading: publishLoading }] = usePublishCourseMutation();

   const publishStatusHandler = async () => {
      if (!course) return;

      const newStatus = !course.isPublished; 
      try {
         await publishCourse({ id: courseId, query: newStatus.toString() }).unwrap();
         toast.success(`Course ${newStatus ? "Published" : "Unpublished"} successfully.`);

         setInput((prev) => ({ ...prev, isPublished: newStatus }));
         refetch()
      } catch (error) {
         toast.error(error?.data?.message || "Failed to update publish status.");
      }
   };

   const navigate = useNavigate()

   return (
      <Card disabled={getIsLoading}>
         <CardHeader className='flex flex-row justify-between '>
            <div>
               <CardTitle>Basic Course Information</CardTitle>
               <CardDescription>Make changes to your courses here. Click save when you're done.</CardDescription>
            </div>
            <div className='flex gap-4'>
               <Button
                  variant='outline'
                  className='bg-gray-300 shadow-sm'
                  onClick={publishStatusHandler}
                  disabled={publishLoading || course?.lectures.length === 0}
               >
                  {publishLoading ? (
                     <>
                        <Loader className="w-4 animate-spin h-6" /> Processing...
                     </>
                  ) : (
                     course?.isPublished ? "Unpublish" : "Publish"
                  )}
               </Button>

               <Button>
                  Remove Course
               </Button>
            </div>
         </CardHeader>
         <CardContent>
            <div className='space-y-4 mt-5'>
               <div>
                  <Label>Title</Label>
                  <Input
                     type='text'
                     placeholder='Ex. MERN Stack Development'
                     name='courseTitle'
                     value={input.courseTitle}
                     onChange={changeEventHandler}
                  />
               </div>
               <div>
                  <Label>Subtitle</Label>
                  <Input
                     type='text'
                     placeholder='Ex. Become a Mern Stack developer from zero to hero in 2 months.'
                     name='subtitle'
                     value={input.subtitle}
                     onChange={changeEventHandler}
                  />
               </div>
               <div>
                  <Label>Description</Label>
                  <RichTextEditor input={input} setInput={setInput} />
               </div>
               <div className='flex items-center gap-5'>
                  <div>
                     <Label>Category</Label>
                     <Select value={input.category} onValueChange={selectCategory}>
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
                  <div>
                     <Label>Course Level</Label>
                     <Select value={input.courseLevel} onValueChange={selectLevel}>
                        <SelectTrigger className="w-52">
                           <SelectValue placeholder="Select a Course Level" />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectGroup>
                              <SelectLabel>Course Level</SelectLabel>
                              <SelectItem value="Beginner">Beginner</SelectItem>
                              <SelectItem value="Medium">Medium</SelectItem>
                              <SelectItem value="Advance">Advance</SelectItem>
                           </SelectGroup>
                        </SelectContent>
                     </Select>
                  </div>
                  <div>
                     <Label>Course Price(INR)</Label>
                     <Input
                        type='number'
                        placeholder='Ex. 5000/-'
                        name='coursePrice'
                        value={input.coursePrice}
                        onChange={changeEventHandler}
                     />
                  </div>
               </div>
               <div>
                  <Label>Course Thumbnail</Label>
                  <Input
                     type='file'
                     accept='image/*'
                     name='courseThumbnail'
                     onChange={selectThumbnail}
                     className='w-fit'
                  />
                  {
                     previewThumbnail && (
                        <img src={previewThumbnail} alt="Course Image" className='mt-5 w-64 my-2 rounded-md' />
                     )
                  }
               </div>
               <div className='flex gap-6'>
                  <Button variant='outline' className='bg-gray-300 shadow-sm' onClick={() => { navigate("/admin/course") }} >Back</Button>
                  <Button onClick={updateCourseHandler} disabled={isLoading}>
                     {
                        isLoading ? (
                           <>
                              <Loader className="w-4 animate-spin h-6" /> please wait..
                           </>
                        ) : (
                           'save'
                        )

                     }
                  </Button>
               </div>

            </div>
         </CardContent>
      </Card>
   )
}

export default CourseTab
