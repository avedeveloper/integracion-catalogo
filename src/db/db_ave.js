import mongoose from "mongoose";
import colors from "colors";
import dotenv from "dotenv";

export default async function connection_db_ave(connection) {
  // CONFIG mongoose
  mongoose.set('strictQuery', true);
 await mongoose.connect(connection,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then( () => {console.log("----------- SUCCESS DB CONNECTION".green);})
  .catch( (err) => {
    console.log("----------- ERROR --------------".red);
    console.log(err);process.exit(1);
  });
};
