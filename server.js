var express = require('express')
var app = express()

var cors = require('cors')
app.use(cors({optionSuccessStatus: 200}))  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
})

// Create a new timestamp, if no datestring is given
app.get('/api/timestamp', (req, res) => {
  const currentDate = new Date()
  
  res.json({
    unix: currentDate.getTime(),
    utc: currentDate.toUTCString()
  })
})

// Return timestamp if datestring is given
app.get('/api/timestamp/:datestring', (req, res) => {
  const dateString = req.params.datestring
  const dateObject = new Date(dateString)
  
  if (dateObject.getDate() === NaN) return res.json({
    unix: null, 
    utc: 'Invalid Date'
  })
  
  res.json({
    unix: dateObject.getTime(),
    utc: dateObject.toUTCString()
  })
})

// listen for requests :)
var listener = app.listen(process.env.PORT, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})