import Sidebar from "@/components/main/Sidebar";
import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <main className="relative flex flex-row w-full  ">
      <Sidebar />
      <Outlet />
    </main>
  );
};

export default Layout;
