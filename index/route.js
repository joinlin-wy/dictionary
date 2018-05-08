const mongodb = require('../mongodb');
const sign = require('./sign');

module.exports = function(app){
    app.all('/', (req, res, next) => {
        console.log('req ip: ' + req.ip);
        console.log('req url: ' + req.originalUrl);
        if(req.session.login){
             next();
        }else{
            res.send({logined:false});
        }
      });
      
      app.post('/login', (req, res) => {
          sign.in(req,res);
        })
        .post('/logout', (req, res) => {
          req.session.destroy(function (err) {
            res.send({
              status: !err
            });
            console.log('a session destroyed');
          });
        })
        .get('/', (req, res) => {
          res.setHeader('Content-type', 'text/html');
          res.send('<p style="color:#d4d4d4">hello</p>');
        })
        .get('/getWords', async (req, res) => {
          let result = await mongodb.operate.getWords({
            options: {
              limit: 10
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
        })
        .get('/queryWord', async (req, res) => {
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
        })
        .get('/markWord', async (req, res) => {
          let word = req.query.word;
          let isMarked = req.query.isMarked === 'true';
          let result = await mongodb.operate.markWord({
            word,
            isMarked
          });
          if (result.error) {
            res.send({
              status: false
            });
          } else {
            res.send({
              status: true,
              word: word,
              isMarked: result.isMarked
            });
          }
        });
};