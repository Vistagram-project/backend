const nodemailer = require('nodemailer');
var hbs = require('nodemailer-express-handlebars');
const path = require('path')
// const { createRedirectLink } = require('../controllers/platform/redirects/redirects');
// const util = require('util');

var transporter = nodemailer.createTransport({
    service: "sendMail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
  });
  

  const handlebarOptions = {
    viewEngine: {
      extName: ".handlebars",
      partialsDir: path.resolve('./views'),
      defaultLayout: false,
    },
    viewPath: path.resolve('./views'),
    extName: ".handlebars",
  }
  
  transporter.use('compile', hbs(handlebarOptions));
  
  exports.sendOtpEmail = async (email, otp) => {
    transporter.sendMail({
      from: process.env.SMTP_FROM,
      replyTo: process.env.SMTP_FROM,
      to: email,
      subject: 'Your Vistagam Sign-In OTP - Action Required',
      template: 'sendOtp',
      context: {
        otp: otp
      }
    }, (err) => {
      if (err) console.log('something went wrong');
      else console.log("Mail sent successfully");
    });
    transporter.close();
  }

  exports.webRegistrationMail = async (email, userName) => {
    transporter.sendMail({
      from: process.env.SMTP_FROM,
      replyTo: process.env.SMTP_FROM,
      to: email,
      subject: 'Welcome to Vistagram! ',
      template: 'webRegistration',
      context: {
        userName: userName
      }
    }, (err) => {
      if (err) console.log('something went wrong');
      else console.log("Mail sent successfully");
    });
  }