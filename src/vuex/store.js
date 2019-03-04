import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const state = {
    assetadd:{}, //资产新增数据
    flag: false,
}
const mutations = {
    SET_ASSETDATA_ADD(state,system){
        for(let i in system){
            state.assetadd[i] = system[i]
        }    
    },
    changeTag(){
        state.flag = true
    }
}
const actions = {
    setAssetdate({commit},system){
        commit('SET_ASSETDATA_ADD',system)
    },
}

export default new Vuex.Store({
	state,
    mutations,
    actions,
})