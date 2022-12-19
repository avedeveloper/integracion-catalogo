import dotenv from "dotenv";
import express from "express";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";
import express_session from "express-session";
import knex from "knex";
import colors from "colors";
import api from "./src/routes/api.js";
import connection_db_ave from "./src/db/db_ave.js";
import notfound from './src/middlewares/notfound.js';
import login from './src/routes/admin/login.js';
import handlerError from './src/middlewares/handlerErrors.js';
import auth from "./src/middlewares/auth.js";
// CONFIG DOTENV
var config = dotenv.config();
global.config = config.parsed;

console.log("----------- AVE BACKEND ---------------".magenta);
// VERIFICATION ENV
console.log("----------- CHECK ENV".white);
var required_env_variables = [
  "service_port",
  "environment",
  "db_host",
  "db_port",
  "db_user",
  "db_password",
  "db_database",
  "db_type"
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
const server = http.Server(app);
if(process.env.environment == "development"){
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
app.use(bodyParser.json());
app.disable("x-powered-by");
app.use(express_session({
  secret: "session_secret",
  resave: false,
  saveUninitialized: true,
}));

const config_db = {
  host: process.env.db_host,
  port: process.env.db_port,
  user: process.env.db_user,
  password: process.env.db_password,
  database: process.env.db_database
}
console.log("----------- CONFIG DB".white);
global.db = await connection_db_ave(config_db,process.env.db_type);
console.log("----------- SUCCESS DB CONNECTION".green);

// CONFIG ROUTES
console.log("----------- CONFIG ROUTES".white);
app.use("/admin",login);
app.use(auth)
app.use("/api", api);
app.use("/", (req, res) => {
  res.send({data:req.user});
});

app.use(handlerError)
app.use(notfound);




console.log("----------- SUCCESS ROUTES".green);
console.log("----------- SUCCESS SERVER".green);
console.log("----------- SERVER RUN ON PORT:".green,process.env.service_port.rainbow);
server.listen(process.env.service_port);
console.log("---------------------------------------".green);