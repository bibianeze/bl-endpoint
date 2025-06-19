// 37. require the models here
const User = require("../models/auth")
// 211. import it here
const handleError = require("../utils/handleerror")
// 212. we will replace some of our errors here with this logic we have set up here. we will comment out what we have in the errors first



// 18. we create a function skeleton here for now not the main functionality yet
// skeleton
// const register = async(req, res) =>{
//     res.send("register")
// }
// actual code,
// 38. for user to register they should provide some information exactly as we have set it up in our models, check models,then  we will set up the logic here
const register = async(req, res) => {
    try {
        const user = await User.create(req.body)
        res.status(201).json({success: true, user})
        // 39. lets go back to postman and try this and enter send, so we see the errors first
        // 40. now we are going to provide the necesaaruy details in the request body and send
        // 41. the password has to match and the email has to be valid
        // 42. we can crete the user
    } catch (error) {
      // 186. we want to console log the errors first
      // console.log(error);
      // // 187. lets headover to postman to try and make an error, maybe try to register an existing user again
      // // 188. we can seee we get an error code, that is something unique to the errors, in this case we have '11000': this means the person has registered with those credentials before
      // // 189. we want to go to postman and make another miatake to get an erro, maybe shorter password and no name. we get two eerors for both for the name and password and we get a general message that says, "user validation failed"
      // // 190. lets head over to handleerror to set up a few things


      //   // 39. we have this for now as will later write a logic to handle errors
      //   res.json({error})
      // 213. we will set up the error here, we will have the handleerror function then pass in any erro we might get
      const errors = handleError(error)
      // 214. send back a response
      res.status(400).json(errors)
      // 215.now let us test in postman. we will create the user again with the same wrong credentilas, instead of sending back an error object, we want to send back a meaningful error message. 
      // a. try to write an invalid email as well and see. we now get meaningful errors
      // b. lets try to use aan email that exists
    // 216. we will cater from some things inside in the login now, lets go to the login logic
    }
}
// 43. we have been able to register the user, but we will refcator this a bit
// 44. we want to protect the users infromation, eg. password
// 45.lets look into the database you can see that we store the users password openly like that, which is unsafe and when there is a security attack to the database, the user information will be compromised, so we need to keep our user information safe
// 46. we need to protect our users password and it is done by a technique called 'hashing': this means user information are hghly sensitive information and therefore password cannot be stored like plain text on a database but strongly encrypted to protect users infromation
//** */ hashing takes the user string amd changes it to random characters that even the user will not understand. hashing is very crucial in development
// eg: password: test1234-
// hashed password: whiweg3849skdhy
//note if i have this same passowrd again: this same thing will be generated in the hashing algorithm: now if i was a hacker, i can notice this a pattern and still cause harm. this is where salting comes in
//  *** salting: we use it to generate a random string. Salting is a security technique used to protect user passwords by adding a random string (called a salt) to the password before hashing it. This makes each password hash unique—even if two users have the same password.
//  ***we have a library called 'bcrypt', we want to use, lets check the internet
// first we want to require bcrypt to hash and salt the users password
// lets head over to models
// 47. install bcrypt (npm i bcrypt) and go to the top in models and require it

// skeleton
// const login = async(req, res) =>{
//     res.send("login")
// }
// 58. to log in , we want to amke sure the credentials provided matches the credentials in the database if it does match we want to send an error
const login = async(req, res) =>{
  //    a. get info from the request body
  const { email, password } = req.body;
  // b. we want to make sure this user provides the necessary information
  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, msg: "please provide necesary information" });
  }
  // c. we want to find out if the email provided has been registered before or not, we will create a function
 ;

  //62. if the user can get passed the authentication, it means they can actually log in now, so lets cater for that
  try {
     const userExists = await User.findOne({ email }); // we use find one cause it is not an id, this will go into our dtabase and look to see if the email exists or not
     if (!userExists) {
       // 217. we will replace this error here with what we have set up, comment this out
       //   return res
       //     .status(400)
       //     .json({ success: false, msg: "Email has not been registered" });
       // 218. if a user does not exist set up the error
       throw Error("incorrect email");
       // 219. when we throw the error we will go to the try catch and catch it. before that, lets do the same for the autheticated
     }

     // if everything checks out, let cater for password
     // 59. we want to compare password to check if the password provded matches what exists in our database,now, our password hashes when its created so. let go to models where we hashed to referrencee our function to hash from there and check to see if it works, lets go there

     // 61. we will set up the password here to do the comparison. then pass in the password that the person is passing at the momment
     const authenticated = await userExists.comparePassword(password);
     // note, authenticated is either true or false so if it is not authenticated which means it is false, we want tosend a response
     if (!authenticated) {
       // return res.status(400).json({
       //   success: false,
       //   msg: "email or password is incorrect",
       //   //note for security purposes, we do not tell the user which one is wrong
       // });
       // 220. comment out this one here
       // 221. so lets throw error here too
       throw Error("incorrect password");
       // 222. lets go and catch it, head over to the catch block
     }
     // 67. we want to generate a token for the user, it is the token we use to verify other request they will be making when they are logged in. it will be used to authenticate other request they will be making. so we wnat to generate the token at the point of logging in, note, it can be generated at the point of registering, it all depends on what you are doing. sidenote: there are websites where you register and get stasrted immediately while there are others that you need to log in first to get started, so token can be geberated based on what you want to do.
     // 68. in this case we want the user to log in after registering before they can access our website, so our token will be generated after logging in. now lets generate token
     // so before our user can access any endpoint in our project, they have to be authenticated(logged in). so when a user sends their username and password, we wan to generate a token for them, so we do not send back just their credentials, we send back a token as well. so when they make a request on the platform, they will check if the user exists using that token that was generated when they logged in
     // 69. we will make use of json web token, lets go to the website jwt.io :it allows you generate jwts. we will see how it looks like, we have the parts, the header, the payload and signature
     // a. we have the header: the header comes with the package so we are not in charge of it, however we are in charge of the other two, the payload and the signature
     // analogy, imagine you want to enter an office and they hand you a guest card, with tat card, you can vist anywhere in the office, this is likened to that, withiut the guest card, it means the token is not even there, now once the token is there the next thing to do is to verify that token. so the security checks the signature on the guest card to verify it, if it matches what should be there, you can enter, else they bounce you to go and get a proper guest card
     //70. when we work on tokens we have a secret signature we use to sign on the token, once we sign the token and the user wants to access any end point after logging in, we check if the token is there and also to verify the signature to see if it tallies with what should be there then if everything is fine, we can go
     // 71. then we have the payload, the payload is anything we are doing at that time, it often has information on the person signing in at the time, information like the name and the time the token was issued. so we decide what we want on our payload
     // 72. when we click on learn more, we learn more on jwt and why we use it
     // 73. structure
     // a. header : the package is in charge of it
     // b. payload : we decide whwat we want to use to identify the user logging in at that time
     // c. signature: our secret signature, we will be signing the token with
     // note: keep reading

     // 74. to work with jwt, we have to install a package from node, so search for npm jsonwebtoke to see how we can install it
     // 75. install jwt using npm install jsonwebtoken
     //   76. inside our schema we will write a method that generates token, so go there to models

     // 90. lets generate a token when the user log in
     const token = userExists.generateToken();
    res.status(200).json({
      success: true,
      user: { name: userExists.name, email: userExists.email },
        // 91. this is where we will call it
   token,
  //  92. lets try to log in again in postman
  // 93. we will see that for token, we get the token generated
  // 94. we can now use this token to monitor and mange reuests that the user is going to make
    }) //we will send just the email and username and not the password to the frontend, we are protecting the information
  
  } catch (error) {
    // 63. we will have the error this way till we handle error
    // res.json({ error });
    // 223. lets go to postman and test, we will mess up with our password and send it again, we get an error and when we check our console, we see the error which is 'incorrect password'. now we need to handle the error so we do not get errors in the console but an actual error message. now if we throw an error and do not catch it, we will have our code terminated, we threw two errors so we will go amd cater for the two
    // 224. we will go back to handleerrors and cater for this error message we got for both the password and the email
    // 229. we want to comment out the error here, so we will cater for catching all the errors we threw. eg: we can copy the one we set up for register here
    // 230. do it here
      const errors = handleError(error);
      res.status(400).json(errors);

      // 231. from userexists, lets move it to the try block, that is all the functions that will throw a data, we want to move to the try *******
      // 232. lets go to postman and try it again
      // a. we have an incorrect password, so send and you see the error message it sends
      // b. you have a wrong email, see the erro message
  }
  // 64. go to postman to test a few things
  // a. check first for if we have to check if nothing is sent back
  // b. lets login with something we have registered with, use a wrong credential
  // c. use a right credential and log in
}

// 19. export these things
module.exports = {register, login}

// 20. create a new file for routes called 'authRouter' and move over there

// 65. when a user logs in, it is only normal to generate a unique token for the user when they log in
// 66. this should come just after we confirm that their credntials are correct, so just before the trycatch block , go there


// 95. before we can use this token to do anything, we need to do our authentication middleware set up
// 96. after logging in, every request that will be made will pass through this middleware first. to do this, we need to check if the jwt is there in the headers and also verified
// 97. we will create another folder in the root directory is called middleware, then a file called authentication, lets head over to the file




// 233.ERROR HANDLING in express can be done in many ways , and this is one of the seamless ways we can acheieve with handling errors

// Activity, we want to create handle error for our 'create blog function






// 234. PUSHING TO GITHUB
// We will be deploying our project to the cloud, we will also be learning how to upload an image via cloudinary. our project is still running on our local computer, how can we make sure it is accessible from anywhere, all they need to do is get the appropriate endpoint
// 235. we will push our code to github first, but before that, we will set up our git ignore file. so create a file called .gitignore in our root directory and add the files we want to ignore, /node_modules and .env: the environmental file
// 236. we have to make sure our PORT is set up well in a way that it is not static and another port can be created for us if the need arises when we host
// 237. inside the package.json, we want to make sure we have the proper 'start' scrpt and not just the dev script. that is what the cloud version will use to start our project
// 238. we will head over to github and create a new repository
// 239. follow the steps to push this to github
