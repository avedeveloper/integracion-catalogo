import {Router} from 'express';
import {v1 as uuidv1} from 'uuid'; 
var router = Router();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
}
);

// define predefinited use
router.get('/',async function(req, res) {
try{
  res.status(200).send({menssage:'Birds home page',data:response});
}catch(err){
console.log(err);
res.status(500).send(err);
}
});

router.post('/',async function(req, res) {
  try{
//load a new user in db
    const id = Math.floor(Math.random() * 1000000000);
    const nombre_usuario = req.query.nombre_usuario || 'no name';
    const email = req.query.email || 'no email';
    const response = await global.db('usuarios').insert({id,nombre_usuario,email})
    res.status(200).send({menssage:'Birds home page',data:response});
  }catch(err){
  console.log(err);
  res.status(500).send(err);
  }
})
export default router;