const express = require('express');
const router = express.Router();
// here we import our user model
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

//ROUTES-1  create a user using : post "/api/auth/". Doesnot require Auth
router.post('/createuser' ,[
// jitne bhi check hai wo is array mai se pass ho jayge yaha per khud ki coustom error bhi lekh sakte hai
  body('name' , 'enter a valid name').isLength({min : 5}),
   body('email' , 'enter a valid email').isEmail(),
   body('password' , 'password must be atleast 5 characters').isLength({min : 5}),
], async (req , res) => {
  let success = true ; 
     const errors = validationResult(req);
      if(!errors.isEmpty()){
        success = false;
        return res.status(400).json({success , errors : errors.array()});
      }
   
try {
     //   check wheather the user with this email exits already
       let user  = await User.findOne({email : req.body.email});
    if(user){
      success = false;
        return res.status(400).json({success , errors : "sorry this email is already used "})
    }
//    if user is not exist then create new user
// secrure a password 
// ye promiss return karega
// yaha per bacsicaly hum password ko hash +salt mai convert kar rehe hai
const salt = await bcrypt.genSalt(10);
const secPass = await bcrypt.hash(req.body.password , salt);


    user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email
     })
     const  data = {
      user:{
        id : user.id,
      }
     }
     const jwt_secret = "abhayy"
    //  waise tu ishe .env mai likhna hai taki secure rahe
    const jwttoken =  jwt.sign(data ,jwt_secret)
//  basicaly for extra securety of data we convert password + salt + jwt_secret code to generety a unique jwttoken
     success = true;
      res.json(  user);
        

} catch (error) {
    console.error(error);
    success = false ; 
    res.status(500).send(success , "some error occur");
}

    // res.send("hello");   // Error: Cannot set headers after they are sent to the client mtlb do bar respons nahi bhej sakte
})




//ROUTES-2  authenticate a user using post '/api/auth/login' no login required
router.post('/loginuser' ,[
//    yaha per user se email or password enter kara liya 
       body('email' , 'enter a valid email').isEmail(),
       body('password' , 'password cannot be blank').exists(),
    ], async (req , res) => {
// if there are errors . return bad request and the error
// yaha per dekha ki shai format mai data ho here we not chect the original data 
    let success = true ; 
        const errors = validationResult(req);
        if(!errors.isEmpty()){
          return res.status(400).json({errors : errors.array()});
        }
        // yaha per req body se data le liya varible mai
        const   {email , password} = req.body ;

try {
        let user = await User.findOne({email});
        // check email find hui ya nahi
        if(!user){
          success = false 
            return res.status(300).json({ success,errors : "plese enter correct data "})
        }
        // jo password enter kara ushe phele bcrypt mai convert karke compare kiya 
        const pwcompare = await bcrypt.compare(password , user.password);
        if(!pwcompare){
          success = false;
            return res.status(300).json({success, errors : "plese enter correct data "}) 
        }
        // if pasword is correct then i send the id to user
        const  data = {
            user:{
              id : user.id,
            }
           }
           const jwt_secret = "abahy"
          //  waise tu ishe .env mai likhna hai taki secure rahe
          const authtoken =  jwt.sign(data ,jwt_secret)
            res.json({success , authtoken});
 
 } catch (error) {
    // if there is some error
    console.error(error);
    res.status(500).send("internal server error occur");
       }     
    })



//ROUTES-3  GOT loggedin user detail using : post "api/auth/getuser" login required 
router.post('/getuser' ,fetchuser, async (req , res) => {
 
    
try {
    const userId = req.user.id; 
    const user = await User.findById(userId).select("-password");
    res.json({user})
}
    catch (error) {
        // if there is some error
        console.error(error);
        res.status(500).send("internal server error occur");
           }     
        })
module.exports  = router;
