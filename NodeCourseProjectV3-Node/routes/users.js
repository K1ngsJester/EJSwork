
var express = require('express');
var router = express.Router();

let serverLoggedInArray = []; // our "permanent storage" on the web server

// define a constructor to create movie objects
let PlayerObject = function (pPosition, pMoney, pName, pAddress) {
    this.PlayerPosition = pPosition;
    this.PlayerMoney = pMoney;
    this.PlayerName = pName;
    this.PlayerAddress = pAddress;
}

// for testing purposes, its nice to preload some data
serverLoggedInArray.push(new PlayerObject(0, 1000000000, "Bill Gates", "Unknown"));
serverLoggedInArray.push(new PlayerObject(1, 5000, "John Smith", "3000 landerholm cir se, Rm #629 Belleuve Wa 98007"));
serverLoggedInArray.push(new PlayerObject(2, 20000, "Jane Doe", "3000 landerholm cir se, Rm #629 Belleuve Wa 98007"));



/* POST to addPlayer */
router.post('/addPlayer', function(req, res) {
  console.log(req.body);
  serverLoggedInArray.push(req.body);
  console.log(serverLoggedInArray);
  //res.sendStatus(200);
  res.status(200).send(JSON.stringify('success'));
});



/* GET playerList. */
router.get('/playerList', function(req, res) {
  res.json(serverLoggedInArray);
 });

 /* DELETE to deleteName. */
 router.delete('/deletePlayer/:PlayerName', function(req, res) {
  let name = req.params.PlayerName;
  name = name.toLowerCase();  // allow user to be careless about capitalization
  console.log('deleting ID: ' + name);
     for (let i = 0; i < serverLoggedInArray.length; i++) {
         if (name == (serverLoggedInArray[i].PlayerName).toLowerCase()) {
             serverLoggedInArray.splice(i,1);
     }
   }
   res.status(200).send(JSON.stringify('deleted successfully'));
});


//  router.???('/userlist', function(req, res) {
//  users.update({name: 'foo'}, {name: 'bar'})



module.exports = router;

