
const User = require("../model/userModel");
const jwt =require("jsonwebtoken");
const bcrypt = require("bcrypt")
const sendEmail = require("../../../common/services/sendEmail")
const { StatusCodes } = require("http-status-codes");
const signUp = async (req,res)=>{
    
    try {
    const { userName , email , password ,cpassword , phone , location ,role } = req.body ;
       if(password==cpassword){
           const emailCheck = await User.findOne({email})
           if(emailCheck){
               res.status(StatusCodes.BAD_REQUEST).json({Message :" this Email is already exist "});
           }else {
               
               const token = jwt.sign({email}, process.env.SECRET_KEY);
               const info = sendEmail(
                [email],
                `<a href='http://localhost:5000/userActivate/${token}'>User Activation </a> `
              );
              if ((await info).messageId) {
                const newUser =new User({userName , email , password , phone , location ,role});
               const data = await newUser.save();
                res
                  .status(StatusCodes.CREATED)
                  .json({ message: "User Created", data });
              } else {
                res
                  .status(StatusCodes.INTERNAL_SERVER_ERROR)
                  .json({ message: "Error " });
              }
              // res.status(StatusCodes.CREATED).json({Message : "User Created" , data})
               
           }
       } else{
        res
        .status(StatusCodes.BAD_REQUEST)
        .json({ Message: "confirmation password must match password " });
       }
    } catch (error) {
        console.log(error)
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'sign up is fail' })
    }
};
const signIn = async(req,res)=>{
    const {email , password } = req.body
    try {
        const emailcheck = await User.findOne({email})
        if(emailcheck){
             const match = await bcrypt.compare(password ,emailcheck.password )
             if(match){
                const token = jwt.sign({
                    email:emailcheck.email,
                    role:emailcheck.role,
                    _id:emailcheck._id
                } , process.env.SECRET_KEY);
                
            res.status(StatusCodes.OK).json({message:"log in success" , user_token : token})
                    
             }else{
            res.status(StatusCodes.BAD_REQUEST).json({message:"invalid email or password"})

             }
        }else{
            res.status(StatusCodes.BAD_REQUEST).json({message:"invalid email or password"})
        }
    } catch (error) {
        console.log(error)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"login is fail"})
        
    }
};


module.exports = { signUp , signIn}