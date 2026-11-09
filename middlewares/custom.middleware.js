export const printMsg = (req,res,next) =>{
    req.myDate = new Date();
    req.username = "admin"

    console.log(`hello to ${req.url} ${req.mothed}`)
    next();
}