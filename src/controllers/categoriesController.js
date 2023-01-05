import categoriesDB from '../model/Categories.js';
import SaleorService from "../services/saleor/index.js";
async function normalizationCategories(categories) {
categories.map((e) => {
    return categoriesDB.findeOne({name:e.name})
})
}
async function getCategories(cetegories){
    return await categoriesDB.find({name:{$in:cetegories}})
}
export default { normalizationCategories,getCategories };