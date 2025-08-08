import mongoose from "mongoose";

const faqSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
    trim: true,
  },
  answer: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    enum: ["consumer", "doctor"],
    required: true,
  },
  category: {
    type: String,
    enum: ["consultation", "shop", "wallet", "forum", "additional"],
    required: true,
  },
  order: {
    type: Number,
    default: 0,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const faqDb = mongoose.model("faq", faqSchema);
export default faqDb;
