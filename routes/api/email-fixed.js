const router = require("express").Router()
const emailController = require("../../controllers/email_controller.js")

router.route("/client").post(emailController.emailClient)
router.route("/owner").post(emailController.emailOwner)
router.route("/test").post(emailController.test)

module.exports = router
