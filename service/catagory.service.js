import CategoryModel from '../models/category.model'

class CategoryService {

  async getCategory(isProfit) {
    const data = await CategoryModel.find({isProfit}).sort({categoryName: 1 })
    return data
  }
  
}
export default new CategoryService
