<template>
<div class="div1" style="height:74%;overflow-y:auto;">
           <div>
                <group>
                    <cell @click.native="raidocall(list.userName,list.relDeptName,list.userId,list.relDeptId)"  :title="list.userName" :value="list.relDeptName" v-for="list in listData" :key="list.userId" ></cell>
                </group>
           </div>
</div>
</template>
<script>
    export default{
        name:"personnel",
        data(){
            return{
                listData:"",
                userform:{userDeptId:"",userDeptName:"",userId:"",userName:""},
            }
        },
        methods: {
            raidocall(username,deptname,useid,deptid){
                this.userform.userDeptId=useid
                this.userform.userDeptName=deptname
                this.userform.userId=useid
                this.userform.userName=username
                this.$parent.data= this.userform;
                $(".restoring").trigger("click");
            }
        },
        created(){
             this.$parent.nextData="";
            this.$http.get("/API/baseservice/GetEmployeeByDeptId",{params:{levelCode:this.$route.query.levelcode}},{ emulateJSON: true })
                .then(res => {
                    this.listData=res.data;
                }
                )
        }
    }
</script>
<style>

</style>
