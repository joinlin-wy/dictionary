const mongodb = require('mongodb');
const client = mongodb.MongoClient;
const url = 'mongodb://iceyue.top:8181';
module.exports = async function () {
  let Client = await new Promise(function (resolve, reject) {
    client.connect(url, (err, client) => {
      if (err) {
        throw new Error(err);
        reject(err);
      } else {
        resolve(client);
      }
    });
  });
  return Client;
};
