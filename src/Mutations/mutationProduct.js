import fetch from 'node-fetch'; 

const token = 'JWT eyJhbGciOiJSUzI1NiIsImtpZCI6IjEiLCJ0eXAiOiJKV1QifQ.eyJpYXQiOjE2Njk2OTkyNDksIm93bmVyIjoic2FsZW9yIiwiaXNzIjoiaHR0cHM6Ly9hdmUuc2FsZW9yLmNsb3VkL2dyYXBocWwvIiwiZXhwIjoxNjY5Njk5NTQ5LCJ0b2tlbiI6IjdpZHRwWm5MTVk2MiIsImVtYWlsIjoiZGF2aWRmYTk3MThAZ21haWwuY29tIiwidHlwZSI6ImFjY2VzcyIsInVzZXJfaWQiOiJWWE5sY2pveCIsImlzX3N0YWZmIjp0cnVlfQ.JvD9tCv13EI1RbB2J4CSexOSCGb7FPvwZkFiOvQ5BG_9bGj5SsLzG7moUnQkIurjSYyF6hVybu_yEbU9NsPPZ72Ser-eEE9C3DucV_4-jt0mRPADfpYiW4ZeGrXaGkHo61zwP-vq9eQe6qgOK0bb4tgW-ETgYQ1drReQSDbZNTmG9_-qVjjHKkJQV4DAya1_nyx_hobfqQbP8bEl5sS6S5WjH1ZXWYxo2uSzdjLYIpQeLfTD3BhK6kY5LtoCjDTR8TuqK62qPmYWyN46ynELuVjazjPqgb4xHbFEtRqwVd3Po6q5QBHTRUww-g06uQnA_29mLFiTE1JzrVmL6jhQJg';

async function mutationProduct(){
    try{
        const resql = await fetch('https://ave.saleor.cloud/graphql/', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            "Authorization": token
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
        console.log(dataql);

    } catch (error) {
        console.log(error)
    }
}

mutationProduct()
