import React, { useState } from "react";
import {
  Dialog,
  DialogContent,

  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Link } from "react-router-dom";
import { MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";

const CommentDialog = ({ open, setOpen }) => {

  const [text,   setText]  = useState("")
  const changeEventHandler =(e)=>{
    const inputText = e.target.value
    if(inputText.trim()){
      setText(inputText)
    }else{
      setText("")
    }
  }
  const sendMessageHandler =()=>{
    alert(text)
  }
  return (
    <section>
      <Dialog open={open}>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent
          onInteractOutside={() => setOpen(false)}
          className={
            "max-w-5xl w-full flex flex-col p-0 outline-0 overflow-hidden"
          }
        >
          <div className="flex flex-1">
            <div className="w-1/2">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX6Mi24zLzk0iWVS7h62M_fSF92uxyHxr8dg&s"
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
            <div className="w-1/2 flex flex-col justify-between">
              <div className="flex items-center justify-between p-4">
                <div className="flex gap-3 items-center">
                  <Link>
                    <Avatar>
                      <AvatarImage src="" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </Link>
                  <div>
                    <Link className="font-semibold text-xs">username</Link>
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
                comments ayenge
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
