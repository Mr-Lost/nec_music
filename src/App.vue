<template>
  <div id="app">
    <router-view/>
    <my-footer/>
    <my-player/>
  </div>
</template>

<script>
import MyFooter from './components/common/MyFooter'
import MyPlayer from './components/common/MyPlayer'
export default {
  name: 'App',
  components: {MyFooter, MyPlayer},
  mounted () {
    window.addEventListener('unload', this.saveState)
  },
  methods: {
    saveState () {
      this.$store.state.masked = false
      sessionStorage.setItem('state', JSON.stringify(this.$store.state))
    }
  }
}
</script>

<style lang="scss" src="@/assets/css/main.scss"></style>
