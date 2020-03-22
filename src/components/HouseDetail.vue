<template>
    <div class="housedetail">
        <div class="swipe" v-if="houseDetail.imgs">
            <van-swipe :autoplay="1000" indicator-color="white">
                    <van-swipe-item v-for="imgUrl in houseDetail.imgs" :key="imgUrl"><img :src="imgUrl"/></van-swipe-item>
            </van-swipe>
        </div>
        <div class="hd_content">
            <div class="hd_content_hd">
                <h2>{{houseDetail.title}}</h2>
                <div class="content_hd_ri" @click="onLike">
                    <van-rate v-model="like" :count="1" icon="like" void-icon="like-o"/>
                </div>
            </div>
            <div class="hd_content_mid">
                <h4>房源详情</h4>
                <div class="content_mid_text"  @click="onCilck"><p :class="boxThr?'box_thr':''">房源详情房源详情房源详情房源详情房源详情房源详情房源详情房源详情房源详情房源详情房源详情房源详情房源详情房源详情房源详情房源详情房源详情房源详情房源详情房源详情房源详情房源详情房源详情房源详情房源详情房源详情房源详情房源详情</p></div>
            </div>
            <div class="hd_content_ft">
                <p>发布人姓名：{{houseDetail.name}}</p>
                <p>发布人电话：{{houseDetail.tel}}</p>
                <p>发布 时间：{{houseDetail.created_at}}</p>
            </div>
        </div>
    </div>
</template>
<script>
import Vue from 'vue'
import { Swipe, SwipeItem, Rate } from 'vant'

Vue.use(Swipe).use(SwipeItem).use(Rate)
export default {
    data() {
        return {
            id:0,
            houseDetail:{},
            boxThr:true,
            like:0,
            likeTY:false
        }
    },
    created() {
        let id=this.$route.query.id
        this.getHouseDetail(id)
        this.first(id)
    },
    methods: {

        async first(id){
            let token = sessionStorage.getItem('token')
            let {data:res}= await this.$http.post('admin/my_likes',{token})
            for (const item of res.data.data) {
                if(item.id==id){
                    this.likeTY=true
                    this.like=1
                }
            }
        },

        async getHouseDetail(id){
            let {data:res} = await this.$http.get('/house/detail/'+id)
            this.houseDetail=res
        },

        onCilck(){
            this.boxThr=!this.boxThr
        },

        async onLike(){
            let id=this.$route.query.id
            let token=sessionStorage.getItem('token')
            this.likeTY=!this.likeTY
            if(this.likeTY){
                this.like=1
                let {data:res}=await this.$http.post('admin/like',{id,token})
                if(res.meta.status!==200) return this.$message.error(res.meta.msg)
                this.$message.success(res.meta.msg)
            }else{
                this.like=0
                let {data:res}=await this.$http.post('admin/unlike',{id,token})
                if(res.meta.status!==200) return this.$message.error(res.meta.msg)
                this.$message.success(res.meta.msg)
            }
        },
    },
}
</script>
<style lang="less" scoped>
.housedetail{

    .swipe{
        height: 560px;
        padding: 20px;
        box-sizing: border-box;
        .van-swipe{
            width: 100%;
            height: 100%;
            img{
                width: 100%;
                height: 100%;
            }
        }
    }
    .hd_content{
        padding: 0 30px;
        .hd_content_hd{
            display: flex;
            justify-content: space-between;
            align-items: center; 
            border-bottom: 1px #eaeaea solid;
            h2{
                height: 128px;
                line-height: 128px;
                font-size: 28px;
                font-weight: 700; 
            }
            .content_hd_ri{
                width: 50px;
                height: 50px;
                line-height: 50px;
                text-align: center;
            }
        }
        .hd_content_mid{

            h4{
                height: 116px;
                line-height: 116px;
                font-size: 28px;
                font-weight: 500;
            }
            .content_mid_text{
                line-height: 62px;
                font-size: 28px;
            }    
        }
        .hd_content_ft{
            margin-top: 20px;
            text-align: right;
            line-height: 50px;
            font-size: 28px;
        }
    }
    // .box_thr
}
.box_thr{
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3; //需要控制的文本行数
    overflow: hidden;
}
</style>