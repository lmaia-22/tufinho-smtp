const express = require('express');
const nodemailer = require('nodemailer');
var rp = require('request-promise');
var cors = require('cors');
var sleep = require('system-sleep');

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

app.use((req, res, next) => {
  req.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
  res.header("Access-Control-Allow-Methods", "GET, POST","PUT", "DELETE");
  next();
});

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors({
  origin: true, // "true" will copy the domain of the request back
  // to the reply. If you need more control than this
  // use a function.
  
  credentials: true, // This MUST be "true" if your endpoint is
  // authenticated via either a session cookie
  // or Authorization header. Otherwise the
  // browser will block the response.
  
  methods: 'POST,GET,PUT,OPTIONS,DELETE' // Make sure you're not blocking
  // pre-flight OPTIONS requests
}));

app.use(cors());
app.use(cors(corsOptions));

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
      rp(options)
      .then(function (resp) {
           console.log("data collected");
           console.log(resp[0]["url"]);
           res.send(resp);
      });
}); 

//quote API

app.get('/quote', function (req, res) {

  const baseUrl1 = "https://quotes.rest/qod.json?category=inspire";
  var options1 = {
    uri: baseUrl1,
    method: 'GET',
    json: true,
  }
  rp(options1)
  .then(function (resp1) {
       console.log("data collected");
       //console.log(resp1.contents.quotes[0]);
       console.log(resp1.contents.quotes[0].quote);
       res.send(resp1);
  });   
}); 


app.post('/kitty', function(req, res) {

  var apiKey = '13a61609-48f3-44ee-8f4c-75814936f2a6';    
  const baseUrl = "https://api.thecatapi.com/v1/images/search";
  const baseUrl1 = "https://quotes.rest/qod.json?category=inspire";

      var options = {
        uri: baseUrl,
        method: 'GET',
        json: true,
        headers: {
          'x-api-key': apiKey
        }
      };

      var options1 = {
        uri: baseUrl1,
        method: 'GET',
        json: true,
      }

      rp(options)
      .then(function (resp) {
           console.log(resp[0]["url"]);

        rp(options1)
        .then(function (resp1) {
            console.log(resp1.contents.quotes[0].quote);

          let mailOptions = {
            from: 'luismsm14@gmail.com',
            to: 'sgg4@casadamusica.com', // Enter here the email address on which you want to send emails from your customers
            subject: 'Bom dia fofinha!',
            html: '<h1>Tem um bom dia de trabalho!</h1>'+
            '<h3>Mostra a todos a razão pela qual és a pessoa mais incrível que conheço!</h3>'+ 
            '<h3>Estarei sempre esperando por ti, no final do dia de trabalho, com o abraço mais apertado e carinhoso do mundo!</h3>'+
            '<a href="https://lmaia-22.github.io/tufinho/assets/tom_jerry.mp4">Para ajudar a começares o dia com um sorriso pepsodent</a>'+
            '<h2 style="color:red;"><b>Adoro-te! <3</b></h2>',
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
              process.exit(0);
            } else {
              console.log('Message sent: ', response);
              res.end('sent');
            }
          });
        });
      });
  });

app.listen(port, async function handler() {
  console.log('Express started on port: ', port);

 });

