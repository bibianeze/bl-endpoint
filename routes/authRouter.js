// 21. set it up by requiring router
const router = require("express").Router()
// 23. require all the functions we exporetd from controller
const {register, login} = require("../controllers/auth")
// 24. this is going to be  a post request because when you are registering or logging in, you are providing some information that will help you to be authenticated so its going to be a post request always. set it up

router.post("/register", register)
router.post("/login", login)


// 22. we want to export out this entire file
module.exports = router

// 25. whwn this si done, we want to require it and set it up as a middleware like we do in the index.js, so lets go there