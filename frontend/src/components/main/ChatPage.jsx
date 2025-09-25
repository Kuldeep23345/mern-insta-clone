import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarImage } from "../ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { setSelectedUser } from "@/redux/authSlice";

const ChatPage = () => {
  const { user, suggestedUser,selectedUser } = useSelector((store) => store.auth);
  const isOnlie = true
  const dispatch= useDispatch()

  return (
    <div className="flex ml-[16%] h-screen">
      <section>
        <h1 className="font-bold mb-4 px-3 text-xl">{user?.username}</h1>
        <hr className="mb-4 border-gray-300" />
        <div className="overflow-y-auto h-[80vh]">
          {suggestedUser?.map((suggestedUser) => (
            <div onClick={()=>{dispatch(setSelectedUser(suggestedUser))}} key={suggestedUser._id} className="flex gap-3 items-center p-3 hover:bg-gray-50 cursor-pointer">
              <Avatar>
                <AvatarImage src={suggestedUser?.profilePicture} />
                <AvatarFallback>Cn</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="font-medium">{suggestedUser?.username}</span>
                    <span className={`text-xs font-bold ${isOnlie ? "text-green-600":"text-red-600"}`}>{isOnlie?"online":"offline"}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {
        
      }
    </div>
  );
};

export default ChatPage;
