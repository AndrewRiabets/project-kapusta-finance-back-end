import jwt from 'jsonwebtoken'
import { createBlackList } from 'jwt-blacklist'

import TokenModel from '../models/token.model'

const blacklist = await createBlackList({
  daySize: 10000,
  errorRate: 0.001,
})

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '2h'})
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

  async removeToken(refreshToken, accessToken) {
    const tokenData = await TokenModel.deleteOne({refreshToken})
    const blackToken = await blacklist.add(accessToken)
        
    return tokenData
  }

  async findToken(refreshToken) {
    const tokenData = await TokenModel.findOne({refreshToken})
    return tokenData
  }

  async verifyAccessToken(token) {
    if (await blacklist.has(token)) {
      return null
    }
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
      return userData
    } catch (e) {
      return null
    }
  }

  verifyRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
      return userData
    } catch (e) {
      return null
    }
  }
}

export default new TokenService