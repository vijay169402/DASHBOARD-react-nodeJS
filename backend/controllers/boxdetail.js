var express = require("express")
var connection = require('../config');

module.exports.boxdetail = function(req,res){
       
    var userid = req.body.userid;
    // console.log("req",req)
     
    connection.query("SELECT  box1posid,box2posid,box3posid  FROM BoxTable WHERE userid = ? ", userid, function (err,data) {

        
        if (err) {
            res.json({
                success:0,
              message: 'there are some error with query'})
          }
          else{
                   res.send({
                       success:1,
                       data:data
                   })
          }

    })
     


}
