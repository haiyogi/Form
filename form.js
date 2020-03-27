var express = require('express');
var BodyParser = require('body-parser');
var mysql = require('mysql');

var app = express();

//app.set('view engine', 'pug');


var UrlencodedParser = BodyParser.urlencoded({extended:false});

var conn = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"yogesh",
    database:"form"
})


app.get('/', function (req, res) {
    res.sendFile('index.html', { root: __dirname })
});

app.get('/form', (req,res)=>{
    conn.query('select* from user',(err,rows,feilds)=>{
      if(!err)
      res.send(rows);
      else
        console.log(err);
    })
  });


app.post('/index', UrlencodedParser, (req, res) => {
   let name=req.body.name;
   let email=req.body.email;
   let password=req.body.password;
  // console.log(req.body);
   //console.log(req.body.name);
   //console.log(req.body.email);
   //console.log(req.body.password);
   conn.connect(function(err){
       if(err) throw err;
       console.log('Connection Successful!');
       var sql="INSERT INTO user(name,email,password) VALUES(null,'"+name+"','"+email+"','"+password+"')";
       conn.query(sql,(err,result)=>{
         if(err) throw err;
         console.log("record inserted Successfully!!");
       });
   });
   //res.render('index',{message:'data saved successfully'});
res.sendFile('link.html',{ root: __dirname },{data:req.body});
});

app.listen(2500,()=>{console.log("database working on port 2500!!")});