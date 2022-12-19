import { Router } from "express";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {randomDelay} from "../../helpers/utils.js";
import Users from "../../model/Users.js";
import "dotenv";
const router = Router();

router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      await randomDelay();
      if (!email || !password) throw new Error('Email or password is empty');
      var db_res = await Users.findUserByEmail(email);

      if (db_res === {}) throw new Error('Email or password is wrong');
      const user = db_res;
      const passwordIsValid = bcrypt.compareSync(password, user.password);

      if (!passwordIsValid) throw new Error('Email or password is wrong');
   
      const token = jwt.sign({ id: user.id }, process.env.SECRET, { expiresIn: 86400 });
      res.status(200).send({ token });
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
});

export default router;