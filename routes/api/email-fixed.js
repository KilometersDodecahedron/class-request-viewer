let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
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

let mailOptions = {
  from: process.env.EMAIL,
  to: "milesselim@icloud.com",
  subject: "I got it to work!",
  html: "<h1>Hi Kristen</h1> if you're seeing this message, that means it got the Nodemailer to work. Hooray!",
}

transporter.sendMail(mailOptions, function (err, data) {
  if (err) {
    console.log("Error " + err)
  } else {
    console.log("Email sent successfully")
  }
})
