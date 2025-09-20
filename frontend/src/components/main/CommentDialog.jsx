import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,

  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

import { Link } from "react-router-dom";
import { MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import Comment from "./Comment";
import { toast } from "sonner";
import instance from "@/lib/axios.instance";
import { setPosts } from "@/redux/postSlice";

const CommentDialog = ({ open, setOpen }) => {

  const [text, setText] = useState("")
  const { selectedPost, posts } = useSelector(store => store.posts)
  const dispatch = useDispatch()
  const [comment, setComment] = useState([])
  console.log(selectedPost)
  const changeEventHandler = (e) => {
    const inputText = e.target.value
    if (inputText.trim()) {
      setText(inputText)
    } else {
      setText("")
    }
  }

  useEffect(() => {
    if (selectedPost) {
      setComment(selectedPost.comments)
    }
  }, [selectedPost])


  const sendMessageHandler = async () => {
    try {
      const res = await instance.post(`/post/${selectedPost._id}/comment`, { text })
      if (res.data.success) {
        toast.success(res?.data?.message)
        const updatedCommentData = [...comment, res?.data?.comment]
        setComment(updatedCommentData)

        const updatedPostData = posts.map(p => p._id === selectedPost._id ? { ...p, comments: updatedCommentData } : p)
        dispatch(setPosts(updatedPostData))
        setText("")
      }

    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message)
    }

  }
  return (
    <section>
      <Dialog open={open}>
        {/* <DialogTrigger>Open</DialogTrigger> */}
        <DialogContent
          onInteractOutside={() => setOpen(false)}
          className={
            "max-w-5xl w-full flex flex-col p-0 outline-0 overflow-hidden"
          }
        >
          <div className="flex flex-1">
            <div className="w-1/2">
              <img
                src={selectedPost?.image}
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
            <div className="w-1/2 flex flex-col justify-between">
              <div className="flex items-center justify-between p-4">
                <div className="flex gap-3 items-center">
                  <Link>
                    <Avatar>
                      <AvatarImage className={'object-cover'} src={selectedPost?.author?.profilePicture} />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </Link>
                  <div>
                    <Link className="font-semibold text-xs">{selectedPost?.author?.username}</Link>
                    {/* <span className="text-gray-600 text-sm">bio here ..</span> */}
                  </div>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <MoreHorizontal className="cursor-pointer" />
                  </DialogTrigger>
                  <DialogContent
                    className={"flex flex-col items-center text-sm text-center"}
                  >
                    <div className="cursor-pointer w-full text-center text-red-500">
                      UnFollow
                    </div>
                    <div className="cursor-pointer w-full text-center ">
                      Add to Favorites
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <hr />
              <div className="flex-1 flex-col overflow-y-auto max-h-auto p-4">
                {
                  comment?.map((comment) => <Comment key={comment._id} comment={comment} />)
                }
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2">
                  <input type="text" placeholder="Add a comment.." value={text} onChange={changeEventHandler} className="w-full outline-none border-gray-300 p-2 rounded-2xl" />
                  <Button className={"cursor-pointer"} disabled={!text.trim()} onClick={sendMessageHandler} variant={"outline"}>Send</Button>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default CommentDialog;
