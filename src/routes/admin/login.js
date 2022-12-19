import { Router } from "express";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {randomDelay} from "../../helpers/utils.js";
import Users from "../../model/Users.js";
import "dotenv";
const router = Router();

router.post("/login", async (req, res,next) => {
    try {
      const { email, password } = req.body;

      await randomDelay();
      
      if (!email || !password) throw new Error('Email or password is empty');
      
      const db_res = await Users.findOne({ email })
      
      if (db_res === {}) throw new Error('Email or password is wrong');
      
      const passwordIsValid = bcrypt.compareSync(password, db_res.password);
      
      if (!passwordIsValid) throw new Error('Email or password is wrong');
   
      const token = jwt.sign({ id: db_res._id }, process.env.SECRET, { expiresIn: 86400 });
      res.status(200).send({ token });
    } catch (err) {
      console.log(err);
      next(err);
    }
});

// router.post("/register", async (req, res,next) => {
//   try{
//     const salt = parseInt(process.env.SALT_ROUNDS);
//     const user = new Users({
//       email: 'pepe@pepe.com',
//       password: bcrypt.hashSync('pepe', salt),
//       name: 'adminDeveloper',
//       role: 'admin',
//     });
//     await user.save();
//     res.status(200).send({menssage:'User created',data:user});

//   }catch(err){
//     next(err);
//   }
// })

export default router;