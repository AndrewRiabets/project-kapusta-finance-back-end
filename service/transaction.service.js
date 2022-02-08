import TransactionModel from '../models/transaction.model'
import UserModel from '../models/user.model'
import ApiError from '../exceptions/api.error'
import mongoose from 'mongoose'

class TransactionService {

  async addTransaction(userId, body) {
    const transaction = await TransactionModel.create({userId, ...body})
    if (!transaction) {
      throw ApiError.NotImplemented('Ошибка добавления транзакции')
    }
    const user = await UserModel.findById(userId)
    
    if(transaction.isProfit) {
      const balance = user.balance + transaction.amount
      user.balance =  balance.toFixed(2)
    } else {
      const balance = user.balance - transaction.amount
      user.balance = balance.toFixed(2)
    }
    await user.save()
    const data = await this.getAll(userId)
        
    return { total: user.balance, data}
  }

  async getAll(userId) {
  const transactions = await TransactionModel.find({userId}).sort({dateTransaction: -1 })
      // .distinct("description")
    
    // const transactions = await TransactionModel.find({userId}).count({$sum: "amount"})
    //, {date: { $gte: start, $lt: end } } //, "isProfit": true
       
    return transactions
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
