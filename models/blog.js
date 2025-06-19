// 117. we want ot build the blog schema here
// 'tittle, 
// description: our content
// , tag: the type of content
// created by: who created the blog
// 118. we want to get mongoose

const mongoose = require("mongoose")

// 119. we set up schema differently
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide a blog title"],
  },
  description: {
    type: String,
    required: [true, "Please provide a blog title"],
  },
  // 120. we willset this up a little differently, just to see more ways we can set up our schema
  tag: {
    type: String,
    enum: ['Nature', "Lifestyle", "Technology", "Sport"]
    //note: this just means we can provide values for our user, like suggestions of topics they are allowed to discuss, if they do not use any of what is provided here, they will have an error.
    // if they try to add any other tag description asides exactly what is written here, there will be an error
  },
  createdby: {
    // 121.they must be logged in to do anything on this route, so here we will be making reference to the person that is logged in
    //122. the type will be the mongo id 
    type: mongoose.Types.ObjectId,
    //123. then we will reference the particular user that logged in at that time
    ref: "User",
    required: [true, "please provide a writer"]
  }
// note **  here we are saying we basically want to use an id that exists in our database after we register, automatically, the database creates an id, so we want to access that id ans also the USER schema to access the user in particular that matches the id that was found

// 124. add time stamp
}, {timestamps: true});
// 125. we want to export that out
module.exports = mongoose.model("Blog", blogSchema)

// 126. we want to flesh out the router and controller of the blog
// 127. create the controller, 'blog.js', head over there
