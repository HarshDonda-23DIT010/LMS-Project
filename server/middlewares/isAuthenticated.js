import jwt from 'jsonwebtoken';

const isAuthenticated = async (req, res, next) => {
   try {
      const token = req.cookies.token;
      if (!token) {
         return res.status(401).json({
            success: false,
            message: "User is not Authenticated."
         })
      }
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      if (!decoded) {
         return res.status(401).json({
            success: false,
            message: "User is not Authenticated."
         })
      }
      req.id = decoded.userId;
      next();
   } catch (e) {
      console.log(e);
   }
}
export default isAuthenticated;