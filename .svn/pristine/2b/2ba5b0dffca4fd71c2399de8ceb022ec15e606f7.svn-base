<template>
<div class="div1">
           <div class="personnel">
                <group>
                    <cell @click.native="raidocall(list.deptName,list.levelCode)"  :title="list.deptName" :value="list.userNum" v-for="list in listData" :key="list.deptId"  is-link></cell>
                </group>
           </div>
</div>
</template>
<script>
    export default{
        name:"personnel",
        data(){
            return{
                listData:""
            }
        },
        methods: {
            raidocall(e,i){
                this.$router.replace({path:'/personnelRadio2',query:{id:i,name:e}})
            }
        },
        created(){
             this.$parent.nextData="";
            this.$http.get("/API/baseservice/GetOneDept", { emulateJSON: true })
                .then(res => {
                    this.listData=res.data;
                }
                )
        }
    }
</script>
<style>

</style>
