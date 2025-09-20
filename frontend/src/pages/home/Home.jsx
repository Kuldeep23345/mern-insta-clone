import Feed from "@/components/main/Feed";
import RightSidebar from "@/components/main/RightSidebar";
import useGetAllPosts from "@/hooks/useGetAllPosts";
import useGetSuggestedUsers from "@/hooks/useGetSugeestedUsers";
import React from "react";
import { Outlet } from "react-router-dom";

const Home = () => {
  useGetAllPosts()
  useGetSuggestedUsers()
  return (
    <main className="w-full pl-[200px] flex ">
      <Feed />
      <Outlet />
      <RightSidebar />
    </main>
  );
};

export default Home;
