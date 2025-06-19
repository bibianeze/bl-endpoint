// 6. configure env
require("dotenv").config()
// 7. set up express
const express = require('express')
const app = express()
// 8. set up port
const PORT = process.env.PORT || 4000
// 9. set up mongoose for our mongodb connection
const mongoose = require("mongoose");
// 21. get our router here, then go just before the start function to set up the routes
const authRouter = require("./routes/authRouter")
// 112. require the middleware jwt auth
const auth = require("./middleware/authentication")
// 137. require blog routes here
const blogRouter = require("./routes/blogRouter")
// 138. our route has to cone behind our authentication middleware, comment out the dummy one
// 179. require notfound here
const notfound = require("./utils/notfound")
// 180. we will set it up after all the routes as a default error route


// 10. we ant to add our connection string, and to do that we will create an env file and then go and copy our db connection string from a previous project
// 11. BY DEFAULT, MONGO DB creates a folder 'test' for every project we work on, so we want to be able to configure it in such a way that it creates a new folder unique to the project on hand
// 12 in our connection string, we see a /?, you can name your folder by adding it between the / and ? in the connection string, this will create a new folder that will store all our database collection on this project will be stored in that folder



// 23. for us to access request body, we nned to set up our middleware that allows us parse data as json data so we have
// middlewares
app.use(express.json())

// 22. set up the routes here
app.use("/api/v1", authRouter)

// 113. to try this out, we will set up a dummy route, the path, the middleware then the req, and response 
// app.get("/test", auth, (req, res)=>{
//     res.send("passed authentication")
//     // 114. lets test this out in our postman
//     // a. create anothe dummy get request and try it out
//     // b. because our middleware comes just before the callback function, we get auth failed
//     // c. lets fix that by getting hold of our header jwt, so go to login, send again and copy it there
//     // d. inside of headers in this get, we will set up an authorization header, so we ill say authoriztion as the key then 'bearer space and the token we copied'
//     // e. if we send this request again, we get auth passed
//     // f. if we remove the authorization, we see auth failed. that is how we protect a route using authentication
// })

// 139. we want to set up the blog route here
app.use("/api/v1/blog", auth, blogRouter)
// 140.  this means to access any resource here, it passes through the authentication middleware before going to the blog router
// 141. inside postman, we will create a new folder for our routes
// a. we will create requests starting with get all blogs. we will get auth failed and be stuck in our authentication midlleware because we do not have an authorization header yet, but no panic, lets do for the rest
// b. create another request, this one is for creating, so its a post request to create blog, we get the same auth failed because theres no authorization header
// c. let create another request for single blog, we get auth failed
// d. create another for update, we still get auth failed
// e. create another for delete, we still have auth failed
// 142. now we want to set up the header, so we will go and log in a user to get the jwt, so lets send login again and copy the token
// 143. go to the routes we have created and set up the header like we did before, authorization, bearer space token
// 144. we can use it for all of the other ones and we see its all good and set up
// 145. doing this, it means that we have protected the route and someone must log in to access these routes
// 146. lets go back to controller to write the actual logic



// 115. now we wamt to actually do the crud when we are logged in. that is the architecture when we are logged in
// 116. set up blog model. so create a file called blog js in models folder, lets move over there
app.get("/",(req,res)=>{
    res.status(200).json({success:true,message:"server is live"});
})

// 181. we want to set up the error route here
app.use(notfound)
// 182. we will head over to postman inside that test file we created for dummyget request, to test our logic by creating or try to access a route that does not exist. we will get an error message 

// 183. now we want to create a file in utils again to handle validator errors that we can have in our code
// 184. create the file and and head over there

// 13. lets write a function to connect to our database
const start = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        // 14. make sure your app is listening on a port
        app.listen(PORT, ()=>{
            console.log(`server running on port ${PORT}`);
            
        })
    } catch (error) {
        console.log(error);
        
    }
}
// 15. invoke the function and start your server by doing npm run dev
start()
// 16. set up all the folders we will be needing
// a. models folder for our schema
// b. controllers folder
// c. route folder
// 17. create a file called auth.js inside controller, then go inside the file

// 24. lets go and test what we have after this set up in postman
// a. we will create new collection called blog, no mind you want to ctaer for two things, the user logging in(authentication), the functionality(crud)
// b. we create a folder inside this new collection for each
// c. call one users, inside users we will add a new request for register and login and its a post request
// d. when we send , we get login and regster individually, its working with this

// 25. we will move over to models and create a scena. we will strat by creating a file in the models folder




