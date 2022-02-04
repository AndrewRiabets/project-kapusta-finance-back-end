import bcrypt from 'bcrypt'
import UserModel from '../models/user.model'
import ApiError from '../exceptions/api.error'
import tokenService from './token.service'

class UserService {

  async registration(email, password) {
    const candidate = await UserModel.findOne({ email })
    if (candidate) {
      throw ApiError.BadRequest(`Пользователь с адрессом ${email} уже существует`)
    }
    const hashPassword = await bcrypt.hash(password, 5)
    const user = await UserModel.create({email, password: hashPassword})
    const payload = {id: user._id, email: user.email}
    const tokens = tokenService.generateTokens(payload)
    await tokenService.saveToken(user._id, tokens.refreshToken)
    return {...tokens, user: payload}
  }
}

export default new UserService