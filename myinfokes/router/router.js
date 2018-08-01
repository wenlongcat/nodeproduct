/*
路由处理
 */
const express = require('express');
const router = express.Router();
const path = require('path');
const serveApi = require('./api.js');

// 渲染主页
router.get('/',serveApi.showIndex);
router.get('/start.html',serveApi.showIndex);
// demo页跳转
router.get('/demo.html',serveApi.showIndex);
// info页跳转
router.get('/My_info.html',serveApi.showIndex);
router.get('/skills.html',serveApi.showIndex);
// skills页面请求
module.exports = router; 