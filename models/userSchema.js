import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
  },
  image:{
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    unique: true,
    sparse: true,
  },
  password: {
    type: String,
  },
  otp: {
    type: String,
    select: false,
  },
  otpExpiresAt: {
    type: Date,
    select: false,
  },
  is_online:{
    type: String,
    default: "0",
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
},
{
  timestamps: true,
});

export default mongoose.model('User', userSchema);
