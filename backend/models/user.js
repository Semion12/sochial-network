import { model, Schema } from "mongoose";

const UserSchema = new Schema({
    firstName:{
        required:true,
        type:String,
        min:2,
        max:50
    },
    lastName:{
        required:true,
        type:String,
        min:2,
        max:50
    },
    email:{
        required:true,
        type:String,
        unique:true,
        max:50
    },
    password:{
        type:String,
        required:true,
        min:5
    },
    pictureUrl:{
        type:String,
        default:''
    },
    friends:{
        type:Array,
        default:[]
    },
    
    location:String,
    occupation:String,
    viewedProfile:Number,
    impressions:Number
}, {timestamps:true})

export const User = model('User', UserSchema)