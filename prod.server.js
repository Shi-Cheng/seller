/**
 * Auth: PanShiCheng
 * Create Time: 2020-02-29
 * Description:
 */
var express = require('express')
var config = require('./config/index')

var port = process.env.PORT || config.build.port

var app = express()

const appData = require('./data.json')
const seller = appData.seller
const goods = appData.goods
const ratings = appData.ratings
const ERR_NO = 0

var apiRoutes = express.Router();

apiRoutes.get('/',function(req, res, next) {
  req.url = '/index.html'
  next()
})

app.get('/api/seller', (req, res) => {
  res.json({
    code: ERR_NO,
    data: seller
  })
})

app.get('/api/goods', (req, res) => {
  res.json({
    code: ERR_NO,
    data: goods
  })
})

app.get('/api/ratings', (req, res) => {
  res.json({
    code: ERR_NO,
    data: ratings
  })
})

app.use('/api', apiRoutes)
app.use(express.static('./dist'));

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err);
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
});
