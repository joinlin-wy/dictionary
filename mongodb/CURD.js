/*  create, read, update, and delete  APIs:http://mongodb.github.io/node-mongodb-native/3.0/api/Collection.html*/
const assert = require('assert')
const findDocument = function (config) {
    return new Promise(function (resolve, reject) {
        config.db.collection(config.docName).findOne(config.query || {}, config.options || null, (err, docs) => {
            if (err) {
                reject(err)
            } else {
                resolve(docs)
            }
        })
    })
}
const findDocuments = function (config) {
    return new Promise(function (resolve, reject) {
        config.db.collection(config.docName).find(config.query || {}, config.options || null).toArray((err, docs) => {
            if (err) {
                reject(err)
            } else {
                resolve(docs)
            }
        })
    })
}
const insertDocument = function (config) {
    return new Promise(function (resolve, reject) {
        config.db.collection(config.docName).insertOne(config.data, config.options || null, function (err, result) {
            if (err) {
                reject(err)
            } else {
                console.log(`insert ${result.result.n} document`)
                resolve(result)
            }
        })
    })

}
const insertDocuments = function (config) {
    return new Promise(function (resolve, reject) {
        config.db.collection(config.docName).insertMany(config.data, config.options || null, function (err, result) {
            if (err) {
                reject(err)
            } else {
                console.log(`insert ${result.result.n} documents`)
                resolve(result)
            }
        })
    })

}
const deleteDocument = function (config) {
    return new Promise(function (resolve, reject) {
        config.db.collection(config.docName).deleteOne(config.filter, config.options || null, function (err, result) {
            if (err) {
                reject(err)
            } else {
                console.log(`delete ${result.result.n} document`)
                resolve(result)
            }
        })
    })

}
const deleteDocuments = function (config) {
    return new Promise(function (resolve, reject) {
        config.db.collection(config.docName).deleteMany(config.filter, config.options || null, function (err, result) {
            if (err) {
                reject(err)
            } else {
                console.log(`delete ${result.result.n} documents`)
                resolve(result)
            }
        })
    })

}
const updateDocument = function (config) {
    return new Promise(function (resolve, reject) {
        config.db.collection(config.docName).updateOne(config.filter, {
            $set: config.data
        }, config.options || null, function (err, result) {
            if (err) {
                reject(err)
            } else {
                console.log(`update ${result.result.n} document`)
                resolve(result)
            }
        })
    })


}
const updateDocuments = function (config) {
    return new Promise(function (resolve, reject) {
        config.db.collection(config.docName).updateMany(config.filter, config.options || null, {
            $set: config.data
        }, function (err, result) {
            if (err) {
                reject(err)
            } else {
                console.log(`update ${result.result.n} documents`)
                resolve(result)
            }
        })
    })

}
module.exports = {
    findDocument,
    findDocuments,
    insertDocuments,
    insertDocument,
    deleteDocument,
    deleteDocuments,
    updateDocument,
    updateDocuments
}