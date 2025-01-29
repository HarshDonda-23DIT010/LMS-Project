import express from 'express';
import upload from '../utils/multer.js'
import { deleteVideo, uploadMedia } from '../utils/cloudinary.js';
import { Lecture } from '../models/lecture.model.js';

const router = express.Router();

router.route('/:id/upload-video').post(upload.single("file"), async (req, res) => {
   try {
      const result = await uploadMedia(req.file.path);

      const lecture = await Lecture.findById(req.params.id)

      if (lecture) {

         await deleteVideo(lecture.publicId)
      }

      return res.status(200).json({
         success: true,
         data: result,
         message: 'File uploaded successfully',
      })
   } catch (e) {
      return res.status(500).json({
         message: "Error in uploading file",
      })
   }
})


export default router;