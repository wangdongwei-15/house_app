<template>
    <div class="box_addHouse">
        <div class="uploader ">
            <h4>编辑房源</h4>
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
                        <el-upload
                            ref="upload"
                            action="house/upload"
                            list-type="picture-card"
                            :http-request="upLoad"
                            :on-preview="handlePictureCardPreview"
                            :file-list="fileList"
                            :before-remove="beforeRemove"
                            :on-remove="handleRemove"
                            :auto-upload="false"
                            multiple>
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible">
                            <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="addHouse">确认修改</el-button>
                    </el-form-item>

                </el-form>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            addHouseForm:{
                id:0,
                title:'',
                des:'',
                name:'',
                tel:''
            },
            formData:{},
            dialogImageUrl: '',
            dialogVisible: false,
            fileList:[]
        }
    },
    methods: {
        
        // 创建房源
        upLoad(file){
            this.formData.append("pic[]",file.file)
        },
        handlePictureCardPreview(file){
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        async addHouse(){
            this.formData= new FormData()
            this.$refs.upload.submit()
            console.log(this.addHouseForm)
            this.formData.append("form",JSON.stringify(this.addHouseForm));
            let {data:res}=await this.$http.post('house/save_edit',this.formData)
            if(res.meta.status!==200) return this.$message.error('房源发布失败') 
            this.$message.success(res.meta.msg)
            this.$refs.upload.clearFiles()
            this.$router.push('/mine_release')
        },

        // 删除图片
        beforeRemove(file){
            let img = file.url.split('upload/')[1]
            let id=this.addHouseForm.id
            this.$http.post('house/del_img',{
                img,id
            }).then(res=>{
                if(res.data.meta.status !==200 ){
                    this.$message.error('图片删除失败')
                    return false
                }
            })
        },
        handleRemove(){this.$message.success('图片删除成功')},
    },
    async created() {
        this.$emit("users","/add_house")
        let id =this.$route.query.id
        let {data:res}=await this.$http.get('/house/detail/'+id)
        this.addHouseForm=res
        res.imgs.map(item=>{
            let obj={}
            obj.url=item
            this.fileList.push(obj)
        })
    },
}
</script>
<style lang="less">
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
            
        }
    }
}
.el-form-item__content{
    width: 264px;
}
.el-form-item__content .el-upload-list--picture-card .el-upload-list__item{
    width: 80px;
    height: 80px;
}
.el-form-item__content .el-upload--picture-card{
    width: 80px;
    height: 80px;
    .el-icon-plus{
        position: relative;
        top: -30px;
        left: 0;
    }
}
</style>