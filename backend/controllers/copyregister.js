var Cryptr = require('cryptr');
var express = require("express");
var connection = require('./../config');
var passwordValidator = require('password-validator');
var schema = new passwordValidator();

schema
  .is().min(8)                                    // Minimum length 8
  .is().max(100)                                  // Maximum length 100
  .has().uppercase()                              // Must have uppercase letters
  .has().lowercase()                              // Must have lowercase letters
  .has().digits()                                 // Must have digits
  .has().not().spaces()                       // Should not have spaces
  .has().symbols()
  .is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values


module.exports.register = function (req, res) {
  var today = new Date();
  var pass = req.body.password
  if (schema.validate(pass)) {
    var encryptedString = cryptr.encrypt(req.body.password);
  }
  else {
    console.log("invalid password")
    res.send({
      success: 0,
      status: true,
      message: "invalid password"
    })
  }
  //var encryptedString = cryptr.encrypt(req.body.password);
  var users = {
    "name": req.body.name,
    "email": req.body.email,
    "password": encryptedString,
    "created_at": today,
    "updated_at": today,
    "user_id": ""
  };
  //var all="SELECT * from users"
  connection.query("SELECT  COUNT(*) AS cnt FROM users WHERE email = ? ", req.body.email, function (err, data) {
    //console.log(results)
    if (err) {
      res.json({
        // status: false,
        message: 'there are some error with query'
      }
      )
    }
    else {
      var mail = users.email;
      //const ans=function validateEmail(vijay) {
      var re = /^[a-z][a-zA-Z0-9_.]*(\.[a-zA-Z][a-zA-Z0-9_.]*)?@[a-z][a-zA-Z-0-9]*\.[a-z]+(\.[a-z]+)?$/;
      const validation = re.test(mail);
      //}
      //console.log(mail);
      //res.send(ans);
      if (validation) {
        //var vijay = false
        if (data[0].cnt > 0) {
          res.send(
            {
              success: 0,
              message: "email and data already exist"

            })
        }

        else {
          connection.query('INSERT INTO users SET ?', users, function (error, data, fields) {
            // console.log("mydata",data.insertId);
            if (error) {
              res.send({
                // status: false,
                message: 'there are some error with query'
              })
            }
            else {
              res.send({
                success: 1,
                message: "Successfully Registered",
                userid: data.insertId
              })
            }
          })
        }
      }


      else {
        res.send({
          success: 0,
          //status:1,
          fault: 1,
          message: "invalid email address"
        })
      }
    }
  })
}

