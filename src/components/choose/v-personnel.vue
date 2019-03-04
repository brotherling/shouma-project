<template>
<div class="div1">
        <v-header :header="parentMsg"></v-header>
            <div style="border-bottom:1px solid #ccc;">
            <yd-search  :on-submit="submitHandler"></yd-search>
            </div>
           <div class="personnel">
               <span @click="firstTo">联系人</span> <span style="margin-left:15px;">{{nextData}}</span>
           </div>

           <div v-if="showContent" style="height:100%;">
               <router-view></router-view>
           </div>
            <div class="search">
              <!-- <yd-cell-item v-for="lis in searchdata" :key="lis.userId" @click.native="callsearch(lis)">
                    <span slot="left">{{lis.userName}}</span>
                    <span slot="right">{{lis.userDeptName}}</span>
              </yd-cell-item> -->
                <group>
                    <cell v-for="lis in searchdata" @click.native="callsearch(lis)"  :title="lis.userName" :value="lis.userDeptName" :key="lis.deptId"></cell>
                </group>
           </div>
</div>
</template>
<script>
    export default{
        name:"personnel",
        data(){
            return{
                parentMsg:"人员选择页面",
                nextData:"",
                searchdata:[],
                delshow:true,
                data:{userDeptId:"",userDeptName:"",userId:"",userName:""},
                showContent:true,
            }
        },
                computed:{
        },
          beforeRouteLeave(to, from, next) {
            from.query.data = this.data;
            // 设置下一个路由的 meta
            next();
          },
        methods: {
            callsearch(e){
                    this.data=e
                     $(".restoring").trigger("click");
            },
            getData(){
                let Data={"menuId":"104","pageNumber":this.Number,"pageSize":"10","sortName":"PVD_A1_10","order":"desc","filter":"","param":this.param};

            },
            firstTo(){
            this.delshow=true;
            this.$router.replace({path:'/personnelRadio1'})
            },
            submitHandler(value){
                this.$http.get("/API/baseservice/GetUserByName",{params:{userName:value}},{ emulateJSON: true })
                .then(res => {
                    this.searchdata=res.data;
                    this.showContent=false;
                }
                )
            }
        },
        mounted(){
            this.$router.replace({path:'/personnelRadio1'})
        }
    }
</script>
<style>
.personnel{
    width:100%;
    /* height: 50px; */
    line-height: 50px;
    font-size:18px;
    color:#999;
    background:white;
    padding-left:10px;
    overflow-y:auto;
}
.search{
    width:100%;
    background:white;
    overflow-y: auto;
    height:70%;
    margin-top:10px;
    position: relative;
}
.search span{
    font-size:18px; /*no*/
}
.search>div{
    width:100%;
    position: absolute;
    top:0;
}
</style>
