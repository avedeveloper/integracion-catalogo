/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern } from '@nestjs/microservices';
import { PromosService } from './promos/promos.service';
@Controller()
export class AppController {
  constructor(
    private readonly aphService: AppService,
    private readonly promos: PromosService,
  ) { }
  @EventPattern('home')
  async handleHome(data: any) {
    const res = await this.aphService.home(data);
    return res;
  }
  @EventPattern('get_logs')
  async handleGetLogs(data: any) {
    const res = await this.aphService.getLogs(data);
    return res;
  }
  @EventPattern('get_products')
  async handleGetProducts(data: any) {
    const res = await this.aphService.getProducts(data);
    return res;

  }
  @EventPattern('get_product')
  async handleGetProduct(data: any) {
    const res = await this.aphService.getProduct(data);
    return res;
  }
  @EventPattern('search_product')
  async handleSearchProduct(data: any) {
    const res = await this.aphService.searchProduct(data);
    return res;
  }
  @EventPattern('get_variants')
  async handleGetVariants(data: any) {
    const res = await this.aphService.getVariants(data);
    return res;
  }
  @EventPattern('get_proveedores')
  async handleGetProveedores(data: any) {
    const res = await this.aphService.getProveedores(data);
    return res;
  }
  @EventPattern('get_proveedor')
  async handleGetProveedor(data: any) {
    const res = await this.aphService.getProveedor(data);
    return res;
  }
  @EventPattern('get_categories')
  async handleGetCategories(data: any) {
    const res = await this.aphService.getCategories(data);
    return res;
  }
  @EventPattern('set_category')
  async handleSetCategory(data: any) {
    const res = await this.aphService.setCategory(data);
    return res;
  }
  @EventPattern('load')
  async handleLoads() {
    try {
      const proveedor = '5691faaf-9ef8-4c64-8264-9ef99b6d8334'
      const locations= [
        {id:'0994b3d5-becd-401f-983f-47447352ce19',name:'local'},
        {id:'9b245cdf-acc8-4655-9738-ee432f654e20',name:'ZonaFranca'},
        {id:'a5db0dfa-2d96-4950-b382-839b3acfd6ae',name:'transito'},
        {id:'3b257993-638c-4505-ad1d-5a6dd24d9ac5',name:'total'},
      ]
      const categorias = await this.promos.getCategories();
      for (let i = 0; categorias.length > i; i++) {
        await new Promise((resolve) => setTimeout(resolve, 250));
        const categoriaHomologada = <any>await this.promos.getCategoriasHomologadas(categorias[i]);
        const { id_categorias } = await this.aphService.getCategoryBySlug(categoriaHomologada);
        if (id_categorias !== undefined) {
          const products = await this.promos.getProductsByCategory(categorias[i]);
          for (let j = 0; products.length > j; j++) {
            await new Promise((resolve) => setTimeout(resolve, 250));
            const checkProduct = await this.aphService.checkProduct(products[j].referencia)
            if (!(checkProduct.length>0)) {
              console.log("entro a checkProduct",checkProduct.length>0)
              const aux = await this.promos.clearName(products[j].nombre);
              const price = products[j].peso1 >= 0 ? products[j].precio1 : products[j].precio2 >= 0 ? products[j].precio2 : products[j].precio3 >= 0 ? products[j].precio3 : products[j].precio4 >= 0 ? products[j].precio4 : products[j].precio5 >= 0 ? products[j].precio5 : 0;
              const productaux = {
                nombre: aux.str,
                referencia: products[j].referencia,
                descripcion: products[j].descripcionProducto.replace(/(\r\n|\n|\r)/igm, "").replace(/"/ig, '\\"'),
                metadata: null,
                precio: products[j].precio,
                channel: 'promocionales',
                disponible: true,
                is_published: true,
                peso: 0,
                category_id: id_categorias,
                product_class_id: null,
                proveedor: proveedor,
                price: null,
                collection_id: aux.collection
              }
              const price_db = await this.aphService.setPrice({ price, currency: 'COP', type: null, metadata: null, productId: null });
              productaux.price = price_db.id_price;
              const productDB = await this.aphService.setProduct(productaux);
              price_db.productId = productDB.id_productos;
              await this.aphService.updatePrice(price_db);
              await new Promise((resolve) => setTimeout(resolve, 200));
              const variants = await this.promos.getStock(products[j]);
              for (let k = 0; variants.length > k; k++) {
                await new Promise((resolve) => setTimeout(resolve, 500));
                const productVariant = {
                  name_variants: variants[k].referencia + '-' + variants[k].color,
                  metadata_variants: {},
                  price_override: variants[k].precio != undefined ? variants[k].precio : 0,
                  weight_override: variants[k].peso != undefined ? variants[k].peso : 0,
                  sku: variants[k].referencia + '-' + variants[k].color,
                  description_variant: variants[k].estadoOrden,
                  brand: variants[k].marca != undefined ? variants[k].marca : 'not-brand',
                  product_id: productDB.id_productos,
                }
                console.log("entro a variants")
                const variant_db = await this.aphService.setVariant(productVariant);
                console.log("entro a variants for",variant_db)
                await new Promise((resolve) => setTimeout(resolve, 200));
                await this.aphService.setStock({locationId:locations[0].id ,quantity: variants[k].bodegaLocal, variant_id: variant_db.id_variant,quantity_allocated:0});
                await this.aphService.setStock({locationId:locations[1].id ,quantity: variants[k].bodegaZonaFranca, variant_id: variant_db.id_variant,quantity_allocated:0});
                await this.aphService.setStock({locationId:locations[3].id ,quantity: variants[k].totalDisponible, variant_id: variant_db.id_variant,quantity_allocated:0});
                
              }
            }
          }

        }
      }
      return { message: 'ok' };
    } catch (err) {
      return err;
    }
  }
  @EventPattern('delete_category')
  async handleDeleteCategory(data: any) {
    const res = await this.aphService.deleteCategory(data);
    return res;
  }
}
