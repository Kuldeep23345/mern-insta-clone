import { KeyRound, Mail, User } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { useState } from "react";
import instance from "@/lib/axios.instance";
import { toast } from "sonner";

const Signup = () => {
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  });
  const inputHandler = (e) => {
    const { name, value } = e.target;
    setInput((prevInput) => ({ ...prevInput, [name]: value }));
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await instance.post("/user/register", input);
      if (res?.data?.success) {
        toast.success(res?.data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Signup faild");
    }
  };

  return (
    <section className="w-full h-screen flex items-center justify-center">
      <form
        onSubmit={submitHandler}
        className="bg-white text-gray-500 max-w-[340px] w-full mx-4 md:p-6 p-4 py-8 text-left text-sm rounded-lg shadow-[0px_0px_10px_0px] shadow-black/10"
      >
        <h2 className="text-2xl font-bold mb-9 text-center text-gray-800">
          Sign Up
        </h2>
        <div className="flex items-center my-2 border bg-indigo-500/5 border-gray-500/10 rounded gap-1 pl-2">
          <User size={"20px"} />
          <input
            className="w-full outline-none bg-transparent py-2.5"
            type="text"
            placeholder="Username"
            required
            name="username"
            onChange={inputHandler}
          />
        </div>
        <div className="flex items-center my-2 border bg-indigo-500/5 border-gray-500/10 rounded gap-1 pl-2">
          <Mail size={"20px"} />
          <input
            className="w-full outline-none bg-transparent py-2.5"
            type="email"
            placeholder="Email"
            required
            name="email"
            onChange={inputHandler}
          />
        </div>
        <div className="flex items-center mt-2 mb-8 border bg-indigo-500/5 border-gray-500/10 rounded gap-1 pl-2">
          <KeyRound size={"20px"} />
          <input
            className="w-full outline-none py-2.5  bg-transparent  "
            type="password"
            placeholder="Password"
            required
            name="password"
            onChange={inputHandler}
          />
        </div>

        <Button
          type="submit"
          className="w-full mb-3 bg-indigo-500 hover:bg-indigo-600 transition-all active:scale-95 py-2.5 rounded text-white font-medium"
        >
          Create Account
        </Button>
        <p className="text-center mt-4">
          Already have an account?{" "}
          <a href="#" className="text-blue-500 underline">
            Log In
          </a>
        </p>
      </form>
    </section>
  );
};

export default Signup;
