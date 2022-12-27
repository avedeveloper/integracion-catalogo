import "dotenv"
import jwt from "jsonwebtoken";
export default function auth(req, res, next) {
try{
  const auth = req.get("authorization");
  let token = null;
  if (auth && auth.toLowerCase().startsWith("bearer ")) {
    token = auth.substring(7);
  }
  if (!token) next("No token provided.");
  const decoded = jwt.verify(token, process.env.SECRET);
  req.user = decoded;
  if (!req.user) next("No user found.");
  if(!req.user.role || req.user.role.length === 0) next("No role found.");
  next();
}catch(err){
  next(err);
}

}