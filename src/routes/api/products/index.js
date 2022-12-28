import { Router } from "express";
import product from "../../../controllers/products.js";
const router = Router();

router.post("/", async (req, res,next) => {
  const {body} = req;
  // const {channel, size} = body;
  // if(!channel || !size){
  //   next("channel and size are required");
  // }
  const products = await product.getProducts("promos", 10);
  res.send({ products,token });
});

router.post("/create", async (req, res,next) => {
  // const {body} = req;
  // const {product} = body;
  // if(!product){
  //   next("product is required");
  // }
  let data = {
    name: "test desde backend",
    description: JSON.stringify("test desde admin ave backend"),
    category: "Q2F0ZWdvcnk6Mg==",
    collection:["Q29sbGVjdGlvbjoz"],
    productType: "UHJvZHVjdFR5cGU6NA==",
    raiting: 3,
    channelId:"Q2hhbm5lbDoz",
    variants:[{
      sku:"test dinamico sku",
      price: 10,
      currency: "CO",
      name: "test dinamico",
      stocks:[{
        quantity: 10,
        warehouse:"V2FyZWhvdXNlOmIwZGNlZjQzLTZkZmYtNGUyMi04Mzg2LTc5MTQ4MDExMzI3OQ=="
      }],
      attributes:[{
        id:"QXR0cmlidXRlOjI=",
        plainText:"rojo"
      }]
    }]
  }
  const productCreated = await product.createProduct(data);
  res.send({ productCreated });
});

router.post('/product',async(req,res,next)=>{
  const {body} = req;
  const {id} = body;
  if(!id){
    next("id is required");
  }
  const saleor = new SaleorService();
  await saleor.getToken();
  const product = await saleor.getProduct(id);
  res.send({product});
})
router.post('/setProduct',async (req,res,next)=>{
  const {body} = req;
  const {product} = body;
  if(!product){
    next("product is required");
  }

  res.send({address});
})

router.post('/isAvaiable',async (req,res,next)=>{
  const {body} = req;
  const {product} = body;
  if(!product){
    next("product is required");
  }
  const saleor = new SaleorService();
  await saleor.getToken();
  const address = await saleor.getAddress(product);
  res.send({address});

})

router.post('/categories', async (req,res,next)=>{
  const saleor = new SaleorService();
  await saleor.getToken();
  const categories = await saleor.getCategories();
  res.send({categories});
})

router.post('/category', async (req,res,next)=>{
  const {body} = req;
  const {id} = body;
  if(!id){
    next("id is required");
  }
  const saleor = new SaleorService();
  await saleor.getToken();
  const category = await saleor.getCategory(id);
  res.send({category});
})

router.post('/variantsProducts',async (req,res,next)=>{
  const {body} = req;
  const {channel,size} = body;
  if(!channel || !size){
    next("channel and size are required");
  }
  const saleor = new SaleorService();
  const variantsProducts = await saleor.getVariantsProducts(channel,size);
  res.send({variantsProducts});
})

export default router;