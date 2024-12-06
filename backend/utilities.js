const jwt = require('jsonwebtoken')

function authentificateToken(req,res,next){
    const authoheader = req.headers['authorization']
    const token = authoheader && authoheader.split(' ')[1]

    if(!token) return res.sendStatus(401)

    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
        if(err) return res.sendStatus(401).send({message:"unauthorizedd"})
        req.user = user 
        next()
    })

}
module.exports ={authentificateToken}
