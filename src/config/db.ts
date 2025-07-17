import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/workcity';
        await mongoose.connect(mongoURI);
        console.log('MongoDB connected successfully!');
    } catch (error: any) {
        console.error('Error connecting to MongoDB:', error.message);
    }
};

export const disconnectDB = async () => {
    await mongoose.connection.close();
};

export default connectDB;