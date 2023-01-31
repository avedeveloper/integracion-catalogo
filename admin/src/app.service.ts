import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(@Inject('LOGIN_SERVICE') private clienteLogin: ClientProxy) {}

  async home(user: any) {
    const res = await this.clienteLogin.send('home', user).toPromise();
    return res;
  }

  async login(user: any) {
    console.log('login', user);
    const res = await this.clienteLogin.send('new_login', user).toPromise();
    return res;
  }
  async getProduct(product: any) {
    const res = await this.clienteLogin
      .send('get_product', product)
      .toPromise();
    return res;
  }
  async searchProduct(product: any) {
    const res = await this.clienteLogin
      .send('search_product', product)
      .toPromise();
    return res;
  }
  async getVariants(product: any) {
    const res = await this.clienteLogin
      .send('get_variants', product)
      .toPromise();
    return res;
  }

  async getProducts(product: any) {
    const res = await this.clienteLogin
      .send('get_products', product)
      .toPromise();
    return res;
  }

  async getCategories(category: any) {
    const res = await this.clienteLogin
      .send('get_categories', category)
      .toPromise();
    return res;
  }

  async setCategory(category: any) {
    const res = await this.clienteLogin
      .send('set_category', category)
      .toPromise();
    return res;
  }
  async getCategory(body: any) {
    const res = await this.clienteLogin.send('get_category', body).toPromise();
    return res;
  }

  async getCollection(collection: any) {
    const res = await this.clienteLogin
      .send('get_collection', collection)
      .toPromise();
    return res;
  }
  async loadCategories() {
    const res = await this.clienteLogin
      .send('load', { data: 'make' })
      .toPromise();
    return res;
  }
  async deleteCategory(category: any) {
    const res = await this.clienteLogin
      .send('delete_category', category)
      .toPromise();
    return res;
  }
  async getProveedores(proveedor: any) {
    const res = await this.clienteLogin
      .send('get_proveedores', proveedor)
      .toPromise();
    return res;
  }
  async getLogs(log: any) {
    const res = await this.clienteLogin.send('get_logs', log).toPromise();
    return res;
  }
  async getProveedor(proveedor: any) {
    const res = await this.clienteLogin
      .send('get_proveedor', proveedor)
      .toPromise();
    return res;
  }
  async getUsers(user: any) {
    const res = {
      data: [
        {
          user: 'test 1',
          img: {
            src: 'https://www.w3schools.com/howto/img_avatar.png',
            alt: 'Avatar',
          },
          text: 'text de prueba',
          description: 'test de descripcion',
          date: '2021-04-18 14:28:01',
          status: {
            pago: 'activo',
            tipoDeCuenta: 'demo',
          },
        },
        {
          user: 'test 2',
          img: {
            src: 'https://www.w3schools.com/howto/img_avatar.png',
            alt: 'Avatar',
          },
          text: 'text de prueba',
          description: 'test de descripcion',
          date: '2021-04-18 14:28:01',
          status: {
            pago: 'lead',
            tipoDeCuenta: 'premiun',
          },
        },
        {
          user: 'test 4',
          img: {
            src: 'https://www.w3schools.com/howto/img_avatar.png',
            alt: 'Avatar',
          },
          text: 'text de prueba',
          description: 'test de descripcion',
          date: '2021-04-18 14:28:01',
          status: {
            pago: 'lead',
            tipoDeCuenta: 'demo',
          },
        },
        {
          user: 'test 3',
          img: {
            src: 'https://www.w3schools.com/howto/img_avatar.png',
            alt: 'Avatar',
          },
          text: 'text de prueba',
          description: 'test de descripcion',
          date: '2021-04-18 14:28:01',
          status: {
            pago: 'desactivado',
            tipoDeCuenta: 'premium',
          },
        },
        {
          user: 'test 5',
          img: {
            src: 'https://www.w3schools.com/howto/img_avatar.png',
            alt: 'Avatar',
          },
          text: 'text de prueba',
          description: 'test de descripcion',
          date: '2021-04-18 14:28:01',
          status: {
            pago: 'activo',
            tipoDeCuenta: 'gratuita',
          },
        },
      ],
    };
    return res;
  }
  async getUser(user: any) {
    const res = {
      data: [
        {
          user: 'test 5',
          img: {
            src: 'https://www.w3schools.com/howto/img_avatar.png',
            alt: 'Avatar',
          },
          text: 'text de prueba',
          description: 'test de descripcion',
          date: '2021-04-18 14:28:01',
          status: {
            pago: 'activo',
            tipoDeCuenta: 'gratuita',
          },
        },
      ],
    };
    return res;
  }
  async getStocks(data: any) {
    const res = await this.clienteLogin.send('get_stocks', data).toPromise();
    return res;
  }
}
