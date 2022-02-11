import Joi from 'joi'
import ApiError from '../exceptions/api.error'

export const summaryValidation = async (req, res, next) => {
  const schema = Joi.object({
    countMonths: Joi.number().max(30),
  })
  try {
    await schema.validateAsync(req.query)
  } catch (e) {
    return next(ApiError.BadRequest(e.details[0].message))
  }
  next()
}