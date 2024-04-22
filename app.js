const express = require('express');
const path = require('path');
require("dotenv").config();
const { connectionToMongodb } = require("./db/connect");
const nodemailer = require('nodemailer');


// Create an Express application
const app = express();

// Set up view engine and views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Set up static files directorys
app.use(express.static(path.join(__dirname, 'public')));

// Set up routes
// app.use('/', userRouter );

connectionToMongodb();


app.post('/contactus', (req, res) => {
  const { name, email, message } = req.body;

  // Create a nodemailer transporter
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465, // or 465 for SSL
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.email, // replace with your email address
        pass: 'apab bcje vgdf wiwx' // replace with your password
      },
    });

    // Setup email data
    const mailOptions = {
      from: req.body.email,
      to: process.env.email,
      subject: 'New Contact Form Submission',
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.status(500).send('Error sending email');
      } else {
        console.log('Email sent: ' + info.response);
        res.status(200).send('Email sent successfully');
      }
    });
  } catch(err) { 
    console.log(err)
  }

});


app.get("/", (req, res) => {
  res.render("home");
});

app.get("/about", (req, res) => {
  res.render("about");
});
app.get("/contactus", (req, res) => {
  res.render("contactus");
});
app.get("/services", (req, res) => {
  res.render("services");
});

app.get("/trackgoods", (req, res) => {
  res.render("trackgoods");
});





// Start the servers
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});