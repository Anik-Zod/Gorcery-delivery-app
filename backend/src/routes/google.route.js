import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import authUser from "../middlewares/authUser.js";
import User from "../models/user.model.js";


const authRouter = express.Router();

//Step 1 : Redirect to google login
authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// google will call thid
authRouter.get("/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    try {
      const user = req.user; // the user object returned by Passport

      // Generate JWT
      const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      // Set cookie
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      // Redirect to frontend
      res.redirect(`${process.env.FRONTEND_URL}/me`); // change /dashboard to your desired route
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

// to get user object 
authRouter.get("/me", authUser, async (req, res) => {
  try {
    const userId = req.userId; // <--- use req.userId
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        image: user.image,
      },
    });
  } catch (err) {
    console.error("Error in /me:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});


export default authRouter;