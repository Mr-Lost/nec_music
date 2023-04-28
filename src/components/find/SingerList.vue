<template>
  <div id="singer_list">
    <ul class="singer-list">
        <li v-for="(singer, index) in singerList" :key="index">
            <img :src="singer.ava" alt="">
            <span>{{singer.name}}</span>
        </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'SingerList',
  data () {
    return {
      singerList: [],
      type: this.$route.params.type || -1,
      area: this.$route.params.area || -1
    }
  },
  methods: {
    load_singers () {
      this.singerList = []
      this.$axios.get('/artist/list', {params: {type: this.type, area: this.area}})
        .then(res => {
          for (let s of res.data.artists) {
            const singer = {name: '', ava: '', id: ''}
            singer.name = s.name
            singer.ava = s.img1v1Url
            singer.id = s.id
            this.singerList.push(singer)
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created () {
    // this.$route.push({name: 'Singers', params: {type: this.$route.params.type, area: this.$route.params.area}})
    this.load_singers()
  },
  mounted () {
    console.log(this.singerList, this.type, this.area)
  }
}
</script>

<style scoped lang="scss">
.singer-list{
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 10px;
  grid-row-gap: 20px;
  place-items: center;
  margin: 100px 10px 0 10px;
  li{
    text-align: center;
    background-color: rgba(255,255,255,0.7);
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 3px 3px 10px 0 lightblue;
    img{
      width: 100%;
    }
    span{
      height: 30px;
      line-height: 30px;
      color: #0e0417;
    }
  }
}
</style>
