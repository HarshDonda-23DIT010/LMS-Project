import mongoose from 'mongoose'

const lectureProgressSchema = mongoose.Schema({
   lectureId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lecture',

   },
   viewed: {
      type: Boolean,
   }
})

const courseProgressSchema = mongoose.Schema({
   userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
   },
   courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
   },
   lectureProgress: {
      type: [lectureProgressSchema],
   },
   completed: {
      type: Boolean,
   }
})

export const CourseProgress = mongoose.model("CourseProgress" , courseProgressSchema);

export const LectureProgress = mongoose.model("LectureProgress", lectureProgressSchema);