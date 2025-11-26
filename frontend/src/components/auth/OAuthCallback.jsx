// OAuthCallback.jsx (React)
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/appSlice"; // adjust
import axiosInstance from "../../api/axios";
import { setShowUserLogin } from "../../features/appSlice";

function OAuthCallback() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // When the page loads, call /me to get the user
    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get("/auth/me");
        console.log("User data received:", res.data);
        if (res.data.success) {
          console.log("user image:", res.data.user.image);
          dispatch(setUser(res.data.user));
          localStorage.setItem("user", JSON.stringify(res.data.user));
          dispatch(setShowUserLogin(false));
          navigate("/");
        } else {
          // if something goes wrong
          // navigate("/");
          console.log("OAuth login failed:", res.data.message);
        }
      } catch (err) {
        console.error("Error fetching user after Google login:", err.message);
        // navigate("/");
      }
    };

    fetchUser();
  }, []);

  return <div>Loading...</div>;
}

export default OAuthCallback;
