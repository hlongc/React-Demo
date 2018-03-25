const express = require('express')
const utils = require('utility')

const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')
const _filter = { 'pwd': 0, '__v': 0 }

Router.get('/list', (req, res) => {
  const { type } = req.query
  User.find({type}, _filter, (err, doc) => {
    return res.json({code: 0, data: doc})
  })
})

Router.get('/delete', (req, res) => {
  User.remove({}, (err, doc) => {
    if (doc) {
      res.send(`<h2>全部删除</h2>`)
    }
  })
})

Router.post('/update', (req, res) => {
  const { userid } = req.cookies
  if (!userid) {
    return res.dumps({code: 1})
  }
  const body = req.body
  User.findByIdAndUpdate(userid, body, (err, doc) => {
    const data = Object.assign({}, {
      user: doc.user,
      type: doc.type
    }, body)
    return res.json({code: 0, data})
  })
})

Router.post('/login', (req, res) => {
  const { user, pwd } = req.body
  User.findOne({user, pwd: md5Pwd(pwd)}, _filter, (err, doc) => {
    if (!doc) {
      return res.json({code: 1, msg: '账号或者密码错误'})
    }
    res.cookie('userid', doc._id)
    return res.json({code: 0, data: doc})
  })
})

Router.post('/register', (req, res) => {
  const { user, pwd, type } = req.body
  User.findOne({user}, (err, doc) => {
    if (doc) {
      return res.json({code: 1, msg: '用户名已经存在'})
    }
    const userModel = new User({user, type, pwd: md5Pwd(pwd)})
    userModel.save((err, doc) => {
      if (err) {
        return res.json({code: 1, msg: 'server error'})
      }
      const {user, type, _id} = doc
      res.cookie('userid', _id)
      return res.json({code: 0, data: {user, type, _id}})
    })
  })
})

Router.get('/info', (req, res) => {
  const { userid } = req.cookies
  if (!userid) {
    return res.json({code: 1})    
  }
  User.findOne({'_id': userid}, _filter, (err, doc) => {
    if (err) {
      res.json({code:1, msg: 'server error'})
    }
    if (doc) {
      res.json({code: 0, data: doc})
    }
  })
})

function md5Pwd(pwd){
	const salt = 'henghenghahei!@#'
	return utils.md5(utils.md5(pwd+salt))
}

module.exports = Router