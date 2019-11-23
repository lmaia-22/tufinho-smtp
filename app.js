const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
      user: 'freeda44@ethereal.email',
      pass: 'nsJuDDjShxf4sHqz1E'
  }
});

app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.status(200);
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Origin");
  next();
});

app.post('/send', function (req, res) {

  let messageSubject = req.body.contactFormSubjects;
  let messageText = req.body.contactFormMessage;


  let mailOptions = {
    to: ['luismsm14@gmail.com'], // Enter here the email address on which you want to send emails from your customers
    from: "Tufinho",
    subject: messageSubject,
    text: "Mensagem:" + messageText,
  };

  if (messageSubject === '') {
    res.status(400);
    res.send({
    message: 'Bad request'
    });
    return;
  }

  if (messageText === '') {
    res.status(400);
    res.send({
    message: 'Bad request'
    });
    return;
  }

  transporter.sendMail(mailOptions, function (error, response) {
    if (error) {
      console.log(error);
      res.end('error');
    } else {
      console.log('Message sent: ', response);
      res.end('sent');
    }
  });
});

app.listen(port, function () {
  console.log('Express started on port: ', port);
});