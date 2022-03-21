<template>
  <div id="follow">
    <my-drawer/>
    <div class="my-header">
      <div class="header-main">动态</div>
      <div class="header-right">
        <i class="el-icon-plus"></i>
      </div>
    </div>
    <div class="my-content">
      <div class="me-circle">
        <div><i class="el-icon-cloudy"></i></div>
        <span>我的圈子</span>
      </div>
      <ul class="my-circle-wrapper">
        <li v-for="(item, index) in myCircle" class="my-circle" :key="index">
          <div class="img-wrapper">
            <img :src="item.ava" alt="">
          </div>
          <span class="my-3dots span1">{{item.userName}}</span>
        </li>
      </ul>
      <div class="mc-header">
        <span class="my-active">我的关注</span>
        <div class="my-category">
          <span class="my-active">全部</span>
          <span>音乐人</span>
          <span>朋友</span>
        </div>
      </div>
      <div class="mc-message">
        <div class="mcm-head">
          <img src="../assets/ava.png" alt="">
          <span><strong>Taylor Swift</strong> 分享单曲：<br>昨天22:30</span>
        </div>
        <div class="mcm-content">
          <span>时常保持惬意心态，或许是美好生活的真谛。在晴朗的春日，英伦香氛世家JoMaloneLondon祖玛珑留下了它的注解，伴随轻快的旋律，用一场指尖漫游，解锁让你惬意自在的英伦气质。让我们一起守候晴天 ~ 欢聚时刻指日可待 ~ </span>
          <div class="img-area">
            <img src="../assets/avatar.png" alt="">
            <img src="../assets/avatar.png" alt="">
            <img src="../assets/avatar.png" alt="">
            <img src="../assets/avatar.png" alt="">
          </div>
          <div class="song-area">
            <i class="el-icon-caret-right"></i>
            <img src="../assets/album.png" alt="">
            <span><strong style="font-size: 14px">一丝不挂</strong><br>陈奕迅</span>
          </div>
          <ul class="tool-area">
            <li><i class="el-icon-share"></i> 7</li>
            <li><i class="el-icon-news"></i> 238</li>
            <li><i class="el-icon-thumb"></i> 7220</li>
            <li><i class="el-icon-more"></i></li>
          </ul>
        </div>
      </div>
      <div class="mc-message">
        <div class="mcm-head">
          <img src="../assets/ava.png" alt="">
          <span><strong>云音乐小秘书</strong> 分享单曲：<br>3月14日</span>
        </div>
        <div class="mcm-content">
          <span>希望时光对我们多些温柔，那我们就回赠它多些可爱。晚安！</span>
          <div class="img-area">
            <img src="../assets/avatar.png" alt="">
            <img src="../assets/avatar.png" alt="">
          </div>
          <div class="song-area">
            <i class="el-icon-caret-right"></i>
            <img src="../assets/album.png" alt="">
            <span><strong style="font-size: 14px">New Boy</strong><br>朴树</span>
          </div>
          <ul class="tool-area">
            <li><i class="el-icon-share"></i> 123</li>
            <li><i class="el-icon-news"></i> 4567</li>
            <li><i class="el-icon-thumb"></i> 891011</li>
            <li><i class="el-icon-more"></i></li>
          </ul>
        </div>
      </div>
      <div class="mc-more">
        <span>过去3天的所有新内容都看完啦</span>
        <div><span>查看更早动态</span></div>
      </div>
    </div>
  </div>
</template>

<script>
import MyDrawer from '../MyDrawer'
import src1 from '../assets/album.png'
export default {
  name: 'Follow',
  data () {
    return {
      myCircle: [{ava: src1, userName: 'Troye Sivan'},
        {ava: src1, userName: 'Billie Eilish'},
        {ava: src1, userName: 'Taylor Swift'},
        {ava: src1, userName: 'Wolf Colony'},
        {ava: src1, userName: '林宥嘉'},
        {ava: src1, userName: 'Lana Del Rey'},
        {ava: src1, userName: '孙燕姿'},
        {ava: src1, userName: '这是一个测试用户名字很长长长'},
        {ava: src1, userName: '陈壹千ac'}]
    }
  },
  components: {MyDrawer}
}
</script>

<style scoped src="@/assets/css/follow.scss" lang="scss">
</style>
