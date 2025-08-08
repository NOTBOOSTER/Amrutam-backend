import mongoose from "mongoose";

const specialCouponSchema = new mongoose.Schema({
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true,
    },
    limit: {
        type: Number,
        required: true,
    },
    percentage: {
        type: Number,
        required: true,
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
        required: true,
    },
});

const specialCouponDb = mongoose.model('specialcoupon', specialCouponSchema);
export default specialCouponDb