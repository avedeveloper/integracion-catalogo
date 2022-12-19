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

  }catch(err){
  console.log(err);
  res.status(500).send(err);
  }
})
export default router;