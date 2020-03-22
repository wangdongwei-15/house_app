<template>
    <div class="box-mine">
      <div class="title">我的</div>
      <div class="mine_land">
        <div class="mine_hp" @click="show=true" v-if="user.username==undefined">
          <div class="user_icon">
            <el-avatar :size="50" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
          </div>
          <div class="user_reset_password"><p>未登录</p></div>
        </div>
        <div class="mine_hp" v-else>
          <div class="user_icon" @click="userIconDialogVisible=true">
            <el-avatar :size="50" :src="user.icon"></el-avatar>
          </div>
          <div class="user_reset_password">
            <div class="mine_usna_le"><p>{{user.username}}</p></div>
            <div class="mine_usna_ri" @click="passWordDialogVisible=true">重置密码</div>
          </div>
        </div>
      </div>
      <div class="mine_mid">
        <van-cell-group>
          <van-cell title="发布房源" value="内容" icon="home-o" is-link @click="toAddHouse"/>
          <van-cell title="我的发布" value="内容" icon="shop-o" is-link @click="toMineRelease"/>
          <van-cell title="心愿单" value="内容" icon="like-o" is-link @click="toWishList"/>
          <van-cell title="我的消息" value="内容" icon="chat-o" is-link/>
          <van-cell v-if="user.username==undefined" title="点击登录" value="内容" icon="manager-o" is-link @click="show=true"/>
          <van-cell v-else title="退出登录" value="内容" icon="manager-o" is-link @click="centerDialogVisible = true"/>
        </van-cell-group>
      </div>

      <van-popup v-model="show" :style="{ height: '40%', width: '100%' }">
        <h2>请输入账号和密码</h2>
        <el-form
          ref = "loginFormRef"
          :model="form"
          :rules="rules"
          label-width="0px"
          class="login_form"
        >
          <!-- 用户名 -->
          <el-form-item prop="username">
            <el-input v-model="form.username" prefix-icon="iconfont icon-user"></el-input>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item prop="password">
            <el-input
              v-model="form.password"
              prefix-icon="iconfont icon-3702mima"
              type="password"
            ></el-input>
          </el-form-item>
          <!-- 按钮区域 -->
          <el-form-item class="btns">
            <el-button type="primary" @click='login'>登录</el-button>
            <el-button type="info" @click='nextLogin' ref="nextLogin">重置</el-button>
          </el-form-item>
        </el-form>
      </van-popup>
      <!-- 退出登录 -->
      <el-dialog
        title="退出登录提示"
        :visible.sync="centerDialogVisible"
        width="80%"
        center>
        <span>小主，您确定要退出了么！！</span>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" size="mini" @click="quit">确 定</el-button>
          <el-button @click="centerDialogVisible = false" size="mini">取 消</el-button>
        </span>
      </el-dialog>
      <!-- 修改头像 -->
      <el-dialog
        title="重置头像"
        :visible.sync="userIconDialogVisible"
        width="80%"
        center>
        <el-upload
          ref="upload"
          :auto-upload="false"
          :http-request="uploadIcon"
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-change="handleAvatarSuccess">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="saveUserIcon">确认修改</el-button>
        </span>
      </el-dialog>
      <!-- 修改密码 -->
      <el-dialog
        title="重置密码"
        :visible.sync="passWordDialogVisible"
        width="80%"
        center>
        <el-card>
          <el-form ref="addFormHouse" :model="userpw" label-width="100px">
              <el-form-item label="新密码">
                  <el-input v-model="userpw.password"></el-input>
              </el-form-item>
              <el-form-item label="确认密码">
                  <el-input v-model="userpw.confirmPassword"></el-input>
              </el-form-item>
              <el-form-item>
                  <el-button type="primary" @click="resetPassWord">确认修改</el-button>
              </el-form-item>
          </el-form>     
        </el-card>
      </el-dialog>
    </div>
</template>

<script>
import Vue from 'vue'
import { Popup, Field, Cell, CellGroup } from 'vant'

Vue.use(Popup).use(Field).use(Cell).use(CellGroup)
export default {
  name: 'home',
  
  data(){
    return {
      // 模态层
      show:false,
      centerDialogVisible: false,
      userIconDialogVisible:false,
      passWordDialogVisible:false,
      imageUrl:'',
      userpw:{
        password:'',
        confirmPassword:''
      },
      // 登录用户信息
      user:{},
      circleUrl:'',
      
      // 校验登录信息
      form: {
        username: '',
        password: ''
      },
      rules:{
        username:[
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
        ],
        password:[
          { required: true, message: '请输入用密码', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
        ],
      }
    }
  },

  created(){
    this.user.username=window.sessionStorage.getItem('username')
    this.user.icon=window.sessionStorage.getItem('icon')
    this.$emit("on",3)
  },

  methods:{
    // 重置密码
    async resetPassWord(){
      this.userpw.token=window.sessionStorage.getItem('token')
      let {data:res}=await this.$http.post('admin/reset_password',this.userpw)
      if(res.meta.status!==200) return this.$message.error(res.meta.msg)
      this.$message.success(res.meta.msg)
      window.sessionStorage.removeItem('token')
      window.sessionStorage.removeItem('icon')
      window.sessionStorage.removeItem('username')
      this.passWordDialogVisible=false
      this.user={}
    },
    // 修改头像
    handleAvatarSuccess(file) {
      const IMG_ALLOWD = ['jpeg', 'jpg', 'gif'];
      let imgType = file.raw.type.split('/')[1];
      // 判断图片格式
      if (IMG_ALLOWD.indexOf(imgType) === -1) {
          this.$message.warning('上传图片格式错误')
          this.imageUrl = null
      }else{
          this.imageUrl = URL.createObjectURL(file.raw);
          console.log(this.imageUrl);
      }
    },
    async saveUserIcon(){
      this.formData=new FormData()
      this.$refs.upload.submit()
      let token=sessionStorage.getItem('token')
      this.formData.append('token',token)
      let {data:res}=await this.$http.post('admin/set_usericon',this.formData)
      if(res.meta.status!==200) return this.$message.error(res.meta.msg)
      sessionStorage.setItem('icon',this.imageUrl)
      this.user.icon=sessionStorage.getItem('icon')
      this.$message.success(res.meta.msg)
      this.userIconDialogVisible=false
    },
    uploadIcon(img){
      this.formData.append('pic',img.file)
    },
    // 退出登录
    quit(){
      this.user={}
      window.sessionStorage.removeItem('token')
      window.sessionStorage.removeItem('username')
      this.centerDialogVisible = false
    },
    // 跳转页面
    toAddHouse(){
      if(window.sessionStorage.getItem('token')==null){
        this.show=true
      }else{
        this.$router.push('/add_house')
      }
    },
    toMineRelease(){
      if(window.sessionStorage.getItem('token')==null){
        this.show=true
      }else{
        this.$router.push('/mine_release')
      }
    },
    toWishList(){
      if(window.sessionStorage.getItem('token')==null){
        this.show=true
      }else{
        this.$router.push('/wish')
      }
    },
   
    onLand(){
      this.$refs.loginFormRef.validate(async (bool,obj)=>{
        if(!bool) return this.$message.error("账号或密码错误")
        let {data:res}= await this.$http.post('admin/login',this.form)
        if(res.meta.status !==200 ) return this.$message.error("账号或密码错误")
        this.user=res.data
        this.$message.success("登陆成功")
        window.sessionStorage.setItem('icon',res.data.icon)
        window.sessionStorage.setItem('token',res.data.token)
        window.sessionStorage.setItem('username',res.data.username)
        this.show=false
      });
    },
    // 登录预验证
    login(){
      this.onLand()
    },
    // 登陆重置
    nextLogin(){
      this.form={
        username: '',
        password: ''
      }
      this.show=false
    },

  },

  mounted() {
    // 回车登陆
    let that=this
    document.onkeydown = function(ev){
      if(ev.keyCode===13){
        that.onLand()
      }
    }
  },
}
</script>

<style lang="less">
.box-mine{
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
  .mine_land{
    padding: 0 29px;
    .mine_hp{
      display: flex;
      align-items: center;
      height: 170px;
      padding-left: 30px;
      background-color: #f6a530;
      border-radius: 16px;
      .user_icon{
        display: flex;
        align-items: center;
      } 
      .user_reset_password{
        width: 100%;
        margin: 0 30px;
        font-size: 27px;
        color: aliceblue;
        display: flex;
        justify-content: space-between;
        
      }
    }
  }
  .mine_mid{
    padding: 50px 29px 0 29px;
  }
}




.van-popup{
  h2{
    line-height: 80px;
    text-align: center;
  }
  .login_form {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
  }
  .btns {
    display: flex;
    justify-content: flex-end;
  }
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  top: 0;
  left: 80px;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  position: relative;
  top: 75px;
  left: 0;
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>