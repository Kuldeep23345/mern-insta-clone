import {
  Heart,
  Home,
  LogOut,
  MessageCircle,
  PlusSquare,
  Search,
  TrendingUp,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import instance from "@/lib/axios.instance";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const sidebarItems = [
  {
    icon: <Home />,
    text: "Home",
  },
  {
    icon: <Search />,
    text: "Search",
  },
  {
    icon: <TrendingUp />,
    text: "Explore",
  },
  {
    icon: <MessageCircle />,
    text: "Message",
  },
  {
    icon: <Heart />,
    text: "Notifications",
  },
  {
    icon: <PlusSquare />,
    text: "Create",
  },
  {
    icon: (
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    ),

    text: "Profile",
  },
  {
    icon: <LogOut />,
    text: "Logout",
  },
];


const Sidebar = () => {
    const navigate = useNavigate();
    const logoutHandler = async () => {
      try {
        const res = await instance.get("/user/logout");
        if (res.data.success) {
          toast.success(res?.data?.message);
          navigate("/login");
        }
      } catch (error) {
        console.log(error);
        toast.error(error?.data?.response?.message);
      }
    };
  const sidebarHandler = (item) => {
    if (item.text.toLowerCase() == "logout") {
      logoutHandler();
    }
  };
  return (
    <section className="w-[240px] fixed h-screen  top-0 bottom-0 left-0 z-10 border-r border-gray-300/40">
      <div className="flex flex-col gap-8 pl-10 mt-28">
        {sidebarItems.map((item, index) => (
          <div
            onClick={() => sidebarHandler(item)}
            key={index}
            className="flex items-center  gap-2"
          >
            {item.icon}
            <span>{item.text}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Sidebar;
