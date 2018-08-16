//DB login
//image storage location
//create database in production mongo, use stronger username and password


const express = require('express');
const router = express.Router();
const multer = require('multer');
const MongoClient = require('mongodb').MongoClient;//db API
const url = "mongodb://photo:photo-Storage@localhost:27017/photoStorage";//db connection string

//tokenizing
const jwt = require('jsonwebtoken');

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
    sharp('./temp-photos/' + JSON.parse(req.body.formInputData).imageName).resize(200).toFile('./temp-photos/icons/mini-' + JSON.parse
    (req.body.formInputData).imageName).catch(error => {console.log("mini shrink error"); return res.sendStatus(500);})
    .then(()=>{
              MongoClient.connect(url)
              .then( client =>{
                  const db = client.db('photoStorage');
                  db.collection('photos').insertOne(JSON.parse(req.body.formInputData))
                  .then(result =>{  
                            client.close(); return res.send(req.body.formInputData.imageName + " photo info added to database");})
                  .catch(error =>{
                            client.close(); console.log("collection connect error"); return res.sendStatus(500);});
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
let regexSearch = new RegExp(/\.*${req.query.searchText}\.*/,'gim');
  MongoClient.connect(url)
  .then(client =>{
    const db = client.db('photoStorage');
    db.collection('photos').find({ $text: { $search: regexSearch }}).sort({timeStamp: -1}).limit(30).toArray()
      .then(result => {client.close();return res.send(result)})
      .catch(error => {client.close(); console.log(error); return res.sendStatus(500);});
  })
  .catch(error => {console.log(error);return res.sendStatus(500);});
});

module.exports = router;