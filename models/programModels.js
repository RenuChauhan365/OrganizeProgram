 import mongoose from "mongoose";
 
const programSchema = new mongoose.Schema({
  programName: {
    type: String,
    required: [true, "programName  is  required "],
  },
  image: {
    data:Buffer,
    contentType:String,
  },
  time: {
    type: String,
    required: [true, "time  is  required "],
  },

  location: {
    type: String,
    required: [true, "location  is  required "],
  },

  programCreatedBy :{
    type: mongoose.Types.ObjectId,
    ref :'Organization'
   }
}, {timestamps :true});

export default mongoose.model("Program", programSchema);
