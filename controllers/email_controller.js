require("dotenv").config()
var nodemailer = require("nodemailer")

const createTransporter = () => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      //   TODO connect Kristen's gmail
      user: process.env.EMAIL,
      pass: process.env.WORD,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
    },
  })

  transporter.verify((err, success) => {
    err ? console.log(err) : console.log(`=== Server is ready to take messages: ${success} ===`)
  })

  return transporter
}

const emailClient = (req, res) => {
  let transporter = createTransporter()

  let mailOptions = {
    from: "kristen@theeclecticchicboutique.com",
    to: req.body.emailAddress,
    subject: req.body.subject,
    html: req.body.emailBody,
  }

  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      res.json("Error " + err)
    } else {
      res.json("Email sent successfully")
    }
  })
}

const emailOwner = (req, res) => {
  // res.json(constructEmailForOwner(req.body))
  let transporter = createTransporter()

  let mailOptions = {
    from: process.env.EMAIL,
    to: "kristen@theeclecticchicboutique.com",
    subject: req.body.subject,
    html: req.body.emailBody,
  }

  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      res.json("Error " + err)
    } else {
      res.json("Email sent successfully")
    }
  })
}

const test = (req, res) => {
  res.json(`emailAddress: ${req.body.emailAddress}
  subject: ${req.body.subject}
  emailBody: ${req.body.emailBody}`)
}

module.exports = {
  emailClient,
  emailOwner,
  test,
}
