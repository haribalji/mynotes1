var jwt = require('jsonwebtoken');
const JWT_SECERT="haribalajinvp";


const fetchuser=(req,res,next)=>{
// now getting the token from the   req's header section
const token=req.header('auth-token');
if(!token){
    res.status(401).send({error:"please authenticate using a valid token"})
}
try {
const data=jwt.verify(token,JWT_SECERT);
req.user=data;//hrer it will return the id
next()//from here move to the next middleare function

} catch (error) {
    res.status(401).send({error:"please authenticate using a valid token "});
}
      
}

module.exports=fetchuser;