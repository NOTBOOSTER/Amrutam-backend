import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    doctrId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ['pending', 'paid','decline', 'failed'],
        default: 'pending',
    },
    date: {
        type: Date,
        required: true,
    },
});

const paymentDb = mongoose.model('payment', paymentSchema);
export default paymentDb