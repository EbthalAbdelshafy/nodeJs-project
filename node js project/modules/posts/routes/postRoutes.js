const validation = require("../../../common/middleware/validation");
const { createPost, editPost, deletePost } = require("../controller/postController");
const { createPostSchema, editPostSchema, deletePostSchema } = require("../joi/postJoi");

const router = require("express").Router();

router.post("/createPost", validation(createPostSchema),createPost);
router.put("/editPost",validation(editPostSchema), editPost);
router.delete("/deletePost/:id",validation(deletePostSchema),deletePost);
module.exports = router;