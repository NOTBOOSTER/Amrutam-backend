import mongoose from "mongoose";

const StatsSchema = new mongoose.Schema({
    day: {
        type: Date,
        required: true
    },
    couponsclicks: {
        type: Number,
        required: true,
        default: 0
    },
    orders: {
        type: Number,
        required: true,
        default: 0
    },
    revenue: {
        type: Number,
        required: true,
        default: 0
    },
    doctors: {
        type: Number,
        required: true
    }
});

const statsDb = mongoose.model('Stats', StatsSchema);
export default statsDb