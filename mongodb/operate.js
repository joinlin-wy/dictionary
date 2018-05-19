const curd = require('./CURD');


module.exports = function (client) {
  const dbName = 'dictionary';
  const db = client.db(dbName);
  
  const dbOperator = {
    async getWords(options) {
      let result = await curd.findDocuments({
        db,
        docName: '考研英语词汇',
        query: options.query,
        options: options.options
      });
      return result;
    },
    async queryWord(options) {
      let result = await curd.findDocument({
        db,
        docName: '考研英语词汇',
        query: options.query,
        options: options.options
      });
      // console.log(docs)
      return result;
    },
    async updateWord(options) {
      let result = await curd.updateDocument({
        db,
        docName: '考研英语词汇',
        filter: options.filter,
        operate: {
          $set: options.data
        }
      });
      return result;
    },
    async markWord(options) {
      let operate = {};
      let date = new Date();
      if(options.isMarked){
        operate = {
          $push:{
            markedWords: {
              word: options.word,
              time: date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()
            }
          }
        }
      }else{
        operate = {
          $pull: {
            markedWords: {
              word: options.word,
            }
          }
        }
      }
      let result = await curd.updateDocument({
        db,
        docName: 'users',
        filter: {
          account: options.account
        },
        operate
      });
      return result;
    },
    async getMarkedWords(account) {
      let result = await curd.findDocument({
        db,
        docName: 'users',
        query: {
          account
        },
        options:{
          projection:{
            markedWords:1,
            _id:0
          }
        }
      });
      return result;
    },
    async getUserInfo(options) {
      let result = await curd.findDocument({
        db,
        docName: 'users',
        query: options
      });
      
      return result.docs;
    },
    async register(options) {
      let result = await curd.insertDocument({
        db,
        docName: 'users',
        data: options
      });
      return result;
    }
  };
  
  return dbOperator;
};
