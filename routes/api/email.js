require("dotenv").config()
const nodemailer = require("nodemailer")
const { google } = require("googleapis")
const oAuth2 = google.auth.OAuth2
const router = require("express").Router()

const createTransporter = async () => {
  const oAuth2Client = new oAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
  )

  oAuth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN,
  })

  const accessToken = await new Promise(function (resolve, reject) {
    oAuth2Client.getAccessToken((err, token) => {
      if (err) {
        reject("Failed to get access token")
      }
      resolve(token)
    })
  })

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    // secure: true,
    auth: {
      type: "0Auth2",
      user: process.env.EMAIL,
      accessToken: accessToken,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
    },
  })

  return transporter
}

const sendEmail = async emailOptions => {
  let emailTransporter = await createTransporter()
  await emailTransporter.sendMail(emailOptions)
}

const tryYahooEmail = () => {
  const yahooTransporter = nodemailer.createTransport({
    // service: "Yahoo",
    service: "Yahoo",
    auth: {
      user: process.env.YAHOO_EMAIL,
      password: process.env.YAHOO_PASSWORD,
    },
  })

  const options = {
    from: process.env.YAHOO_EMAIL,
    to: "milesselim@icloud.com",
    subject: "Test Subject",
    text: "Test Text",
    // html: "<h1>Test</h1><h2>Test</h2>",
  }

  yahooTransporter.sendMail(options, (err, info) => {
    if (err) {
      console.warn(err)
      return
    }
    console.log(info.response)
  })
}

function testNodemailer() {
  const options = {
    from: process.env.EMAIL,
    to: "milesselim@icloud.com",
    subject: "Test Subject",
    text: "Test Text",
    // html: "<h1>Test</h1><h2>Test</h2>",
  }

  sendEmail(options)
  //   tryYahooEmail()
}

router.route("/test").get(testNodemailer)

module.exports = router
