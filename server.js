const express = require('express')
const mongodb = require('./mongodb/')
const bodyParser = require('body-parser')
const app = express()

mongodb.connect().then(function () {
    console.log('connected successfully to mongoDB server')
});
app.use(bodyParser.json())
var server = app.listen(8888, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('server listening at http://%s:%s', host, port);
});


app.all('/', (req, res, next) => {
    console.log('req ip: ' + req.ip)
    console.log('req url: ' + req.originalUrl)
    next()
})
app.get('/', (req, res) => {
        res.setHeader('Content-type', 'text/html')
        res.send('<p style="color:#d4d4d4">hello</>')
    })
    .post('/getWords', async (req, res) => {
        let name = req.body.name
        console.log(name)
        let docs = await mongodb.operate.getWords({
            limit: 10
        })
        res.send(docs)
    })
    .post('/queryWord', async (req, res) => {
        let word = req.body.word
        let result = await mongodb.operate.queryWord({
            word
        })
        res.send({
            word: word,
            explain: result.explanation
        })
    })
    .post('/markWord', async (req, res) => {
        let word = req.body.word
        let result = await mongodb.operate.markWord({word})
    })