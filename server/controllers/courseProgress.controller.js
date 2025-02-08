
import { Course } from "../models/course.model.js"
import { CourseProgress } from "../models/courseProgress.model.js";

export const getCourseProgress = async (req, res) => {
   try {
      
      const { courseId } = req.params;
      const userId = req.id;

      // stap -1 fetch the use course progress 
      let courseProgress = await CourseProgress.findOne({ courseId, userId });
         

      const courseDetails = await Course.findById(courseId).populate('lectures');

      if (!courseDetails) {
         return res.status(404).json({ message: "Course not found" })
      }

      //stap-2 if no course found, return course detail with the empty progress
      if (!courseProgress) {
         return res.status(200).json({
            data: {
               courseDetails,
               progress: [],
               completed: false
            }
         })
      }

      //stap-3 return the user's course progress along with the course detail
      return res.status(200).json({
         data: {
            courseDetails,
            progress: courseProgress.lectureProgress,
            completed: courseProgress.completed
         }
      })

   } catch (e) {
      console.log(e);
      res.status(500).json({ message: "Internal Server Error" });
   }
}

export const updateLectureProgress = async (req, res) => {
   try {

      const { courseId , lectureId } = req.params;
      const userId = req.id;

      //fetch or create course progress

      let courseProgress = await CourseProgress.findOne({ courseId, userId })

      if (!courseProgress) {
         //if no progress found create an new progress 
         courseProgress = new CourseProgress({ courseId, userId, lectureProgress: [], completed: false })
      }

      //find the lecture progress in the course progress
      const lectureIndex = courseProgress.lectureProgress.findIndex((lecture) => lecture.lectureId === lectureId)

      if (lectureIndex !== -1) {
         courseProgress.lectureProgress[lectureIndex].viewed = true
      } else {
         //add new lecture progress
         courseProgress.lectureProgress.push({ lectureId, viewed: true })
      }

      //if all lecture is complite 
      const lectureProgressLength = courseProgress.lectureProgress.filter((lectureProg) => lectureProg.viewed)

      const course = await Course.findById(courseId)

      if (course.lectures.length === lectureProgressLength.length) {
         courseProgress.completed = true
      }

      await courseProgress.save()

      return res.status(200).json({
         message: "Lecture Progress Updated Successfully",
      })

   } catch (e) {
      console.log(e);
      res.status(500).json({ message: "Internal Server Error" });
   }
}

export const markAsCompleted = async (req, res) => {
   try {
      const { courseId } = req.params;

      const userId = req.id;
      let courseProgress = await CourseProgress.findOne({courseId,userId})

      if(!courseProgress)
      {
         return res.status(404).json({
            message : "Course Progress not Found"
         })
      }

      courseProgress.lectureProgress.map((lectureProgress) => { 
         lectureProgress.viewed = true
      })

      courseProgress.completed = true;
      await courseProgress.save()
      return res.status(200).json({
         message: "Course Marked as Completed",
         })
   } catch (e) {
      console.log(e);
      res.status(500).json({ message: "Internal Server Error" });
   }
}

export const markAsIncompleted = async (req, res) => {
   try {
      const { courseId } = req.params;

      const userId = req.id;
      let courseProgress = await CourseProgress.findOne({courseId,userId})

      if(!courseProgress)
      {
         return res.status(404).json({
            message : "Course Progress not Found"
         })
      }

      courseProgress.lectureProgress.map((lectureProgress) => { 
         lectureProgress.viewed = false
      })

      courseProgress.completed = false;
      await courseProgress.save()
      return res.status(200).json({
         message: "Course Marked as Incompleted",
         })
   } catch (e) {
      console.log(e);
      res.status(500).json({ message: "Internal Server Error" });
   }
}

