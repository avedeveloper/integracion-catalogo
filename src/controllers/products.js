import SaleorService from "../services/saleor/index.js";
import Product from "../model/Product.js";
async function createProduct(data){
try{
  const product = new Product(data);
  const saleor = new SaleorService();
  let token = await saleor.getToken();
  const productCreated = await saleor.setProduct(product);
  product.id = productCreated.data.productCreate.product.id
  const productChannelListing = await saleor.setProductChannelListing(product);
  const productVariants = product.variants.map(async (variant)=>{
    return await createVariantProduct(saleor,product,variant);
  })
  return {token,productCreated,productChannelListing,productVariants};
}catch(e){
  console.log(e)
  return e;
}
}
async function createVariantProduct(saleor,product, variant){
  try{
    const productVariant = await saleor.setVariantProduct(variant,product.id);
    if(productVariant.data.productVariantCreate.errors[0] !== undefined)return productVariant.data.productVariantCreate.errors[0];
    variant.id = productVariant.data.productVariantCreate.productVariant.id;
    await saleor.setProductVariantChannelListing(variant,product.channelId);
  }catch(errors){
    console.log(errors)
    return {errors};
  }
}
async function getProducts(channel,size,address){
  const saleor = new SaleorService();
  await saleor.getToken();
  const products = await saleor.getProducts(channel,size,address);
  return products;
}
async function getProduct(id,channel,address){
  const saleor = new SaleorService();
  await saleor.getToken();
  const product = await saleor.getProduct(id,channel,address);
  return product;
}

export default { createProduct,getProducts,getProduct};