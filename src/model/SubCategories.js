import {Schema, model} from 'mongoose';

const subCategorySchema = new Schema({
  name: String,
  description: String},{
    versionKey: false,
  });

export default model('SubCategory', subCategorySchema);