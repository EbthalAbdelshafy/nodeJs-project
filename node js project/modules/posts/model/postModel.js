


const mongoose = require("mongoose")
const PostSchema = require("../Schema/postSchema")
const UserSchema = require("../../users/Schema/userSchema")

const Post = mongoose.model("Post" , PostSchema)

module.exports = Post;