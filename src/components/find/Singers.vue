<template>
    <div id="singers">
        <my-header>
            <template #header-left>
                <div class="header-ele1">
                    <i class="el-icon-arrow-left" @click="$router.push({name: 'Find'})"></i>
                </div>
            </template>
            <template #header-main>
                <div class="header-ele1">歌手</div>
            </template>
        </my-header>
        <div class="my-content">
          <div class="category-wrapper" @click="cateHandler">
            <ul class="singer-category cate1">
              <li v-for="(item, index) in cate1" :sc_id="item.sc_id" :key="index" :class="{active: item.sc_id===ctype}">
                <router-link :to="{name: 'Singers', params: {type: item.sc_id, area: area, initial: initial}}"><span>{{item.name}}</span></router-link>
              </li>
            </ul>
            <ul class="singer-category cate2">
              <li v-for="(item, index) in cate2" :sc_id="item.sc_id" :key="index" :class="{active: item.sc_id===area}">
                <router-link :to="{name: 'Singers', params: {type: ctype, area: item.sc_id, initial: initial}}"><span>{{item.name}}</span></router-link>
              </li>
            </ul>
            <ul class="singer-category cate3">
<!--                <li :sc_id="0" class="active">-->
<!--                  <router-link :to="{name: 'Singers', params: {type: ctype, area: area, initial: 0}}"><span>#</span></router-link>-->
<!--                </li>-->
                <li v-for="(s, index) in '#abcdefghijklmnopqrstuvwxyz'" :sc_id="index" :key="index" :class="{active: index===initial}">
                  <router-link :to="{name: 'Singers', params: {type: ctype, area: area, initial: index}}"><span>{{s.toLocaleUpperCase()}}</span></router-link>
                </li>
            </ul>
          </div>
          <router-view />
<!--            <ul class="singer-list">-->
<!--              <li v-for="(singer, index) in singerList" :key="index">-->
<!--                <router-link :to="{name: 'SingerDetail'}">-->
<!--                  <img :src="singer.ava" alt="">-->
<!--                  <span>{{singer.name}}</span>-->
<!--                </router-link>-->
<!--              </li>-->
<!--            </ul>-->
        </div>
    </div>
</template>

<script>
import MyHeader from '../common/MyHeader'
export default {
  name: 'Singers',
  data () {
    return {
      ctype: 1,
      area: 96,
      initial: 10,
      cate1: [{sc_id: -1, name: '全部'}, {sc_id: 1, name: '男歌手'}, {sc_id: 2, name: '女歌手'}, {sc_id: 3, name: '乐队'}],
      cate2: [{sc_id: -1, name: '全部'}, {sc_id: 7, name: '华语'}, {sc_id: 96, name: '欧美'}, {sc_id: 8, name: '日本'}, {sc_id: 16, name: '韩国'}, {sc_id: 0, name: '其他'}]
    }
  },
  components: {MyHeader},
  methods: {
    cateHandler (e) {
      console.log(e.target)
      if (e.target.tagName === 'span') {
        let params = {type: this.type, area: this.area, initial: this.initial}
        const cate = e.target.parentNode.parentNode
        if (cate.parentNode.classList.contains('cate1')) {
          params.type = e.getAttribute('sc_id')
          this.$route.push({name: 'Singers', params: params})
        }
        if (cate.parentNode.classList.contains('cate2')) {
          params.area = e.getAttribute('sc_id')
          this.$route.push({name: 'Singers', params: params})
        }
        if (cate.parentNode.classList.contains('cate3')) {
          params.initial = e.getAttribute('sc_id')
          this.$route.push({name: 'Singers', params: params})
        }
      }
    }
  },
  mounted () {
    // this.load_singers(this.type, this.area)
    // document.querySelector('.cate1 li').classList.add('active')
    // document.querySelector('.cate2 li').classList.add('active')
    // document.querySelector('.cate2 li').click()
    // document.querySelector('.category-wrapper').addEventListener('click', e => {
    //   const pNode = e.target.parentNode
    //   if (pNode.tagName.toLocaleLowerCase() === 'ul') {
    //     for (let node of pNode.children) {
    //       if (node.classList.contains('active')) {
    //         node.classList.remove('active')
    //       }
    //     }
    //     e.target.classList.add('active')
    //     if (pNode.classList.contains('cate1')) {
    //       this.type = e.target.getAttribute('sc_id')
    //     }
    //     if (pNode.classList.contains('cate2')) {
    //       this.area = e.target.getAttribute('sc_id')
    //     }
    //   }
    //   // this.load_singers(this.type, this.area)
    // })
  }
}
</script>

<style scoped lang="scss" src="@/assets/css/singers.scss"></style>
