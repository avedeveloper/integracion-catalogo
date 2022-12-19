import knex from "knex";
import colors from "colors";
import dotenv from "dotenv";

export default async function connection_db_ave(connection, client) {
try{
  // CONFIG KNEKX
  console.log("----------- CONFIG KNEKX".white);
  return knex({
    client,
    connection,
    pool: { min: 0, max: 7 },
    log: {
      warn(message) {
        console.log("----------- WARNING DB --------------".yellow);
        console.log(message.yellow)
      },
      error(message) {
        console.log("----------- ERROR DB --------------".red);
        console.log(message.yellow)

      },
      deprecate(message) {
        console.log("----------- DEPRECATE DB --------------".red);
        console.log(message.yellow)

      },
      debug(message) {
        console.log("----------- DEBUG DB --------------".blue);
        console.log(message.yellow)

      }
    }

  })
}catch(err){
  console.log(err);
  return {};

}
};
