import { Schema,model } from "mongoose";
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
});
// userSchema.methods.findUser = async function (email) {
//   try {
//   } catch (err) {
//     console.log(err);
//     next(err);
//   }
// };
const User = model("User", userSchema);
export default User;
// export default class Users {
//   static async findUserByEmail(email) {
//     try {
//       var db_res = await global.db.select().table('admin_users').where({ email });
//       if (db_res.length === 0) throw new Error('Email or password is wrong');
//       return db_res[0];
//     } catch (err) {
//       console.log(err);
//       res.status(500).send
//     }
//   }
//   constructor(email, password) {
//     this.email = email;
//     this.password = password;
//   }

// }

