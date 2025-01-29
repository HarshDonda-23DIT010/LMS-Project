import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Switch } from '@/components/ui/switch'
import { useEditLectureMutation, useGetLectureQuery, useRemoveLectureMutation } from '@/features/api/courseApi'
import axios from 'axios'
import { Loader } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'

const MEDIA_API = 'http://localhost:3000/api/v1/media'

const LectureTab = () => {
   const params = useParams()
   const { courseId, lectureId } = params
   const navigate = useNavigate()

   const [title, setTitle] = useState('');
   const [uploadVideoInfo, setUploadVideoInfo] = useState(null);  // Store video URL and publicId
   const [isFree, setIsfree] = useState(false);
   const [mediaProgress, setMediaProgress] = useState(false)
   const [uploadProgress, setUploadProgress] = useState(0)
   const [btnDisable, setBtnDisable] = useState(true)

   const { data: getdata, refetch } = useGetLectureQuery(lectureId);
   const lecture = getdata?.lecture;

   useEffect(() => {
      if (lecture) {
         setTitle(lecture.lectureTitle);
         setIsfree(lecture.isPreviewFree);
         setUploadVideoInfo({
            videoUrl: lecture.videoUrl,
            publicId: lecture.publicId
         })
      }
   }, [lecture])

   const fileChangeHandler = async (e) => {
      const file = e.target.files[0];
      if (file) {
         const formData = new FormData();
         setMediaProgress(true);
         formData.append("file", file);
         try {
            const res = await axios.post(`${MEDIA_API}/${lectureId}/upload-video`, formData, {
               onUploadProgress: ({ loaded, total }) => {
                  setUploadProgress(Math.round((loaded / total) * 100))
               }
            })
            if (res.data.success === true) {
               // Update the uploadVideoInfo state with new video URL and publicId
               setUploadVideoInfo({
                  videoUrl: res.data.data.url,
                  publicId: res.data.data.public_id
               });
               setBtnDisable(false)
               toast.success(res.data.message)
            }
         } catch (error) {
            console.log(error);
            toast.error("Video upload failed")
         } finally {
            setMediaProgress(false)
         }
      }
   }

   const [editLecture, { isLoading, isSuccess, data, error }] = useEditLectureMutation();

   const editLectureHandler = async () => {
      await editLecture({
         lectureTitle: title,
         isPreviewFree: isFree,
         videoInfo: uploadVideoInfo,  // Send updated video info
         courseId: courseId,
         lectureId: lectureId
      })
      refetch();
   }


   const [removeLecture, { isLoading: removeIsLoading, isSuccess: removeIsSuccess, error: removeError }] = useRemoveLectureMutation()

   useEffect(() => {
      if (removeIsSuccess) {
         toast.success("Lecture Removed Successfully")
         navigate(`/admin/course/${courseId}/lecture`);
      }
      if (removeError) {
         toast.error("Failed to remove lecture")
      }
   }, [removeIsSuccess, removeError])

   const removeLectureHandler = async () => {
      await removeLecture({ courseId, lectureId });
   }

   

   useEffect(() => {
      if (removeIsSuccess) {
         toast.success("Lecture Removed Successfully")
      }
      if (removeError) {
         toast.error(error.data.message || "can't romove lecture")
      }
   }, [removeIsSuccess])

   useEffect(() => {
      if (isSuccess) {
         toast.success(data.message || "Lecture Updated Successfully")
      }
      if (error) {
         toast.error(error.data.message || "Error Updating Lecture")
      }
   }, [isSuccess, error])

   return (
      <Card className='max-w-xl'>
         <CardHeader className='flex justify-between'>
            <div>
               <CardTitle>Edit Lecture</CardTitle>
               <CardDescription className='mt-2'>Make changes and click update when done!</CardDescription>
               <Button onClick={removeLectureHandler} className='mt-2 bg-red-500 hover:bg-red-600'>
                  {removeIsLoading ? (<><Loader className="w-4 animate-spin h-6" />please wait...</>) : 'Remove Lecture'}
               </Button>
            </div>
         </CardHeader>
         <CardContent className='flex flex-col gap-4'>
            <div>
               <Label>Lecture Title</Label>
               <Input
                  type='text'
                  placeholder='Ex. Introduction of course'
                  name='courseTitle'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
               />
            </div>
            <div>
               <Label>Lecture Video <span className='text-red-700'>*</span></Label>
               <Input
                  type='file'
                  onChange={fileChangeHandler}
                  name='courseVideo'
                  accept='video/*'
                  required
               />
            </div>
            {mediaProgress && (
               <div className='my-4'>
                  <Progress value={uploadProgress} className="w-[60%]" />
                  <p>{uploadProgress}% uploaded</p>
               </div>
            )}
            <div>
               <Switch id='free' value={isFree} checked={isFree} onCheckedChange={() => setIsfree(!isFree)} />
               <Label className='ml-2' htmlFor='free'>This lecture is FREE?</Label>
            </div>
            {uploadVideoInfo?.videoUrl && (
               <div>
                  <video src={uploadVideoInfo.videoUrl} autoPlay='true' controls />
               </div>
            )}
            <div>
               <Button onClick={editLectureHandler} className='w-fit bg-gray-700' disabled={isLoading || btnDisable}>
                  {isLoading ? <><Loader className="w-4 animate-spin h-6" />please wait...</> : 'Update Lecture'}
               </Button>
            </div>
         </CardContent>
      </Card>
   )
}

export default LectureTab
