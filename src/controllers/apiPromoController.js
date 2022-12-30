import Promo from '../services/api/promocionales/index.js'

async function getAllIdsCategories() {
  const promos = await Promo.getAllIdsCategories();
  return promos;
}

export default { getAllIdsCategories };


