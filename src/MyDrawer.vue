<template>
  <div class="my-drawer">
    <div @click="drawer=true" class="drawer-bar">
      <i class="el-icon-menu"></i>
    </div>
    <el-drawer class="drawer-wrapper" :visible.sync="drawer" direction="ltr" :size="400">
      <div class="drawer-head">
        <div class="user-info">
          <template v-if="isActive!=null">
            <el-avatar :size="30" :src="userInfo.avatar"></el-avatar>
            <div class="user-name">
              {{userInfo.user}}<i class="el-icon-arrow-right"></i>
            </div>
          </template>
          <template v-else>
            <el-avatar :size="30" :src="defaultAvatar"></el-avatar>
            <div class="user-name">
              登录/注册
            </div>
          </template>
        </div>
        <div class="scan-info">
          <i class="el-icon-full-screen"></i>
        </div>
      </div>
      <div class="drawer-body">
          <ul class="drawer-item">
            <li>
              <a href="#">
                <span style="font-size: 20px">开通黑胶VIP</span>
                <div class="black-vip">会员中心</div>
                <br>
                <span style="font-size: 10px">立享超21项专属特权 ></span>
              </a>
            </li>
            <li>
              <a href="#">
                <span style="font-size: 12px">受邀专享，黑胶首月仅3.8元！</span>
                <div class="black-pill">受邀<br>专享</div>
              </a>
            </li>
          </ul>
          <ul class="drawer-item">
            <li><a href="#"><i class="el-icon-news"></i> 我的消息<i class="el-icon-arrow-right"></i></a></li>
            <li><a href="#"><i class="el-icon-female"></i> 云贝中心<i class="el-icon-arrow-right"></i></a></li>
            <li><a href="#"><i class="el-icon-s-opportunity"></i> 创作者中心<i class="el-icon-arrow-right"></i></a></li>
          </ul>
          <ul class="drawer-item">
            <li class="item-title">音乐服务</li>
            <li><a href="#"><i class="el-icon-s-ticket"></i>云村有票<i class="el-icon-arrow-right"></i></a></li>
            <li><a href="#"><i class="el-icon-shopping-cart-2"></i>商城<i class="el-icon-arrow-right"></i></a></li>
            <li><a href="#"><i class="el-icon-medal-1"></i>游戏专区<i class="el-icon-arrow-right"></i></a></li>
            <li><a href="#"><i class="el-icon-service"></i>口袋彩铃<i class="el-icon-arrow-right"></i></a></li>
          </ul>
          <ul class="drawer-item">
            <li class="item-title">其他</li>
            <li><a href="#"><i class="el-icon-setting"></i>设置<i class="el-icon-arrow-right"></i></a></li>
            <li><a href="#"><i class="el-icon-moon"></i>夜间模式<i class="el-icon-arrow-right"></i></a></li>
            <li><a href="#"><i class="el-icon-watch"></i>定时关闭<i class="el-icon-arrow-right"></i></a></li>
            <li><a href="#"><i class="el-icon-s-open"></i>个性装扮<i class="el-icon-arrow-right"></i></a></li>
            <li><a href="#"><i class="el-icon-upload"></i>边听边存<i class="el-icon-arrow-right"></i></a></li>
            <li><a href="#"><i class="el-icon-phone"></i>在线听歌免流量<i class="el-icon-arrow-right"></i></a></li>
            <li><a href="#"><i class="el-icon-s-release"></i>音乐黑名单<i class="el-icon-arrow-right"></i></a></li>
            <li><a href="#"><i class="el-icon-lock"></i>青少年模式<i class="el-icon-arrow-right"></i></a></li>
            <li><a href="#"><i class="el-icon-alarm-clock"></i>音乐闹钟<i class="el-icon-arrow-right"></i></a></li>
          </ul>
          <ul class="drawer-item">
            <li><a href="#"><i class="el-icon-s-order"></i>我的订单<i class="el-icon-arrow-right"></i></a></li>
            <li><a href="#"><i class="el-icon-s-finance"></i>优惠券<i class="el-icon-arrow-right"></i></a></li>
            <li><a href="#"><i class="el-icon-service"></i>我的客服<i class="el-icon-arrow-right"></i></a></li>
            <li><a href="#"><i class="el-icon-s-promotion"></i>分享nec音乐<i class="el-icon-arrow-right"></i></a></li>
            <li><a href="#"><i class="el-icon-s-fold"></i>个人信息收集与使用清单<i class="el-icon-arrow-right"></i></a></li>
            <li><a href="#"><i class="el-icon-s-unfold"></i>个人信息第三方共享清单<i class="el-icon-arrow-right"></i></a></li>
            <li><a href="#"><i class="el-icon-s-management"></i>个人信息与隐私保护<i class="el-icon-arrow-right"></i></a></li>
            <li><a href="#"><i class="el-icon-s-marketing"></i>关于<i class="el-icon-arrow-right"></i></a></li>
          </ul>
          <ul class="drawer-item"><li><a>退出登录/关闭</a></li></ul>
        </div>
    </el-drawer>
  </div>
</template>

<script>
import src1 from './assets/logo.png'
export default {
  name: 'MyDrawer',
  data () {
    return {
      drawer: false,
      defaultAvatar: src1,
      userLogin: { name: 'Login' }
    }
  }
}
</script>
<style scoped lang="scss">
  @import "assets/css/myDrawer.scss";
</style>
