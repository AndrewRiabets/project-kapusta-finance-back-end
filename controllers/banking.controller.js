 import transactionService from '../service/transaction.service'
 import categoryService from '../service/catagory.service'
 
  class BankingController {

    async insert(req, res) {
      const data = await transactionService.addTransaction(req.user.id, req.body)
      res.json(data)
    }

    async getExpense(req, res) {
      const data = await transactionService.getAll(req.user.id, false)
      res.json(data)
    }

    async getIncome(req, res) {
      const data = await transactionService.getAll(req.user.id, true)
      res.json(data)
    }

    async remove(req, res) {
      const data = await transactionService.remove(req.body.transactionId, req.user.id)
      res.json(data)
    }

    async update(req, res) {
      const data = await transactionService.remove(req.body.transactionId, req.user.id)
      res.json(data)
    }

    async update(req, res) {
      
    }
    async getCategory(req, res) {
      const data = await categoryService.getCategory(req.query.isProfit)
      res.json(data)
    }
  }

  export default new BankingController
