<template>
    <div class="myfooter">
      <div class="palyer-info">
        <div class="player-song">
          <el-avatar :size="35" :src="curSong.avatar"></el-avatar>
          <marquee style="width: 150px" scrolldelay="100" scrollamount="3">
            <span style="font-size: 20px">{{curSong.title}}</span>
            <span style="font-size: 15px"> - {{curSong.author}}</span>
          </marquee>
        </div>
        <div class="player-tool">
          <i class="el-icon-video-play"></i>
          <i class="el-icon-tickets"></i>
        </div>
      </div>
      <div class="footer-list">
        <router-link :to="tab.router" class="footer-item" v-for="(tab, index) in tabs" :key="index">
            <div class="item-icon">
              <i :class="'el-icon-'+tab.iClass"></i>
            </div>
            <span class="item-text">{{ tab.text }}</span>
        </router-link>
      </div>
    </div>
</template>

<script>
import song1 from './assets/logo.png'
export default {
  name: 'MyFooter',
  data () {
    return {
      activeIndex: 0,
      curSong: {avatar: song1, title: 'Vue之歌', author: 'lmr(feat nobody else)'},
      tabs: [
        {iClass: 's-help', text: '发现', router: {name: 'Find'}},
        {iClass: 'camera', text: '播客', router: {name: 'Bloger'}},
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
