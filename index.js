require('dotenv').config();

const url = process.env.url;
const PORT = process.env.PORT || 5000;

const express = require('express');
const app = express();
const path = require('path');
var request = require('request');
// For Contact Submit
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

// For News 
const NewsAPI = require('newsapi');
const { error } = require('console');
const newsapi = new NewsAPI(`${process.env.news}`);


// Middleware to parse the body of the incoming request
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Setting view engine for "path" 
app.set('views', path.join(__dirname,'views'));
app.set('view engine','ejs');

app.use(express.static(path.join(__dirname, 'static')));


// app.get('/', (req,res) => {
//     res.render('index.ejs')
// })

app.get('/', (req,res) => {
  newsapi.v2.topHeadlines({
    country:'in',
    category:'business',
  }).then(response => {
    console.log(response.articles.title);
    res.render('index.ejs',{response})
  }).catch(error =>{
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  });
})

app.get('/news', (req,res) => {
  newsapi.v2.topHeadlines({
    country:'in',
    category:'business',
  }).then(response => {
    console.log(response);
    res.render('news.ejs',{response})
  }).catch(error =>{
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  });
})

app.get('/about', (req,res) => {
    res.render('about.ejs')
})

app.get('/contact', (req,res) => {
    res.render('contact.ejs')
})

// Contact form submission endpoint
app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;
  
    // Create a transporter object using your email service details
    const transporter = nodemailer.createTransport({
      service: 'your_email_service',
      auth: {
        user: 'your_email_address',
        pass: 'your_email_password',
      },
    });
  
    // Compose the email
    const mailOptions = {
      from: email,
      to: 'your_email_address',
      subject: 'New Contact Form Submission',
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };
  
    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.render('contact.ejs');
        // res.status(500).send('Error sending email');
      } else {
        console.log('Email sent:', info.response);
        res.render('contact.ejs');
        // res.send('Email sent successfully');
      }
    });
  });

app.get('/stocks', async (req,res) => {
    // request.get({
    //     url: url,
    //     json: true,
    //     headers: {'User-Agent': 'request'}
    //     },async (err, res, responseData) => {
    //     if (err) {
    //         console.log('Error:', err);
    //     } else if (res.statusCode !== 200) {
    //         console.log('Status:', res.statusCode);
    //     } else {
    //         processData(responseData);
    //     }
    // });

    // // You can also access the data variable outside the callback function after it has been assigned a value.
    // async function processData(data) {
    //     // Process the data here
    //     console.log('Processing data:', data);
    //     res.render('stock.ejs',{data});
    // }
    res.render('stock.ejs');
})


app.listen(PORT,() => {
    console.log("Connected to port 5000 !!!!");
})