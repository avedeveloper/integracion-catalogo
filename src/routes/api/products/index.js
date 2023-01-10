import { Router } from "express";
import product from "../../../controllers/products.js";
const router = Router();

router.post("/", async (req, res, next) => {
  const { body } = req;
  const { channel, size, address, after } = body;
  console.log(channel, size, address)
  if (!size || !address) {
    next("channel and size are required");
  }
  try {
    const products = await product.getProducts(channel, size, address, after);
    res.send({ products });
  } catch (err) {
    next(err);
  }
});

router.post("/create", async (req, res,next) => {
  const {body} = req;
  const {product} = body;
  if(!product){
    next("product is required");
  }
  const productCreated = await product.createProduct(product);
  res.send({ productCreated });
});

router.post('/product', async (req, res, next) => {
  const { body } = req;
  const { id, channel, address } = body;
  if (!id || !channel || !address) {
    next("id,channel and address are required");
  }
  try {
    const data = await product.getProduct(id, channel, address);
    res.send({ data });
  } catch (err) {
    next(err);
    console.log(err)
  }
})

router.post('/productUpdate', async (req, res, next) => {
  const { body } = req;
  const { product,id } = body;
  if (!product)next("product is required");
  try {
    const data = await product.updateProduct(id,product);
    res.send({ data });
  } catch (err) {
    next(err);
  }
})


export default router;