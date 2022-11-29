import fetch from 'node-fetch'; 

const token = "Api-Key BQi4VDHTpt14dCLiDV1iSlO9Xb5FMAL9m3IT5RTnBwzK4cmuqk4gaAZ3tTy1B6Du";

async function loadApiTwo(){
    try{

        const response = await fetch('https://marpicoprod.azurewebsites.net/api/inventarios/materialesAPI', { 
            headers: {
                Accept: 'application/json',
                Authentication: token,
                'X-CSRFToken': 'F5MlLREOPJbUHTXO2mSI3nbutG4OEosTCjrR0H3hH0LOP8LA8vkqQ3KDZ82JYGb2'
            }
        });
        const data = await response.json()

        console.log(data)

    } catch (error) {
        console.log(error)
    }
}

loadApiTwo()