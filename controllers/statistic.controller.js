import statisticService from '../service/statistic.service'

class StatisticController {
  async summary(req, res, next) {
    const userId = req.user.id
    let countMonths = 6
    if (req.query.countMonths !== undefined) {
      countMonths = parseInt(req.query.countMonths)
    }
    const data = await statisticService.summary(userId, countMonths)
      res.json(data)
  }
}

export default new StatisticController