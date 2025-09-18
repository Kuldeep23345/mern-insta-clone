import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Bookmark, MessageCircle, MoreHorizontal, Send } from "lucide-react";
import { FaRegHeart } from "react-icons/fa";
import { Button } from "../ui/button";
import CommentDialog from "./CommentDialog";

const Post = () => {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false)
  const changeEventHandler = (e) => {
    const inputText = e.target.value;
    if (inputText.trim()) {
      setText(inputText);
    } else {
      setText("");
    }
  };
  return (
    <div className="my-8 w-full max-w-sm mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h1>username</h1>
        </div>
        <Dialog>
          <DialogTrigger>
            <MoreHorizontal className="cursor-pointer" />
          </DialogTrigger>
          <DialogContent className={"px-0 py-4"}>
            {[
              "Report",
              "Unfollow",
              "Add to Favorites",
              "Go to post",
              "About this account",
              "Cancel",
            ].map((item, index) => (
              <div key={index}>
                <Button
                  className={`w-full bg-transparent text-md text-gray-700  hover:bg-transparent border-b border-gray-400/20
                    ${index == 1 || index == 0 ? `text-red-500` : ""}`}
                >
                  {item}
                </Button>
              </div>
            ))}
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex items-center justify-center">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX6Mi24zLzk0iWVS7h62M_fSF92uxyHxr8dg&s"
          alt=""
        />
      </div>
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-center gap-3 my-2">
            <FaRegHeart size={"22px"} className="cursor-pointer" />
            <MessageCircle onClick={()=>setOpen(true)} className="cursor-pointer hover:text-gray-600" />
            <Send className="cursor-pointer hover:text-gray-600" />
          </div>
          <Bookmark className="cursor-pointer hover:text-gray-600" />
        </div>
      </div>
      <span className="font-medium block mb-2">1k Likes</span>
      <p>
        <span className="font-medium mr-2">Username</span>
        caption
      </p>
      <span className="cursor-pointer text-sm text-gray-400"  onClick={()=>setOpen(true)}>View all 10 comments</span>
      <CommentDialog open={open} setOpen={setOpen} />
      <div className="flex items-center justify-between">
        <input
          type="text"
          placeholder="Add a comment...."
          value={text}
          onChange={changeEventHandler}
          className="outline-none text-sm w-full"
        />
        {text && <span className="text-[#3BADF8]">Post</span>}
      </div>
    </div>
  );
};

export default Post;
