<template>
    <div class="box_mre">
      <div class="title">消息</div>
      <el-input
        type="textarea"
        :rows="3"
        placeholder="请输入内容"
        v-model="textarea">
      </el-input>
      <div class="btn">
        <button @click="saveMsg">提问</button>
      </div>
      <div class="mre_text" id="container">
        <div class="mre_qu_an" v-for="item in MsgList" :key="item.id">
          <div class="mre_qu_le">
            <el-avatar :size="50" :src="userUrl"></el-avatar>
            <div class="qu">{{item.question}}</div>
          </div>
          <div class="mre_an_ri" v-if="item.answer!=null">
            <div class="an">{{item.answer}}</div>
            <el-avatar :size="50" :src="adminUrl"></el-avatar>
          </div>
        </div>
      </div>
    </div>
</template>

<script>

export default {
  name: 'home',
  data(){
    return {
      textarea:'',
      userUrl:'',
      adminUrl:'',
      MsgList:[],
    }
  },

  created(){
    this.$emit("on",2)
    this.userUrl=sessionStorage.getItem('icon')
    if(window.sessionStorage.getItem('token')==null){
      this.$router.push('/mine')
    }
    this.getMsgList()
  },

  methods:{
    // 获取消息列表    
    async getMsgList(){
      let {data:res}= await this.$http.get('msg_list')
      this.MsgList=res.data.data
    },

    async saveMsg(){
      let token= sessionStorage.getItem('token')
      let question=this.textarea
      let {data:res} = await this.$http.post("msg/create",{token,question})
      this.getMsgList()
      this.textarea=""
    },
    
  },
}
</script>

<style lang="less" scoped>
.box_mre{
  height: 100%;
  display: flex;
  flex-direction:column; 
  overflow: hidden;
  padding: 0 40px;
  .title{
    padding-top: 20px;
    padding-bottom: 50px;
    height: 58px;
    line-height: 58px;
    font-size: 30px;
    font-weight: 800;
    text-align: center;
  }
  .btn{
    button{
      width: 100%;
      margin-top: 30px;
      height: 80px;
      line-height: 80px;
      font-size: 30px;
      flex: 1;
    }
  }
  .mre_text{
    overflow: scroll;
    padding-bottom: 120px;
    .mre_qu_an{
      border-bottom:  1px solid #d9d9d9;
      height: 255px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      .mre_qu_le{
        display: flex;
        align-items: center;
        .qu{
          height: 60px;
          line-height: 60px;
          padding: 0 23px;
          margin-left: 28px; 
          background-color: #a2e16e;
          font-size: 27px;
        }
      }
      .mre_an_ri{
        display: flex;
        justify-content: flex-end;
        align-items: center;
        .an{
          height: 60px;
          line-height: 60px;
          padding: 0 23px;
          margin-right: 28px; 
          background-color: #ececec;
          font-size: 27px;
        }
      }
    }
  }
}

</style>