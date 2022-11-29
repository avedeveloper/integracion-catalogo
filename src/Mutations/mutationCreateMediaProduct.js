import fetch from 'node-fetch'; 

const token = 'JWT eyJhbGciOiJSUzI1NiIsImtpZCI6IjEiLCJ0eXAiOiJKV1QifQ.eyJpYXQiOjE2Njk3MDAyNzcsIm93bmVyIjoic2FsZW9yIiwiaXNzIjoiaHR0cHM6Ly9hdmUuc2FsZW9yLmNsb3VkL2dyYXBocWwvIiwiZXhwIjoxNjY5NzAwNTc3LCJ0b2tlbiI6IjdpZHRwWm5MTVk2MiIsImVtYWlsIjoiZGF2aWRmYTk3MThAZ21haWwuY29tIiwidHlwZSI6ImFjY2VzcyIsInVzZXJfaWQiOiJWWE5sY2pveCIsImlzX3N0YWZmIjp0cnVlfQ.yk2yZGMG6BUr7h1Z8ZcdTFe3bMXrvBW60DmuJrjPbO0EcBnzR_RH18csaUj-vaHaGsFJMQz65jTuuSuTKYUmE8OOOIVhGazhHl7s613cykr9O-cR4lA0I_g4XyQb0LMAOMy_qMVssBafCyB2vXsB4ibsNg-KEMAZpmlqtwi7-5m-qOl1xEeSMMTNbahbc5xkNFjgRh2S1nDkudoYpz2Kt7lwoiUdHhy7dc2ybdkrB_PEj-8DK7VcxHlBvoxLJArpgHfeO3bg87r6-a1w7p6yltGvgU04OKwLgGRuFwzaG-HMyonmQKHZnXdHvunSGVjQguoTREr7ZeQtTK6-9no1lA';

async function mutationProduct(){
    try{
        const resql = await fetch('https://ave.saleor.cloud/graphql/', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            "Authorization": token
        },
        body: JSON.stringify({ query: `
            mutation{
                productMediaCreate(
                    input:{
                        product: "UHJvZHVjdDoy",
                        mediaUrl: "https://activos.co/wp-content/uploads/2022/07/centro_servicios_judiciales_barranquilla-1024x683.webp"
                    }
                    ){
                        product {
                        id
                    }
                }
            }
        ` }),
        })
        const dataql = await resql.json();
        console.log(dataql);

    } catch (error) {
        console.log(error)
    }
}

mutationProduct()
