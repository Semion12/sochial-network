import { compare, genSaltSync, hashSync } from "bcrypt"
import { User } from "../models/user.js";
import jwt from 'jsonwebtoken'
import { validationResult } from "express-validator";

export const reqister = async (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            pictureUrl,
            friends,
            location,
            occupation,
            
        } = req.body
        
        const salt = genSaltSync();
        const hash = hashSync(password, salt);
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hash,
            pictureUrl,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 1000),
            impressions: Math.floor(Math.random() * 1000)
        })
        
        const savedUser = await newUser.save()
        
        res.status(201).json(savedUser)
        
    }catch(e){
        res.send(e)
    }
    
}

export const login = async (req, res)=>{
    
    const {email, password} = req.body
    console.log(email, password)
    const user = await User.findOne({email})
    console.log(user)
    if (!user){
        return res.status(400).json({msg:'user is not exist'})
    }
    
    const isMatch = await compare(password, user.password)
    
    if (!isMatch){
        return res.status(400).json({msg:'the data is incorrect'})
    }
    
    const token = jwt.sign({id:user._id}, process.env.SECRET_KEY)
    

    res.status(200).json({user, token:token})
    
}