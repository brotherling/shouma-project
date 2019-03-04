<template>
<div class="div1">
  <v-header :header="head"></v-header>
  <div class="assettop">
      <div style="font-weight:600">资产编号：<span>{{serial}}</span></div>
      <div style="color:#E96026">{{state}}</div>
  </div>
  <section class="Assetcontent">
      <div class="setclass">
          <ul>
              <li v-for="item in assetdata" :key="item.id"><span class="setdistance">{{item.displayName}} : </span><span>{{item.fieldVal}}</span></li>
              <div id="images">
                  <span class="setdistance" style="float:left;font-size:16px;">图片:</span>
                  <div class="appendimg">
                  <img  v-preview="'data:image/jpeg;base64,'+itimg.img" :src="'data:image/jpeg;base64,'+itimg.img" alt="" v-for="itimg in assetImg" :key="itimg.id"  preview-title-enable="false" preview-nav-enable="false">
                  <img  v-preview="itimg.img" :src="itimg.img" alt="" v-for="itimg in uploadimg" :key="itimg.id"  preview-title-enable="true" preview-nav-enable="false">
                  </div>
                </div>
          </ul>
      </div>
  </section>
  <div class="finally">
      <div class="assetrule">
        <el-input placeholder="" v-model="remark">
            <template slot="prepend">备注</template>
        </el-input>
      </div>
      <div class="assetrule" v-if="pic">
          <el-button @click="clickdian()" style="width:60%;margin-right:5px;" :disabled="display" type="primary" icon="mackimg">盘点</el-button>
          <el-button  style="width:34%;" :disabled="display" type="primary" icon="photographimg">拍照</el-button>
          <input :disabled="display" @change="clickpick($event)" class="imgupload" type="file" capture="camera" accept="image/*" multiple/>
      </div>
      <div class="assetrule" style="margin-top:8px;z-index:2000"  v-else>
          <el-button @click="clickdian()" style="width:60%;background:#409EFF;height:32px;margin-right:5px;padding:0" :disabled="display" type="primary" icon="mackimg">盘点</el-button>
          <yd-button :disabled="display" style="width:36%;background:#409EFF;display:inline-block;height:32px;margin-top:0px;font-size:16px;"  @click.native="show2 = true" size="large">拍照</yd-button>
             <yd-actionsheet :items="myItems1" v-model="show2" cancel="取消"></yd-actionsheet>
      </div>
  </div>
      <stockfoot v-if="!show2" :pcId="this.$route.query.pcid" :planId="this.$route.query.planId"></stockfoot>
</div>
</template>
<script>
import stockfoot from "../../components/stockfoot.vue"
    export default{
        components:{stockfoot},
        data(){
            return{
                head:"资产盘点",
                assetdata:[],
                state:this.$route.query.state,
                serial:this.$route.query.serial,
                remark:"",
                display:false,
                assetImg:[],
                uploadimg:[],
                shangimg:[],
                ceshi:"",
                show2: false,
                pic:"",
                myItems1: [
                    {
                        label: '拍照',
                        callback: () => {
                            this.getImage();
                            let that =this;
                            global.bus.$off("global.img");
                            global.bus.$on("global.img",function(val){
                            that.shangimg.push({"img":val});
                            that.uploadimg.push({"img":val,"id":""})
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
                            that.shangimg.push({"img":val});
                            that.uploadimg.push({"img":val,"id":""})
                            });
                
                        }
                    }
                ]
            }
        },
        methods:{
            assetGetdata(){
            let Data={"pcId":this.$route.query.pcid,"assetId":this.$route.query.assetid};
             this.$http.get("/API/stockservice/GetAssetDetail",
                {params:{data:JSON.stringify(Data)}},
                { emulateJSON: true })
                .then(res => {
                    this.assetdata=res.data.immobilization.data;
                    this.Whether()
                 })
                this.$http.get("/API/stockservice/GetC4Img",
                {params:{data:JSON.stringify(Data)}},
                { emulateJSON: true })
                .then(res => {
                    this.assetImg=res.data;
                 })
            },
            Whether(){
                let data=this.assetdata;
                data.forEach(function(element) {
                    if(element.displayName=="盘点时间"){
                        if(element.fieldVal !=null){
                            this.display=true;
                        }
                    }
                }, this);
            },
            clickdian(){
                this.$http.post("/API/stockservice/AssetStock",
                {"assetId":this.$route.query.assetid,"pcId":this.$route.query.pcid,"stockMemo":this.remark,"imgData":this.shangimg},
                { emulateJSON: true })
                .then(res => {
                        this.$message(res.data.resultMsg);
                        if(res.data.resultNum=="1"){
                            this.$router.go(-1);
                        }
                 })
                },
            clickpick(event){
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
                            that.shangimg.push({"img":e});
                            that.uploadimg.push({"img":e,"id":size})
                            }
                        )
                    }  
                    reader.readAsDataURL(file);   
                }  
            }
        },
        mounted() {
            this.assetGetdata();
            this.judge();
            this.pic=global.picth;
        },
    }
</script>
<style>
.assettop{
    height:6%;
    display:flex;
    align-items: center;
    justify-content: space-around;
    font-size:16px;
    border-bottom:1px solid #ccc;
}
.Assetcontent{
    height:56%;
    width:100%;
    overflow-y: auto;
}
.setclass{
    width:90%;
    height:auto;
    margin:1% 0;
    margin-left:5%;
    background:white;
    border:0px solid #ccc;
    border-radius: 5px;
    box-shadow: 1px 1px 1px 1px #ccc;/*no*/

}
.setclass ul li{
    /*height: 40px;*/
    line-height: 40px;
    font-size:16px;
}
.setdistance{
    width:120px;
    text-align: right;
    display:inline-block;
    margin-right:5px;
}
.finally{
    width:100%;
    height:12%;
    position: fixed;
    bottom:11.5%;
}
.finally .assetrule{
    width:90%;
    margin-left:5%;
}
.finally .assetrule .el-input-group__prepend{
    background: white;
    padding:0 10px;

}
.mackimg{
    width:24px;
    height:18px;
  background: url("../../assets/1.png") no-repeat;
  background-size: cover;
      display: inline-block;
    margin-right:3px;
    vertical-align: middle;
}
.photographimg{
    width:24px;
    height:18px;
    background: url("../../assets/2.png") no-repeat;
    background-size: cover;
    display: inline-block;
    margin-right:3px;
    vertical-align: middle;
}
.finally .assetrule .el-button{
    font-size:18px;
}
.imgupload{
    position: absolute;
    right: 22px;
    width: 145px;
    opacity: 0;
    height: 45px;
     bottom: 4px;
}
#images{
    width:100%;
    display: flex;
    flex-grow: grow;
}
#images img{
    width:60px;
    height:60px;
    margin-left:6px;
}
.appendimg{
 float: left;
    flex: 1;
}
</style>

