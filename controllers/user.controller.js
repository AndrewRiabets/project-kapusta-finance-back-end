import userService from "../service/user.service"

class UserController {

  async registration(req, res, next) {
    try {
      const {email, password} = req.body
      const userData = await userService.registration(email, password)
      res.cookie('refreshToken', userData.refreshToken, {maxAge: 2592000000, httpOnly: true})
      return res.status(200).json(userData)
    } catch (e) {
     next(e)
    }
  }

  async login(req, res, next) {
    try {
      
    } catch (e) {
      next(e)
    }
  }

  async logout(req, res, next) {
    try {
      
    } catch (e) {
      next(e)
    }
  }

  async activate(req, res, next) {
    try {
      
    } catch (e) {
      next(e)
    }
  }

  async refresh(req, res, next) {
    try {
      
    } catch (e) {
      next(e)
    }
  }

  async getUsers(req, res, next) {
    try {
      res.json({message: 'USERS'})
    } catch (e) {
      next(e)
    }
  }
}

export default new UserController