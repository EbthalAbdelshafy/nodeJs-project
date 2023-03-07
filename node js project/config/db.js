const mongoose = require("mongoose");
const dbConnection = ()=>
mongoose.connect(process.env.LOCAL_CONNECTION).then((result)=>{
    console.log("dataBase connected");
    
}).catch((error)=>{
    console.log(error);
})

module.exports=dbConnection;