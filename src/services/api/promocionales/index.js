import axios from 'axios';
import dotenv from "dotenv";

var config = dotenv.config();

const BASE_URL = process.env.URL_API_CATAPROMO
const apiPromos = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

class ApiPromos {
    static async getPromos() {
        const response = await apiPromos.get('/promocionales');
        return response.data;
    }

    static async getCategorias(){
        const response = await apiPromos.get('/categorias');
        return response.data;
    }
    static async getProductsByCategory(id){
        const response = await apiPromos.get(`/categorias/${id}/productos`);
        return response.data.resultado;
    }
    static async getProductById(id){
        const response = await apiPromos.get(`/productos/${id}`);
        return response.data;
    }
    static async getAllIdsCategories(){
        const response = await apiPromos.get('/categorias');
        if(response.data.hayError == false){
            return response.data.resultado
        }
        return response.data;
      }


}
export default ApiPromos;

