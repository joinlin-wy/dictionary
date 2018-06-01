const mongodb = require('../mongodb');

module.exports = {
  async getWordsByUser(req, res) {
    let userInfo = await mongodb.operate.getUserInfo({
      account: req.query.account
    });
    let result = await mongodb.operate.getWords({
      options: {
        limit: userInfo.countNumber,
        skip: parseInt(userInfo.startIndex)
      }
    });
    result.docs.forEach((value) => {
      value.isMarked = false;
      if(userInfo.markedWords){
        for(let i=0;i<userInfo.markedWords.length;i++){
          if(userInfo.markedWords[i].word === value.word){
            value.isMarked = true;
            return
          }
        }
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
        docs: result.docs,
        countNumber: userInfo.countNumber,
        startIndex: userInfo.startIndex
      });
    }
  },
  async queryWord(req, res) {
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
        docs: result.docs
      });
    }
  },
  async markWord(req, res) {
    let word = req.query.word;
    let isMarked = req.query.isMarked === 'false';//为true添加收藏
    let account = req.session.account || req.cookies['account'] || req.query.account;
    let {error} = await mongodb.operate.markWord({
      word,
      isMarked,
      account
    });
    if (error) {
      res.send({
        status: false,
        msg: error
      });
    } else {
      res.send({
        status: true,
        word: word,
        isMarked: isMarked
      });
    }
  },
  async getMarkedWords(req, res) {
    let {docs, error} = await mongodb.operate.getMarkedWords(req.query.account);
    res.send({
      status: !error,
      docs,
      msg: error
    });
  },
  async updateStartIndex(req,res){
    let index = req.query.index;
    let account = req.session.account;
    let {error} = await mongodb.operate.updateStartIndex(account,index);
    res.send({
      status: !error,
      msg: error
    })
  }
};
