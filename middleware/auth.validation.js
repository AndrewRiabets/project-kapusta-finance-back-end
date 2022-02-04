import Joi from 'joi'

export const authValidation = async (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(3).max(12),
  })
  try {
    await schema.validateAsync(req.body)
  } catch (e) {
    return res.status(400).json({ message: e.details[0].message})
  }
  next()
}