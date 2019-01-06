<template>
    <div>
        <h2>Tasks</h2>
        <ul>
            <li v-for="task in tasks" :key="task.id">
                <input type="checkbox" :checked="task.done">
                {{ task.name }}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    computed: {
        tasks() {
            return this.$store.state.tasks
        }
    }

}
</script>