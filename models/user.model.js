import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const userSchema = new Schema({
  
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  name: {
    type: String,
  },
  
},{ versionKey: false })

const User = model('User', userSchema)
export default User