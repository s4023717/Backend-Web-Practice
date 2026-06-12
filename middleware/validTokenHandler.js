const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validToken = asyncHandler(async(req, res, next) => {
    let token;
    let authHeader = req.headers.authorization || req.headers.Authorization;

    if (authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1];
        // vertify the token 
        jwt.verify(
                    token, 
                    process.env.SECRET_KEY, 
                    (err, decoded) => {
                        if (err) {
                            res.status(401);
                            throw new Error ("User is not authorized");
                            }
                        req.user = decoded.user;
                        next();
                });
                if(!token){
                res.status(401);
                throw new Error ("User is not authorized or token is missing")
                }
    }
})

module.exports = validToken; 