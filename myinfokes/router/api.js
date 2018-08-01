/*
业务逻辑
 */
const url = require('url');
const fs = require('fs');
const path = require('path');
exports.showIndex = (req,res)=>{
  if(req.url == "/"||req.url=='/start.html'){
     res.render('start');
  }else if(req.url == '/demo.html'){
    res.render('demo');
  }else if(req.url == '/My_info.html'){
    res.render('My_info');
  }else if(req.url == '/skills.html'){
    res.render('skills');
  }else{
    var opation = url.parse(req.url).query;
    if(opation == "opation=0"){
      fs.readFile(path.join(__dirname,'../mydb/skills_op0.json'),(err,data)=>{
        res.send(data);
      });
    }
    if(opation == "opation=1"){
      fs.readFile(path.join(__dirname,'../mydb/skills_op1.json'),(err,data)=>{
        res.send(data);
      });
    }
    if(opation == "opation=2"){
      fs.readFile(path.join(__dirname,'../mydb/skills_op2.json'),(err,data)=>{
        res.send(data);
      });
    }
  }
}