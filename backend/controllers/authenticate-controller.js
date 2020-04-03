var Cryptr = require('cryptr');
cryptr = new Cryptr('myTotalySecretKey');

var connection = require('./../config');
module.exports.authenticate = function (req, res) {
  var email = req.body.email;
  var password = req.body.password;
  //req.session.isLogged

  connection.query('SELECT * FROM users WHERE email = ?', [email], function (error, results, fields) {
    //console.log("id",results[0].id)
    if (error) {
      res.send({
        status: false,
        message: 'there are some error with query'
      })
    }
    else {

      if (results.length > 0) {
        decryptedString = cryptr.decrypt(results[0].password);
        console.log("decrypted password",decryptedString)
        if (password == decryptedString) {
          // console.log("check1")

        connection.query('SELECT * FROM BoxTable where userid = ? ', [results[0].id] , function(error,boxRes,fields){
          if (error) {
            //console.log("check2")
            res.send({
              status: false,
              message: 'there are some error with query'
            })
          }
          else{
            console.log("check3")
            res.send({
              success:1,
              message:"successfully logged in",
              userid:results[0].id,
              data: boxRes
            })
          }
        })
        } else {
          console.log("check4")
          res.send({
            success:0,
            error_msg:"password not match"});
        }

      }
      else {
        res.json({
          success: 0,
          error_msg: "Email does not exits"
        });
      }
    }
  });
}
