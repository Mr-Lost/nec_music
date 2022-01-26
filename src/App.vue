<template>
  <div id="app">
    <my-drawer/>
    <router-view/>
    <my-footer/>
  </div>
</template>

<script>
import MyDrawer from './MyDrawer'
import MyFooter from './MyFooter'
export default {
  name: 'App',
  components: {
    MyDrawer: MyDrawer,
    MyFooter: MyFooter
  },
  data () {
    return {
      isActive: this.$store.state.user
    }
  },
  methods: {
    userState () {
      this.isActive = this.$store.state.user
    }
  },
  watch: {
    isActive: this.userState
  }
}
</script>
