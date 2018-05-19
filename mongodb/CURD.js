/*  create, read, update, and delete  APIs:http://mongodb.github.io/node-mongodb-native/3.0/api/Collection.html*/
const assert = require('assert');
const findDocument = function (config) {
  return new Promise(function (resolve, reject) {
    config.db.collection(config.docName).findOne(config.query || {}, config.options || null, (error, docs) => {
        resolve({docs,error});
    });
  });
};
const findDocuments = function (config) {
  return new Promise(function (resolve, reject) {
    config.db.collection(config.docName).find(config.query || {}, config.options || null).toArray((error, docs) => {
        resolve({docs,error});
    });
  });
};
const insertDocument = function (config) {
  return new Promise(function (resolve, reject) {
    config.db.collection(config.docName).insertOne(config.data, config.options || null, function (error, result) {
      if (error) {
        resolve({error});
      } else {
        console.log(`insert ${result.result.n} document`);
        resolve({result});
      }
    });
  });

};
const insertDocuments = function (config) {
  return new Promise(function (resolve, reject) {
    config.db.collection(config.docName).insertMany(config.data, config.options || null, function (error, result) {
      if (error) {
        resolve({error});
      } else {
        console.log(`insert ${result.result.n} documents`);
        resolve({result});
      }
    });
  });

};
const deleteDocument = function (config) {
  return new Promise(function (resolve, reject) {
    config.db.collection(config.docName).deleteOne(config.filter, config.options || null, function (error, result) {
      if (error) {
        resolve({error});
      } else {
        console.log(`delete ${result.result.n} document`);
        resolve({result});
      }
    });
  });

};
const deleteDocuments = function (config) {
  return new Promise(function (resolve, reject) {
    config.db.collection(config.docName).deleteMany(config.filter, config.options || null, function (error, result) {
      if (error) {
        resolve({error});
      } else {
        console.log(`delete ${result.result.n} documents`);
        resolve({result});
      }
    });
  });

};
const updateDocument = function (config) {
  return new Promise(function (resolve, reject) {
    config.db.collection(config.docName).updateOne(config.filter, config.operate,
      config.options || null, function (error, result) {
      if (error) {
        resolve({error});
      } else {
        console.log(`update ${result.result.n} document`);
        resolve({result});
      }
    });
  });


};
const updateDocuments = function (config) {
  return new Promise(function (resolve, reject) {
    config.db.collection(config.docName).updateMany(config.filter, config.options || null, {
      $set: config.data
    }, function (error, result) {
      if (error) {
        resolve({error});
      } else {
        console.log(`update ${result.result.n} documents`);
        resolve({result});
      }
    });
  });

};
module.exports = {
  findDocument,
  findDocuments,
  insertDocuments,
  insertDocument,
  deleteDocument,
  deleteDocuments,
  updateDocument,
  updateDocuments
};
