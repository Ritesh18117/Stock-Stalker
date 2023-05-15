const express = require('express');
const app = express();
const path = require('path');
// const callStocks = require('./models/stocks');

// =====================================================
var request = require('request');

// replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=TCS.BSE&outputsize=full&apikey=ZDGWWTV7U0CJBWNM`

// =========================================



// Setting view engine for "path" 
app.set('views', path.join(__dirname,'views'));
app.set('view engine','ejs');

app.use(express.static(path.join(__dirname, 'static')));


app.get('/', (req,res) => {
    res.render('index.ejs')
})

app.get('/about', (req,res) => {
    res.render('about.ejs')
})

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


app.listen(5000,() => {
    console.log("Connected to port 5000 !!!!");
})