import Promo from '../services/api/promocionales/index.js'
import Product from '../model/Product.js'
import productsHandler from './products.js'
import diccionarioPromos from '../services/api/promocionales/promosHomologation.js'
import Bottleneck from "bottleneck";
const channelPromos = "Q2hhbm5lbDoz"
const IMAGE_BASE_URL = 'https://www.catalogospromocionales.com'
const stockSettings = [{
  id: "V2FyZWhvdXNlOmIwZGNlZjQzLTZkZmYtNGUyMi04Mzg2LTc5MTQ4MDExMzI3OQ==",
  name: "Zona franca"
},
{
  id: "V2FyZWhvdXNlOjI4OWY3OGExLTg1YjEtNGJjMS1iZTljLTQ1OTFjMzBhNTU1ZQ==",
  name: "Transito"
},
{
  id: "V2FyZWhvdXNlOjliNDA4MzkwLTUwYjYtNGRmNS1hMzA0LWQ5YmE2YzYyNDc4Ng==",
  name: "Bodega local"
}
]
const limiter = new Bottleneck({
  maxConcurrent: 1,
  minTime: 1000
});

async function getCategoriasHomologadas(categoria) {
  try {
    const categoriaHomologada = diccionarioPromos["homologacion"].find(e => e.id == categoria.id);
    return categoriaHomologada.slugAveChildrent === '' ? categoriaHomologada.slugAve : categoriaHomologada.slugAveChildrent;
  } catch (e) {
    console.log(e)
    return { message: "error", error: e }
  }

}

async function loadCatalogoProductsPromos(){
try{
  const categoriasID = await Promo.getAllIdsCategories();
  for (let c = 2; c < categoriasID.length; c++) {
      console.log("categoria",c)
      let productFilter = categoriasID[c].id
      let products = await Promo.getProductsByCategory(productFilter)
      await loadProductsPromos(products,categoriasID[c]);
  }
  return {message:"ok"}
}catch(e){
  return {err:e}
}
}
async function loadProductsPromos(products,categoriasID){
try{
  for(let p= 0;p < products.length;p++){
    console.log("producto",p)
    var product = products[p];
    let checkProduct = await productsHandler.productExist(product.referencia);
    console.log("existe?",checkProduct)
    if(checkProduct === false){
      var descriptionProducto = product.descripcionProducto.replace(/(\r\n|\n|\r)/gm, "").replace(/"/g, '\\"');
      var collectionProduct = await productsHandler.getCollection(product.nombre);
      var categoriaProduct = await getCategoriasHomologadas(categoriasID);
      var categoriesFromSaelor = await productsHandler.getCategorieBySlug(categoriaProduct);
      let newProduct = new Product({
        name: productsHandler.cleanString(product.nombre),
        description: "",
        category: categoriesFromSaelor.id,
        collection: [`${collectionProduct}`],
        productType: "UHJvZHVjdFR5cGU6NA==",
        currency: "CO",
        raiting: 3,
        price:product.precio1,
        channelId: channelPromos,
        mediaUrl: IMAGE_BASE_URL + product.imageUrl,
        reference: product.referencia,
        sku: product.referencia,
        attributes: [],
        variants: [],
        metadata: [
          { key: "urlImageJPG", value: IMAGE_BASE_URL + product.imageUrl },
          { key: "referencia", value: product.referencia },
          { key: "precioSugerido", value: product.precio1 },
          { key: "descripcion", value: descriptionProducto },
          { key: "categoria", value: categoriesFromSaelor.name },
          { key: "distribuidor", value: "promos" }
        ]
      });
      var productsVariants = await Promo.getProductsVariantsByProduct(product.referencia);
        newProduct.variants = productsVariants["resultado"].map((e) => {
            return {
              sku: `${e.referencia}-promos-${e.id}`,
              name: product.nombre + "-" + e.color,
              price: product.precio1,
              currency: "CO",
              stocks: [
                {
                  quantity: e.bodegaZonaFranca ? e.bodegaZonaFranca : 0,
                  warehouse: stockSettings[0].id
                }, {
                  quantity: e.cantidadTransito ? e.cantidadTransito : 0,
                  warehouse: stockSettings[1].id
                },
                {
                  quantity: e.bodegaLocal ? e.bodegaLocal : 0,
                  warehouse: stockSettings[2].id
                }
              ],
              attributes:[{
                id:"QXR0cmlidXRlOjI=",
                plainText:`${e.color}`
              }],
              metadata: [
                { key: "urlImageJPG", value: IMAGE_BASE_URL + e.imageUrl },
                { key: "referencia", value: product.referencia },
                { key: "precioSugerido", value: e.precio1 },
                { key: "categoria", value: categoriesFromSaelor.name },
                { key: "distribuidor", value: "promos" },
                e.color ? { key: "color", value: e.color } : {},
                {key:"estadoOrden",value:e.estadoOrden},
                {key:"stockTotal",value:e.totalDisponible},
              ]
            }
          })
          console.log("product", newProduct)
      await limiter.schedule(() => productsHandler.createProduct(newProduct));
    }
  }
}catch(e){
  return {err:e}
}
}

async function loadProductsVariants(product,newProduct,categoria){
  var productsVariants = await Promo.getProductsVariantsByProduct(product.referencia);
  newProduct.variants = await productsVariants["resultado"].map(async(e) => {
      let checkProductVariant = await productsHandler.productVariantExist(`${e.referencia}-promos-${e.id}`)
      if(checkProductVariant === false){
      return {
        sku: `${e.referencia}-promos-${e.id}`,
        name: product.nombre + "-" + e.color,
        price: product.precio1,
        currency: "CO",
        stocks: [
          {
            quantity: e.bodegaZonaFranca ? e.bodegaZonaFranca : 0,
            warehouse: stockSettings[0].id
          }, {
            quantity: e.cantidadTransito ? e.cantidadTransito : 0,
            warehouse: stockSettings[1].id
          },
          {
            quantity: e.bodegaLocal ? e.bodegaLocal : 0,
            warehouse: stockSettings[2].id
          }
        ],
        attributes:[{
          id:"QXR0cmlidXRlOjI=",
          plainText:`${e.color}`
        }],
        metadata: [
          { key: "urlImageJPG", value: IMAGE_BASE_URL + e.imageUrl },
          { key: "referencia", value: product.referencia },
          { key: "precioSugerido", value: e.precio1 },
          { key: "categoria", value: categoria.name },
          { key: "distribuidor", value: "promos" },
          e.color ? { key: "color", value: e.color } : {},
          {key:"estadoOrden",value:e.estadoOrden},
          {key:"stockTotal",value:e.totalDisponible},
        ]
      }}
    })
    return newProduct;
}
export default {loadCatalogoProductsPromos };

