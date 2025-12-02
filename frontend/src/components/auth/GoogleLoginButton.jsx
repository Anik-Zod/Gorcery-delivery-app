import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  replaceAddress,
  setShowUserLogin,
  setUser,
} from "../../features/appSlice";
import axiosInstance from "../../api/axios";

export default function GoogleLoginButton() {
  const dispatch = useDispatch();

  useEffect(() => {
    window.google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: handleCallbackResponse,
    });

    window.google.accounts.id.renderButton(
      document.getElementById("googleSignInDiv"),
      { theme: "outline", size: "large" }
    );
  }, []);

  const handleCallbackResponse = async (googleResponse) => {
    try {
      // ✅ Send Google token to backend
      const res = await axiosInstance.post("/user/google-login", {
        token: googleResponse.credential,
      });

      if (!res.data.success) return;

      // ✅ Save user globally
      dispatch(setUser(res.data.user));
      localStorage.setItem("user", JSON.stringify(res.data.user));
      dispatch(setShowUserLogin(false));

      // ✅ Load user addresses
      const addressResponse = await axiosInstance.get(
        `/address/get/${res.data.user._id}`
      );

      dispatch(replaceAddress(addressResponse.data.addresses));
      localStorage.setItem(
        "addresses",
        JSON.stringify(addressResponse.data.addresses)
      );

      console.log("Server response:", res.data);

    } catch (error) {
      console.error("Google Login Failed:", error.response?.data || error.message);
    }
  };

  return <div id="googleSignInDiv"></div>;
}
