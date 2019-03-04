<template>
<div class="div1">
      <v-header :header="head"></v-header>
         <searchbar :serial="serial" :data="data" :clicksearch="Detailssearch" :titledata="titledata"></searchbar>
         <section class="detailcontent" @scroll="DetailScroll($event)">
             <div class="detail">
             <div :id="details.id" class="contset" v-for="(details,index) in inventdetaildata" :key="details.id">
                 <ul>
                     <li><span>条码:</span><span>{{details.ASM_PY_60}}</span></li>
                     <li><span>名称:</span><span>{{details.ASM_PY_70}}</span></li>
                     <li><span>数量:</span><span>{{details.ASM_PY_110}}</span></li>
                     <li><span>盘盈说明:</span><span>{{details.ASM_PY_90}}</span></li>
                     <li><span>规格型号:</span><span>{{details.ASM_PY_100}}</span></li>
                     <li><span>存放位置:</span><span>{{details.ASM_PY_120}}</span></li>
                     <li><span>盘盈原因:</span><span>{{details.ASM_PY_80}}</span></li>
                    <li class="AppendImg"><span>图片:</span><img v-preview="'data:image/jpeg;base64,'+detimg" :src="'data:image/jpeg;base64,'+detimg" preview-title-enable="false" preview-nav-enable="false" v-for="(detimg,i) in details.imgUrl" :key="i" alt=""></li>
                 </ul>
            <div v-if="details.statuName=='盘盈'" class="stockImg3"></div>
            <div v-else-if="details.statuName=='盘溢'" class="stockImg4"></div>
             </div>
             </div>
         </section>
    <stockfoot :pcId="data.pcId" :planId="planId" :toggleIndex="4"></stockfoot>
</div>
</template>
<script>
import searchbar from "../../components/searchbar.vue"
import stockfoot from "../../components/stockfoot.vue"
    export default{
        name:"inventoryDetails",
        components:{searchbar,stockfoot},
        data(){
            return{
                planId:this.$route.query.planId,
            data:{
                filter:"",
                param:"",
                pageNumber:0,
                pcId:this.$route.query.pcid
             },
                serial:[{name:"全部"},{name:"盘盈"},{name:"盘溢"}],
                head:"盘盈明细",
                titledata:"盘点状态",
                scollor:false,
                inventdetaildata:[],
                RecordCount:""
            }
        },
        methods:{
            DetailsGetdata(){
                this.scloll=false;
                let Data= {
                    pcId: this.data.pcId,
                    pageNumber:this.data.pageNumber,
                    pageSize: "10",
                    sortName: "ASM_PY_40",
                    order:"desc",
                    filter:this.data.filter,
                    param:this.data.param
                };
                this.$http.get("/API/stockservice/GetPwinList",
                    {params:{data:JSON.stringify(Data)}},
                    { emulateJSON: true })
                    .then(res => {
                    let detdata=JSON.parse(res.data)
                        detdata.rows.forEach(function(element) {
                        let data=element;
                        if(element.imgUrl!=""){
                         data.imgUrl=element.imgUrl.split(",");
                        }
                        this.inventdetaildata.push(data);
                        }, this);
                    this.scloll=true;
                    this.RecordCount=detdata.total
                })
            },
            DetailScroll(e){
            let $el = e.target;
            let num=this.data.pageNumber;
            if ($el.scrollTop + $el.offsetHeight == $el.scrollHeight) {
                if (num > this.RecordCount/10) {
                this.$message({
                    message: "数据已经全部加载完",
                    type: "warning"
                });
                return;
                }else{
               if (this.scloll) {
                    this.data.pageNumber+=1;
                    this.DetailsGetdata();
                }
                }
 
            }
            },
            Detailssearch(){
            this.data.pageNumber=0;
             this.inventdetaildata=[];
                this.DetailsGetdata();
            }
        },
        mounted(){
            this.DetailsGetdata();
        }
    }
</script>
<style>
.detailcontent{
    width:100%;
    height:65%;
    overflow-y: auto;
}
.contset{
    margin-top: 15px;
    width:90%;
    margin-left:5%;
  height:auto;
  border: 0px solid #ccc;
  border-radius: 5px;
  box-shadow: 1px 1px 10px 5px #eee; /* no*/
  background: white;
  overflow: hidden;
  position: relative;
  padding:2% 2%;
}
.contset:last-child{
    margin-bottom:15px;
}
.contset ul li{
    height: 38px;
    line-height: 38px;
    display: flex;
    align-items: center;
    font-size:16px;
}
.contset ul li span:first-child{
    width:85px;
    text-align: right;
    display:inline-block;
    margin-right:10px;
}
.contset ul li img{
    width:45px;
    height: 45px;
    margin-left:15px;
    margin-top:5px;
}
.stockImg3{
  position: absolute;
  top: 0;
  right: 0;
  width: 70px;
  height: 25px;
  background: url("../../assets/panying.png") no-repeat;
  background-size: cover;
}
.stockImg4{
  position: absolute;
  top: 0;
  right: 0;
  width: 70px;
  height: 25px;
  background: url("../../assets/panyi.png") no-repeat;
  background-size: cover;
}
</style>
