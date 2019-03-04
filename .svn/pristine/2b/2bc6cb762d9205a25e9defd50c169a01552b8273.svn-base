<template>
  <div class="div1">
  <v-header :header="head"></v-header>
  <section class="profit">
      <div class="profittop">基本信息</div>
          <yd-cell-group>
        <yd-cell-item>
            <span slot="left">盘点原因</span>
            <yd-input slot="right" type="text" placeholder="请输入" v-model="profitform.ASM_PY_80"/>
        </yd-cell-item>
        <yd-cell-item>
            <span slot="left">资产条码</span>
            <yd-input slot="right" type="text" placeholder="请输入" v-model="profitform.ASM_PY_60"/>
        </yd-cell-item>
        <yd-cell-item>
            <span slot="left">资产名称</span>
            <yd-input slot="right" type="text" required ref="ASM_PY_70" placeholder="请输入" v-model="profitform.ASM_PY_70"/>
        </yd-cell-item>
        <yd-cell-item>
            <span slot="left">盘盈说明</span>
            <yd-input slot="right" type="text" placeholder="请输入" v-model="profitform.ASM_PY_90" />
        </yd-cell-item>
        <yd-cell-item>
            <span slot="left">规格型号</span>
            <yd-input slot="right" type="text" placeholder="请输入" v-model="profitform.ASM_PY_100" />
        </yd-cell-item>
        <yd-cell-item>
            <span slot="left">数量</span>
            <yd-input slot="right" type="number" placeholder="请输入" v-model="profitform.ASM_PY_110" />
        </yd-cell-item>
        <yd-cell-item>
            <span slot="left">存放位置</span>
            <yd-input slot="right" type="text" placeholder="请输入" v-model="profitform.ASM_PY_120"/>
        </yd-cell-item>
    </yd-cell-group>
    <div class="profitBottom">
        <div>资产图片</div>
        <div id="addimg">
           <img  v-preview="showimg.img" :src="showimg.img" alt="" v-for="showimg in profitimg" :key="showimg.id"  preview-title-enable="false" preview-nav-enable="false">
        </div>
    </div>
  </section>
    <div class="profitassetrule" v-if="pic">
          <el-button @click="submit()" style="width:60%;" type="primary" icon="mackimg">保存</el-button>
          <el-button  style="width:36%;" type="primary" icon="photographimg">拍照</el-button>
          <input  @change="selectpick($event)" class="Imgupload" type="file" accept="image/*" capture="camera" multiple/>
      </div>
        <div class="profitassetrule" v-else style="z-index:2000">
          <el-button @click="submit()" style="width:60%;background:#409EFF;height:35px;" type="primary">保存</el-button>
          <yd-button style="width:36%;background:#409EFF;display:inline-block;height:35px;"  @click.native="show1 = true" size="large">拍照</yd-button>
        <yd-actionsheet :items="myItems1" v-model="show1" cancel="取消"></yd-actionsheet>
      </div>
            <stockfoot :pcId="profitform.pcId" :planId="profitform.planId" :toggleIndex="2"></stockfoot>
  </div>
</template>
<script>
import stockfoot from "../../components/stockfoot.vue"
    export default{
        name:'assetprofit',
        components:{stockfoot},
        data(){
            return{
                head:"盘盈资产",
                profitform:{"ASM_A1_10":this.$route.query.Id,"pcId":this.$route.query.pcid,"ASM_PY_60":this.$route.query.assetCode,"ASM_PY_70":"","ASM_PY_80":"","ASM_PY_110":"","ASM_PY_90":"","ASM_PY_100":"","ASM_PY_120":"","planId":this.$route.query.planId,"imgData":[]},
                profitimg:[],
                showimg:[],
                pic:"",
                show1: false,
                myItems1: [
                    {
                        label: '拍照',
                        callback: () => {
                            this.getImage();
                            let that =this;
                            global.bus.$off("global.img");
                            global.bus.$on("global.img",function(val){
                            that.profitform.imgData.push({"img":val});
                            that.profitimg.push({"img":val,"id":""})
                            });
                        }
                    },
                    {
                        label: '从相册中偷取',
                        callback: () => {
                            let a=this.galleryImg();
                            let that =this;
                            global.bus.$off("global.img");
                            global.bus.$on("global.img",function(val){
                            that.profitform.imgData.push({"img":val});
                            that.profitimg.push({"img":val,"id":""})
                            });
                
                        }
                    }
                ]
            }
        },
        methods:{
            selectpick(event){
                var obj=event.target;
                 var fl=obj.files.length;
                 var that=this;
                for(var i=0;i<fl;i++){
                var file=obj.files[i];  
                var size=(obj.files[i].size/1024/1024).toFixed("3")
                var reader = new FileReader();  
                    //读取文件过程方法  
                    reader.onload = function (e) {
                        compress(e.target.result,size,function(e){
                            that.profitform.imgData.push({"img":e});
                            that.profitimg.push({"img":e,"id":size})
                            }
                        )
                    }  
                    reader.readAsDataURL(file);   
                } 
            },
            submit(){
            let Data={"pcId":this.profitform.pcId,"assetCode":this.profitform.ASM_PY_60}
            this.$http.get("/API/stockservice/IsExitAsset",
             {params:{data:JSON.stringify(Data)}},
                { emulateJSON: true })
                .then(res => {
                    if(res.data.resultNum=="-1" || res.data.resultNum=="-2"){
                                this.profitform.ASM_A1_10=res.data.baseMeno1;
                                    if(this.$refs.ASM_PY_70.valid){
                                    let data=JSON.stringify(this.profitform);
                                    this.$http.post("/API/stockservice/AddPwin",
                                        {'':data},
                                        { emulateJSON: true })
                                        .then(res => {
                                            if(res.data.resultNum>0){
                                            this.$message("保存成功");
                                            this.$router.go(-1);
                                            }
                                        }).catch(v=>{
                                            });
                                    }else{
                                        this.$message({
                                            message: "资产名称不能为空",
                                            type: "warning"
                                        });
                                        }  
                        }else{
                            this.$dialog.alert({mes:res.data.resultMsg});
                        }
                })
        }
        },
        mounted(){
            this.judge();
            this.pic=global.picth;
        }
    }
</script>
<style>
.div1{
    background:white;
}
.profit{
    width:90%;
    margin:1% auto;
}
.profittop{
    margin-top: 15px;
    height: 30px;
    line-height: 30px;
    padding-left: 15px;
    border-bottom: 1px solid #ccc;
    font-size:16px;
    font-weight: 600;
}
.profit .yd-cell-left span:nth-child(2){
    text-align: right;
    display:inline-block;
    width:70px;
}
.profit .yd-cell-right input,input[type=number]{
    text-align:right !important;
}
.profitBottom{
    height:100px;
    display:flex;
    padding-left:25px;
    align-items: center;
}
.profitBottom div{
    float: left;
}
#addimg{
    flex: 1;
    margin-left:5px;
}
#addimg img{
    width:65px;
    height:65px;
    margin-left:10px;
} 
.profitassetrule{
    width:90%;
    height:9%;
    left:5%;
    position: fixed;
    bottom:11%;
}
.profitassetrule .Imgupload{
    position: absolute;
    right: 0%;
    width: 140px;
    opacity: 0;
    height: 40px;
    bottom:5px;
}
</style>

