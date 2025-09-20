import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SuggestedUsers from "./SuggestedUsers";

const RightSidebar = () => {
  const {user} = useSelector(store=>store.auth)

  return <section className="w-[620px] my-10 ">

      <div className="flex items-center gap-2">
        <Link to={`/profile/${user._id}`}>
          <Avatar>
            <AvatarImage className={'object-cover'} src={user?.profilePicture} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Link>
          <div className="flex items-center gap-3">
            <h1 className="font-semibold text-sm"> <Link to={`/profile/${user._id}`}>{user?.username}</Link> </h1>
            <span className="text-gray-600 text-sm">{user?.bio || 'bio here....'}</span>
          </div>
        </div>
        <SuggestedUsers/>
  </section>;
};

export default RightSidebar;
