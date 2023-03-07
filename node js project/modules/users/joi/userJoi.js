const Joi = require("joi");

module.exports ={
    signUpSchema:{
        body:Joi.object().keys({
            userName:Joi.string().required(),
            email:Joi.string().email().required(),
            password:Joi.string().required().trim(),
            cpassword:Joi.string().valid(Joi.ref('password')).trim(),
            phone:Joi.number(),
            location:Joi.string(),
            role:Joi.string().required()
        })
    },
    signInSchema:{
        body:Joi.object().keys({
            email:Joi.string().email().required(),
            password:Joi.string().required().trim()
        })
    }
}