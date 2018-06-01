const sign = require('./sign');
const words = require('./words');

module.exports = function (app) {
  app.all('*', (req, res, next) => {
    console.log('req ip: ' + req.ip);
    console.log('req url: ' + req.originalUrl);
    res.setHeader("Access-Control-Allow-Origin", req.headers.origin || '*');
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    next();
  });
  
  app.post('/login', (req, res) => {
    if (req.session.login) { //已登录
      res.send({
        msg: '已登录',
        status: true,
        account: req.session.account
      });
    } else if (req.body.type === 'check') {//缓存登录
      sign.check(req, res);
    } else {//用户名密码登录
      sign.in(req, res);
    }
  })
    .post('/logout', (req, res) => {
      req.session.destroy(function (err) {
        res.send({
          status: !err
        });
        console.log('a session destroyed');
      });
    })
    .post('/register', (req, res) => {
      sign.register(req, res);
    })
    .get('/', (req, res) => {
      res.setHeader('Content-type', 'text/html');
      res.send('<p style="color:#d4d4d4">hello</p>');
    })
    .get('/getWordsByUser', (req, res) => {
      words.getWordsByUser(req, res);
    })
    .get('/queryWord', (req, res) => {
      words.queryWord(req, res);
    })
    .get('/markWord', (req, res) => {
      words.markWord(req, res);
    })
    .get('/getMarkedWords', (req, res) => {
      words.getMarkedWords(req, res);
    })
    .get('/updateStartIndex', (req, res) => {
      if (req.session.login) { //已登录
        words.updateStartIndex(req, res);
      } else {
        res.send({
          msg: '未登录',
          status: false
        });
      }
    });
};
