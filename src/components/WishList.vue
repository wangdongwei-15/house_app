<template>
    <div class="box-wish">
      <div class="title">心愿单</div>
      <div class="wish-lists" id="container" v-if="houseList.length">
        <houseItem :houseList="houseList"></houseItem>
      </div>
      <div class="wish-empty" v-else>尊敬的小主，您的心愿单怎么是空的，赶紧去添加您中意的房屋吧！！</div>
    </div>
</template>

<script>
import houseItem from './HouseItem'

export default {
  name: 'home',

  components: {
    houseItem
  },
  
  data(){
    return {
      houseList:[],
      last_page:0,
      page:1
    }
  },

  created(){
    if(window.sessionStorage.getItem('token')==null){
      return this.$router.push('/mine')
    }
    this.$emit("on",1)
    this.getWishList()
  },

  methods:{
    async getWishList(){
      let token = sessionStorage.getItem('token')
      let {data:res}= await this.$http.post('admin/my_likes',{token})
      this.houseList= res.data.data
    },
  },

}
</script>

<style lang="less" scoped>
.box-wish{
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
  .wish-lists{
    padding: 25px 39px 0; 
    overflow: scroll;
    padding-bottom: 120px;
  }
  .wish-empty{
    padding: 225px 39px 0;
    text-indent: 2em; 
    line-height: 150px;
    color: #34a2ef;
  }
}

</style>