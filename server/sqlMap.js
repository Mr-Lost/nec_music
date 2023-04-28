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
    top: 'select id, title, src, amount from album',
    detail: 'select s.title, s.author, s.album, s.avatar, s.video, s.hq from song_bank s where s.sid in (select song_id from alb_song_map where album_id = ?)'
  }
}

module.exports = sqlMap
