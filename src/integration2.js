//const fetch = require("node-fetch");
import fetch from 'node-fetch'; 
const token = "Ukq3UBwcqaKmf9ZGmTkcTg";

/*fetch(`http://api.colombia.cdopromocionales.com/v1/products?auth_token=${token}`)
    .then((response) => {
        return response.json()
    }).then((resp) => {
        //console.log(resp);
        resp.forEach(item => {
            console.log(item.code);
            //console.log(item);

            let variants = item.variants;

            variants.forEach(variant => {
                console.log(variant.color);
            });
        });
        
    })*/

async function loaddataapi(){
    try{
        //const res = await fetch(`http://api.colombia.cdopromocionales.com/v1/products?auth_token=${token}`)
        //const data = await res.json()
 
        /*data.forEach(product => {
            //console.log(product);
            let code = product.code;
            let name = product.name;
            let description = product.description;
            let category = product.category;
            let arrayVariants = product.variants;
            arrayVariants.forEach(variant => {
                let colorVariant = variant.color;
                let novedadVariant = variant.novedad;
                let stockAvailableVariant = variant.stock_available;
                let stockExistentVariant = variant.stock_existent;
                let listPriceVariant = variant.list_price;
                let listNetVariant = variant.net_price;
                let pictureVariant = variant.detail_picture.medium;
                console.log(pictureVariant);
            });
        });*/
        //let description = "{\"blocks\":[{\"type\":\"paragraph\",\"data\":{\"text\":\"New description\"}}]}";
        //console.log(JSON.stringify(description));
        //console.log(description)
        /*const resql = await fetch('https://ave.saleor.cloud/graphql/', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            "Authorization": `JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjEifQ.eyJpYXQiOjE2Njc2MTM3ODEsIm93bmVyIjoic2FsZW9yIiwiaXNzIjoiYXZlLnNhbGVvci5jbG91ZCIsImV4cCI6MTY2NzYxNDA4MSwidG9rZW4iOiI3aWR0cFpuTE1ZNjIiLCJlbWFpbCI6ImRhdmlkZmE5NzE4QGdtYWlsLmNvbSIsInR5cGUiOiJhY2Nlc3MiLCJ1c2VyX2lkIjoiVlhObGNqb3giLCJpc19zdGFmZiI6dHJ1ZX0.rqz4DmQ4k6UftdD9aiPHyjIP0CR3jSI1KTy7A_FJEe2zSC-Yq8Pl8ehSGAg6Tn3VwWvuj0vBeaoJitKtDKaYSKrgac6ogrflDlmZ_Rd8jsq5knXWji6Bf53TJNJtJiAp8MviBz5cwKbZo4D_D4jnzNx3pf8xbj2GfYTp6TLREy4UB7lBmpw5HawARpYtPo1VOSeymrTmW1wzNYg1YAThzTEBfWC7dCMLHG55_C9CCWsmcQwuVPdGBMmXeRU6RGUHlgwLkly8iYMwx68gfy3IvGd1xQtBQr0mn4Qp3pAF3oazde020ngFoEocDMK3HDFWKhazRc-IWjl67gbRK-uIpg`
        },
        body: JSON.stringify({ query: `
            mutation { 
                productCreate(
                    input: {
                        category: "Q2F0ZWdvcnk6MQ=="
                        name: "Prueba desde consola"
                        productType: "UHJvZHVjdFR5cGU6Mg=="
                        chargeTaxes: true
                        weight: "0.3"
                        rating: 5
                        #description:"{\"time\": 1666983096870, \"blocks\": [{\"id\": \"VunQv1uh5W\", \"data\": {\"text\": \"Producto compuesto por saleor\"}, \"type\": \"paragraph\"}], \"version\": \"2.24.3\"}"
                    }
                ) {
                    product {
                    id
                    }
                }
            }
        ` }),
        })
        const dataql = await resql.json();
        console.log(dataql);*/

        /*const resql = await fetch('https://ave.saleor.cloud/graphql/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: `
            { products(first: 5, channel: "default-channel") {
                edges {
                    node {
                        name
                        }
                    }
                }
            }
        ` }),
        })
        const dataql = await resql.json();
        //console.log(dataql.data.products.edges);
        let productsArrayQl = dataql.data.products.edges;
        productsArrayQl.forEach(ProductQl => {
            console.log(ProductQl.node.name);
        });*/
        //const res = await fetch(`https://marpicoprod.azurewebsites.net/documentacion?format=openapi`)
        

        /*const response = await fetch(`https://marpicoprod.azurewebsites.net/api/inventarios/materialesAPI`, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
              'Content-Type': 'application/json',
              'Authorization':  'Api-Key BQi4VDHTpt14dCLiDV1iSlO9Xb5FMAL9m3IT5RTnBwzK4cmuqk4gaAZ3tTy1B6Du'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
          });*/
        const response = await fetch('https://marpicoprod.azurewebsites.net/api/inventarios/materialesAPI', { 
            headers: {
                Accept: 'application/json',
                Authentication: 'Api-Key BQi4VDHTpt14dCLiDV1iSlO9Xb5FMAL9m3IT5RTnBwzK4cmuqk4gaAZ3tTy1B6Du',
                'X-CSRFToken': 'F5MlLREOPJbUHTXO2mSI3nbutG4OEosTCjrR0H3hH0LOP8LA8vkqQ3KDZ82JYGb2'
            }
            /*method: 'GET',
            //mode: 'cors',
            //cache: 'no-cache',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Api-Key BQi4VDHTpt14dCLiDV1iSlO9Xb5FMAL9m3IT5RTnBwzK4cmuqk4gaAZ3tTy1B6Du', 
                'X-CSRFToken': 'F5MlLREOPJbUHTXO2mSI3nbutG4OEosTCjrR0H3hH0LOP8LA8vkqQ3KDZ82JYGb2'
            }*/
        });
        const data = await response.json()

        console.log(data)



    } catch (error) {
        console.log(error)
    }
}

loaddataapi()

/*async function postData(url = '') {
    const response = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Api-Key BQi4VDHTpt14dCLiDV1iSlO9Xb5FMAL9m3IT5RTnBwzK4cmuqk4gaAZ3tTy1B6Du'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer'
    });

    return response.json(); // parses JSON response into native JavaScript objects
}

postData(`https://marpicoprod.azurewebsites.net/api/inventarios/materialesAPI`)
  .then((data) => {
    console.log(data); // JSON data parsed by `data.json()` call
});*/