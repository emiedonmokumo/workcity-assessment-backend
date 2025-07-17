import mongoose, { Document, Schema } from 'mongoose';

export interface IClient extends Document {
  name: string;
  email?: string;
  phone?: string;
  address?: string;
}

const clientSchema = new Schema<IClient>({
  name: { type: String, required: true },
  email: String,
  phone: String,
  address: String,
});

export default mongoose.model<IClient>('Client', clientSchema);
