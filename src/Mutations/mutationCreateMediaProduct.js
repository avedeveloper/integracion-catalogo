import fetch from 'node-fetch'; 

const token = 'JWT eyJhbGciOiJSUzI1NiIsImtpZCI6IjEiLCJ0eXAiOiJKV1QifQ.eyJpYXQiOjE2NzA5MDQyODUsIm93bmVyIjoic2FsZW9yIiwiaXNzIjoiaHR0cHM6Ly9hdmUuc2FsZW9yLmNsb3VkL2dyYXBocWwvIiwiZXhwIjoxNjcwOTA0NTg1LCJ0b2tlbiI6IjdpZHRwWm5MTVk2MiIsImVtYWlsIjoiZGF2aWRmYTk3MThAZ21haWwuY29tIiwidHlwZSI6ImFjY2VzcyIsInVzZXJfaWQiOiJWWE5sY2pveCIsImlzX3N0YWZmIjp0cnVlfQ.WQ2rBsVnBhbuP3Sg07LFL9QgKMdgeNZZrATf4h2cmqd-6lyLYWyIHSqxql9XpaXK6XCMmrnr4eMFwzoIWt4fVCavk2--wBSfM6AA4gpm9fu8ieVVJj1XgE22u_ZTfckzai-9VJp6W-HaAu3a0EIyicjqWnLPeBPdbvBs1g72fhn8N1nKsephT-vh562pHhWNjhq8sV1_Xgpo-AfHKfX2z6uWfd_JathExTnEhfn9nY-YEK-iwUVs3KR9UPcTpLByef6E4TenitmtqHn9bYz2FlZytL-LKjsiJBAjoXXXfdNu6f9z4JwpJtMxetuAlu_2N2siV5izUyQLGJ-uKCSV-w';

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
                        product: "UHJvZHVjdDoxMzE=",
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
        const dataql = await resql.json();
        console.log(dataql);

    } catch (error) {
        console.log(error)
    }
}

mutationProduct()
