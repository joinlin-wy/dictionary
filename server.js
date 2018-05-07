const express = require('express');
const mongodb = require('./mongodb/');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const app = express();

mongodb.connect().then(function () {
  console.log('connected successfully to mongoDB server');
});
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
  secret: 'love me,love my dog',
  name: 'dictionary', //这里的name值得是cookie的name，默认cookie的name是：connect.sid
  cookie: {
    maxAge: 60000 //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
  },
  rolling: false, //每个请求都重新设置一个 cookie，默认为 false。
  resave: false, //即使 session 没有被修改，也保存 session 值，默认为 true。
  saveUninitialized: false
}));
let server = app.listen(8888, function () {
  let host = server.address().address;
  let port = server.address().port;

  console.log('server listening at http://%s:%s', host, port);
});


app.all('/', (req, res, next) => {
  console.log('req ip: ' + req.ip);
  console.log('req url: ' + req.originalUrl);
  next();
});

app.get('/login', (req, res) => {
    if (req.session.login) {
      res.send('you have logined');
    } else {
      req.session.regenerate((error) => {
        if (error) {
          console.log(error);
          res.send('logined failed');
        }else{
          console.log('new session created');
          req.session.login = true;
          res.send({logined: true});
        }
      });
    }
  })
  .get('/logout', (req, res) => {
    req.session.destroy(function(err) {
      res.send({destroyed:true});
      console.log('a session destroyed');
    });
  })
  .get('/', (req, res) => {
    res.setHeader('Content-type', 'text/html');
    res.send('<p style="color:#d4d4d4">hello</p>');
  })
  .get('/getWords', async (req, res) => {
    let docs = await mongodb.operate.getWords({
      options: {
        limit: 10
      }
    });
    res.send(docs);
  })
  .get('/queryWord', async (req, res) => {
    let word = req.query.word;
    let result = await mongodb.operate.queryWord({
      query: {
        word
      }
    });
    res.send({
      word: word,
      explain: result
    });
  })
  .get('/markWord', async (req, res) => {
    let word = req.query.word;
    let isMarked = req.query.isMarked === 'true';
    let result = await mongodb.operate.markWord({
      word,
      isMarked
    });
    res.send(result);
  });
