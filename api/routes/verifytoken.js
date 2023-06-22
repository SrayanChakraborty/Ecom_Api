const jwt=require('jsonwebtoken');


function verifytoken(req,res,next){
    const authheader=req.headers.token;
    if(authheader){
        const token=authheader.split(" ")[1];
        jwt.verify(token,process.env.JWT_SEC,(err,user)=>{
            if(err){
                res.status(403).json("Token not valid");
            }
            else{
                req.user=user;
                next();
            }
        })
    }
    else{
        res.status(400).json("Token not verified")
    }
}

function verifytokenandauth(req,res,next){
    verifytoken(req,res,()=>{
        if(req.user.id===req.params.id || req.user.isAdmin){
            next();
        }
        else{
            res.status(400).json("You are not authorized");
        }
    })
}

function verifytokenandadmin(req,res,next){
    verifytoken(req,res,()=>{
        if(req.user.isAdmin){
            next();
        }
        else{
            res.status(400).json("you are not authenticated");
        }
    })
}


module.exports={verifytoken,verifytokenandauth,verifytokenandadmin};