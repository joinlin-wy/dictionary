const crypto = require('crypto');
const mongodb = require('../mongodb');

let key = 'my words 101';
module.exports = {
  check(req, res) {
    let info = '';
    try{
      info = JSON.parse(aesDecrypt(req.body.storage, key));
    }catch (e) {
      info=null;
    }
    if(info && info.account){
      console.log(info);
      let {account, password} = info;
      mongodb.operate.getUserInfo({
        account,
        password
      }).then(function (result) {
        if (result) {
          req.session.regenerate((error) => {
            error && console.log(error);
            req.session.login = true;
            req.session.account = account;
            res.cookie('account', account);
            res.send({
              status: true,
              msg: '登录成功',
              account
            });
          });
        } else {
          res.send({
            status: false,
            msg: '登录失败'
          });
        }
      });
    } else {
      res.send({
        status: false,
        msg: '登录失败'
      });
    }
  },
  in (req, res) {
    let {password, account} = req.body;
    if (securityCheck(password) > 0) { //密码可信
      console.log(`account:${account} password:${password}`);
      mongodb.operate.getUserInfo({
        password,
        account
      }).then((result) => {
        console.log(result);
        if (result) {
          req.session.regenerate((error) => {
            error && console.log(error);
            console.log('new session created');
            req.session.login = true;
            req.session.account = account;
            res.cookie('account', account);
            res.send({
              status: true,
              msg: '登录成功',
              account,
              storage: aesEncrypt(JSON.stringify({
                account,
                password,
                time: Date()
              }), key)
            });
          });
        } else {
          res.send({
            status: false,
            msg: '登录失败，请检查用户名密码！'
          });
        }
      });
    }
  },
  out(req,res) {
    req.session.destroy(function(err) {
      err && console.log(err);
      res.send({
        status: !err,
        msg:''
      });
    });
  },
  async register(req, res) {
    let {account,password} = req.body;
    let result = await mongodb.operate.getUserInfo({
      account
    });
    if(!result){
      let result = await mongodb.operate.register({
        password,
        account,
        startIndex:0,
        countNumber:10
      });
      if(!result.error){
        res.send({status:true,msg:"注册成功",
        storage:aesEncrypt(JSON.stringify({
          account,
          password,
          time: Date()
        }), key)});
      }else{
        res.send({status:false,msg:"注册失败"});
      }
    }else{
      res.send({status:false,msg:"用户名已存在，请更换！"});
    }
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
//aes 对称加密算法，加解密都用同一个密钥
function aesEncrypt(data, key) {
  const cipher = crypto.createCipher('aes192', key);
  let crypted = cipher.update(data, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
}

function aesDecrypt(encrypted, key) {
  const decipher = crypto.createDecipher('aes192', key);
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}
