<template>
  <div class="div1"> 
  <v-header :header="parentMsg"></v-header>
  <section class="zhong">
      <div class="Upcontent">
          <div class="contleft"></div>
          <div class="contright">
              <div>用户名:<span>{{userdata.LoginName}}</span></div>
              <div>角&#12288;色:<span>{{userRole}}</span></div>
              <div>部&#12288;门:<span>{{userdata.DeptName}}</span></div>
            </div>          
      </div>
      <div class="switing">
          <div class="Dirulo" @click="ClickRoles()"><span class="switimg"></span><span class="qiehuan">切换角色</span><img src="../assets/xia.png"  class="swit"></div>
          <div class="toggleshow" id="toog" v-if="toggle">
              <ul>
                  <li @click="ToggleCursors(showli.ROLEID,showli.ROLENAME)" v-for="showli in SwitchRoles" :key="showli.ROLEID">{{showli.ROLENAME}}<span v-if="userdata.pDefaultRoleId==showli.ROLEID" class="PicthOn"></span></li>
              </ul>
          </div>
      </div>
        <section class="persoalfoot">
          <el-row>
            <el-button @click="Logout()" style="width:90%;margin-left:5%;font-size:18px;" type="primary">退出登录</el-button>
        </el-row>
      </section>
  </section>
          <v-foot></v-foot>
  </div>
</template>
<script>
    export default{
        name:"personalCenter",
        data (){
            return{
                parentMsg:"个人中心",
                userdata:{},
                SwitchRoles:[],
                toggle:false,
                set:{show:false},
                userRole:""
            }
        },
        methods:{
            Logout(){
                this.delCookie("userCode");
                global.cliction="";
              this.$http.post('/API/loginservice/ExitLogin',{emulateJSON: true}).then(res=>{ })
                this.$router.push({path:'/login'})
            },
            ClickRoles(){
                if(this.toggle){
                    this.toggle=false;
                }else{
                    this.toggle=true;
                }
            },
            ToggleCursors(id,name){
                global.cliction=1;
                this.$http.post('/API/loginservice/ChangeRole',{"ROLEID":id,"ROLENAME":name},{emulateJSON: true}).then(res=>{ 
                    this.$router.push({path:"/home"})
                })
            }
        },
        mounted() {
         this.$http.post('/API/loginservice/PersonalCenter',{emulateJSON: true}).then(res=>{ 
              this.userdata=res.data;
              let Roles=JSON.parse(res.data.pRoles);
              Roles=Roles.ROLES.ROLE
            if(this.userdata.pDefaultRoleName==""){
                if(Array.isArray(Roles)){
                    this.userRole=Roles[0].ROLENAME;
                    }else{
                        this.userRole=Roles.ROLENAME;
                    }
              }else{
                  this.userRole=this.userdata.pDefaultRoleName;
                  
              }
              if(Array.isArray(Roles)){
              this.SwitchRoles=Roles
              }else{
                  this.SwitchRoles.push(Roles);
              }
        })
        },
        watch:{
            '$route'(to,from){
                // react to route changes...
            }
        }
    }
</script>
<style scoped>
.div1{
    height:100%;
    }
.zhong{
    width:100%;
    height:80%;
    background:#FAFAFB;
    padding-top:20px;
}
.Upcontent{
    width:95%;
    min-height: 145px;
    height:26%;
    margin:0 auto;
    margin-bottom:20px;
    border:1px solid #ccc;
    background-color:white;
    border-radius: 5px;
    box-shadow: 1px 1px 0px 0px #ccc;/*no*/
}
.contleft{
    width:28%;
    height: 80%;
    border:1px solid #ccc;
    float: left;
    margin-top:16px;
    margin-left:10px;
}
.contright{
    margin-top:14px;
    margin-left:5px;
    float: left;
    font-size:18px;
}
.contright div{
    height:25px;
    line-height: 25px;
    margin:0 10px;
    margin-top:16px;
}
.contright div span{
    margin-left:10px;
}
.persoalfoot{
    position: fixed;
    bottom:11%;
    width:100%;
    margin:0 auto;
}
.switing{
    width:100%;
}
.Dirulo{
    width:95%;
    height: 50px;
    border:1px solid #ccc;
    border-radius: 5px;
    box-shadow: 1px 1px 0px 0px #ccc;/*no*/
    margin-top:15px;
    margin-left:2.5%;
    line-height: 50px;
    position: relative;
}
.switimg{
    height: 22px;
    width:22px;
    background:url("../assets/qhjs.png") no-repeat;
    background-size:cover;
    display:inline-block;
    position: relative;
    left: 20px;
    top:3px;
}
.swit{
    height: 16px;
    width:28px;
    display:inline-block;
    position: absolute;
    right:10px;
    top:15px;
}
.toggleshow{
    width:95%;
    margin-left:2.5%;
    border:1px solid #ccc;
    border-radius: 5px;
    box-shadow: 1px 1px 1px 0px #ccc;/*no*/
}
.toggleshow ul li{
    width:80%;
    margin-left:10%;
    list-style-type: none;
    height: 45px;
    line-height: 45px;
    border-bottom:1px dashed #CCC;
    font-size:18px;
    position: relative;
}
.toggleshow ul li:last-child{
    border:none;
}
.PicthOn{
    height: 20px;
    width:20px;
    background:url("../assets/xuan.png") no-repeat;
    background-size:cover;
    display:inline-block;
    position: absolute;
    right:10px;
    top:12px;
}
.qiehuan{
    font-size:18px;
    margin-left:30px;
}
</style>
