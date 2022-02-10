import statisticService from '../service/statistic.service'

class StatisticController {
  async summary(req, res, next) {
    const userId = req.user.id
    const data = await statisticService.summary(userId)
      res.json(data)
  }

}

export default new StatisticController