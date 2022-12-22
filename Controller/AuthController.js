import UserModel from "../models/UserModel.js"
import bcrypt from "bcrypt"

export const login = async (req, res)=>{
   const { username , password} = req.body
   try {
     const user = await UserModel.findOne({username: username});
     if(user){
        const validPassword = await bcrypt.compare(password, user.password);
        if(validPassword){
            const { password, ...otherData } = user._doc;
            res.status(200).json(otherData);
        }
        else{
            res.status(403).json("Invalid password");
        }
     }
     else{
        res.status(403).json("Invalid username");
     }
   } catch (err) {
      res.status(500).json(err);
   }
};

export const register = async (req, res)=>{
    const { name, username, email, password} = req.body;
    try {
       const emailExist = await UserModel.findOne({email});
       if(emailExist){
          res.status(400).json("Email already exist");
          return;
       }

       const usernameExist = await UserModel.findOne({username});
       if(usernameExist){
        res.status(400).json("username already exist");
        return;
       }

       const salt = await bcrypt.genSalt(10);
       const hashedPassword = await bcrypt.hash(password, salt);

       const newUser = new UserModel({name, username, password: hashedPassword, email});
       const user = await newUser.save();

       res.status(200).json(user);

    } catch (err) {
        res.status(500).json(err);
    }
}