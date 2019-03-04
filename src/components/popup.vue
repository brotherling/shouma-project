<template>
  <yd-popup v-model="set.show" position="right" width="70%">
        <yd-search></yd-search>
            <div style="background-color:#fff;">
                <el-tree
                :expand-on-click-node="false"
  :data="data2"
  @node-click="clickk"
  :props="defaultProps">
</el-tree>
    <yd-checklist v-model="checklist1">
        <yd-checklist-item :val="ite.vlaue" v-for="ite in list" :key="ite.vlaue">
            <div style="height: 30px;line-height: 30px;">{{ite.name}}</div>
        </yd-checklist-item>
    </yd-checklist>
            </div>
        </yd-popup>
</template>
<script>
    export default{
        name:"popup",
        props:{
            set:Object,
        },
        data(){
            return {
                msg:this.set.show,
                checklist1:[],
                list:[],
                clickData:[{name:"世界在义务方生米",vlaue:"世界在义务方生米"},{name:"3那是红色恍惚能有谁姐缠绕千年的寂寞",vlaue:"22222"}],
                clickData2:[{name:"sssss",vlaue:"dddd"},{name:"eeeeee",vlaue:"wwwww"}],
                data2: [{
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }],
                defaultProps: {
          children: 'children',
          label: 'label'
        },

            }
        },
        methods:{
            clickk(i,e){
                console.log(i.id)
                if(i.id==2){
                    this.list=this.clickData;
                    console.log(this.list,123)
                }else{
                    this.list=this.clickData2;
                                        console.log(this.list)

                }
            }
        },
        mounted(){
        }
    }
</script>
<style>

</style>
