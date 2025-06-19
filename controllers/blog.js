// 128. we will write the functionalities here
// 130. import blog schema
const Blog = require("../models/blog")


// a. create a blog
// ###skeleton
// const createBlog = async (req,res)=>{
//     res.send("created")
// }
// 146. actual logic
const createBlog = async (req,res)=>{
    // res.send("created");
    // 147. using our model we see a few things required, now you may ask how the user will know their id to provide it, that is one of the many things the middleware takes care of
    // 148. look at the authentication middleware, after the payload we created req.user and the details in it. it means that req.user and its etails will be present at every request being made. we have a userid that userid is from mongodb, so we can actually make use of this while setting up the logic to create a vrequest that requires this id
    // 149. lets log req.user to the console to see what we are getting back
    // console.log(req.user);
    // 150. inside postman, lets go to create and send it again, we get some details in the console, the users id and the name of the person currently logged in as stipulated in our authentication middleware. in our schema, we need the id of whoever is logged in at a time to allow them create a post
    // 151. we will have the request body and the user provide title, tag and description, but the createdby, we will do it programmatically using req.user object.
    //  152 we will simply be getting the userid from the req.user object
    // 153. we can remove the console now.
    const {userId} = req.user
    // 154. every other infromation will come from the user, title, description and tag
    // 155. remove the req.send now and create your logic
    req.body.createdby = userId
    // 156. we have programmatically set our createdby with the id of the person logged in at this point
    // 157. we have the trycatch block next
    try {
        const blog = await Blog.create(req.body)
        res.status(201).json({success: true, blog})
    } catch (error) {
        res.json({error})
    }
    // 158. lets test in postman and create a blog, remember the tag has to be part of what we have stipulated in the enum
    // a. we have in created by, the id of the person logged in 
    // b. we have the id from the database for the blog we just created
    // 159. lets create another blog and we have the same thing
    // a. we can make an error in the tag and see what we get
    // b. the createdby is always going to be the same because the user logged in is the one creating this blogpost
}   
// b. get all blogs for that user
// ###skeleton
// const getBlogs = async (req,res)=>{
//     res.send("get all blogs")
// }
// 160. get all logic, remember we used the method 'find' to get all blogs previously, now we want to find the blogs created by a particular user, so we will add the req.user to access  the id of the user who we want to get all their blogs
const getBlogs = async (req, res) => {
//   res.send("get all blogs");
// 161. we destructure it here
const { userId } = req.user;
// 162. we have our trycatch block
try {
    const blogs = await Blog.find({createdby: userId}) //just find()gets us evry blog on our database reagrdles of who created it, now we only want to access the blogs of this particular user, so we need our createdby object that will be assigned to this id
    res.status(200).json({success: true, blogs})
    // 163. this means we aresending back all the blogs cretead by this user,
    // 164. lets go an test with postman, we get all the blogs written by jane our logged in user
} catch (error) {
     res.json({ error });
}

};
// c. get a single blog
// ###skeleton
// const getSingleBlog = async (req,res)=>{
//     res.send("single blog")
// }
// 165. we need to get a single blog created by a particular user so we need our user id and the blog id as well
const getSingleBlog = async (req,res)=>{
    // res.send("single blog")
    const { userId } = req.user;
    const {blogId} = req.params;
    try {
        const blog = await Blog.findOne({createdby: userId, _id: blogId}); // our search parameter will the find one created by the users id and also the one that matches the id in our database
        res.status(200).json({success: true, blog})
    } catch (error) {
         res.json({ error });

        //  166. lets go to postman to test get a single blog
        // a. we will provide an id in our route
        // b. then we get back
    }
}
// d. update blog
// ###skeleton
// const updateBlog = async (req,res)=>{
//     res.send("updated")
// }
// 167. we want to update, we need the logged in user's id and the blog id, so we will copy and paste
const updateBlog = async (req,res)=>{
    // res.send("updated")
     const { userId } = req.user;
     const { blogId } = req.params;
     try {
        const blog = await Blog.findOneAndUpdate({createdby: userId, _id: blogId}, req.body, {new: true}, {runValidators: true})
         // 168. we want to to updte the blog created by our logged in user and access the actual blog by its id. **then we want to pass in the req.body:what we want to use to update it, **then new to give us the most recent updated blog, **then the run validators to validate what we are updating to make sure its all good
        res.status(200).json({success: true,  blog})
     } catch (error) {
        res.json({ error });
        // 169. before we test, lets do delete
     }
}
// e. delete blog
// ###skeleton
// const deleteBlog = async (req,res)=>{
//     res.send("deleted")
// }
const deleteBlog = async (req,res)=>{
    // res.send("deleted")
    const { userId } = req.user;
    const { blogId } = req.params;
    try {
        const blog = await Blog.findOneAndDelete({createdby: userId, _id: blogId})
        res.status(200).json({success: true, msg: "Blog deleted successfully"})
    } catch (error) {
        res.json({ error });

        // 170. lets go to postman and test both update and delete
        // a. update is working as it should, lets try delete
        // b. delete is working as it should
    }
}

// 129. we will do the skeleton, then before we do the actual code

// 131. lets export these things
module.exports = {createBlog, getBlogs, getSingleBlog, updateBlog, deleteBlog}

// 132. create a blog router and move over there



// Activity,1. write a function that gets all blogs regardless of the user 
// 2. and get a singleblog regardless of the user
// bonus: you will write the function, export it out and set up appropriate routes for it and set up your postman to test



// 171. now let us do our error handling: error handling is something we will alwys come accross in web development.we have two types of errors
// a. Operational errors: these are errors we can predict that might occur as we write the code, all we nned to do is handle them in advance. for example, redirecting a user that tries to reach a route that we have not created, we can predict these errors
// b. Programming errors: these are errors made while we are writing the code

//172. we will be fixing a few errors
// a. we want to cater for when the users enters a route that does not exist
// 173. we will create a middleware in a different folder to cater for all that, so we can create the folder and call it "utils"
// 174. we create a file called 'notfound.js' and headover there