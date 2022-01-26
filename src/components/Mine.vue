<template>
  <div id="mine">
    <div class="my-header"></div>
    <div class="my-content">
      <router-link :to="route1">点一点</router-link>
    </div>
  </div>
</template>

<script>
import Login from '../Login'
export default {
  name: 'Mine',
  data () {
    return {
      route1: 'mine/login'
    }
  },
  components: { Login: Login }
}
</script>

<style scoped>

</style>
