const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const route = require('./route');

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
//后续将session存到本地或数据库
app.use(session({
  secret: 'love me,love my dog',
  name: 'dictionary', //这里的name值得是cookie的name，默认cookie的name是：connect.sid
  cookie: {
    maxAge: 600000 //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
  },
  rolling: false, //每个请求都重新设置一个 cookie，默认为 false。
  resave: false, //即使 session 没有被修改，也保存 session 值，默认为 true。
  saveUninitialized: false
}));

app.startup = function () {
  let server = app.listen(8888, function () {
    let host = server.address().address;
    let port = server.address().port;
    route(app);
    console.log('server listening at http://%s:%s', host, port);
  });
};
module.exports = app;
