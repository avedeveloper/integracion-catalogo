import { Schema, model } from 'mongoose';

const categorySchema = new Schema({
  name: String,
  description: String,
  status: {
    type: Boolean,
    default: true,
  },
  subcategories: [{
    ref:"SubCategory",
    type:Schema.Types.ObjectId
  }]
}, {
  timestamps: true,
  versionKey: false,

});
export default model('Category', categorySchema);