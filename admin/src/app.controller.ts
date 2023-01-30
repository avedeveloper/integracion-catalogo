import { Controller, Body, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/login')
  // eslint-disable-next-line @typescript-eslint/ban-types
  async newLogin(@Body() body: any): Promise<Object> {
    const res = await this.appService.login(body);
    return { data: res };
  }
  @Post('/')
  // eslint-disable-next-line @typescript-eslint/ban-types
  async home(@Body() body: any): Promise<Object> {
    const res = await this.appService.home(body);
    return { data: res };
  }
  @Post('/get_products')
  // eslint-disable-next-line @typescript-eslint/ban-types
  async getProducts(@Body() body: any): Promise<Object> {
    const res = await this.appService.getProducts(body);
    return { data: res };
  }
  @Post('/get_products/:id')
  // eslint-disable-next-line @typescript-eslint/ban-types
  async getProductsSearch(
    @Body() body: any,
    @Query() query: any,
  ): Promise<any> {
    const res = await this.appService.searchProduct(body, query);
    return { data: res };
  }
  @Post('/get_product')
  // eslint-disable-next-line @typescript-eslint/ban-types
  async getProduct(@Body() body: any): Promise<Object> {
    const res = await this.appService.getProduct(body);
    return { data: res };
  }
  @Post('/getVariants')
  // eslint-disable-next-line @typescript-eslint/ban-types
  async getVariants(@Body() body: any): Promise<Object> {
    const res = await this.appService.getVariants(body);
    return { data: res };
  }
  @Post('/get_proveedores')
  // eslint-disable-next-line @typescript-eslint/ban-types
  async getProveedores(@Body() body: any): Promise<Object> {
    const res = await this.appService.getProveedores(body);
    return { data: res };
  }
  @Post('/get_proveedor')
  // eslint-disable-next-line @typescript-eslint/ban-types
  async getProveedor(@Body() body: any): Promise<Object> {
    const res = await this.appService.getProveedor(body);
    return { data: res };
  }
  @Post('/get_categories')
  // eslint-disable-next-line @typescript-eslint/ban-types
  async getCategories(@Body() body: any): Promise<Object> {
    const res = await this.appService.getCategories(body);
    return { data: res };
  }
  @Post('/set_category')
  // eslint-disable-next-line @typescript-eslint/ban-types
  async setCategory(@Body() body: any): Promise<Object> {
    const res = await this.appService.setCategory(body);
    return { data: res };
  }
  // @Post('/load')
  // // eslint-disable-next-line @typescript-eslint/ban-types
  // async loadCategories(): Promise<Object> {
  //   const res = await this.appService.loadCategories();
  //   return { data: res };
  // }
  @Post('/delete_category')
  // eslint-disable-next-line @typescript-eslint/ban-types
  async deleteCategory(@Body() body: any): Promise<Object> {
    const res = await this.appService.deleteCategory(body);
    return { data: res };
  }
  @Post('/get_users')
  // eslint-disable-next-line @typescript-eslint/ban-types
  async getUsers(@Body() body: any): Promise<Object> {
    const res = await this.appService.getUsers(body);
    return { data: res };
  }
  @Post('/get_user')
  // eslint-disable-next-line @typescript-eslint/ban-types
  async getUser(@Body() body: any): Promise<Object> {
    const res = await this.appService.getUser(body);
    return { data: res };
  }
  @Post('/edit_user')
  // eslint-disable-next-line @typescript-eslint/ban-types
  async editUser(@Body() body: any): Promise<Object> {
    // const res = await this.appService.editUser(body);
    return { data: { message: 'edicion exitosa', stat: 200 } };
  }
  @Post('/get_logs')
  // eslint-disable-next-line @typescript-eslint/ban-types
  async getLogs(@Body() body: any): Promise<Object> {
    const res = await this.appService.getLogs(body);
    return { data: res };
  }
}
