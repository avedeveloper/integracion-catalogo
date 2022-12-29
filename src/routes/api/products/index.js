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

// router.post("/create", async (req, res,next) => {
//   // const {body} = req;
//   // const {product} = body;
//   // if(!product){
//   //   next("product is required");
//   // }
//   let data = {
//     name: "test desde backend",
//     description: JSON.stringify("test desde admin ave backend"),
//     category: "Q2F0ZWdvcnk6Mg==",
//     collection:["Q29sbGVjdGlvbjoz"],
//     productType: "UHJvZHVjdFR5cGU6NA==",
//     raiting: 3,
//     channelId:"Q2hhbm5lbDoz",
//     variants:[{
//       sku:"test dinamico sku",
//       price: 10,
//       currency: "CO",
//       name: "test dinamico",
//       stocks:[{
//         quantity: 10,
//         warehouse:"V2FyZWhvdXNlOmIwZGNlZjQzLTZkZmYtNGUyMi04Mzg2LTc5MTQ4MDExMzI3OQ=="
//       }],
//       attributes:[{
//         id:"QXR0cmlidXRlOjI=",
//         plainText:"rojo"
//       }]
//     }]
//   }
//   const productCreated = await product.createProduct(data);
//   res.send({ productCreated });
// });

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