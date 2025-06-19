const mongoose = require('mongoose')

const Schema = mongoose.Schema
// 30, get isEmail
const {isEmail} = require("validator")
// 48. require it here
const bcrypt = require("bcrypt")
// 49. we want to hash our password, 
// 79. we require the jwt here
const jwt = require("jsonwebtoken")


// we want to register our schema which means we need a few things from them
// 26. create the schema
const userSchema = new Schema({
    name: {
        type: String,
        //  required: true,
        // 33. we will refactor our code with validators so we have
        required: [true, "please proivde a name"]

    },
    email: {
        type: String,
        // required: true,
        // 34. refcator with validators
        required: [true, 'Please provide an email'],
        unique: true,  //user cannot register with the same email twice
        // 27. ordinarily when we want to validate if a user has used a valid email, we write a function to check, but now, we will install a package jsut to make things easier, 
        // 28. search for npm validator online to get ethe pacakage and install it 'npm i validator'
        // 29. we want to use the "isEmail" function so require it at the top
        // 31. set it up here
        validate: [isEmail, "Please provide a valid email"]
        // 32. since  we have validators here, we can use it to refcator this required, so go and do for name
    },
    password: {
        type: String,
        required: [true, "please provide a passowrd"],
        minLength: [7, "the minimum password length is 7"]
    }
}, {timestamps: true})

// 50. hash password
userSchema.pre("save", async function(next){
    // you are saying before saving, perform this functions for me
    // we want to salt our password
    const salt = await bcrypt.genSalt();
    // note, you can pass in how many string you want it to generate, if you do not, it generates 10 random password
    // 51. we want to hash the password now with the salt we just created
    this.password = await bcrypt.hash(this.password, salt);
    // 52. when we done, you want to carry on to the next thing
    next()
    // 53. lets try what we have done in postman, we will see our password hashed even when check our db
    // 56. create another one with the same password, the hashed of both will be different
    // 57. we want to go and create the logic of the login

})
// 60. we will be writing the method to compare our password here
userSchema.methods.comparePassword = async function (userPassword){
    const isCorrect = await bcrypt.compare(userPassword, this.password)
    //note: the compare method from bcrypt helps compare if the password provided matches what was provided
    // 61.this function will return a boolean
    return isCorrect;
    // 62. go back to controllers to invoke the function created here and do the comparison
}


// 77. method to generate token
userSchema.methods.generateToken = function (){
    // 78. require our jwt at the top here
    // 80.set it up here
    // 81. we want to sign our jwt and there are some things we need to use to sign. we will create what we want to have in th payload inside the sign
    // note, when we register a user our database generates an id from them, so it will look like what it is in the database
    // note: we acn add more things to our payloa, as a security measure, we do not add sensitive data to payload
    // note: then we add the signature: we will set it up in our '.env' cause its a sensitive information we need to conscious about
    // 82. lets go to '.env' to create the signature, the signature is supposed to be random.
    // 83. to help us get random words we can go to a website called 'all keys generator', we wil enter the second one, we can specify the number of bits we want, we will use 256. lets copy it and move to the env file to generate it
    // 84. we now want to sign up using tthe random key we have set up in our '.env'
    // 85. add when it will expire, to see this, we will have to check the documentation to see the different ways we can set this up, it can be expressed in milliseconds or a string with a given time span. we will use the time span string
    // 86. we will say this token should expire in '1d': this means that token will not be valid after 1day. that is why on some days, whwn you visist a sie, you do not have to log in as you are already logged in. except maybe we go to another browswer where authentication is not stored then it creates another jwt on log in
    // 87. there are websites that cannot do 1day that expires immediately, like the bank app, we cannot leave it open for too long, even mid transaction and you get distracted, you can see session expred that requires you log in again
    return jwt.sign({userId: this._id, name: this.name}, process.env.jwt_secret, {expiresIn: "1d"})
    // 88. we want to generate a token when the user logs in
    // 89. go to the controllers and add it
}
// 35. we export it here, for each user will be creating we want to model them on our model schema
module.exports = mongoose.model('User', userSchema)

// 36. lets go back to controller to get it


// /57. lets work on log in controller set up, go back to controllers where you have log in