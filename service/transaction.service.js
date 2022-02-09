import TransactionModel from '../models/transaction.model'
import UserModel from '../models/user.model'
import CategoryModel from '../models/category.model'
import ApiError from '../exceptions/api.error'
import mongoose from 'mongoose'

class TransactionService {

  async addTransaction(userId, body) {
    const transaction = await TransactionModel.create({userId, ...body})
    if (!transaction) {
      throw ApiError.NotImplemented('Ошибка добавления транзакции')
    }
    const { isProfit } = body
    const user = await UserModel.findById(userId)
    if(isProfit) {
      const balance = user.balance + transaction.amount
      user.balance = balance.toFixed(2)
    } else {
      const balance = user.balance - transaction.amount
      user.balance = balance.toFixed(2)
    }
    await user.save()
    return await this.getAll(userId, isProfit)
  }

  async remove(transactionId, userId) {
    const transaction = await TransactionModel.findOneAndRemove({ _id: transactionId })
    if (!transaction) {
      throw ApiError.NotImplemented('Ошибка удаления транзакции')
    }
    const isProfit = transaction.isProfit
    const user = await UserModel.findById(userId)
    if(isProfit) {
      const balance = user.balance - transaction.amount
      user.balance = balance.toFixed(2)
    } else {
      const balance = user.balance + transaction.amount
      user.balance = balance.toFixed(2)
    }
    await user.save()
    return await this.getAll(userId, isProfit)
  }

  async getAll(userId, isProfit) {
  const data = await TransactionModel.find({userId, isProfit}).sort({createdAt: -1 })
  const user = await UserModel.findById(userId)
  return { total: user.balance, data}
      // .distinct("description")
    
    // const transactions = await TransactionModel.find({userId}).count({$sum: "amount"})
    //, {date: { $gte: start, $lt: end } } //, "isProfit": true
  }

  async recalculateAmount(userId) {
    const result = await TransactionModel.aggregate([
      {$match: {"userId": new mongoose.Types.ObjectId(userId)}},
      {$group : {
          _id: "$isProfit",
          totalAmount: { $sum: "$amount"},
          count: { $sum: 1 }, 
        
       }
      }
    ])
    const profit = result.find(item => item._id === true).totalAmount
    const costs = result.find(item => item._id === false).totalAmount
    return profit - costs
  }
}

export default new TransactionService
