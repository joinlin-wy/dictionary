const mongodb = require('../mongodb');

module.exports = {
  async getWordsByUser(req,res){
    let userInfo = await mongodb.operate.getUserInfo({
      account: req.query.account
    });
    let result = await mongodb.operate.getWords({
      options: {
        limit: userInfo.countNumber,
        skip: userInfo.startIndex
      }
    });
    if (result.error) {
      res.send({
        status: false,
        docs: null
      });
    } else {
      res.send({
        status: true,
        docs: result.docs
      });
    }
  },
  async queryWord(req,res){
    let word = req.query.word;
    let result = await mongodb.operate.queryWord({
      query: {
        word
      }
    });
    if (result.error) {
      res.send({
        status: false
      });
    } else {
      res.send({
        status: true,
        word: word,
        explain: result.explain
      });
    }
  },
  async markWord(req,res){
    let word = req.query.word;
    let isMarked = req.query.isMarked === 'false';//为true添加收藏
    let account = req.session.account || req.cookies['account'] || req.query.account;
    let result = await mongodb.operate.markWord({
      word,
      isMarked,
      account
    });
    if (result.error) {
      res.send({
        status: false,
        msg: result.error
      });
    } else {
      res.send({
        status: true,
        word: word,
        isMarked: isMarked
      });
    }
  },
  async getMarkedWords(req,res){
    let {docs,error} = await mongodb.operate.getMarkedWords(req.query.account);
    res.send({
      status: !error,
      docs,
      msg:error
    });
  }
};
