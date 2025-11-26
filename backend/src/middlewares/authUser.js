import jwt from 'jsonwebtoken'


const authUser = async (req, res, next) => {
  console.log("Cookies received:", req.cookies);
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ success: false, message: "Not Authorized" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decodedToken.id; // <-- attach to req
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Not Authorized" });
  }
};


export default authUser;