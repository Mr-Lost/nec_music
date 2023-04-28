let allMusic = [
  {
    name: '陈柏宇 - 你瞒我瞒',
    artist: 'Close Up',
    img: 'music-1',
    src: 'music-1'
  },
  {
    name: 'Donna Burke - Glassy Sky',
    artist: '東京喰種 オリジナルサウンドトラック',
    img: 'music-2',
    src: 'music-2'
  },
  {
    name: 'April Rain - Melting Snowman',
    artist: 'A Melting Snowman',
    img: 'music-3',
    src: 'music-3'
  }
]
const footerTitle = document.querySelector('.player-title')
const footerBtn = document.querySelector('.footer-play')
const wrapper = document.querySelector('.my-player-box'),
  musicImg = wrapper.querySelector('.img-area img'),
  musicName = wrapper.querySelector('.song-details .name'),
  musicArtist = wrapper.querySelector('.song-details .artist'),
  playPauseBtn = wrapper.querySelector('.play-pause'),
  prevBtn = wrapper.querySelector('#prev'),
  nextBtn = wrapper.querySelector('#next'),
  mainAudio = wrapper.querySelector('#main-audio'),
  progressArea = wrapper.querySelector('.progress-area'),
  progressBar = progressArea.querySelector('.progress-bar'),
  musicList = wrapper.querySelector('.music-list'),
  moreMusicBtn = wrapper.querySelector('#more-music'),
  closeMoreMusic = wrapper.querySelector('#close'),
  musicCurrentTime = wrapper.querySelector('.current-time'),
  musicDuration = wrapper.querySelector('.max-duration'),
  repeatBtn = wrapper.querySelector('#repeat-plist'),
  playPauseIcon = wrapper.querySelector('#start')
let musicIndex = Math.floor(Math.random() * allMusic.length + 1),
  isMusicPaused = true
window.addEventListener('load', () => {
  loadMusic(musicIndex)
  playingSong()
})

// 页面加载对应音乐
function loadMusic (indexNumb) {
  musicName.innerText = allMusic[indexNumb - 1].name
  musicArtist.innerText = allMusic[indexNumb - 1].artist
  musicImg.src = `static/pictures/songs/${allMusic[indexNumb - 1].src}.jpg`
  mainAudio.src = `static/songs/${allMusic[indexNumb - 1].src}.mp3`
  if (allMusic.length) { footerTitle.innerHTML = `<span>${allMusic[indexNumb - 1].name}</span>` }
  else { footerTitle.innerHTML = `<span>Made by LMR</span>` }
}

// 播放音乐
function playMusic () {
  wrapper.classList.add('paused')
  playPauseIcon.setAttribute('class', 'iconfont icon-pause1 play')
  footerBtn.setAttribute('class', 'iconfont icon-pause1 footer-play')
  mainAudio.play()
}

// 暂停音乐
function pauseMusic () {
  wrapper.classList.remove('paused')
  playPauseIcon.setAttribute('class', 'iconfont icon-bofanganniu play')
  footerBtn.setAttribute('class', 'iconfont icon-bofanganniu footer-play')
  mainAudio.pause()
}

// 播放上一首
function prevMusic () {
  musicIndex--
  musicIndex < 1 ? (musicIndex = allMusic.length) : (musicIndex = musicIndex)
  loadMusic(musicIndex)
  playMusic()
  playingSong()
}

// 播放下一首
function nextMusic () {
  musicIndex++
  musicIndex > allMusic.length ? (musicIndex = 1) : (musicIndex = musicIndex)
  loadMusic(musicIndex)
  playMusic()
  playingSong()
}

playPauseBtn.addEventListener('click', () => {
  const isMusicPlay = wrapper.classList.contains('paused')
  isMusicPlay ? pauseMusic() : playMusic()
  playingSong()
})
prevBtn.addEventListener('click', () => {
  prevMusic()
})
nextBtn.addEventListener('click', () => {
  nextMusic()
})
// 更新播放时间和进度条
mainAudio.addEventListener('timeupdate', (e) => {
  const currentTime = e.target.currentTime
  const duration = e.target.duration
  let progressWidth = (currentTime / duration) * 100
  progressBar.style.width = `${progressWidth}%`
  let currentMin = Math.floor(currentTime / 60)
  let currentSec = Math.floor(currentTime % 60)
  if (currentSec < 10) {
    currentSec = `0${currentSec}`
  }
  musicCurrentTime.innerText = `${currentMin}:${currentSec}`
})
// 切歌时获取新的音乐总时长
mainAudio.addEventListener('loadeddata', () => {
  let mainAdDuration = mainAudio.duration
  let totalMin = Math.floor(mainAdDuration / 60)
  let totalSec = Math.floor(mainAdDuration % 60)
  if (totalSec < 10) {
    totalSec = `0${totalSec}`
  }
  musicDuration.innerText = `${totalMin}:${totalSec}`
})
// 点击进度条
progressArea.addEventListener('click', (e) => {
  let progressWidth = progressArea.clientWidth
  let clickedOffsetX = e.offsetX
  let songDuration = mainAudio.duration
  mainAudio.currentTime = (clickedOffsetX / progressWidth) * songDuration
  playingSong()
})
// 切换循环模式
repeatBtn.addEventListener('click', () => {
  let getText = repeatBtn.title
  switch (getText) {
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
// 音乐结束时播放模式切歌
mainAudio.addEventListener('ended', () => {
  let getText = repeatBtn.title
  switch (getText) {
    case 'repeat':
      nextMusic()
      break
    case 'repeat_one':
      mainAudio.currentTime = 0
      loadMusic(musicIndex)
      playMusic()
      break
    case 'shuffle':
      let randIndex = Math.floor(Math.random() * allMusic.length + 1)
      do {
        randIndex = Math.floor(Math.random() * allMusic.length + 1)
      } while (musicIndex === randIndex)
      musicIndex = randIndex
      loadMusic(musicIndex)
      playMusic()
      playingSong()
      break
  }
})
moreMusicBtn.addEventListener('click', () => {
  musicList.classList.toggle('show')
})
closeMoreMusic.addEventListener('click', () => {
  moreMusicBtn.click()
})
const ulTag = wrapper.querySelector('ul')
for (let i = 0; i < allMusic.length; i++) {
  let liTag = `
                <li li-index="${i + 1}">
                    <div class="row">
                        <span>${allMusic[i].name}</span>
                        <p>${allMusic[i].artist}</p>
                    </div>
                    <span id="${allMusic[i].src}" class="audio-duration"></span>
                    <audio class="${allMusic[i].src}" src="demo6/songs/${allMusic[i].src}.mp3"></audio>
                </li>
                `
  ulTag.insertAdjacentHTML('beforeend', liTag)
  let liAudioDurationTag = ulTag.querySelector(`#${allMusic[i].src}`)
  let liAudioTag = ulTag.querySelector(`.${allMusic[i].src}`)
  liAudioTag.addEventListener('loadeddata', () => {
    let duration = liAudioTag.duration
    let totalMin = Math.floor(duration / 60)
    let totalSec = Math.floor(duration % 60)
    if (totalSec < 10) {
      totalSec = `0${totalSec}`
    }
    liAudioDurationTag.innerText = `${totalMin}:${totalSec}`
    liAudioDurationTag.setAttribute('t-duration', `${totalMin}:${totalSec}`)
  })
}

function playingSong () {
  const allLiTag = ulTag.querySelectorAll('li')
  for (let j = 0; j < allMusic.length; j++) {
    let audioTag = allLiTag[j].querySelector('.audio-duration')
    if (allLiTag[j].classList.contains('playing')) {
      allLiTag[j].classList.remove('playing')
      let adDuration = audioTag.getAttribute('t-duration')
      audioTag.innerText = adDuration
    }
    if (allLiTag[j].getAttribute('li-index') === musicIndex) {
      allLiTag[j].classList.add('playing')
      audioTag.innerText = 'Playing'
    }
    allLiTag[j].setAttribute('onclick', 'clicked(this)')
  }
}

function clicked (element) {
  let getLiIndex = element.getAttribute('li-index')
  musicIndex = getLiIndex
  loadMusic(musicIndex)
  playMusic()
  playingSong()
}
