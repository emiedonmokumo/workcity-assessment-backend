import mongoose, { Document, Schema } from 'mongoose';

export interface IProject extends Document {
    title: string;
    description?: string;
    client: mongoose.Types.ObjectId;
    budget?: number;
    status?: 'pending' | 'ongoing' | 'completed';
}

const projectSchema = new Schema<IProject>({
    title: { type: String, required: true },
    description: String,
    client: { type: Schema.Types.ObjectId, ref: 'Client', required: true },
    budget: Number,
    status: { type: String, enum: ['pending', 'ongoing', 'completed'], default: 'pending' },
});

export default mongoose.model<IProject>('Project', projectSchema);
