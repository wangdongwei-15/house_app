<template>
    <div class="box_addHouse">
        <div class="uploader ">
            <h4>创建房源</h4>
            <div class="addHouse_main">
                <el-form ref="addFormHouse" :model="addHouseForm" label-width="100px">

                    <el-form-item label="房源名称">
                        <el-input v-model="addHouseForm.title"></el-input>
                    </el-form-item>
                    <el-form-item label="房源详情">
                        <el-input v-model="addHouseForm.des" type="textarea"></el-input>
                    </el-form-item>
                    <el-form-item label="产权人姓名">
                        <el-input v-model="addHouseForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="产权人电话">
                        <el-input v-model="addHouseForm.tel"></el-input>
                    </el-form-item>

                    <el-form-item label="上传图片">
                        <van-uploader v-model="fileList" :after-read="afterRead" :max-count="6" multiple/>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="addHouse">立即创建</el-button>
                    </el-form-item>

                </el-form>
            </div>
        </div>
    </div>
</template>
<script>
import Vue from 'vue'
import { Uploader } from 'vant'

Vue.use(Uploader)
export default {

    data() {
        return {
            addHouseForm:{
                title:'',
                des:'',
                name:'',
                tel:''
            },
            formData:{},
            fileList:[],
        }
    },
    created() {
        this.$emit('return',3)
        this.formData= new FormData()
    },
    methods: {
        
        // 创建房源
        afterRead(file){
            for (const item of file) {
                let res =item.file
                this.formData.append("pic[]",res)
            }
        },
        async addHouse(){
            this.formData.append("form",JSON.stringify(this.addHouseForm));
            let {data:res}=await this.$http.post('house/create',this.formData)
            if(res.meta.status!==200) return this.$message.error('房源发布失败') 
            this.$message.success(res.meta.msg)
            this.$router.push('/')
        },

    },

}
</script>
<style lang="less" scoped>
.box_addHouse{
    padding: 50px 0px 0 0;
    .uploader{

        h4{
            padding-left: 20px;
            font-size: 29px;
            line-height: 96px;
        }
        .addHouse_main{
            padding-right: 100px; 
            .van-uploader{
                width: 264px;
            }
        }
    }
}
</style>