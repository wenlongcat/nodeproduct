const express = require('express');
const path = require('path');
const template = require('art-template');
const bodyParser = require('body-parser');
const router = require('./router/router.js');
const app = express();
// 引入模板
app.set('views',path.join(__dirname,'views'));
app.set('view engine','art');
app.engine('art',require('express-art-template'));
// 处理请求参数，挂载参数处理中间件(post)
app.use(bodyParser.urlencoded({extended: false}));
// 处理json格式的参数
app.use(bodyParser.json());
// 建立静态资源服务
app.use('/static',express.static(path.join(__dirname,'/public')));
app.use('/www',express.static(path.join(__dirname,'/public/art_rouses')));
// 配置路由
app.use(router);
app.listen(80,()=>{
  console.log('running...');
});