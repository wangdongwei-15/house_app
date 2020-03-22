<template>
    <div class="house_item">
        <div class="item" v-for="item in houseList" :key="item.id">
            <div class="hs_item_lf"><img :src="item.coverurl" alt=""></div>
            <div class="hs_item_ri">
                <h4 class="hs_item_ri_tl">{{item.title}}</h4>
                <div class="hs_item_ri_ft">
                    <el-button type="primary" icon="el-icon-edit" size="mini" @click="houseEdit(item.id)"></el-button>
                    <el-button type="danger" icon="el-icon-delete" size="mini" @click="delHouse(item.id)"></el-button>
                    <el-button type="warning" icon="el-icon-setting" size="mini" @click="Detail(item.id)"></el-button>
                    <el-switch v-model="item.state" @change="updateHouseState(item)">
                    </el-switch>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:['getMore'],
    data() {
        return {
            houseList:[],
            last_page:0,
            page:1,
        }
    },
    created() {
        this.page=1
        this.getHousesList()
    },
    methods: {
        houseDetail(id){
            this.$router.push({
                path: '/house_detail',
                query: {
                    id
                }
            })
        },
        async getHousesList(){
            let url='house/list?page='+this.page
            let {data:res}= await this.$http.get(url)
            this.total=res.total
            this.last_page=res.last_page
            let newHouses= res.data
            newHouses.map(item=>{
                item.state =  item.state === 1 ? true : false
                return item
            })
            this.houseList.push(...newHouses) 
        },
        // 删除房源
        async delHouse(id){
            const confirmResult=await this.$confirm('是否永久删除当前房源信息','删除提示',{
                                                        confirmButtonText:'确认删除',
                                                        cancelButtonText:'取消',
                                                        type:'warning'
                                                    }).catch(err=>err)
            if(confirmResult=='cancel') return this.$message.info('已经取消删除')   
            let {data:res}= await this.$http.get(`/house/del/${id}`)
            if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
            this.$message.success(res.meta.msg)
            this.getHousesList()                                                     
        },
        // 修改房源状态
        async updateHouseState(house){
            let {data:res} = await this.$http.get('house/sale',{
                params:house
            })
            if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
            this.$message.success(res.meta.msg)
            this.getHousesList() 
        },
        // 房源详情页跳转
        Detail(id){
            this.$router.push({
                path: '/house_detail',
                query: {
                    id
                }
            })
        },
        // 编辑房源
        houseEdit(id){
            this.$router.push({
                path: '/house_edit',
                query: {
                    id
                }
            })
        },
    },
    watch : {

        getMore() {
            this.page=this.page+1
            console.log(this.page)
        if(this.page>this.last_page) return
        this.getHousesList()
        },

    },
}
</script>
<style lang="less">
.house_item{
    display: flex;
    flex-direction: column;
    .item{
        padding: 20px 0 34px;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px #eaeaea solid;
        .hs_item_lf img{
            width: 210px;
            height: 160px;
        }
        .hs_item_ri{
            width: 422px;
            height: 160px;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            .hs_item_ri_tl{
                margin: 0;
                height: 57px;
                line-height: 57px;
                font-size: 28px;
                font-weight: 800;
                overflow:hidden;
                word-break:keep-all;
                white-space:nowrap;
                text-overflow:ellipsis;
            }
            
            .hs_item_ri_ft{
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
        }
    }
}
.el-message-box__wrapper .el-message-box{
    width: 246px;
    height: 124px;
}
</style>