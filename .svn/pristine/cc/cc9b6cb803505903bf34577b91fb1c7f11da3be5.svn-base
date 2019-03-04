<template>
    <div  class="div1" style="height:100%;background:white;">
      <v-header :header="parentMsg"></v-header>
      <builder :AssetData="AssetData" :assetId="assetId" :imageUrl="imageUrl" :filedataName="filedataName" @acceptfile="acceptFile" @accept="acceptImg" :formSubmit="formSubmit" :assetadd="assetadd" style="height:80%;"></builder>
        <div class="assetBottom">
            <div @click="submitValidation()">提交</div>
            <span class="verticalLines" id="vertical"></span>
            <div @click="reseat(1)" id="reset">重置</div>
        </div>
    </div>
</template>
<script>
window.submifile=[];//上传附件
import builder from "../components/v-builder.vue"
    export default{
        name:"assetAdd",
        components:{builder},
        data(){
            return{
                parentMsg:"资产新增",
                AssetData:[],
                formSubmit:{},
                // submitImg:{"data":"","dataname":""},
                submitFile:[],
                Img:{"data":"","dataname":""},
                FileData:[],
                filedata:[],
                filedataName:[],
                showfile:"",//file名字
                ValidationData:[],//验证数据
                imageUrl: global.resUrl+'/Resources/images/nopicture.jpg', //图片默认显示
                assetId:"" //资产修改传过来的id
            }
        },
        computed:{
        ...Vuex.mapState([
            "assetadd"
        ])
        },
        watch: {

        },
        beforeRouteEnter (to, from, next) {
            next(vm => {
                if(from.name=="supplier"){
                    vm.formSubmit.providerName=from.query.supplierName
                    vm.formSubmit.selectProviderId=from.query.supplierId
                    vm.setVuex(vm.formSubmit);
                }else if(from.name=="personnel"){
                    console.log(from.query.data)
                   vm.formSubmit.useDeptId=from.query.data.userDeptId
                   vm.formSubmit.useDeptName=from.query.data.userDeptName
                   vm.formSubmit.useUserId=from.query.data.userId
                    vm.formSubmit.useUserName=from.query.data.userName
                    vm.setVuex(vm.formSubmit);
                }else if(from.name=="department"){
                   vm.formSubmit.useDeptId=from.query.useDeptId
                   vm.formSubmit.useDeptName=from.query.useDeptName
                   vm.setVuex(vm.formSubmit);
                }
                else if(from.name=="admindepartment"){
                   vm.formSubmit.adminDeptId=from.query.useDeptId
                   vm.formSubmit.adminDeptName=from.query.useDeptName
                   vm.setVuex(vm.formSubmit);
                }
                else if(from.name=="assetClass"){
                   vm.formSubmit.categoryId=from.query.categoryId
                   vm.formSubmit.categoryName=from.query.categoryName
                   vm.setVuex(vm.formSubmit);
                }
                else if(from.name=="designated"){
                   vm.formSubmit.adressId=from.query.adressId
                   vm.formSubmit.addressName=from.query.addressName
                   vm.setVuex(vm.formSubmit);
                }
                else if(from.name=="homemenu"){
                    vm.assetId="";
                   vm.getdata();
                   vm.reseat(0); //传入数据是否获取表单数据
                    $("#vertical").show();
                    $("#reset").show();
                }
                else if(from.name=="assetEdit"){
                    vm.assetId=to.query.id[0];
                    $("#vertical").hide();
                    $("#reset").hide();
                   vm.getdata();
                   vm.reseat(0); //传入数据是否获取表单数据
                }
            })
        },
        methods:{
        ...Vuex.mapActions({
            assignment: "setAssetdate",
        }),

        acceptImg(value){
             var obj=value;
                 var that=this;
                var file=obj.files[0];  
                var type=obj.files[0].type;
                var size=(obj.files[0].size/1024/1024).toFixed("3")
                var reader = new FileReader();  
                    //读取文件过程方法  
                    reader.onload = function (e) {
                        compress(e.target.result,size,function(e){
                            that.imageUrl=e;                          
                             that.Img.data=e.replace("data:" + type + ";base64,", '');;
                             that.Img.dataname=type
                                                           
                            }
                        )
                    }  
                    reader.readAsDataURL(file);   
        },
        acceptFile(value){
            this.filedataName=[];
            this.filedata=[];
            this.GetAssetDetail("aa");
            this.FileData=value;
            let that=this;
             this.FileData.forEach(function (e, i) {
                 var dui={};
                 dui.fileName = e.name;
                 dui.fileId="";
                that.filedataName.push(dui)
                var reader = new FileReader();//这是核心,读取操作就是由它完成.
                   reader.readAsDataURL(e);
                   reader.onload = function () {

                        var data = reader.result.replace("data:" + e.type + ";base64,", '');
                        that.filedata.push(data)
                    }
            })
            //    this.showfile=this.filedataName.join(",")
            //     $("#fileshow").html(this.showfile)
        },
        reseat(i){
            //清空附件上传
            let file = $("#Setfile");   
            file.after(file.clone());   
            file.remove();  
            submifile=[];
            this.filedataName=[];
            this.filedata=[];
            this.showfile="";
            // $("#fileshow").html(this.showfile)
            this.imageUrl=global.resUrl+'/Resources/images/nopicture.jpg';
            this.Img={"data":"","dataname":""};
            if(i!=0){ //判断是否点击重置
            this.getsubmitData();
            }
        },
        submit(){
            this.$http.post("/API/assetservice/SaveAsset",{"":{obj:this.formSubmit,mainAstId:"",Img:this.Img}},{ emulateJSON: true })
                .then(res => {
                     this.assetId=res.data.resultNum
                    this.submitfile(res.data.resultNum);
                })
        },
        submitValidation(){
            let num=0;
            let sum=this.ValidationData;
            for(let i=0;i<sum.length;i++){
                let validation=sum[i];
                if(this.formSubmit[validation]!=""){
                    num++;
                }
            }
            if(num==sum.length){
                this.submit();
            }else{
            this.$alert("请输入红色的必填项",'提示', {
                        confirmButtonText:'确定',
                        callback: action => {
                        }
                    });
            }
        },
        submitfile(e){
            this.$http.post("/API/assetservice/SaveFile",{"":{filedata:this.filedata,filedataName:this.filedataName,assetId:e}},{ emulateJSON: true })
                .then(res => {
                            this.$alert(res.data.resultMsg,'提示', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    this.filedataName=[];
                                    submifile=[];
                                    this.GetAssetDetail()
                        }
                    });
            })
        },
        getdata(){
            this.$http.get("/API/assetservice/GetAssetPage",{parmas:{assetId:this.assetId}},{ emulateJSON: true })
                .then(res => {
                    this.AssetData=res.data;
                    this.getValidationData(res.data)
                    // console.log(res.data);
                    if(this.assetId==""){
                    this.getsubmitData();
                    }else{
                        this.GetAssetDetail();
                    }
                })
        },
        getsubmitData(){
            this.$http.get("/API/assetservice/GetAddField",{ emulateJSON: true })
                .then(res => {
                    this.formSubmit=res.data;
                    this.setVuex(vm.formSubmit);
                })
        },
        GetAssetDetail(id){
            if(id!=undefined&&id!="aa"){
             for(var i=0,filelength=this.filedataName.length;i<filelength;i++){
                    if(this.filedataName[i].fileId==id){
                    this.filedataName.splice(i,1)
                    return;   
                }
             }
            }else{
        this.$http.get("/API/assetservice/GetAssetDetail",{params:{assetId:this.assetId}},{ emulateJSON: true })
                .then(res => {
                    this.formSubmit=res.data.obj;
                    if(res.data.Img!=null){
                        this.imageUrl=global.resUrl+res.data.Img;
                    } 
                    console.log(this.filedataName)
                     if(id=="aa"){
                    let num =res.data.File;
                    for(let i=0; i<num.length;i++){
                        this.filedataName.push(num[i])
                    }
                    }else{
                        this.filedataName=res.data.File
                    }
                    // $("#fileshow").html(this.showfile)
                    this.setVuex(vm.formSubmit);
                })
            }
              
        },
        setVuex(e){
            this.assignment(e)
        },
        getValidationData(e){
            this.ValidationData=[];       
            for(let i in e){
                e[i].forEach(function(element) {
                        if(element.isNull==1){ //判断是否必填
                            this.ValidationData.push(element.tableName)
                        }

                }, this);
            };
        },
        },
        mounted(){
            window.getValidationData=this.getValidationData;
            window.GetAssetDetail=this.GetAssetDetail
        }
    }
</script>
<style>
.assetBottom{
    height: 7%;
    width:100%;
    display:flex;
    align-items: center;
    border-top: 1px solid #ccc;
    position:fixed;
    background:white;
}
.assetBottom div{
    flex:1;
    text-align: center;
    font-size:18px;
    color:#3F82DE;
}
.verticalLines{
width:1px; /*no*/
height: 25px; /*no*/
background:#ccc;
}

</style>