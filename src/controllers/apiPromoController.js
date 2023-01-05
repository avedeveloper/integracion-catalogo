import Promo from '../services/api/promocionales/index.js'
import Product from '../model/product.js'
import productsHandler from './products.js'
import diccionarioPromos from '../services/api/promocionales/promosHomologation.js'
const channelPromos = "Q2hhbm5lbDoz"
const IMAGE_BASE_URL = 'https://www.catalogospromocionales.com'
async function getAllIdsCategories() {
  //conseguir las categorias existentes
  const categoriasID = await Promo.getAllIdsCategories();
  //luego de conseguir las categorias de promocionales, se obtienen los productos de cada categoria homologadas
  // const categories = await sortCategories(categoriasID);
  // const productsFilter = Promise.all(categoriasID.map(async (e) => {
  //     // obtener los productos de cada categoria
  //     const productos = await Promo.getProductsByCategory(e);
  //     // guardar cada producto
  //     productos.forEach(async (e) => {
  //     });
  //     return productos;
  //   })
  // )
  const productFilter = categoriasID[0].id
  const products = await Promo.getProductsByCategory(productFilter);
// convertir la descripcion del producto a un string de json
//quitarle los saltos de linea a la descripcion del producto
  const descriptionProducto = products[0].descripcionProducto.replace(/(\r\n|\n|\r)/gm, "").replace(/"/g, '\\"');
  let collectionProduct = await productsHandler.getCollection(products[0].nombre);
  let categoriaProduct = await getCategoriasHomologadas(categoriasID[0]);
  let categoriesFromSaelor = await productsHandler.getCategorieBySlug(categoriaProduct);
  console.log("categorias",categoriesFromSaelor)
  const product = new Product({
    name: productsHandler.cleanString(products[0].nombre),
    description: "",
    category: categoriesFromSaelor,
    collection:[`${collectionProduct}`],
    productType: "UHJvZHVjdFR5cGU6NA==",
    currency: "CO",
    raiting: 3,
    channelId:channelPromos,
    mediaUrl:IMAGE_BASE_URL+products[0].imageUrl,
    reference:products[0].referencia,
    sku:products[0].referencia,
    attributes:[],
    variants:[],
    metadata:[
    {key:"urlImageJPG", value:IMAGE_BASE_URL+products[0].imageUrl},
    {key:"referencia", value:products[0].referencia},
    {key:"precioSugerido",value:products[0].precio1},
  {key:"descripcion", value:descriptionProducto}    ]
  })
  const productCreated = await productsHandler.createProduct(product);
  return {message:"ok", productCreated}
  // return {message:"ok", descriptionProducto}
}
async function getCategoriasHomologadas(categoria){
try{ 
  const categoriaHomologada = diccionarioPromos["homologacion"].find(e => e.id == categoria.id);
  return categoriaHomologada.slugAveChildrent ===''? categoriaHomologada.slugAve : categoriaHomologada.slugAveChildrent;
}catch(e){
  console.log(e)
  return {message:"error",error:e}
}

}

function sortCategories(categories) {
  let categoriesSort = [];
  for(let i = 0; i < categories.length; i++){
    if(categories[i].idParent == null){
      categoriesSort.push({
        id:categories[i].id,
        name:categories[i].nombre,
        children:[]
      })
    }
    if(categories[i].idParent != null){
      categoriesSort.forEach((e)=>{
        if(e.id == categories[i].idParent){
          e.children.push({
            id:categories[i].id,
            name:categories[i].nombre
          })
        }
      })
    }
  }
  return categoriesSort;
}
export default { getAllIdsCategories };


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