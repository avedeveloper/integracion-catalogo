import categoriesDB from '../model/Categories.js';

async function normalizationCategories(categories) {
categories.map((e) => {
    return categoriesDB.findeOne({name:e.name})
})
}
export default { normalizationCategories };