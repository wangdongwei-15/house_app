<template>
    <div class="house_item">
        <div class="item" v-for="item in houseList" :key="item.id" @click="houseDetail(item.id)">
            <div class="hs_item_lf"><img :src="item.coverurl" alt=""></div>
            <div class="hs_item_ri">
                <h4 class="hs_item_ri_tl">{{item.title}}</h4>
                <div class="details"> <div class="details_item"> <p>2室一厅</p> <span>|</span> </div><div class="details_item"> <p>2室一厅</p> <span>|</span> </div> </div>
                <div class="hs_item_ri_ft"> <h4> 65万</h4> <P>12560元/平方米</P> </div>
            </div>
        </div>
    </div>
</template>
<script>

export default {

    props: ['houseList'],

    data(){
        return {

        }
    },

    created(){
        
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
    },
}
</script>
<style lang="less" scoped>
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
            .details{
                font-size: 24px;
                display: flex;
                .details_item{
                    display: flex;
                    p{
                        margin: 0;
                        height: 52px;
                        line-height: 52px;
                    }
                    span{
                        margin: 6px 10px 0;
                    }
                }
                .details_item:last-child span{
                    display: none;
                }
            }
            .hs_item_ri_ft{
                display: flex;
                h4{
                    margin: 0 12px 0 0;
                    font-size: 26px;
                    height: 51px;
                    line-height: 51px;
                    font-weight: normal;
                    color: #f41242;
    
                }
                P{
                    margin: 0;
                    font-size: 24px;
                    height: 51px;
                    line-height: 51px;
                }
            }
        }
    }
}

</style>