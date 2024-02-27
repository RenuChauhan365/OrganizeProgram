import mongoose from "mongoose";


const organizationSchema = new mongoose.Schema({
  OrganizationName: {
    type: String,
    required: [true, "organizationName  is  required "],
  }
}, {timestamps :true});

export default mongoose.model("Organization", organizationSchema);
