import { Schema,model } from "mongoose";
import bcrypt from "bcrypt";
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
  roles:[{
    ref:"Roles",
    type:Schema.Types.ObjectId
  }],
},{
  timestamps:true,
  versionKey:false
});
userSchema.statics.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};
userSchema.statics.comparePassword = async (password, receivedPassword) => {
  return await bcrypt.compare(password, receivedPassword);
};
const User = model("User", userSchema);
export default User;


