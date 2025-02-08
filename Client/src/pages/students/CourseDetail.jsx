import BuyCourseBtn from '@/components/BuyCourseBtn';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useGetCourseDetailWithStatusQuery } from '@/features/api/purchaseApi';
import { BadgeInfo, LockIcon, PlayCircle } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const CourseDetail = () => {
   const param = useParams();
   const { courseId } = param;
   const navigate = useNavigate();

   const { data,refetch } = useGetCourseDetailWithStatusQuery(courseId);
   const [lecture, setLecture] = useState(null);

   console.log(data);
   
   // Extract course data safely
   const course = data?.course;
   const purchased = data?.purchased;
   const lectures = course?.lectures || [];

   // Ensure we have valid lectures before accessing index [0]
   const firstLecture = lectures.length > 0 ? lectures[0] : null;

   const lectureHandler = (selectedLecture) => {
      if (selectedLecture?.isPreviewFree) {
         setLecture(selectedLecture);
      }
   };

   useEffect(()=>{
      refetch();
   } ,[])

   return (
      <div className="mt-20 space-y-5">
         {/* Course Header */}
         <div className="bg-[#2d2f31] text-white">
            <div className="max-w-7xl mx-auto px-4 py-8 md:px-8 flex flex-col gap-2">
               <h1 className="font-bold text-2xl md:text-3xl">{course?.courseTitle || 'Course Title'}</h1>
               <p className="text-base md:text-lg">{course?.subtitle || 'No subtitle available'}</p>
               <p>
                  Created by{' '}
                  <span className="text-[#989de4] underline italic">{course?.creater?.name || 'Unknown Instructor'}</span>
               </p>
               <div className="flex items-center gap-2 text-sm">
                  <BadgeInfo size={16} />
                  <p>Last updated {course?.updatedAt?.split('T')[0] || 'N/A'}</p>
               </div>
               <p>Student Enrolled: {course?.enrollerStudent?.length || 0}</p>
            </div>
         </div>

         {/* Course Details Section */}
         <div className="max-w-7xl mx-auto my-5 px-4 md:px-8 flex flex-col lg:flex-row justify-between gap-10">
            {/* Left Side - Course Description & Lectures */}
            <div className="w-full lg:w-1/2 space-y-5">
               <h1 className="font-bold text-xl md:text-2xl">Description</h1>
               <p dangerouslySetInnerHTML={{ __html: course?.description || 'No description available.' }} />

               <Card>
                  <CardHeader>
                     <CardTitle>Course Content</CardTitle>
                     <CardDescription>{lectures.length} lectures</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                     {lectures.length > 0 ? (
                        lectures.map((lectureItem, index) => (
                           <div key={index} className="flex items-center gap-3 text-sm">
                              <span>{lectureItem?.isPreviewFree ? <PlayCircle /> : <LockIcon />}</span>
                              <p className="cursor-pointer hover:underline" onClick={() => lectureHandler(lectureItem)}>
                                 {lectureItem?.lectureTitle || 'Untitled Lecture'}
                              </p>
                           </div>
                        )) 
                     ) : (
                        <p>No lectures available.</p>
                     )}
                  </CardContent>
               </Card>
            </div>

            <div className="w-full lg:w-1/3">
               <Card>
                  <CardContent className="p-4 flex flex-col">
                     <div className="w-full aspect-video mb-4">
                        {firstLecture?.videoUrl ? (
                           <video src={lecture?.videoUrl || firstLecture.videoUrl} controls />
                        ) : (
                           <div className="text-center bg-gray-200 py-10">No video available</div>
                        )}
                     </div>
                     <h1>{lecture?.lectureTitle || firstLecture?.lectureTitle}</h1>
                     <Separator className="my-2" />
                     <h1 className="text-lg md:text-xl font-semibold">₹ {course?.coursePrice }</h1>
                  </CardContent>
                  <CardFooter className="flex justify-center p-4">
                     {purchased ? (
                        <Button onClick={() => navigate(`/course-progress/${courseId}`)} className="w-full">
                           Continue Course
                        </Button>
                     ) : (
                        <BuyCourseBtn courseId={courseId} />
                     )}
                  </CardFooter>
               </Card>
            </div>
         </div>
      </div>
   );
};

export default CourseDetail;
