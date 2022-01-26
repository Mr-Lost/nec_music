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

// 增加用户接口
router.post('/user/register', (req, res) => {
  const sql = $sql.user.check
  const params = req.body
  conn.query(sql, [params.username], function (err, result) {
    // 要有err处理不然会报错
    if (err) {
      console.log(err)
    }
    if (result.length) {
      res.json({msg: '该用户已被注册'})
    } else {
      const sql2 = $sql.user.add
      conn.query(sql2, [params.username, params.password], function (err, result) {
        if (err) {
          console.log(err)
        }
        jsonWrite(res, {user: result[0].username, ava: result[0].avatar, msg: '注册已成功'})
      })
    }
  })
})

router.post('/user/login', (req, res) => {
  const sql = $sql.user.login
  const params = req.body
  conn.query(sql, [params.username], function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result.length) {
      if (result[0].password === params.password) {
        jsonWrite(res, {user: result[0].username, ava: result[0].avatar, msg: '用户登录成功'})
      } else {
        res.json({msg: '密码错误'})
      }
    } else {
      res.json({msg: '用户名不存在'})
    }
  })
})

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

module.exports = router
