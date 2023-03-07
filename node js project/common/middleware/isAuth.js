const { StatusCodes } = require('http-status-codes')
//require('dotenv').config()
const jwt = require('jsonwebtoken')
const User = require("../../modules/users/model/userModel")
const rbac = require("../rbac/rbac");
// const rbac = require('./enum/RBAC/rbac')

module.exports = (endpoint) => {
  return async (req, res, next) => {
    console.log(req);
    if (req.headers.authorization.split(' ')[1]) {
       console.log(req)
      const token = req.headers.authorization.split(' ')[1]
      try {
        var decode = jwt.verify(token, process.env.SECERT_KEY)
        console.log('decode', decode)
        const user = await User.findOne({ _id: decode._id })
        if (!user) {
          res.status(StatusCodes.UNAUTHORIZED).json({ message: 'UNAUTHORIZED' })
        } else {
           
          const isAllowed = await rbac.can(decode.role, endpoint)
          console.log(endpoint, decode.role)
          console.log(isAllowed)
          if (isAllowed) {
            req.user = user
            next()
          } else {
            res
              .status(StatusCodes.UNAUTHORIZED)
              .json({ message: 'UNAUTHORIZED************' })
          }
        }
      } catch (error) {
        console.log(error)
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ message: ' INTERNAL SERVER ERROR' })
      }
    }
  }
}
 