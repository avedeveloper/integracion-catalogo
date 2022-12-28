import { Router } from "express";

const router = Router();

router.post('/',function(req,res,next){
  try{
    res.send({
      data:[
        {user:"test 1", img:{
          src:"https://www.w3schools.com/howto/img_avatar.png",
          alt:"Avatar"
          },
          text:"text de prueba",
          description:"test de descripcion",
          date:"2021-04-18 14:28:01",
          status:{
            pago:"activo",
            tipoDeCuenta:"demo"
          }
        },
        {user:"test 2", img:{
          src:"https://www.w3schools.com/howto/img_avatar.png",
          alt:"Avatar"
          },
          text:"text de prueba",
          description:"test de descripcion",
          date:"2021-04-18 14:28:01",
          status:{
            pago:"lead",
            tipoDeCuenta:"premiun"
          }
        },
        {user:"test 4", img:{
          src:"https://www.w3schools.com/howto/img_avatar.png",
          alt:"Avatar"
          },
          text:"text de prueba",
          description:"test de descripcion",
          date:"2021-04-18 14:28:01",
          status:{
            pago:"lead",
            tipoDeCuenta:"demo"
          }
        },
        {user:"test 3", img:{
          src:"https://www.w3schools.com/howto/img_avatar.png",
          alt:"Avatar"
          },
          text:"text de prueba",
          description:"test de descripcion",
          date:"2021-04-18 14:28:01",
          status:{
            pago:"desactivado",
            tipoDeCuenta:"premium"
          }
        },
        {user:"test 5", img:{
          src:"https://www.w3schools.com/howto/img_avatar.png",
          alt:"Avatar"
          },
          text:"text de prueba",
          description:"test de descripcion",
          date:"2021-04-18 14:28:01",
          status:{
            pago:"activo",
            tipoDeCuenta:"gratuita"
          }
        }
      ]
    })
  }catch(err){
    console.log(err);
    next(err)
  }
})
export default router;