const request = require('request');

url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=TCS.BSE&outputsize=full&apikey=ZDGWWTV7U0CJBWNM`

const stocksData = request.get({
    url: url,
    json: true,
    headers: {'User-Agent': 'request'}
  }, (err, res, data) => {
    if (err) {
      console.log('Error:', err);
    } else if (res.statusCode !== 200) {
      console.log('Status:', res.statusCode);
    } else {
      // data is successfully parsed as a JSON object:
      console.log(data);
      // module.exports.callStocks = data;
    }
});



module.exports.callStocks = stocksData;