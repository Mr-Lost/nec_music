<template>
    <div class="my-player">
        <div class="my-player-foot">
            <div class="player-song"  @click="showPlayerBox">
        <div class="player-icon"><img src="" alt=""></div>
        <div class="player-title"></div>
      </div>
            <div class="player-tool">
                <i @click="footerPause" class="iconfont icon-bofanganniu footer-play"></i>
          </div>
        </div>
        <div class="my-player-box wrapper">
            <div class="box-close" @click="hidePlayerBox">x</div>
            <div class="img-area">
                <img src="" alt="">
            </div>
            <div class="song-details">
                <p class="name"></p>
                <p class="artist"></p>
            </div>
            <div class="progress-area">
                <div class="progress-bar">
                    <audio src="" id="main-audio"></audio>
                </div>
                <div class="song-timer">
                    <span class="current-time">0:00</span>
                    <span class="max-duration">0:00</span>
                </div>
            </div>
            <div class="controls">
                <i id="repeat-plist" class="iconfont icon-liebiaoxunhuan1" title="repeat"></i>
                <i id="prev" class="iconfont icon-shangyishou"></i>
                <div class="play-pause">
                    <i id="start" class="iconfont icon-bofanganniu play"></i>
                </div>
                <i id="next" class="iconfont icon-xiayishou"></i>
                <i id="more-music" class="iconfont icon-liebiao"></i>
            </div>
            <div class="music-list">
                <div class="header">
                    <div class="row">
                        <i class="iconfont list icon-liebiao"></i>
                        <span>Music List</span>
                    </div>
                    <i id="close" class="iconfont icon-guanbi1"></i>
                </div>
                <ul></ul>
            </div>
        </div>
    </div>
</template>

<script>
import song1 from '../../assets/logo.png'

export default {
  name: 'myPlayer',
  data () {
    return {
      footerImg: song1,
      allMusic: this.$store.getters.GET_LIST,
      curIndex: this.$store.getters.CUR_SONG,
      wrapper: null,
      footBtn: null,
      mainAudio: null
    }
  },
  methods: {
    // 获取当前播放歌曲的url
    playCurSong (sid) {
      this.$axios.get('/song/url', {params: {id: sid}})
        .then(res => {
          document.querySelector('#main-audio').src = res.data.data[0].url
          document.querySelector(`.song${sid}`).src = res.data.data[0].url
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 加载和更新播放列表
    playerListInit () {
      const ulTag = document.querySelector('.music-list ul')
      for (let i = 0; i < this.allMusic.length; i++) {
        const song = this.allMusic[i]
        let liTag = `
            <li li-index="${i + 1}">
                <div class="row">
                    <span>${song.singer} - ${song.sname}</span>
                </div>
                <span id="song${song.sid}" class="audio-duration"></span>
                <audio class="song${song.sid}" src=""></audio>
            </li>
        `
        ulTag.insertAdjacentHTML('beforeend', liTag)
        let liAudioDurationTag = ulTag.querySelector(`#song${song.sid}`)
        let liAudioTag = ulTag.querySelector(`.song${song.sid}`)
        liAudioTag.addEventListener('loadeddata', () => {
          let duration = liAudioTag.duration
          let totalMin = Math.floor(duration / 60)
          let totalSec = Math.floor(duration % 60)
          if (totalSec < 10) { totalSec = `0${totalSec}` }
          liAudioDurationTag.innerText = `${totalMin}:${totalSec}`
          liAudioDurationTag.setAttribute('t-duration', `${totalMin}:${totalSec}`)
        })
      }
    },
    // 页面加载对应音乐
    loadMusic (indexNum) {
      const song = this.allMusic.length ? this.allMusic[indexNum - 1] : 'Made by LMR'
      const footerImg = document.querySelector('.player-icon img')
      const footerTitle = document.querySelector('.player-title')
      if (typeof song === 'object') {
        this.wrapper.querySelector('.song-details .name').innerText = `${song.singer} - ${song.sname}`
        this.wrapper.querySelector('.song-details .artist').innerText = song.artist
        this.wrapper.querySelector('.img-area img').src = song.pic
        this.$store.commit('CUR_PLAY', indexNum)
        this.playCurSong(song.sid)
        footerTitle.innerHTML = `<span>${song.sname} - ${song.singer}</span>`
        footerImg.src = song.pic
      } else {
        footerImg.src = this.footerImg
        footerTitle.innerHTML = `<span>Made by LMR</span>`
      }
    },
    // 歌曲列表中标记出正在播放的曲目
    playingSong () {
      const allLiTag = document.querySelectorAll('.music-list ul li')
      for (let j = 0; j < this.allMusic.length; j++) {
        let audioTag = allLiTag[j].querySelector('.audio-duration')
        if (allLiTag[j].classList.contains('playing')) {
          allLiTag[j].classList.remove('playing')
          audioTag.innerText = audioTag.getAttribute('t-duration')
        }
        if (allLiTag[j].getAttribute('li-index') === this.curIndex) {
          allLiTag[j].classList.add('playing')
          audioTag.innerText = 'Playing'
        }
      }
    },
    // 播放音乐
    playMusic () {
      this.wrapper.classList.add('paused')
      this.wrapper.querySelector('#start').setAttribute('class', 'iconfont icon-pause1 play')
      this.footBtn.setAttribute('class', 'iconfont icon-pause1 footer-play')
      this.mainAudio.play()
    },
    // 暂停音乐
    pauseMusic () {
      this.wrapper.classList.remove('paused')
      this.wrapper.querySelector('#start').setAttribute('class', 'iconfont icon-bofanganniu play')
      this.footBtn.setAttribute('class', 'iconfont icon-bofanganniu footer-play')
      this.mainAudio.pause()
    },
    prevMusic () {
      this.curIndex--
      if (this.curIndex < 1) { this.curIndex = this.allMusic.length }
      this.loadMusic(this.curIndex)
      this.playMusic()
      this.playingSong()
    },
    nextMusic () {
      this.curIndex++
      if (this.curIndex > this.allMusic.length) { this.curIndex = 1 }
      this.loadMusic(this.curIndex)
      this.playMusic()
      this.playingSong()
    },
    listenerInit () {
      const self = this
      // 点击进度条更新播放刻度
      const progressArea = self.wrapper.querySelector('.progress-area')
      progressArea.addEventListener('click', e => {
        let progressWidth = progressArea.clientWidth
        let clickedOffsetX = e.offsetX
        let songDuration = self.mainAudio.duration
        self.mainAudio.currentTime = (clickedOffsetX / progressWidth) * songDuration
        self.playingSong()
      })
      // 切换循环模式
      const repeatBtn = self.wrapper.querySelector('#repeat-plist')
      repeatBtn.addEventListener('click', () => {
        let repeatMode = repeatBtn.title
        switch (repeatMode) {
          case 'repeat':
            repeatBtn.setAttribute('class', 'iconfont icon-danquxunhuan1')
            repeatBtn.setAttribute('title', 'repeat_one')
            break
          case 'repeat_one':
            repeatBtn.setAttribute('class', 'iconfont icon-suijibofang')
            repeatBtn.setAttribute('title', 'shuffle')
            break
          case 'shuffle':
            repeatBtn.setAttribute('class', 'iconfont icon-liebiaoxunhuan1')
            repeatBtn.setAttribute('title', 'repeat')
            break
        }
      })
      // 音乐结束时按照播放模式进行切歌
      self.mainAudio.addEventListener('end', () => {
        let repeatMode = repeatBtn.title
        switch (repeatMode) {
          case 'repeat':
            self.nextMusic()
            break
          case 'repeat_one':
            self.mainAudio.currentTime = 0
            self.loadMusic(self.curIndex)
            self.playMusic()
            break
          case 'shuffle':
            let randIndex = Math.floor(Math.random() * self.allMusic.length + 1)
            do {
              randIndex = Math.floor(Math.random() * self.allMusic.length + 1)
            } while (self.curIndex === randIndex)
            self.curIndex = randIndex
            self.loadMusic(self.curIndex)
            self.playMusic()
            self.playingSong()
            break
        }
      })
      // 弹出和收起歌曲队列列表
      const moreMusicBtn = self.wrapper.querySelector('#more-music')
      moreMusicBtn.addEventListener('click', () => {
        self.wrapper.querySelector('.music-list').classList.toggle('show')
      })
      self.wrapper.querySelector('#close').addEventListener('click', () => {
        moreMusicBtn.click()
      })
      // 事件委托
      document.querySelector('.music-list ul').addEventListener('click', e => {
        if (e.target.nodeName.toLocaleLowerCase() === 'li') {
          self.curIndex = e.target.getAttribute('li-index')
          self.loadMusic(self.curIndex)
          self.playMusic()
          self.playingSong()
        }
      })
      // 播放暂停按钮切换
      self.wrapper.querySelector('.play-pause').addEventListener('click', () => {
        self.wrapper.classList.contains('paused') ? self.pauseMusic() : self.playMusic()
        self.playingSong()
      })
      // 点击切换上一首
      self.wrapper.querySelector('#prev').addEventListener('click', () => {
        self.prevMusic()
      })
      // 点击切换下一首
      self.wrapper.querySelector('#next').addEventListener('click', () => {
        self.nextMusic()
      })
      // 更新已播放时间和进度条
      this.mainAudio.addEventListener('timeupdate', e => {
        const currentTime = e.target.currentTime
        const duration = e.target.duration
        let progressWidth = (currentTime / duration) * 100
        self.wrapper.querySelector('.progress-bar').style.width = `${progressWidth}%`
        let currentMin = Math.floor(currentTime / 60)
        let currentSec = Math.floor(currentTime % 60)
        if (currentSec < 10) { currentSec = `0${currentSec}` }
        self.wrapper.querySelector('.current-time').innerText = `${currentMin}:${currentSec}`
      })
      // 切歌时获取新的音乐的总时长
      this.mainAudio.addEventListener('loadeddata', () => {
        let mainAudioDuration = self.mainAudio.duration
        let totalMin = Math.floor(mainAudioDuration / 60)
        let totalSec = Math.floor(mainAudioDuration % 60)
        if (totalSec < 10) { totalSec = `0${totalSec}` }
        self.wrapper.querySelector('.max-duration').innerText = `${totalMin}:${totalSec}`
      })
    },
    showPlayerBox () {
      document.querySelector('.my-player-box').style.top = 0
    },
    hidePlayerBox () {
      document.querySelector('.my-player-box').style.top = '110vh'
    },
    footerPause () {
      const boxBtn = document.querySelector('#start')
      if (this.wrapper.classList.contains('paused')) {
        this.wrapper.classList.remove('paused')
        this.footBtn.setAttribute('class', 'iconfont icon-bofanganniu footer-play')
        boxBtn.setAttribute('class', 'iconfont icon-bofanganniu play')
        this.mainAudio.pause()
      } else {
        this.wrapper.classList.add('paused')
        this.footBtn.setAttribute('class', 'iconfont icon-pause1 footer-play')
        boxBtn.setAttribute('class', 'iconfont icon-pause1 play')
        this.mainAudio.play()
      }
    }
  },
  mounted () {
    this.wrapper = document.querySelector('.my-player-box')
    this.footBtn = document.querySelector('.footer-play')
    this.mainAudio = document.querySelector('#main-audio')
    this.listenerInit()
    window.addEventListener('load', () => {
      this.loadMusic(this.curIndex)
      this.playingSong()
    })
  }
}
</script>

<style lang="scss" src="../../assets/css/myPlayer.scss">
</style>
