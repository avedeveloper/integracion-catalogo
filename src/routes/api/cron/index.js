import {Router} from 'express';
import permissions from '../../../middlewares/permissions.js';
const router = Router();

router.post('/',permissions.isAdmin,function(req,res,next){
  try{
    res.send({data:["Apr 18 14:28:01 glpi CRON[866]: (root) CMD (/home/glpi/glpi/front/cron.js)"
    ,"Apr 18 14:28:01 glpi CRON[866]: (root) CMD (/home/glpi/glpi/front/cron.php)",
    "Apr 18 14:28:01 glpi CRON[866]: (root) CMD (/home/glpi/glpi/front/cron.php)",]});
  }catch(err){
    console.log(err);
    next(err)
  }
})

export default router;