var express = require("express")
var connection = require('../config');

module.exports.dbapi = function (req, res) {


  var data = req.body
  console.log(data)

  var userid = data.userid
  var box1posid = data[0].id
  var box2posid = data[1].id
  var box3posid = data[2].id
  var BoxTable1 = {
    "userid": userid,
    "box1posid": box1posid,
    "box2posid": box2posid,
    "box3posid": box3posid,
  }
  var BoxTable2 = {
    "box1posid": box1posid,
    "box2posid": box2posid,
    "box3posid": box3posid,
  }
  connection.query("SELECT  COUNT(*) AS cnt FROM BoxTable WHERE userid = ? ", userid, function (err, data) {
    console.log(data[0].cnt)
    if (err) {
      res.json({
        message: 'there are some error with query'
      })
    }
    else {
      if (data[0].cnt > 0) {
        connection.query('Update BoxTable SET ? where userid = ?', [BoxTable2,userid], function (err, data, fields) {
          if (err) {
            res.send({
              success: 0,
              message: 'there are some error with query'
            })
          }
          else {
            res.send({
              success: 1,
              message: "Successfully updated",
            })
          }
        })
      } else {
        connection.query('INSERT INTO BoxTable SET ?', BoxTable1, function (err, data, fields) {
          if (err) {
            res.send({
              success: 0,
              message: 'there are some error with query'
            })
          }
          else {
            res.send({
              success: 1,
              message: "Successfully saved",
            })
          }
        })
      }
    }



  })
}




