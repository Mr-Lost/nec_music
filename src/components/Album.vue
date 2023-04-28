<template>
    <div id="album">
        <my-header>
            <template #header-left>
                <div class="header-ele1">
                    <i class="el-icon-arrow-left" @click="goBack"></i>
                </div>
            </template>
            <template #header-main>
                <div class="header-ele1 head-title my-3dots">{{album}}</div>
            </template>
            <template #header-right>
                <div class="title-tool header-ele1">
                    <i class="el-icon-more"></i>
                </div>
            </template>
        </my-header>
        <div class="my-content">
            <div class="album-info">
                <div class="album-img">
                    <img :src="albumInfo.coverImg" alt="">
                    <div class="play-amount">
                        <i class="el-icon-video-play"></i>
                        <span>{{albumInfo.playCount | convertAmount}}</span>
                    </div>
                </div>
                <div class="album-desc">
                    <span class="album-title">{{albumInfo.name}}</span>
                    <div class="album-author">
                        <img :src="albumInfo.creatorAva" alt="">
                        <span class="author">{{albumInfo.creator}}</span>
                        <div class="add">+</div>
                    </div>
                    <div class="album-text">
                        <span class="span1 my-3dots">{{albumInfo.desc}}</span>
                        <span>></span>
                    </div>
                </div>
            </div>
            <ul class="album-tool">
                <li><i class="el-icon-circle-plus-outline"></i>{{albumInfo.subCount | convertAmount}}</li>
                <li><i class="el-icon-chat-line-round"></i>{{albumInfo.comCount | convertAmount}}</li>
                <li><i class="el-icon-share"></i>{{albumInfo.shareCount | convertAmount}}</li>
            </ul>
            <div class="album-list">
                <div class="list-head">
                    <div class="head-left" @click="playAll">
                        <i class="el-icon-caret-right"></i>
                        <span>播放全部</span>
                        <span class="list-total">({{songs.length}})</span>
                    </div>
                    <div class="head-right">
                        <i class="el-icon-download"></i>
                        <i class="el-icon-finished"></i>
                    </div>
                </div>
                <div class="list-item" v-for="(song, index) in songs" :key="index">
                    <div class="item-content" @click="playSong(index)">
                        <div class="item-num">{{ index+1 }}</div>
                        <div class="item-desc">
                            <span class="item-title my-3dots">{{ song.name }}</span>
                            <div class="item-info">
                                <span class="item-author my-3dots">
                                    <span class="quality" v-if="song.sq != null">SQ</span>
                                    {{ song.ar[0].name + ' - ' + song.al.name }}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="item-tool">
                        <i class="el-icon-video-play" v-if="song.mv > 0"></i>
                        <i class="el-icon-more"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import MyHeader from './common/MyHeader'
export default {
  name: 'Album',
  components: {MyHeader},
  data () {
    return {
      albumInfo: '',
      album: '',
      songs: ''
    }
  },
  methods: {
    currentTitle () {
      let title = document.getElementsByClassName('head-title')[0]
      let album = document.getElementsByClassName('album-title')[0].innerText
      let albumHeight = document.getElementsByClassName('album-info')[0].offsetHeight
      if (scrollY < albumHeight) {
        title.innerText = '歌单'
        let val = (albumHeight - scrollY) / albumHeight
        title.style.opacity = val.toFixed(1)
      } else {
        title.innerText = album
        title.style.opacity = 1
      }
    },
    goBack () {
      this.$router.go(-1)
    },
    playSong (index) {
      const song = this.songs[index]
      const data = {
        sid: song.id,
        singer: song.ar[0].name,
        sname: song.name,
        artist: song.al.name,
        pic: song.al.picUrl
      }
      this.$store.commit('PlAY_SONG', data)
    },
    playAll () {
      const sids = []
      for (let song of this.songs) {
        const data = {
          sid: song.id,
          singer: song.ar[0].name,
          sname: song.name,
          artist: song.al.name,
          pic: song.al.picUrl
        }
        sids.push(data)
      }
      this.$store.commit('ADD_ALL', sids)
    }
  },
  created () {
    const idd = this.$route.path.split('/').pop()
    this.$axios.get('/playlist/detail', {params: {id: idd}})
      .then(res => {
        this.songs = res.data.playlist.tracks
        /* 初始化为对象类型，便于向其中添加属性 */
        this.albumInfo = {}
        this.albumInfo.creator = res.data.playlist.creator.nickname
        this.albumInfo.creatorAva = res.data.playlist.creator.avatarUrl
        this.albumInfo.coverImg = res.data.playlist.coverImgUrl
        this.albumInfo.desc = res.data.playlist.description
        this.albumInfo.name = res.data.playlist.name
        this.albumInfo.subCount = res.data.playlist.subscribedCount
        this.albumInfo.comCount = res.data.playlist.commentCount
        this.albumInfo.shareCount = res.data.playlist.shareCount
        this.albumInfo.playCount = res.data.playlist.playCount
        this.album = this.albumInfo.name
      })
      .catch(err => {
        console.log('歌单曲目获取失败', err)
      })
  },
  mounted () {
    // window.addEventListener('scroll', this.currentTitle)
  },
  destroyed () {
    window.removeEventListener('scroll', this.currentTitle)
  }
}
</script>

<style lang="scss" scoped src="../assets/css/album.scss">
</style>
