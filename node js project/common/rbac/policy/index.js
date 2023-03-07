const roles = require("../../enum/roles");
const superAdminPolicy = require("./superAdminpolicy");
const adminPolicy = require("./adminPolicy");
const userPolicy = require("./userPolicy");


const opts = {
   
    [roles.SUPER_ADNIM]:{
        can:superAdminPolicy
    },
    [roles.ADMIN]:{
        can:adminPolicy
    },
    
    [roles.USER]:{
        can:userPolicy
    }
}


module.exports= opts;