const connect = require('./connect')
const assert = require('assert')
const curd = require('./CURD')
const dbName = 'dictionary'
let data = {
    value: '今天是星期三，传说中的女神节，过了今天就是妇女节了',
    date: '2018-03-07'
}
connect().then(function (client) {
    operate(client)
})
async function operate(client) {
    const db = client.db(dbName)
    
    let docs = await curd.findDocuments({
        db: db,
        docName: 'words',
        options:{
            limit: 10
        }
    })
    console.log(docs)
    client.close()
}