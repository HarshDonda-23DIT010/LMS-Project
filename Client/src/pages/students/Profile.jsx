import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader } from 'lucide-react'
import { CoursesSkeleton } from './MyLearning'
import Course from './Course'
import { useLoadUserQuery, useUpdateUserMutation } from '@/features/api/authApi'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'

function Profile() {
   const [name, setName] = useState("")
   const [photo, setPhoto] = useState("")


   const [updateUser, { data: updateUserData, isError, isLoading: updateUserIsLoading, isSuccess, error }] = useUpdateUserMutation();
   const { data, isLoading, refetch } = useLoadUserQuery();

   console.log(data)
   const user = data?.user
   
   const navigate = useNavigate()
   const onChangeHandler = (e) => {
      const file = e.target.files?.[0]
      if (file) {
         setPhoto(file)
      }
   }
   const updateUserHandler = async () => {
      const formData = new FormData();
      formData.append("name", name)
      formData.append("profilePhoto", photo)
      await updateUser(formData);
   }
   useEffect(() => {
      refetch()
   }, [])

   useEffect(() => {
      if (isSuccess) {
         refetch();
         toast.success(data.message || "Profile Updated")
      }
      if (isError) {
         toast.error(error.message || "faild to update profile")
      }
   }, [error, updateUserData, isError, isLoading, isSuccess])


   return (

      <div className='my-24  mx-auto w-90%'>
         <div className=' md:ml-24'>

            <h1 className='font-bold  text-2xl text-center md:text-left '>
               PROFILE
            </h1>
            <div className='flex flex-col md:flex-row items-center md:items-start gap-5 my-5'>
               <div className='flex flex-col items-center '>
                  <Avatar className='w-24 h-26 md:w-40 md:h-40 mb-4'>
                     <AvatarImage src={user?.photoUrl || "https://github.com/shadcn.png"} alt="@shadcn" />
                     <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
               </div>
               <div>
                  <div className='mb-4'>
                     <h1 className='font-bold text-gray-900 dark:text-gray-100 '>

                        Name: <span className='font-normal to-gray-700 dark:to-gray-300 ml-2'>{user.name}</span>
                     </h1>
                  </div>
                  <div className='mb-4'>
                     <h1 className='font-bold text-gray-900 dark:text-gray-100 '>

                        Email: <span className='font-normal to-gray-700 dark:to-gray-300 ml-2'>{user.email}</span>
                     </h1>
                  </div>
                  <div className='mb-4'>
                     <h1 className='font-bold text-gray-900 dark:text-gray-100 '>

                        role: <span className='font-normal to-gray-700 dark:to-gray-300 ml-2'>{user.role}</span>
                     </h1>
                  </div>
                  <Dialog >
                     <DialogTrigger asChild>
                        <Button className="bg-gray-400 hover:bg-gray-300" variant="outline">Edit Profile</Button>
                     </DialogTrigger>
                     <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                           <DialogTitle>Edit profile</DialogTitle>
                           <DialogDescription>
                              Make changes to your profile here. Click save when you're done.
                           </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                           <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="name" className="text-right">
                                 Name
                              </Label>
                              <Input
                                 id="name"
                                 onChange={(e) => setName(e.target.value)}
                                 placeholder="Harsh Donda"
                                 className="col-span-3"
                              />
                           </div>
                           <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="photo" className="text-right">
                                 Photo
                              </Label>
                              <Input
                                 onChange={onChangeHandler}
                                 id="photo"
                                 accept='image/*'
                                 className="col-span-3"
                                 type='file'
                              />
                           </div>
                        </div>
                        <DialogFooter >
                           <Button disabled={updateUserIsLoading} type="button" className="bg-gray-400 hover:bg-gray-300" onClick={(event) => { updateUserHandler();}} >
                              {
                                 updateUserIsLoading ? (
                                    <>
                                       <Loader className="w-4 animate-spin h-6" /> please wait..
                                    </>
                                 ) : (
                                    'Save Changes'
                                 )

                              }
                           </Button>
                        </DialogFooter>
                     </DialogContent>
                  </Dialog>
               </div>
            </div>
         </div>
         <div className='w-90% mx-12 px-4  my-10 md:px-0'>
            <h1 className='font-medium text-center text-lg'>Courses you're enroolled in </h1>
            <div className='my-5'>
               {isLoading ? (
                  <CoursesSkeleton />
               ) : (
                  user.enrolledCourses.length === 0 ? (
                     <p className='text-center'>You are not enrolled in any course</p>
                  ) : (
                     <div className="flex flex-wrap justify-center gap-6">
                        {user.enrolledCourses.map((course, index) => (
                           <Course course={course} key={course._id} />
                        ))}
                     </div>
                  )
               )}
            </div>
         </div>
      </div>

   )
}

export default Profile
