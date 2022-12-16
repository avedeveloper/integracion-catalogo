import fetch from 'node-fetch'; 

async function loadApiThree(){
    try{
        const res = await fetch(`https://api.cataprom.com/rest/categorias`)
        const data = await res.json()

        data.resultado.forEach(category => {
        let idCategoria = category.id;
            async function loadProducts(){
                try{
                    const resproductos = await fetch(`https://api.cataprom.com/rest/categorias/${idCategoria}/productos`)
                    const dataproducts = await resproductos.json()

                    dataproducts.resultado.forEach(product => {
                        let id = product.id;
                        let nombre = product.nombre;
                        let sku = product.referencia;
                        let descripcionProducto = product.descripcionProducto;
                        let precio = product.precio1;
                        let img = product.imageUrl;
                        let urlimg = `https://www.catalogospromocionales.com${img}`;
                        const email = "davidfa9718@gmail.com";
                        const password = "Saleor123+";

                        async function mutationToken(){
                            try{
                                const resql = await fetch('https://ave.saleor.cloud/graphql/', {
                                method: 'POST',
                                headers: { 
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({ query: `
                                    mutation {
                                        tokenCreate(email: "${email}", password: "${password}") {
                                            token
                                            refreshToken
                                            csrfToken
                                            user {
                                                email
                                            }
                                            errors {
                                                field
                                                message
                                            }
                                        }
                                    }
                                ` }),
                                })
                                const dataql = await resql.json();
                                let tokenAuthorization = dataql.data.tokenCreate.token;

                                if (dataql) {
                                    const resqlproduct = await fetch('https://ave.saleor.cloud/graphql/', {
                                    method: 'POST',
                                    headers: { 
                                        'Content-Type': 'application/json',
                                        "Authorization": tokenAuthorization
                                    },
                                    body: JSON.stringify({ query: `
                                        mutation { 
                                            productCreate(
                                                input: {
                                                    category: "Q2F0ZWdvcnk6MQ=="
                                                    name: "${nombre}"
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
                                    const dataqlproduct = await resqlproduct.json();
                                    console.log(dataqlproduct);
                                }
                        
                            } catch (error) {
                                console.log(error)
                            }
                        }
                        mutationToken()
                    });
                } catch (error) {
                    console.log(error)
                }
            }
            loadProducts()
        });
        
        //console.log(data)

    } catch (error) {
        console.log(error)
    }
}

loadApiThree()