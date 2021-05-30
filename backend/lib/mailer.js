const nodemailer = require('nodemailer');
const send = function(email, link) {
  console.log('Trying email to:' + email);
  console.log('with ps: ' +process.env.mailps)
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'kennethyuman',
      pass: process.env.mailps
    }
  });

  let mailOptions = {
    from: 'kennethyuman@gmail.com',
    to: email,
    subject: 'Complete your registration',
    html: `<h1>Great move</h1><p>Please follow this link to complete your sign-up:</p><p><a href='${link}'>Complete the sign-up.</a></p>`
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

}

module.exports = send;