const express = require('express');
const request = require('request');
const cors = require('cors');

var ThingSpeakClient = require('thingspeakclient');
var client = new ThingSpeakClient();
client.attachChannel(2218636, { writeKey:'BZAGA7JD4RSVJPG7', readKey:'0DPOL84YETZ2MCQJ'});
const app = express();
app.use(cors());
const PORT = 4000;
function getData(url) {
    return new Promise((resolve, reject) => {
        request.get(url, (error, response, body) => {
            if (error) {
                console.error(`Error retrieving data from ${url}:`, error);
                reject(error);
            } else {
                console.log(body);
                resolve(body);
            }
        });
    });
}
app.get('/', async function(req, res) {
    const [field1,field2] = await Promise.all([getData("https://api.thingspeak.com/channels/2218636/fields/1/last.json?api_key=0DPOL84YETZ2MCQJ"),getData("https://api.thingspeak.com/channels/2218636/fields/2/last.json?api_key=0DPOL84YETZ2MCQJ")])
    const pr = JSON.parse(field1).field1
    const temp = JSON.parse(field2).field2
    request.post({
        url: 'http://127.0.0.1:5000/flask',
        body: JSON.stringify([pr,temp]),
        headers: { 'Content-Type': 'application/json' }
    }, function(error, response, body) {
        if (error) {
        console.error('Error:', error);
        res.status(500).send('Error sending data to Flask server');
        } else {
        console.log('statusCode:', response && response.statusCode);
        console.log('body:', body);
        res.json({pr,temp,body});
        }
     });
});

app.listen(PORT, function() {
  console.log('Listening on Port', PORT);
});
