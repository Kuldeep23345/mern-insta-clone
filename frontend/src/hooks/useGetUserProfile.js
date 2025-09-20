import instance from "@/lib/axios.instance";
import { setUserProfile } from "@/redux/authSlice";
import { setPosts } from "@/redux/postSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const useGetUserProfile = (userId) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await instance.get(`/user/${userId}/profile`);
        if (res.data.success) {
          dispatch(setUserProfile(res.data.user));
          // console.log(res.data.posts)
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserProfile();
  }, [userId]);
};

export default useGetUserProfile;
