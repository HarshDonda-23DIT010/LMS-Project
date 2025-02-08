import mongoose from "mongoose";

const lectureSchema = mongoose.Schema({
   lectureTitle:{
      type:String,
      required:true
   },
   videoUrl:{
      type:String,
   },
   publicId:{
      type:String,
   },
   isPreviewFree:{
      type:Boolean,
      default:false
   }

},{timestamps:true})

export const Lecture = mongoose.model("Lecture", lectureSchema);
