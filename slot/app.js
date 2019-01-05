var TodoList = {
    props: {
        todos: {
            type: Array,
            required: true
        }
    },
    template: `
    <ul>
        <template v-for="todo in todos">
            <slot :todo="todo">
                <li :key="todo.id">
                    {{ todo.text }}
                </li>
            </slot>
        </template>
    </ul>
    `
}

new Vue({
    el: '#app',
    data: function() {
        return {
            todos: [
                { id: 1, text: 'Hop', isCompleted: true },
                { id: 2, text: 'Step', isCompleted: false },
                { id: 3, text: 'Jump', isCompleted: false },
                { id: 4, text: 'Go', isCompleted: true }
            ]
        }
    },
    components: {
        TodoList: TodoList,
    }
})