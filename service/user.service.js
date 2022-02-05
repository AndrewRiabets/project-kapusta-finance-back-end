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

  async login(email, password) {
    const user = await UserModel.findOne({ email })
    if (!user) {
      throw ApiError.BadRequest('Ошибка авторизации')
    }
    const isEquals = await bcrypt.compare(password, user.password)
    if(!isEquals) {
      throw ApiError.BadRequest('Ошибка авторизации')
    }
    const payload = {id: user._id, email: user.email}
    const tokens = tokenService.generateTokens(payload)
    await tokenService.saveToken(user._id, tokens.refreshToken)
    return {...tokens, user: payload}
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken)
    return token
  }

  async refresh(refreshToken) {
    if(!refreshToken) {
      throw ApiError.UnauthorizedError()
    }
    const userData = tokenService.verifyRefreshToken(refreshToken)
    const tokenFromDb = await tokenService.findToken(refreshToken)
    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError()
    }
    const user = await UserModel.findById(userData.id)
    const payload = {id: user._id, email: user.email}
    const tokens = tokenService.generateTokens(payload)
    await tokenService.saveToken(user._id, tokens.refreshToken)
    return {...tokens, user: payload}
  }

  async getAllUsers(){
    const users = await UserModel.find()
    return users
  }

  async saveNewToken(user) {
    const payload = {id: user._id, email: user.email}
    const tokens = tokenService.generateTokens(payload)
    await tokenService.saveToken(user._id, tokens.refreshToken)
    return {...tokens, user: payload}
  }

}

export default new UserService