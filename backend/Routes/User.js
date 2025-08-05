import express from "express";
import User from "../Model/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();
router.get('/',async(req,res)=>{
  try{
    const user=await User.find({})
    if(!user){
      return res.status(404).json({msg:"users not found ",success:false})

    }
    return res.status(200).json({msg:"users found ",success:true,user})
  }catch(e){
    console.error("Internal server error ",e)
  }
})
router.get("/:id", async(req, res) => {
  const user_id =req.params.id
  try{
    const user=await User.findById(user_id);
    if(!user){
      return res.status(404).json({success:false,msg:"user not found"})
    }
    return res.status(200).json({success:true,user})
  }catch(e){
    console.log(e)
  }
});
router.post("/signup", async (req, res) => {
    try{
  const userData = req.body;
  const { name, email, password } = userData;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required",success: false });
  }
  
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res
      .status(409)
      .json({ message: "User already exists with this email",success: false });
  }

  const haspassword = await bcrypt.hash(password, 10);
  userData.password = haspassword;
  const newUser = await User.create(userData);
  if (!newUser) {
    return res.status(500).json({ message: "Error creating user",success: false });
  }
  const token = jwt.sign({ id: newUser._id, email }, process.env.JWT_SECRET); // here we can add the token in the cookies
  req.user = token;
  res
   .status(201)
    .json({
      message: "User created successfully",
      data: newUser,
      token: token,
      success: true,
    });
} catch (error) {
  console.error("Error in signup:", error);
  res.status(500).json({ message: "Internal server error" });       
}
});

router.post("/login", async(req, res) => {
    try{
  const { email, password } = req.body;

  if (!email || !password) {
    return  res.status(400).json({ message: "All fields are required",success:false });
  }
  const user=await User.findOne({ email });

  if (!user) {
    return res.json({ message: "User not found" ,success:false});
  } 

  const ValidPassword =await bcrypt.compare(password, user.password);

  if ( !ValidPassword) {
    return res.json({ message: "Invalid email or password" , success:false });
  }
  const token = jwt.sign({ id: user._id, email }, process.env.JWT_SECRET);
    req.user = token; // here we can add the token in the cookies
 return res.status(200).json({
    message: "Login successful",
    data:user,
    token: token,
    success:true
  });

    } catch (error) {   
    console.error("Error in login:", error);
    res.status(500).json({ message: "Internal server error",success:false});
    }

});

export default router;
