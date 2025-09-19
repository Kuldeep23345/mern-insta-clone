import Feed from "@/components/main/Feed";
import RightSidebar from "@/components/main/RightSidebar";
import useGetAllPosts from "@/hooks/useGetAllPosts";
import React from "react";
import { Outlet } from "react-router-dom";

const Home = () => {
  useGetAllPosts()
  return (
    <main className="w-full pl-[240px] flex ">
      <Feed />
      <Outlet />
      <RightSidebar />
    </main>
  );
};

export default Home;
