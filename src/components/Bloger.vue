<template>
  <div id="bloger">
    <my-drawer/>
    <div class="my-header">
      <ul class="head-list">
        <li @click="listChange">推荐</li>
        <li>分类</li>
        <li>
          <i class="el-icon-circle-plus"></i>
        </li>
      </ul>
    </div>
    <div class="my-content">
      <div class="main-wrapper">
        <div class="list1"></div>
        <div class="list2"></div>
      </div>
    </div>
  </div>
</template>

<script>
import MyDrawer from '../MyDrawer'
export default {
  name: 'Bloger',
  components: {MyDrawer},
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

<style scoped lang="scss" src="../assets/css/bloger.scss">
</style>
