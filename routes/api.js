/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
var MongoClient = require('mongodb');
var https = require('https')
var reque = require('request')
var StockHandler = require('../controllers/StockHandler.js')
//`https://repeated-alpaca.glitch.me/v1/stock/${str}/quote`
var stockHandler = new StockHandler()

//ASYNC FUNCTION WHICH RETURNS DATA

  




//TESTING DB 
const DBKEY = process.env.DB; 
MongoClient.connect(DBKEY, function(err, db) {
  if(db) console.log('Sucessfully connected!')
// db.collection('data').remove({}, (err, data) => console.log(data))
// db.collection('data').find({}).toArray((err,data) => console.log(data))
});


//FUNCTION WHICH RETURN LIKES AND SHIT



//MODULE EXPORT
module.exports = function (app) {

  //ROUTING 
  app.route('/api/stock-prices')
    .get(function (req, res){
      console.log("START!")
      
      //DECLARE THE VARIABLES 
      var like = req.query.like || false
      var stock = req.query.stock
      var ip = req.headers['x-forwarded-for'].split(",")[0]
      var stockData = null
      var likeData = null 
      var multi = false
      
      
      if(typeof(stock) == 'object') {
        multi = !multi
        likeData = []
        stockData = []
      }
      
      function test (to_do, values){
      if( to_do == 'data'){
        multi ? stockData.push(values) : stockData = values
      } else{
        multi ? likeData.push(values) : likeData = values
        }
        
      if(!multi && stockData && likeData !== null){
        stockData.likes = likeData.likes
        res.json({stockData})
      }
        
        else if(multi && stockData.length == 2 && likeData.length == 2 ){
                       console.log(likeData)

          if(stockData[0].stock == likeData[0].stock){
              stockData[0].rel_likes = likeData[0].likes - likeData[1].likes
              stockData[1].rel_likes = likeData[1].likes - likeData[0].likes
          } else {
            stockData[0].rel_likes = likeData[1].likes - likeData[0].likes
            stockData[1].rel_likes = likeData[0].likes - likeData[1].likes
          }
                        res.json({stockData})
        }
      }
    
    
     if (multi){
      stockHandler.getData(stock[0], test)
      stockHandler.getData(stock[1], test)
      stockHandler.loadLikes(stock[0], ip, like, test)
      stockHandler.loadLikes(stock[1], ip, like, test)   
       } 
        
      else {
       stockHandler.getData(stock, test)
       stockHandler.loadLikes(stock, ip, like, test) 
      
        
      }
    
    
  })
};

