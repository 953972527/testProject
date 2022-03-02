import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

var state = {
    isFinishLoadImg: false
}

export default new Vuex.Store({
    state,
    mutations: {
        changeState(state, isLoad) {
            state.isFinishLoadImg = isLoad;
        }
    }
})
