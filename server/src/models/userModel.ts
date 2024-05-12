import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  friends: mongoose.Types.ObjectId[];
  status: 'AVAILABLE' | 'BUSY';
}

const userSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true , select: false},
  friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  status: {
    type: String,
    enum: ['AVAILABLE', 'BUSY'],
    default: 'AVAILABLE',
  },
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;