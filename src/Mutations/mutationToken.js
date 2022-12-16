import fetch from 'node-fetch';

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
        console.log(dataql.data.tokenCreate.token);

    } catch (error) {
        console.log(error)
    }
}

mutationToken()
