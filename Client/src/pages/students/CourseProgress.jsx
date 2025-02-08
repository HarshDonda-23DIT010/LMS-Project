import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useCompleteCourseMutation, useGetCourseProgressQuery, useIncompleteCouresMutation, useUpdateLectureProgressMutation } from '@/features/api/courseProgressApi'
import { CheckCircle, PlayCircle } from 'lucide-react'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

const CourseProgress = () => {
  const params = useParams()
  const { courseId } = params;

  const [updateLectureProgress] = useUpdateLectureProgressMutation()

  const [currentLecture, setCurrentLecture] = useState(null)


  const { data, refetch } = useGetCourseProgressQuery(courseId);

  console.log(data);

  const courseDetails = data?.data?.courseDetails;
  const progress = data?.data?.progress;
  const completed = data?.data?.completed;

  console.log(completed);

  const initialLecture = currentLecture || courseDetails?.lectures && courseDetails?.lectures[0];


  const lectureHandler = (lecture) => {
    setCurrentLecture(lecture);
  }

  const isLectureCompleted = (lectureId) => {
    return progress.some((prog) => prog.lectureId === lectureId && prog.viewed)
  }

  const updateLectureProgressHandler = async (lectureId) => {
    await updateLectureProgress({ lectureId, courseId });
    refetch();
  }

  const [completeCourse] = useCompleteCourseMutation();
  const [incompleteCourse] = useIncompleteCouresMutation();

  const completeHandler = async () => {
    await completeCourse(courseId);
    refetch();
  }
  const incompleteHandler = async () => {
    await incompleteCourse(courseId);
    refetch();
  }
  const courseHandler = async () => {
    if (completed) {
      incompleteHandler();
    } else {
      completeHandler();
    }
  }


  return (
    <div className='max-w-7xl mt-20 mx-auto p-4'>
      <div className='flex justify-between mb-4'>
        <h1 className='font-bold text-2xl'>{courseDetails?.courseTitle}</h1>
        <Button
          onClick={courseHandler}
        >
          {
            completed ? ("Re Watch") : (<><CheckCircle className='dark:text-black text-white mr-1' size={20} />Complete Course</>)
          }
        </Button>
      </div>
      <div className='flex flex-col justify-between md:flex-row gap-10'>
        <div className=' w-full lg:w-fit  h-fit rounded-md shadow-lg p-4'>
          <video
            src={initialLecture?.videoUrl || currentLecture?.video}
            controls
            onPlay={() => updateLectureProgressHandler(currentLecture?._id || initialLecture?._id)}
          />
          <Separator className='my-2' />
          <p className='font-semibold'>Lecture Name : <span className='font-bold'>{initialLecture?.lectureTitle || currentLecture?.lectureTitle}</span></p>
        </div>
        <div className='w-full md:w-1/2 flex flex-col   gap-3 shadow-lg rounded-lg'>
          <div className='p-4'>
            <h1 className='text-xl font-bold' >Course Lectures</h1>
            <Separator className='my-2' />
            <div className='flex-1 overflow-y-auto '>
              {courseDetails?.lectures.map((lecture) => (
                <Card onClick={() => lectureHandler(lecture)} key={lecture._id} className='hover:bg-gray-300 dark:hover:bg-gray-700 mb-3 hover:cursor-pointer transition transform-cpu shadow-lg'>
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center w-[250px]"> {/* Fixed width prevents growth */}
                      {/* Icon stays in place */}
                      {isLectureCompleted(lecture?._id) ? (
                        <CheckCircle className="text-green-700  mr-2 flex-shrink-0" size={20} />
                      ) : (
                        <PlayCircle className="flex-shrink-0" size={24} />
                      )}

                      {/* Title wraps without affecting layout */}
                      <CardTitle
                        className={`text-lg ml-3 ${isLectureCompleted(lecture?._id) ? 'text-green-700' : 'dark:text-white text-black'}`}
                        style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '180px' }}
                      >
                        {lecture?.lectureTitle}
                      </CardTitle>
                    </div>

                    {/* Completed Badge (Stays fixed in size) */}
                    {isLectureCompleted(lecture?._id) && (
                      <Badge className="bg-green-700 hover:bg-green-800 flex-shrink-0">Completed</Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseProgress
