import SaleorService from "../services/saleor/index.js";
import Product from "../model/Product.js";

async function createProduct(data){
try{
  const product = new Product(data);
  const saleor = new SaleorService();
  await saleor.getToken();
  const productCreated = await saleor.setProduct(product);
  if(productCreated.data.productCreate.errors[0] !== undefined || productCreated.data.productCreate === undefined)return {errors:productCreated.data.productCreate.errors[0]};
  product.id = productCreated.data.productCreate.product.id
  await saleor.createMediaProduct(product);
  await saleor.setProductChannelListing(product);
  if(product.variants.length > 0){
    product.variants.map(async (variant)=>{
      return await createVariantProduct(saleor,product,variant);
    })
  }
  return {msg:"product created"};
}catch(e){
  console.log(e)
  return e;
}
}
async function createVariantProduct(saleor,product, variant){
  try{
    const productVariant = await saleor.setVariantProduct(variant,product.id);
    if( productVariant.data.productVariantCreate === undefined ||productVariant.data.productVariantCreate.errors !== undefined)return {errors:productVariant.data.productVariantCreate.errors};
    variant.id = productVariant.data.productVariantCreate.productVariant.id;
    await saleor.setProductVariantChannelListing(variant,product.channelId);
  }catch(errors){
    console.log(errors)
    return {errors};
  }
}
async function getProducts(channel,size,address,after){
  const saleor = new SaleorService();
  await saleor.getToken();
  let products = null
  let cursor = after === undefined ? '' : after;
  if(!(channel === "" || channel === undefined)){
    products = await saleor.getProductsWithChannel(channel,size,address,cursor);
  }else{
    products = await saleor.getProducts(size,address,cursor);
  }
  return products;

}
async function getProduct(id,channel,address){
  const saleor = new SaleorService();
  await saleor.getToken();
  const product = await saleor.getProduct(id,channel,address);
  return product;
}

async function updateProduct(id, newProduct){
  const saleor = new SaleorService();
  await saleor.getToken();
  const product = await saleor.updateProduct(id,newProduct);
  if(newProduct.hasOwnProperty('channel')){
    await saleor.updateProductChannelListing(id,newProduct.channel);
  }
  if(newProduct.hasOwnProperty('variants')){
    newProduct.variants.map(async (variant)=>{
      return await updateVariantProduct(saleor,id,variant);
    })
  }
  return {msg:"product updated"};
}
async function updateVariantProduct(saleor,id, variant){
  try{
    
    await saleor.updateVariantProduct(id,variant);
    if(variant.hasOwnProperty('channel')){
      await saleor.setProductVariantChannelListing(id,variant);
    }
  }catch(errors){
    console.log(errors)
    return {errors};
  }
}
async function getCollection(data){
  try{
    const saleor = new SaleorService();
    await saleor.getToken();
    data = data.toLowerCase();
    if(data.includes("oferta")){
      data = "oferta"
    }else if(data.includes("produccion nacional"))
    {
      data = "produccion-nacional"
    }else
    if(data.includes("precio neto")){
      data = "precio-neto"
    }else{
      data = "precio-bruto"
    }
    console.log("productsmodel",data)
    const collection = await saleor.getCollection(data);
    return collection.data.collection.id;
  }catch(e){
    console.log(e)
    return e;
  }
}
function cleanString(str){
  str = str.toLowerCase();
  str = str.replace(/\"/g," ");
  if(str.includes("oferta")){
    str = str.replace("oferta","")}
  if (str.includes("produccion nacional")){
    str = str.replace("produccion nacional","")
  }
  if(str.includes("precio neto")){
    str = str.replace("precio neto","")
  }
 return str;
}
async function getCategorieBySlug(slug){
  const saleor = new SaleorService();
  await saleor.getToken();
  const category = await saleor.getCategorieBySlug(slug);
  return {id:category.data.category.id,name:category.data.category.name};
}
async function productExist(ref){
  const saelor = new SaleorService();
  await saelor.getToken();
  const product = await saelor.getProductByReference(ref)
  return product.data.products.edges.length > 0;
}
async function productVariantExist(sku){
  const saelor = new SaleorService();
  await saelor.getToken();
  const product = await saelor.getProductVariantBySKU(sku)
  return product.data.productVariant !== null;
}
export default { createProduct,getProducts,getProduct,updateProduct,getCollection,cleanString,getCategorieBySlug,productExist,productVariantExist};