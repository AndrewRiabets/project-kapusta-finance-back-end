import TransactionModel from '../models/transaction.model'
import UserModel from '../models/user.model'
import CategoryModel from '../models/category.model'
import ApiError from '../exceptions/api.error'
import mongoose from 'mongoose'

class StatisticService {

  async summary(userId) {

  }

  async test(userId) {
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

export default new StatisticService