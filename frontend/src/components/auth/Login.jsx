import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  replaceAddress,
  setAddress,
  setShowUserLogin,
  setUser,
} from "../../features/appSlice";

import axiosInstance from "../../api/axios.js"
import { useForm } from "react-hook-form";
import { Shield, Star, Users, X } from "lucide-react";

export default function Login() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.app.user);
  const address = useSelector((state) => state.app.address);
  const [state, setState] = useState("login");
  const [loginError, setLoginError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const handleLogin = async (data) => {
    const { email, password } = data;
    setLoginError("");
    try {
      const response = await axiosInstance.post("/user/login", {
        email,
        password,
      });

      if (response.data.success) {
        dispatch(setUser(response.data.user));
        localStorage.setItem("user", JSON.stringify(response.data.user));
        dispatch(setShowUserLogin(false));

        try {
          const addressResponse = await axiosInstance.get(
            `/address/get/${response.data.user._id}`
          );
          dispatch(replaceAddress(addressResponse.data.addresses));
          localStorage.setItem(
            "addresses",
            JSON.stringify(addressResponse.data.addresses)
          );
        } catch (error) {
          console.log(error.message);
        }
      } else {
        setLoginError(response.data.message || "Login failed");
      }
    } catch (error) {
      setLoginError(
        error.response?.data?.message || error.message || "Something went wrong"
      );
    }
  };
  const handleGoogle = async () =>{
     try {
       window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
    }catch(error){
      console.error("Google Login error:", error.response?.data || error.message);
    }
  }

  const handleRegistration = async (data) => {
    const { email, password, name, image } = data;
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("image", image[0]);

      const res = await axiosInstance.post("/user/register", formData);

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        localStorage.setItem("user", JSON.stringify(res.data.user));
        dispatch(setShowUserLogin(false));
      }
    } catch (error) {
      console.error("Registration error:", error.response?.data || error.message);
    }
  };

  if (user) return null;

  return (
    <div
      onClick={() => dispatch(setShowUserLogin(false))}
      className="fixed inset-0 z-70 flex items-center justify-center bg-black/70 p-4 text-sm text-gray-600"
    >
      <div className="flex bg-white rounded-2xl overflow-hidden shadow-2xl max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
        <div className="hidden md:block w-2/3">
           <WelcomeBack/>
        </div>

        <form
          onSubmit={
            state === "login"
              ? handleSubmit(handleLogin)
              : handleSubmit(handleRegistration)
          }
          className="relative flex flex-col gap-4 p-8 w-full md:w-1/2 bg-white"
        >
          <span   className="absolute right-10 top-6 hover:text-green-600 cursor-pointer"><X/></span>
          <h2 className="text-3xl font-bold text-center text-green-800 mb-4">
            {state === "login" ? "User Login" : "Create Account"}
          </h2>
          <p className="text-center text-[16px]">Welcome back! Please sign in to continue</p>
           <button onClick={handleGoogle} className="flex  justify-center gap-3 bg-[#F0F0F2] rounded-3xl hover:bg-gray-400/40 cursor-pointer py-2.5"><img src="google.png" alt="google png" className="size-5 " /><span className="text-[16px]">Google</span></button>
          {state === "register" && (
            <>
              <div className="w-full">
                <label className="font-semibold">Name *</label>
                <input
                  {...register("name", { required: "Name is required" })}
                  className={`mt-1 w-full p-3 border rounded-xl focus:ring-2 focus:ring-green-600 ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter name"
                />
                {errors.name && <p className="text-red-600 text-xs">{errors.name.message}</p>}
              </div>

              <div className="w-full">
                <label className="font-semibold">Upload Image</label>
                <input
                  type="file"
                  accept="image/*"
                  {...register("image", { required: "Please upload an image" })}
                  className="mt-1 w-full p-2 border border-gray-300 rounded-xl"
                />
                {errors.image && <p className="text-red-600 text-xs">{errors.image.message}</p>}
              </div>
            </>
          )}

          <div className="w-full">
            <label className="font-semibold">Email *</label>
            <input
              {...register("email", { required: "Email missing" })}
              className="mt-1 w-full p-3 border rounded-xl border-gray-300 focus:ring-2 focus:ring-green-600"
              placeholder="Enter email"
              type="email"
            />
            {errors.email && <p className="text-red-600 text-xs">{errors.email.message}</p>}
          </div>

          <div className="w-full">
            <label className="font-semibold">Password *</label>
            <input
              {...register("password", {
                required: "Enter password",
                minLength: { value: 6, message: "Minimum 6 characters required" },
              })}
              className="mt-1 w-full p-3 border rounded-xl border-gray-300 focus:ring-2 focus:ring-green-600"
              placeholder="Enter password"
              type="password"
            />
            {errors.password && <p className="text-red-600 text-xs">{errors.password.message}</p>}
          </div>

          <p className="text-sm text-gray-700">
            {state === "register" ? (
              <>Already have an account? <span onClick={() => setState("login")} className="text-green-700 cursor-pointer font-semibold">Login</span></>
            ) : (
              <>New here? <span onClick={() => setState("register")} className="text-green-700 cursor-pointer font-semibold">Create one</span></>
            )}
          </p>

          <button className="w-full py-3 bg-green-700 text-white rounded-xl font-semibold shadow hover:bg-green-800 transition">
            {state === "register" ? "Sign Up" : "Login"}
          </button>

          {loginError && <p className="text-red-500 text-sm text-center">{loginError}</p>}
          {isSubmitting && <p className="text-gray-600 text-sm text-center">Loading...</p>}
        </form>
      </div>
    </div>
  );
}



const WelcomeBack = () => {
  return (
    <div className="h-full flex flex-col justify-center bg-green-50 p-8 md:p-10 rounded-l-2xl">
      <h1 className="text-2xl md:text-3xl font-bold text-green-800 mb-4">
        Welcome Back!
      </h1>
      <p className="text-gray-700 text-sm md:text-base mb-6">
        Sign in to access your account, track orders, and enjoy personalized shopping experiences at ShopCart.
      </p>

      <div className="space-y-4 mb-6">
        <FeatureItem
          icon={<Shield/>}
          title="Secure Authentication"
          description="Your data is protected with enterprise-grade security"
        />

        <FeatureItem
          icon={
            <Users />
          }
          title="Trusted by Thousands"
          description="Join our community of satisfied customers"
        />

        <FeatureItem
          icon={ <Star/> }
          title="Premium Experience"
          description="Access exclusive deals and personalized recommendations"
        />
      </div>

      <div className="bg-white p-3 rounded-md border border-gray-200 text-center text-xs md:text-sm">
        Need help? Contact <a href="mailto:support@shopcart.com" className="text-green-600 font-medium">support@shopcart.com</a>
      </div>
    </div>
  );
};

const FeatureItem = ({ icon, title, description }) => (
  <div className="flex items-start gap-3">
    <div className="p-2 bg-green-100 rounded-full">{icon}</div>
    <div>
      <h3 className="font-semibold text-green-800 text-sm md:text-base">{title}</h3>
      <p className="text-gray-600 text-xs md:text-sm">{description}</p>
    </div>
  </div>
);