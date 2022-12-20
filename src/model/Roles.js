import {Schema,model} from "mongoose";

const Roles = new Schema({
  name: {
    type: String,
    required: true,
  },
  permissions: {
    type: String,
    required: true,
  },
});

export default model("Roles", Roles, "roles");