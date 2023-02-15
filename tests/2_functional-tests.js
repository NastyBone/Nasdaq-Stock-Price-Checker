/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       (if additional are added, keep them at the very end!)
*/

var chaiHttp = require('chai-http');
var chai = require('chai');
var assert = chai.assert;
var server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
    
    suite('GET /api/stock-prices => stockData object', function() {
      
      test('1 stock', function(done) {
       chai.request(server)
        .get('/api/stock-prices')
        .query({stock: 'ggg'})
        .end(function(err, res){
          
         assert.equal(res.status, 200)
         assert.equal(res.body.stockData.symbol, 'ggg')
         assert.equal(res.body.stockData.price, 51.95 )
         assert.equal(res.body.stockData.likes, 0) 
         
          done();
        });
      });
      
      test('1 stock with like', function(done) {
        chai.request(server)
        .get('/api/stock-prices')
        .query({stock: 'goog', like: true})
        .end(function(err, res){
          
         assert.equal(res.status, 200)
         assert.equal(res.body.stockData.symbol, 'GOOG')
         assert.equal(res.body.stockData.price, 1349.59 )
         assert.equal(res.body.stockData.likes, 1) 
         
          done();
        });
      });
      
      test('1 stock with like again (ensure likes arent double counted)', function(done) {
        chai.request(server)
        .get('/api/stock-prices')
        .query({stock: 'goog', like : true})
        .end(function(err, res){
          
         assert.equal(res.status, 200)
         assert.equal(res.body.stockData.symbol, 'GOOG')
         assert.equal(res.body.stockData.price, 1349.59 )
         assert.equal(res.body.stockData.likes, 1) 
         
          done();
        });
      });
      
      test('2 stocks', function(done) {
        chai.request(server)
        .get('/api/stock-prices')
        .query({stock: ['goog', 'ggg']})
        .end(function(err, res){
          
         assert.equal(res.status, 200)
         assert.equal(res.body.stockData[0].symbol, 'GGG')
         assert.equal(res.body.stockData[0].price, 51.95 )
         assert.equal(res.body.stockData[0].likes, -1)
         assert.equal(res.body.stockData[1].symbol, 'GOOG')
         assert.equal(res.body.stockData[1].price, 1349.59 )
         assert.equal(res.body.stockData[1].likes, 1) 
         
          done();
      });
      
        });
      test('2 stocks with like', function(done) {
         chai.request(server)
        .get('/api/stock-prices')
        .query({stock: ['goog', 'msft'], like: true})
        .end(function(err, res){
          
         assert.equal(res.status, 200)
         assert.equal(res.body.stockData[0].symbol, 'MSFT')
         assert.equal(res.body.stockData[0].price, 157.41 )
         assert.equal(res.body.stockData[0].likes, 0)
         assert.equal(res.body.stockData[1].symbol, 'GOOG')
         assert.equal(res.body.stockData[1].price, 1349.59 )
         assert.equal(res.body.stockData[1].likes, 0) 
         
          done();
      });
      
    });

});
