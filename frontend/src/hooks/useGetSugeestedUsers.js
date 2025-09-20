import instance from "@/lib/axios.instance";
import { setSuggestedUser } from "@/redux/authSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetSuggestedUsers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllSuggestedUsers = async () => {
      try {
        const res = await instance.get("/user/suggested-user");
        if (res.data.success) {
          dispatch(setSuggestedUser(res.data.users));
          // console.log(res.data.posts)
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllSuggestedUsers();
  }, []);
};

export default useGetSuggestedUsers;
