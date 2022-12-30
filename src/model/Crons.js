import {Schema,model} from "mongoose";

const cronSchema = new Schema({cronId: String,time: String,api: String,errors:Array},{timestamps: true, versionKey: false})
return model('Crons',cronSchema)