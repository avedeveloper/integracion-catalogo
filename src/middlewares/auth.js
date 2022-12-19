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
  next();
}catch(err){
  next(err);
}

}