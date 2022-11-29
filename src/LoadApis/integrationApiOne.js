import fetch from 'node-fetch'; 

const token = "Ukq3UBwcqaKmf9ZGmTkcTg";

async function loadApiOne(){
    try{
        const res = await fetch(`http://api.colombia.cdopromocionales.com/v1/products?auth_token=${token}`)
        const data = await res.json()
        data.forEach(product => {
            //console.log(product);
            let code = product.code;
            let name = product.name;
            let description = product.description;
            let category = product.category;
            let arrayVariants = product.variants;
            arrayVariants.forEach(variant => {
                let colorVariant = variant.color;
                let novedadVariant = variant.novedad;
                let stockAvailableVariant = variant.stock_available;
                let stockExistentVariant = variant.stock_existent;
                let listPriceVariant = variant.list_price;
                let listNetVariant = variant.net_price;
                let pictureVariant = variant.detail_picture.medium;
            });
        });

        console.log(data)

    } catch (error) {
        console.log(error)
    }
}

loadApiOne()
