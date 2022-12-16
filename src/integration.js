import fetch from 'node-fetch'; 

async function loadApiThree(){
    try{
        // Prueba categoria 9 boligrafos
        const res = await fetch(`https://api.cataprom.com/rest/categorias/112/productos`)
        const data = await res.json()

        let end = 5;

        for (let i = 0; i < end; i++) {

            // ID de producto
            const id = data.resultado[i].id;
            // Nombre de producto
            let nombre = data.resultado[i].nombre;
            // Descripción de producto
            let descripcionProducto = data.resultado[i].descripcionProducto;
            let descriptionSanitaze = descripcionProducto.replace(/(\r\n|\n|\r)/gm, "");
            let descripcionmutation = `{"blocks": [{"id": "", "data": {"text": "${descriptionSanitaze}"}, "type": "paragraph"}], "version": ""}`;
            // SKU
            let sku = data.resultado[i].referencia;
            // Imagen de producto
            let img = data.resultado[i].imageUrl;
            let urlimg = `https://www.catalogospromocionales.com${img}`;
            // Precio del producto 1
            let precio = data.resultado[i].precio1;
            let imgfinal = urlimg.replace(/(\r\n|\n|\r)/gm, "");
            let referencia = data.resultado[i].referencia;

            /*console.log(referencia);

            const resreferencia = await fetch(`https://api.cataprom.com/rest/stock/${referencia}`)
            const datareferencia = await resreferencia.json()*/

            //console.log(datareferencia);
            
            async function mutationToken(){
                const email = "davidfa9718@gmail.com";
                const password = "Saleor123+";
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

                    if (tokenAuthorization) {
                        const resqlproduct = await fetch('https://ave.saleor.cloud/graphql/', {
                        method: 'POST',
                        headers: { 
                            'Content-Type': 'application/json',
                            "Authorization": `Bearer ${tokenAuthorization}`
                        },
                        body: JSON.stringify({ query: `
                            mutation { 
                                productCreate(
                                    input: {
                                        category: "Q2F0ZWdvcnk6Mg=="
                                        name: "${nombre}"
                                        productType: "UHJvZHVjdFR5cGU6NA=="
                                        rating: 5
                                        description: ${JSON.stringify(descripcionmutation)}
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

                        let idProduct = dataqlproduct.data.productCreate.product.id;

                        const resqlproductimg = await fetch('https://ave.saleor.cloud/graphql/', {
                        method: 'POST',
                        headers: { 
                            'Content-Type': 'application/json',
                            "Authorization": `JWT ${tokenAuthorization}`
                        },
                        body: JSON.stringify({ query: `
                            mutation{
                                productMediaCreate(
                                    input:{
                                        product: "${idProduct}",
                                        mediaUrl: "https://d2jygl58194cng.cloudfront.net/product_images/pictures/000/073/998/original/promocional_publicitario_boligrafo_blanco_BP217.jpg"
                                    }
                                ){
                                    product {
                                        id
                                    }
                                }
                            }
                        ` }),
                        })
                        const dataqlproductimg = await resqlproductimg.json();
                        console.log(dataqlproductimg);
                    }
            
                } catch (error) {
                    console.log(error)
                }
            }
            mutationToken()
        };

    } catch (error) {
        console.log(error)
    }
}

loadApiThree()