import fetch from 'node-fetch'; 

async function queryProducts(){
    try{
        const resql = await fetch('https://ave.saleor.cloud/graphql/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: `
            {
                products(first: 5, channel: "default-channel") {
                    edges {
                        node {
                            name
                            id
                            description
                            thumbnail{
                                url
                            }
                            variants{
                                sku
                            }
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
        });

    } catch (error) {
        console.log(error)
    }
}

queryProducts()
