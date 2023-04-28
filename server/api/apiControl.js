const models = require('../db')
const express = require('express')
// const fs = require('fs')
// const path = require('path')
const router = express.Router()
const mysql = require('mysql')
const $sql = require('../sqlMap')

// 连接数据库
const conn = mysql.createConnection(models.mysql)
conn.connect()

const jsonWrite = function (res, ret) {
  if (typeof ret === 'undefined') {
    res.json({
      code: '1',
      msg: '操作失败'
    })
  } else {
    res.json(ret)
  }
}

router.get('/carousel', (req, res) => {
  const sql = $sql.carousel.top
  conn.query(sql, [], function (err, result) {
    if (err) {
      console.log('carousel错误', err)
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})

router.get('/album', (req, res) => {
  const sql = $sql.album.top
  conn.query(sql, [], function (err, result) {
    if (err) {
      console.log('album错误', err)
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})

router.post('/album/detail', (req, res) => {
  const sql = $sql.album.detail
  const params = req.body
  conn.query(sql, [params.id], function (err, result) {
    if (err) {
      console.log('album详情错误', err)
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})

module.exports = router
