// server.js
// where your node app starts
require('dotenv').config()
// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.get('/api/:date', (req, res) => {
  var dateInput = req.params.date
  dateObject = new Date(dateInput)
  if (dateObject != 'Invalid Date')
    res.json({ unix: dateObject.getTime(), utc: dateObject.toUTCString() })
  else
    res.json({ error: 'Invalid Date' })
})

app.get('/api/', (req, res) => {
  const currDate = new Date()
  res.json({ unix: currDate.getTime(), utc: currDate.toUTCString() })
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
