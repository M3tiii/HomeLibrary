const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors')
const db = require('./server/config/db');
const app = express();
const port = 8000;

app.use(cors());

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

MongoClient.connect(db.url, (err, database) => {
  if (err) return console.log(err)

  const mailer = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'mySuperAnnonymusMail@gmail.com', // Your email id
      pass: 'Admin123Admin' // Your password
    }
  });

  require('./server/routes')(app, database, mailer);
  app.listen(port, () => {
    console.log('We are live on ' + port);
  });
})
