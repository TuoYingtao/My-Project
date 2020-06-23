import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)


import * as state from './state'
import * as getters from './getters'
import * as mutations from './mutations'

const store = new Vuex.Store({
    modules:{
        state,
        getters,
        mutations,
    }
})

export default store