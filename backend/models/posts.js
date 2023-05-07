import { model, Schema } from "mongoose";

const postsSchema = new Schema({
    userId:{
        type:String,
        required:true
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    location:String,
    description:String,
    userPicturePath:String,
    picturePath:String,
    likes:{
        type:Number,
        
    },
    comments:{
        type:Array,
        default:[]
    }
    
}, {timestamps:true})

export const Post = model('Posts', postsSchema)