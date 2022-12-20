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
      console.log(db_res)
      const token = jwt.sign({ id: db_res._id,role:db_res.role }, process.env.SECRET, { expiresIn: 86400 });
      res.status(200).send({ token });
    } catch (err) {
      console.log(err);
      next(err);
    }
});



export default router;