// 185. head over to controllers to set up a few things for the error when there is one

// 191. we want to access two things
// a. err.message, b. err.code. these are waht we will leverage on to handle our errors

const handleError = (err) =>{
    // 192. now to use error code, we know if it is === 11000, the perosn is trying to use an email that has already been registered, so we can cater for that and send a response
    // 193. also in our models we have three fields, title, tags and desription, this means these are the fields that can have errors so we need to cater for that
    // 194. we will set up an error object with name, email and password
    let errors = {name:"", email: "", password: ""}
    // 195. we want to dynamically popuplate these values if any of them fails
    // 196. if you look at tehe errors we got from trying to log in with incomplete and invalid details, we got a message that said "user validation failed". so we can say if the err.messsage includes 'user validation failed', we want to do a few things

    // 207. set up the second condition here
    if(err.code === 11000){
        errors.email = "Email is already in use"
        // 208. return the errors object
        return errors
    }
    // 226. lets cater for incorrect email here
    if (err.message === "incorrect email") {
      errors.email = "This email has not been registered"
      return errors
    }
    // 227. lets cater for when the password is incorrect
     if (err.message === "incorrect password") {
      errors.email = "email or password is incorrect"
       errors.password = "email or password is incorrect";
       return errors
     }
    //  228. now we ahve set to catch the errors, so we will go and catch this error in the catch block


    // 197. we want to write a condition for that
    if(err.message.includes("User validation failed")){
      // 198. if we get this it means they didnt fill a fieod well. so now lets look at our console well so we can access a few things
      // 199. we can see we have an error object that contains the field that we failed which was the name and password. to get a clearer view, lets use the postman error
      // 200. we want to access the values in the error object
      // 201. object.value is the method we can use to convert object into ararys. so object.values(you know object has key and value pairs) it means we wnat to convert the keys to arrays so we can use the array method forEach
      // 202. i need some properties from this arrays, which is the 'message' and 'path' from this 'properties' array
    //   203. we want to destructure properties
      Object.values(err.errors).forEach(({properties}) => {
        // 204. we want to have Access to the errors object
        errors[properties.path] = properties.message
      });
    }
    // 205. return the errors
    return errors
    // 206. this is one of the errors we can get, another error we can get is when we have an error of 11000, lets go the top and write a conditional statement at the top
}

// 209. then we want to export it out
module.exports = handleError

// 210. we will go to auth controllers and import this code there to use it