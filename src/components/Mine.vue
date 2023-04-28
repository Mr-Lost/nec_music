<template>
  <div id="mine">
    <my-header>
      <template #header-left>
        <my-drawer></my-drawer>
      </template>
      <template #header-main>
        <div class="header-ele1" v-if="userInfo!=null">
          <el-avatar class="me-title-ava" :src="userInfo.ava" :size=30></el-avatar>
          <span>{{userInfo.user}}</span>
        </div>
        <div class="header-ele1" v-else>
          <span>~未登录~</span>
        </div>
      </template>
      <template #header-right>
        <div class="header-ele1">
          <i class="el-icon-search"></i>
        </div>
      </template>
    </my-header>
    <div class="my-content">
      <div class="mine-item">
        <template v-if="userInfo!=null">
          <div class="user-wrapper">
            <el-avatar class="user-me-avatar" :src="userInfo.ava" :size=80></el-avatar>
            <div class="user-me-name">{{userInfo.user}}</div>
            <div class="user-me-info">
              <span>1234 关注</span>
              <span>555 粉丝</span>
              <span>Lv.10</span>
            </div>
          </div>
        </template>
        <template v-else>
          <span>用户名：</span>
          <el-input v-model="username" placeholder="请输入手机号"></el-input>
          <span>密码：</span>
          <el-input v-model="password" placeholder="请输入密码" show-password></el-input>
          <el-button type="primary" @click="mrLogin">登录</el-button>
          <el-button type="success" @click="addUser">注册</el-button>
        </template>
      </div>
      <div class="mine-item">
        <ul class="user-me-list">
          <li>
            <div class="me-li-pic">
              <i class="el-icon-video-play"></i>
            </div>
            <span>最近播放</span>
          </li>
          <li>
            <div class="me-li-pic">
              <i class="el-icon-s-claim"></i>
            </div>
            <span>本地/下载</span>
          </li>
          <li>
            <div class="me-li-pic">
              <i class="el-icon-upload"></i>
            </div>
            <span>云盘</span>
          </li>
          <li>
            <div class="me-li-pic">
              <i class="el-icon-video-play"></i>
            </div>
            <span>已购</span>
          </li>
          <li>
            <div class="me-li-pic">
              <i class="el-icon-s-help"></i>
            </div>
            <span>我的好友</span>
          </li>
          <li>
            <div class="me-li-pic">
              <i class="el-icon-star-on"></i>
            </div>
            <span>收藏和赞</span>
          </li>
          <li>
            <div class="me-li-pic">
              <i class="el-icon-video-camera-solid"></i>
            </div>
            <span>我的播客</span>
          </li>
          <li>
            <div class="me-li-pic">
              <i class="el-icon-s-home"></i>
            </div>
            <span>音乐罐子</span>
          </li>
        </ul>
        <div class="user-more-app">
          <i class="el-icon-plus vice-text"></i>
          <span class="vice-text">音乐应用</span>
        </div>
      </div>
      <div class="mine-item">
        <div class="user-fav">
          <div class="fav-wrapper">
            <img src="static/pictures/ava_logo.png" alt="">
            <i class="fa fa-heart"></i>
          </div>
          <div class="fav-info">
            <span>我喜欢的音乐</span>
            <span class="vice-text">155首</span>
          </div>
        </div>
        <div class="mine-heartbeat">
          <span><i class="fa fa-heartbeat"></i> 心动模式</span>
        </div>
      </div>
      <div class="mine-item"></div>
      <div class="mine-item"></div>
      <div class="mine-item">
        <div class="temp"></div>
      </div>
    </div>
  </div>
</template>

<script>
import MyHeader from './common/MyHeader'
import MyDrawer from './common/MyDrawer'
export default {
  name: 'Mine',
  components: {MyHeader, MyDrawer},
  data () {
    return {
      username: '',
      password: ''
    }
  },
  computed: {
    userInfo () { return this.$store.state.user }
  },
  methods: {
    // addUser () {
    //   const name = this.username
    //   const pwd = this.password
    //   this.$axios.post('/user/register', {
    //     username: name,
    //     password: pwd
    //   }).then((response) => {
    //     this.$store.commit('GET_USER', response.data)
    //   }).catch(err => { console.log('用户注册异常', err) })
    // },
    addUser () {
      const name = this.username
      const pwd = this.password
      this.$axios.post('/user/register', {
        username: name,
        password: pwd
      }).then((response) => {
        this.$store.commit('GET_USER', response.data)
      }).catch(err => { console.log('用户注册异常', err) })
    },
    mrLogin () {
      const name = this.username
      const pwd = this.password
      this.$axios.post('/user/login', {
        username: name,
        password: pwd
      }).then((res) => {
        console.log(res.data.msg)
        if (res.status === 200) {
          this.$store.commit('GET_USER', res.data)
        }
      })
    },
    fadeTitle () {
      if (this.userInfo) {
        let title = document.getElementsByClassName('header-main')[0]
        let user = document.getElementsByClassName('mine-item')[0]
        if (scrollY < 150) {
          let val = scrollY / 150
          let val2 = (150 - scrollY) / 150
          title.style.opacity = val.toFixed(1)
          user.style.opacity = val2.toFixed(1)
        }
      }
    }
  },
  mounted () {
    window.addEventListener('scroll', this.fadeTitle)
  },
  destroyed () {
    window.removeEventListener('scroll', this.fadeTitle)
  }
}
</script>

<style scoped src="../assets/css/mine.scss" lang="scss">
</style>
