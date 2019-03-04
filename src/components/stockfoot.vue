<template>
    <div class="foot">
        <ul>
            <li @click="clickfood(dix.name)" v-for="dix in fontdata" :key="dix.name"><span :class="dix.class"></span><span>{{dix.name}}</span></li>
        </ul>
    </div>
</template>
<script>
export default {
    name:'stockfoot',
    props:{pcId:"",planId:"",toggleIndex:""},
    data () {
        return {
            fontdata:[{name:"批次明细",class:"TopImg5"},{name:"统计",class:"TopImg1"},{name:"盘点",class:"TopImg2"},{name:"盘盈",class:"TopImg3"},{name:"盘盈明细",class:"TopImg4"}]
        }
    },
    methods:{
        clickfood(name){
            switch(name){
                case "统计":this.$router.push({path:'/stockchart/',query:{"pcid":this.pcId,"name":"盘点明细统计","planId":this.planId}});this.toggleclass(1);break;
                case "盘点":this.SweepCode();break;
                case "盘盈":this.$router.push({path:'/assetprofit/',query:{"pcid":this.pcId,"planId":this.planId}});this.toggleclass(2);;break;
                case "批次明细":this.$router.push({path:'/StockDetailList/',query:{"pcid":this.pcId}});this.toggleclass(5);break;
                case "盘盈明细":this.$router.push({path:'/inventoryDetails/',query:{"pcid":this.pcId,"planId":this.planId}});this.toggleclass(4);break;
            }
        },
        port(e){
            let Data={"pcId":this.pcId,"assetCode":e}
            this.$http.get("/API/stockservice/IsExitAsset",
             {params:{data:JSON.stringify(Data)}},
                { emulateJSON: true })
                .then(res => {
                    if(res.data.resultNum=="-1" || res.data.resultNum=="-2"){
                          this.$dialog.confirm({ mes:res.data.resultMsg, title:'提示',opts:[{
                              txt:"是",
                              color:false,
                              callback:()=>{
                                this.$router.push({path:'/assetprofit/',query:{"pcid":this.pcId,"planId":this.planId,"assetCode":e,"Id":res.data.baseMeno1}})
                              }
                          },
                          {
                              txt:"否",
                              color:false,
                              callback:()=>{
                                this.$message({
                                    type: 'info',
                                    message: '停留在此页面'
                                });
                              }   
                    }]
                })
                    }
                    else{
                        this.$router.push({path:'/assetInventory/',query:{pcid:this.pcId,assetid:res.data.baseMeno1,serial:e,state:res.data.baseMeno2}})
                    }
            })
        },
        SweepCode(){
            this.saoma(this.port)
        },
        toggleclass(i){
            switch(i){
            case 1:
            this.fontdata[1].class="TopImg1d"
            $(".foot ul li").eq(1).children().eq(1).addClass("SizeColor");           
            break;
            case 2:
            this.fontdata[3].class="TopImg3d"
            $(".foot ul li").eq(3).children().eq(1).addClass("SizeColor");    
            break;
            case 4:
            this.fontdata[4].class="TopImg4d"
            $(".foot ul li").eq(4).children().eq(1).addClass("SizeColor");              
            break;
            case 5:
            this.fontdata[0].class="TopImg5d"
            $(".foot ul li").eq(0).children().eq(1).addClass("SizeColor");               
            break;
        }
        }
    },
    mounted(){
        this.toggleclass(this.toggleIndex);
    }
}
</script>
<style scoped>
.foot {
  height: 10%;
  width: 100%;
  border-top: 1px solid #ccc;
  position: fixed;
  bottom: 0;
  background: #fbfcff;
}
.foot ul {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.foot ul li {
  height: 100%;
  list-style: none;
  color: #a3a4a7;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 16px;
}
.TopImg1 {
  width: 30px;
  height: 30px;
  background: url("../assets/tongji.png") no-repeat;
  background-size: cover;
  display: inline-block;
}
.TopImg2 {
  width: 30px;
  height: 30px;
  background: url("../assets/shaoma.png") no-repeat;
  background-size: cover;
  display: inline-block;
}
.TopImg3 {
  width: 30px;
  height: 30px;
  background: url("../assets/panyin.png") no-repeat;
  background-size: cover;
  display: inline-block;
}
.TopImg4 {
  width: 30px;
  height: 30px;
  background: url("../assets/panyingmx.png") no-repeat;
  background-size: cover;
  display: inline-block;
}
.TopImg5 {
  width: 30px;
  height: 30px;
  background: url("../assets/picimx.png") no-repeat;
  background-size: cover;
  display: inline-block;
}
.TopImg1d {
  width: 30px;
  height: 30px;
  background: url("../assets/tongjidj.png") no-repeat;
  background-size: cover;
  display: inline-block;
}
.TopImg3d {
  width: 30px;
  height: 30px;
  background: url("../assets/panyingdj.png") no-repeat;
  background-size: cover;
  display: inline-block;
}
.TopImg4d {
  width: 30px;
  height: 30px;
  background: url("../assets/panyingmxdj.png") no-repeat;
  background-size: cover;
  display: inline-block;
}
.TopImg5d {
  width: 30px;
  height: 30px;
  background: url("../assets/picimxdj.png") no-repeat;
  background-size: cover;
  display: inline-block;
}
</style>
