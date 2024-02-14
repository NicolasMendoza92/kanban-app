import mongoose from "mongoose";

mongoose.set("strictQuery", false)

const MONGOKEY = process.env.MONGODB_URI

const connectMongoDB = async () => {
  if (MONGOKEY){
    await mongoose.connect(MONGOKEY)
  }else{
    console.log('No db key connection') 
  }
}

export default  connectMongoDB;