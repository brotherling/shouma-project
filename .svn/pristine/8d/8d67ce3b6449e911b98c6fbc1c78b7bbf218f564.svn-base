<template>
<div class="div1">
  <v-header :header="head"></v-header>
    <section class="grcheck_stcok" @scroll="handleScroll($event)">
        <div class="grchck_stockcontent" @click="grcheck_click(item.ASM_C4_10,item.ASM_C4_05,item.ASM_C4_20,item.ASM_C4_1280,item.grCheckYY)" v-for="item in reviewdata" :key="item.ASM_C4_01">
            <div class="conttop"><span>批次编号:</span><span>{{item.pcCode}}</span></div>
            <div class="showdata">
                <div><span>资产编号:</span><span class="void">{{item.ASM_C4_20}}</span></div>
                <div><span>资产名称:</span><span class="void">{{item.ASM_C4_50}}</span></div>
                <div><span>资产分类:</span><span class="void">{{item.ASM_C4_85}}</span></div>
                <div><span>规格型号:</span><span class="void">{{item.ASM_C4_210}}</span></div>
            </div>
            <div v-if="item.ASM_C4_1280=='未核查'" class="grchck_stockImg1"></div>
            <div v-else-if="item.ASM_C4_1280=='已核查'" class="grchck_stockImg2"></div>
            <img v-if="item.imgUrl!=''&&item.imgUrl!=null" :src="imgurl+'/'+item.imgUrl" v-preview="imgurl+'/'+item.imgUrl" alt="" class="stockImg" preview-title-enable="false" preview-nav-enable="false">
        </div>
    </section>
    <div class="grcheck_foot">
        <div @click="click_nocheckImg"><i :class="nocheckImg"></i><br/>未核查</div>
        <span></span>
        <div @click="grcheck_imgsao"><i class="grcheck_imgsao"></i><br/>扫一扫</div>
        <span></span>
        <div @click="click_checkImg"><i :class="checkImg"></i><br/>已核查</div>
    </div>
</div>
</template>
<script>
    export default{
        name:"grcheck",
        data(){
            return{
                head:"个人核查",
                data:{
                filter:'{\"ASM_C4_1280\":\"未核查\"}',
                param:"",
                pageNumber:0,
                // pcId:this.$route.query.pcid
             },
                sclocl:true,
                reviewdata:[],
                RecordCount:"",
                nocheckImg:"grcheck_dianimgnocheck",
                checkImg:"grcheck_imgcheck",
                imgurl:resUrl,
            }
        },
        methods:{
            grcheck_imgsao(){
                this.saoma(this.getdata);
            },
            grcheck_click(assetdid,pcid,assetTag,state,grCheckYY){
                this.$router.push({path:"/grcheckList",query:{assetid:assetdid,pcid:pcid,assetTag:assetTag,state:state,grCheckYY:grCheckYY}})
            },
            click_nocheckImg(){
                this.reviewdata=[];
                this.data.pageNumber=0
                this.data.filter='{\"ASM_C4_1280\":\"未核查\"}';
                this.nocheckImg="grcheck_dianimgnocheck";
                this.checkImg="grcheck_imgcheck";
                this.getdata();
            },
            click_checkImg(){
                this.reviewdata=[];
                this.data.pageNumber=0
                this.data.filter='{\"ASM_C4_1280\":\"已核查\"}';
                this.nocheckImg="grcheck_imgnocheck";
                this.checkImg="grcheck_dianimgcheck";
                this.getdata();
            },
         getdata(e){
             if(e!=undefined){
                this.data.param=e;
                this.reviewdata=[];
                this.data.pageNumber=0
             }
             this.scloll=false;
                let Data= {
                    menuId: this.$route.query.id,
                    pageNumber:this.data.pageNumber,
                    pageSize: "10",
                    sortName: "ASM_C4_20",
                    order:"desc",
                    filter:this.data.filter,
                    param:this.data.param
                    
                };
            this.$http.get("/API/stockservice/GetStockGrList",
                {params:{data:JSON.stringify(Data)}},
                { emulateJSON: true })
                .then(res => {
                    this.RecordCount=res.data.RecordCount;
                        res.data.List.forEach(function(element) {
                        this.reviewdata.push(element);
                        }, this);
                this.scloll=true;
            })
         },

        handleScroll(e) {
            let $el = e.target;
            let num=this.data.pageNumber;
            if ($el.scrollTop + $el.offsetHeight == $el.scrollHeight) {
                num += 10;
                if (num > this.RecordCount+1) {
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
        },
        created() {
            if(this.$route.query.check !=undefined){
                this.click_checkImg();
            }
            if(this.$route.query.saoma !=undefined){
                this.getdata(this.$route.query.saoma)
            }else{
                this.getdata()
            }
        },
    }
</script>
<style>
.grcheck_imgnocheck{
    display:inline-block;
    background:url("../../assets/nocheck.png") no-repeat;
    width:28px;
    height:28px;
    background-size: cover;
}
.grcheck_imgcheck{
    display:inline-block;
    background:url("../../assets/check.png") no-repeat;
    width:28px;
    height:28px;
    background-size: cover;
}
.grcheck_dianimgnocheck{
    display:inline-block;
    background:url("../../assets/dianNocheck.png") no-repeat;
    width:28px;
    height:28px;
    background-size: cover;
}
.grcheck_dianimgcheck{
    display:inline-block;
    background:url("../../assets/dianCheck.png") no-repeat;
    width:28px;
    height:28px;
    background-size: cover;
}
.grcheck_img{
    width:28px;
    height:28px;
    display:inline-block;
}
.grcheck_imgsao{
    display:inline-block;
    background:url("../../assets/shaoma.png") no-repeat;
    width:28px;
    height:28px;
        background-size: cover;
}
.grcheck_foot{
    height:10%;
    display:flex;
    align-items: center;
    border-top:1px solid #ccc;
}
.grcheck_foot div{
    color:#666;
    text-align:center;
    margin:0 51px;
}
.grcheck_foot span{
    display:inline-block;
    width:1px /*no*/;
    height:40px;
    background:#ccc;
}
.grcheck_stcok{
    height:77%;
    overflow-y: auto;
}
.stockImg{
    width:80px;
    height: 80px;
    position: absolute;
    right: 20px;
    bottom:20px;
}
.grchck_stockcontent{
    width:90%;
    margin-left:5%;
    height: 180px;
    background:white;
    margin-top:15px;
    padding:2% 3%;
      border: 0px solid #ccc;
  border-radius: 5px;
  box-shadow: 1px 1px 1px 2px #eee; /* no*/
  font-size:17px;
  padding-bottom:0px;
  position: relative;
}
.grchck_stockcontent:last-child{
    margin-bottom:15px;
}
.showdata{
    margin-top:10px;
}
.showdata div{
    line-height: 32px;
    color:#989898;
    font-size: 15px;
}
.grchck_stockImg1{
  position: absolute;
  top: 0;
  right: 0;
  width: 70px;
  height: 25px;
  background: url("../../assets/tuNocheck.png") no-repeat;
  background-size: cover;
}
.grchck_stockImg2{
  position: absolute;
  top: 0;
  right: 0;
  width: 70px;
  height: 25px;
  background: url("../../assets/tuCheck.png") no-repeat;
  background-size: cover;
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
.void{
    margin-left:5px;
}
</style>

