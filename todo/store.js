import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        tasks: [
            {
                id: 1,
                name: 'Programming',
                done: false
            },
            {
                id: 2,
                name: 'Code reading',
                done: true
            }
        ]
    }
})

export default store