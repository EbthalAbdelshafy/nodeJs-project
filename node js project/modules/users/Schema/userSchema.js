const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


const userSchema = new mongoose.Schema({
    userName:String,
    email:String,
    password:String,
    phone:Number,
    location:String,
    role:{
        type:String,
        default:"user"
    },
    verfiedAccount:{
        type:Boolean,
        default:false
    },
    blockByAdmin:{
        type:Boolean,
        default:false
    },
    reportedAccount:{
        type:Boolean,
        default:false
    }

},
{
    timestamps:true
});
userSchema.pre("save",async function(next){
    this.password= await bcrypt.hash(this.password,7);
});


module.exports = userSchema;