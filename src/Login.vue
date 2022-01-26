<template>
    <div id="login">
      <div class="my-header"></div>
      <div class="my-content">
        <span>用户名：</span>
        <el-input v-model="username" placeholder="请输入手机号"></el-input>
        <span>密码：</span>
        <el-input v-model="password" placeholder="请输入密码" show-password></el-input>
        <el-button type="primary" @click="mrLogin">登录</el-button>
        <el-button type="success" @click="addUser">注册</el-button>
        <div @click="userInfo" style="width: 100px;height: 100px;background-color: white"></div>
        <div @click="mrLogout" style="width: 100px;height: 100px;background-color: black"></div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    userInfo () {
      console.log(this.$store.state.user != null)
    },
    addUser () {
      const name = this.username
      const pwd = this.password
      this.$axios.post('/api/user/register', {
        username: name,
        password: pwd
      }).then((response) => {
        this.$store.commit('GET_USER', response.data)
      })
    },
    mrLogin () {
      const name = this.username
      const pwd = this.password
      this.$axios.post('/api/user/login', {
        username: name,
        password: pwd
      }).then((res) => {
        console.log(res.data.msg)
        if (res.status === 200) {
          this.$store.commit('GET_USER', res.data)
        }
      })
    },
    mrLogout () {
      this.$store.commit('LOGOUT')
    }
  }
}
</script>

<style scoped>

</style>
