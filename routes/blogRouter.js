// 133. set up router here
const router = require("express").Router()
// 135. import things here
const {createBlog, getBlogs, getSingleBlog, updateBlog, deleteBlog} = require("../controllers/blog")

router.route('/').post(createBlog).get(getBlogs)
router.route("/:blogId").patch(updateBlog).get(getSingleBlog).delete(deleteBlog)







// 134. lets export first before we continue
module.exports = router
// 136. move to index to require that