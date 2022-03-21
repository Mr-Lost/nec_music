<template>
  <div id="find">
    <my-drawer/>
    <div class="my-header">
      <div class="header-main">
        <el-input prefix-icon="el-icon-search" v-model="input" placeholder="推荐：xxx"></el-input>
      </div>
      <div class="header-right">
        <i class="el-icon-headset"></i>
      </div>
    </div>
    <div class="my-content">
      <el-carousel>
        <el-carousel-item v-for="caro in myCarousel" :key="'caro'+caro.id">
          <img :src="caro.url" :alt="caro.title">
        </el-carousel-item>
      </el-carousel>
      <div class="nav-wrapper">
        <ul class="nav-list">
          <li v-for="nav in myNav" :key="'nav'+nav.id">
            <div class="li-pic">
              <i :class="'el-icon-'+nav.iconName"></i>
            </div>
            <span>{{nav.name}}</span>
          </li>
        </ul>
        <div class="nav-item">
          <div class="item-head">
            <span class="item-title">推荐歌单</span>
            <div class="righton">更多></div>
          </div>
          <ul class="item-wrapper">
            <li v-for="album in myAlbum" :key="'album'+album.id">
              <router-link :to="{name: 'album'}">
                <img :src="album.src" :alt="album.title">
                <div class="album-title">{{album.title}}</div>
                <div class="play-amount">
                  <i class="el-icon-video-play"></i>
                  <span>{{album.amount | convertAmount}}</span>
                </div>
              </router-link>
            </li>
          </ul>
        </div>
        <div class="nav-item">
          <div class="item-head">
            <span class="item-title">用户的雷达歌单</span>
            <div class="righton">更多></div>
          </div>
          <ul class="item-wrapper">
            <li v-for="album in myAlbum" :key="album.id+'info1'">
              <img :src="album.src" :alt="album.title">
              <div class="album-title">{{album.title}}</div>
              <div class="play-amount">
                <i class="el-icon-video-play"></i>
                <span>{{album.amount | convertAmount}}</span>
              </div>
            </li>
          </ul>
        </div>
        <div class="nav-item">
          <div class="item-head">
            <span class="item-title">专属场景歌单</span>
            <div class="righton">更多></div>
          </div>
          <ul class="item-wrapper">
            <li v-for="album in myAlbum" :key="album.id+'info2'">
              <img :src="album.src" :alt="album.title">
              <div class="album-title">{{album.title}}</div>
              <div class="play-amount">
                <i class="el-icon-video-play"></i>
                <span>{{album.amount | convertAmount}}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MyDrawer from '../MyDrawer'
export default {
  name: 'Find',
  components: {MyDrawer},
  data () {
    return {
      input: '',
      myCarousel: '',
      myNav: [
        {id: 0, name: '每日推荐', iconName: 's-platform'},
        {id: 1, name: '私人FM', iconName: 'finished'},
        {id: 2, name: '歌单', iconName: 's-grid'},
        {id: 3, name: '排行榜', iconName: 's-data'},
        {id: 4, name: '数字专辑', iconName: 'pie-chart'},
        {id: 5, name: '专注冥想', iconName: 'user-solid'},
        {id: 6, name: '歌房', iconName: 'house'},
        {id: 7, name: '游戏专区', iconName: 'coordinate'}
      ],
      myAlbum: ''
    }
  },
  created () {
    this.$axios.get('/api/carousel')
      .then(res => {
        this.myCarousel = res.data
      })
      .catch(err => {
        console.log('导航栏获取数据失败', err)
      })
    this.$axios.get('/api/album')
      .then(res => {
        this.myAlbum = res.data
      })
      .catch(err => {
        console.log('歌单获取数据失败', err)
      })
  }
}
</script>

<style scoped lang="scss" src="../assets/css/find.scss">
</style>
