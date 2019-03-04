<template>
  <div id="login" class="LoginContent">
    <!-- <el-button :plain="true" @click="open">错误</el-button> -->
    <img :src="ImgUrl"  alt="" class='ImgClass'>
    <el-form ref="form" :model="form"  @keyup.enter.native="onSubmit(form)" class="form">
      <el-form-item>
        <span class="InputImg"></span>
        <el-input  type="text" placeholder="请输入用户名" v-model="form.user"></el-input>
      </el-form-item>

      <el-form-item>
        <span class="InputImgPass"></span>
        <el-input type="password" placeholder="请输入密码" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
         <el-button type="primary" @click="onSubmit(form)" style="width:100%;">登录</el-button>
                     <!-- <el-button @click="diao()" type="primary">调用</el-button> -->
      </el-form-item>
    </el-form>
  </div>
</template>

<script scoped>
export default {
  name: 'login',
    beforeRouteEnter (to, from, next) {
        next(vm=>{
          let data=vm.getCookie("userCode");
          if(data){
            next({path:"/home"})
          }else{
            next();
          }
        })
  },
  data () {
    return {
      form:{
        user:'',
        password:'',
      },
      ImgUrl:'',
    }
  },
  mounted(){
        this.ImgUrl=require("../assets/logo.png")
  },
  methods:{
    onSubmit(data){
      let formdata=this.form;
      if(formdata.user==""||formdata.password==""){
         this.open();
      }else{
        let datee={UserName:formdata.user,PassWord:formdata.password}
        this.$http.post('/API/loginservice/Login',{UserName:formdata.user,PassWord:formdata.password},{emulateJSON: true}).then(res=>{ 
          if(res.data.resultNum=="1"){
          this.pageData = res.data.subjects;
          let data = res.data.baseMeno1;
          this.setCookie("userCode",data);
          window.localStorage.setItem('token', data);
          this.$router.push({path:'/home'});

          //  global.baseMeno1=JSON.parse(res.data.baseMeno1);
          }else{
            this.open();
          }
        })
      }
    },
     open:function() {
       this.$message({
          showClose: true,
          message: '用户名密码错误，请重新登录'
        });
      },
  }
}
</script>
<style>
.LoginContent .el-input__inner {
    font-size: 16px;
    padding-left:45px;
    border: 1px solid #e9e9e9;
    position: relative;
    background-color:#F2F2F3;
}
.LoginContent{
	height: 100%;
	width: 100%;
  text-align: center;
  position: absolute;
  top:26%;
}
.form{
  margin:0 20%;
}
.ImgClass{
    width: 70%;
    margin-bottom:8%;
}
.InputImg{
  background:url("../assets/user.png") no-repeat;
  width:15px;
  height:20px;
  background-size:cover;
  position: absolute;
  z-index: 2000;
  top:10px;
  left:12px
}
.InputImgPass{
  background:url("../assets/password.png") no-repeat;
  width:15px;
  height:20px;
  background-size:cover;
  position: absolute;
  z-index: 2000;
  top:10px;
  left:12px
}
</style>
