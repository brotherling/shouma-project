<template>
<div class="div1">
  <v-header :header="header"></v-header>
   <searchbar :serial="serial" :clicksearch="clicksearch" :data="data" :titledata="titledata">
   </searchbar>
   <section class="batchtent" @scroll="handleScroll($event)">
        <div class="content" @click="clickstock(item.ASM_B8_10,item.ASM_B8_30)" v-for="item in reviewdata" :key="item.ASM_B8_10">
            <div class="conttop"><span>批次编号:</span><span>{{item.ASM_B8_30}}</span></div>
            <el-row class="contmiddle">
                <el-col :span="12"><span>计划编号:</span><span>{{item.ASM_B8_26}}</span></el-col>
                <el-col :span="12" class="interspace"><span>盘点依据:</span><span>{{item.ASM_B8_110}}</span></el-col>
                <el-col :span="12"><span>盘点部门:</span><span>{{item.str45Name}}</span></el-col>
                <el-col :span="12" class="interspace"><span>盘点人:</span><span>{{item.str40Name}}</span></el-col>
                <el-col :span="12"><span>盘点备注:</span><span>{{item.ASM_B8_60}}</span></el-col>
        </el-row>
        <div class="contbottom">
            <div><span>应盘:</span>{{item.ypNumber}}</div>
            <div><span>已盘:</span>{{item.spNumber}}</div>
        </div>
        <div class="batchImg"></div>
            <div v-if="item.str140Name=='新增'" class="batchImgadd"></div>
            <div v-else-if="item.str140Name=='盘点完成'" class="batchImgwc"></div>
            <div v-else-if="item.str140Name=='盘点中'" class="batchImgz"></div>
       </div>
   </section>
  <v-foot></v-foot>
</div>
</template>
<script>
import searchbar from "../../components/searchbar.vue"
 export default{
     components:{searchbar},
     name:"reviewbatch",
     data(){
         return{
             serial:[{name:"全部"},{name:"新增"},{name:"盘点中"},{name:"盘点完成"}],
             juegeImg:[true,false,false,false],
             header:this.$route.query.name,
             reviewdata:[],
             data:{
                filter:"",
                param:"",
                pageNumber:0
             },
             RecordCount:"",
            scloll:"true",
            titledata:"批次编号",
         }
     },
     methods:{
         getdata(){
             this.scloll=false;
                let Data= {
                    menuId: this.$route.query.id,
                    pageNumber:this.data.pageNumber,
                    pageSize: "10",
                    sortName: "ASM_B8_30",
                    order:"desc",
                    filter:this.data.filter,
                    param:this.data.param
                };
            this.$http.get("/API/stockservice/GetListPC",
                {params:{data:JSON.stringify(Data)}},
                { emulateJSON: true })
                .then(res => {
                     let data = JSON.parse(res.data);
                     this.RecordCount=data.total;//res.data.RecordCount;
                         data.rows.forEach(function(element) {
                        this.reviewdata.push(element);
                        }, this);
                this.scloll=true;
            })
         },
         clicksearch(){
             this.data.pageNumber=0;
             this.reviewdata=[];
             if(this.data.filter.indexOf("str140Name")==-1){
            this.data.filter=JSON.stringify({"str140Name":this.data.filter});
             }
             this.getdata();
         },
          handleScroll(e) {
            let $el = e.target;
            let num=this.data.pageNumber;
            if ($el.scrollTop + $el.offsetHeight == $el.scrollHeight) {
                num += 10;
                if (num > this.RecordCount+10) {
                this.$message({
                    message: "数据已经全部加载完",
                    type: "warning"
                });
                return;
                }
                if (this.scloll) {
                    this.data.pageNumber=num;
                    this.getdata();
                }
            }
        },
        clickstock(id){
        this.$router.push({path:'/StockDetailList',query:{pcid:id}})
        }
     },
     created() {
       this.getdata();
     }
 }    
</script>
<style>
.batchtent{
    height:65%;
    overflow-y: auto;
}
.content{
    width:90%;
    margin-left:5%;
    /* height: 250px; */
    background:white;
    margin-top:15px;
    padding:1% 3%;
      border: 0px solid #ccc;
  border-radius: 5px;
  box-shadow: 1px 1px 1px 2px #eee; /* no*/
  font-size:17px;
  padding-bottom:0px;
  position: relative;
}
.contmiddle{
    margin-top:5px;
}
.contmiddle .el-col{
    color:#989898;
    line-height: 28px;
    font-size: 15px;
}
.contbottom{
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 95%;
    border-top: 1px solid #ccc;
    height:30px;
}
.interspace{
    padding-left:10px;
    }
.batchImgwc{
  position: absolute;
  top: 0;
  right: 0;
  width: 70px;
  height: 25px;
  background: url("../../assets/accomplish.png") no-repeat;
  background-size: cover;
}
.batchImgz{
  position: absolute;
  top: 0;
  right: 0;
  width: 70px;
  height: 25px;
  background: url("../../assets/underway.png") no-repeat;
  background-size: cover;
}
.batchImgadd{
  position: absolute;
  top: 0;
  right: 0;
  width: 70px;
  height: 25px;
  background: url("../../assets/Added.png") no-repeat;
  background-size: cover;
}
</style>

