import fetch from 'node-fetch'; 

const token = 'JWT eyJhbGciOiJSUzI1NiIsImtpZCI6IjEiLCJ0eXAiOiJKV1QifQ.eyJpYXQiOjE2NzA2NTM3OTcsIm93bmVyIjoic2FsZW9yIiwiaXNzIjoiaHR0cHM6Ly9hdmUuc2FsZW9yLmNsb3VkL2dyYXBocWwvIiwiZXhwIjoxNjcwNjU0MDk3LCJ0b2tlbiI6IjdpZHRwWm5MTVk2MiIsImVtYWlsIjoiZGF2aWRmYTk3MThAZ21haWwuY29tIiwidHlwZSI6ImFjY2VzcyIsInVzZXJfaWQiOiJWWE5sY2pveCIsImlzX3N0YWZmIjp0cnVlfQ.WGeZ9qzoWAUkEFg4XOcecwW-wW23zoabfh9y-SB56Jzo607ZDuhzoaGcIjs0m5pjnct8Bcau_A0R-0GT1dbweWnBVM3LP3jYBUQ1_Mj0ZJoIgXTeDtjIC7FW3NGyBemFijftwIQ1THKe_TYvvSY3pZcnCOYY4NpOHzW1as2I1xhrGuOTINJyFNKUsygMyfWRfoT_kgrA7-D425i4lRFWPDGS3SjrN6qjB6JqtbmcUYd-4BQ14zvT2bFGIeOFRl18O-7z5iTGBkPt8MKBj6lGjqWI5AOJRoP0R1Lvu3pEmc0hL7gd0nYRwVtnS44GOiFaIhsvwgpG7qgkvYJWAeCYMQ';

async function mutationProduct(){
    let name = "Prueba desde consola 8";
    let description = `{"time": 1670651475205, "blocks": [{"id": "VoMHpf3HsZ", "data": {"text": "Prueba de producto promocionales descripci\u00f3n"}, "type": "paragraph"}], "version": "2.24.3"}`;
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
                        category: "Q2F0ZWdvcnk6Mg=="
                        name: "${name}"
                        productType: "UHJvZHVjdFR5cGU6NA=="
                        rating: 5
                        description: ${JSON.stringify(description)}
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
