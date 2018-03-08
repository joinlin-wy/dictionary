const http = require('http')
const connect = require('./mongodb/connect')

(async function(){
    let Client = await connect()
    http.createServer(function(){
        
    })
}())
