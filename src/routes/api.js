import {Router} from 'express';
var router = Router();
import promoController from '../controllers/apiPromoController.js'
// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
}
);

router.get('/', async (req, res) => {
  const promos = await promoController.loadCatalogoProductsPromos();
  res.json(promos);
})



export default router;