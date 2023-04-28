<template>
  <div id="blogger">
    <my-header>
      <template #header-left>
        <my-drawer></my-drawer>
      </template>
      <template #header-main>
        <ul class="head-list header-ele1">
          <li @click="listChange">推荐</li>
          <li>分类</li>
        </ul>
      </template>
      <template #header-right>
        <div class="header-ele1">
          <i class="el-icon-circle-plus"></i>
        </div>
      </template>
    </my-header>
    <div class="my-content">
      <div class="main-wrapper">
        <div class="list1"></div>
        <div class="list2"></div>
      </div>
    </div>
  </div>
</template>

<script>
import MyDrawer from './common/MyDrawer'
import MyHeader from './common/MyHeader'
export default {
  name: 'Blogger',
  components: {MyDrawer, MyHeader},
  data () {
    return {
      have: 'good'
    }
  },
  methods: {
    listChange: function () {
      const temp = document.getElementsByClassName('list1')
      console.log(temp)
    }
  }
}
</script>

<style scoped lang="scss" src="../assets/css/blogger.scss">
</style>
