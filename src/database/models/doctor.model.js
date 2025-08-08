import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  specialization: {
    type: [String],
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  wallet : {
    type: Number,
    required: true,
    default: 0
  },
  joinDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const doctorDb = mongoose.model("Doctor", doctorSchema);

export default doctorDb;
