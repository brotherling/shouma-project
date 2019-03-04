<template>
<div id="setscroll" class="scroll" style="height:80%;overflow-y:auto;" @scroll="setscroll($event)">
 <div class="assetAddConetent" >
                <div class="bulide_profittop" @click="togolle($event)">基本信息</div>
                <div class="setform">
      <group>
        <div  v-for="immobilization in AssetData.immobilization" :key="immobilization.id">
        <div  v-if="immobilization.formType=='scan'" style="position:relative"><x-input  v-model="formSubmit[immobilization.tableName]" :class="immobilization.isNull==1?'red':''" :disabled="immobilization.enabled==0" :title="immobilization.displayName" v-if="immobilization.formType=='scan'" :placeholder="immobilization.placeHolder"></x-input><span @click="saomiao(immobilization.tableName)" style="position:absolute;right:0;top:0"><yd-icon name="qrscan" color="#057AC9"></yd-icon></span></div>
        <x-input  v-model="formSubmit[immobilization.tableName]" :class="immobilization.isNull==1?'red':''" :disabled="immobilization.enabled==0" :title="immobilization.displayName" v-if="immobilization.formType=='customer'" :placeholder="immobilization.placeHolder"></x-input>
        <x-input :is-type="validNumber" ref="number" @on-blur="Intnumber(formSubmit[immobilization.tableName],immobilization.tableName)" v-model="formSubmit[immobilization.tableName]" :disabled="immobilization.enabled==0" :class="immobilization.isNull==1?'red':''"  type="text" :title="immobilization.displayName" v-if="immobilization.formType=='PositiveInteger'" :placeholder="immobilization.placeHolder"></x-input>
        <x-input :is-type="validNumber" ref="number" @on-blur="numberChange(formSubmit[immobilization.tableName],immobilization.tableName)" v-model="formSubmit[immobilization.tableName]" :disabled="immobilization.enabled==0" :class="immobilization.isNull==1?'red':''"  type="text" :title="immobilization.displayName" v-if="immobilization.formType=='serverNumber'" :placeholder="immobilization.placeHolder"></x-input>
        <datetime :readonly="immobilization.enabled==0" :class="immobilization.isNull==1?'red':''" v-model="formSubmit[immobilization.tableName]" :title="immobilization.displayName" v-if="immobilization.formType=='planTime'" :placeholder="immobilization.placeHolder"></datetime>    
        <popup-radio :readonly="immobilization.enabled==0" :class="immobilization.isNull==1?'red':''" v-model="formSubmit[immobilization.tableName]" :title="immobilization.displayName" v-if="immobilization.formType=='serviceSelect'" ref="c1" :placeholder="immobilization.placeHolder" :options="immobilization.field_optionswx.options">
            <p slot="popup-header" @click="Deselectpage()" class="vux-1px-b select_class" style="">取消</p>
        </popup-radio>
        <x-textarea :disabled="immobilization.enabled==0" :class="immobilization.isNull==1?'red':''" v-model="formSubmit[immobilization.tableName]" :title="immobilization.displayName" v-if="immobilization.formType=='description'" :placeholder="immobilization.placeHolder"></x-textarea>
        <x-input v-model="formSubmit[immobilization.tableName]" :class="immobilization.isNull==1?'red':''" :disabled="immobilization.enabled==0" :title="immobilization.displayName" v-if="immobilization.formType=='text'" :placeholder="immobilization.placeHolder"></x-input>
        <x-input :is-type="validNumber" ref="number" @on-blur="numberChange(formSubmit[immobilization.tableName],immobilization.tableName)" :value="formSubmit[immobilization.tableName]" :disabled="immobilization.enabled==0" :class="immobilization.isNull==1?'red':''" v-model="formSubmit[immobilization.tableName]" type="text" :title="immobilization.displayName" v-if="immobilization.formType=='number'" :placeholder="immobilization.placeHolder"></x-input>
        <datetime :readonly="immobilization.enabled==0" :class="immobilization.isNull==1?'red':''" v-model="formSubmit[immobilization.tableName]" :title="immobilization.displayName" v-if="immobilization.formType=='datetime'" :placeholder="immobilization.placeHolder"></datetime>    
        <popup-radio :readonly="immobilization.enabled==0" :class="immobilization.isNull==1?'red':''" v-model="formSubmit[immobilization.tableName]" :title="immobilization.displayName" v-if="immobilization.formType=='select'" ref="c1" :placeholder="immobilization.placeHolder" :options="immobilization.field_optionswx.options">
            <p slot="popup-header" @click="Deselectpage()" class="vux-1px-b select_class" style="">取消</p>
        </popup-radio>
        <x-textarea :disabled="immobilization.enabled==0" :class="immobilization.isNull==1?'red':''" v-model="formSubmit[immobilization.tableName]" :title="immobilization.displayName" v-if="immobilization.formType=='textarea'" :placeholder="immobilization.placeHolder"></x-textarea>
            
<!--供应商选择-->  <cell :disabled="immobilization.enabled==0" :class="immobilization.isNull==1?'red':''" v-model="formSubmit.providerName" :title="immobilization.displayName" v-if="immobilization.formType=='selectProviderId'" :placeholder="immobilization.placeHolder"  :value="formSubmit.providerName" link="/supplier"></cell>
<!--人员选择-->    <cell :disabled="immobilization.enabled==0" :class="immobilization.isNull==1?'red':''" v-model="formSubmit.useUserName" :title="immobilization.displayName" v-if="immobilization.formType=='useUserId'" :placeholder="immobilization.placeHolder" :value="formSubmit.useUserName" link="/personnel"></cell >
<!--部门选择-->    <cell :disabled="immobilization.enabled==0" :class="immobilization.isNull==1?'red':''" v-model="formSubmit.useDeptName" :title="immobilization.displayName" v-if="immobilization.formType=='useDeptId'" :placeholder="immobilization.placeHolder"  :value="formSubmit.useDeptName" link="/department" @click.native="linkDepartment()"  ></cell >
<!--分类选择-->    <cell :disabled="immobilization.enabled==0" :class="immobilization.isNull==1?'red':''" v-model="formSubmit.categoryName" :title="immobilization.displayName" v-if="immobilization.formType=='categoryId'" :placeholder="immobilization.placeHolder" :value="formSubmit.categoryName"  link="/assetClass" ></cell >
<!--管理部门-->    <cell :disabled="immobilization.enabled==0" :class="immobilization.isNull==1?'red':''" v-model="formSubmit.adminDeptName" :title="immobilization.displayName" v-if="immobilization.formType=='adminDeptId'" :placeholder="immobilization.placeHolder"  :value="formSubmit.adminDeptName" link="/admindepartment" ></cell>
<!--选择地选择--> <cell :disabled="immobilization.enabled==0" :class="immobilization.isNull==1?'red':''" v-model="formSubmit.addressName" :title="immobilization.displayName" v-if="immobilization.formType=='selectAdressId'" :placeholder="immobilization.placeHolder"  :value="formSubmit.addressName" link="/designated" ></cell >
          </div>
          <cell  title="附件" @click.native="openfile()" >
                <input type="file" @change="fileChange($event)" id="Setfile" style="display: none" ref="file" multiple="multiple">
                <i class="fa fa-file"></i>
                <x-icon type="ios-plus-empty" size="20" style="color:#3F82DE"></x-icon>
            </cell>
               <div v-for="showfile in filedataName" :key="showfile.fileName">{{showfile.fileName}} <span @click="clickdel(showfile.fileName,showfile.fileId)"><icon type="clear"></icon></span></div>
                  <cell  title="图片">
                        <div class="avatar-uploader" @click="subPic()">
                            <div tabindex="0" class="el-upload el-upload--text">
                                <img :src="imageUrl" class="avatar">
                                <input @change="imgchange($event)"  accept="image/*" type="file" name="file" ref="subimg" class="el-upload__input">
                            </div>
                        </div>
                    </cell>
    </group>
</div>
  <div  v-for="group in grouping" :key="group.id">
                <div class="bulide_profittop" @click="togolle($event)">{{group.name}}</div>
     <div class="setform">
      <group >
          <div v-for="groupcont in groupedData[group.id]" :key="groupcont.id">
            <popup-radio :readonly="groupcont.enabled==0" :class="groupcont.isNull==1?'red':''" v-model="formSubmit[groupcont.tableName]" :title="groupcont.displayName" v-if="groupcont.formType=='select'" ref="c1" :placeholder="groupcont.placeHolder" :options="groupcont.field_optionswx.options">
                <p slot="popup-header" @click="Deselectpage()" class="vux-1px-b select_class" style="">取消</p>
            </popup-radio>
            <x-input :disabled="groupcont.enabled==0" :class="groupcont.isNull==1?'red':''"  v-model="formSubmit[groupcont.tableName]" :title="groupcont.displayName" v-if="groupcont.formType=='text'" :placeholder="groupcont.placeHolder"></x-input>
                <x-input :disabled="groupcont.enabled==0" :class="groupcont.isNull==1?'red':''" type="number" :title="groupcont.displayName" v-if="groupcont.formType=='number'" :placeholder="groupcont.placeHolder"></x-input>
            <datetime :readonly="groupcont.enabled==0" :class="groupcont.isNull==1?'red':''"  v-model="formSubmit[groupcont.tableName]" :title="groupcont.displayName" v-if="groupcont.formType=='datetime'" :placeholder="groupcont.placeHolder"></datetime>    
            <!-- <popup-radio v-model="assetadd[groupcont.tableName]" :title="groupcont.displayName" v-if="groupcont.formType=='serviceSelect'" :placeholder="groupcont.placeHolder" :options="options2"></popup-radio> -->
            <!-- <x-textarea :title="groupcont.displayName" v-if="groupcont.formType=='textarea'" :placeholder="groupcont.placeHolder"></x-textarea> -->
            <x-textarea :disabled="groupcont.enabled==0" :class="groupcont.isNull==1?'red':''" v-model="formSubmit[groupcont.tableName]" :title="groupcont.displayName" v-if="groupcont.formType=='textarea'" :placeholder="groupcont.placeHolder"></x-textarea>
          </div>
        </group>
     </div>
      </div>
</div>
     
</div>
</template>

<script>
    export default{
        name:"builder",
        props:{
            AssetData:"",
            assetadd:"", //数据
            formSubmit:"", //上传表单数据
            filedataName:"", //上传文件名字
            imageUrl:"",  //默认显示的图片
            assetId:"" //修改资产id
        },
        data(){
            return {
                show3:false,
                picked:"",
                datetime4: '2017-05-11',
                show:true,
                options:['asb','ddd'],
                grouping:[],
                // showfile:"",              
                scroll:"0", //缓存滚动值
                groupedData:[],
                saomiaoData:"",//扫码需要赋值的name
                validNumber: function (value) {
                    var reg =/^(?:[1-9]\d*|0)(?:\.\d+)?$|^(?:\.0|0\.)$/;
                    return {
                    valid: reg.test(value),
                    msg: '请输入数字'
                    }
                },
            }
        },
        activated(){
            document.getElementById("setscroll").scrollTop=this.scroll;
        },
        watch: {
			　　pokerHistory: function(a, b) {
                if(a!=""){
                    this.$http.get("/API/assetservice/RefreshPageField", {params:{categoryId:a}},{ emulateJSON: true })
                    .then(res => {
                        this.groupedData=res.data;
                            getValidationData(res.data)                   
                    })
                    this.$http.get("/API/assetservice/RefreshPageFieldGroup", {params:{categoryId:a}},{ emulateJSON: true })
                    .then(res => {
                          this.grouping=res.data;
                    })
                }else{
                    this.getdata()
                }
            },
        },
        computed: {
            　　pokerHistory() {
            　　　　return this.formSubmit.categoryId
            　　}
            },
        methods:{
            saomiao(e){
                this.saomiaoData=e;
                this.saoma(this.fuzhi)
            },
            fuzhi(e){
                console.log(e)
                this.formSubmit[this.saomiaoData]=e
            },
            clickdel(name,id){
                if(id==""){
                for(var i=0,filelength=submifile.length;i<filelength;i++){
                    if(submifile[i].name==name){
                    submifile.splice(i,1)
                    this.$emit("acceptfile",submifile)
                    return;   
                }
                 }  
                }else{
                    this.$http.post("/API/assetservice/DeleteFile",{"":id},{ emulateJSON: true })
                    .then(res => {
                        GetAssetDetail(id);
                    })
                }                             
            },
                togolle(e){
                    $(e.target).next().toggle();
                },
            numberChange(value,e){
                var reg =/^(?:[1-9]\d*|0)(?:\.\d+)?$|^(?:\.0|0\.)$/;
                //  console.log(value,e)
                if(!reg.test(value)){
                    this.formSubmit[e]="";
                }
            },
            Intnumber(value,e){
                var reg =/^\d+$/;
                if(!reg.test(value)){
                    this.$message({
                    showClose: true,
                    message: '请输入整数'
                    });
                    this.formSubmit[e]="";
                }
            },
            imgchange(event){
                var obj=event.target;
                if(obj.files[0]!=undefined){
                    this.$emit("accept",obj)
                }
            },
            subPic(){
                this.$refs.subimg.click();
            },
            openfile(){
                this.$refs.file.click();
            },
            fileChange(event){
                 var obj=event.target;
                 var fl=obj.files[0];
                 if(fl!=undefined){
                 submifile.push(fl);
                    this.$emit("acceptfile",submifile)   
                 }
    
            //}
            },
            //弹入部门选择页面
            linkDepartment(){ 
                if(this.formSubmit.useUserId==""){
                this.$router.push({path:'/department'})
                }
            },
            Deselectpage(){
                 for(let i=0,v=this.$refs.c1;i<v.length;i++){
                        this.$refs.c1[i].hide();
                 }
            },
            getdata(){
                this.groupedData=this.AssetData
            this.$http.get("/API/assetservice/GetGroupByAssetId",{ emulateJSON: true })
                .then(res => {
                    this.grouping=res.data;
                })
            },
         setscroll(e){
             let dom=e.target;
             this.scroll=dom.scrollTop
            },
        },
        mounted(){
            this.getdata();
        }
    }
</script>
<style>
.red{
    color:red !important;
}
 .assetAddConetent{
     width:100%;
     height:100%;
     /* background:white; */
     /* overflow-y: auto; */
 }
 .setform{
     width:90%;
     margin-left:5%;
    margin-top: -15px;
 }
.span{
  color:#999;
 }
 .bulide_profittop{
     width:90%;
    /* margin-top: 15px; */
    margin-left:5%;
    height: 55px;
    line-height: 60px;
    padding-left: 10px;
    font-size:20px; 
    font-weight:700;
    color:#666;
}
.setform .yd-cell-right input,input[type=number]{
    text-align:right !important;
}
.weui-input,.weui-textarea{
    text-align: right;
}
.weui-input,.weui-textarea,.weui-cell{
    border-bottom:1px solid #eee; /*no*/

}
.weui-cell{
    padding: 0.222222rem 0.64rem !important;
}
.weui-cells{
    line-height: 2.4 !important;
}
.weui-input,.weui-textarea{
    color:#999 !important;
}
.select_class{
        height: 30px;
    font-size: 16px;
    color: #3F82DE;
    line-height: 30px;
    text-align: right;
    padding-right: 15px;
}
/* 图片上传 */
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 150px;
    height: 100px;
    display: block;
  }
  .weui-cell_access .weui-cell__ft:after{
    border-color:#3F82DE !important;
}
  .vux-x-icon {
  fill: #3F82DE;
}
.weui-input,.vux-cell-value,input,.weui-cell__ft{
     color: black !important;
}
</style>

