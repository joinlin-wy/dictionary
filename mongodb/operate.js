const connect = require('./connect')
// const assert = require('assert')
const curd = require('./CURD')


module.exports = function(client){
    const dbName = 'dictionary'
    const db = client.db(dbName)

    async function getWords(options) {
        let docs = await curd.findDocuments({
            db: db,
            docName: '考研英语词汇',
            options: options
        })
        console.log(docs)
        return docs
    }
    async function queryWord(options) {
        let docs = await curd.findDocument({
            db: db,
            docName: '考研英语词汇',
            data: options
        })
        console.log(docs)
        return docs
    }
    return {
        getWords,
        queryWord
    }
}