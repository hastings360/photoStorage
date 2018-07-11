const express = require('express');
const router = express.Router();
const multer = require('multer');
const MongoClient = require('mongodb').MongoClient;//db API
const url = "mongodb://localhost:27017";//db connection string
const fs = require('fs');
const rxjs = require('rxjs');

//tokenizing
const jwt = require('jsonwebtoken');
//const cert = fs.readFileSync(__dirname + '/../test-secret/jsonWebCert','utf8');
//const publicCert = fs.readFileSync(__dirname + '/../test-secret/jsonWebCert.pub','utf8');

//login model
const Login = require('../models/login');

//renames incoming file submitted
const storage = multer.diskStorage({
  destination: './temp-photos',
  filename: function(req, file, cb){
    cb(null, JSON.parse(req.body.formInputData).imageName);
  }
})
const upload = multer({ storage: storage});
const sharp = require('sharp');

//const nodemailer = require('nodemailer');//mail API
//const ObjectId = require('mongodb').ObjectId;
//let data;//db API

/*root API
router.get('/', (req, res) => {
  res.send('photoStorage api works');
});*/

//Adds mini-photo to photo objects outgoing--Not needed?????
/*function addMinis(x){
  try{
    for(let y in x){
      x[y].image = fs.readFileSync("./temp-photos/temp-icons/mini-" + x[y].imageName).toString('base64'); //Need Base64?????????
    }
  }catch(err){
    console.log("Error adding photos for" + x[y].imageName);
    return res.sendStatus(500);
  }
  return x;
}*/

//client browser token verification
router.post('/token-verify', (req, res) => { 
  try{
        let x = jwt.decode(req.body.token,'aodkdkDDajIldieja9321', error => res.send('no'));
        let returnObject = {};
        let timeLeft = Date.now() - (x.exp*1000);

        if(timeLeft <= 0){
          returnObject.answer = "yes";
          returnObject.timeLeft = timeLeft;
          res.send(returnObject);
        }else{
          returnObject.answer = "no";
          res.send(returnObject);
        }
  }catch(err){
    res.send('no');
  }
  //Need to look into this more, verify should work
  /*jwt.verify(req.body.token, 'aodkdkDDajIldieja9321', (decoded, err)=>{
    if(err){
      res.send('no');
    }else{
      res.send('yes');
    }
  });*/
});

//login credentials verfiication
router.post('/login-submit', (req, res) => { 
    let login = new Login(req.body);
    let currentDate = Date.now();
    MongoClient.connect(url)
    .then(client =>{
      const db = client.db('photoStorage');
      db.collection('photoUsers').find( {userName: login.userName,password: login.password}).toArray()
        .then(results => {
          if(results.length === 1){
            client.close();            
            let token = jwt.sign({auth: 'granted'}, 'aodkdkDDajIldieja9321',{expiresIn: '5m'});
            return res.send(token);
          }else{
            client.close();
            console.log("Username and/or password not found");
            return res.send("Username and/or password not found");
          }
        })
        .catch(error => {console.log(error);client.close();res.sendStatus(500);});
    })
    .catch(error => {console.log(error);res.sendStatus(500);});
});

//add photo to database, create med and mini versions
router.post('/submit-pic', upload.single('image'), (req, res) =>{
    let timeStamp = Date.now();
    //saves file as compressed med version - Can be ran asynchrously, return value not related
    sharp('./temp-photos/' + JSON.parse(req.body.formInputData).imageName).resize(600).toFile('./temp-photos/previews/med-' + JSON.parse
    (req.body.formInputData).imageName).catch(error => {console.log("med shrink error"); return res.sendStatus(500);});
    //saves file as compressed mini version
    sharp('./temp-photos/' + JSON.parse(req.body.formInputData).imageName).resize(200).toFile('./temp-photos/temp-icons/mini-' + JSON.parse
    (req.body.formInputData).imageName).catch(error => {console.log("mini shrink error"); return res.sendStatus(500);})
    .then(()=>{
              MongoClient.connect(url)
              .then( client =>{
                  const db = client.db('photoStorage');
                  db.collection('photos').insertOne(JSON.parse(req.body.formInputData))
                  .then(result =>{  
                            client.close(); return res.send(req.body.formInputData.imageName + " photo info added to database");})
                  .catch(error =>{
                            client.close(); console.log("coollection connect error"); return res.sendStatus(500);});
              })
              .catch(error => {
                  console.log("mongo connect error");return res.sendStatus(500);
              });   
    });
});

//latest photos API - pulls 30 latest photos
router.get('/latest-photos', (req, res) =>{
  MongoClient.connect(url)
  .then(client =>{
    const db = client.db('photoStorage');
    db.collection('photos').find({}).sort({timeStamp: -1}).limit(30).toArray()
      .then(result => {client.close(); return res.send(result)})
      .catch(error => {client.close(); console.log(error); return res.sendStatus(500);});
  })
  .catch(error => {console.log(error);return res.sendStatus(500);});
});

//search photos API - search for specific photo - limit of 30
router.get('/photo-search30', (req, res) =>{ 
  let regexSearch = "/.*" + req.query.searchText + ".*/";
  MongoClient.connect(url)
  .then(client =>{
    const db = client.db('photoStorage');
    db.collection('photos').find({ $text: { $search: regexSearch }}).sort({timeStamp: -1}).limit(30).toArray()
      .then(result => {client.close();return res.send(result)})
      .catch(error => {client.close(); console.log(error); return res.sendStatus(500);});
  })
  .catch(error => {console.log(error);return res.sendStatus(500);});
});
/*
//mail API
router.post('/recipe-mail', upload.single('image'),(req, res) =>{
  res.send('recipe-mail api works');
  console.log('recipe-mail accessed');
  
  let mailData = JSON.parse(req.body.data);//form data: transforms JSON string back to object
  let imageFile = req.file;//attachment file
  
  SendMyMail(mailData,imageFile);
});
              //reusable transporter object for mail
              const transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                  user: 'hastingsserve@gmail.com',
                  pass: '577061Ha!'
                }
              });
              //send mail using the object passed in
              function SendMyMail(data,file){
                //iterates through contents and assigns string value to contents variable
                let contents;
                for(let y in data){
                  contents += ("<p>" + data[y] + "</p>");
                };
                //email data
                let mailOptions;  //code sets value according to attachment being present or not
                if(file == undefined){
                  mailOptions = {
                    to: 'hastings360@gmail.com', 
                    html: "<h1>Lulu's Recipe Message</h1>" + contents
                    };
                  }else{
                    mailOptions = {
                      to: 'hastings360@gmail.com', 
                      html: "<h1>Lulu's Recipe Message</h1>" + contents,
                      attachments: [{filename: file.originalname,path: file.path}]
                    };
                  }
                //sends
                transporter.sendMail(mailOptions,(error,info) =>{
                  if(error){
                    return console.log(error);
                  }else{
                    console.log('Email Sent');
                  }
                });
              }
*/     
module.exports = router;