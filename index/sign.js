const crypto = require('crypto');
const mongodb = require('../mongodb');

module.exports = { in (req, res) {
    if (req.session.login) { //已登录
      res.send({
        msg: 'already logined',
        status: false
      });
    } else { //未登录
      let password = req.query.password;
      let username = req.query.username;
      if (securityCheck(password) > 0) { //密码可信
        let psw = crypto.createHash("sha1")
          .update(password)
          .digest('hex');
        console.log(`username:${username} password:${psw}`);
        mongodb.operate.checkPassword({
          password: psw,
          username
        }).then((result) => {
          console.log(result);
          if (!result.error && result.docs) {
            req.session.regenerate((error) => {
              if (error) {
                console.log(error);
              }
              console.log('new session created');
              req.session.login = true;
              res.send({
                status: true,
                msg: 'login seccuss'
              });
            });
          } else {
            res.send({
              status: false,
              msg: 'logined failed'
            });
          }
        });

      }

    }
  },
  out() {},
  register(req, res) {

  }
};
//密码安全强度检测
function securityCheck(psw) {
  let strength = 0;
  if (psw.length > 6) {
    strength++;
  } else
  if (/[a-z]/.test(psw)) {
    strength++;
  } else
  if (/[A-Z]/.test(psw)) {
    strength++;
  } else
  if (/[0-9]/.test(psw)) {
    strength++;
  } else
  if (/[^a-z A-Z 0-9]/) {
    strength++;
  } else {
    strength++;
  }
  return strength;
}
