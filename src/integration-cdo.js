import fetch from 'node-fetch'; 

const token = "Ukq3UBwcqaKmf9ZGmTkcTg";

async function loadApiThree(){
    try{
        // Prueba categoria 9 boligrafos
        const res = await fetch(`http://api.colombia.cdopromocionales.com/v1/products?auth_token=${token}`)
        const data = await res.json()

        let end = 5;

        for (let i = 1; i < end; i++) {

            // ID PRODUCT
            let code = data[i].code;
            // Nombre de producto
            let nombre = data[i].name;
            // Descripción de producto
            let description = data[i].description;
            let descriptionSanitaze = description.replace(/(\r\n|\n|\r)/gm, "");
            let descripcionmutation = `{"blocks": [{"id": "", "data": {"text": "${descriptionSanitaze}"}, "type": "paragraph"}], "version": ""}`;


            let category = data[i].category;
            let arrayVariants = data[i].variants;

            arrayVariants.forEach(variant => {
                let colorVariant = variant.color;
                let novedadVariant = variant.novedad;
                let stockAvailableVariant = variant.stock_available;
                let stockExistentVariant = variant.stock_existent;
                let listPriceVariant = variant.list_price;
                let listNetVariant = variant.net_price;
                let pictureVariant = variant.detail_picture.medium;
            });

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
                            "Authorization": `JWT ${tokenAuthorization}`
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
                                        mediaUrl: "https://d2jygl58194cng.cloudfront.net/product_images/pictures/000/070/323/original/boligrafo_negro_BP187_estuche_%281%29.jpg"
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