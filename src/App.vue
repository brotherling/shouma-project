<template>
  <div id="app">
    <v-img  class="load" :class="loading?'disb':'disn'"></v-img>
    <sao class="load" ref="sao" v-if="saoloding"></sao> 
<keep-alive :class="saoloding?'disn':'disb'" > 
    <router-view v-if="$route.meta.keepAlive">
        <!-- 这里是会被缓存的视图组件 -->
    </router-view>
</keep-alive>
 
<router-view :class="saoloding?'disn':'disb'" v-if="!$route.meta.keepAlive">
    <!-- 这里是不被缓存的视图组件 -->
</router-view>
 <lg-preview></lg-preview>
  </div>
</template>

<script>
import sao from './components/saosao.vue';
export default {
  components:{sao:sao},
  name: 'App',
  data(){
    return {
      loading:false,
      saoloding:false,
    }
  },
  mounted(){
  	//接收bus传递的参数来控制loading
    var _this = this
  	global.bus.$on("showload",function(val){
  		_this.loading = val
    });
    global.bus.$on("saoshowload",function(val){
      _this.saoloding = val
    });
  },
  methods:{

  }
}
</script>

<style>
#app {
  height: 100%;
}
.load{
	width: 100%;
	height: 100%;
	position: fixed;
    z-index:99999;
}

.disb{
	display: block;
}
.disn{
	display: none;
}
</style>
