import mongoose from 'mongoose'



const connectDB = async () => {
   try {
      await mongoose.connect(process.env.MONGO_URI)
      console.log("MongoDB is connected")
   } catch (e) {
      console.log("error occured" , e)
   }
}

export default connectDB 