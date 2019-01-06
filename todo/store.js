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
        ],
        nextTaskId: 3
    },
    mutations: {
        addTask(state, { name }) {
            state.tasks.push({
                id: state.nextTaskId,
                name,
                done: false
            })
            state.nextTaskId++
        }
    }
})

export default store