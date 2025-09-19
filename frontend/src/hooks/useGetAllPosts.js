import instance from "@/lib/axios.instance";
import { setPosts } from "@/redux/postSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllPosts = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const res = await instance.get("/post/get");
        if (res.data.success) {
          dispatch(setPosts(res.data.posts));
          // console.log(res.data.posts)
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllPosts();
  }, []);
};

export default useGetAllPosts;
