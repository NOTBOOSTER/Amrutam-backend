import mongoose from "mongoose";

const SpecialCommissionSchema = new mongoose.Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
  doctorCommission: {
    type: Number,
    required: true,
  },
  productCommission: {
    type: Number,
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
    required: true,
  },
});

const specialCommissionDb = mongoose.model(
  "specialcommission",
  SpecialCommissionSchema
);
export default specialCommissionDb;
