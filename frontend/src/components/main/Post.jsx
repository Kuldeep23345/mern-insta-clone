import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Bookmark, MessageCircle, MoreHorizontal, Send } from "lucide-react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Button } from "../ui/button";
import CommentDialog from "./CommentDialog";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import instance from "@/lib/axios.instance";
import { setPosts, setSlectedPost } from "@/redux/postSlice";

const Post = ({ post }) => {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false)
  const [postLike, setPostLike] = useState(post?.likes?.length)
  const [comment, setComment] = useState(post?.comments)
  const { user } = useSelector(store => store.auth)
  const { posts } = useSelector(store => store.posts)
  const dispatch = useDispatch()
  const [liked, setLiked] = useState(post?.likes.includes(user?._id) || false)
  const changeEventHandler = (e) => {
    const inputText = e.target.value;
    if (inputText.trim()) {
      setText(inputText);
    } else {
      setText("");
    }
  };

  const deletePostHandler = async () => {
    try {
      const res = await instance.delete(`/post/delete/${post?._id}`)
      if (res.data.success) {
        const updatedPostData = posts?.filter((postItem) => postItem?._id !== post?._id)
        dispatch(setPosts(updatedPostData))
        toast.success(res?.data?.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message)
    }

  }

  const likeOrDislikeHandler = async () => {
    try {
      const action = liked ? 'dislike' : 'like'
      const res = await instance.get(`/post/${post?._id}/${action}`)
      if (res.data.success) {
        const updatedLike = liked ? postLike - 1 : postLike + 1;
        setLiked(!liked)
        setPostLike(updatedLike)

        toast.success(res?.data?.message)

        const updatedPostData = posts.map(p => p._id === post._id ? { ...p, likes: liked ? p.likes.filter(id => id !== user._id) : [...p.likes, user._id] } : p);
        dispatch(setPosts(updatedPostData))

      }

    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message)
    }

  }

  const commentHandler = async () => {
    try {
      const res = await instance.post(`/post/${post._id}/comment`, { text })
      if (res.data.success) {
        toast.success(res?.data?.message)
        const updatedCommentData = [...comment, res?.data?.comment]
        setComment(updatedCommentData)

        const updatedPostData = posts.map(p => p._id === post._id ? { ...p, comments: updatedCommentData } : p)
        dispatch(setPosts(updatedPostData))
        setText("")
      }

    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message)
    }

  }
  return (
    <div className="my-8 w-full max-w-sm mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage className={'object-cover'} src={post?.author?.profilePicture} />
            <AvatarFallback><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwRKRDbqqn3ily8fQJyYjGKww0I17Jld-ZGA&s" alt="CN" /></AvatarFallback>
          </Avatar>
          <h1>{post?.author?.username}</h1>
        </div>
        <Dialog>
          <DialogTrigger>
            <MoreHorizontal className="cursor-pointer" />
          </DialogTrigger>
          <DialogContent className={"px-0 py-4 flex items-center flex-col"}>
            <Button variant={'ghost'} className={'cursor-pointer w-fit text-[#ED4956] font-bold'}>Unfollow</Button>
            <Button variant={'ghost'} className={'cursor-pointer w-fit font-bold'}>Add to Favorites</Button>

            {
              user && user?._id === post?.author._id && <Button onClick={deletePostHandler} variant={'ghost'} className={'cursor-pointer w-fit  font-bold'}>Delete</Button>
            }

          </DialogContent>
        </Dialog>
      </div>
      <div className="flex items-center justify-center w-full h-auto">
        <img
          src={post?.image}
          alt="post-img"
          className="w-full mt-2 h-[400px] object-cover"
        />
      </div>
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-center gap-3 my-2">
            {
              liked ? <FaHeart onClick={likeOrDislikeHandler} size={"22px"} className="cursor-pointer text-red-500" /> : <FaRegHeart onClick={likeOrDislikeHandler} size={"22px"} className="cursor-pointer" />
            }

            <MessageCircle onClick={() => { dispatch(setSlectedPost(post)); setOpen(true) }} className="cursor-pointer hover:text-gray-600" />
            <Send className="cursor-pointer hover:text-gray-600" />
          </div>
          <Bookmark className="cursor-pointer hover:text-gray-600" />
        </div>
      </div>
      <span className="font-medium block mb-2">{postLike} likes</span>
      <p>
        <span className="font-medium mr-2">{post?.author?.username}</span>
        {post?.caption}
      </p>

      {
        comment.length > 0 && (
          <span className="cursor-pointer text-sm text-gray-400" onClick={() => { dispatch(setSlectedPost(post)); setOpen(true) }}>View all {comment.length} comments</span>
        )
      }

      <CommentDialog open={open} setOpen={setOpen} />
      <div className="flex items-center justify-between">
        <input
          type="text"
          placeholder="Add a comment...."
          value={text}
          onChange={changeEventHandler}
          className="outline-none text-sm w-full"
        />
        {text && <span onClick={commentHandler} className="text-[#3BADF8] cursor-pointer">Post</span>}
      </div>
    </div>
  );
};

export default Post;
