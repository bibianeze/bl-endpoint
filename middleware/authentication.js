// 98. get access and verify the token at the point of the log in
// 99. we want to require the token
const jwt = require("jsonwebtoken")


// 100. write the function 
const auth = async(req, res, next)=>{ //custom middleware has to include 'next'
//101. lets look at the document to explain a few things before we write logic
// 102. we will be looking for the authorization header
const authHeader = req.headers.authorization
// it will look like this: Bearer 'space' token
// 103. mind you, we need just the token, the bearer comes with it just as a convention
// 104. lets access the token
if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({success:false, msg: "Auth failed"})
}
// 105. if there is no token, we cannot move from here, now lets isolate our token if theres one
const token = authHeader.split(" ")[1]
// this means we have a bearer and a token all in array, so split where theres a space, we know in arrays, it is zerobased, so bearer will be at the index '0' and then the token will be 1. so this method accesses the token
try {
    // 106. lets verify the token we will be getting back with the signature it was signed with in the first place
    const payload = jwt.verify(token, process.env.jwt_secret)
    // 107. we want to set what we put in the payload which is the userid and name, this is to knwo who is logging in
    req.user = {userId: payload.userId, name: payload.name}
    // 108. then you next it
    next()

} catch (error) {
    // 109. if the token fails to be verified
    res.send(401).json({ success: false, msg: "Auth failed" });
}
}

// 110. we want to export out the middleware


module.exports = auth

// 111. lets move over to index to test thst this works, so after where we set up our routes