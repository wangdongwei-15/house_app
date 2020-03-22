<template>
    <div class="box-home">
      <div class="title">我的发布</div>
      <div class="house-lists" id="container">
        <myHouseItem :getMore="getMore"></myHouseItem>
      </div>
    </div>
</template>

<script>
import myHouseItem from './MyHouseItem.vue'

export default {
  name: 'home',

  components: {
    myHouseItem
  },
  
  data(){
    return {
      // houseList:[],
      // last_page:0,
      // page:1,
      getMore:false
    }
  },

  created() {
    this.$emit("on",0)
    // this.page=1
    // this.getHousesList()
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

    // async getHousesList(){
    //   let url='house/list?page='+this.page
    //   let {data:res}= await this.$http.get(url,{
    //       params:{size:this.pageSize,words:this.words}
    //   })
    //   this.total=res.total
    //   this.page=res.current_page
    //   let newHouses= res.data
    //   newHouses.map(item=>{
    //       item.state =  item.state === 1 ? true : false
    //       return item
    //   })
    //   this.houseList.push(...newHouses) 
    // },

  },

  mounted(){
    window.addEventListener('scroll',this.watchScroll,true)
  },

  destroyed(){
    window.removeEventListener('scroll',this.watchScroll)
  },

  // watch : {

  //   getMore() {
  //     this.page=this.page+1
  //     if(this.page>this.last_page) return
  //     this.getHousesList(this.page)
  //   },

  // },
  
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
  .house-lists{
    padding: 30px 29px 120px 25px; 
    overflow: scroll;
  }
}
</style>



