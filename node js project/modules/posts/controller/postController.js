const { StatusCodes } = require("http-status-codes")
const User = require("../../users/model/userModel")
const Post = require("../model/postModel")


const createPost = async(req,res)=>{
    const { title , description , createdBy } = req.body
    
    try {
        const userIdCheck = await User.findOne({_id:createdBy })
        if(userIdCheck){
       const newpost = Post({title  , description , createdBy})
       const savedpost = await newpost.save()

        res.status(StatusCodes.CREATED).json({message:"Post Created" , post:savedpost})
        }else{
        res.status(StatusCodes.BAD_REQUEST).json({message:"invalid userId"})

        }
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"Create is Fail"})
        
    }
}
const  editPost = async(req,res)=>{
    //console.log(req.body.createdBy)
    const{createdBy , title , newTitle , newDescription}  = req.body 
    try {
         if(createdBy == req.body.createdBy){  //to check if user id the post owner or not
           const modifiedPost = await Post.findOne({createdBy , title})
           if(modifiedPost){
            await Post.updateOne({title} , { title:newTitle , description : newDescription})
            res.status(StatusCodes.OK). json({message:"the post is Edited" })

           }else{
             res.status(StatusCodes.BAD_REQUEST). json({message:"there is no post with this title createdBy this user"})

           }
         }else{
             res.status(StatusCodes.BAD_REQUEST). json({message:"sory you can't edit this post"})
         }
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR). json({message:"edit fail" , error})
        
    }
};
const deletePost = async(req,res)=>{
    const {id}= req.params ;
    try {
        const data = await Post.deleteOne({ _id: id });
        if (data.deletedCount) {
          res.json({ message: "post deleted success", data });
        } else {
          res.json({ message: "that post  is not exist", data });
        }
      } catch (error) {
        res.json({ message: "Error", error });
      }
}

module.exports= {
    createPost,
    editPost,
    deletePost
}