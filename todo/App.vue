<template>
    <div>
        <h2>Tasks</h2>
        <ul>
            <li v-for="task in tasks" :key="task.id">
                <input type="checkbox" :checked="task.done" @change="toggleTaskStatus(task)">
                {{ task.name }}
            </li>
        </ul>
        <form @submit.prevent="addTask">
            <input type="text" v-model="newTaskName" placeholder="new task">
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            newTaskName: ''
        }
    },
    computed: {
        tasks() {
            return this.$store.state.tasks
        }
    },
    methods: {
        addTask() {
            this.$store.commit("addTask", {
                name: this.newTaskName
            })
            this.newTaskName = ''
        },
        toggleTaskStatus(task) {
            this.$store.commit("toggleTaskStatus", {
                id: task.id
            })
        }
    }

}
</script>