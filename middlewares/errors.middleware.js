import { AppError } from "../utils/AppError.js";

export const errorHandler=(err,req,res,next)=>{
 const { message = "", status = 500, type = "Server Error"} = err;
  return res.status(status).json({error:{ msg: message, type}}) ;  
};
export const pathNotFound = (req, res, next) => {
    throw new AppError(`${req.url} ${req.method} is not found`, 404, "page-not-found");
};