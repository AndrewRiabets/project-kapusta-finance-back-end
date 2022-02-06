import mongoose from 'mongoose'
const { Schema, model } = mongoose

const transactionSchema = new Schema({
  
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
  },
  refreshToken: {
    type: String,
    required: true,
  },
  isProfit: {
    type: Boolean,
    default: false,
  },

  
},{ versionKey: false })

const Transaction = model('Transaction', transactionSchema)
export default Transaction