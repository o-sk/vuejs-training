<template>
    <div>
        <h2>Tasks</h2>
        <ul>
            <li v-for="task in tasks" :key="task.id">
                <input type="checkbox" :checked="task.done" @change="toggleTaskStatus(task)">
                {{ task.name }}
                -
                <span v-for="id in task.labelIds" :key="id">
                    {{ getLabelText(id) }}
                </span>
            </li>
        </ul>
        <form @submit.prevent="addTask">
            <input type="text" v-model="newTaskName" placeholder="new task">
        </form>
        <h2>Labels</h2>
        <ul>
            <li v-for="label in labels" :key="label.id">
                <input type="checkbox" :value="label.id" v-model="newTaskLabelIds">
                {{ label.text }}
            </li>
        </ul>
        <form @submit.prevent="addLabel">
            <input type="text" v-model="newLabelText" placeholder="new label">
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            newTaskName: '',
            newLabelText: '',
            newTaskLabelIds: []
        }
    },
    computed: {
        tasks() {
            return this.$store.state.tasks
        },
        labels() {
            return this.$store.state.labels
        }
    },
    methods: {
        addTask() {
            this.$store.commit("addTask", {
                name: this.newTaskName,
                labelIds: this.newTaskLabelIds
            })
            this.newTaskName = ''
            this.newTaskLabelIds = []
        },
        toggleTaskStatus(task) {
            this.$store.commit("toggleTaskStatus", {
                id: task.id
            })
        },
        addLabel() {
            this.$store.commit("addLabel", {
                text: this.newLabelText
            })
            this.newLabelText = ''
        },
        getLabelText(id) {
            const label = this.labels.filter(label => label.id === id)[0]
            return label ? label.text : ''
        }
    }

}
</script>