const router = require("express").Router()
const inquiryRoutes = require("./inquiry.js")

router.use("/inquiry", inquiryRoutes)

module.exports = router
