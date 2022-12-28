import { Schema, model } from "mongoose";

const Roles = new Schema(
  {
    name: {
      type: String
    }
  }, {
  versionKey: false
}
);

export default model("Roles", Roles, "roles");