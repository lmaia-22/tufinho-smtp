const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');

const transporter = nodemailer.createTransport({
  host: 'mail.smtp2go.com',
  port: 25,
  secure: true,
  auth: {
      user: 'lmaia-22',
      pass: 'qkixK89TjuZr'
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
    from: 'lmaia@casadamusica.com',
    to: 'luismsm14@gmail.com', // Enter here the email address on which you want to send emails from your customers
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
