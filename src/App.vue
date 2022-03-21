<template>
  <div id="app">
    <router-view/>
    <my-footer/>
  </div>
</template>

<script>
import MyFooter from './MyFooter'
export default {
  name: 'App',
  components: {
    MyFooter: MyFooter
  },
  computed: {
    userInfo () { return this.$store.state.user }
  },
  mounted () {
    console.log('userInfo is: ', this.userInfo)
    window.addEventListener('unload', this.saveState)
  },
  methods: {
    saveState () {
      sessionStorage.setItem('state', JSON.stringify(this.$store.state))
    }
  }
}
</script>

<style src="./assets/css/main.scss" lang="scss">
</style>
