var sqlMap = {
  user: {
    add: 'insert into nec_user(username, password, avatar) values (?, ?, "static/pictures/ava_logo.png")',
    check: 'select username from nec_user where binary username = ?',
    login: 'select username, password, avatar from nec_user where binary username = ?'
  },
  carousel: {
    top: 'select id, title, url from carousel'
  },
  album: {
    top: 'select id, title, src, amount from album'
  }
}

module.exports = sqlMap
