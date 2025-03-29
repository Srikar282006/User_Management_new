const User = require("../models/user.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSignUp = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ message: "Give valid details" });
        }

        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const hashpwd = await bcrypt.hash(password, 10);
        const newUser = await User.create({ email, password: hashpwd });


        let token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY, { expiresIn: "1h" });
        return res.status(201).json({ token, user: newUser });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const userLogin=async(req,res)=>{
    const {email,password}=req.body
    try{
        if (!email ||!password){
            return res.status(400).json({ message: "Invalid credientials" });
        }
        let user=await User.findOne({email})
        const isMatch=bcrypt.compare(password,user.password)
        if(user && isMatch){
         let token=await jwt.sign({email,id:user._id},process.env.SECRET_KEY)
         return res.status(200).json({token,user})
        }
        else{
            return res.status(400).json({ message: "Give valid email" });

        }
    }catch(error){
        return res.status(200).json({message:error.message})
    }
}

const getUser=async(req,res)=>{
    try{
        const user=await User.findById(req.params.id)
        if(!user){
            return res.status(404).json({message:"User not Found "})
        }
        return res.status(200).json({email:user.email})
    }catch(error){
        return res.status(500).json({message:error.message})
    }
   

}

module.exports = { userSignUp,userLogin,getUser};
