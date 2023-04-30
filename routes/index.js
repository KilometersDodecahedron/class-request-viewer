const path = require("path")
const router = require("express").Router()
const apiRoutes = require("./api")
const verifyRoutes = require("./verify")

// JWT authentication
const jwt = require("jsonwebtoken")

router.use("/api", apiRoutes)
router.use("/verify", verifyRoutes)

// router.use(function (req, res) {
//   res.render(path.join(__dirname, "../views/index.handlebars"))
// })

router.use(function (req, res) {
  console.log(req.query.token)
  let token = req.query.token

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    // tells user token isn't valid
    if (err) {
      console.log("not verified")
      res.render(path.join(__dirname, "../views/login.handlebars"))
    } else {
      console.log("verified")
      res.render(path.join(__dirname, "../views/index.handlebars"))
    }
  })

  // if (1 == 1) {
  //   res.render(path.join(__dirname, "../views/index.handlebars"))
  // } else {
  //   res.render(path.join(__dirname, "../views/login.handlebars"))
  // }
  // res.render(path.join(__dirname, "../views/login.handlebars"))
})

module.exports = router
