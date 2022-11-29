import fetch from 'node-fetch'; 

async function loadApiThree(){
    try{
        // Prueba categoria 9 boligrafos
        const res = await fetch(`https://api.cataprom.com/rest/categorias/9/productos`)
        const data = await res.json()

        data.resultado.forEach(product => {
            let nombre = product.nombre;
            console.log(nombre);
        });
        
        //console.log(data)

    } catch (error) {
        console.log(error)
    }
}

loadApiThree()