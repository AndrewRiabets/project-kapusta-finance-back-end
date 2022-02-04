import jwt from 'jsonwebtoken'
import TokenModel from '../models/token.model'

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '10m'})
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'})
    return {
      accessToken,
      refreshToken,
    }
  }

  async saveToken(userId, refreshToken) {
    const tokenData = await TokenModel.findOne({userId})
    if(tokenData) {
      tokenData.refreshToken = refreshToken
      return await tokenData.save()
    }
    const token = await TokenModel.create({userId, refreshToken})
    return token
  }
}

export default new TokenService