const mongodb = require('mongodb')
const assert = require('assert')
const client = mongodb.MongoClient
const url = 'mongodb://localhost:27017'
module.exports = async function () {
    let Client = await new Promise(function (resolve, reject) {
        client.connect(url, async (err, client) => {
            if (err) {
                reject(err)
            } else {
                console.log('connected succusfully to server')
                resolve(client)
            }
        })
    })
    return Client
}