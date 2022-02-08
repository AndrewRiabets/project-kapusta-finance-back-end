 import transactionService from "../service/transaction.service"

  class BankingController {

    async insert(req, res, next) {
      try {
        const result = await transactionService.addTransaction(req.user.id, req.body)
        res.json({ ...result })
      } catch (e) {
        next(e)
      }
    }
    async remove(req, res, next) {
      try {
        
      } catch (e) {
        next(e)
      }
    }
    async update(req, res, next) {
      try {
        
      } catch (e) {
        next(e)
      }
    }
    async get(req, res, next) {
      try {
        
      } catch (e) {
        next(e)
      }
    }
  }

  export default new BankingController
