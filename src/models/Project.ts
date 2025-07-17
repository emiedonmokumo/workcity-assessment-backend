import mongoose, { Document, Schema } from 'mongoose';

export interface IProject extends Document {
    title: string;
    description?: string;
    client: mongoose.Types.ObjectId;
    budget?: number;
    status?: 'Pending' | 'Ongoing' | 'Completed';
}

const projectSchema = new Schema<IProject>({
    title: { type: String, required: true },
    description: String,
    client: { type: Schema.Types.ObjectId, ref: 'Client', required: true },
    budget: Number,
    status: { type: String, enum: ['Pending', 'Ongoing', 'Completed'], default: 'Pending' },
});

export default mongoose.model<IProject>('Project', projectSchema);
