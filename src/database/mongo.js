import mongoose from 'mongoose';
import { mongouri } from '../utils/loadEnv.js';

const connectDB = async () => {
    try {
        await mongoose.connect(mongouri);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};


export default connectDB;