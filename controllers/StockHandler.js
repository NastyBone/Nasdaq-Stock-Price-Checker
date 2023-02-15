
const MongoClient = require('mongodb')
const request = require('request')
const DBKEY = process.env.DB; 

function StockHandler () {
  
  this.getData = function (str, callback) {
  
var data
    
    request(`https://repeated-alpaca.glitch.me/v1/stock/${str}/quote`, (err, res, body) =>{
//      console.log(body, 'test')
      if (err || res.statusCode !== 200) {
      data = err
      } else {
      data = JSON.parse(body)
        callback('data',{symbol: data.symbol, price: data.latestPrice})
      }
    })
  } 





this.loadLikes = function (stock, ip, like, callback ){
  if(like){
    MongoClient.connect(DBKEY, (err, db) =>{ db.collection('data')
    .findAndModify({stock: stock}, [], {$addToSet: {ips: ip}, $setOnInsert: {stock:stock}}, {upsert: true, new: true}, (err, data)=>{
      
      callback ('like', {stock: data.value.stock , likes: data.value.ips.length} )     
      
    })})
    
  } else {
  
    MongoClient.connect(DBKEY, (err, db) => {db.collection('data')
    .findAndModify({stock: stock}, [], {$setOnInsert: {ips: [], stock:stock}}, {upsert: true, new: true}, (err,data) =>{
    console.log(data, data.value.ips.length)
 callback ('like', {stock: data.value.stock , likes: data.value.ips.length})    
    })})
    
    
  } 
  
}
}




module.exports = StockHandler