<template>
  <div id="find">
    <my-header>
            <template #header-left>
                <my-drawer/>
            </template>
            <template #header-main>
                <div class="header-search header-ele1">
                    <i class="el-icon-search"></i>
                    <input type="text" v-model="input" placeholder="推荐：xxx">
                </div>
            </template>
            <template #header-right>
              <div class="header-ele1">
                <i class="el-icon-headset"></i>
              </div>
            </template>
        </my-header>
    <div class="my-content">
      <el-carousel>
        <el-carousel-item v-for="(caro, index) in myCarousel" :key="'caro'+index">
          <img :src="caro.imageUrl" :alt="caro.typeTitle">
        </el-carousel-item>
      </el-carousel>
      <div class="nav-wrapper">
        <ul class="nav-list">
          <li v-for="nav in myNav" :key="'nav'+nav.id">
            <router-link :to="nav.router">
              <div class="li-pic">
                <i :class="'el-icon-'+nav.iconName"></i>
              </div>
              <span class="vice-text">{{nav.name}}</span>
            </router-link>
          </li>
        </ul>
        <div class="nav-item">
          <div class="item-head">
            <span class="item-title">精品歌单</span>
            <div class="righton">更多></div>
          </div>
          <ul class="item-wrapper">
            <li v-for="album in myAlbum0" :key="'album'+album.id">
              <router-link :to="{name: 'Album', params: {aid: album.id}}">
                <img :src="album.coverImgUrl" alt="">
                <div class="album-title">{{album.name}}</div>
                <div class="play-amount">
                  <i class="el-icon-video-play"></i>
                  <span>{{album.playCount | convertAmount}}</span>
                </div>
              </router-link>
            </li>
          </ul>
        </div>
        <div class="nav-item">
          <div class="item-head">
            <span class="item-title">推荐歌单</span>
            <div class="righton">更多></div>
          </div>
          <ul class="item-wrapper">
            <li v-for="album in myAlbum1" :key="'album'+album.id">
              <router-link :to="{name: 'Album', params: {aid: album.id}}">
                <img :src="album.picUrl" :alt="album.name">
                <div class="album-title">{{album.name}}</div>
                <div class="play-amount">
                  <i class="el-icon-video-play"></i>
                  <span>{{album.playCount | convertAmount}}</span>
                </div>
              </router-link>
            </li>
          </ul>
        </div>
<!--        <div class="nav-item">-->
<!--          <div class="item-head">-->
<!--            <span class="item-title">专属场景歌单</span>-->
<!--            <div class="righton">更多></div>-->
<!--          </div>-->
<!--          <ul class="item-wrapper">-->
<!--            <li v-for="album in myAlbum" :key="album.id+'info2'">-->
<!--              <img :src="album.src" :alt="album.title">-->
<!--              <div class="album-title">{{album.title}}</div>-->
<!--              <div class="play-amount">-->
<!--                <i class="el-icon-video-play"></i>-->
<!--                <span>{{album.amount | convertAmount}}</span>-->
<!--              </div>-->
<!--            </li>-->
<!--          </ul>-->
<!--        </div>-->
      </div>
    </div>
  </div>
</template>

<script>
import MyHeader from '../common/MyHeader'
import MyDrawer from '../common/MyDrawer'
export default {
  name: 'Find',
  components: {MyHeader, MyDrawer},
  data () {
    return {
      input: '',
      myCarousel: '',
      myNav: [
        {id: 0, name: '每日推荐', iconName: 's-platform', router: {name: 'Find'}},
        {id: 1, name: '私人FM', iconName: 'finished', router: {name: 'Find'}},
        {id: 2, name: '歌手', iconName: 's-grid', router: {name: 'Singers'}},
        {id: 3, name: '排行榜', iconName: 's-data', router: {name: 'Find'}},
        {id: 4, name: '数字专辑', iconName: 'pie-chart', router: {name: 'Find'}},
        {id: 5, name: '专注冥想', iconName: 'user-solid', router: {name: 'Find'}},
        {id: 6, name: '歌房', iconName: 'house', router: {name: 'Find'}},
        {id: 7, name: '游戏专区', iconName: 'coordinate', router: {name: 'Find'}}
      ],
      myAlbum0: null,
      myAlbum1: null
    }
  },
  created () {
    this.$axios.get('/top/playlist/highquality')
      .then(res => {
        this.myAlbum0 = res.data.playlists.slice(0, 10)
      })
      .catch(err => {
        console.log('推荐歌单获取失败', err)
      })
    this.$axios.get('/banner')
      .then(res => {
        this.myCarousel = res.data.banners
      })
      .catch(err => {
        console.log('轮播图获取失败', err)
      })
    this.$axios.get('/personalized?limit=10')
      .then(res => {
        this.myAlbum1 = res.data.result.slice(0, 10)
      })
  },
  updated () {
    // (function () {
    //   const btns = document.getElementsByClassName('el-carousel__button')
    //   document.querySelector('.el-carousel__container').style.height = '600px'
    //   for (let i = 0; i < 8; i++) {
    //     btns[i].style.width = (0.3 * window.innerWidth / btns.length) + 'px'
    //   }
    // })()
  }
}
</script>

<style scoped lang="scss" src="../../assets/css/find.scss">
</style>
<style>
  .el-carousel__container{
    /*height: 300px;*/
  }
  .el-carousel__button{
    width: 15px;
  }
</style>
