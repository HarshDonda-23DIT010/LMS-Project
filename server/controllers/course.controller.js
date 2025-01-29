import { Course } from "../models/course.model.js"
import { Lecture } from "../models/lecture.model.js";
import { deleteMedia, deleteVideo, uploadMedia } from "../utils/cloudinary.js";

export const createCourse = async (req, res) => {
   try {
      const { courseTitle, category } = req.body;
      if (!courseTitle || !category) {
         return res.status(400).json({
            message: "Course Tile and Catagory is required"
         });
      }

      const course = await Course.create({
         courseTitle,
         category,
         creater: req.id
      })

      return res.status(201).json({
         course,
         message: "Course created successfully"
      })
   } catch (e) {
      console.log(e);

      return res.status(500).json({
         message: "Failed to creating course",
      })
   }
}

export const getCreaterCourses = async (req, res) => {
   try {
      const userId = req.id;
      const courses = await Course.find({ creater: userId });
      if (!courses) {
         return res.status(404).json({
            courses: [],
            message: "No courses found"
         })
      }
      return res.status(200).json({
         courses: courses,
         message: "Courses found successfully"
      })
   } catch (e) {
      console.log(e);
      return res.status(500).json({
         message: "Failed to get course",
      })
   }
}

export const editCourse = async (req, res) => {
   try {
      const { courseTitle, subtitle, description, category, courseLevel, coursePrice } = req.body;
      const thumbnail = req.file;
      const course = await Course.findById(req.params.courseId);
      if (!course) {
         return res.status(404).json({
            message: "Course not found"
         })
      }
      let courseThumbnail;
      if (thumbnail) {
         if (course.courseThumbnail) {
            const publicId = course.courseThumbnail.split("/").pop().split(".")[0]
            await deleteMedia(publicId);
         }
         //uplode thumbnail 

         courseThumbnail = await uploadMedia(thumbnail.path);
      }

      const updeteData = {
         courseTitle: courseTitle,
         subtitle: subtitle,
         description: description,
         category: category,
         courseLevel: courseLevel,
         coursePrice: coursePrice,
         courseThumbnail: courseThumbnail?.secure_url,
      }
      const updatedCourse = await Course.findByIdAndUpdate(req.params.courseId, updeteData, { new: true })
      return res.status(200).json({
         message: "Course updated successfully",
         course: updatedCourse
      })

   } catch (e) {
      console.log(e);
      return res.status(500).json({
         message: "Failed update course",
      })
   }
}


export const getCourseById = async (req, res) => {
   try {
      const courseId = req.params.courseId;
      const course = await Course.findById(courseId);
      if (!course) {
         return res.status(404).json({
            message: "Course not found"
         })
      }
      // console.log(course);
      return res.status(200).json({

         message: "Course found",
         course: course
      })

   } catch (e) {
      return res.status(500).json({
         message: "Can't get course detail",
      })
   }
}



//lecture controller

export const createLecture = async (req, res) => {
   try {
      const { lectureTitle } = req.body;
      const { courseId } = req.params;

      if (!lectureTitle || !courseId) {
         return res.status(400).json({
            message: "provide lecture title and course id"
         })
      }

      //create lecture
      const lecture = await Lecture.create({ lectureTitle: lectureTitle })

      const course = await Course.findById(courseId)

      if (course) {
         course.lectures.push(lecture._id);
         await course.save();
      }
      return res.status(201).json({
         message: "Lecture created",
         lecture: lecture
      })



   } catch (e) {
      return res.status(500).json({
         message: "Faild to create lecture",
      })
   }
}


export const getCourseLecture = async (req, res) => {
   try {
      const { courseId } = req.params;
      const course = await Course.findById(courseId).populate("lectures");

      if (!course) {
         return res.status(404).json({
            message: "Course not found"
         })
      }
      return res.status(200).json({
         message: "Course lectures",
         lectures: course.lectures
      })

   } catch (e) {
      return res.status(500).json({
         message: "Faild to get lecture",
      })
   }
}

export const editLecture = async (req, res) => {
   try {
      const { lectureId, courseId } = req.params;
      const { lectureTitle, isPreviewFree, videoInfo } = req.body;
      const lecture = await Lecture.findById(lectureId)
      if (!lecture) {
         return req.status(404).json({
            message: "Lecture not found"
         })
      }
      //update lecture
      if (lectureTitle) lecture.lectureTitle = lectureTitle
      if (videoInfo?.videoUrl) lecture.videoUrl = videoInfo.videoUrl
      if (isPreviewFree) lecture.isPreviewFree = isPreviewFree
      if (videoInfo?.publicId) lecture.publicId = videoInfo.publicId

      await lecture.save()

      //course 
      const course = await Course.findById(courseId)
      if (course && !course.lectures.includes(lecture._id)) {
         course.lectures.push(lecture._id)
         await course.save()
      }

      return res.status(200).json({
         message: "Lecture updated successfully",
         lecture: lecture
      })
   } catch (e) {
      return res.status(500).json({
         message: "Faild to update lecture",
      })
   }
}

export const removeLecture = async (req, res) => {
   try {
      const { lectureId, courseId } = req.params;
      const lecture = await Lecture.findByIdAndDelete(lectureId)
      if (!lecture) {
         return res.status(404).json({
            message: "Lecture not found"
         })
      }
      //remove lecture from course
      const course = await Course.findById(courseId)
      if (course && course.lectures.includes(lecture._id)) {
         course.lectures.pull(lecture._id)
         await course.save()
      }
      //remove lecture
      if (lecture.publicId) {
         await deleteVideo(lecture.publicId)
      }



      return res.status(200).json({
         message: "Lecture removed successfully",
      })

   } catch (e) {
      return res.status(500).json({
         message: "Faild to remove lecture",
      })
   }
}

export const getLectureById = async (req, res) => {
   try {
      const { lectureId } = req.params;
      const lecture = await Lecture.findById(lectureId)
      if (!lecture) {
         return res.status(404).json({
            message: "Lecture not found"
         })
      }

      return res.status(200).json({
         message: "Lecture get successfully",
         lecture: lecture
      })

   } catch (e) {
      return res.status(500).json({
         message: "Faild to get lecture",
      })
   }
}

export const togglePublishCourse = async (req, res) => {
   try {
      const { courseId } = req.params;
      const { publish } = req.query; 
      const course = await Course.findById(courseId);
      if (!course) {
         return res.status(404).json({ message: "Course not found" });
      }

      course.isPublished = publish === 'true';
      await course.save();

      return res.status(200).json({
         message: `Course ${course.isPublished ? "Published" : "Unpublished"} successfully`,
         isPublished: course.isPublished,
      });

   } catch (e) {
      return res.status(500).json({ message: "Can't publish or unpublish the course" });
   }
};