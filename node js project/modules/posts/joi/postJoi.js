const Joi = require("joi");
module.exports ={
    createPostSchema:{
        body:Joi.object().keys({
            title:Joi.string().required(),
            description:Joi.string().optional(),
            createdBy:Joi.string().required()
        })

    },
  editPostSchema:{
      body:Joi.object().keys({
        title:Joi.string().required(),
        newTitle:Joi.string().optional(),
        description:Joi.string().optional(),
        newDescription:Joi.string().optional(),
        createdBy:Joi.string().required()
      })
  },
  deletePostSchema:{
      params:Joi.object().keys({
        id:Joi.required()
      })
  }
};