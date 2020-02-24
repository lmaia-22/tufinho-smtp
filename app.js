const express = require('express');
const nodemailer = require('nodemailer');
let cron = require('node-cron');
var rp = require('request-promise');

const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');

const transporter = nodemailer.createTransport({
  host: 'mail.smtp2go.com',
  port: 2525,
  secureConnection: false,
  requireTLS: true,
  auth: {
      user: 'lmaia-22',
      pass: 'qkixK89TjuZr'
  },
  tls: {
    ciphers:'SSLv3'
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
    from: 'luismsm14@gmail.com',
    to: 'luismsm14@gmail.com', // Enter here the email address on which you want to send emails from your customers
    subject: messageSubject,
    text: "Mensagem:" + messageText,
  };

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

//send kittys daily

app.get('/cat', function (req, res) {

  var apiKey = '13a61609-48f3-44ee-8f4c-75814936f2a6';    
  const baseUrl = "https://api.thecatapi.com/v1/images/search";

      var options = {
        uri: baseUrl,
        method: 'GET',
        json: true,
        headers: {
          'x-api-key': apiKey
        }
      };

      let data = "";
      rp(options)
      .then(function (resp) {
           console.log("data collected");
           console.log(resp[0]["url"]);
           res.send(resp);
      });
  }); 

app.post('/kitty', function (req, res) {

  var apiKey = '13a61609-48f3-44ee-8f4c-75814936f2a6';    
  const baseUrl = "https://api.thecatapi.com/v1/images/search";

      var options = {
        uri: baseUrl,
        method: 'GET',
        json: true,
        headers: {
          'x-api-key': apiKey
        }
      };

      let data = "";
      rp(options)
      .then(function (resp) {
           console.log("data collected");
           console.log(resp[0]["url"]);

  let mailOptions = {
    from: 'luismsm14@gmail.com',
    to: 'lmaia@casadamusica.com', // Enter here the email address on which you want to send emails from your customers
    subject: 'Bom dia fofinha!',
    html: '<h1>Para começares logo a manhã com um sorriso Pepsodent</h1><h3>Tem um bom dia de trabalho!</h3><h2><b>Adoro-te! <3</b></h2>',
    attachments: [
        { // Use a URL as an attachment
          filename: 'Cutecat.png',
          path: resp[0]["url"]
      }
    ]
  };
  
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
});

app.listen(port, function () {
  console.log('Express started on port: ', port);
  cron.schedule('40 14 * * *', () => {

    Url = 'https://smtp-tufinho.herokuapp.com/kitty';

    var options = {
      uri: Url,
      method: 'POST',
      json: true,
    };
    rp(options)
  });
});
