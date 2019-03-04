<template>
<div class="div1">
        <v-header :header="parentMsg"></v-header>
        <section>
            <div style="border-bottom:1px solid #ccc;">
            <yd-search  :on-submit="submitHandler"></yd-search>
            </div>
            <div class="overflow"  @scroll="handleScroll($event)">
                            <div class="supplier">
                <div class="sup_cont" v-for="sup in supplierdata" :key="sup.PVD_A1_10" @click="click(sup.PVD_A1_20,sup.PVD_A1_10)">
                    <p style="font-size:18px;color:#000;">{{sup.PVD_A1_20}}</p>
                    <p >项目联系人：{{sup.PVD_A1_40}}</p>
                    <p>联系电话：{{sup.PVD_A1_80}}</p>
                </div>
            </div>

            </div>

        </section>
</div>

</template>
<script>
    export default{
        name:"supplier",
        data(){
            return{
                parentMsg:"供应商选择列表",
                supplierdata:[],
                Number:0,
                param:'',
                scloll:'true',
                supplierId:"",
                supplierName:'',
            }
        },
        beforeRouteLeave(to, from, next) {
            // 设置下一个路由的 meta
           from.query.supplierName = this.supplierName;
           from.query.supplierId = this.supplierId;
        //    to.meta.keepAlive = true;  // 让 A 缓存，即不刷新
           //传值
           next();
          },
        methods: {
        click(e,i){
            this.supplierName=e;
            this.supplierId=i;
            this.$router.back(-1);
        },
            submitHandler(value) {
                this.param=value;
                this.supplierdata=[];
                this.Number="0"
                this.getData();
            },
            getData(){
                this.scloll=false;
                console.log(this.Number)
                let Data={"menuId":"104","pageNumber":this.Number,"pageSize":"10","sortName":"PVD_A1_10","order":"desc","filter":"","param":this.param};
                this.$http.get("/API/baseservice/GetContactUnitList", {params:{data:JSON.stringify(Data)}},{ emulateJSON: true })
                .then(res => {
                    for(let i in res.data.List){
                    this.supplierdata.push(res.data.List[i]);
                    }
                    this.scloll=true;
                }
                )
            },
            handleScroll(e){
            let $el = e.target;
            let num=this.Number;
            console.log($el.scrollTop,$el.offsetHeight,$el.scrollHeight)
            if ($el.scrollTop + $el.offsetHeight == $el.scrollHeight) {
                num += 10;
                if (num > this.RecordCount+10) {
                this.$message({
                    message: "数据已经全部加载完",
                    type: "warning"
                });
                return;
                }
                if (this.scloll) {
                    this.Number=num;
                    this.getData();
                }
            }
        },
        },
        created(){
            this.getData()
        }
    }
</script>
<style>
.supplier{
  height:100%;
    width:90%;
    margin-left:5%;


}
.sup_cont{
      background: white;
    border:1px solid #ccc;
    border-radius: 4px; /*no*/
      box-shadow: 2px 2px 5px 2px #ccc; /* no*/
      margin:15px 0;
}
.sup_cont p{
    display:block;
    font-size:16px;
    padding-left:10px;
    height: 38px;
    line-height: 38px;
    color:#666;
}
.overflow{
    height:600px;
    overflow-y: auto;
}
</style>
