import {Router} from 'express';
import SaleorService from '../services/saleor/index.js';
var router = Router();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
}
);


router.post('/products',async function(req, res,next) {
  try{
  const saleorService = new SaleorService();
  const token = await saleorService.getToken();
  const products = await saleorService.getProducts();
  res.send({products,token, desc:JSON.stringify(`{"time": 1670651475205, "blocks": [{"id": "VoMHpf3HsZ", "data": {"text": "Prueba de producto promocionales descripci\u00f3n"}`)});

  }catch(err){
  console.log(err);
  next(err);
  }
})
export default router;