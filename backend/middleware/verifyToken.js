const jwt = require("jsonwebtoken");
require("dotenv").config();


const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
     return res.status(401).json({
      success: false,
      message: "No token, authorization denied "
    });
  }
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedToken;
    console.log(decodedToken);
    return next()

  }catch(err){
   return res.status(401).json({
      success: false,
      message: "No token, authorization denied "
    });
  }

}


module.exports = authMiddleware;


// const jwt = require("jsonwebtoken");
// require("dotenv").config();


// const authMiddleware =async(req , res , next)=>{
//   const token = req.cookies.token;
//   console.log(token);
//   if(!token){
//     req.user = null;
//     return next();
//   }
//   try{
//     const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
//     req.user = decodedToken;
//   }catch(err){
//     req.user  = null;
//   }
//   next()
// }


// module.exports = authMiddleware ;