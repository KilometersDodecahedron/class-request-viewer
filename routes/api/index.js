const router = require("express").Router()
const inquiryRoutes = require("./inquiry.js")
const emailRoutes = require("./email-fixed.js")

router.use("/inquiry", inquiryRoutes)
router.use("/email", emailRoutes)

module.exports = router
