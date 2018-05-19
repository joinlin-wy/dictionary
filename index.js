const app = require('./index/server');
const mongodb = require('./mongodb/');
mongodb.connect().then(function () {
  console.log('connected successfully to mongoDB server');
  app.startup();
});
