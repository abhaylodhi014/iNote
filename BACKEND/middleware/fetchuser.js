// this is middleware which use to get user data from his auth-token that generate when he logedin
var jwt = require('jsonwebtoken');
 const jwt_secret = "abahy"
const  fetchuser = (req , res , next) =>{
// get user from the jwt token and add id to req objects
const token = req.header('auth-token');
if(!token){
    res.status(401).send({error : "Please authenticate using a valid token "})
}

try {
  const data = jwt.verify(token , jwt_secret);
req.user = data.user;
next();  
} catch (error) {
  res.status(401).send({error : "please authenticate using a valid"})  
}

}
module.exports = fetchuser ;