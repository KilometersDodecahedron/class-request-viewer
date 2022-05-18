const router = require("express").Router()
const inquiryController = require("../../controllers/inquiry_controller.js")

router.route("/").get(inquiryController.getAllInquiries)

router.route("/create").post(inquiryController.postInquiries)

router.route("/update/:id").put(inquiryController.updateInquiries)

router.route("/delete/:id").delete(inquiryController.deleteInquiries)

module.exports = router
