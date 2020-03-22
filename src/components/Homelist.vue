<template>
  <div id="app">
    <router-view @on="onReturn"></router-view>
    <van-tabbar
      v-model="active"
      active-color="#07c160"
      inactive-color="#000"
    >
      <van-tabbar-item icon="wap-home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="like-o" to="/wish">心愿单</van-tabbar-item>
      <van-tabbar-item icon="comment-o" to="/news">消息</van-tabbar-item>
      <van-tabbar-item icon="contact" to="/mine">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<style lang="less">
html,body,#app{
  height: 100vh;
  margin: 0;
  padding: 0;
}
*{
  margin: 0;
  padding: 0;
}
</style>

<script>
import Vue from 'vue'
import { Tabbar, TabbarItem, Icon } from 'vant'

Vue.use(Icon).use(Tabbar).use(TabbarItem)
export default {
  data(){
    return {
      active:0
    }
  },
  methods: {
    onReturn(ev){
      this.active=ev
    }
  },
}
</script>