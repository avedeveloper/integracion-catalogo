import mongoose from "mongoose";
import Roles from "../model/Roles.js";


export default function permissions(req, res, next) {
  const { role } = req.user;
  try{
    if(role == null)next("Role not found.");

    Roles.findOne({
      name: role
    }, 
    (err, role) => {
      if (err)next(err);
  
      if (!role)next("Role not found.");
      req.role = {name:role.name,permissions:role.permissions.split(",")};
      if(req.role.permissions.length < 1)next("Permissions denied.");
      next();
    })
  }catch(err){
    next(err);
  }
}