<template>
    <div class="my-footer">
      <div class="footer-list">
        <router-link :to="tab.router" class="footer-item" v-for="(tab, index) in tabs" :key="index">
            <div class="item-icon">
              <i :class="'el-icon-'+tab.iClass"></i>
            </div>
            <div class="item-text">{{ tab.text }}</div>
        </router-link>
      </div>
    </div>
</template>

<script>
export default {
  name: 'MyFooter',
  data () {
    return {
      tabs: [
        {iClass: 's-help', text: '发现', router: {name: 'Find'}},
        {iClass: 'camera', text: '播客', router: {name: 'Blogger'}},
        {iClass: 's-custom', text: '我的', router: {name: 'Mine'}},
        {iClass: 'trophy', text: '关注', router: {name: 'Follow'}},
        {iClass: 'place', text: '云村', router: {name: 'Cloud'}}
      ]
    }
  }
}
</script>

<style scoped lang="scss" src="@/assets/css/myFooter.scss">
</style>
