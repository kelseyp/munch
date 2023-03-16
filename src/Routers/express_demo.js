var sequelize = require('../db_util/dbConn.js').sequelize;
var State = require('../db_util/model_relations.js').State;
var Item = require('../db_util/model_relations.js').Item;



var express = require('express');
const { Sequelize } = require('sequelize');
var app = express();
const Op=Sequelize.Op
 
//  主页输出 "Hello World"
app.get('/', function (req, res) {
   console.log("主页 GET 请求");
   res.send('Hello GET');
})
 
 
//  POST 请求
app.post('/', function (req, res) {
   console.log("主页 POST 请求");
   res.send('Hello POST');
})
 
//  /del_user 页面响应
app.get('/del_user', async (req, res) => {
    console.log("/list_user GET 请求");
    let data = await State.findAll(
        {attributes:['name','short_name'],where:{id:101}}
        )  
    res.redirect('../test.html')
})
 

app.get('/search', async (req, res) => {
   console.log(req.query)
   var keyword = req.query.keyword
    let data = await Item.findAll({where:{description:{[Op.like]:'%'+keyword +'%'}}});
    res.send(data)
})
 
// 对页面 abcd, abxcd, ab123cd, 等响应 GET 请求
app.get('/ab*cd', function(req, res) {   
   console.log("/ab*cd GET 请求");
   res.send('正则匹配');
})
 
 
var server = app.listen(3000, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
})