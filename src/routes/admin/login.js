import { Router } from "express";
import jwt from "jsonwebtoken";
import { randomDelay } from "../../helpers/utils.js";
import Users from "../../model/Users.js";
import "dotenv";
import User from "../../model/Users.js";
import Role from "../../model/Roles.js";
const router = Router();

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    await randomDelay();

    if (!email || !password) throw new Error('Email or password is empty');

    const db_res = await Users.findOne({ email }).populate("roles");

    if (db_res === {}) throw new Error('Email or password is wrong');

    const passwordIsValid = await  Users.comparePassword(password, db_res.password);
    if (!passwordIsValid) return next("Email or password is wrong");
    const token = jwt.sign({ id: db_res._id, role: db_res.roles.map(e=>e.name) }, process.env.SECRET, { expiresIn: 86400 });
    res.status(200).send({ token });
  } catch (err) {
    console.log(err,"error");
    next(err);
  }
});

// router.post("/register", async (req, res, next) => {
//   try {
//     const { email, password, name, roles } = req.body;
//     const userFound = await User.find({ email })
//     if (userFound.length > 0) throw new Error("User already exists")
//     const newUser = new Users({
//       email,
//       password: await Users.encryptPassword(password),
//       name
//     })
//     if(roles){
//       const foundRoles = await Role.find({name:{$in:roles}})
//       newUser.roles = foundRoles.map(role=>role._id)
//     }else{
//       const role = await Role.findOne({name:"user"})
//       newUser.roles = [role._id]
//     }
//     console.log(newUser)
//     const saveUser = await newUser.save()
//     res.status(200).send({ message: "User created", newUser })
//   } catch (err) {
//     console.log(err);
//     next(err);
//   }
// })



export default router;