import dotenv from "dotenv";
import express from "express";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";
import express_session from "express-session";
import "colors";
import connection_db_ave from "./src/db/db_ave.js";
import notfound from './src/middlewares/notfound.js';
import login from './src/routes/admin/login.js';
import handlerError from './src/middlewares/handlerErrors.js';
import auth from "./src/middlewares/auth.js";
import products from "./src/routes/api/products/index.js";
import cron from "./src/routes/api/cron/index.js";
import users from "./src/routes/api/users/index.js";
import { createRoles, createCategories } from "./src/libs/initialSetups.js";
import pruebas from './src/routes/api.js';
// CONFIG DOTENV
var config = dotenv.config();
global.config = config.parsed;

console.log("----------- AVE BACKEND ---------------".magenta);
// VERIFICATION ENV
console.log("----------- CHECK ENV".white);
var required_env_variables = [
  "PORT",
  "environment",
  "db_mongo_user",
  "db_mongo_pass",
  "SALT_ROUNDS",
  "SECRET"
];
var err = false;
required_env_variables.map((e) => {
  if (!process.env[e]) {
    err = true;
    console.error("ERROR: falta variable env:", e);
  }
});
if (err) {
  console.log("----------- ERROR --------------".red);
  process.exit(1);
}

console.log("----------- SUCCESS ENV".green);

// CONFIG EXPRESS
const app = express();
createRoles(); createCategories();
const server = http.Server(app);
if (process.env.environment == "development") {
  console.log("----------- DEVELOPE MODE -------------".blue);
  var corsOptions = {
    credentials: true,
    origin: [
      "http://localhost:9528",
      "http://localhost:3000",
      "http://localhost:9529",
      "http://localhost:9530",
      "http://localhost:9531",
      "http://127.0.0.1:5500",
      "http://127.0.0.1:5501",
    ],
  };
  app.use(cors(corsOptions));
  console.log("----------- CORS ENABLED".yellow);
}
if (process.env.environment == "production") {
  var corsOptions = {
    credentials: true,
    origin: [
      "http://192.168.20.24:5173/",
      "http://172.28.96.1:5173/"
    ]
  }
  app.use(cors(corsOptions));
  console.log("----------- CORS ENABLED IN PRODUCTION".yellow);
}
/*access controll allow origin */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.disable("x-powered-by");
app.use(express_session({
  secret: "session_secret",
  resave: false,
  saveUninitialized: true,
}));


console.log("----------- CONFIG DB".white);
var config_db = `mongodb+srv://${process.env.db_mongo_user}:${process.env.db_mongo_pass}@cluster0.lpr1s.mongodb.net/admin_users?retryWrites=true&w=majority`;

global.db = await connection_db_ave(config_db);
console.log("----------- SUCCESS DB CONNECTION".green);
//Initial set up
// CONFIG ROUTES
console.log("----------- CONFIG ROUTES".white);
app.use("/admin", login);
app.use(auth)
app.use("/api/cron", cron);
app.use("/api/products", products);
app.use("/api/users", users);
app.use("/api", pruebas);
app.use(handlerError)
app.use(notfound);




console.log("----------- SUCCESS ROUTES".green);
console.log("----------- SUCCESS SERVER".green);
console.log("----------- SERVER RUN ON PORT:".green, process.env.PORT.rainbow);
server.listen(process.env.PORT);
console.log("---------------------------------------".green);