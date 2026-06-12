const asyncHandler = require("express-async-handler");
const User = require("../models/userModel")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

//@desc Register user
//@route GET /api/users/register 
//@access public 
const registerUser = asyncHandler(async(req, res) => {
    // 1.check for empty fields 
    const {username, email, password} = req.body;
    if (!username || !email || !password){
        res.status(400);
        throw new Error("All fields are mandatory")
    };

    // 2.check whether the email is already exist
    const userAvailable = await User.findOne({email});
    if (userAvailable){
        res.status(400);
        throw new Error("User already registered");
    } 

    //3. create hash password
    const hashPassword = await bcrypt.hash(password, 10);
    // console.log("Hash password: ", hashPassword);

    //4. add user to the database 
    const user = await User.create({
        username, 
        email,
        password: hashPassword,
    });
    if (user){
        res.status(201).json({
            id: user.id,
            email: user.email
        })
    } else {
        res.status(400);
        throw new Error ("User data is not valid");
    }
    // res.json({message : "Register the user"});
});

//@desc Login user
//@route GET /api/users/login
//@access public 
const loginUser = asyncHandler(async(req, res) => {
    const {email, password} = req.body;
    //1. check for the empty fields 
    if (!email || !password){
        res.status(400);
        throw new Error ("All fields are mandatory")
    }
    const user = await User.findOne({email});
    // 2. Compare password with hashpassword 
    if(user && (await bcrypt.compare(password, user.password))){
        const accessToken = jwt.sign({
            user:{
                username: user.username,
                email: user.email,
                id: user.id,
            }
        }, process.env.SECRET_KEY , {expiresIn: "15m"});
        res.status(200).json({accessToken});
    } else {
        res.status(401);
        throw new Error ("Email or password is not valid");
    }
    res.json({message : "Login user"});
});

//@desc Current user
//@route GET /api/users/current
//@private public 
const currentUser = asyncHandler(async(req, res) => {
    res.json(req.user);
});

module.exports ={
    registerUser,
    loginUser,
    currentUser,
}