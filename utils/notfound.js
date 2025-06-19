// 175. when a user accesses something in our website that does not exist
// 176. set up a logic
const notfound = (req, res) =>{
    res.status(404).send("Route not found")
}


// 177. export it out
module.exports = notfound

// 178. we will head over to index and require it at the top