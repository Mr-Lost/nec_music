<template>
    <div id="album">
        <div class="my-header">
            <div class="title-wrap">
                <i class="el-icon-arrow-left" @click="goBack"></i>
                <div class="head-title my-3dots">歌单</div>
            </div>
            <div class="title-tool">
                <i class="el-icon-search"></i>
                <i class="el-icon-more"></i>
            </div>
        </div>
        <div class="my-content">
            <div class="album-info">
                <div class="album-img">
                    <img src="../assets/logo.png" alt="">
                    <div class="play-amount">
                        <i class="el-icon-video-play"></i>
                        <span>22万</span>
                    </div>
                </div>
                <div class="album-desc">
                    <span class="album-title">2021全网最火流行歌曲一键收听(更新快)</span>
                    <div class="album-author">
                        <img src="../assets/logo.png" alt="">
                        <span class="author">僵尸KING</span>
                        <div class="add">+</div>
                    </div>
                    <div class="album-text">
                        <span class="span1 my-3dots">无论季节轮回多少次 我澎湃的爱意永远永远永远永远</span>
                        <span>></span>
                    </div>
                </div>
            </div>
            <ul class="album-tool">
                <li><i class="el-icon-circle-plus-outline"></i>1097</li>
                <li><i class="el-icon-chat-line-round"></i>9</li>
                <li><i class="el-icon-share"></i>10</li>
            </ul>
            <div class="album-list">
                <div class="list-head">
                    <div class="head-left">
                        <i class="el-icon-caret-right"></i>
                        <span>播放全部</span>
                        <span class="list-total">({{ songList.length }})</span>
                    </div>
                    <div class="head-right">
                        <i class="el-icon-download"></i>
                        <i class="el-icon-finished"></i>
                    </div>
                </div>
                <div class="list-item" v-for="(song, index) in songList" :key="index">
                    <div class="item-content">
                        <div class="item-num">{{ index+1 }}</div>
                        <div class="item-desc">
                            <span class="item-title">{{ song.title }}</span><br>
                            <div class="item-info">
                                <span class="item-author my-3dots">
                                    <span class="quality" v-if="song.highQuality">SQ</span>
                                    {{ song.author.join('/') + ' - ' + song.album }}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="item-tool">
                        <i class="el-icon-video-play" v-if="song.MV"></i>
                        <i class="el-icon-more"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'album',
  data () {
    return {
      songList: [
        { songId: 0, title: 'Someone Like You', author: ['Adele'], album: 'Promo Only Rhythm Radio October 2011', highQuality: true, MV: true },
        { songId: 3, title: 'Willow', author: ['Taylor Swift'], album: 'evermore(deluxe version)', highQuality: true, MV: true },
        { songId: 18, title: '只要平凡', author: ['张杰', '张碧晨'], album: '我不是药神', highQuality: true, MV: false },
        { songId: 20, title: 'idontwannabeyouanymore', author: ['Billie Eilish'], album: 'dont smile at me', highQuality: false, MV: false },
        { songId: 33, title: 'Five Hundred Miles', author: ['Justin Timberlake', 'Carey Mulligan', 'Stark Sands'], album: 'Inside some Llewyn Davis', highQuality: false, MV: true },
        { songId: 33, title: 'Five Hundred Miles', author: ['Justin Timberlake', 'Carey Mulligan', 'Stark Sands'], album: 'Inside Llewyn Davis', highQuality: true, MV: true },
        { songId: 33, title: 'Five Hundred Miles', author: ['Justin Timberlake', 'Carey Mulligan', 'Stark Sands'], album: 'Inside hello world Llewyn Davis', highQuality: false, MV: true },
        { songId: 33, title: 'Five Hundred Miles', author: ['Justin Timberlake', 'Carey Mulligan', 'Stark Sands'], album: 'Inside llewyn good Davis', highQuality: false, MV: true },
        { songId: 33, title: 'Five Hundred Miles', author: ['Justin Timberlake', 'Carey Mulligan', 'Stark Sands'], album: 'Inside Little Llewyn Davis', highQuality: false, MV: true }
      ]
    }
  },
  methods: {
    currentTitle () {
      let title = document.getElementsByClassName('head-title')[0]
      let album = document.getElementsByClassName('album-title')[0].innerText
      if (scrollY < 180) {
        title.innerText = '歌单'
        let val = (180 - scrollY) / 180
        title.style.opacity = val.toFixed(1)
      } else {
        title.innerText = album
        title.style.opacity = 1
      }
    },
    goBack () {
      this.$router.go(-1)
    }
  },
  mounted () {
    window.addEventListener('scroll', this.currentTitle)
  },
  destroyed () {
    window.removeEventListener('scroll', this.currentTitle)
  }
}
</script>

<style lang="scss" scoped src="../assets/css/album.scss">
</style>
