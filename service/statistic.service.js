import TransactionModel from '../models/transaction.model'
import UserModel from '../models/user.model'
import CategoryModel from '../models/category.model'
import ApiError from '../exceptions/api.error'
import mongoose from 'mongoose'
import monthName from '../json/month.json'

class StatisticService {

  async summary(userId, countMonths) {
    const data = []
    for (let i = countMonths; i > 0; i -= 1) {
      const date = new Date()
      date.setMonth(date.getMonth() - i + 1)
      const startDate = new Date(date)
      const endDate = new Date(date)
      const monthNumber = date.getMonth()

      startDate.setDate(1)
      startDate.setHours(3, 0, 0)
      
      endDate.setMonth(date.getMonth() + 1)
      endDate.setDate(0)
      endDate.setHours(3, 0, 0)
   
      const result = await TransactionModel.aggregate([
        {$match: {
          "userId": new mongoose.Types.ObjectId(userId),
          "dateTransaction": { $gte: startDate, $lt: endDate}
        }},
        {$group : {
          _id: "$isProfit",
          totalAmount: { $sum: "$amount"},
          count: { $sum: 1 }, 
          }
        }
      ])
        
      const obj  = {
        id: i,
        description: monthName.ru[monthNumber] + ' ' + startDate.getFullYear(),
        profit: {...result.find(item => item._id)},
        costs: {...result.find(item => !item._id)},
      }

      data.push(obj)
    }
    return data
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