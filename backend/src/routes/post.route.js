import express from "express"
import { isAuth } from "../middlewares/isAuth.middleware.js"
import { upload } from "../middlewares/mullter.middleware.js";
import { addComment, addNewPost, bookmarkPost, deletePost, dislikePost, getAllPost, getCommentOfPost, getUserPost, likePost } from "../controllers/post.controller.js";

const router=express.Router()

router.route('/addpost').post(isAuth,upload.single('image'),addNewPost)
router.route('/get').get(isAuth,getAllPost)
router.route('/userpost-all').get(isAuth,getUserPost)
router.route('/:id/like').get(isAuth,likePost)
router.route('/:id/dislike').get(isAuth,dislikePost)
router.route('/:id/comment').get(isAuth,addComment)
router.route('/:id/comment-all').get(isAuth,getCommentOfPost)
router.route('/delete/:id').delete(isAuth,deletePost)
router.route('/:id/bookmark').get(isAuth,bookmarkPost)


export default router