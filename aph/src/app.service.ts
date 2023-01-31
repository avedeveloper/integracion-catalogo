/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { v4 as uuidv1 } from 'uuid';
import * as fs from 'fs';
import * as path from 'path';
@Injectable()
export class AppService {
  constructor(private sequelize: Sequelize) { }
  async getProducts(data: any) {
    try {
      const limit = data.limit || 10;
      const offset = data.offset || 0;
      //OFFSET ${offset} LIMIT ${limit}
      const res = await this.sequelize.query(`SELECT * FROM "public"."products" 
      join "public"."collection" on "public"."products"."collection_id" = "public"."collection"."idCollection" 
      join "public"."categories" on "public"."products"."category_id" = "public"."categories"."id_categorias" 
      join "public"."supplier" on "public"."products"."supplier" = "public"."supplier"."id"
      OFFSET ${offset} LIMIT ${limit}`);
      const count = <any>await this.sequelize.query(`SELECT COUNT(*) FROM "public"."products"`);
      return { data: res[0], totalRows: count[0][0].count };
        } catch (err) {
      console.log('err', err);
      return err;
    }
  }
  async getCategory(data:any){
    try{
      if(data.category){
        return {message:'Empty category'}
      }
      const res = await this.sequelize.query(`SELECT * FROM "public"."categories" WHERE "id_categorias" = '${data.category}'`);
      return {data: res[0]};
    } catch(err){
      console.log(err)
      return err;
    }
  }
  async home(data: any) {
    try{
      return [{message:'hello world'}]
    }catch(err){
      console.log('err', err);
      return err;
    }
  }
  async setProduct(data: any) {
    /*INSERT INTO public.products(
	name_product, reference, description_product, metadata, channel, available_on, is_published, weight, category_id, product_class_id, "idProducts", supplier, price_base)
	VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?); */
    try {
      if (
        data.nombre == null ||
        data.referencia == null ||
        data.channel == null ||
        data.disponible == null ||
        data.category_id == null ||
        data.proveedor == null
      ) {
        return {
          data: null,
          message:
            'product not created, missing name or reference or channel or is_published or category_id or proveedor',
        };
      }
      const obj = {
        id_productos: uuidv1(),
        nombre: data.nombre,
        referencia: data.referencia,
        descripcion: "demo",
        metadata: JSON.stringify(data.metadata),
        channel: data.channel,
        disponible: new Date().toISOString().slice(0, 19).replace('T', ' '),
        is_published: data.is_published,
        peso: data.peso,
        category_id: data.category_id,
        product_class_id: data.product_class_id,
        proveedor: data.proveedor,
        price_base: data.price_base,
        collection_id: data.collection_id
      };
      await this.sequelize.query(`INSERT INTO public.products(
	name_product, reference, description_product, metadata, channel, available_on, is_published, weight, category_id, product_class_id, "idProducts", supplier, price_base,collection_id)
	VALUES ('${obj.nombre}','${obj.referencia}','${obj.descripcion}',${obj.metadata},'${obj.channel}','${obj.disponible}',${obj.is_published},${obj.peso},'${obj.category_id}',${obj.product_class_id},'${obj.id_productos}','${obj.proveedor}',${obj.price_base==undefined || obj.price_base==null?null:obj.price_base}, ${obj.collection_id==undefined || obj.collection_id==null?null:`'${obj.collection_id}'`})`);

      return obj;
    } catch (err) {
      console.log('err', err);
      return err;
    }
  }
  async getProduct(data: any) {
    try {
      if (data.id_productos == null) {
        return {
          data: null,
          message: 'missing id_productos',
        };
      }
      const product= await this.sequelize.query(`
      SELECT * FROM public.products
      join "public"."collection" on "public"."products"."collection_id" = "public"."collection"."idCollection" 
      join "public"."categories" on "public"."products"."category_id" = "public"."categories"."id_categorias" 
      join "public"."supplier" on "public"."products"."supplier" = "public"."supplier"."id"
      WHERE "public"."products"."idProducts" = '${data.id_productos}'
      `);
      return {data:product[0][0]};
    } catch (err) {
      console.log(err);
      return err;
    }
  }
  async searchProduct(data: any) {
    try {
      if (data.search == null) {
        return {
          data: null,
          message: 'missing search',
        };
      }
      const product = await this.sequelize.query(`
      SELECT * FROM public.products
      WHERE name_product LIKE '%${data.search}%'`);
      return product[0];
    } catch (err) {
      console.log(err);
      return err;
    }
  }
  async getVariants(data: any) {
try{
  if(data.idProducts == undefined || data.idProducts == null){
    return {message: 'missing idProducts'}
  }
  const res = await this.sequelize.query(
    `SELECT * FROM "public"."variants" 
    where product_id = '${data.idProducts}'`,
  );
  return res;
} catch(err){
  console.log(err)
  return err;
}
  }
  
  async setVariant(data: any) {
    try {
      if (data.name_variants == null || data.brand == null || data.sku == null || data.product_id == null) {
        return {
          data: null,
          message: 'variant not created, missing name or description or brand or sku',
        }
      }
      const obj = {
        id_variant: uuidv1(),
        name_variant: data.name_variants,
        metadata_variant: JSON.stringify(data.metadata_variants),
        description_variant: data.description_variant?data.description_variant:"  ",
        brand: data.brand,
        price_override: data.price_override,
        weight_override: data.weight_override,
        sku: data.sku,
        product_id:data.product_id
      };
      const res = await this.sequelize.query(`
INSERT INTO public.variants(
	id_variant, name_variant, metadata_variant, description_variant, brand, price_override, weight_override, sku, product_id)
	VALUES ('${obj.id_variant}','${obj.name_variant}','${obj.metadata_variant}','${obj.description_variant}','${obj.brand}',${obj.price_override},${obj.weight_override},'${obj.sku}','${obj.product_id}')`);
      console.log('res', res);
  return obj;
    } catch (err) {
      console.log('err', err);
      return err;
    }
  }

  async getStocks(data: any) {
    try {
      if (data.id_variant == null) {
        return {
          data: null,
          message: 'missing id_variant',
        }
      }
      const res = await this.sequelize.query(`
      SELECT * FROM public.stock 
      join "public"."stockLocation" on "public"."stockLocation"."idStockLocation" = "public"."stock"."locationId"
      WHERE variant_id = '${data.id_variant}'`);
      return res[0];
    } catch (err) {
      console.log(err);
      return err;
    }
  }
  async getProveedores(data:any){
    try {
      const res = await this.sequelize.query(`
      SELECT * FROM public."supplier"`);
      return {data : res[0]};
    } catch (err) {
      console.log(err)
      return err;
    }
  }
  async getLogs(data:any){
    try {
      return [{
        id: 1,
        service:'api',
        function:'Promocionales',
        errors:[],
        date: new Date(),
        status: 'success',
        message: 'ok',
      },{
        id: 2,
        service:'api',
        function:'Promocionales',
        errors:[{error:'Product "lapiz celeste" have a error'},{error:'Category "productos navideños" have a error or is not created'}],
        date: new Date(),
        status: 'warning',
        message: 'Something went wrong, but i finished the process',
      },{
        id: 3,
        service:'api',
        function:'Promocionales',
        errors:[{error:'Service timeout'}],
        date: new Date(),
        status: 'error',
        message: 'Something went wrong',
      }]
    } catch (err) {
      console.log(err)
      return err;
    }
  }
  async getProveedor(data:any){
    try {
      if (data.id_supplier == null) {
        return {
          data: null,
          message: 'missing id_supplier',
        }
      }
      return await this.sequelize.query(`
      SELECT * FROM public."supplier" WHERE id_supplier = ${data.id_supplier}`);
    } catch (err) {
      console.log(err)
    }
  }
  async getstockLocation() {
    /*SELECT "idStockLocation", name
    FROM public."stockLocation"; */
    try {
      return await this.sequelize.query(`
      SELECT * FROM public."stockLocation"`);
    } catch (err) {
      console.log(err)
      return err;
    }
  }

  async setStock(data: any) {
    try {
      const obj = {
        idStock: uuidv1(),
        locationId: data.locationId,
        variantId: data.variant_id,
        quantity: data.quantity,
        quantity_allocated: data.quantity_allocated,
      }
      await this.sequelize.query(`
      INSERT INTO public.stock(
        "idStock", "locationId", variant_id, quantity, quantity_allocated)
        VALUES ('${obj.idStock}', '${obj.locationId}', '${obj.variantId}', ${obj.quantity}, ${obj.quantity_allocated});`);
      return { data: obj, message: 'stock created' };
    } catch (err) {
      console.log(err)
      return err
    }
  }

  async getCollection(data: any) {
    const res = await this.sequelize.query(
      `SELECT * FROM "public"."collections"`,
    );
    return res;
  }

  async setCollection(data: any) {
    try {
      if (data.nombre == null || data.slug == null) {
        return {
          data: null,
          message: 'collection not created, missing name or slug',
        };
      }
      const obj = {
        id_colecciones: uuidv1(),
        name: data.nombre,
        slug: data.slug,
        metadata: data.metadata,
      };
      await this.sequelize.query(`
      INSERT INTO public.collection(
        "idCollection", name, slug, metadata)
        VALUES (${obj.id_colecciones}, ${obj.name}, ${obj.slug}, ${obj.metadata == null ? null : obj.metadata
        });`);
    } catch (err) {
      console.log('err', err);
      return err;
    }
  }

  async getCategories(data: any) {
    const res = await this.sequelize.query(
      `SELECT * FROM "public"."categories"`,
    );
    return {data: res[0]};
  }
  async getCategoryBySlug(data: any) {
   try{
    const res = <any> await this.sequelize.query(
      `SELECT * FROM "public"."categories" WHERE slug = '${data}'`,
    );
    return res[0][0];
   }catch(err){
     console.log('err', err);
     return err;
   }
  }
  async setCategory(data: any) {
    try {
      if (data.nombre == null || data.slug == null) {
        return {
          data: null,
          message: 'category not created, missing name or slug',
        };
      }
      const obj = {
        id_categorias: uuidv1(),
        nombre: data.name,
        slug: data.slug,
        metadata: data.metadata,
        parent: data.parent,
        tree_id: data.tree_id,
      };
      await this.sequelize.query(
        `INSERT INTO "public"."categories" VALUES ('${obj.id_categorias}', '${obj.nombre
        }', '${obj.slug}', '${obj.metadata}', ${obj.parent == null ? null : obj.parent
        }, ${obj.tree_id == null ? null : obj.tree_id})`,
      );
      return { data: obj, message: 'category created' };
    } catch (err) {
      console.log('err', err);
      return err;
    }
  }

  async loadCategories() {
    try {
      // eslint-disable-next-line prettier/prettier
      const categories = JSON.parse(fs.readFileSync(path.join(__dirname, '../diccionary.json'), 'utf-8'));
      for (let c = 0; categories.length > c; c++) {
        /*crear un intervalo para no romper la cola */
        await new Promise((resolve) => setTimeout(resolve, 1000));
        if (categories[c]['SUBCATEGORIA AVE'] == '') {
          const aux = await this.sequelize.query(
            `SELECT * FROM "public"."categories" WHERE name = '${categories[c]['CATEGORIA AVE']}'`,
          );
          if (aux[0].length == 0) {
            /*make a slug */
            let slug = categories[c]['CATEGORIA AVE'].toLowerCase();
            slug = slug.replace(/ /g, '-');
            slug = slug.replace(/[^\w-]+/g, '');
            await this.sequelize.query(
              `INSERT INTO "public"."categories" VALUES ('${uuidv1()}', '${categories[c]['CATEGORIA AVE']
              }', '${slug}', null, null, null)`,
            );
          }
        } else {
          const aux = await this.sequelize.query(
            `SELECT * FROM "public"."categories" WHERE name = '${categories[c]['SUBCATEGORIA AVE']}'`,
          );
          if (aux[0].length == 0) {
            /*make a slug */
            let slug = categories[c]['SUBCATEGORIA AVE'].toLowerCase();
            slug = slug.replace(/ /g, '-');
            slug = slug.replace(/[^\w-]+/g, '');
            const father: any = await this.sequelize.query(
              `SELECT * FROM "public"."categories" WHERE name = '${categories[c]['CATEGORIA AVE']}'`,
            );
            if (father[0].length > 0) {
              await this.sequelize.query(
                `INSERT INTO "public"."categories" VALUES ('${uuidv1()}', '${categories[c]['SUBCATEGORIA AVE']
                }', '${slug}', null, '${father[0][0].id_categorias}', null)`,
              );
            }
          }
        }
      }
      return { message: 'categories loaded' };
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  async loadProductsPromo() {
    try {
      console.log('hola');
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  async deleteCategory(id: any) {
    try {
      await this.sequelize.query(
        `DELETE FROM "public"."categories" WHERE id_categorias = '${id.id}'`,
      );
      return { message: 'category deleted' };
    } catch (e) {
      console.log(e);
      return e;
    }
  }
  async setPrice (price:any){
    /*INSERT INTO public.price(
	id, price, currency, type, metadata, "productId")
	VALUES (?, ?, ?, ?, ?, ?); */
  try{
    const obj = {
      id_price: uuidv1(),
      price: price.price,
      currency: price.currency,
      type: price.type,
      metadata: price.metadata,
      productId: price.productId,
    };
    await this.sequelize.query(`
    INSERT INTO public.price(
      id, price, currency, type, metadata, "productId")
      VALUES ('${obj.id_price}', ${obj.price}, '${obj.currency}', '${obj.type}', '${obj.metadata}', ${obj.productId==null?null:obj.productId});`);
    return obj;
  } catch(e){
    console.log(e);
    return e;
  }
}
  async updatePrice (price:any){
    /*UPDATE public.price */
    try{
      const obj = {
        id_price: price.id_price,
        price: price.price,
        currency: price.currency,
        type: price.type,
        metadata: price.metadata,
        productId: price.productId,
      };
      await this.sequelize.query(`
      UPDATE public.price
      SET price=${obj.price}, currency='${obj.currency}', type='${obj.type}', metadata='${obj.metadata}', "productId"='${obj.productId}'
      WHERE id = '${obj.id_price}';`);
      return obj;
    } catch(e){
      console.log(e);
      return e;
    }
  }
  async getPrice(id:any){
    try{
      const res = await this.sequelize.query(`
      SELECT * FROM public.price WHERE "productId" = '${id.id}';`);
      return res[0];
    }catch(e){
      console.log(e);
      return e;
    }
  }
  async checkProduct(referencia:any){
    try{
      const res = await this.sequelize.query(`
      SELECT * FROM public.products WHERE reference = '${referencia}';`);
      return res[0];
    }catch(e){
      console.log(e);
      return e;
    }
  }
}