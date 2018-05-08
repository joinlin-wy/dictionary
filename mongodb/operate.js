const connect = require('./connect');
// const assert = require('assert')
const curd = require('./CURD');


module.exports = function (client) {
  const dbName = 'dictionary';
  const db = client.db(dbName);

  const dbOperator = {
    async getWords(options) {
      let result = await curd.findDocuments({
        db: db,
        docName: '考研英语词汇',
        query: options.query,
        options: options.options
      });
      // console.log(docs)
      return result;
    },
    async queryWord(options) {
      let result = await curd.findDocument({
        db: db,
        docName: '考研英语词汇',
        query: options.query,
        options: options.options
      });
      // console.log(docs)
      return result;
    },
    async updateWord(options) {
      let result = await curd.updateDocument({
        db: db,
        docName: '考研英语词汇',
        filter: options.filter,
        data: options.data
      });
      return result;
    },
    async markWord(options) {
      let result = await curd.updateDocument({
        db: db,
        docName: '考研英语词汇',
        filter: {
          word: options.word
        },
        data: {
          isMarked: options.isMarked
        }
      });
      return result;
    },
    async checkPassword(options) {
      let result = await curd.findDocument({
        db: db,
        docName: 'users',
        query: {
          username: options.username,
          password: options.password
        },
        options: options.options
      });
      return result;
    }
  };

  return dbOperator;
};
