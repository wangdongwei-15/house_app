<template>
    <div class="box-home">
      <div class="title">首页</div>
      <div class="search"><van-search placeholder="请输入搜索关键词" v-model="words"/></div>
      <div class="house-lists" id="container">
        <houseItem :houseList="houseList"></houseItem>
      </div>
    </div>
</template>

<script>
import Vue from 'vue'
import { Search, Card  } from 'vant'
import houseItem from './HouseItem'

Vue.use(Search).use(Card)

export default {
  name: 'home',

  components: {
    houseItem
  },
  
  data(){
    return {
      houseList:[],
      last_page:0,
      page:1,
      words:'',
      getMore:false
    }
  },

  created() {
    this.$emit("on",0)
    this.page=1
    this.getHouseslist()
  },

  methods : {

    watchScroll () {
      let that = this
      let divObj = document.getElementById('container')
      let clientHeight = document.documentElement.clientHeight || document.body.clientHegiht; 
      let divObjTop=clientHeight-divObj.offsetTop//页面高度
      // let divObj = $('#container')[0]
      let oTop = divObj.scrollTop //滚动条已经滚动的高度(被卷曲的高度)
      let scrollHeight = divObj.scrollHeight //滚动条总高度
      if(oTop + divObjTop >= scrollHeight){//触底
        //改变变量并传给子组件
        that.getMore = !that.getMore
      }
    },

    async getHouseslist(page=1){
      let url='house/list?page='+page
      let {data:res} = await this.$http.get(url,{
          params:{words:this.words}
      })
      let arr= res.data.filter(item=>{
        return item.state==1
      })
      this.last_page= res.last_page
      this.houseList.push(...arr)
    },

  },

  mounted(){
    window.addEventListener('scroll',this.watchScroll,true)
  },

  destroyed(){
    window.removeEventListener('scroll',this.watchScroll)
  },

  watch : {

    getMore() {
      this.page=this.page+1
      if(this.page>this.last_page) return
      this.getHouseslist(this.page)
    },

    words(words){
      this.words=words
      this.houseList=[]
      this.getHouseslist()
    },

	},
  
}
</script>

<style scoped lang="less">
.box-home{
  height: 100%;
  display: flex;
  flex-direction:column; 
  overflow: hidden;
  .title{
    padding-top: 20px;
    height: 58px;
    line-height: 58px;
    font-size: 30px;
    font-weight: 800;
    text-align: center;
  }
  .search{
    padding: 14px 29px 14px 32px;
  }
  .house-lists{
    padding: 25px 39px 0; 
    overflow: scroll;
    padding-bottom: 120px;
  }
}
</style>



