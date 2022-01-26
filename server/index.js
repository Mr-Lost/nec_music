// 后端服务器
const apiCtrl = require('./api/apiControl')
const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const Router = express.Router()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
  res.header('X-Powered-By', '3.2.1')
  res.header('Content-Type', 'application/json;charset=utf-8')
  next()
})

// 后端api路由
app.use('/api', apiCtrl)
app.use('/test', Router)

Router.get('/tt', function (req, res) {
  return res.json({
    code: 0,
    data: 'hello, test succeed.'
  })
})

// 监听端口
app.listen(3000)
console.log('success listen at port: 3000......')
